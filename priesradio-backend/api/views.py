"""
============================================
API/VIEWS.PY — Endpoints REST Priesradio (CH)
============================================
Endpoints :
  GET  /api/v1/produits/           → recherche + liste
  GET  /api/v1/produits/<slug>/    → détail produit
  GET  /api/v1/categories/         → liste catégories
  GET  /api/v1/categories/<slug>/  → produits d'une catégorie
  GET  /api/v1/marques/            → liste marques
  GET  /api/v1/marques/<nom>/      → produits d'une marque
  GET  /api/v1/blog/               → liste articles
  GET  /api/v1/blog/<slug>/        → détail article
  GET  /api/v1/boutiques/          → liste boutiques
  POST /api/v1/demandes/           → soumettre une demande
"""
import logging
import re
import unicodedata
from itertools import zip_longest
from bson import ObjectId

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from db.mongo import get_all_stores
from .models import BlogPost, BlogSummary, BlogSpecifications, BlogSection, StoreRequest
from .helpers.search import (
    clean_search_query,
    is_reference_query,
    build_reference_pipeline,
    build_text_search_pipeline,
    filter_by_relevance,
    filter_exact_matches,
)
from .serializers import (
    BlogPostListSerializer,
    BlogPostDetailSerializer,
    StoreRequestSerializer,
)

logger = logging.getLogger('api')

# ============================================
# CONSTANTES
# ============================================
PAGE_SIZE = 20
MAX_PAGE = 100

# Champs à projeter dans les per-store collections
PRODUIT_PROJECTION = {
    '_id': 1,
    'name': 1,
    'price': 1,
    'brand': 1,
    'category_url': 1,
    'image': 1,
    'sku': 1,
    'availability': 1,
    'url': 1,
    'currency': 1,
    'source': 1,
}

# Boutiques suisses
BOUTIQUES = [
    {'id': 'digitec',       'nom': 'Digitec',       'site_web': 'https://www.digitec.ch'},
    {'id': 'interdiscount', 'nom': 'Interdiscount', 'site_web': 'https://www.interdiscount.ch'},
    {'id': 'brack',         'nom': 'Brack',         'site_web': 'https://www.brack.ch'},
]


# ============================================
# HELPERS
# ============================================

def safe_price(val):
    """Convertit une valeur en float > 0, sinon None."""
    try:
        p = float(val)
        return p if p > 0 else None
    except (ValueError, TypeError):
        return None


def is_in_stock(doc) -> bool:
    """Vérifie si le produit est en stock (champ availability)."""
    avail = (doc.get('availability') or '').lower()
    return avail in ('in_stock', 'verfügbar', 'lieferbar') or (avail and 'nicht' not in avail and avail != 'out_of_stock')


def format_produit_from_store(doc, store_name: str) -> dict:
    """
    Transforme un document per-store en format API Produit.
    Champs MongoDB (CH) : name, price, brand, category_url, image, sku, availability, url
    """
    return {
        'id': str(doc['_id']),
        'slug': None,
        'nom': doc.get('name', ''),
        'marque': (doc.get('brand') or '').title(),
        'categorie': doc.get('category_url', ''),
        'categorie_nom': '',
        'prix_min': safe_price(doc.get('price')),
        'prix_max': None,
        'image': doc.get('image', ''),
        'en_stock': is_in_stock(doc),
        'discount': 0,
        'reference': doc.get('sku', ''),
        'boutique': store_name,
        'url_boutique': doc.get('url', ''),
    }


def paginate(items: list, page: int, par_page: int = PAGE_SIZE) -> dict:
    """Pagine une liste et retourne le format ReponseAPI."""
    total = len(items)
    start = (page - 1) * par_page
    end = start + par_page
    return {
        'data': items[start:end],
        'meta': {
            'page': page,
            'total_pages': max(1, -(-total // par_page)),  # ceil division
            'total_items': total,
            'par_page': par_page,
        }
    }


def get_page_number(request) -> int:
    try:
        p = int(request.GET.get('page', 1))
        return max(1, min(p, MAX_PAGE))
    except (ValueError, TypeError):
        return 1


def slugify_fr(text: str) -> str:
    """Convertit un texte français en slug URL (minuscules, tirets, sans accents)."""
    text = (text or '').strip().lower()
    text = ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')


# ============================================
# PRODUITS — Recherche et liste
# ============================================

@api_view(['GET'])
def produits_list(request):
    """
    GET /api/v1/produits/
    Params: q, page, categorie, marque, prix_min, prix_max, en_promo, boutique, en_stock, tri

    Logique de recherche :
    - q seul  → Atlas Search (phrase/fuzzy) si index "Text" disponible, sinon fallback regex
    - q + référence détectée → pipeline exact reference match
    - categorie / marque → regex classique sur les champs MongoDB
    - prix_min / prix_max / en_promo → post-filtrage Python après recherche
    - boutique → filtre sur une seule collection (mytek/tunisianet/spacenet)
    - en_stock → filtre etat_stock == 'En stock'
    - tri → prix_asc ou prix_desc appliqué après déduplication
    - Post-filtrage par pertinence pour queries multi-mots
    """
    q = request.GET.get('q', '').strip()
    categorie = request.GET.get('categorie', '').strip()
    marque_raw = request.GET.get('marque', '').strip()
    marques = [m.strip() for m in marque_raw.split(',') if m.strip()]
    marque = marques[0] if len(marques) == 1 else marque_raw  # compat affichage
    prix_min = safe_price(request.GET.get('prix_min', ''))
    prix_max = safe_price(request.GET.get('prix_max', ''))
    en_promo = request.GET.get('en_promo', '').strip() in ('1', 'true')
    boutique = request.GET.get('boutique', '').strip().lower()   # 'digitec' | 'interdiscount' | 'brack'
    en_stock = request.GET.get('en_stock', '').strip() in ('1', 'true')
    tri = request.GET.get('tri', '').strip()                     # 'prix_asc' | 'prix_desc'
    page = get_page_number(request)

    if not q and not categorie and not marques and prix_min is None and prix_max is None and not en_promo and not boutique and not en_stock:
        return Response({'data': [], 'meta': {'page': 1, 'total_pages': 0, 'total_items': 0, 'par_page': PAGE_SIZE}})

    # Filtrage des collections selon la boutique demandée
    all_stores = get_all_stores()
    if boutique in ('digitec', 'interdiscount', 'brack'):
        stores_to_query = [(fn, name) for fn, name in all_stores if name.lower() == boutique]
    else:
        stores_to_query = all_stores

    # Nettoyage de la requête textuelle
    if q:
        q = clean_search_query(q)
        if not q and not categorie and not marques and prix_min is None and prix_max is None and not en_promo:
            return Response({'data': [], 'meta': {'page': 1, 'total_pages': 0, 'total_items': 0, 'par_page': PAGE_SIZE}})

    raw_docs = []  # docs bruts MongoDB, chacun avec '_source' = store_name

    if q and not categorie and not marques:
        # ── Recherche textuelle pure : Atlas Search ──────────────────────────
        is_reference = is_reference_query(q)
        query_words = q.split()
        num_words = len(query_words)
        fetch_limit = PAGE_SIZE * 3  # marge pour la déduplication

        if is_reference:
            logger.info(f"Recherche référence : {q}")
            pipeline = build_reference_pipeline(q, skip=0, limit=fetch_limit)
        else:
            logger.info(f"Recherche texte Atlas Search : {q}")
            pipeline = build_text_search_pipeline(q, num_words, skip=0, limit=fetch_limit)

        def run_pipeline(pipeline):
            """Exécute un pipeline sur toutes les stores sélectionnées."""
            docs = []
            for get_col, store_name in stores_to_query:
                try:
                    col = get_col()
                    results = list(col.aggregate(pipeline, allowDiskUse=True))
                    for doc in results:
                        doc['_source'] = store_name
                    docs.extend(results)
                    logger.info(f"{store_name} : {len(results)} résultats")
                except Exception as e:
                    logger.warning(f"Atlas Search indisponible pour {store_name}, fallback regex : {e}")
                    try:
                        col = get_col()
                        query_filter = {'name': {'$regex': re.escape(q), '$options': 'i'}}
                        for doc in col.find(query_filter, PRODUIT_PROJECTION).limit(fetch_limit):
                            doc['_source'] = store_name
                            docs.append(doc)
                    except Exception as e2:
                        logger.error(f"Fallback regex échoué {store_name} : {e2}")
            return docs

        raw_docs = run_pipeline(pipeline)

        # Référence : exact match obligatoire, sinon fallback title search
        if is_reference:
            if raw_docs:
                raw_docs, found_exact = filter_exact_matches(raw_docs)
                if not found_exact:
                    logger.info(f"Référence '{q}' sans exact match, fallback recherche texte")
                    is_reference = False
                    pipeline = build_text_search_pipeline(q, num_words, skip=0, limit=fetch_limit)
                    raw_docs = run_pipeline(pipeline)
            else:
                logger.info(f"Référence '{q}' introuvable, fallback recherche texte")
                is_reference = False
                pipeline = build_text_search_pipeline(q, num_words, skip=0, limit=fetch_limit)
                raw_docs = run_pipeline(pipeline)

        # Post-filtrage pertinence (uniquement pour text search multi-mots)
        if not is_reference and num_words >= 2 and raw_docs:
            raw_docs = filter_by_relevance(raw_docs, query_words, num_words)

    else:
        # ── Filtre par catégorie / marque / prix / promo (regex classique) ───
        for get_col, store_name in stores_to_query:
            try:
                col = get_col()
                query_filter = {}
                if q:
                    query_filter['name'] = {'$regex': re.escape(q), '$options': 'i'}
                if categorie:
                    # Filtre sur category_url (contient le slug de catégorie)
                    query_filter['category_url'] = {'$regex': re.escape(categorie), '$options': 'i'}
                if en_stock:
                    query_filter['availability'] = 'in_stock'
                if prix_min is not None or prix_max is not None:
                    price_filter = {}
                    if prix_min is not None:
                        price_filter['$gte'] = prix_min
                    if prix_max is not None:
                        price_filter['$lte'] = prix_max
                    query_filter['price'] = price_filter
                if not query_filter and not marques:
                    # Sans aucun critère textuel, on évite de charger toute la collection
                    continue
                # Multi-marque : une query par marque (équitable, sans sur-fetch)
                brand_list = marques if len(marques) > 1 else (marques or [None])
                for brand in brand_list:
                    brand_filter = dict(query_filter)
                    if brand:
                        brand_filter['brand'] = {'$regex': re.escape(brand), '$options': 'i'}
                    elif not brand_filter:
                        continue
                    for doc in col.find(brand_filter, PRODUIT_PROJECTION).limit(PAGE_SIZE * 2):
                        doc['_source'] = store_name
                        raw_docs.append(doc)
            except Exception as e:
                logger.error(f"Erreur filtre {store_name} : {e}")
                continue

    # ── Équilibrage round-robin par boutique ─────────────────────────────────
    # Interleave Digitec / Interdiscount / Brack pour éviter qu'une boutique
    # monopolise la première page (ex : en_promo=1 sans filtre catégorie)
    if raw_docs:
        per_store: dict = {}
        for doc in raw_docs:
            per_store.setdefault(doc.get('_source', ''), []).append(doc)
        raw_docs = []
        for groupe in zip_longest(*per_store.values()):
            for doc in groupe:
                if doc is not None:
                    raw_docs.append(doc)

    # ── Post-filtrage prix / stock (applicable aux deux branches) ──
    if prix_min is not None:
        raw_docs = [d for d in raw_docs if safe_price(d.get('price')) is not None and safe_price(d.get('price')) >= prix_min]
    if prix_max is not None:
        raw_docs = [d for d in raw_docs if safe_price(d.get('price')) is not None and safe_price(d.get('price')) <= prix_max]
    if en_stock:
        raw_docs = [d for d in raw_docs if is_in_stock(d)]

    # ── Formatage ────────────────────────────────────────────────────────────
    produits = [
        format_produit_from_store(doc, doc.pop('_source'))
        for doc in raw_docs
    ]

    # ── Dédoublonnage par référence (garder le meilleur prix) ────────────────
    seen_refs = {}
    deduped = []
    for p in produits:
        ref = p.get('reference', '')
        if ref and ref in seen_refs:
            if (p['prix_min'] or 0) < (seen_refs[ref]['prix_min'] or 9999999):
                seen_refs[ref] = p
        elif ref:
            seen_refs[ref] = p
            deduped.append(p)
        else:
            deduped.append(p)

    final = [seen_refs.get(p.get('reference'), p) if p.get('reference') else p for p in deduped]

    # ── Tri par prix ─────────────────────────────────────────────────────────
    if tri == 'prix_asc':
        final.sort(key=lambda x: x.get('prix_min') or 9_999_999)
    elif tri == 'prix_desc':
        final.sort(key=lambda x: -(x.get('prix_min') or 0))

    return Response(paginate(final, page))


# ============================================
# PRODUIT — Détail
# ============================================

@api_view(['GET'])
def produit_detail(request, slug: str):
    """
    GET /api/v1/produits/<slug>/
    - Si slug ressemble à un ObjectId (24 hex) → cherche dans les 3 per-store collections
    - Sinon → cherche par sku dans les 3 stores
    """
    # Recherche par ObjectId
    IS_OBJECT_ID = bool(re.match(r'^[0-9a-f]{24}$', slug, re.I))
    oid = None
    if IS_OBJECT_ID:
        try:
            oid = ObjectId(slug)
        except Exception:
            return Response({'erreur': 'Identifiant invalide'}, status=status.HTTP_400_BAD_REQUEST)

    found_doc = None
    found_store = None

    for get_col, store_name in get_all_stores():
        try:
            if oid:
                doc = get_col().find_one({'_id': oid})
            else:
                doc = get_col().find_one({'sku': {'$regex': f'^{re.escape(slug)}$', '$options': 'i'}})
            if doc:
                found_doc = doc
                found_store = store_name
                break
        except Exception as e:
            logger.error(f"Erreur produit_detail {store_name}: {e}")
            continue

    if not found_doc:
        return Response({'erreur': 'Produkt nicht gefunden'}, status=status.HTTP_404_NOT_FOUND)

    prix = safe_price(found_doc.get('price'))
    sku = found_doc.get('sku', '')

    # Cross-store lookup par SKU
    all_offres = []
    if sku:
        for get_col2, store_name2 in get_all_stores():
            try:
                doc2 = get_col2().find_one(
                    {'sku': {'$regex': f'^{re.escape(sku)}$', '$options': 'i'}},
                    PRODUIT_PROJECTION,
                )
                if doc2:
                    p2 = safe_price(doc2.get('price'))
                    if p2:
                        all_offres.append({
                            'boutique': store_name2,
                            'prix': p2,
                            'stock': doc2.get('availability', ''),
                            'url': doc2.get('url', ''),
                            'image': doc2.get('image', ''),
                        })
            except Exception:
                pass
        all_offres.sort(key=lambda x: x['prix'])
    elif prix:
        all_offres = [{
            'boutique': found_store,
            'prix': prix,
            'stock': found_doc.get('availability', ''),
            'url': found_doc.get('url', ''),
            'image': found_doc.get('image', ''),
        }]

    return Response({
        'id': str(found_doc['_id']),
        'slug': slug,
        'nom': found_doc.get('name', ''),
        'marque': (found_doc.get('brand') or '').title(),
        'categorie': found_doc.get('category_url', ''),
        'categorie_nom': '',
        'sku': sku,
        'image': found_doc.get('image', ''),
        'description': '',
        'prix_min': min(o['prix'] for o in all_offres) if all_offres else prix,
        'prix_max': max(o['prix'] for o in all_offres) if len(all_offres) > 1 else None,
        'discount': 0,
        'en_stock': is_in_stock(found_doc),
        'boutique': found_store,
        'url_boutique': found_doc.get('url', ''),
        'offres': all_offres,
    })


# ============================================
# CATÉGORIES
# ============================================

# Catégories suisses statiques (slugs extraits des URLs Digitec/Interdiscount/Brack)
CATEGORY_NOMS = {
    'smartphones':          'Smartphones',
    'laptops':              'Laptops',
    'tablets':              'Tablets',
    'gaming':               'Gaming',
    'tv-audio':             'TV & Audio',
    'haushaltsgeraete':     'Haushaltsgeräte',
    'computer':             'Computer',
    'foto-video':           'Foto & Video',
    'smart-home':           'Smart Home',
    'zubehoer':             'Zubehör',
    'netzwerk':             'Netzwerk',
    'drucker':              'Drucker',
    'software':             'Software',
}

STATIC_CATEGORIES = [
    {'id': slug, 'slug': slug, 'nom': nom, 'nombre_produits': 0, 'sous_categories': []}
    for slug, nom in CATEGORY_NOMS.items()
]


@api_view(['GET'])
def categories_list(request):
    """
    GET /api/v1/categories/
    Retourne la liste statique des catégories suisses.
    Les counts sont agrégés depuis category_url dans les 3 stores.
    """
    cats = {c['slug']: dict(c) for c in STATIC_CATEGORIES}

    for get_col, store_name in get_all_stores():
        try:
            col = get_col()
            pipeline = [
                {'$match': {'category_url': {'$exists': True, '$ne': None, '$ne': ''}}},
                {'$group': {'_id': '$category_url', 'count': {'$sum': 1}}},
            ]
            for doc in col.aggregate(pipeline):
                cat_url = doc['_id'] or ''
                count = doc['count']
                # Cherche quel slug de catégorie correspond à cette URL
                for slug in cats:
                    if slug in cat_url.lower():
                        cats[slug]['nombre_produits'] += count
                        break
        except Exception as e:
            logger.error(f"Erreur catégories {store_name}: {e}")
            continue

    result = sorted(cats.values(), key=lambda x: -x['nombre_produits'])
    return Response({'data': result, 'meta': {'total_items': len(result)}})


@api_view(['GET'])
def categorie_detail(request, slug: str):
    """
    GET /api/v1/categories/<slug>/
    Retourne la catégorie + ses produits.
    """
    page = get_page_number(request)
    produits = []
    categorie_nom = slug.replace('-', ' ').title()

    categorie_nom = CATEGORY_NOMS.get(slug, slug.replace('-', ' ').title())

    for get_col, store_name in get_all_stores():
        try:
            col = get_col()
            # Filtre sur category_url (contient le slug)
            query = {'category_url': {'$regex': re.escape(slug), '$options': 'i'}}
            results = col.find(query, PRODUIT_PROJECTION).limit(PAGE_SIZE * 3)
            for doc in results:
                produits.append(format_produit_from_store(doc, store_name))
        except Exception as e:
            logger.error(f"Erreur catégorie {slug} / {store_name}: {e}")
            continue

    if not produits:
        return Response({'erreur': 'Kategorie nicht gefunden'}, status=status.HTTP_404_NOT_FOUND)

    response = paginate(produits, page)
    response['categorie'] = {
        'slug': slug,
        'nom': categorie_nom,
        'sous_categories': [],
    }
    return Response(response)




# ============================================
# MARQUES
# ============================================

@api_view(['GET'])
def marques_list(request):
    """
    GET /api/v1/marques/
    Agrège les marques distinctes depuis les 3 collections.
    """
    brands = {}

    for get_col, store_name in get_all_stores():
        try:
            col = get_col()
            pipeline = [
                {'$match': {'brand': {'$exists': True, '$ne': None, '$ne': ''}}},
                {'$group': {
                    '_id': '$brand',
                    'count': {'$sum': 1},
                }},
            ]
            for doc in col.aggregate(pipeline):
                slug = (doc['_id'] or '').lower().strip()
                if slug:
                    if slug not in brands:
                        brands[slug] = {
                            'id': slug,
                            'slug': slug,
                            'nom': doc['_id'].title(),
                            'nombre_produits': 0,
                        }
                    brands[slug]['nombre_produits'] += doc['count']
        except Exception as e:
            logger.error(f"Erreur marques {store_name}: {e}")
            continue

    result = sorted(brands.values(), key=lambda x: -x['nombre_produits'])
    return Response({'data': result, 'meta': {'total_items': len(result)}})


@api_view(['GET'])
def marque_detail(request, nom: str):
    """
    GET /api/v1/marques/<nom>/
    Retourne la marque + ses produits.
    """
    page = get_page_number(request)
    produits = []

    for get_col, store_name in get_all_stores():
        try:
            col = get_col()
            query = {'brand': {'$regex': f'^{re.escape(nom)}$', '$options': 'i'}}
            results = col.find(query, PRODUIT_PROJECTION).limit(PAGE_SIZE * 3)
            for doc in results:
                produits.append(format_produit_from_store(doc, store_name))
        except Exception as e:
            logger.error(f"Erreur marque {nom} / {store_name}: {e}")
            continue

    if not produits:
        return Response({'erreur': 'Marque introuvable'}, status=status.HTTP_404_NOT_FOUND)

    response = paginate(produits, page)
    response['marque'] = {'slug': nom.lower(), 'nom': nom.title()}
    return Response(response)


# ============================================
# BLOG
# ============================================

@api_view(['GET'])
def blog_list(request):
    """GET /api/v1/blog/"""
    page = get_page_number(request)
    posts = list(BlogPost.objects.prefetch_related('summary', 'specs').order_by('-published_date'))
    data = [BlogPostListSerializer(p, context={'request': request}).data for p in posts]
    return Response(paginate(data, page))


@api_view(['GET'])
def blog_detail(request, slug: str):
    """GET /api/v1/blog/<slug>/"""
    try:
        post = BlogPost.objects.prefetch_related('summary', 'specs', 'sections').get(slug=slug)
    except BlogPost.DoesNotExist:
        return Response({'erreur': 'Article introuvable'}, status=status.HTTP_404_NOT_FOUND)

    return Response(BlogPostDetailSerializer(post, context={'request': request}).data)


# ============================================
# BOUTIQUES
# ============================================

@api_view(['GET'])
def boutiques_list(request):
    """GET /api/v1/boutiques/"""
    return Response({'data': BOUTIQUES, 'meta': {'total_items': len(BOUTIQUES)}})


# ============================================
# DEMANDES
# ============================================

@api_view(['POST'])
def demandes_create(request):
    """POST /api/v1/demandes/"""
    serializer = StoreRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Anfrage erfolgreich eingereicht.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

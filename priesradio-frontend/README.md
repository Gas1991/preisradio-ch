# Toprix Frontend

Comparateur de prix high-tech en Tunisie — interface Next.js déployée sur Vercel.

**Production :** `https://toprix-mu.vercel.app` (alias : `toprix.tn`)
**API :** `https://api.toprix.tn/api/v1`

---

## Stack technique

| Outil | Version | Usage |
|-------|---------|-------|
| Next.js | 15 (App Router) | Framework SSR |
| TypeScript | 5 | Typage |
| Tailwind CSS | 4 | Styles |
| Lucide React | — | Icônes |

Rendu 100 % **SSR** (`force-dynamic`) — pas de Client Components, filtres via `searchParams` URL.

---

## Structure des pages

```
src/app/(public)/
├── page.tsx                    # Accueil (sections dynamiques)
├── rechercher/page.tsx         # Recherche + filtres avancés
├── produit/[slug]/page.tsx     # Détail produit + comparaison SKU multi-stores
├── categories/page.tsx         # Liste catégories
├── categories/[slug]/page.tsx  # Produits d'une catégorie
├── marques/page.tsx            # Liste marques
├── marques/[name]/page.tsx     # Produits d'une marque
├── blog/page.tsx               # Liste articles
├── blog/[slug]/page.tsx        # Article détail
├── boutiques/page.tsx          # Boutiques partenaires
├── ajouter/page.tsx            # Formulaire demande
└── contact/page.tsx            # Contact
```

---

## Composants clés

### `CarteProduit`
Affiche un produit en grille avec :
- Badge **-X DT** (discount) sur l'image
- Logo PNG boutique (fond coloré) : **Mytek** (bleu) · **Tunisianet** (vert) · **Spacenet** (violet)
- Marque en orange
- Ancien prix barré + prix actuel en orange
- **Économie : X DT** en vert
- Indicateur **● En stock** / **○ Rupture de stock**

Logos dans `public/stores/` : `mytek.png`, `tunisianet.png`, `spacenet.png`.

### `Header`
- Logo Toprix 🇹🇳 sticky
- Bandeau **🌙 Ramadan Mubarak · رمضان كريم** (doré, haut du header)
- Navigation desktop + icône menu mobile

---

## Page d'accueil `/`

Sections dynamiques chargées en **3 appels API parallèles** (`Promise.allSettled`) :

> **Note :** Les sections Tendances et Top promos s'affichent uniquement si l'API `en_promo=1` retourne des résultats (produits avec `discount > 0` dans MongoDB).

| Section | Source API | Affichage |
|---------|-----------|-----------|
| **Tendances actuelles** | `en_promo=1` (items 1-8) — conditionnel | Grille 4 cols |
| **Top promos** | `en_promo=1` (items 9-16) — conditionnel | Grille 4 cols, fond orange |
| **Catégories rapides** | Statique | Icônes 8 cols |
| **Smartphones** | `categorie=smartphones` (10 items) | Carousel horizontal |
| **Électroménager** | `categorie=electromenager` (10 items) | Carousel horizontal |
| **Marques** | Statique | Grille liens |

Chaque section est masquée automatiquement si l'API renvoie 0 résultats.

---

## Page `/rechercher`

Filtres disponibles (tous en `searchParams` GET, SSR-compatible) :

| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Terme de recherche |
| `categorie` | string | Filtrer par catégorie |
| `marque` | string | Filtrer par marque |
| `prix_min` | number | Prix minimum (DT) — fonctionne seul |
| `prix_max` | number | Prix maximum (DT) — fonctionne seul |
| `en_promo` | `1` | Promotions uniquement |
| `page` | number | Pagination (20/page) |

Panneau filtre : `<details>`/`<summary>` natif HTML (toggle CSS pur, SSR-compatible).
Badges actifs supprimables individuellement via `buildFilterUrl()`.

---

## Page `/produit/[slug]`

### Produit per-store (ObjectId 24 hex)
- Badges marque · catégorie · store · stock
- **SKU** (`reference`) en code monospace + ID MongoDB
- Prix barré + prix actuel + **Économie X DT**
- Bouton lien direct vers la boutique
- **Fiche technique** (`fiche_technique` MongoDB)
- **Tableau comparaison** : recherche automatique du même SKU dans les 3 stores → jusqu'à 3 lignes avec logos boutiques, stock, prix, badge "✓ Meilleur prix"

### Produit comparatif (slug texte)
- Tableau multi-boutiques trié par prix (depuis collection `comparatif`)

---

## API calls (`src/lib/api/`)

```typescript
getProduits({ q, categorie, marque, prix_min, prix_max, en_promo, page })
getProduit(slug)
getCategories() / getCategorie(slug)
getMarques() / getMarque(nom)
```

Toutes les valeurs `undefined` sont filtrées avant `URLSearchParams` pour éviter le bug `"undefined"` en URL.

---

## Assets statiques

```
public/
└── stores/
    ├── mytek.png       # Logo Mytek (PNG fond transparent)
    ├── tunisianet.png  # Logo Tunisianet
    └── spacenet.png    # Logo Spacenet
```

---

## Développement local

```bash
npm install
npm run dev        # http://localhost:3000
```

Variable d'environnement : `NEXT_PUBLIC_API_URL=https://api.toprix.tn/api/v1`

---

## Déploiement

Push sur `main` → déploiement automatique Vercel.

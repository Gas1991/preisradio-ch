# Catalogue des Pages — Toprix

> Toutes les pages sont **SSR** (`force-dynamic`). Aucun contenu n'est pré-généré statiquement.

---

## Vue d'ensemble des routes

| Route | Fichier | Données API | Rendu |
|-------|---------|-------------|-------|
| `/` | `(public)/page.tsx` | Statique (données hardcodées) | SSR |
| `/rechercher` | `(public)/rechercher/page.tsx` | `getProduits(q, page)` | SSR |
| `/produit/[slug]` | `(public)/produit/[slug]/page.tsx` | `getProduit(slug)` | SSR |
| `/categories` | `(public)/categories/page.tsx` | `getCategories()` | SSR |
| `/categories/[...slug]` | `(public)/categories/[...slug]/page.tsx` | `getCategorieDetail(slug, page)` | SSR |
| `/marques` | `(public)/marques/page.tsx` | `getMarques()` | SSR |
| `/marques/[name]` | `(public)/marques/[name]/page.tsx` | `getMarque()` + `getProduits()` | SSR |
| `/blog` | `(public)/blog/page.tsx` | `getArticles(page)` | SSR |
| `/blog/[slug]` | `(public)/blog/[slug]/page.tsx` | `getArticle(slug)` | SSR |
| `/boutiques` | `(public)/boutiques/page.tsx` | `getBoutiques()` | SSR |
| `/ajouter` | `(public)/ajouter/page.tsx` | — (formulaire) | SSR |
| `/contact` | `(public)/contact/page.tsx` | — (formulaire) | SSR |
| `/a-propos` | `(public)/a-propos/page.tsx` | — (statique) | SSR |
| `*` | `app/not-found.tsx` | — | Static |

---

## Détail des pages

---

### `/` — Accueil

**Fichier** : `src/app/(public)/page.tsx`

**Sections** :
1. **Hero dark** : badge, H1, description, barre de recherche, avantages, stats bar (50k produits, 120 marques, 80 boutiques)
2. **Catégories rapides** : grille 8 tiles (Smartphones, Laptops, Audio, Gaming…)
3. **Marques** : grille 12 marques populaires (Apple, Samsung, Sony…)
4. **CTA boutique** : section dark avec lien vers `/ajouter`

**SEO** :
```typescript
title: 'Toprix - Comparateur de produits high-tech'
description: 'Comparez les prix des smartphones, laptops...'
```

---

### `/rechercher` — Recherche

**Fichier** : `src/app/(public)/rechercher/page.tsx`

**searchParams** : `q` (terme), `page`, `categorie`, `marque`

**États** :
- **Vide** (sans `q`) : icône + message d'invite
- **Chargement** : rendu serveur transparent
- **Résultats** : compteur + panneau filtre + grille `CarteProduit` (4 colonnes xl) + pagination
- **Aucun résultat** : message + bordure dashed
- **Erreur API** : bandeau rouge

**Filtre** (SSR pur — `<details>`/`<summary>`, sans JavaScript) :
- Toggle cliquable → champs texte `categorie` et `marque`
- Soumet une `<form method="get">` → URL `?q=…&categorie=…&marque=…`
- S'ouvre automatiquement quand des filtres sont actifs
- Badges actifs avec suppression individuelle (× par filtre) et "Effacer tout"

**Pagination** :
- 20 produits par page (défini côté backend `PAGE_SIZE = 20`)
- Numéros de page avec ellipsis (`1 … 4 5 6 … 12`)
- Boutons Précédent / Suivant désactivés aux extrêmes
- Tous les params (`q`, `categorie`, `marque`) sont préservés dans chaque lien

---

### `/produit/[slug]` — Fiche Produit

**Fichier** : `src/app/(public)/produit/[slug]/page.tsx`

**Sections** :
1. Breadcrumb dark (Accueil › Catégories › Produit)
2. Image produit (`next/image` fill, fond gris clair)
3. Badges Marque + Catégorie
4. H1 + boîte prix dark orange
5. Description en bordure gauche orange
6. **Tableau "Comparer les offres"** : boutique / prix (meilleur en orange) / stock (vert/rouge) / lien direct boutique

Le tableau utilise les vraies offres de `produit.offres[]`. Chaque offre a un lien `target="_blank"` vers la boutique.

**`generateMetadata`** : `${nom} - ${marque}`

---

### `/categories` — Liste des catégories

**Fichier** : `src/app/(public)/categories/page.tsx`

Liste verticale de catégories parentes. Chaque catégorie affiche :
- Icône + nom + compteur produits
- Sous-catégories en grille compacte (2→5 colonnes selon breakpoint) avec nom + compteur

Icônes configurées via un dictionnaire `ICONES` par slug :
```typescript
const ICONES: Record<string, string> = {
  informatique: '💻', telephonie: '📱', electromenager: '🏠', gaming: '🎮', ...
}
```

Les sous-catégories sont directement cliquables vers `/categories/<parent>/<sous>`.

---

### `/categories/[...slug]` — Catégorie ou Sous-catégorie détail

**Fichier** : `src/app/(public)/categories/[...slug]/page.tsx`

Route catch-all qui gère deux cas :
- **`/categories/telephonie`** → `slug = ['telephonie']` → catégorie parente
- **`/categories/informatique/stockage`** → `slug = ['informatique', 'stockage']` → sous-catégorie

Dans les deux cas, un seul appel `getCategorieDetail(slug.join('/'), page)` récupère produits + infos catégorie.

**Breadcrumb** :
- Catégorie parente : `Accueil › Catégories › Téléphonie`
- Sous-catégorie : `Accueil › Catégories › Informatique › Stockage`

**Sections** :
1. Hero dark avec breadcrumb (avec lien vers parent si sous-catégorie), icône, H1, compteur produits
2. Grille `CarteProduit` (4 colonnes xl)
3. Empty state si aucun produit

---

### `/marques` — Liste des marques

**Fichier** : `src/app/(public)/marques/page.tsx`

Grille 6 colonnes. Chaque carte : icône placeholder + nom + nb produits.

---

### `/marques/[name]` — Marque détail

**Fichier** : `src/app/(public)/marques/[name]/page.tsx`

Structure identique à la catégorie détail, avec le logo de la marque (placeholder 📦).

---

### `/blog` — Blog listing

**Fichier** : `src/app/(public)/blog/page.tsx`

**Layout** :
1. `PageHero` (bandeau dark)
2. **Article featured** : card horizontale pleine largeur avec badge "À la une"
3. **Grille articles** : 3 colonnes, cards avec image top + hover scale

Le premier article du tableau `articles.data[0]` est séparé en "featured".

---

### `/blog/[slug]` — Article détail

**Fichier** : `src/app/(public)/blog/[slug]/page.tsx`

**Layout** :
1. Breadcrumb dark slim
2. Header : surtitre orange, H1, résumé (bordure gauche orange), date
3. Image hero (`h-96`, `rounded-2xl`)
4. **Avantages / Inconvénients** : 2 cards (vert / rouge), positionnés avant le contenu
5. Contenu HTML : `prose prose-slate` Tailwind avec override des couleurs
6. Retour au blog

**Note sur `dangerouslySetInnerHTML`** : le contenu HTML vient du backend Django. S'assurer que le backend sanitise le HTML avant de l'envoyer.

---

### `/boutiques` — Boutiques partenaires

**Fichier** : `src/app/(public)/boutiques/page.tsx`

Liste des boutiques référencées : nom, URL, lien externe (nouvelle fenêtre).
CTA inline en bas pour référencer une boutique (`/ajouter`).

---

### `/ajouter` — Formulaire de référencement

**Fichier** : `src/app/(public)/ajouter/page.tsx`

**Layout 2 colonnes** :
- **Gauche** : liste des avantages + 2 cards (Boutique / Produit manquant)
- **Droite** : formulaire avec radio cards type de demande, champs boutique + contact

> Le formulaire est à connecter à `POST /api/v1/demandes/` (endpoint disponible sur le backend).

---

### `/contact` — Contact

**Fichier** : `src/app/(public)/contact/page.tsx`

**Layout 2 colonnes** :
- **Gauche** : infos (email, délai réponse)
- **Droite** : formulaire (nom, email, sujet, message)

> ⚠️ Formulaire non connecté au backend.

---

### `/a-propos` — À propos

**Fichier** : `src/app/(public)/a-propos/page.tsx`

Présentation de la mission Toprix, grille des 4 valeurs, CTA boutique.

---

### `404` — Page introuvable

**Fichier** : `src/app/not-found.tsx`

Page dark avec :
- Chiffre `404` géant en orange transparent (opacité 20%)
- Titre + message
- Mini barre de recherche
- 2 boutons : Accueil + Catégories

---

## Métadonnées SEO

Chaque page exporte une `Metadata` via `generateMetadata` ou une constante :

```typescript
// Statique
export const metadata: Metadata = {
  title: 'Titre page',
  description: 'Description...',
}

// Dynamique (pages avec [slug])
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getData(slug)
  return { title: data.nom, description: data.description }
}
```

Le template global `'%s | Toprix'` est défini dans `src/app/layout.tsx`.

---

## Layout tree

```
app/layout.tsx          ← html, body, fonts
└── app/(public)/layout.tsx   ← Header + main + Footer
    ├── page.tsx               ← /
    ├── rechercher/page.tsx    ← /rechercher
    ├── produit/[slug]/        ← /produit/:slug
    ├── categories/            ← /categories + /[...slug] (parent ou sous-catégorie)
    ├── marques/               ← /marques + /:name
    ├── blog/                  ← /blog + /:slug
    ├── boutiques/             ← /boutiques
    ├── ajouter/               ← /ajouter
    ├── contact/               ← /contact
    └── a-propos/              ← /a-propos

app/not-found.tsx       ← 404 (hors layout public — pas de header/footer)
```

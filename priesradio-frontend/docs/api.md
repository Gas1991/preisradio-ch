# Couche API — Toprix Frontend

---

## Architecture

Tous les appels HTTP sont centralisés dans `src/lib/api/`.

```
src/lib/api/
├── config.ts       ← fetchAPI() — fonction générique
├── produits.ts     ← Endpoints produits
├── blog.ts         ← Endpoints blog
├── categories.ts   ← Endpoints catégories
├── marques.ts      ← Endpoints marques
└── boutiques.ts    ← Endpoints boutiques
```

---

## `config.ts` — Fonction générique

```typescript
// URL de base lue depuis .env.local
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T>
```

**Comportement** :
- Construit l'URL complète : `${API_URL}${endpoint}`
- Ajoute le header `Content-Type: application/json`
- Lève une `Error` si `response.ok === false`
- Retourne le JSON parsé typé avec le générique `T`

**Exemple d'utilisation** :
```typescript
const data = await fetchAPI<Produit[]>('/produits/')
```

---

## Types TypeScript — `src/types/index.ts`

### `OffreBoutique`
```typescript
interface OffreBoutique {
  boutique: string
  prix: number
  stock: string
  url: string
  image?: string
}
```

### `Produit`
```typescript
interface Produit {
  id: string
  slug: string | null   // null pour les produits per-store
  nom: string
  marque: string
  prix_min?: number
  prix_max?: number
  image?: string
  categorie: string
  categorie_nom?: string
  description?: string
  en_stock?: boolean
  discount?: number
  reference?: string
  boutique?: string       // nom de la boutique source
  url_boutique?: string   // lien direct boutique
  offres?: OffreBoutique[]
}
```

> **Note :** Quand `slug` est `null`, le frontend utilise `id` (ObjectId) pour la navigation vers `/produit/[id]`.

### `SousCategorie`
```typescript
interface SousCategorie {
  id: string
  slug: string         // format "parent/sous" ex: "informatique/stockage"
  nom: string          // nom lisible ex: "Stockage"
  parent_slug: string  // slug de la catégorie parente ex: "informatique"
  nombre_produits?: number
}
```

### `Categorie`
```typescript
interface Categorie {
  id: string
  slug: string
  nom: string
  image?: string
  nombre_produits?: number
  parent_slug?: string       // présent si sous-catégorie
  parent_nom?: string        // présent si sous-catégorie
  sous_categories?: SousCategorie[]  // présent sur les catégories parentes
}
```

### `Marque`
```typescript
interface Marque {
  id: string
  slug: string
  nom: string
  logo?: string
  nombre_produits?: number
}
```

### `ArticleBlog`
```typescript
interface ArticleBlog {
  id: string
  slug: string
  titre: string
  contenu: string           // HTML brut
  image?: string
  date_publication: string  // ISO 8601
  resume?: string
  avantages?: string[]
  inconvenients?: string[]
  specifications?: SpecificationsBlog
}
```

### `SpecificationsBlog`
```typescript
interface SpecificationsBlog {
  ram?: string
  stockage?: string
  processeur?: string
  ecran?: string
  batterie?: string
  audio?: string
  camera?: string
}
```

### `Boutique`
```typescript
interface Boutique {
  id: string
  nom: string
  site_web?: string
}
```

### `PaginationMeta` & `ReponseAPI<T>`
```typescript
interface PaginationMeta {
  page: number
  total_pages: number
  total_items: number
  par_page: number
}

interface ReponseAPI<T> {
  data: T
  meta?: PaginationMeta
}
```

---

## Modules API

### `produits.ts`

| Fonction | Endpoint | Params | Retour |
|----------|----------|--------|--------|
| `getProduits(params?)` | `GET /produits/` | `q`, `page`, `categorie`, `marque` | `ReponseAPI<Produit[]>` |
| `getProduit(slug)` | `GET /produits/:slug/` | — | `Produit` |

```typescript
// Exemple
const produits = await getProduits({ q: 'iPhone', page: 1 })
const produit  = await getProduit('iphone-15-pro')
```

---

### `blog.ts`

| Fonction | Endpoint | Params | Retour |
|----------|----------|--------|--------|
| `getArticles(page?)` | `GET /blog/` | `page` | `ReponseAPI<ArticleBlog[]>` |
| `getArticle(slug)` | `GET /blog/:slug/` | — | `ArticleBlog` |

---

### `categories.ts`

| Fonction | Endpoint | Params | Retour |
|----------|----------|--------|--------|
| `getCategories()` | `GET /categories/` | — | `ReponseAPI<Categorie[]>` |
| `getCategorieDetail(slug, page?)` | `GET /categories/:slug/?page=N` | `slug` peut être `"informatique"` ou `"informatique/stockage"` | `CategorieDetailReponse` |

```typescript
interface CategorieDetailReponse {
  data: Produit[]        // produits de la catégorie/sous-catégorie
  meta: PaginationMeta
  categorie: Categorie   // inclut parent_slug/parent_nom si sous-catégorie
}
```

> `getCategorie(slug)` (ancienne fonction) a été remplacée par `getCategorieDetail(slug, page?)` qui retourne à la fois les infos de la catégorie ET ses produits, en un seul appel.

---

### `marques.ts`

| Fonction | Endpoint | Retour |
|----------|----------|--------|
| `getMarques()` | `GET /marques/` | `ReponseAPI<Marque[]>` |
| `getMarque(nom)` | `GET /marques/:nom/` | `Marque` |

---

### `boutiques.ts`

| Fonction | Endpoint | Retour |
|----------|----------|--------|
| `getBoutiques()` | `GET /boutiques/` | `ReponseAPI<Boutique[]>` |

---

## Format de réponse attendu du backend

### Liste paginée
```json
{
  "data": [ { "id": "...", "slug": "...", ... } ],
  "meta": {
    "page": 1,
    "total_pages": 5,
    "total_items": 48,
    "par_page": 20
  }
}
```

### Objet unique
```json
{
  "id": "abc123",
  "slug": "iphone-15-pro",
  "nom": "iPhone 15 Pro",
  "marque": "Apple",
  "prix_min": 3499,
  "prix_max": 3899,
  "categorie": "smartphones",
  "description": "...",
  "image": "https://..."
}
```

---

## Gestion des erreurs

### Dans les composants serveur

```typescript
let data = null
let erreur = null

try {
  data = await getData()
} catch {
  erreur = 'Message affiché à l'utilisateur'
}
```

### Codes HTTP gérés

| Code | Comportement |
|------|-------------|
| `200` | Données affichées normalement |
| `404` | `notFound()` → page `not-found.tsx` |
| `4xx / 5xx` | `throw Error` → catch → bandeau rouge inline |
| Réseau hors ligne | Même traitement que `5xx` |

---

## Évolution prévue

### Authentification JWT

Quand le backend implémente l'auth, ajouter dans `config.ts` :

```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}
```

### Cache SSR sélectif

Pour certaines pages moins dynamiques (catégories, marques), remplacer `force-dynamic` par :

```typescript
// Revalider toutes les heures
export const revalidate = 3600
```

Ou dans `fetchAPI` :
```typescript
fetch(url, { next: { revalidate: 3600 } })
```

# Architecture Technique — Toprix Frontend

---

## Stack technologique

| Couche | Technologie | Version | Rôle |
|--------|-------------|---------|------|
| Framework | **Next.js** | 16.1.6 | App Router, SSR, routing |
| Langage | **TypeScript** | ^5 | Typage statique |
| Style | **Tailwind CSS** | v4 | Utility-first, design tokens via `@theme` |
| Icônes | **lucide-react** | ^0.564 | SVG icons tree-shakable |
| Fonts | **next/font/google** | — | Space Grotesk + Inter |
| Rendu | **SSR forcé** | — | `export const dynamic = 'force-dynamic'` |
| Build | **Turbopack** | — | Compilateur Next.js 16 |

---

## Structure des dossiers

```
toprix-frontend/
├── docs/                        ← Documentation (ce dossier)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Root layout (fonts, metadata globale)
│   │   ├── globals.css          ← Design tokens @theme + reset CSS
│   │   ├── not-found.tsx        ← Page 404 custom
│   │   │
│   │   └── (public)/            ← Route group pages publiques
│   │       ├── layout.tsx       ← Layout public (Header + Footer)
│   │       ├── page.tsx         ← Accueil /
│   │       ├── rechercher/      ← /rechercher
│   │       ├── produit/[slug]/  ← /produit/:slug
│   │       ├── categories/      ← /categories + /categories/:slug
│   │       ├── marques/         ← /marques + /marques/:name
│   │       ├── blog/            ← /blog + /blog/:slug
│   │       ├── boutiques/       ← /boutiques
│   │       ├── ajouter/         ← /ajouter
│   │       ├── contact/         ← /contact
│   │       └── a-propos/        ← /a-propos
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       ← Navbar dark sticky
│   │   │   └── Footer.tsx       ← Footer dark
│   │   ├── product/
│   │   │   └── CarteProduit.tsx ← Card produit réutilisable
│   │   └── ui/
│   │       └── PageHero.tsx     ← Bandeau hero pages internes
│   │
│   ├── lib/
│   │   └── api/
│   │       ├── config.ts        ← fetchAPI() générique + base URL
│   │       ├── produits.ts      ← getProduits(), getProduit()
│   │       ├── blog.ts          ← getArticles(), getArticle()
│   │       ├── categories.ts    ← getCategories(), getCategorie()
│   │       ├── marques.ts       ← getMarques(), getMarque()
│   │       └── boutiques.ts     ← getBoutiques()
│   │
│   └── types/
│       └── index.ts             ← Types TypeScript globaux
│
├── public/                      ← Assets statiques
├── .env.local                   ← Variables d'environnement (non commité)
├── next.config.ts               ← Config Next.js
├── tailwind.config (inline)     ← Config Tailwind v4 via globals.css @theme
└── tsconfig.json                ← Config TypeScript
```

---

## Décisions architecturales

### 1. Route Group `(public)`

Toutes les pages visibles sont encapsulées dans le groupe `(public)/`. Cela permet :
- Un **layout commun** (Header + Footer) appliqué à toutes les pages sans affecter le root layout
- Une séparation claire si un espace admin est ajouté plus tard (`(admin)/`)

```
app/
├── layout.tsx         → Root layout : fonts, <html>, <body>
└── (public)/
    ├── layout.tsx     → Public layout : <Header> + <main> + <Footer>
    └── page.tsx       → Route "/"
```

### 2. SSR forcé (`force-dynamic`)

Chaque page exporte :
```typescript
export const dynamic = 'force-dynamic'
```

**Pourquoi** : les données (produits, prix, boutiques) changent fréquemment. Le SSR garantit que l'utilisateur voit toujours les données les plus récentes sans cache stale. Aucune page n'est pré-rendue statiquement.

**Impact** : toutes les routes sont marquées `ƒ (Dynamic)` dans le build.

### 3. Tailwind CSS v4 — Configuration via `@theme`

Tailwind v4 abandonne le fichier `tailwind.config.js` au profit de directives CSS directement dans `globals.css` :

```css
@theme inline {
  --color-brand-primary: #0F172A;
  --color-brand-accent:  #F97316;
  /* ... */
}
```

Ces tokens sont ensuite utilisables comme classes Tailwind standards.

### 4. Couche API centralisée

Tous les appels HTTP passent par `fetchAPI()` dans `lib/api/config.ts`. Avantages :
- Point unique pour gérer les headers, erreurs, timeout
- Facile à étendre (auth JWT, retry…)
- Les modules API (`produits.ts`, `blog.ts`…) sont des wrappers légers

### 5. TypeScript strict

Tous les types de données backend sont définis dans `src/types/index.ts`. Cela :
- Documente le contrat API attendu
- Prévient les erreurs de runtime
- Facilite la migration vers un nouveau backend

---

## Flux de données

```
Navigateur
    │
    ▼
Next.js Server Component (SSR)
    │  await fetchAPI()
    ▼
lib/api/*.ts  →  GET ${API_URL}/endpoint/
    │
    ▼
Backend Django REST API (Serv00)
    │
    ▼
MongoDB
```

Aucun état client (`useState`, `useEffect`) n'est utilisé pour le fetch — tout est server-side.

---

## Gestion des erreurs

Chaque page applique le pattern :

```typescript
let data = null
let erreur = null

try {
  data = await getData()
} catch {
  erreur = 'Message utilisateur'
}
```

- **404 natif** : `notFound()` de Next.js redirige vers `app/not-found.tsx`
- **Erreurs API** : affichage inline d'un bandeau rouge non bloquant
- **Données manquantes** : états vides stylisés (empty states)

---

## `next.config.ts` — Domaines images autorisés

`next/image` bloque par défaut les images externes. Les domaines autorisés :

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'www.tunisianet.com.tn' },
    { protocol: 'https', hostname: 'www.mytek.tn' },
    { protocol: 'https', hostname: 'spacenet.tn' },
    { protocol: 'https', hostname: 'api.toprix.tn' },   // images blog
  ],
}
```

---

## Performances

| Optimisation | Implémentation |
|---|---|
| Images | `next/image` avec `fill` + `sizes` pour responsive |
| Fonts | `next/font/google` avec `display: swap` |
| Icons | `lucide-react` importé à la carte (tree-shaking) |
| CSS | Tailwind v4 purge automatique |
| Build | Turbopack (compilateur Rust) |

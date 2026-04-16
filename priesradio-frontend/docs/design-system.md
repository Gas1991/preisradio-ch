# Design System — Toprix

> Approche **"Tech Premium Dark"** : slate-900 + orange-500, Space Grotesk, composants minimalistes.

---

## Palette de couleurs

Définie via `@theme inline` dans `src/app/globals.css` (Tailwind v4).

| Token CSS | Valeur | Classe Tailwind | Usage |
|-----------|--------|-----------------|-------|
| `--color-brand-primary` | `#0F172A` | `bg-brand-primary` | Navbar, footer, hero sections |
| `--color-brand-accent` | `#F97316` | `bg-brand-accent` | CTA, prix, highlights, bordures actives |
| `--color-brand-accent-hover` | `#EA6C0A` | — | Hover des boutons orange |
| `--color-brand-muted` | `#F8FAFC` | `bg-brand-muted` | Fonds de sections alternées |
| `--color-brand-surface` | `#FFFFFF` | `bg-brand-surface` | Fond principal |
| `--color-brand-text` | `#1E293B` | `text-brand-text` | Texte principal (slate-800) |
| `--color-brand-subtle` | `#64748B` | `text-brand-subtle` | Texte secondaire (slate-500) |
| `--color-brand-border` | `#E2E8F0` | `border-brand-border` | Bordures des cards (slate-200) |

### Utilisation directe par valeur hexadécimale

Dans les composants, les couleurs sont souvent utilisées directement :
```tsx
className="bg-[#0F172A] text-[#F97316] border-[#E2E8F0]"
```

---

## Typographie

### Fontes

| Police | Variable CSS | Usage | Weights |
|--------|-------------|-------|---------|
| **Space Grotesk** | `--font-space-grotesk` | Titres, headings, logo | 500, 600, 700 |
| **Inter** | `--font-inter` | Corps de texte, labels, UI | 400, 500 |

### Configuration dans `layout.tsx`

```typescript
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
})
```

Les variables CSS sont injectées via `className` sur `<html>`.

### Classe utilitaire `.font-heading`

Pour appliquer Space Grotesk à un élément :
```tsx
<h2 className="font-heading text-2xl font-bold">Titre</h2>
```

Les balises `h1–h6` reçoivent automatiquement Space Grotesk via `globals.css`.

### Échelle typographique recommandée

| Usage | Classes Tailwind |
|-------|-----------------|
| Hero H1 | `font-heading text-5xl md:text-6xl font-bold tracking-tight` |
| Titre de section H2 | `font-heading text-2xl md:text-3xl font-bold` |
| Titre de card | `font-heading text-base font-semibold` |
| Corps de texte | `text-sm text-[#64748B] leading-relaxed` |
| Label / caption | `text-xs font-semibold uppercase tracking-widest` |
| Prix | `font-heading text-3xl font-bold text-[#F97316]` |

---

## Composants

### `<PageHero>` — `src/components/ui/PageHero.tsx`

Bandeau hero sombre pour les pages internes (toutes sauf l'accueil).

```tsx
import PageHero from '@/components/ui/PageHero'

<PageHero
  surtitre="Explorer"          // texte orange uppercase (optionnel)
  titre="Toutes les catégories"
  sousTitre="Description courte." // (optionnel)
/>
```

**Rendu** : fond `#0F172A`, halo orange décoratif, titres blancs.

---

### `<CarteProduit>` — `src/components/product/CarteProduit.tsx`

Card produit avec image, marque, nom, prix, flèche animée au hover.

```tsx
import CarteProduit from '@/components/product/CarteProduit'
import type { Produit } from '@/types'

<CarteProduit produit={produit} />
```

**Props** : `produit: Produit`

**Comportements** :
- Image : `next/image` fill avec `object-contain` sur fond `#F8FAFC`
- Hover : `scale-105` sur l'image, bordure orange, flèche fond orange
- Prix affiché en orange `#F97316` avec label "À partir de"
- Fallback image : icône ⚙️ en gris

---

### `<Header>` — `src/components/layout/Header.tsx`

Navbar sticky `#0F172A`.

| Élément | Style |
|---------|-------|
| Logo | `Top` blanc + `rix` orange |
| Liens nav | Slate-300, underline orange animé au hover (`.nav-link`) |
| Bouton Rechercher | Glassmorphism `bg-white/5`, bordure `white/10` |
| CTA Ajouter | Fond orange plein, caché sur mobile |
| Hamburger | Icône `Menu` lucide, visible mobile uniquement |

---

### `<Footer>` — `src/components/layout/Footer.tsx`

Footer `#0F172A`, séparateur gradient orange en haut, 4 colonnes.

---

## Patterns récurrents

### Card interactive

```tsx
className="bg-white border border-[#E2E8F0] rounded-2xl p-5
           hover:border-[#F97316]/40 hover:shadow-md
           transition-all"
```

### Bouton CTA orange principal

```tsx
className="bg-[#F97316] hover:bg-[#EA6C0A] text-white
           font-semibold px-6 py-3 rounded-xl
           transition-colors text-sm"
```

### Badge / tag

```tsx
className="inline-flex items-center gap-1.5
           bg-[#F97316]/10 border border-[#F97316]/30
           text-[#F97316] text-xs font-semibold
           px-3 py-1.5 rounded-full"
```

### Section header avec surtitre

```tsx
<div>
  <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">
    Surtitre
  </p>
  <h2 className="font-heading text-[#0F172A] text-2xl md:text-3xl">
    Titre de section
  </h2>
</div>
```

### Input de formulaire

```tsx
className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3
           text-sm text-[#1E293B] placeholder:text-[#64748B]
           focus:outline-none focus:border-[#F97316]
           focus:ring-1 focus:ring-[#F97316]/20
           transition-colors"
```

### État vide (empty state)

```tsx
<div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl">
  <IconComponent size={32} className="mx-auto text-slate-200 mb-3" />
  <p className="font-heading text-[#0F172A] font-semibold mb-1">Titre</p>
  <p className="text-[#64748B] text-sm">Message d'aide.</p>
</div>
```

---

## Espacements & Radius

| Élément | Radius |
|---------|--------|
| Cards | `rounded-2xl` (16px) |
| Boutons | `rounded-xl` (12px) |
| Badges/tags | `rounded-full` |
| Inputs | `rounded-xl` (12px) |
| Images sections | `rounded-2xl` |

---

## Iconographie

**Bibliothèque** : `lucide-react` — importée à la carte.

```typescript
import { Search, ArrowRight, ChevronRight, Store } from 'lucide-react'
```

**Tailles standards** :

| Contexte | Taille |
|----------|--------|
| Dans les textes | `size={14}` ou `size={15}` |
| Boutons | `size={16}` |
| Headers de section | `size={18}` à `size={20}` |
| Empty states | `size={32}` |

---

## Effets décoratifs

### Halo orange (hero sections)

```tsx
<div className="absolute -top-32 -right-32 w-96 h-96
                bg-[#F97316] rounded-full
                blur-[120px] opacity-20
                pointer-events-none" />
```

### Grille géométrique (hero accueil)

```tsx
<div className="absolute inset-0 opacity-[0.04]"
  style={{
    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
    backgroundSize: '60px 60px',
  }}
/>
```

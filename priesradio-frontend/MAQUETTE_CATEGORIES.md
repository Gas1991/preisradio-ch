# Maquette — Page Catégories (`/categories`)

## 📐 Structure proposée

### 1. Hero Section
**Hauteur** : `min-h-[300px]`
**Background** : Dégradé `bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]`

**Contenu** :
- Badge surtitre : "Explorer" (orange)
- Titre principal : "Toutes les catégories" (`text-4xl md:text-5xl`)
- Sous-titre : "Comparez les meilleurs produits high-tech par catégorie."
- **Nouveau** : Stats compteurs en ligne
  - Total produits (ex: "2,847 produits")
  - Nombre catégories (ex: "14 catégories")
  - Boutiques partenaires (ex: "3 boutiques")

**Layout stats** : Grid 3 colonnes, chaque stat avec icône + nombre + label

---

### 2. Section Catégories Vedettes (Nouveau)
**Avant la liste principale**

Grid de **3 cartes** horizontales avec image de fond (similaire à CategoryScope) :
- **Informatique** (Laptops, PC, Stockage)
- **Téléphonie** (Smartphones, Tablettes, Accessoires)
- **Gaming** (Consoles, PC Gaming, Accessoires)

Chaque carte :
- Image background avec overlay gradient
- Icône catégorie (64px)
- Nom catégorie (`text-2xl`)
- Nombre de produits
- CTA "Explorer" avec flèche

---

### 3. Toutes les Catégories
**Layout actuel** mais amélioré

#### Catégorie parente :
- **Actuel** : Carte blanche avec icône emoji + texte
- **Nouveau** :
  - Ajouter une mini-image de fond (produit représentatif)
  - Badge "Nouveau" si récemment ajouté
  - Compteur produits plus visible (`text-base`, badge orange)
  - Hover : lift effect (`hover:-translate-y-1`)

#### Sous-catégories :
- **Actuel** : Grid 2-5 colonnes, cartes compactes
- **Nouveau** :
  - Icônes spécifiques par sous-catégorie (ou mini-images)
  - Progress bar montrant le % de produits en stock
  - Badge "Hot" pour les catégories populaires

---

### 4. Section CTA (Nouveau)
**En bas de page**

Bannière horizontale avec :
- "Vous ne trouvez pas ce que vous cherchez ?"
- Bouton primaire "Rechercher un produit"
- Bouton secondaire "Voir toutes les marques"

---

## 🎨 Améliorations visuelles

### Icônes catégories
Remplacer les emojis par des icônes SVG Lucide ou images :
- 💻 → Image laptop (ou Monitor icon)
- 📱 → Image smartphone (ou Smartphone icon)
- 🏠 → Image électroménager (ou Home icon)
- etc.

### Palette couleurs par catégorie
Chaque catégorie a sa couleur accent :
- Informatique → Bleu (`#3B82F6`)
- Téléphonie → Violet (`#8B5CF6`)
- Gaming → Vert (`#10B981`)
- Électroménager → Jaune (`#F59E0B`)
- etc.

### Animations
- Fade-in au scroll (Intersection Observer)
- Hover effects : scale, lift, shadow
- Skeleton loaders pendant le chargement

---

## 📱 Responsive

### Mobile (< 640px)
- Hero stats : 1 colonne, stack vertical
- Catégories vedettes : 1 colonne, scroll horizontal
- Sous-catégories : 2 colonnes

### Tablet (640-1024px)
- Catégories vedettes : 2 colonnes + 1 en pleine largeur
- Sous-catégories : 3 colonnes

### Desktop (> 1024px)
- Layout actuel optimisé
- Catégories vedettes : 3 colonnes
- Sous-catégories : 5 colonnes

---

## 🔧 Composants à créer

1. **`<CategoryHero>`** — Hero avec stats
2. **`<FeaturedCategories>`** — 3 cartes vedettes
3. **`<CategoryCard>`** — Carte catégorie avec image
4. **`<SubCategoryCard>`** — Carte sous-catégorie avec icône
5. **`<CategoryCTA>`** — Bannière CTA bas de page

---

## 🚀 Implémentation prioritaire

### Phase 1 (Rapide) :
- ✅ Stats compteurs dans le hero
- ✅ Cartes catégories vedettes (3 principales)
- ✅ Améliorer hover effects

### Phase 2 (Moyen terme) :
- Images/icônes par catégorie
- Couleurs accent par catégorie
- Animations scroll

### Phase 3 (Long terme) :
- Progress bars stock
- Badges "Hot"/"Nouveau"
- Filtres/recherche catégories

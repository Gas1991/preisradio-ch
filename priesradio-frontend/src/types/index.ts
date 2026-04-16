// Types globaux Priesradio (CH)

export interface AngebotShop {
  boutique: string
  prix: number
  stock: string
  url: string
  image?: string
}

// Alias français gardé pour compat avec code existant
export type OffreBoutique = AngebotShop

export interface Produkt {
  id: string
  slug: string | null
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
  reference?: string    // = sku
  sku?: string
  boutique?: string
  url_boutique?: string
  offres?: AngebotShop[]
}

// Alias français gardé pour compat avec code existant
export type Produit = Produkt

export interface Unterkategorie {
  id: string
  slug: string
  nom: string
  parent_slug: string
  nombre_produits?: number
}

export type SousCategorie = Unterkategorie

export interface Kategorie {
  id: string
  slug: string
  nom: string
  image?: string
  nombre_produits?: number
  parent_slug?: string
  parent_nom?: string
  sous_categories?: Unterkategorie[]
}

export type Categorie = Kategorie

export interface Marke {
  id: string
  slug: string
  nom: string
  logo?: string
  nombre_produits?: number
}

export type Marque = Marke

export interface BlogArtikel {
  id: string
  slug: string
  titre: string
  contenu: string
  image?: string
  date_publication: string
  resume?: string
  avantages?: string[]
  inconvenients?: string[]
  specifications?: BlogSpezifikationen
}

export type ArticleBlog = BlogArtikel

export interface BlogSpezifikationen {
  ram?: string
  stockage?: string
  processeur?: string
  ecran?: string
  batterie?: string
  audio?: string
  camera?: string
}

export type SpecificationsBlog = BlogSpezifikationen

export interface Shop {
  id: string
  nom: string
  site_web?: string
}

export type Boutique = Shop

export interface PaginationMeta {
  page: number
  total_pages: number
  total_items: number
  par_page: number
}

export interface ReponseAPI<T> {
  data: T
  meta?: PaginationMeta
}

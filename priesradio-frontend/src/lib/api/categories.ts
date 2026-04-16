import { fetchAPI } from './config'
import type { Categorie, Produit, PaginationMeta, ReponseAPI } from '@/types'

export interface CategorieDetailReponse {
  data: Produit[]
  meta: PaginationMeta
  categorie: Categorie
}

export async function getCategories(): Promise<ReponseAPI<Categorie[]>> {
  return fetchAPI('/categories/')
}

/**
 * Récupère les produits + infos d'une catégorie ou sous-catégorie.
 * slug peut être "informatique" ou "informatique/stockage".
 */
export async function getCategorieDetail(slug: string, page = 1): Promise<CategorieDetailReponse> {
  return fetchAPI(`/categories/${slug}/?page=${page}`)
}

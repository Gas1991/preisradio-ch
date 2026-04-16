import { fetchAPI } from './config'
import type { Produkt, ReponseAPI } from '@/types'

export async function getProdukte(params?: {
  page?: number
  categorie?: string
  marque?: string | string[]
  q?: string
  prix_min?: number
  prix_max?: number
  boutique?: string
  en_stock?: boolean
  tri?: string
}): Promise<ReponseAPI<Produkt[]>> {
  const clean: Record<string, string> = {}
  if (params?.q) clean.q = params.q
  if (params?.page && params.page > 1) clean.page = String(params.page)
  if (params?.categorie) clean.categorie = params.categorie
  if (params?.marque) clean.marque = Array.isArray(params.marque) ? params.marque.join(',') : params.marque
  if (params?.prix_min != null) clean.prix_min = String(params.prix_min)
  if (params?.prix_max != null) clean.prix_max = String(params.prix_max)
  if (params?.boutique) clean.boutique = params.boutique
  if (params?.en_stock) clean.en_stock = '1'
  if (params?.tri) clean.tri = params.tri
  const query = new URLSearchParams(clean).toString()
  return fetchAPI(`/produits/${query ? `?${query}` : ''}`)
}

// Alias pour compat avec code existant
export const getProduits = getProdukte

export async function getProdukt(slug: string): Promise<Produkt> {
  return fetchAPI(`/produits/${slug}/`)
}

// Alias pour compat avec code existant
export const getProduit = getProdukt

import { fetchAPI } from './config'
import type { Marque, ReponseAPI } from '@/types'

export async function getMarques(): Promise<ReponseAPI<Marque[]>> {
  return fetchAPI('/marques/')
}

export async function getMarque(nom: string): Promise<Marque> {
  return fetchAPI(`/marques/${nom}/`)
}

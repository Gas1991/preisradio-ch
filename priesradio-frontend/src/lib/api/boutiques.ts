import { fetchAPI } from './config'
import type { Boutique, ReponseAPI } from '@/types'

export async function getBoutiques(): Promise<ReponseAPI<Boutique[]>> {
  return fetchAPI('/boutiques/')
}

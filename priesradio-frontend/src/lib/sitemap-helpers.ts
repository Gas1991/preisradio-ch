import { API_URL } from '@/lib/config'

const BATCH_SIZE = 30 // requêtes parallèles par batch

/**
 * Fetch toutes les pages d'une catégorie en batches parallèles.
 * Retourne tous les IDs produits sans limite artificielle.
 */
async function fetchAllPagesForCategory(cat: string): Promise<string[]> {
  const ids: string[] = []
  try {
    const res1 = await fetch(`${API_URL}/categories/${cat}/?page=1`, {
      next: { revalidate: 7200 },
    })
    if (!res1.ok) return ids

    const { data: page1, meta } = await res1.json()
    for (const p of page1 || []) {
      if (p.id) ids.push(p.id)
    }

    const totalPages = meta?.total_pages || 1
    if (totalPages <= 1) return ids

    // Fetch pages restantes en batches de BATCH_SIZE
    for (let start = 2; start <= totalPages; start += BATCH_SIZE) {
      const end = Math.min(start + BATCH_SIZE - 1, totalPages)
      const batch = await Promise.allSettled(
        Array.from({ length: end - start + 1 }, (_, i) =>
          fetch(`${API_URL}/categories/${cat}/?page=${start + i}`, {
            next: { revalidate: 7200 },
          }).then((r) => r.json())
        )
      )
      for (const r of batch) {
        if (r.status === 'fulfilled') {
          for (const p of r.value?.data || []) {
            if (p.id) ids.push(p.id)
          }
        }
      }
    }
  } catch {}
  return ids
}

/**
 * Fetch tous les IDs produits pour une liste de catégories en parallèle.
 * Cap à 50 000 (limite XML sitemap standard).
 */
export async function fetchProductIdsForCategories(
  categories: string[],
  maxTotal = 50000
): Promise<string[]> {
  const perCatIds = await Promise.all(
    categories.map((cat) => fetchAllPagesForCategory(cat))
  )

  const seen = new Set<string>()
  const urls: string[] = []
  for (const ids of perCatIds) {
    for (const id of ids) {
      if (!seen.has(id)) {
        seen.add(id)
        urls.push(id)
        if (urls.length >= maxTotal) return urls
      }
    }
  }
  return urls
}

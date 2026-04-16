import type { Metadata } from 'next'
import { getCategories } from '@/lib/api/categories'
import PageHero from '@/components/ui/PageHero'
import CategoriesClient from '@/components/categories/CategoriesClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Produktkategorien | Priesradio',
  description: 'Preise nach Kategorie vergleichen: Smartphones, Laptops, TV & Audio und mehr.',
  alternates: { canonical: '/kategorien' },
}

export default async function KategorienPage() {
  let categories = null
  let fehler = null

  try { categories = await getCategories() } catch { fehler = 'Kategorien konnten nicht geladen werden.' }

  return (
    <div>
      <PageHero
        surtitre="Entdecken"
        titre="Alle Kategorien"
        sousTitre="Vergleiche die besten High-Tech-Produkte nach Kategorie."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {fehler && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{fehler}</div>
        )}

        {categories && (
          <CategoriesClient categories={categories.data} />
        )}
      </div>
    </div>
  )
}

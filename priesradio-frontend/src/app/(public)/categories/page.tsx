import type { Metadata } from 'next'
import { getCategories } from '@/lib/api/categories'
import PageHero from '@/components/ui/PageHero'
import CategoriesClient from '@/components/categories/CategoriesClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catégories de produits high-tech',
  description: 'Comparez les prix par catégorie : smartphones, laptops, écrans, et plus.',
  alternates: { canonical: '/categories' },
}

export default async function CategoriesPage() {
  let categories = null
  let erreur = null

  try { categories = await getCategories() } catch { erreur = 'Impossible de charger les catégories.' }

  return (
    <div>
      <PageHero
        surtitre="Explorer"
        titre="Toutes les catégories"
        sousTitre="Comparez les meilleurs produits high-tech par catégorie."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{erreur}</div>
        )}

        {categories && (
          <CategoriesClient categories={categories.data} />
        )}
      </div>
    </div>
  )
}

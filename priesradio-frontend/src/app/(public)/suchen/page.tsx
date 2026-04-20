import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { getProdukte } from '@/lib/api/produits'
import FilteredProductsSection from '@/components/product/FilteredProductsSection'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Suchen',
  description: 'Suchen und vergleichen Sie die Preise von High-Tech-Produkten in der Schweiz.',
  robots: { index: false, follow: true },
}

interface Props {
  searchParams: Promise<{
    q?: string
    page?: string
    categorie?: string
    marque?: string
    prix_min?: string
    prix_max?: string
    boutique?: string
    en_stock?: string
    tri?: string
  }>
}

export default async function SuchenPage({ searchParams }: Props) {
  const params = await searchParams
  const {
    q: qRaw = '',
    page = '1',
    categorie = '',
    marque = '',
    prix_min = '',
    prix_max = '',
    boutique = '',
    en_stock = '',
    tri = '',
  } = params

  const q = qRaw.trim()
  const marques = marque.split(',').filter(Boolean)
  const hasSearch = !!(q || categorie || marque || prix_min || prix_max || boutique || en_stock === '1')

  let produits = null
  let fehler = null

  if (hasSearch) {
    try {
      produits = await getProdukte({
        q,
        page: Number(page),
        categorie,
        marque: marques.length > 0 ? marques : undefined,
        prix_min: prix_min ? Number(prix_min) : undefined,
        prix_max: prix_max ? Number(prix_max) : undefined,
        boutique: boutique || undefined,
        en_stock: en_stock === '1',
        tri: tri || undefined,
      })
    } catch {
      fehler = 'Ergebnisse konnten nicht geladen werden.'
    }
  }

  return (
    <div>
      {/* Hero Suche */}
      <section className="bg-[#003087] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#5B9BD5] text-xs font-semibold uppercase tracking-widest mb-3">Preisvergleich</p>
          <form method="get" className="flex items-center bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 flex-1 px-5">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="z.B. iPhone 16, Galaxy S25, MacBook Air..."
                autoFocus
                className="w-full py-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 bg-[#0052CC] hover:bg-[#003B9C] text-white font-semibold text-sm px-6 py-4 transition-colors"
            >
              Vergleichen
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {!hasSearch && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
              <Search size={28} className="text-slate-300" />
            </div>
            <p className="font-heading text-[#003087] text-xl font-semibold mb-2">Was suchen Sie?</p>
            <p className="text-[#64748B] text-sm">Geben Sie einen Produktnamen ein, um die Preise zu vergleichen.</p>
          </div>
        )}

        {fehler && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mt-6">{fehler}</div>
        )}

        {hasSearch && !fehler && (
          <FilteredProductsSection
            initialProducts={produits?.data ?? []}
            initialMeta={produits?.meta ?? null}
            fixedQ={q}
            initialFilters={{
              boutique,
              categorie,
              marques,
              prix_min,
              prix_max,
              en_stock: en_stock === '1',
              tri,
            }}
            hideBrand={false}
            hideCategorie={false}
            showQ={q}
          />
        )}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { getMarques } from '@/lib/api/marques'
import PageHero from '@/components/ui/PageHero'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Marques high-tech',
  description: 'Comparez les produits de toutes les grandes marques high-tech.',
  alternates: { canonical: '/marque' },
}

export default async function MarquesPage() {
  let marques = null
  let erreur = null

  try { marques = await getMarques() } catch { erreur = 'Impossible de charger les marques.' }

  return (
    <div>
      <PageHero
        surtitre="Référencées"
        titre="Toutes les marques"
        sousTitre="Apple, Samsung, Sony, et des centaines d'autres marques high-tech."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{erreur}</div>
        )}

        {marques && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {marques.data.map((marque) => (
              <Link
                key={marque.id}
                href={`/marque/${marque.slug}`}
                className="group flex flex-col items-center justify-center gap-2 bg-white border border-[#E2E8F0] rounded-2xl py-5 px-3 hover:border-[#F97316]/50 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-xl group-hover:bg-[#F97316]/10 transition-colors">
                  📦
                </div>
                <p className="font-semibold text-[#1E293B] text-sm text-center group-hover:text-[#F97316] transition-colors">
                  {marque.nom}
                </p>
                {marque.nombre_produits !== undefined && (
                  <p className="text-xs text-[#64748B]">{marque.nombre_produits} produits</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

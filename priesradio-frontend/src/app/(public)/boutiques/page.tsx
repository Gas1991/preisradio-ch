import type { Metadata } from 'next'
import { getBoutiques } from '@/lib/api/boutiques'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ExternalLink, Store, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Partner-Shops | Priesradio',
  description: 'Alle auf Priesradio referenzierten High-Tech-Shops in der Schweiz.',
}

export default async function BoutiquesPage() {
  let boutiques = null
  let fehler = null

  try { boutiques = await getBoutiques() } catch { fehler = 'Shops konnten nicht geladen werden.' }

  return (
    <div>
      <PageHero
        surtitre="Partner"
        titre="Referenzierte Shops"
        sousTitre="Alle High-Tech-Shops, deren Preise wir vergleichen."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {fehler && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{fehler}</div>
        )}

        {boutiques && boutiques.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boutiques.data.map((boutique) => (
              <div
                key={boutique.id}
                className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4 hover:border-[#0052CC]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    <Store size={18} className="text-[#64748B]" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#003087] text-sm">{boutique.nom}</p>
                    {boutique.site_web && (
                      <p className="text-xs text-[#64748B] truncate max-w-[160px]">{boutique.site_web}</p>
                    )}
                  </div>
                </div>
                {boutique.site_web && (
                  <a
                    href={boutique.site_web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#0052CC] hover:border-[#0052CC] transition-colors group shrink-0"
                    aria-label={`${boutique.nom} besuchen`}
                  >
                    <ExternalLink size={13} className="text-[#64748B] group-hover:text-white transition-colors" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          !fehler && (
            <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl">
              <Store size={32} className="mx-auto text-slate-200 mb-3" />
              <p className="font-heading text-[#003087] font-semibold mb-1">Noch keine Shops</p>
              <p className="text-[#64748B] text-sm">Die Partner-Shops werden bald angezeigt.</p>
            </div>
          )
        )}

        {/* CTA Shop hinzufügen */}
        <div className="mt-12 bg-[#003087] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading text-white text-lg font-bold mb-1">Ihr Shop ist nicht gelistet?</p>
            <p className="text-slate-400 text-sm">Referenzieren Sie ihn kostenlos und erreichen Sie Tausende von Käufern.</p>
          </div>
          <Link
            href="/hinzufuegen"
            className="shrink-0 inline-flex items-center gap-2 bg-[#D0021B] hover:bg-[#B50018] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <Plus size={15} />
            Meinen Shop hinzufügen
          </Link>
        </div>
      </div>
    </div>
  )
}

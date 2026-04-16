import type { Metadata } from 'next'
import { getBoutiques } from '@/lib/api/boutiques'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ExternalLink, Store, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Boutiques partenaires',
  description: "Découvrez toutes les boutiques high-tech référencées sur Toprix.",
}

export default async function BoutiquesPage() {
  let boutiques = null
  let erreur = null

  try { boutiques = await getBoutiques() } catch { erreur = 'Impossible de charger les boutiques.' }

  return (
    <div>
      <PageHero
        surtitre="Partenaires"
        titre="Boutiques référencées"
        sousTitre="Toutes les boutiques high-tech dont nous comparons les prix."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{erreur}</div>
        )}

        {boutiques && boutiques.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boutiques.data.map((boutique) => (
              <div
                key={boutique.id}
                className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4 hover:border-[#F97316]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    <Store size={18} className="text-[#64748B]" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#0F172A] text-sm">{boutique.nom}</p>
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
                    className="ml-3 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] transition-colors group shrink-0"
                    aria-label={`Visiter ${boutique.nom}`}
                  >
                    <ExternalLink size={13} className="text-[#64748B] group-hover:text-white transition-colors" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          !erreur && (
            <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl">
              <Store size={32} className="mx-auto text-slate-200 mb-3" />
              <p className="font-heading text-[#0F172A] font-semibold mb-1">Aucune boutique pour le moment</p>
              <p className="text-[#64748B] text-sm">Les boutiques partenaires seront bientôt affichées.</p>
            </div>
          )
        )}

        {/* CTA ajouter boutique */}
        <div className="mt-12 bg-[#0F172A] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading text-white text-lg font-bold mb-1">Votre boutique n'est pas listée ?</p>
            <p className="text-slate-400 text-sm">Référencez-la gratuitement et touchez des milliers d'acheteurs.</p>
          </div>
          <Link
            href="/ajouter"
            className="shrink-0 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <Plus size={15} />
            Ajouter ma boutique
          </Link>
        </div>
      </div>
    </div>
  )
}

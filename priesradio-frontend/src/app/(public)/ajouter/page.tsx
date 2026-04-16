import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { Store, Package, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ajouter une boutique ou un produit',
  description: "Référencez votre boutique high-tech ou signalez un produit manquant sur Toprix.",
}

const AVANTAGES = [
  "Visibilité gratuite auprès de milliers d'acheteurs",
  'Vos prix comparés en temps réel',
  'Aucune commission sur les ventes',
  'Référencement sous 48h',
]

export default function AjouterPage() {
  return (
    <div>
      <PageHero
        surtitre="Référencement"
        titre="Ajouter une boutique"
        sousTitre="Rejoignez Toprix gratuitement et touchez des milliers d'acheteurs high-tech."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Bénéfices */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-2">Pourquoi nous rejoindre ?</p>
              <h2 className="font-heading text-[#0F172A] text-xl font-bold">Référencement 100% gratuit</h2>
            </div>
            <ul className="space-y-3">
              {AVANTAGES.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-[#1E293B]">
                  <CheckCircle2 size={16} className="text-[#F97316] shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>

            <div className="border-t border-[#E2E8F0] pt-6 space-y-3">
              <div className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                <Store size={18} className="text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">Boutique</p>
                  <p className="text-xs text-[#64748B]">Référencez toute votre boutique</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                <Package size={18} className="text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">Produit manquant</p>
                  <p className="text-xs text-[#64748B]">Signalez un produit absent du catalogue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <form className="lg:col-span-3 space-y-5">

            {/* Type */}
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-2">Type de demande</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: 'boutique', label: '🏪 Boutique',        desc: 'Référencer ma boutique' },
                  { val: 'produit',  label: '📦 Produit manquant', desc: 'Signaler un produit' },
                ].map(({ val, label, desc }) => (
                  <label key={val} className="cursor-pointer">
                    <input type="radio" name="type" value={val} className="peer sr-only" defaultChecked={val === 'boutique'} />
                    <div className="border-2 border-[#E2E8F0] peer-checked:border-[#F97316] peer-checked:bg-[#F97316]/5 rounded-xl p-4 transition-all">
                      <p className="font-semibold text-[#0F172A] text-sm">{label}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Infos boutique */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Nom de la boutique</label>
                <input
                  type="text" name="boutique_nom"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="Ex : TechStore.tn"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Site web</label>
                <input
                  type="url" name="site_web"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Nom du contact</label>
                <input
                  type="text" name="contact"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Email</label>
                <input
                  type="email" name="email"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Téléphone (optionnel)</label>
              <input
                type="tel" name="telephone"
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                placeholder="+216 XX XXX XXX"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
              Envoyer la demande
            </button>

            <p className="text-xs text-center text-[#64748B]">
              Votre demande sera traitée sous 48h. Service entièrement gratuit.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

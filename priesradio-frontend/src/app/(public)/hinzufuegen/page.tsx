import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { Store, Package, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop oder Produkt hinzufügen | Priesradio',
  description: 'Referenzieren Sie Ihren High-Tech-Shop oder melden Sie ein fehlendes Produkt auf Priesradio.',
}

const VORTEILE = [
  'Kostenlose Sichtbarkeit bei Tausenden von Käufern',
  'Ihre Preise werden in Echtzeit verglichen',
  'Keine Provision auf Verkäufe',
  'Referenzierung innerhalb von 48 Stunden',
]

export default function HinzufuegenPage() {
  return (
    <div>
      <PageHero
        surtitre="Referenzierung"
        titre="Shop hinzufügen"
        sousTitre="Treten Sie Priesradio kostenlos bei und erreichen Sie Tausende von High-Tech-Käufern."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Vorteile */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-2">Warum mitmachen?</p>
              <h2 className="font-heading text-[#0F172A] text-xl font-bold">100 % kostenlose Referenzierung</h2>
            </div>
            <ul className="space-y-3">
              {VORTEILE.map((v) => (
                <li key={v} className="flex items-start gap-3 text-sm text-[#1E293B]">
                  <CheckCircle2 size={16} className="text-[#F97316] shrink-0 mt-0.5" />
                  {v}
                </li>
              ))}
            </ul>

            <div className="border-t border-[#E2E8F0] pt-6 space-y-3">
              <div className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                <Store size={18} className="text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">Shop</p>
                  <p className="text-xs text-[#64748B]">Gesamten Shop referenzieren</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                <Package size={18} className="text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">Fehlendes Produkt</p>
                  <p className="text-xs text-[#64748B]">Ein fehlendes Produkt im Katalog melden</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formular */}
          <form className="lg:col-span-3 space-y-5">

            {/* Anfragetyp */}
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-2">Art der Anfrage</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: 'boutique', label: '🏪 Shop',                 desc: 'Meinen Shop referenzieren' },
                  { val: 'produit',  label: '📦 Fehlendes Produkt',    desc: 'Ein Produkt melden' },
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

            {/* Shop-Infos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Shop-Name</label>
                <input
                  type="text" name="boutique_nom"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="z.B. TechStore.ch"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Website</label>
                <input
                  type="url" name="site_web"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Kontakt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Kontaktname</label>
                <input
                  type="text" name="contact"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">E-Mail</label>
                <input
                  type="email" name="email"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="ihre@email.ch"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Telefon (optional)</label>
              <input
                type="tel" name="telephone"
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                placeholder="+41 XX XXX XX XX"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
              Anfrage senden
            </button>

            <p className="text-xs text-center text-[#64748B]">
              Ihre Anfrage wird innerhalb von 48 Stunden bearbeitet. Vollständig kostenloser Service.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { Zap, Search, ShoppingBag, TrendingUp, Store, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Über uns | Priesradio',
  description: 'Priesradio ist der Schweizer Preisvergleich für High-Tech. Vergleiche Preise bei Digitec, Interdiscount und Brack.',
  alternates: { canonical: '/ueber-uns' },
  openGraph: {
    title: 'Über uns – Priesradio | Preisvergleich Schweiz',
    description: 'Priesradio vergleicht die Preise von Smartphones, Laptops und anderen High-Tech-Produkten bei den wichtigsten Schweizer Online-Shops.',
    type: 'website',
  },
}

const WERTE = [
  { icon: Search,      titel: 'Transparenz',       beschr: 'Alle Preise, alle Shops, in Echtzeit.' },
  { icon: Zap,         titel: 'Schnelligkeit',      beschr: 'Das beste Angebot in wenigen Sekunden finden.' },
  { icon: ShoppingBag, titel: 'Grosses Sortiment',  beschr: '+100 000 High-Tech-Produkte referenziert.' },
  { icon: TrendingUp,  titel: 'Sparen',             beschr: 'Vergleichen und bis zu 30 % sparen.' },
]

const SHOPS = [
  { nom: 'Digitec',       couleur: 'bg-blue-50 border-blue-100 text-blue-700' },
  { nom: 'Interdiscount', couleur: 'bg-red-50 border-red-100 text-red-700' },
  { nom: 'Brack',         couleur: 'bg-green-50 border-green-100 text-green-700' },
]

const KATEGORIEN = [
  'Smartphones', 'Laptops', 'Tablets', 'Gaming',
  'TV & Audio', 'Haushaltsgeräte', 'Computer', 'Foto & Video',
]

const FAQ = [
  {
    f: 'Wie ruft Priesradio die Preise ab?',
    a: 'Priesradio sammelt und aktualisiert automatisch die Preise von den offiziellen Websites von Digitec, Interdiscount und Brack. Die Daten werden regelmässig aktualisiert, um zuverlässige Vergleiche zu bieten.',
  },
  {
    f: 'Ist Priesradio kostenlos?',
    a: 'Ja, Priesradio ist vollständig kostenlos. Sie können Preise vergleichen und auf alle Angebote zugreifen, ohne ein Abonnement abschliessen zu müssen.',
  },
  {
    f: 'Kann ich direkt auf Priesradio kaufen?',
    a: 'Nein, Priesradio ist ein Preisvergleichsportal. Wenn Sie das beste Angebot gefunden haben, werden Sie auf die offizielle Website des Shops weitergeleitet, um den Kauf abzuschliessen.',
  },
  {
    f: 'Welche Shops werden verglichen?',
    a: 'Priesradio vergleicht derzeit die Preise von Digitec, Interdiscount und Brack — den drei wichtigsten High-Tech-Online-Shops in der Schweiz.',
  },
  {
    f: 'Wie oft werden die Preise aktualisiert?',
    a: 'Die Preise werden automatisch und regelmässig aktualisiert, um die Echtzeit-Angebote der Partner-Shops widerzuspiegeln.',
  },
]

export default function AProposPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ f, a }) => ({
      '@type': 'Question',
      name: f,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Über uns – Priesradio',
    url: 'https://priesradio.ch/ueber-uns',
    mainEntity: {
      '@type': 'Organization',
      name: 'Priesradio',
      url: 'https://priesradio.ch',
      description: 'Preisvergleich für High-Tech in der Schweiz. Vergleicht Preise bei Digitec, Interdiscount und Brack.',
      foundingDate: '2025',
      areaServed: 'Switzerland',
      knowsAbout: ['Preisvergleich', 'High-Tech', 'Schweiz', 'Digitec', 'Interdiscount', 'Brack'],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div>
        <PageHero
          surtitre="Über uns"
          titre="Was ist Priesradio?"
          sousTitre="Der erste Preisvergleich für High-Tech-Produkte in der Schweiz."
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Mission */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#0052CC] text-xs font-semibold uppercase tracking-widest mb-2">Unsere Mission</p>
              <h2 className="font-heading text-[#003087] text-2xl md:text-3xl font-bold mb-4">
                Besser kaufen, weniger ausgeben
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                Priesradio vergleicht in Echtzeit die Preise von Digitec, Interdiscount und Brack,
                damit Sie das beste Angebot für Ihre High-Tech-Produkte finden —
                Smartphones, Laptops, TV, Audio, Gaming und vieles mehr.
              </p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Unser Service ist für Konsumenten vollständig kostenlos. Wir erhalten keine
                Provision auf Verkäufe — unser einziges Ziel ist Ihre Zufriedenheit.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {WERTE.map(({ icon: Icon, titel, beschr }) => (
                <div key={titel} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-xl bg-[#0052CC]/10 flex items-center justify-center mb-3">
                    <Icon size={15} className="text-[#0052CC]" />
                  </div>
                  <p className="font-heading font-semibold text-[#003087] text-sm mb-1">{titel}</p>
                  <p className="text-[#64748B] text-xs leading-relaxed">{beschr}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Shops */}
          <section>
            <h2 className="font-heading text-[#003087] text-xl font-bold mb-2">Verglichene Shops</h2>
            <p className="text-[#64748B] text-sm mb-5">
              Priesradio aggregiert Daten von 3 offiziellen Schweizer Shops.
            </p>
            <div className="flex flex-wrap gap-3">
              {SHOPS.map(({ nom, couleur }) => (
                <span key={nom} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${couleur}`}>
                  <Store size={14} />
                  {nom}
                </span>
              ))}
            </div>
          </section>

          {/* Kategorien */}
          <section>
            <h2 className="font-heading text-[#003087] text-xl font-bold mb-2">Verfügbare Kategorien</h2>
            <p className="text-[#64748B] text-sm mb-5">
              Über 100 000 Produkte verglichen in 8 Hauptkategorien.
            </p>
            <div className="flex flex-wrap gap-2">
              {KATEGORIEN.map(kat => (
                <span key={kat} className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-[#0052CC]" />
                  {kat}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-[#003087] text-xl font-bold mb-6">Häufige Fragen</h2>
            <div className="space-y-4">
              {FAQ.map(({ f, a }) => (
                <div key={f} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
                  <p className="font-semibold text-[#003087] text-sm mb-2">{f}</p>
                  <p className="text-[#475569] text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Shop */}
          <section className="bg-[#003087] rounded-2xl p-8 text-center">
            <h2 className="font-heading text-white text-xl font-bold mb-2">
              Sie haben einen High-Tech-Shop?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Treten Sie Priesradio kostenlos bei und erreichen Sie Tausende von Käufern.
            </p>
            <Link
              href="/hinzufuegen"
              className="inline-flex items-center gap-2 bg-[#D0021B] hover:bg-[#B50018] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Meinen Shop referenzieren
            </Link>
          </section>

        </div>
      </div>
    </>
  )
}

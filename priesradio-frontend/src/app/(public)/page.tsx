import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Search, Zap, ArrowRight, CheckCircle2,
  TrendingUp, Smartphone, Home,
} from 'lucide-react'
import { getProdukte } from '@/lib/api/produits'
import CarouselProduits from '@/components/ui/CarouselProduits'
import Image from 'next/image'
import MarqueeMarques from '@/components/ui/MarqueeMarques'
import CarouselCategories from '@/components/ui/CarouselCategories'
import CarouselEdito from '@/components/ui/CarouselEdito'
import { BannerHowItWorks } from '@/components/ui/Banners'
import CategoryScope from '@/components/ui/CategoryScope'

export const dynamic = 'force-dynamic'

const SITE_URL = 'https://ch.preisradio.de'

export const metadata: Metadata = {
  title: 'Priesradio - Preisvergleich Schweiz | Beste Preise 2026',
  description: 'Vergleiche sofort die Preise von Tausenden High-Tech-Produkten in der Schweiz. Smartphones, PCs, TV bei Digitec, Interdiscount, Brack.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Priesradio - Preisvergleich Schweiz',
    description: 'Finde die besten High-Tech-Angebote in der Schweiz. Preise in Echtzeit bei Digitec, Interdiscount und Brack vergleichen.',
    url: SITE_URL,
    type: 'website',
  },
}

const STATS = [
  { valeur: '100 000+', label: 'Produkte'  },
  { valeur: '200+',     label: 'Marken'    },
  { valeur: '3',        label: 'Shops'     },
]

const VORTEILE = [
  'Preise in Echtzeit vergleichen',
  '3 Schweizer Shops',
  'Bestes Angebot in Sekunden finden',
]

function SectionHeader({
  eyebrow, title, icon: Icon, href, linkLabel,
}: {
  eyebrow: string
  title: string
  icon: React.FC<{ size?: number; className?: string }>
  href: string
  linkLabel: string
}) {
  return (
    <div className="flex items-end justify-between mb-6 sm:mb-8">
      <div>
        <p className="text-[#0052CC] text-xs font-semibold uppercase tracking-widest mb-1 flex items-center gap-1.5">
          <Icon size={12} />
          {eyebrow}
        </p>
        <h2 className="font-heading text-[#003087] text-2xl md:text-3xl">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0052CC] sm:text-slate-500 hover:text-[#0052CC] transition-colors shrink-0 ml-3"
      >
        <span className="hidden sm:inline">{linkLabel}</span>
        <span className="sm:hidden">Alle</span>
        <ArrowRight size={13} />
      </Link>
    </div>
  )
}

export default async function StartseiteSeite() {
  const [smartphonesRes, kaffeeRes, kuehlRes, waschRes, staubRes, fritteuseRes, klimaRes, trocknerRes] = await Promise.allSettled([
    getProdukte({ categorie: 'smartphones' }),
    getProdukte({ categorie: 'kaffeemaschinen' }),
    getProdukte({ categorie: 'kuehlschrank' }),
    getProdukte({ categorie: 'waschmaschine' }),
    getProdukte({ categorie: 'staubsauger-roboter' }),
    getProdukte({ categorie: 'fritteuse' }),
    getProdukte({ categorie: 'klimaanlage' }),
    getProdukte({ categorie: 'waeschetrockner' }),
  ])

  const smartphones = smartphonesRes.status === 'fulfilled' ? smartphonesRes.value.data.slice(0, 20) : []
  const kaffee      = kaffeeRes.status      === 'fulfilled' ? kaffeeRes.value.data.slice(0, 20)      : []
  const kuehl       = kuehlRes.status       === 'fulfilled' ? kuehlRes.value.data.slice(0, 20)       : []
  const wasch       = waschRes.status       === 'fulfilled' ? waschRes.value.data.slice(0, 20)       : []

  const categoryImages: Record<string, string> = {
    smartphones:          smartphonesRes.status === 'fulfilled' ? (smartphonesRes.value.data[0]?.image ?? '') : '',
    kaffeemaschinen:      kaffeeRes.status      === 'fulfilled' ? (kaffeeRes.value.data[0]?.image      ?? '') : '',
    kuehlschrank:         kuehlRes.status       === 'fulfilled' ? (kuehlRes.value.data[0]?.image       ?? '') : '',
    waschmaschine:        waschRes.status       === 'fulfilled' ? (waschRes.value.data[0]?.image       ?? '') : '',
    'staubsauger-roboter': staubRes.status      === 'fulfilled' ? (staubRes.value.data[0]?.image       ?? '') : '',
    fritteuse:            fritteuseRes.status   === 'fulfilled' ? (fritteuseRes.value.data[0]?.image   ?? '') : '',
    klimaanlage:          klimaRes.status       === 'fulfilled' ? (klimaRes.value.data[0]?.image       ?? '') : '',
    waeschetrockner:      trocknerRes.status    === 'fulfilled' ? (trocknerRes.value.data[0]?.image    ?? '') : '',
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Priesradio',
    url: SITE_URL,
    description: 'Preisvergleich für High-Tech in der Schweiz: Digitec, Interdiscount, Brack.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/suchen/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Priesradio',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/web-app-manifest-512x512.png` },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-white">

      {/* ─────────────────────────────────── HERO ───────────────────────────── */}
      <section className="relative bg-[#003087] min-h-[400px] overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0052CC] rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 -left-16 w-64 h-64 bg-[#0052CC] rounded-full blur-[100px] opacity-10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-8 pt-10 sm:pt-12 pb-20 text-center">

          <div className="inline-flex items-center gap-2 bg-[#0052CC]/10 border border-[#0052CC]/30 text-[#5B9BD5] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            <Zap size={11} />
            Preisvergleich Nr. 1 in der Schweiz 🇨🇭
          </div>

          <h1 className="font-heading text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            Vergleiche Produkte<br />
            <span className="text-[#D0021B]">zum besten Preis</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Smartphones, Laptops, TV, Gaming — sofort bei Digitec, Interdiscount und Brack vergleichen.
          </p>

          <form
            action="/suchen"
            method="get"
            className="flex items-center bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/40 max-w-2xl mx-auto mb-12"
          >
            <div className="flex items-center gap-3 flex-1 px-5">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="z.B. iPhone 16, Galaxy S25, MacBook Air..."
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {VORTEILE.map((a) => (
              <div key={a} className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle2 size={14} className="text-[#0052CC] shrink-0" />
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Stats-Leiste */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/[0.03]">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-center gap-10 sm:gap-16">
            {STATS.map(({ valeur, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-white text-xl font-bold">{valeur}</p>
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── KATEGORIEN-KARUSSELL ────────────────────────────── */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <CarouselCategories categoryImages={categoryImages} />
        </div>
      </section>

      {/* ══════════════════════════ KAFFEEMASCHINEN ══════════════════════════════ */}
      {kaffee.length > 0 && (
        <section className="bg-[#003087] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#0052CC]" />
                  <span className="text-[#5B9BD5] text-[10px] font-bold uppercase tracking-[0.2em]">Kategorie</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl" style={{ color: '#CBD5E1' }}>Kaffeemaschinen</h2>
                <p className="text-sm" style={{ color: '#CBD5E1' }}>Vollautomaten · Kapselmaschinen · Filter · Espresso</p>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <Link
                  href="/kategorien/kaffeemaschinen"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-[#0052CC] hover:text-[#5B9BD5] text-white/70 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  Alle anzeigen <ArrowRight size={12} />
                </Link>
              </div>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-[#0052CC]/60 via-white/5 to-transparent" />
          </div>
          <div className="px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <CarouselEdito produits={kaffee} />
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────── SO FUNKTIONIERT ES ─────────────────────── */}
      <BannerHowItWorks />

      {/* ══════════════════════════ KÜHLSCHRANK ══════════════════════════════════ */}
      {kuehl.length > 0 && (
        <section className="bg-white py-12 sm:py-16 border-t-4 border-[#3B82F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#3B82F6]" />
                  <span className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-[0.2em]">Kategorie</span>
                </div>
                <h2 className="font-heading text-[#003087] text-3xl sm:text-4xl">Kühlschränke</h2>
                <p className="text-slate-400 text-sm">Freistehend · Einbau · Kombination · Side-by-Side</p>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <Link
                  href="/kategorien/kuehlschrank"
                  className="inline-flex items-center gap-2 border border-[#3B82F6]/30 hover:border-[#3B82F6] hover:text-[#3B82F6] text-slate-500 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  Alle anzeigen <ArrowRight size={12} />
                </Link>
              </div>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-[#3B82F6]/40 via-slate-100 to-transparent" />
          </div>
          <div className="px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <CarouselEdito produits={kuehl} />
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────── SMARTPHONES ────────────────────────────── */}
      {smartphones.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Kategorie"
              title="Smartphones"
              icon={Smartphone}
              href="/kategorien/smartphones"
              linkLabel="Alle Smartphones"
            />
            <CarouselProduits produits={smartphones} />
          </div>
        </section>
      )}

      {/* ──────────────────────────── WASCHMASCHINEN ─────────────────────────── */}
      {wasch.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Kategorie"
              title="Waschmaschinen"
              icon={Home}
              href="/kategorien/waschmaschine"
              linkLabel="Alle anzeigen"
            />
            <CarouselProduits produits={wasch} />
          </div>
        </section>
      )}

      {/* ──────────────────────── KATEGORIE-SCOPE ─────────────────────────────── */}
      <CategoryScope />

      {/* ────────────────────────────── MARKEN ──────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[#0052CC] text-xs font-semibold uppercase tracking-widest mb-1">Verfügbar</p>
              <h2 className="font-heading text-[#003087] text-2xl md:text-3xl">
                Verfügbare Marken
              </h2>
            </div>
            <Link
              href="/marke"
              className="flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0052CC] sm:text-slate-500 hover:text-[#0052CC] transition-colors shrink-0 ml-3"
            >
              <span className="hidden sm:inline">Alle anzeigen</span>
              <span className="sm:hidden">Alle</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <MarqueeMarques />
      </section>

      {/* ────────────────────────── CTA SHOP ─────────────────────────────── */}
      <section className="bg-[#003087] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-white text-2xl md:text-3xl mb-3">
            Sie haben einen High-Tech-Shop?
          </h2>
          <p className="text-slate-400 mb-8">
            Referenzieren Sie Ihre Produkte kostenlos und erreichen Sie Tausende von Käufern.
          </p>
          <Link
            href="/hinzufuegen"
            className="inline-flex items-center gap-2 bg-[#D0021B] hover:bg-[#B50018] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Shop hinzufügen <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
    </>
  )
}

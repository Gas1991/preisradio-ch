import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   1. BannerStats → Hero promo split banner
   Desktop : flex-row   ~ 1200 × 320px  (Text 55% | Bild 45%)
   Mobile  : flex-col   Text oben, Bildbereich unten (~180px)
   ───────────────────────────────────────────────────────────────────────────── */

export function BannerStats() {
  return (
    <div className="bg-[#003087] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Redaktioneller Header */}
        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-0.5 bg-[#0052CC]" />
            <span className="text-[#0052CC] text-[10px] font-bold uppercase tracking-[0.2em]">Kategorie</span>
          </div>
          <h2 className="font-heading text-white text-2xl sm:text-3xl">Fernseher</h2>
          <p className="text-slate-500 text-sm">Smart TV · OLED · QLED · 4K</p>
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. BannerHowItWorks → 3 Kategorie-Karten mit Bildbereich
   Jede Karte : Bildbereich h-44 sm:h-48  +  Footer 80px
   Desktop : grid-cols-3 (~380 × 340px jede)
   Mobile  : grid-cols-1 (volle Breite, scrollbar)
   ───────────────────────────────────────────────────────────────────────────── */

const CAT_BANNERS = [
  {
    slug: 'staubsauger-roboter',
    href: '/kategorien/staubsauger-roboter',
    label: 'Staubsauger-Roboter',
    sub: 'Saug- & Wischroboter',
    img: '/banners/cat-staubsauger.webp',
    tag: 'bg-purple-50 text-purple-700',
  },
  {
    slug: 'fritteuse',
    href: '/kategorien/fritteuse',
    label: 'Fritteusen',
    sub: 'Heissluft & Öl',
    img: '/banners/cat-fritteuse.webp',
    tag: 'bg-orange-50 text-orange-700',
  },
  {
    slug: 'klimaanlage',
    href: '/kategorien/klimaanlage',
    label: 'Klimaanlagen',
    sub: 'Splits, Mobil & Lüftung',
    img: '/banners/cat-klimaanlage.webp',
    tag: 'bg-blue-50 text-blue-700',
  },
  {
    slug: 'waeschetrockner',
    href: '/kategorien/waeschetrockner',
    label: 'Wäschetrockner',
    sub: 'Wärme, Kondens & Abluft',
    img: '/banners/cat-waeschetrockner.webp',
    tag: 'bg-slate-100 text-slate-700',
  },
]

export function BannerHowItWorks({ categoryImages = {} }: { categoryImages?: Record<string, string> }) {
  return (
    <div className="px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Titel */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#0052CC] text-xs font-semibold uppercase tracking-widest mb-1">Entdecken</p>
            <h2 className="font-heading text-[#003087] text-2xl sm:text-3xl">Beliebte Kategorien</h2>
          </div>
          <Link
            href="/kategorien"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#0052CC] transition-colors shrink-0 ml-3"
          >
            <span className="hidden sm:inline">Alle anzeigen</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4 Karten — desktop grid-cols-4 · mobile grid-cols-2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {CAT_BANNERS.map(({ slug, href, label, sub, img, tag }) => {
            const src = categoryImages[slug] || img
            const isProductImg = src.startsWith('http')
            return (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg hover:border-transparent transition-all duration-200"
            >
              {/* ── Bildbereich h-40 mobile · h-44 desktop ── */}
              <div className="relative h-40 sm:h-44 overflow-hidden bg-[#F8FAFC]">
                <Image
                  src={src}
                  alt={label}
                  fill
                  className={`group-hover:scale-105 transition-transform duration-500 ${isProductImg ? 'object-contain p-3' : 'object-cover'}`}
                  sizes="(max-width: 640px) calc(50vw - 24px), 240px"
                  unoptimized={isProductImg}
                />
                {/* Overlay unten für Lesbarkeit */}
                {!isProductImg && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                    <p className="absolute bottom-3 left-4 text-white font-heading font-bold text-sm z-20 drop-shadow">
                      {label}
                    </p>
                    <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 z-20">
                      <Zap size={8} /> Ansehen
                    </span>
                  </>
                )}
              </div>

              {/* Kartenfuss */}
              <div className="bg-white px-4 py-4 flex items-center justify-between gap-2">
                <div>
                  <p className="font-heading text-[#003087] font-semibold text-sm">{label}</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">{sub}</p>
                </div>
                <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${tag} flex items-center gap-1`}>
                  Entdecken <ArrowRight size={9} />
                </span>
              </div>
            </Link>
          )})}
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. BannerBoutiques — Partner-Shops (zwischen Elektrogeräten und Marken)
   ───────────────────────────────────────────────────────────────────────────── */

const BOUTIQUES = [
  {
    nom: 'Digitec',
    href: '/suchen?boutique=digitec',
    logo: '/shops/digitec.png',
    badge: 'Informatik & High-Tech',
    color: 'border-blue-100 hover:border-blue-300',
    tag: 'bg-blue-50 text-blue-600',
  },
  {
    nom: 'Interdiscount',
    href: '/suchen?boutique=interdiscount',
    logo: '/shops/interdiscount.png',
    badge: 'Elektronik & Foto',
    color: 'border-red-100 hover:border-red-300',
    tag: 'bg-red-50 text-red-600',
  },
  {
    nom: 'Brack',
    href: '/suchen?boutique=brack',
    logo: '/shops/brack.svg',
    badge: 'Multimedia & Gaming',
    color: 'border-green-100 hover:border-green-300',
    tag: 'bg-green-50 text-green-600',
  },
]

export function BannerBoutiques() {
  return (
    <div className="bg-[#F8FAFC] px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Titel */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#0052CC] text-xs font-semibold uppercase tracking-widest mb-1">Partner</p>
            <h2 className="font-heading text-[#003087] text-2xl sm:text-3xl">Unsere Partner-Shops</h2>
          </div>
          <Link
            href="/hinzufuegen"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#0052CC] transition-colors shrink-0 ml-3"
          >
            <span className="hidden sm:inline">Eigenen Shop hinzufügen</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Shop-Karten */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {BOUTIQUES.map(({ nom, href, logo, badge, color, tag }) => (
            <Link
              key={nom}
              href={href}
              className={`group bg-white border ${color} rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 hover:shadow-md transition-all`}
            >
              {/* Logo */}
              <div className="w-full h-10 sm:h-12 relative flex items-center justify-center">
                <Image
                  src={logo}
                  alt={nom}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 30vw, 200px"
                />
              </div>

              {/* Kategorie-Badge */}
              <span className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full ${tag} text-center leading-snug`}>
                {badge}
              </span>

              {/* CTA */}
              <span className="flex items-center gap-1 text-[11px] sm:text-xs text-[#0052CC] font-medium group-hover:underline">
                Angebote ansehen <ArrowRight size={10} />
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

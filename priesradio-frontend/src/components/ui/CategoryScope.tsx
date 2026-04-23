import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const SCOPE_ITEMS = [
  {
    slug: 'smartphones',
    href: '/kategorien/smartphones',
    label: 'Smartphones',
    sousTitre: 'Alle Marken & Modelle',
    img: '/banners/cat-smartphones.webp',
    gradient: 'from-blue-900/80 via-blue-800/50 to-blue-700/20',
    accent: '#60A5FA',
    accentBtn: '#1D4ED8',
  },
  {
    slug: 'kaffeemaschinen',
    href: '/kategorien/kaffeemaschinen',
    label: 'Kaffeemaschinen',
    sousTitre: 'Vollautomaten · Kapseln · Filter',
    img: '/banners/cat-kaffeemaschinen.webp',
    gradient: 'from-amber-900/80 via-amber-800/50 to-amber-700/20',
    accent: '#FCD34D',
    accentBtn: '#D97706',
  },
  {
    slug: 'waschmaschine',
    href: '/kategorien/waschmaschine',
    label: 'Waschmaschinen',
    sousTitre: 'Frontlader · Toplader · Sets',
    img: '/banners/cat-waschmaschine.webp',
    gradient: 'from-cyan-900/80 via-cyan-800/50 to-cyan-700/20',
    accent: '#67E8F9',
    accentBtn: '#0E7490',
  },
]

export default function CategoryScope({ categoryImages = {} }: { categoryImages?: Record<string, string> }) {
  return (
    <section className="py-10 sm:py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SCOPE_ITEMS.map(({ slug, href, label, sousTitre, img, gradient, accent, accentBtn }) => {
            const src = categoryImages[slug] || img
            const isProductImg = src.startsWith('http')
            return (
            <Link
              key={href}
              href={href}
              className="group relative rounded-2xl overflow-hidden flex flex-col bg-[#F8FAFC]"
              style={{ minHeight: '200px' }}
            >
              {/* Hintergrundbild */}
              <Image
                src={src}
                alt={label}
                fill
                className={`group-hover:scale-105 transition-transform duration-500 ${isProductImg ? 'object-contain p-6' : 'object-cover'}`}
                sizes="(max-width: 640px) 100vw, 33vw"
                unoptimized={isProductImg}
              />

              {/* Gradient-Overlay — nur bei statischen Bannerbildern */}
              {!isProductImg && (
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />
              )}

              {/* Textinhalt */}
              <div className={`relative z-10 p-5 flex-1 flex flex-col justify-end ${isProductImg ? 'bg-gradient-to-t from-white/90 via-white/40 to-transparent' : ''}`}>
                <p
                  className="font-heading text-lg font-bold mb-0.5"
                  style={{ color: isProductImg ? '#003087' : accent }}
                >
                  {label}
                </p>
                <p className={`text-sm mb-4 ${isProductImg ? 'text-slate-500' : 'text-white/70'}`}>{sousTitre}</p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit text-white"
                  style={{ backgroundColor: `${accentBtn}${isProductImg ? 'ff' : 'cc'}` }}
                >
                  Entdecken <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  )
}

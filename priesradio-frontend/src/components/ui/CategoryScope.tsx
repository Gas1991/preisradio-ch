import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const SCOPE_ITEMS = [
  {
    href: '/categories/telephonie/smartphone?tri=prix_desc',
    label: 'Smartphones',
    sousTitre: 'Toutes les marques',
    img: '/banners/cat-smartphones.webp',
    gradient: 'from-blue-900/80 via-blue-800/50 to-blue-700/20',
    accent: '#60A5FA',
    accentBtn: '#1D4ED8',
  },
  {
    href: '/categories/gaming',
    label: 'Gaming',
    sousTitre: 'PC, Consoles & Accessoires',
    img: '/banners/cat-gaming.webp',
    gradient: 'from-green-900/80 via-green-800/50 to-green-700/20',
    accent: '#4ADE80',
    accentBtn: '#16A34A',
  },
  {
    href: '/categories/electromenager',
    label: 'Électroménager',
    sousTitre: 'Cuisine, Climatisation & Plus',
    img: '/banners/cat-electromenager.webp',
    gradient: 'from-amber-900/80 via-amber-800/50 to-amber-700/20',
    accent: '#FCD34D',
    accentBtn: '#D97706',
  },
]

export default function CategoryScope() {
  return (
    <section className="py-10 sm:py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SCOPE_ITEMS.map(({ href, label, sousTitre, img, gradient, accent, accentBtn }) => (
            <Link
              key={href}
              href={href}
              className="group relative rounded-2xl overflow-hidden flex flex-col"
              style={{ minHeight: '200px' }}
            >
              {/* Image background */}
              <Image
                src={img}
                alt={label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />

              {/* Gradient overlay pour lisibilité */}
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />

              {/* Contenu texte */}
              <div className="relative z-10 p-5 flex-1 flex flex-col justify-end">
                <p
                  className="font-heading text-lg font-bold mb-0.5"
                  style={{ color: accent }}
                >
                  {label}
                </p>
                <p className="text-sm text-white/70 mb-4">{sousTitre}</p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit"
                  style={{ backgroundColor: `${accentBtn}cc`, color: '#fff' }}
                >
                  Explorer <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

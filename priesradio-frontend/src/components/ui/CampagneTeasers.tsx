import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const TEASERS = [
  {
    titre: 'Offres été 2026',
    sous_titre: "Les meilleures promos électroménager de l'été",
    cta: 'Voir les offres',
    href: '/categories/electromenager?en_promo=1&tri=prix_desc',
    overlay: 'linear-gradient(135deg, rgba(249,115,22,0.75), rgba(194,65,12,0.85))',
    img: '/banners/ramadan.webp',
    badge: 'Offres été 2026',
  },
  {
    titre: 'Aïd Al-Adha 2026',
    sous_titre: 'Offres spéciales petit électro et cuisine pour la fête',
    cta: 'Découvrir',
    href: '/categories/electromenager/petit-electro-cuisine?en_promo=1',
    overlay: 'linear-gradient(135deg, rgba(59,130,246,0.75), rgba(29,78,216,0.85))',
    img: '/banners/nouvel-arrivage.webp',
    badge: 'Aïd Al-Adha 2026',
  },
]

export default function CampagneTeasers() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {TEASERS.map(({ titre, sous_titre, cta, href, overlay, img, badge }) => (
          <Link
            key={href}
            href={href}
            className="group relative rounded-2xl overflow-hidden p-5 sm:p-6 flex items-center justify-between hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 transition-all duration-200 min-h-[140px] sm:min-h-[160px]"
          >
            {/* Image de fond */}
            <Image
              src={img}
              alt={titre}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) calc(100vw - 32px), 50vw"
            />

            {/* Overlay couleur */}
            <div className="absolute inset-0" style={{ background: overlay }} />

            {/* Contenu texte */}
            <div className="relative z-10 min-w-0">
              <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">
                {badge}
              </span>
              <h3 className="font-heading text-white text-base sm:text-lg font-bold mb-1 leading-snug">
                {titre}
              </h3>
              <p className="text-white/80 text-xs sm:text-sm mb-3 leading-snug line-clamp-2">
                {sous_titre}
              </p>
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                {cta} <ArrowRight size={11} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

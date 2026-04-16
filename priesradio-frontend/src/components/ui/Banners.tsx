import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   1. BannerStats → Hero promo split banner
   Desktop : flex-row   ~ 1200 × 320px  (texte 55% | image 45%)
   Mobile  : flex-col   texte en haut, zone image en bas (~180px)
   ───────────────────────────────────────────────────────────────────────────── */

export function BannerStats() {
  return (
    <div className="bg-[#0F172A] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* En-tête style éditorial */}
        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-0.5 bg-[#F97316]" />
            <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-[0.2em]">Catégorie</span>
          </div>
          <h2 className="font-heading text-white text-2xl sm:text-3xl">Téléviseurs</h2>
          <p className="text-slate-500 text-sm">Smart TV · OLED · QLED · 4K</p>
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. BannerHowItWorks → 3 cartes catégories avec zone image
   Chaque carte : zone image h-44 sm:h-48  +  footer 80px
   Desktop : grid-cols-3 (~380 × 340px chacune)
   Mobile  : grid-cols-1 (pleine largeur, scrollable)
   ───────────────────────────────────────────────────────────────────────────── */

const CAT_BANNERS = [
  {
    href: '/categories/gaming/pc-gaming',
    label: 'PC Gaming',
    sub: 'Setup gamer & accessoires',
    img: '/banners/pc-gaming.webp',
    tag: 'bg-purple-50 text-purple-700',
  },
  {
    href: '/categories/informatique/pc-portable?tri=prix_desc',
    label: 'PC Portable',
    sub: 'Ordinateurs portables & ultrabooks',
    img: '/banners/laptop.webp',
    tag: 'bg-blue-50 text-blue-700',
  },
  {
    href: '/categories/gaming/composants-gaming',
    label: 'Composants Gaming',
    sub: 'Processeurs, RAM, GPU & stockage',
    img: '/banners/composants-pc.webp',
    tag: 'bg-orange-50 text-orange-700',
  },
  {
    href: '/categories/informatique/pc-bureau?tri=prix_desc',
    label: 'PC Bureau',
    sub: 'Ordinateurs de bureau performants',
    img: '/banners/pc-bureau.webp',
    tag: 'bg-slate-100 text-slate-700',
  },
]

export function BannerHowItWorks() {
  return (
    <div className="px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Titre */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Explorer</p>
            <h2 className="font-heading text-[#0F172A] text-2xl sm:text-3xl">Catégories phares</h2>
          </div>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#F97316] transition-colors shrink-0 ml-3"
          >
            <span className="hidden sm:inline">Tout voir</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4 cartes — desktop grid-cols-4 · mobile grid-cols-2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {CAT_BANNERS.map(({ href, label, sub, img, tag }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg hover:border-transparent transition-all duration-200"
            >
              {/* ── Zone image h-40 mobile · h-44 desktop ── */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <Image
                  src={img}
                  alt={label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) calc(100vw - 32px), 300px"
                />
                {/* Overlay bas pour lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                {/* Titre sur l'image */}
                <p className="absolute bottom-3 left-4 text-white font-heading font-bold text-sm z-20 drop-shadow">
                  {label}
                </p>
                {/* Badge "Voir" flottant */}
                <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 z-20">
                  <Zap size={8} /> Voir
                </span>
              </div>

              {/* Pied de carte */}
              <div className="bg-white px-4 py-4 flex items-center justify-between gap-2">
                <div>
                  <p className="font-heading text-[#0F172A] font-semibold text-sm">{label}</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">{sub}</p>
                </div>
                <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${tag} flex items-center gap-1`}>
                  Explorer <ArrowRight size={9} />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. BannerBoutiques — Boutiques partenaires (entre Électroménager et Marques)
   ───────────────────────────────────────────────────────────────────────────── */

const BOUTIQUES = [
  {
    nom: 'Mytek',
    href: '/rechercher?boutique=mytek',
    logo: '/stores/mytek.png',
    badge: 'Informatique & High-Tech',
    color: 'border-blue-100 hover:border-blue-300',
    tag: 'bg-blue-50 text-blue-600',
  },
  {
    nom: 'Tunisianet',
    href: '/rechercher?boutique=tunisianet',
    logo: '/stores/tunisianet.png',
    badge: 'Électronique & Photo',
    color: 'border-green-100 hover:border-green-300',
    tag: 'bg-green-50 text-green-600',
  },
  {
    nom: 'Spacenet',
    href: '/rechercher?boutique=spacenet',
    logo: '/stores/spacenet.png',
    badge: 'Multimédia & Gaming',
    color: 'border-purple-100 hover:border-purple-300',
    tag: 'bg-purple-50 text-purple-600',
  },
]

export function BannerBoutiques() {
  return (
    <div className="bg-[#F8FAFC] px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Titre */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Partenaires</p>
            <h2 className="font-heading text-[#0F172A] text-2xl sm:text-3xl">Nos boutiques</h2>
          </div>
          <Link
            href="/ajouter"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#F97316] transition-colors shrink-0 ml-3"
          >
            <span className="hidden sm:inline">Ajouter la vôtre</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cartes boutiques */}
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

              {/* Badge catégorie */}
              <span className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full ${tag} text-center leading-snug`}>
                {badge}
              </span>

              {/* CTA */}
              <span className="flex items-center gap-1 text-[11px] sm:text-xs text-[#F97316] font-medium group-hover:underline">
                Voir les offres <ArrowRight size={10} />
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    img: '/banners/pc-gaming.webp',
    tag: 'Gaming',
    titre: 'PC Gaming & Konsolen',
    sousTitre: 'Die besten Konfigurationen zum besten Preis',
    cta: 'Angebote ansehen',
    href: '/kategorien/gaming',
    bg: 'from-[#0a0a1a] to-[#1a1a3a]',
    accent: '#8B5CF6',
  },
  {
    img: '/banners/smartphone.webp',
    tag: 'Smartphones',
    titre: 'Neueste Smartphones',
    sousTitre: 'Galaxy, iPhone und mehr vergleichen — alle Shops',
    cta: 'Jetzt vergleichen',
    href: '/kategorien/telephonie/smartphone?tri=prix_desc',
    bg: 'from-[#0c1a2e] to-[#1a2f4a]',
    accent: '#0052CC',
  },
  {
    img: '/banners/laptop.webp',
    tag: 'Informatik',
    titre: 'Laptops & Ultrabooks',
    sousTitre: 'Arbeit, Kreativität, Leistung — finden Sie Ihr Modell',
    cta: 'Entdecken',
    href: '/kategorien/informatique',
    bg: 'from-[#0a1a10] to-[#142a1a]',
    accent: '#10B981',
  },
]

export default function BannerSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setActive(a => (a + 1) % SLIDES.length), [])
  const prev = useCallback(() => setActive(a => (a - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ height: '170px' }}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Hintergrundbild */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`} />
          <Image
            src={slide.img}
            alt={slide.titre}
            fill
            className="object-cover mix-blend-overlay opacity-40"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority={i === 0}
          />
          {/* Linker Overlay für Lesbarkeit */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          {/* Inhalt */}
          <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 max-w-lg">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 w-fit"
              style={{ backgroundColor: `${slide.accent}22`, color: slide.accent, border: `1px solid ${slide.accent}44` }}
            >
              {slide.tag}
            </span>
            <h3 className="font-heading text-white text-base sm:text-xl font-bold mb-1 leading-tight">
              {slide.titre}
            </h3>
            <p className="text-white/60 text-xs mb-3 leading-relaxed hidden sm:block">
              {slide.sousTitre}
            </p>
            <Link
              href={slide.href}
              className="inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all w-fit"
              style={{ backgroundColor: slide.accent }}
            >
              {slide.cta}
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      ))}

      {/* Pfeile */}
      <button
        onClick={prev}
        aria-label="Vorherige"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        aria-label="Nächste"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all"
      >
        <ChevronRight size={16} />
      </button>

      {/* Punkte */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? '24px' : '8px',
              height: '8px',
              backgroundColor: i === active ? '#0052CC' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

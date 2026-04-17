'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CATEGORIES = [
  {
    href: '/kategorien/smartphones',
    label: 'Smartphones',
    img: '/banners/cat-smartphones.webp',
  },
  {
    href: '/kategorien/kaffeemaschinen',
    label: 'Kaffeemaschinen',
    img: '/banners/cat-kaffeemaschinen.webp',
  },
  {
    href: '/kategorien/kuehlschrank',
    label: 'Kühlschrank',
    img: '/banners/cat-kuehlschrank.webp',
  },
  {
    href: '/kategorien/waschmaschine',
    label: 'Waschmaschine',
    img: '/banners/cat-waschmaschine.webp',
  },
  {
    href: '/kategorien/staubsauger-roboter',
    label: 'Staubsauger',
    img: '/banners/cat-staubsauger.webp',
  },
  {
    href: '/kategorien/fritteuse',
    label: 'Fritteuse',
    img: '/banners/cat-fritteuse.webp',
  },
  {
    href: '/kategorien/klimaanlage',
    label: 'Klimaanlage',
    img: '/banners/cat-klimaanlage.webp',
  },
  {
    href: '/kategorien/waeschetrockner',
    label: 'Wäschetrockner',
    img: '/banners/cat-waeschetrockner.webp',
  },
]

export default function CarouselCategories() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(true)

  const update = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [update])

  return (
    <div className="relative group/carousel">

      {/* Pfeil links — nur Desktop */}
      <button
        onClick={() => scrollRef.current?.scrollBy({ left: -500, behavior: 'smooth' })}
        aria-label="Vorherige"
        className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 items-center justify-center rounded-full bg-white border border-[#E2E8F0] shadow-md hover:border-[#0052CC] hover:text-[#0052CC] transition-all duration-150 ${canLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollbare Spur — mobile + desktop */}
      <div
        ref={scrollRef}
        className="overflow-x-auto -mx-4 sm:-mx-0 px-4 sm:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-3 sm:gap-4" style={{ width: 'max-content' }}>
          {CATEGORIES.map(({ href, label, img }) => (
            <Link
              key={href}
              href={href}
              className="group shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-24 sm:h-28 overflow-hidden bg-[#F8FAFC]">
                <Image
                  src={img}
                  alt={label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 144px, 176px"
                />
              </div>
              <div className="bg-white px-3 py-2.5 flex items-center justify-between">
                <span className="text-[#1E293B] text-xs sm:text-[13px] font-semibold group-hover:text-[#0052CC] transition-colors leading-tight">
                  {label}
                </span>
                <span className="text-[#CBD5E1] group-hover:text-[#0052CC] transition-colors text-xs">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pfeil rechts — nur Desktop */}
      <button
        onClick={() => scrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' })}
        aria-label="Nächste"
        className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 items-center justify-center rounded-full bg-white border border-[#E2E8F0] shadow-md hover:border-[#0052CC] hover:text-[#0052CC] transition-all duration-150 ${canRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronRight size={18} />
      </button>

    </div>
  )
}

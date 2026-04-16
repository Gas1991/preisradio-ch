'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CarteProduit from '@/components/product/CarteProduit'
import type { Produit } from '@/types'

interface CarouselProduitsProps {
  produits: Produit[]
}

export default function CarouselProduits({ produits }: CarouselProduitsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    el?.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    // Avance de ~3 cartes
    el.scrollBy({ left: dir === 'right' ? 700 : -700, behavior: 'smooth' })
  }

  return (
    <div className="relative group/carousel">

      {/* ── Bouton GAUCHE ── */}
      <button
        onClick={() => scroll('left')}
        aria-label="Précédent"
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4
          w-9 h-9 bg-white border border-[#E2E8F0] rounded-full shadow-md
          flex items-center justify-center text-[#64748B]
          hover:border-[#F97316] hover:text-[#F97316] hover:shadow-orange-100/50
          transition-all duration-200
          ${canLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>

      {/* ── Scroll container ── */}
      <div
        ref={scrollRef}
        className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-3 sm:gap-4" style={{ width: 'max-content' }}>
          {produits.map((p) => (
            <div key={p.id} className="w-36 sm:w-44 lg:w-48 shrink-0 snap-start">
              <CarteProduit produit={p} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Bouton DROITE ── */}
      <button
        onClick={() => scroll('right')}
        aria-label="Suivant"
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4
          w-9 h-9 bg-white border border-[#E2E8F0] rounded-full shadow-md
          flex items-center justify-center text-[#64748B]
          hover:border-[#F97316] hover:text-[#F97316] hover:shadow-orange-100/50
          transition-all duration-200
          ${canRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>

    </div>
  )
}

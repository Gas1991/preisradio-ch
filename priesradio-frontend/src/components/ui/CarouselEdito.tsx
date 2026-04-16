'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CarteProduit from '@/components/product/CarteProduit'
import type { Produit } from '@/types'

interface Props {
  produits: Produit[]
}

export default function CarouselEdito({ produits }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft,  setCanLeft]  = useState(false)
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
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  return (
    <div className="relative">
      {/* Flèche gauche */}
      <button
        onClick={() => scrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
        aria-label="Précédent"
        className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
          w-9 h-9 items-center justify-center rounded-full bg-white border border-[#E2E8F0]
          shadow-md hover:border-[#F97316] hover:text-[#F97316] transition-all duration-150
          ${canLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scroll */}
      <div
        ref={scrollRef}
        className="overflow-x-auto px-4 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {produits.map(p => (
            <div key={p.id} className="w-44 sm:w-48 shrink-0 h-[290px]">
              <CarteProduit produit={p} className="h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Flèche droite */}
      <button
        onClick={() => scrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
        aria-label="Suivant"
        className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
          w-9 h-9 items-center justify-center rounded-full bg-white border border-[#E2E8F0]
          shadow-md hover:border-[#F97316] hover:text-[#F97316] transition-all duration-150
          ${canRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'

interface Marque {
  id: string
  slug: string
  nom: string
  nombre_produits?: number
}

interface Props {
  marques: Marque[]
}

export default function MarquesClient({ marques }: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return marques
    return marques.filter((m) => m.nom.toLowerCase().includes(q))
  }, [query, marques])

  return (
    <>
      {/* Suchleiste */}
      <div className="relative mb-8 max-w-xl">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Marke suchen…"
          className="w-full pl-11 pr-10 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm text-[#003087] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0052CC]/60 focus:ring-2 focus:ring-[#0052CC]/10 transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
            aria-label="Löschen"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-[#64748B] py-6 text-center">
          Keine Marke gefunden für &quot;{query}&quot;
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((marque) => (
          <Link
            key={marque.id}
            href={`/marke/${marque.slug}`}
            className="group flex flex-col items-center justify-center gap-2 bg-white border border-[#E2E8F0] rounded-2xl py-5 px-3 hover:border-[#0052CC]/50 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-xl group-hover:bg-[#0052CC]/10 transition-colors">
              📦
            </div>
            <p className="font-semibold text-[#1E293B] text-sm text-center group-hover:text-[#0052CC] transition-colors">
              {marque.nom}
            </p>
            {marque.nombre_produits !== undefined && (
              <p className="text-xs text-[#64748B]">{marque.nombre_produits} Produkte</p>
            )}
          </Link>
        ))}
      </div>
    </>
  )
}

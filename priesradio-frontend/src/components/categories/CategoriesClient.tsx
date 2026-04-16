'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Search, X } from 'lucide-react'
import type { Categorie, SousCategorie } from '@/types'

const ICONES: Record<string, string> = {
  informatique:          '💻',
  telephonie:            '📱',
  electromenager:        '🏠',
  gaming:                '🎮',
  'tv-et-son':           '📺',
  'bureau-et-papeterie': '📋',
  'maison-et-mobilier':  '🛋️',
  'beaute-et-sante':     '💄',
  'sport-et-loisirs':    '⚽',
  surveillance:          '📷',
  energie:               '⚡',
  'bebe-et-jouets':      '🧸',
  'photo-et-video':      '📸',
  'autre-categorie':     '⚙️',
}

function top10(sous?: SousCategorie[]): SousCategorie[] {
  if (!sous || sous.length === 0) return []
  return [...sous]
    .sort((a, b) => (b.nombre_produits ?? 0) - (a.nombre_produits ?? 0))
    .slice(0, 10)
}

interface Props {
  categories: Categorie[]
}

export default function CategoriesClient({ categories }: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    if (!q) {
      return categories.map((cat) => ({
        ...cat,
        sous_categories: top10(cat.sous_categories),
      }))
    }

    const result: Categorie[] = []
    for (const cat of categories) {
      const catMatch = cat.nom.toLowerCase().includes(q)
      const sousFiltrees = (cat.sous_categories || []).filter((s) =>
        s.nom.toLowerCase().includes(q)
      )

      if (catMatch || sousFiltrees.length > 0) {
        result.push({
          ...cat,
          // Si la catégorie matche : top-10 normales ; sinon : sous-catégories matchées
          sous_categories: catMatch ? top10(cat.sous_categories) : sousFiltrees,
        })
      }
    }
    return result
  }, [query, categories])

  return (
    <>
      {/* Barre de recherche */}
      <div className="relative mb-8 max-w-xl">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une catégorie ou sous-catégorie…"
          className="w-full pl-11 pr-10 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#F97316]/60 focus:ring-2 focus:ring-[#F97316]/10 transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
            aria-label="Effacer"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Résultat vide */}
      {filtered.length === 0 && (
        <p className="text-sm text-[#64748B] py-6 text-center">
          Aucune catégorie trouvée pour &quot;{query}&quot;
        </p>
      )}

      {/* Liste des catégories */}
      <div className="flex flex-col gap-8">
        {filtered.map((cat) => (
          <div key={cat.id}>
            {/* Catégorie parente */}
            <Link
              href={`/categories/${cat.slug}`}
              className="group flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4 hover:border-[#F97316]/50 hover:shadow-md hover:shadow-orange-100/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-xl group-hover:bg-[#F97316]/10 transition-colors">
                  {ICONES[cat.slug] ?? '⚙️'}
                </div>
                <div>
                  <p className="font-heading font-semibold text-[#0F172A] text-sm">{cat.nom}</p>
                  {cat.nombre_produits !== undefined && (
                    <p className="text-xs text-[#64748B]">{cat.nombre_produits} produit(s)</p>
                  )}
                </div>
              </div>
              <ChevronRight size={16} className="text-[#64748B] group-hover:text-[#F97316] transition-colors shrink-0" />
            </Link>

            {/* Top 10 sous-catégories */}
            {cat.sous_categories && cat.sous_categories.length > 0 && (
              <div className="mt-2 ml-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {cat.sous_categories.map((sous) => (
                  <Link
                    key={sous.id}
                    href={`/categories/${sous.slug}`}
                    className="group flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 hover:border-[#F97316]/40 hover:bg-orange-50/40 hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#334155] group-hover:text-[#F97316] truncate transition-colors">
                        {sous.nom}
                      </p>
                      {sous.nombre_produits !== undefined && (
                        <p className="text-[10px] text-[#94A3B8]">{sous.nombre_produits} produits</p>
                      )}
                    </div>
                    <ChevronRight size={12} className="text-[#CBD5E1] group-hover:text-[#F97316] transition-colors shrink-0 ml-1" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

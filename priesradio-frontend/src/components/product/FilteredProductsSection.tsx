'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { SlidersHorizontal, X, Package, ArrowUpDown } from 'lucide-react'
import CarteProduit from '@/components/product/CarteProduit'
import Pagination from '@/components/ui/Pagination'
import FilterSidebar, { FilterState, EMPTY_FILTERS, PARENT_CATEGORIES } from '@/components/product/FilterSidebar'
import { getProdukte } from '@/lib/api/produits'
import type { Produkt, PaginationMeta } from '@/types'

// ─── Konstanten ───────────────────────────────────────────────────────────────

const BOUTIQUES_BADGE: Record<string, string> = {
  digitec:       'bg-blue-50 text-blue-700',
  interdiscount: 'bg-red-50 text-red-700',
  brack:         'bg-green-50 text-green-700',
}
const BOUTIQUES_LABEL: Record<string, string> = {
  digitec: 'Digitec', interdiscount: 'Interdiscount', brack: 'Brack',
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface FilteredProductsSectionProps {
  initialProducts: Produkt[]
  initialMeta: PaginationMeta | null
  fixedMarque?: string
  fixedCategorie?: string
  fixedQ?: string
  initialFilters?: Partial<FilterState>
  hideBrand?: boolean
  hideCategorie?: boolean
  showQ?: string
}

// ─── Helper : URL aufbauen ohne Navigation ────────────────────────────────────

function buildUrl(filters: FilterState, page: number, fixedQ?: string): string {
  const sp = new URLSearchParams()
  if (fixedQ) sp.set('q', fixedQ)
  if (filters.boutique) sp.set('boutique', filters.boutique)
  if (filters.categorie) sp.set('categorie', filters.categorie)
  if (filters.marques.length > 0) sp.set('marque', filters.marques.join(','))
  if (filters.prix_min) sp.set('prix_min', filters.prix_min)
  if (filters.prix_max) sp.set('prix_max', filters.prix_max)
  if (filters.en_stock) sp.set('en_stock', '1')
  if (filters.tri) sp.set('tri', filters.tri)
  if (page > 1) sp.set('page', String(page))
  const qs = sp.toString()
  return qs ? `?${qs}` : window.location.pathname
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function FilteredProductsSection({
  initialProducts,
  initialMeta,
  fixedMarque,
  fixedCategorie,
  fixedQ,
  initialFilters = {},
  hideBrand = false,
  hideCategorie = false,
  showQ,
}: FilteredProductsSectionProps) {
  const [filters, setFilters] = useState<FilterState>({ ...EMPTY_FILTERS, ...initialFilters })
  const [products, setProducts] = useState<Produkt[]>(initialProducts)
  const [meta, setMeta] = useState<PaginationMeta | null>(initialMeta)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const skipFirst = useRef(true)

  // ── Produkte laden ────────────────────────────────────────────────────────

  const fetchProducts = useCallback(async (f: FilterState, p: number) => {
    setLoading(true)
    try {
      const result = await getProdukte({
        q: fixedQ,
        marque: f.marques.length > 0 ? f.marques : fixedMarque,
        categorie: f.categorie || fixedCategorie,
        boutique: f.boutique || undefined,
        prix_min: f.prix_min ? Number(f.prix_min) : undefined,
        prix_max: f.prix_max ? Number(f.prix_max) : undefined,
        en_stock: f.en_stock || undefined,
        tri: f.tri || undefined,
        page: p,
      })
      setProducts(result.data)
      setMeta(result.meta ?? null)
    } catch (err) {
      console.error('[Priesradio] Fehler beim Laden der Produkte:', err)
    } finally {
      setLoading(false)
    }
  }, [fixedQ, fixedMarque, fixedCategorie])

  // ── Debounce bei Filter-/Seitenwechsel ────────────────────────────────────

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    const t = setTimeout(() => {
      fetchProducts(filters, page)
      try {
        window.history.replaceState(null, '', buildUrl(filters, page, fixedQ))
      } catch {}
    }, 300)
    return () => clearTimeout(t)
  }, [filters, page, fetchProducts, fixedQ])

  // ── Bei Filteränderung Seite auf 1 zurücksetzen ───────────────────────────

  const handleFilterChange = (newFilters: FilterState) => {
    setPage(1)
    setFilters(newFilters)
  }

  // ── Verfügbare Marken (aus aktuellen Produkten) ───────────────────────────

  const availableBrands = useMemo(() => {
    const seen = new Set<string>()
    products.forEach(p => { if (p.marque) seen.add(p.marque) })
    return Array.from(seen).sort()
  }, [products])

  // ── Anzahl aktiver Filter ─────────────────────────────────────────────────

  const nbActifs = [
    filters.boutique,
    filters.categorie,
    filters.marques.length > 0 ? '1' : '',
    (filters.prix_min || filters.prix_max) ? '1' : '',
    filters.en_stock ? '1' : '',
  ].filter(Boolean).length

  const hasFilters = nbActifs > 0

  // ── Paginierungs-URL ──────────────────────────────────────────────────────

  const buildPageUrl = (p: number) => buildUrl(filters, p, fixedQ)

  return (
    <div className="py-6 sm:py-8 products-grid-zone">

      {/* ── Mobile: Filter-Button + Sortierung ── */}
      <div className="lg:hidden flex items-center gap-2 mb-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-1.5">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            nbActifs > 0
              ? 'bg-[#F97316] text-white shadow-sm'
              : 'text-[#64748B] hover:bg-white hover:text-[#1E293B] hover:shadow-sm'
          }`}
        >
          <SlidersHorizontal size={14} />
          Filter
          {nbActifs > 0 && (
            <span className="bg-white/25 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {nbActifs}
            </span>
          )}
        </button>
        <div className="w-px h-7 bg-[#E2E8F0] shrink-0" />
        <div className="flex-1 flex justify-center">
          <SortSelect value={filters.tri} onChange={(v) => handleFilterChange({ ...filters, tri: v })} />
        </div>
      </div>

      <div className="flex gap-6 items-start">

        {/* ── Filter-Sidebar ── */}
        <FilterSidebar
          filters={filters}
          onChange={handleFilterChange}
          availableBrands={availableBrands}
          hideBrand={hideBrand}
          hideCategorie={hideCategorie}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          nbActifs={nbActifs}
          totalResults={meta?.total_items ?? products.length}
        />

        {/* ── Mobile Overlay (bottom sheet) ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-[2px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Produktbereich ── */}
        <div className="flex-1 min-w-0">

          {/* Desktop: Anzahl Ergebnisse + Sortierung */}
          <div className="hidden lg:flex items-center justify-between mb-5">
            <div>
              {showQ ? (
                <h1 className="font-heading text-[#0F172A] text-xl font-bold">
                  {meta?.total_items != null
                    ? `${meta.total_items} Ergebnis${meta.total_items !== 1 ? 'se' : ''}${showQ ? ` für „${showQ}"` : ''}`
                    : `Ergebnisse${showQ ? ` für „${showQ}"` : ''}`}
                </h1>
              ) : (
                <p className="text-sm text-[#64748B]">
                  <span className="font-semibold text-[#0F172A]">{meta?.total_items ?? products.length}</span> Produkt{(meta?.total_items ?? products.length) !== 1 ? 'e' : ''}
                </p>
              )}
            </div>
            <SortSelect value={filters.tri} onChange={(v) => handleFilterChange({ ...filters, tri: v })} />
          </div>

          {/* Mobile: Ergebnisanzahl */}
          {showQ && (
            <div className="lg:hidden mb-4">
              <h1 className="font-heading text-[#0F172A] text-lg font-bold">
                {meta?.total_items != null
                  ? `${meta.total_items} Ergebnis${meta.total_items !== 1 ? 'se' : ''}${showQ ? ` für „${showQ}"` : ''}`
                  : `Ergebnisse${showQ ? ` für „${showQ}"` : ''}`}
              </h1>
            </div>
          )}

          {/* Aktive Filter-Badges */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.boutique && (
                <Badge
                  label={BOUTIQUES_LABEL[filters.boutique] ?? filters.boutique}
                  className={BOUTIQUES_BADGE[filters.boutique] ?? 'bg-slate-100 text-slate-700'}
                  onRemove={() => handleFilterChange({ ...filters, boutique: '' })}
                />
              )}
              {filters.categorie && (
                <Badge
                  label={PARENT_CATEGORIES.find(c => c.slug === filters.categorie)?.nom ?? filters.categorie}
                  className="bg-[#F97316]/10 text-[#F97316]"
                  onRemove={() => handleFilterChange({ ...filters, categorie: '' })}
                />
              )}
              {filters.marques.map(m => (
                <Badge
                  key={m}
                  label={m}
                  className="bg-[#F97316]/10 text-[#F97316]"
                  onRemove={() => handleFilterChange({ ...filters, marques: filters.marques.filter(x => x !== m) })}
                />
              ))}
              {(filters.prix_min || filters.prix_max) && (
                <Badge
                  label={
                    filters.prix_min && filters.prix_max
                      ? `${filters.prix_min} — ${filters.prix_max} CHF`
                      : filters.prix_min ? `≥ ${filters.prix_min} CHF` : `≤ ${filters.prix_max} CHF`
                  }
                  className="bg-[#F97316]/10 text-[#F97316]"
                  onRemove={() => handleFilterChange({ ...filters, prix_min: '', prix_max: '' })}
                />
              )}
              {filters.en_stock && (
                <Badge
                  label="Auf Lager"
                  icon={<Package size={10} />}
                  className="bg-green-50 text-green-700"
                  onRemove={() => handleFilterChange({ ...filters, en_stock: false })}
                />
              )}
              {filters.tri && (
                <Badge
                  label={filters.tri === 'prix_asc' ? 'Preis ↑' : 'Preis ↓'}
                  icon={<ArrowUpDown size={10} />}
                  className="bg-[#F97316]/10 text-[#F97316]"
                  onRemove={() => handleFilterChange({ ...filters, tri: '' })}
                />
              )}
            </div>
          )}

          {/* Produktgitter */}
          <div className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                  {products.map((p) => <CarteProduit key={p.id} produit={p} />)}
                </div>
                {meta && meta.total_pages > 1 && (
                  <Pagination
                    currentPage={page}
                    totalPages={meta.total_pages}
                    buildUrl={buildPageUrl}
                    onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  />
                )}
              </>
            ) : !loading && (
              <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl">
                <p className="text-[#64748B] text-sm">
                  {hasFilters ? 'Keine Ergebnisse für diese Filter. Bitte ändern Sie die Filter.' : 'Keine Produkte verfügbar.'}
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => handleFilterChange({ ...EMPTY_FILTERS })}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#F97316] font-semibold hover:underline"
                  >
                    <X size={13} /> Filter löschen
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Unterkomponenten ─────────────────────────────────────────────────────────

function SortSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={13} className="text-[#94A3B8] shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm text-[#1E293B] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 outline-none focus:border-[#F97316] bg-white cursor-pointer transition-colors appearance-none pr-6"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.25rem center',
          backgroundSize: '1.1em 1.1em',
        }}
      >
        <option value="">Relevanz</option>
        <option value="prix_asc">Preis ↑</option>
        <option value="prix_desc">Preis ↓</option>
      </select>
    </div>
  )
}

function Badge({
  label,
  icon,
  className,
  onRemove,
}: {
  label: string
  icon?: React.ReactNode
  className: string
  onRemove: () => void
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
      {icon}
      {label}
      <button type="button" onClick={onRemove} className="hover:opacity-70 transition-opacity" aria-label={`${label} entfernen`}>
        <X size={10} />
      </button>
    </span>
  )
}

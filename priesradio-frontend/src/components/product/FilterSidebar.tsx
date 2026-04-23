'use client'

import { useState } from 'react'
import { X, ChevronDown, SlidersHorizontal, Package, ArrowUpDown } from 'lucide-react'

// ─── Typen ────────────────────────────────────────────────────────────────────

export interface FilterState {
  boutique: string
  marques: string[]
  categorie: string
  prix_min: string
  prix_max: string
  en_stock: boolean
  tri: string
}

export const EMPTY_FILTERS: FilterState = {
  boutique: '',
  marques: [],
  categorie: '',
  prix_min: '',
  prix_max: '',
  en_stock: false,
  tri: '',
}

export interface FilterSidebarProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  availableBrands: string[]
  hideBrand?: boolean
  hideCategorie?: boolean
  isOpen: boolean
  onClose: () => void
  nbActifs: number
  totalResults?: number
}

// ─── Konstanten ───────────────────────────────────────────────────────────────

const BOUTIQUES = [
  { id: 'digitec',       label: 'Digitec',       dot: 'bg-blue-500' },
  { id: 'interdiscount', label: 'Interdiscount', dot: 'bg-red-500' },
  { id: 'brack',         label: 'Brack',         dot: 'bg-green-500' },
] as const

export const PARENT_CATEGORIES = [
  { slug: 'smartphones',         nom: 'Smartphones' },
  { slug: 'kaffeemaschinen',     nom: 'Kaffeemaschinen' },
  { slug: 'staubsauger-roboter', nom: 'Staubsauger & Roboter' },
  { slug: 'klimaanlage',         nom: 'Klimaanlage' },
  { slug: 'waschmaschine',       nom: 'Waschmaschine' },
  { slug: 'waeschetrockner',     nom: 'Wäschetrockner' },
  { slug: 'fritteuse',           nom: 'Fritteuse' },
  { slug: 'kuehlschrank',        nom: 'Kühlschrank' },
]

// ─── Akkordeon-Abschnitt ──────────────────────────────────────────────────────

function Section({ title, children, defaultOpen = true }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#F1F5F9] last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-[#F8FAFC] transition-colors"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">{title}</span>
        <ChevronDown size={14} className={`text-[#CBD5E1] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function FilterSidebar({
  filters,
  onChange,
  availableBrands,
  hideBrand = false,
  hideCategorie = false,
  isOpen,
  onClose,
  nbActifs,
  totalResults,
}: FilterSidebarProps) {
  const [brandSearch, setBrandSearch] = useState('')

  const filteredBrands = brandSearch.trim()
    ? availableBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
    : availableBrands

  const handleClear = () => {
    onChange({ ...EMPTY_FILTERS })
    setBrandSearch('')
  }

  const applyLabel = totalResults != null
    ? `${totalResults} Ergebnis${totalResults !== 1 ? 'se' : ''} anzeigen`
    : 'Ergebnisse anzeigen'

  return (
    <aside className={[
      /* ── Mobile/Tablet: Bottom Sheet ── */
      'fixed bottom-0 left-0 right-0 z-40 flex flex-col',
      'max-h-[88vh] bg-white rounded-t-[28px]',
      'transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
      isOpen
        ? 'translate-y-0 shadow-[0_-8px_48px_rgba(0,0,0,0.18)]'
        : 'translate-y-full',
      /* ── Desktop lg+: statische Sticky-Sidebar ── */
      'lg:static lg:translate-y-0 lg:shadow-none lg:z-auto lg:flex lg:flex-col',
      'lg:w-56 xl:w-60 lg:max-h-[calc(100vh-5rem)] lg:sticky lg:top-20',
      'lg:rounded-2xl lg:border lg:border-[#E2E8F0] lg:overflow-hidden',
    ].join(' ')}
    >

      {/* ── Drag Handle – nur mobile ── */}
      <div className="lg:hidden flex justify-center pt-3 pb-0.5 flex-shrink-0">
        <div className="w-10 h-1 bg-[#CBD5E1] rounded-full" />
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9] flex-shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-[#0052CC]" />
          <span className="font-heading font-bold text-[#003087] text-sm">Filter</span>
          {nbActifs > 0 && (
            <span className="bg-[#0052CC] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {nbActifs}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {nbActifs > 0 && (
            <button type="button" onClick={handleClear}
              className="text-xs text-[#0052CC] hover:underline font-semibold">
              Alle löschen
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Filter schließen"
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors"
          >
            <X size={15} className="text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* ── Scrollbarer Inhalt ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">

        {/* Shop */}
        <Section title="Shop">
          <div className="flex flex-col gap-1.5">
            <RadioItem
              label="Alle Shops"
              checked={!filters.boutique}
              name="boutique" value=""
              onChange={() => onChange({ ...filters, boutique: '' })}
              dot="bg-[#003087]"
            />
            {BOUTIQUES.map((b) => (
              <RadioItem
                key={b.id}
                label={b.label}
                checked={filters.boutique === b.id}
                name="boutique" value={b.id}
                onChange={() => onChange({ ...filters, boutique: b.id })}
                dot={b.dot}
              />
            ))}
          </div>
        </Section>

        {/* Kategorie */}
        {!hideCategorie && (
          <Section title="Kategorie">
            <div className="flex flex-col gap-1">
              {PARENT_CATEGORIES.map((cat) => (
                <RadioItem
                  key={cat.slug}
                  label={cat.nom}
                  checked={filters.categorie === cat.slug}
                  name="categorie" value={cat.slug}
                  onChange={() => onChange({ ...filters, categorie: filters.categorie === cat.slug ? '' : cat.slug })}
                  dot="bg-[#0052CC]"
                />
              ))}
            </div>
          </Section>
        )}

        {/* Marke */}
        {!hideBrand && availableBrands.length > 0 && (
          <Section title="Marke">
            {availableBrands.length > 6 && (
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Marke suchen…"
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs text-[#1E293B] outline-none focus:border-[#0052CC] bg-white mb-3 transition-colors"
              />
            )}
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
              {filteredBrands.map((brand) => {
                const isChecked = filters.marques.includes(brand)
                return (
                  <CheckItem
                    key={brand}
                    label={brand}
                    checked={isChecked}
                    onChange={() => {
                      const next = isChecked
                        ? filters.marques.filter(m => m !== brand)
                        : [...filters.marques, brand]
                      onChange({ ...filters, marques: next })
                    }}
                  />
                )
              })}
              {filteredBrands.length === 0 && (
                <p className="text-xs text-[#94A3B8] py-1">Keine Marke gefunden</p>
              )}
            </div>
          </Section>
        )}

        {/* Preis */}
        <Section title="Preis (CHF)">
          <div className="flex items-center gap-2">
            <input type="number" value={filters.prix_min} min="0" placeholder="Min"
              onChange={(e) => onChange({ ...filters, prix_min: e.target.value })}
              className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#0052CC] bg-white transition-colors min-w-0" />
            <span className="text-slate-400 text-sm shrink-0">—</span>
            <input type="number" value={filters.prix_max} min="0" placeholder="Max"
              onChange={(e) => onChange({ ...filters, prix_max: e.target.value })}
              className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#0052CC] bg-white transition-colors min-w-0" />
          </div>
        </Section>

        {/* Verfügbarkeit */}
        <Section title="Verfügbarkeit">
          <div className="flex flex-col gap-3">
            <CheckItem
              label="Auf Lager"
              icon={<Package size={12} className="text-[#22C55E]" />}
              checked={filters.en_stock}
              color="green"
              onChange={(v) => onChange({ ...filters, en_stock: v })}
            />
          </div>
        </Section>

        {/* Sortieren */}
        <Section title="Sortieren" defaultOpen={false}>
          <div className="flex flex-col gap-1.5">
            {[
              { val: '',          label: 'Relevanz',             icon: null },
              { val: 'prix_asc',  label: 'Preis aufsteigend',    icon: <ArrowUpDown size={11} /> },
              { val: 'prix_desc', label: 'Preis absteigend',     icon: <ArrowUpDown size={11} /> },
            ].map(({ val, label, icon }) => (
              <RadioItem
                key={val}
                label={label}
                prefixIcon={icon}
                checked={filters.tri === val}
                name="tri" value={val}
                onChange={() => onChange({ ...filters, tri: val })}
                dot="bg-[#0052CC]"
              />
            ))}
          </div>
        </Section>

      </div>

      {/* ── Footer CTA – nur mobile ── */}
      <div className="lg:hidden flex-shrink-0 px-4 py-4 bg-white border-t border-[#F1F5F9]">
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-[#0052CC] hover:bg-[#003B9C] active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl text-sm transition-all"
        >
          {applyLabel}
        </button>
      </div>

    </aside>
  )
}

// ─── Unterkomponenten ─────────────────────────────────────────────────────────

function RadioItem({ label, checked, name, value, onChange, dot, prefixIcon }: {
  label: string
  checked: boolean
  name: string
  value: string
  onChange: () => void
  dot: string
  prefixIcon?: React.ReactNode
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
        checked ? `${dot} border-transparent` : 'border-[#CBD5E1] group-hover:border-[#94A3B8]'
      }`}>
        {checked && <span className="block w-full h-full rounded-full bg-white scale-[0.35]" />}
      </span>
      <span className={`text-sm flex items-center gap-1 transition-colors leading-tight ${
        checked ? 'text-[#003087] font-semibold' : 'text-[#64748B] group-hover:text-[#1E293B]'
      }`}>
        {prefixIcon}
        {label}
      </span>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
    </label>
  )
}

function CheckItem({ label, checked, onChange, icon, color = 'blue' }: {
  label: string
  checked: boolean
  onChange: ((v: boolean) => void) | (() => void)
  icon?: React.ReactNode
  color?: 'blue' | 'green'
}) {
  const activeColor = color === 'green' ? 'bg-[#22C55E] border-[#22C55E]' : 'bg-[#0052CC] border-[#0052CC]'
  const hoverBorder = color === 'green' ? 'group-hover:border-[#22C55E]/50' : 'group-hover:border-[#0052CC]/50'
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <span className={`w-4 h-4 rounded border-2 flex-shrink-0 transition-colors flex items-center justify-center ${
        checked ? activeColor : `border-[#CBD5E1] ${hoverBorder}`
      }`}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
        checked ? 'text-[#003087]' : 'text-[#1E293B]'
      }`}>
        {icon}
        {label}
      </span>
      <input type="checkbox" checked={checked}
        onChange={(e) => (onChange as (v: boolean) => void)(e.target.checked)}
        className="sr-only" />
    </label>
  )
}

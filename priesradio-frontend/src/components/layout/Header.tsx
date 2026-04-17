'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'

const LIENS_NAV = [
  { href: '/kategorien', label: 'Kategorien' },
  { href: '/marke',      label: 'Marken'     },
  { href: '/blog',       label: 'Blog'       },
  { href: '/shops',      label: 'Shops'      },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[#003087] sticky top-0 z-50 border-b border-white/5">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0" onClick={() => setOpen(false)}>
            <span className="font-heading text-white text-xl font-700 tracking-tight">Pries</span>
            <span className="font-heading text-[#D0021B] text-xl font-700 tracking-tight">radio</span>
            <span className="text-xs self-start mt-0.5">🇨🇭</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {LIENS_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Aktionen rechts */}
          <div className="flex items-center gap-3">
            <Link
              href="/suchen"
              aria-label="Suchen"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded-lg px-3 py-2 text-sm transition-all"
            >
              <Search size={15} strokeWidth={2} />
              <span className="hidden sm:inline">Suchen</span>
            </Link>

            <Link
              href="/hinzufuegen"
              className="hidden sm:inline-flex bg-[#D0021B] hover:bg-[#B50018] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              + Hinzufügen
            </Link>

            {/* Mobile-Menü-Button */}
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden text-slate-300 hover:text-white p-1 transition-colors"
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile-Ausklappmenü ─────────────────────────────────────────── */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#003087]">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {LIENS_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium px-3 py-3 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-white/5">
              <Link
                href="/hinzufuegen"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-[#D0021B] hover:bg-[#B50018] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                + Shop hinzufügen
              </Link>
            </div>
          </nav>
        </div>
      )}

    </header>
  )
}

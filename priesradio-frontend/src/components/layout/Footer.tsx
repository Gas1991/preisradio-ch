import Link from 'next/link'

const LIENS = {
  navigation: [
    { href: '/kategorien', label: 'Kategorien'  },
    { href: '/marke',      label: 'Marken'      },
    { href: '/shops',      label: 'Shops'       },
    { href: '/suchen',     label: 'Suchen'      },
  ],
  informationen: [
    { href: '/blog',          label: 'Blog & Guides'     },
    { href: '/ueber-uns',     label: 'Über uns'          },
    { href: '/contact',       label: 'Kontakt'           },
    { href: '/hinzufuegen',   label: 'Shop hinzufügen'   },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#003087]">

      {/* Separator */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D0021B] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Marke */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-0.5 mb-4">
              <span className="font-heading text-white text-2xl font-bold tracking-tight">Pries</span>
              <span className="font-heading text-[#D0021B] text-2xl font-bold tracking-tight">radio</span>
              <span className="ml-1">🇨🇭</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Der Schweizer Preisvergleich für High-Tech. Vergleiche Preise von Digitec, Interdiscount und Brack in Sekunden.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2.5">
              {LIENS.navigation.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 text-sm hover:text-[#5B9BD5] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informationen */}
          <div>
            <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Informationen</p>
            <ul className="space-y-2.5">
              {LIENS.informationen.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 text-sm hover:text-[#5B9BD5] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Unten */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Priesradio. Alle Rechte vorbehalten.
          </p>
          <p className="text-slate-700 text-xs">
            Mit Leidenschaft für Schweizer Konsumenten 🇨🇭
          </p>
        </div>
      </div>
    </footer>
  )
}

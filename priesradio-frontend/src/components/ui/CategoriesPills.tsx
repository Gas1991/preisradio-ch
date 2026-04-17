import Link from 'next/link'

const PILLS = [
  { href: '/kategorien/smartphones',           label: 'Smartphones',    icon: '📱' },
  { href: '/kategorien/ordinateurs-portables', label: 'Laptops',        icon: '💻' },
  { href: '/kategorien/tablettes',             label: 'Tablets',        icon: '📟' },
  { href: '/kategorien/audio',                 label: 'Audio',          icon: '🎧' },
  { href: '/kategorien/gaming',                label: 'Gaming',         icon: '🎮' },
  { href: '/kategorien/electromenager',        label: 'Haushaltsgeräte', icon: '🏠' },
  { href: '/kategorien/photo',                 label: 'Foto & Video',   icon: '📷' },
  { href: '/kategorien/imprimantes',           label: 'Drucker',        icon: '🖨️' },
  { href: '/kategorien/moniteurs',             label: 'Monitore',       icon: '🖥️' },
  { href: '/kategorien',                       label: 'Alle anzeigen',  icon: '→'  },
]

export default function CategoriesPills() {
  return (
    <nav
      aria-label="Kategorien"
      className="bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1 py-2.5" style={{ width: 'max-content', minWidth: '100%' }}>
            {PILLS.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium text-[#475569] border border-transparent hover:border-[#0052CC]/40 hover:text-[#0052CC] hover:bg-blue-50 transition-all duration-150"
              >
                <span className="text-sm leading-none">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

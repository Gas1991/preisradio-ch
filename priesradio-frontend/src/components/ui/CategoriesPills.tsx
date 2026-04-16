import Link from 'next/link'

const PILLS = [
  { href: '/categories/smartphones',           label: 'Smartphones',    icon: '📱' },
  { href: '/categories/ordinateurs-portables', label: 'Laptops',        icon: '💻' },
  { href: '/categories/tablettes',             label: 'Tablettes',      icon: '📟' },
  { href: '/categories/audio',                 label: 'Audio',          icon: '🎧' },
  { href: '/categories/gaming',                label: 'Gaming',         icon: '🎮' },
  { href: '/categories/electromenager',        label: 'Électroménager', icon: '🏠' },
  { href: '/categories/photo',                 label: 'Photo & Vidéo',  icon: '📷' },
  { href: '/categories/imprimantes',           label: 'Imprimantes',    icon: '🖨️' },
  { href: '/categories/moniteurs',             label: 'Moniteurs',      icon: '🖥️' },
  { href: '/categories',                       label: 'Tout voir',      icon: '→'  },
]

export default function CategoriesPills() {
  return (
    <nav
      aria-label="Catégories"
      className="bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1 py-2.5" style={{ width: 'max-content', minWidth: '100%' }}>
            {PILLS.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium text-[#475569] border border-transparent hover:border-[#F97316]/40 hover:text-[#F97316] hover:bg-orange-50 transition-all duration-150"
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

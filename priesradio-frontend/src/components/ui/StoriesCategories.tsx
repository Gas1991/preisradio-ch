import Link from 'next/link'

const STORIES = [
  { href: '/kategorien/smartphones',           label: 'Smartphones',     icon: '📱', color: 'bg-blue-500'    },
  { href: '/kategorien/ordinateurs-portables', label: 'Laptops',         icon: '💻', color: 'bg-slate-600'   },
  { href: '/kategorien/tablettes',             label: 'Tablets',         icon: '📟', color: 'bg-violet-500'  },
  { href: '/kategorien/audio',                 label: 'Audio',           icon: '🎧', color: 'bg-rose-500'    },
  { href: '/kategorien/gaming',                label: 'Gaming',          icon: '🎮', color: 'bg-emerald-500' },
  { href: '/kategorien/electromenager',        label: 'Haushaltsgeräte', icon: '🏠', color: 'bg-orange-500'  },
  { href: '/kategorien/photo',                 label: 'Foto',            icon: '📷', color: 'bg-amber-500'   },
  { href: '/kategorien/imprimantes',           label: 'Drucker',         icon: '🖨️', color: 'bg-cyan-500'    },
  { href: '/kategorien/moniteurs',             label: 'Monitore',        icon: '🖥️', color: 'bg-indigo-500'  },
  { href: '/kategorien',                       label: 'Alle anzeigen',   icon: '→',  color: 'bg-[#0052CC]'   },
]

export default function StoriesCategories() {
  return (
    <nav aria-label="Kategorien" className="bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="flex items-start gap-4 sm:gap-6 py-4 sm:py-5"
            style={{ width: 'max-content', minWidth: '100%' }}
          >
            {STORIES.map(({ href, label, icon, color }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col items-center gap-1.5 shrink-0 w-14 sm:w-16"
              >
                {/* Farbiger Kreis */}
                <div
                  className={`${color} w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-sm ring-2 ring-white group-hover:ring-[#0052CC] group-hover:ring-offset-2 transition-all duration-200`}
                >
                  {icon}
                </div>
                {/* Label */}
                <span className="text-[10px] sm:text-[11px] font-medium text-[#475569] group-hover:text-[#0052CC] text-center leading-tight transition-colors line-clamp-2">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

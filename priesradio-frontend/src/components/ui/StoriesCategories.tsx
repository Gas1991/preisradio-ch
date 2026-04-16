import Link from 'next/link'

const STORIES = [
  { href: '/categories/smartphones',           label: 'Smartphones',    icon: '📱', color: 'bg-blue-500'    },
  { href: '/categories/ordinateurs-portables', label: 'Laptops',        icon: '💻', color: 'bg-slate-600'   },
  { href: '/categories/tablettes',             label: 'Tablettes',      icon: '📟', color: 'bg-violet-500'  },
  { href: '/categories/audio',                 label: 'Audio',          icon: '🎧', color: 'bg-rose-500'    },
  { href: '/categories/gaming',                label: 'Gaming',         icon: '🎮', color: 'bg-emerald-500' },
  { href: '/categories/electromenager',        label: 'Électroménager', icon: '🏠', color: 'bg-orange-500'  },
  { href: '/categories/photo',                 label: 'Photo',          icon: '📷', color: 'bg-amber-500'   },
  { href: '/categories/imprimantes',           label: 'Imprimantes',    icon: '🖨️', color: 'bg-cyan-500'    },
  { href: '/categories/moniteurs',             label: 'Moniteurs',      icon: '🖥️', color: 'bg-indigo-500'  },
  { href: '/categories',                       label: 'Tout voir',      icon: '→',  color: 'bg-[#F97316]'   },
]

export default function StoriesCategories() {
  return (
    <nav aria-label="Catégories" className="bg-white border-b border-[#E2E8F0]">
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
                {/* Cercle coloré */}
                <div
                  className={`${color} w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-sm ring-2 ring-white group-hover:ring-[#F97316] group-hover:ring-offset-2 transition-all duration-200`}
                >
                  {icon}
                </div>
                {/* Label */}
                <span className="text-[10px] sm:text-[11px] font-medium text-[#475569] group-hover:text-[#F97316] text-center leading-tight transition-colors line-clamp-2">
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

import Link from 'next/link'

const TUILES = [
  {
    href: '/kategorien/smartphones',
    label: 'Smartphones',
    icon: '📱',
    bg: 'bg-blue-50',
    ring: 'hover:border-blue-300',
    shadow: 'hover:shadow-blue-100',
  },
  {
    href: '/kategorien/ordinateurs-portables',
    label: 'Laptops',
    icon: '💻',
    bg: 'bg-slate-50',
    ring: 'hover:border-slate-300',
    shadow: 'hover:shadow-slate-100',
  },
  {
    href: '/kategorien/tablettes',
    label: 'Tablets',
    icon: '📟',
    bg: 'bg-violet-50',
    ring: 'hover:border-violet-300',
    shadow: 'hover:shadow-violet-100',
  },
  {
    href: '/kategorien/audio',
    label: 'Audio',
    icon: '🎧',
    bg: 'bg-rose-50',
    ring: 'hover:border-rose-300',
    shadow: 'hover:shadow-rose-100',
  },
  {
    href: '/kategorien/gaming',
    label: 'Gaming',
    icon: '🎮',
    bg: 'bg-emerald-50',
    ring: 'hover:border-emerald-300',
    shadow: 'hover:shadow-emerald-100',
  },
  {
    href: '/kategorien/electromenager',
    label: 'Haushaltsgeräte',
    icon: '🏠',
    bg: 'bg-orange-50',
    ring: 'hover:border-orange-300',
    shadow: 'hover:shadow-orange-100',
  },
  {
    href: '/kategorien/photo',
    label: 'Foto & Video',
    icon: '📷',
    bg: 'bg-amber-50',
    ring: 'hover:border-amber-300',
    shadow: 'hover:shadow-amber-100',
  },
  {
    href: '/kategorien/imprimantes',
    label: 'Drucker',
    icon: '🖨️',
    bg: 'bg-cyan-50',
    ring: 'hover:border-cyan-300',
    shadow: 'hover:shadow-cyan-100',
  },
  {
    href: '/kategorien/moniteurs',
    label: 'Monitore',
    icon: '🖥️',
    bg: 'bg-indigo-50',
    ring: 'hover:border-indigo-300',
    shadow: 'hover:shadow-indigo-100',
  },
  {
    href: '/kategorien',
    label: 'Alle anzeigen',
    icon: '→',
    bg: 'bg-blue-50',
    ring: 'hover:border-[#0052CC]',
    shadow: 'hover:shadow-blue-100',
  },
]

export default function TuilesCategoriesCarousel() {
  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-3 sm:gap-4" style={{ width: 'max-content' }}>
        {TUILES.map(({ href, label, icon, bg, ring, shadow }) => (
          <Link
            key={href}
            href={href}
            className={`group flex flex-col items-center justify-center gap-2 ${bg} border border-[#E2E8F0] ${ring} ${shadow} rounded-2xl w-24 sm:w-28 h-24 sm:h-28 shrink-0 hover:shadow-lg transition-all duration-200`}
          >
            <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200">
              {icon}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#1E293B] group-hover:text-[#0052CC] text-center leading-tight transition-colors px-2 line-clamp-2">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'

const TUILES = [
  {
    href: '/categories/smartphones',
    label: 'Smartphones',
    icon: '📱',
    bg: 'bg-blue-50',
    ring: 'hover:border-blue-300',
    shadow: 'hover:shadow-blue-100',
  },
  {
    href: '/categories/ordinateurs-portables',
    label: 'Laptops',
    icon: '💻',
    bg: 'bg-slate-50',
    ring: 'hover:border-slate-300',
    shadow: 'hover:shadow-slate-100',
  },
  {
    href: '/categories/tablettes',
    label: 'Tablettes',
    icon: '📟',
    bg: 'bg-violet-50',
    ring: 'hover:border-violet-300',
    shadow: 'hover:shadow-violet-100',
  },
  {
    href: '/categories/audio',
    label: 'Audio',
    icon: '🎧',
    bg: 'bg-rose-50',
    ring: 'hover:border-rose-300',
    shadow: 'hover:shadow-rose-100',
  },
  {
    href: '/categories/gaming',
    label: 'Gaming',
    icon: '🎮',
    bg: 'bg-emerald-50',
    ring: 'hover:border-emerald-300',
    shadow: 'hover:shadow-emerald-100',
  },
  {
    href: '/categories/electromenager',
    label: 'Électroménager',
    icon: '🏠',
    bg: 'bg-orange-50',
    ring: 'hover:border-orange-300',
    shadow: 'hover:shadow-orange-100',
  },
  {
    href: '/categories/photo',
    label: 'Photo & Vidéo',
    icon: '📷',
    bg: 'bg-amber-50',
    ring: 'hover:border-amber-300',
    shadow: 'hover:shadow-amber-100',
  },
  {
    href: '/categories/imprimantes',
    label: 'Imprimantes',
    icon: '🖨️',
    bg: 'bg-cyan-50',
    ring: 'hover:border-cyan-300',
    shadow: 'hover:shadow-cyan-100',
  },
  {
    href: '/categories/moniteurs',
    label: 'Moniteurs',
    icon: '🖥️',
    bg: 'bg-indigo-50',
    ring: 'hover:border-indigo-300',
    shadow: 'hover:shadow-indigo-100',
  },
  {
    href: '/categories',
    label: 'Tout voir',
    icon: '→',
    bg: 'bg-orange-50',
    ring: 'hover:border-[#F97316]',
    shadow: 'hover:shadow-orange-100',
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
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#1E293B] group-hover:text-[#F97316] text-center leading-tight transition-colors px-2 line-clamp-2">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

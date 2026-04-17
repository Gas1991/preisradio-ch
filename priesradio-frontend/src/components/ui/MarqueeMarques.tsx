import Link from 'next/link'

const MARQUES = [
  'Apple', 'Samsung', 'Sony', 'LG',
  'Xiaomi', 'Huawei', 'Asus', 'HP',
  'Dell', 'Lenovo', 'JBL', 'Logitech',
  'Hisense', 'Philips', 'Bosch', 'Toshiba',
]

export default function MarqueeMarques() {
  // Verdoppeln für nahtloses Endlos-Scrollen
  const doubled = [...MARQUES, ...MARQUES]

  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee gap-4 sm:gap-6 w-max">
        {doubled.map((marque, i) => (
          <Link
            key={`${marque}-${i}`}
            href={`/marke/${marque.toLowerCase()}`}
            className="shrink-0 flex items-center justify-center bg-white border border-[#E2E8F0] rounded-xl px-5 py-3 text-sm font-medium text-[#64748B] hover:text-[#003087] hover:border-[#0052CC]/40 hover:shadow-sm transition-all whitespace-nowrap"
          >
            {marque}
          </Link>
        ))}
      </div>
    </div>
  )
}

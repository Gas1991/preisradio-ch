import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Produit } from '@/types'

interface CarteProduitProps {
  produit: Produit
  className?: string
  compact?: boolean
}

const STORE_COLORS: Record<string, string> = {
  digitec:       'bg-blue-50 border-blue-100',
  interdiscount: 'bg-red-50 border-red-100',
  brack:         'bg-green-50 border-green-100',
}

const STORE_LOGOS: Record<string, string> = {
  digitec:       '/shops/digitec.png',
  interdiscount: '/shops/interdiscount.png',
  brack:         '/shops/brack.svg',
}

function formatCHF(price: number): string {
  return `CHF ${price.toFixed(2)}`
}

export default function CarteProduit({ produit, className, compact }: CarteProduitProps) {
  const href = `/produkt/${produit.id}`
  const storeKey = (produit.boutique ?? '').toLowerCase()
  const storeClass = STORE_COLORS[storeKey] ?? 'bg-slate-50 text-slate-500 border-slate-100'
  const hasDiscount = (produit.discount ?? 0) > 0
  const hasOldPrice = !!(produit.prix_max && produit.prix_min && produit.prix_max > produit.prix_min)
  const pourcent = (hasDiscount && produit.prix_max && produit.prix_max > 0)
    ? Math.round(((produit.prix_max - (produit.prix_min ?? 0)) / produit.prix_max) * 100)
    : 0

  return (
    <Link
      href={href}
      className={`group flex flex-col bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#0052CC]/40 hover:shadow-lg hover:shadow-blue-100/30 transition-all${className ? ` ${className}` : ''}`}
    >
      {/* Bild */}
      <div className={`relative w-full bg-white overflow-hidden ${compact ? 'h-28' : 'aspect-[4/3]'}`}>
        {produit.image ? (
          <Image
            src={produit.image}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain group-hover:scale-105 transition-transform duration-300 ${compact ? 'p-2' : 'p-3'}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">⚙️</div>
        )}
        {!produit.en_stock && (
          <span className="absolute top-2 left-2 bg-slate-500 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
            Vergriffen
          </span>
        )}
      </div>

      {/* Inhalt */}
      <div className={`flex flex-col flex-1 ${compact ? 'p-1.5' : 'p-3 sm:p-4'}`}>
        {/* Marke + Shop */}
        <div className="flex items-center justify-between mb-0.5 gap-2">
          <p className="text-[#0052CC] text-[10px] font-semibold uppercase tracking-wide truncate">
            {produit.marque}
          </p>
          {produit.boutique && (
            <span className={`flex items-center px-1.5 py-0.5 rounded-full border ${storeClass} shrink-0`}>
              {STORE_LOGOS[storeKey] ? (
                <Image
                  src={STORE_LOGOS[storeKey]}
                  alt={produit.boutique}
                  width={compact ? 40 : 52}
                  height={compact ? 12 : 16}
                  className={`object-contain w-auto ${compact ? 'h-2.5' : 'h-3.5 sm:h-4'}`}
                />
              ) : (
                <span className={`font-semibold ${compact ? 'text-[9px]' : 'text-xs'}`}>{produit.boutique}</span>
              )}
            </span>
          )}
        </div>

        <p className={`font-heading font-semibold text-[#003087] leading-snug line-clamp-2 flex-1 ${compact ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>
          {produit.nom}
        </p>

        {/* Lager — im Kompaktmodus ausgeblendet */}
        {!compact && produit.en_stock !== undefined && (
          <p className={`text-xs font-medium mt-1 ${produit.en_stock ? 'text-green-600' : 'text-red-400'}`}>
            {produit.en_stock ? '● Auf Lager' : '○ Vergriffen'}
          </p>
        )}

        {/* Preis */}
        <div className={`flex items-center justify-between border-t border-[#E2E8F0] ${compact ? 'mt-1 pt-1' : 'mt-2.5 pt-2.5'}`}>
          {produit.prix_min ? (
            <div>
              {hasOldPrice && (
                <p className={`text-[#94A3B8] line-through leading-none mb-0.5 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
                  {formatCHF(produit.prix_max!)}
                </p>
              )}
              <p className={`font-heading text-[#0052CC] font-bold leading-none ${compact ? 'text-xs' : 'text-base sm:text-lg'}`}>
                {formatCHF(produit.prix_min)}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#64748B]">—</p>
          )}
          {!compact && (
            <div className="w-9 h-9 rounded-full bg-[#0052CC]/10 flex items-center justify-center group-hover:bg-[#0052CC] transition-colors shrink-0">
              <ArrowRight size={14} className="text-[#0052CC] group-hover:text-white transition-colors" />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

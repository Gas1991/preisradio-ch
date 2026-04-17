import type { Metadata } from 'next'
import { getMarque } from '@/lib/api/marques'
import { getProdukte } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FilteredProductsSection from '@/components/product/FilteredProductsSection'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{
    page?: string
    boutique?: string
    tri?: string
    prix_min?: string
    prix_max?: string
    en_stock?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = slug.join('/')
  try {
    const res = await getMarque(name)
    const marque = (res as any).marque ?? res
    const title = `${marque.nom.toUpperCase()} – Produkte zum besten Preis in der Schweiz`
    const description = `Entdecken Sie alle ${marque.nom}-Produkte in der Schweiz. Vergleichen Sie Preise bei Digitec, Interdiscount und Brack, um die besten Angebote zu finden.`
    return {
      title,
      description,
      alternates: { canonical: `/marke/${name}` },
      openGraph: { title, description, type: 'website' },
    }
  } catch {
    return { title: 'Marke nicht gefunden' }
  }
}

export default async function MarkeDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const name = slug.join('/')
  const {
    page = '1',
    boutique = '',
    tri = '',
    prix_min = '',
    prix_max = '',
    en_stock = '',
  } = await searchParams

  let marque: any = null
  let produits = null

  try {
    const res = await getMarque(name)
    marque = (res as any).marque ?? res
  } catch { notFound() }
  try {
    produits = await getProdukte({
      marque: name,
      page: Number(page),
      boutique: boutique || undefined,
      tri: tri || undefined,
      prix_min: prix_min ? Number(prix_min) : undefined,
      prix_max: prix_max ? Number(prix_max) : undefined,
      en_stock: en_stock === '1',
    })
  } catch {}

  if (!marque) notFound()

  const nbProdukte = produits?.meta?.total_items ?? produits?.data.length ?? 0

  return (
    <div>
      {/* Marken-Hero */}
      <section className="bg-[#003087] py-8 px-4 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-64 h-64 bg-[#0052CC] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">

          {/* Breadcrumb + Zurück-Button */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/marke"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all shrink-0"
              aria-label="Zurück zu den Marken"
            >
              <ChevronLeft size={16} />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-300 transition-colors">Startseite</Link>
              <ChevronRight size={12} />
              <Link href="/marke" className="hover:text-slate-300 transition-colors">Marken</Link>
              <ChevronRight size={12} />
              <span className="text-slate-300 font-medium">{marque.nom}</span>
            </nav>
          </div>

          {/* Marken-Titel */}
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#F1F5F9' }}>
            {marque.nom} Produkte – zum besten Preis in der Schweiz
          </h1>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed max-w-2xl">
            Vergleichen Sie die Preise von <span className="text-white font-medium">{marque.nom}</span> bei den führenden Schweizer Online-Shops. Finden Sie das beste Angebot unter {nbProdukte > 0 ? `${nbProdukte} Produkt${nbProdukte !== 1 ? 'en' : ''}` : 'den verfügbaren Produkten'}.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilteredProductsSection
          initialProducts={produits?.data ?? []}
          initialMeta={produits?.meta ?? null}
          fixedMarque={name}
          initialFilters={{
            boutique,
            tri,
            prix_min,
            prix_max,
            en_stock: en_stock === '1',
          }}
          hideBrand={true}
          hideCategorie={false}
        />
      </div>
    </div>
  )
}

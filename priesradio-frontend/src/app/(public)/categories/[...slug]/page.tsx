import type { Metadata } from 'next'
import { getCategorieDetail } from '@/lib/api/categories'
import { getProduits } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import FilteredProductsSection from '@/components/product/FilteredProductsSection'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{
    page?: string
    marque?: string
    boutique?: string
    prix_min?: string
    prix_max?: string
    en_stock?: string
    tri?: string
  }>
}

const slugToLabel = (s: string) =>
  s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = slug.join('/')
  const isSubcat = slug.length >= 2
  try {
    const { categorie } = await getCategorieDetail(fullSlug)
    const title = isSubcat
      ? `${slugToLabel(slug[slug.length - 1])} – ${categorie.nom} zum besten Preis in der Schweiz`
      : `${categorie.nom} – Produkte zum besten Preis in der Schweiz`
    const description = isSubcat
      ? `Entdecken Sie die besten ${slugToLabel(slug[slug.length - 1])} in der Schweiz. Vergleichen Sie Preise für ${categorie.nom} bei Digitec, Interdiscount und Brack.`
      : `Entdecken Sie alle ${categorie.nom}-Produkte in der Schweiz. Vergleichen Sie Preise bei Digitec, Interdiscount und Brack, um die besten Angebote zu finden.`
    return {
      title,
      description,
      alternates: { canonical: `/categories/${fullSlug}` },
      openGraph: { title, description, type: 'website' },
    }
  } catch {
    return { title: 'Kategorie nicht gefunden' }
  }
}

export default async function CategorieDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const {
    page = '1',
    marque = '',
    boutique = '',
    prix_min = '',
    prix_max = '',
    en_stock = '',
    tri = '',
  } = await searchParams

  const fullSlug = slug.join('/')
  const isSubcat = slug.length >= 2
  const marques = marque.split(',').filter(Boolean)
  const hasFilters = !!(marque || boutique || prix_min || prix_max || en_stock === '1')

  let categorie = null
  let produits: any[] = []
  let meta = null

  try {
    if (hasFilters) {
      const [filtered, catDetail] = await Promise.all([
        getProduits({
          categorie: fullSlug,
          page: Number(page),
          marque: marques.length > 0 ? marques : undefined,
          boutique: boutique || undefined,
          prix_min: prix_min ? Number(prix_min) : undefined,
          prix_max: prix_max ? Number(prix_max) : undefined,
          en_stock: en_stock === '1',
          tri: tri || undefined,
        }),
        getCategorieDetail(fullSlug, 1),
      ])
      produits = filtered.data
      meta = filtered.meta ?? null
      categorie = catDetail.categorie
    } else {
      const detail = await getCategorieDetail(fullSlug, Number(page))
      categorie = detail.categorie
      produits = detail.data
      meta = detail.meta ?? null
    }
  } catch {
    notFound()
  }

  if (!categorie) notFound()

  const breadcrumbItems = [
    { name: 'Startseite', url: 'https://ch.preisradio.de' },
    { name: 'Kategorien', url: 'https://ch.preisradio.de/categories' },
    ...(isSubcat
      ? [
          { name: slugToLabel(slug[0]), url: `https://ch.preisradio.de/categories/${slug[0]}` },
          { name: categorie.nom, url: `https://ch.preisradio.de/categories/${fullSlug}` },
        ]
      : [{ name: categorie.nom, url: `https://ch.preisradio.de/categories/${fullSlug}` }]
    ),
  ]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <div>
      {/* Breadcrumb Hero */}
      <section className="bg-[#003087] py-8 px-4 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-64 h-64 bg-[#0052CC] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-slate-300 transition-colors">Startseite</Link>
            <ChevronRight size={12} />
            <Link href="/categories" className="hover:text-slate-300 transition-colors">Kategorien</Link>
            {isSubcat && categorie.parent_slug && (
              <>
                <ChevronRight size={12} />
                <Link
                  href={`/categories/${categorie.parent_slug}`}
                  className="hover:text-slate-300 transition-colors capitalize"
                >
                  {categorie.parent_nom ?? categorie.parent_slug.replace(/-/g, ' ')}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-slate-300">{categorie.nom}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#F1F5F9' }}>
            {categorie.nom} – Beste Angebote {new Date().toLocaleDateString('de-CH', { month: 'long', year: 'numeric' })}
          </h1>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed max-w-2xl">
            Vergleichen Sie die Preise der Kategorie <span className="text-white font-medium">{categorie.nom}</span> bei den führenden Schweizer Online-Shops. {(meta?.total_items ?? 0) > 0 ? `${meta?.total_items} Produkt${(meta?.total_items ?? 0) > 1 ? 'e' : ''}` : 'Produkte'} zu entdecken.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unterkategorien (nur für Hauptkategorien) */}
        {!isSubcat && categorie.sous_categories && categorie.sous_categories.length > 0 && (
          <div className="pt-8 pb-2">
            <h2 className="font-heading text-[#003087] text-lg font-semibold mb-4">Unterkategorien</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {categorie.sous_categories.map((sous) => (
                <Link
                  key={sous.id}
                  href={`/categories/${sous.slug}`}
                  className="group flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 hover:border-[#0052CC]/40 hover:bg-blue-50/40 hover:shadow-sm transition-all"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#334155] group-hover:text-[#0052CC] truncate transition-colors">
                      {sous.nom}
                    </p>
                    {sous.nombre_produits !== undefined && (
                      <p className="text-[10px] text-[#94A3B8]">{sous.nombre_produits} Produkte</p>
                    )}
                  </div>
                  <ChevronRight size={12} className="text-[#CBD5E1] group-hover:text-[#0052CC] transition-colors shrink-0 ml-1" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filter + Produkte CSR */}
        <FilteredProductsSection
          initialProducts={produits}
          initialMeta={meta}
          fixedCategorie={fullSlug}
          initialFilters={{
            boutique,
            marques,
            prix_min,
            prix_max,
            en_stock: en_stock === '1',
            tri,
          }}
          hideCategorie={true}
          hideBrand={false}
        />
      </div>
    </div>
    </>
  )
}

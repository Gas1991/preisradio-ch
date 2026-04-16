import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'
import { fetchProductIdsForCategories } from '@/lib/sitemap-helpers'

export const dynamic = 'force-dynamic'
export const revalidate = 7200

// Maison / electroménager / lifestyle : ~8 600 produits estimés
const CATEGORIES = ['electromenager', 'maison-et-mobilier', 'beaute-et-sante', 'sport-et-loisirs']

export async function GET() {
  const baseUrl = SITE_URL

  const ids = await fetchProductIdsForCategories(CATEGORIES)

  const lastmod = new Date().toISOString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids.map((id) => `  <url>
    <loc>${baseUrl}/produit/${id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=7200, s-maxage=7200',
    },
  })
}

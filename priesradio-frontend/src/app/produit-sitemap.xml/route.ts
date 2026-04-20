import { NextResponse } from 'next/server'
import { SITE_URL, API_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 7200

const SWISS_CATEGORIES = [
  'smartphones',
  'kaffeemaschinen',
  'staubsauger-roboter',
  'klimaanlage',
  'waschmaschine',
  'waeschetrockner',
  'fritteuse',
  'kuehlschrank',
]

export async function GET() {
  const baseUrl = SITE_URL
  const seen = new Set<string>()
  const urls: string[] = []

  for (const cat of SWISS_CATEGORIES) {
    for (let page = 1; page <= 3; page++) {
      try {
        const res = await fetch(`${API_URL}/categories/${cat}/?page=${page}`, {
          next: { revalidate: 7200 },
        })
        if (!res.ok) break
        const { data: produits, meta } = await res.json()
        if (!produits || produits.length === 0) break

        for (const p of produits) {
          if (p.id && !seen.has(p.id)) {
            seen.add(p.id)
            urls.push(`  <url>
    <loc>${baseUrl}/produkt/${p.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`)
          }
        }

        if (!meta?.total_pages || page >= meta.total_pages) break
      } catch { break }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=7200, s-maxage=7200',
    },
  })
}

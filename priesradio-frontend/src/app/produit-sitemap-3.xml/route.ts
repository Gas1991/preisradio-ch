import { NextResponse } from 'next/server'
import { SITE_URL, API_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 7200

// Sitemap 3 — Brack
export async function GET() {
  const baseUrl = SITE_URL
  let ids: string[] = []

  try {
    const res = await fetch(`${API_URL}/sitemap-ids/?store=brack`, {
      next: { revalidate: 7200 },
    })
    if (res.ok) {
      const data = await res.json()
      ids = data.ids ?? []
    }
  } catch { /* retourne sitemap vide si erreur */ }

  const lastmod = new Date().toISOString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids.map((id) => `  <url>
    <loc>${baseUrl}/produkt/${id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=7200, s-maxage=7200',
    },
  })
}

import { NextResponse } from 'next/server'
import { SITE_URL, API_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  const baseUrl = SITE_URL

  try {
    const response = await fetch(`${API_URL}/categories/`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) throw new Error('Failed to fetch categories')

    const { data: categories } = await response.json()

    // Pour chaque catégorie parente, récupérer les sous-catégories via le detail
    const urls: string[] = []
    for (const cat of categories || []) {
      try {
        const detailRes = await fetch(`${API_URL}/categories/${cat.slug}/?page=1`, {
          next: { revalidate: 3600 },
        })
        if (!detailRes.ok) continue
        const detail = await detailRes.json()
        for (const sous of detail.categorie?.sous_categories || []) {
          urls.push(`  <url>
    <loc>${baseUrl}/categories/${sous.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`)
        }
      } catch {}
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating souscategorie sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

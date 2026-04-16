import { NextResponse } from 'next/server'
import { SITE_URL, API_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  const baseUrl = SITE_URL

  try {
    const response = await fetch(`${API_URL}/marques/`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) throw new Error('Failed to fetch marques')

    const { data: marques } = await response.json()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(marques || []).map((m: { slug: string }) => `  <url>
    <loc>${baseUrl}/marque/${encodeURIComponent(m.slug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating brand sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

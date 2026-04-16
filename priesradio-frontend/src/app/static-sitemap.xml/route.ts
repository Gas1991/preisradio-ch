import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-static'
export const revalidate = 3600 // revalider toutes les heures

export async function GET() {
  const baseUrl = SITE_URL

  const staticPages = [
    { url: '',            priority: '1.0', changefreq: 'daily' },
    { url: '/categories', priority: '0.9', changefreq: 'daily' },
    { url: '/rechercher', priority: '0.8', changefreq: 'always' },
    { url: '/marque',     priority: '0.8', changefreq: 'weekly' },
    { url: '/boutiques',  priority: '0.7', changefreq: 'weekly' },
    { url: '/blog',       priority: '0.7', changefreq: 'weekly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(({ url, priority, changefreq }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

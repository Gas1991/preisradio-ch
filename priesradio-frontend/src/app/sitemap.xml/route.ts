import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const baseUrl = SITE_URL

  const sitemaps = [
    { loc: `${baseUrl}/static-sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/categorie-sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/souscategorie-sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/brand-sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/produit-sitemap-1.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/produit-sitemap-2.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/produit-sitemap-3.xml`, lastmod: new Date().toISOString() },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(({ loc, lastmod }) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

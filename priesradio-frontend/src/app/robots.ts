import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/static-sitemap.xml`,
      `${baseUrl}/categorie-sitemap.xml`,
      `${baseUrl}/brand-sitemap.xml`,
      `${baseUrl}/produit-sitemap.xml`,
    ],
  }
}

import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import AdSenseScript from '@/components/ads/AdSenseScript'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
})

const GTM_ID     = 'GTM-T7FNCLZT'
const GA4_ID     = 'G-J0LYKR13KX'
const ADSENSE_ID = 'ca-pub-8451378376537532'

export const metadata: Metadata = {
  title: {
    default: 'Priesradio - Preisvergleich Schweiz',
    template: '%s | Priesradio',
  },
  description: 'Preise vergleichen für Smartphones, Laptops und High-Tech in der Schweiz. Digitec, Interdiscount, Brack.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ch.preisradio.de'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/site.webmanifest',
  other: {
    'google-adsense-account': ADSENSE_ID,
  },
  verification: {
    yandex: 'a09b3fa0c24abb5a',
  },

  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://ch.preisradio.de',
    siteName: 'Priesradio',
    title: 'Priesradio - Preisvergleich Schweiz',
    description: 'Preise vergleichen für Smartphones, Laptops und High-Tech in der Schweiz.',
    images: [{ url: '/web-app-manifest-512x512.png', width: 512, height: 512, alt: 'Priesradio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Priesradio - Preisvergleich Schweiz',
    description: 'Preise vergleichen für Smartphones, Laptops und High-Tech in der Schweiz.',
    images: ['/web-app-manifest-512x512.png'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Priesradio',
  url: 'https://ch.preisradio.de',
  logo: 'https://ch.preisradio.de/web-app-manifest-512x512.png',
  description: 'Preisvergleich für High-Tech in der Schweiz. Digitec, Interdiscount, Brack.',
  foundingDate: '2026',
  areaServed: { '@type': 'Country', name: 'Switzerland' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@preisradio.de',
    availableLanguage: ['German'],
  },
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Priesradio',
  url: 'https://ch.preisradio.de',
  description: 'Preisvergleich für High-Tech in der Schweiz',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ch.preisradio.de/suchen?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      {/* ── 0. JSON-LD Organization + WebSite ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      {/* ── 1. Google Tag Manager ── dans <head>, le plus haut possible */}
      <Script id="gtm-head" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* ── 2. Google tag (gtag.js) ── dans <head> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="ga4-init" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA4_ID}');`}
      </Script>

      <body className="antialiased">
        {/* ── 3. GTM noscript ── juste après <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}
        <SpeedInsights />

        {/* ── 4. Google AdSense ── désactivé sur /rechercher */}
        <AdSenseScript />

        {/* ── 5. Tawk.to Live Chat ── */}
        <Script id="tawk-to" strategy="lazyOnload">
          {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/69b9467bc4b5991c3637f57b/1jjtrmkdt';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
        </Script>
      </body>
    </html>
  )
}

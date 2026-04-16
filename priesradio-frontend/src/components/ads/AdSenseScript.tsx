'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

const ADSENSE_ID = 'ca-pub-8451378376537532'

// Pages où AdSense est désactivé
const PAGES_SANS_ADS = ['/rechercher']

export default function AdSenseScript() {
  const pathname = usePathname()

  if (PAGES_SANS_ADS.some(p => pathname.startsWith(p))) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  )
}

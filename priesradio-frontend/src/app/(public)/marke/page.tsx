import type { Metadata } from 'next'
import { getMarques } from '@/lib/api/marques'
import PageHero from '@/components/ui/PageHero'
import MarquesClient from '@/components/ui/MarquesClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Marken | Priesradio',
  description: 'Vergleiche Produkte aller grossen High-Tech-Marken in der Schweiz.',
  alternates: { canonical: '/marke' },
}

export default async function MarkenPage() {
  let marques = null
  let fehler = null

  try { marques = await getMarques() } catch { fehler = 'Marken konnten nicht geladen werden.' }

  return (
    <div>
      <PageHero
        surtitre="Verfügbar"
        titre="Alle Marken"
        sousTitre="Apple, Samsung, Sony und Hunderte weitere High-Tech-Marken."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {fehler && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{fehler}</div>
        )}

        {marques && (
          <MarquesClient marques={marques.data} />
        )}
      </div>
    </div>
  )
}

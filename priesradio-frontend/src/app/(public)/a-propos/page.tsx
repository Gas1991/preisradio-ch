import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { Zap, Search, ShoppingBag, TrendingUp, Store, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos de Toprix',
  description: 'Toprix est le comparateur de prix high-tech en Tunisie. Comparez gratuitement les prix sur Mytek, Tunisianet et Spacenet pour trouver la meilleure offre.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'À propos de Toprix — Comparateur de prix en Tunisie',
    description: 'Toprix compare les prix des smartphones, laptops et produits high-tech sur les principales boutiques tunisiennes.',
    type: 'website',
  },
}

const VALEURS = [
  { icon: Search,      titre: 'Transparence',    desc: 'Tous les prix, toutes les boutiques, en temps réel.' },
  { icon: Zap,         titre: 'Rapidité',        desc: 'Trouvez la meilleure offre en quelques secondes.' },
  { icon: ShoppingBag, titre: 'Large catalogue', desc: '+50 000 produits high-tech référencés.' },
  { icon: TrendingUp,  titre: 'Économies',       desc: "Comparez et économisez jusqu'à 30% sur vos achats." },
]

const BOUTIQUES = [
  { nom: 'Mytek',      couleur: 'bg-blue-50 border-blue-100 text-blue-700' },
  { nom: 'Tunisianet', couleur: 'bg-green-50 border-green-100 text-green-700' },
  { nom: 'Spacenet',   couleur: 'bg-purple-50 border-purple-100 text-purple-700' },
]

const CATEGORIES = [
  'Informatique', 'Téléphonie', 'TV & Son', 'Gaming',
  'Électroménager', 'Photo & Vidéo', 'Énergie', 'Surveillance',
]

const FAQ = [
  {
    q: 'Comment Toprix récupère-t-il les prix ?',
    r: 'Toprix collecte et met à jour automatiquement les prix depuis les sites officiels de Mytek, Tunisianet et Spacenet. Les données sont actualisées régulièrement pour vous offrir des comparaisons fiables.',
  },
  {
    q: 'Toprix est-il gratuit ?',
    r: 'Oui, Toprix est entièrement gratuit. Vous pouvez comparer les prix et accéder à toutes les offres sans aucun abonnement.',
  },
  {
    q: 'Est-ce que je peux acheter directement sur Toprix ?',
    r: 'Non, Toprix est un comparateur. Lorsque vous trouvez la meilleure offre, vous êtes redirigé vers le site officiel de la boutique pour finaliser votre achat.',
  },
  {
    q: 'Quelles boutiques sont comparées ?',
    r: 'Actuellement Toprix compare les prix de Mytek, Tunisianet et Spacenet — les trois principales boutiques high-tech en ligne en Tunisie.',
  },
  {
    q: 'À quelle fréquence les prix sont-ils mis à jour ?',
    r: 'Les prix sont mis à jour automatiquement et régulièrement pour refléter les offres en temps réel des boutiques partenaires.',
  },
]

export default function AProposPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  }

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'À propos de Toprix',
    url: 'https://toprix.tn/a-propos',
    mainEntity: {
      '@type': 'Organization',
      name: 'Toprix',
      url: 'https://toprix.tn',
      description: 'Comparateur de prix high-tech en Tunisie. Compare les prix sur Mytek, Tunisianet et Spacenet.',
      foundingDate: '2024',
      areaServed: 'Tunisia',
      knowsAbout: ['comparaison de prix', 'high-tech', 'Tunisie', 'Mytek', 'Tunisianet', 'Spacenet'],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div>
        <PageHero
          surtitre="À propos"
          titre="Toprix, c'est quoi ?"
          sousTitre="Le premier comparateur de produits high-tech en Tunisie."
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Mission */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-2">Notre mission</p>
              <h2 className="font-heading text-[#0F172A] text-2xl md:text-3xl font-bold mb-4">
                Acheter mieux, dépenser moins
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                Toprix compare en temps réel les prix de centaines de boutiques en ligne tunisiennes
                pour vous permettre de trouver le meilleur deal sur vos produits high-tech —
                smartphones, laptops, écrans, audio, gaming et bien plus.
              </p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Notre service est entièrement gratuit pour les consommateurs. Nous ne touchons
                pas de commission sur les ventes et notre seul objectif est votre satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {VALEURS.map(({ icon: Icon, titre, desc }) => (
                <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-3">
                    <Icon size={15} className="text-[#F97316]" />
                  </div>
                  <p className="font-heading font-semibold text-[#0F172A] text-sm mb-1">{titre}</p>
                  <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Boutiques */}
          <section>
            <h2 className="font-heading text-[#0F172A] text-xl font-bold mb-2">Boutiques comparées</h2>
            <p className="text-[#64748B] text-sm mb-5">
              Toprix agrège les données de 3 boutiques officielles tunisiennes.
            </p>
            <div className="flex flex-wrap gap-3">
              {BOUTIQUES.map(({ nom, couleur }) => (
                <span key={nom} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${couleur}`}>
                  <Store size={14} />
                  {nom}
                </span>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section>
            <h2 className="font-heading text-[#0F172A] text-xl font-bold mb-2">Catégories disponibles</h2>
            <p className="text-[#64748B] text-sm mb-5">
              Plus de 50 000 produits comparés dans 8 catégories principales.
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <span key={cat} className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-[#F97316]" />
                  {cat}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-[#0F172A] text-xl font-bold mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {FAQ.map(({ q, r }) => (
                <div key={q} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
                  <p className="font-semibold text-[#0F172A] text-sm mb-2">{q}</p>
                  <p className="text-[#475569] text-sm leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA boutique */}
          <section className="bg-[#0F172A] rounded-2xl p-8 text-center">
            <h2 className="font-heading text-white text-xl font-bold mb-2">
              Vous avez une boutique high-tech ?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Rejoignez Toprix gratuitement et touchez des milliers d'acheteurs.
            </p>
            <Link
              href="/ajouter"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Référencer ma boutique
            </Link>
          </section>

        </div>
      </div>
    </>
  )
}

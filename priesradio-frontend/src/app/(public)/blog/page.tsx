import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '@/lib/api/blog'
import PageHero from '@/components/ui/PageHero'
import { ArrowRight, Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog - Guides et tests high-tech',
  description: 'Tests, comparatifs et guides pour vos achats high-tech.',
}

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page ?? 1)

  let articles = null
  let erreur = null

  try {
    articles = await getArticles(page)
  } catch {
    erreur = 'Impossible de charger les articles.'
  }

  const premier = articles?.data[0]
  const reste = articles?.data.slice(1) ?? []

  return (
    <div>
      <PageHero
        surtitre="Magazine"
        titre="Blog & Guides high-tech"
        sousTitre="Tests, comparatifs et conseils pour bien choisir vos produits."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{erreur}</div>
        )}

        {/* Article featured */}
        {premier && (
          <Link
            href={`/blog/${premier.slug}`}
            className="group flex flex-col md:flex-row gap-0 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-orange-100/20 transition-all mb-10"
          >
            <div className="relative h-56 md:h-auto md:w-1/2 bg-[#F8FAFC] shrink-0">
              {premier.image ? (
                <Image
                  src={premier.image}
                  alt={premier.titre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-200 text-6xl">📱</div>
              )}
              <span className="absolute top-4 left-4 bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full">
                À la une
              </span>
            </div>
            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-2">Guide</p>
                <h2 className="font-heading text-[#0F172A] text-2xl font-bold leading-tight mb-3 group-hover:text-[#F97316] transition-colors">
                  {premier.titre}
                </h2>
                {premier.resume && (
                  <p className="text-[#64748B] text-sm leading-relaxed line-clamp-3">{premier.resume}</p>
                )}
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <Calendar size={12} />
                  {new Date(premier.date_publication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <span className="flex items-center gap-1 text-[#F97316] text-sm font-semibold">
                  Lire l'article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grille articles */}
        {reste.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reste.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#F97316]/40 hover:shadow-lg hover:shadow-orange-100/20 transition-all"
              >
                <div className="relative h-44 bg-[#F8FAFC] overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.titre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-200 text-4xl">📱</div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="font-heading text-[#0F172A] font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors">
                    {article.titre}
                  </h2>
                  {article.resume && (
                    <p className="text-[#64748B] text-sm line-clamp-2 flex-1">{article.resume}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-3 pt-3 border-t border-[#E2E8F0]">
                    <Calendar size={11} />
                    {new Date(article.date_publication).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { getArticle } from '@/lib/api/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ChevronRight, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = await getArticle(slug)
    return { title: article.titre, description: article.resume }
  } catch {
    return { title: 'Article introuvable' }
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  let article = null
  try { article = await getArticle(slug) } catch { notFound() }
  if (!article) notFound()

  return (
    <div>
      {/* Breadcrumb hero */}
      <section className="bg-[#0F172A] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300 line-clamp-1 max-w-xs">{article.titre}</span>
          </nav>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Header article */}
        <header className="mb-8">
          <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-3">Guide & Test</p>
          <h1 className="font-heading text-[#0F172A] text-3xl md:text-4xl font-bold leading-tight mb-4">
            {article.titre}
          </h1>
          {article.resume && (
            <p className="text-[#64748B] text-lg leading-relaxed mb-4 border-l-4 border-[#F97316]/30 pl-4">
              {article.resume}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Calendar size={12} />
            Publié le {new Date(article.date_publication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </header>

        {/* Image hero */}
        {article.image && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10 bg-[#F8FAFC]">
            <Image
              src={article.image}
              alt={article.titre}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Avantages / Inconvénients — avant le contenu */}
        {(article.avantages?.length || article.inconvenients?.length) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {article.avantages && article.avantages.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <ThumbsUp size={14} className="text-emerald-600" />
                  </div>
                  <p className="font-heading font-semibold text-emerald-800 text-sm">Les plus</p>
                </div>
                <ul className="space-y-2">
                  {article.avantages.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {article.inconvenients && article.inconvenients.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <ThumbsDown size={14} className="text-red-500" />
                  </div>
                  <p className="font-heading font-semibold text-red-800 text-sm">Les moins</p>
                </div>
                <ul className="space-y-2">
                  {article.inconvenients.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Contenu principal */}
        <div
          className="prose prose-slate max-w-none
            prose-headings:font-heading prose-headings:text-[#0F172A] prose-headings:tracking-tight
            prose-a:text-[#F97316] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#0F172A]
            prose-img:rounded-xl prose-img:shadow-md
            prose-blockquote:border-l-[#F97316] prose-blockquote:text-[#64748B]"
          dangerouslySetInnerHTML={{ __html: article.contenu }}
        />

        {/* Navigation retour */}
        <div className="mt-14 pt-8 border-t border-[#E2E8F0]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#F97316] transition-colors"
          >
            <ArrowLeft size={14} />
            Retour au blog
          </Link>
        </div>
      </article>
    </div>
  )
}

import { fetchAPI } from './config'
import type { ArticleBlog, ReponseAPI } from '@/types'

export async function getArticles(page = 1): Promise<ReponseAPI<ArticleBlog[]>> {
  return fetchAPI(`/blog/?page=${page}`)
}

export async function getArticle(slug: string): Promise<ArticleBlog> {
  return fetchAPI(`/blog/${slug}/`)
}

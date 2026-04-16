// Configuration de l'API backend Django

// SSR → appel direct au backend (serveur → serveur, pas de CORS)
// CSR → proxy via Next.js API Route /api/proxy/* (même domaine, pas de CORS)
const SERVER_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
const CLIENT_API_URL = '/api/proxy'

export const API_URL = typeof window === 'undefined' ? SERVER_API_URL : CLIENT_API_URL

export const API_TIMEOUT = 10000

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`

  const reponse = await fetch(url, {
    cache: 'no-store',
    ...options,
  })

  if (!reponse.ok) {
    throw new Error(`Erreur API ${reponse.status}: ${reponse.statusText}`)
  }

  return reponse.json()
}

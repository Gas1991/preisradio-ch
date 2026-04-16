# Guide de Déploiement — Toprix Frontend

---

## Cible de déploiement

| Composant | Plateforme | URL |
|-----------|-----------|-----|
| **Frontend** | **Vercel** | https://toprix.net (à configurer) |
| **Backend** | Serv00 | `oven-cleaner@repo3.serv00.com` |

---

## Déploiement sur Vercel

### 1. Prérequis

- Compte Vercel lié à l'organisation **Toprix-comparateur**
- Dépôt GitHub : https://github.com/Toprix-comparateur/toprix
- Backend Django accessible en production sur Serv00

### 2. Import du projet

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Importer depuis GitHub → `Toprix-comparateur/toprix`
3. Framework détecté automatiquement : **Next.js**
4. **Ne pas modifier** les paramètres de build (Next.js gère automatiquement)

### 3. Variables d'environnement Vercel

Dans le dashboard Vercel → Settings → Environment Variables :

| Nom | Valeur | Environnements |
|-----|--------|---------------|
| `NEXT_PUBLIC_API_URL` | `https://api.toprix.net/api/v1` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://toprix.net` | Production |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | Development |

> Les variables préfixées `NEXT_PUBLIC_` sont exposées côté client et dans le build.

### 4. Domaine personnalisé

Dans Vercel → Settings → Domains :
1. Ajouter `toprix.net`
2. Configurer les DNS :
   ```
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```

### 5. Build et déploiement automatique

Chaque push sur `main` déclenche un build automatique.

```bash
# Commande de build (Vercel)
npm run build

# Output directory (auto-détecté)
.next/
```

---

## Déploiement manuel (CLI)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer en preview
vercel

# Déployer en production
vercel --prod
```

---

## Variables d'environnement locales

Créer `.env.local` à la racine du projet :

```bash
# .env.local (jamais commité — dans .gitignore)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Copier `.env.local.example` (si présent) comme base.

---

## Checklist avant mise en production

### Code
- [ ] `npm run build` passe sans erreur
- [ ] `npm run lint` sans warnings critiques
- [ ] Toutes les pages retournent un statut 200

### API
- [ ] `NEXT_PUBLIC_API_URL` pointe vers le backend de production
- [ ] Tous les endpoints API répondent correctement
- [ ] CORS configuré sur le backend pour accepter `https://toprix.net`

### SEO
- [ ] `NEXT_PUBLIC_SITE_URL` correctement défini
- [ ] `metadataBase` dans `layout.tsx` reflète l'URL de production
- [ ] Les Open Graph meta tags sont présents
- [ ] `robots.txt` accessible (à ajouter si nécessaire)
- [ ] Sitemap configuré (à implémenter via `app/sitemap.ts`)

### Performance
- [ ] Images optimisées — domaines configurés dans `next.config.ts`
- [ ] Aucune image sans `alt`

---

## Configuration `next.config.ts` pour les images

Si les images produits sont hébergées sur un domaine externe, l'ajouter dans `next.config.ts` :

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.toprix.net',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Si Cloudinary
      },
    ],
  },
}

export default nextConfig
```

---

## CORS — Configuration backend Django

Le backend doit autoriser les requêtes depuis le frontend :

```python
# settings.py Django
CORS_ALLOWED_ORIGINS = [
    "https://toprix.net",
    "https://www.toprix.net",
    "http://localhost:3000",  # développement
]
```

---

## Surveiller les déploiements

| Outil | URL |
|-------|-----|
| Dashboard Vercel | https://vercel.com/toprix-comparateur |
| Logs de build | Vercel → Deployments → Build Logs |
| Logs runtime | Vercel → Deployments → Runtime Logs |
| Analytics | Vercel → Analytics (à activer) |

---

## Rollback

En cas de problème en production :

```bash
# Via CLI — lister les déploiements
vercel ls

# Promouvoir un ancien déploiement
vercel alias <deployment-url> toprix.net
```

Ou depuis le dashboard : Deployments → choisir un déploiement → "Promote to Production".

---

## Structure des branches recommandée

| Branche | Déploiement | Description |
|---------|-------------|-------------|
| `main` | Production → toprix.net | Code stable validé |
| `develop` | Preview Vercel | Développement en cours |
| `feature/*` | Preview Vercel | Nouvelles fonctionnalités |

---

## Sitemap (à implémenter)

Créer `src/app/sitemap.ts` :

```typescript
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toprix.net'

  // Récupérer les slugs dynamiques depuis l'API
  // const produits = await getProduits()

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/marques`,    lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`,       lastModified: new Date(), priority: 0.7 },
    // + pages dynamiques produits/catégories/articles
  ]
}
```

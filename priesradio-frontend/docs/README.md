# Toprix — Documentation Technique

> Comparateur de produits high-tech en Tunisie
> Frontend Next.js 16 · TypeScript · Tailwind CSS v4

---

## Table des matières

| Fichier | Contenu |
|---------|---------|
| [README.md](./README.md) | Vue d'ensemble (ce fichier) |
| [architecture.md](./architecture.md) | Stack, structure des dossiers, décisions techniques |
| [design-system.md](./design-system.md) | Tokens couleurs, typographie, composants UI |
| [api.md](./api.md) | Couche API, types TypeScript, endpoints |
| [pages.md](./pages.md) | Catalogue complet des routes et pages |
| [deployment.md](./deployment.md) | Guide de déploiement Vercel |

---

## Présentation

**Toprix** est un comparateur de prix de produits high-tech (smartphones, laptops, audio, gaming…) destiné au marché tunisien. L'utilisateur peut comparer les prix d'un même produit parmi plusieurs boutiques en ligne.

### Contexte technique

Ce dépôt contient le **frontend Next.js**, conçu pour fonctionner avec un **backend Django REST API** (dépôt séparé). La base de données est **MongoDB**.

```
┌─────────────────────┐     API REST      ┌──────────────────────┐
│   Frontend Next.js  │ ◄──────────────► │  Backend Django DRF  │
│  (ce dépôt)         │                   │  + MongoDB           │
│  Vercel             │                   │  Serv00              │
└─────────────────────┘                   └──────────────────────┘
```

---

## Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/Toprix-comparateur/toprix.git
cd toprix

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec l'URL de l'API

# Lancer en développement
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

---

## Variables d'environnement

| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | URL du backend Django |
| `NEXT_PUBLIC_SITE_URL` | `https://toprix.net` | URL publique du site (SEO) |

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (localhost:3000) |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

---

## Dépôts

| Dépôt | URL |
|-------|-----|
| Frontend (ce dépôt) | https://github.com/Toprix-comparateur/toprix |
| Backend Django | *(à créer)* |

---

## Contacts

- **Développeur** : Gas1212 / Toprix-comparateur
- **Email** : ghassengharbi191@gmail.com

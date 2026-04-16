# Toprix — Todo List

## ✅ Fait

- [x] Intégration Tawk.to (live chat)
- [x] Bandeau Eid Fitr Mubarak 2026 (header)
- [x] CampagneTeasers → Offres été 2026 + Aïd Al-Adha 2026
- [x] URLs catégories avec `?tri=prix_desc`
- [x] Page produit : section "Comparer les offres" améliorée
- [x] Cartes produits similaires : hauteur image réduite (h-28)
- [x] Fix doublons titres SEO (22 pages sous-catégories)
- [x] Fix doublons meta descriptions (22 pages sous-catégories)

---

## 🔄 En cours

- [ ] GEO — Organisation JSON-LD dans layout
- [ ] GEO — BreadcrumbList JSON-LD sur toutes les pages
- [ ] GEO — Page `/a-propos` structurée
- [ ] GEO — Fichier `/llms.txt`

---

## 📋 À faire

### SEO / GEO
- [ ] FAQ JSON-LD sur les pages catégories
- [ ] Enrichir descriptions pages catégories (contenu conversationnel)
- [ ] Soumettre sitemap dans Google Search Console

### shop.toprix.tn (WordPress + WooCommerce)
- [ ] Configurer SSL (Let's Encrypt)
- [ ] Plugin Shipper WooCommerce (import produits + envoi commandes)
- [ ] Configurer livraison COD (zones Tunisie + tarifs)
- [ ] Choisir et personnaliser le thème

---

## 🚀 Tâches à venir

### MCP (Model Context Protocol)
> Permettre aux agents IA (Claude, ChatGPT) d'accéder aux prix Toprix en temps réel

- [ ] Créer le serveur MCP (`mcp.toprix.tn`) en Node.js
  - Outil `search_products` — recherche par nom
  - Outil `get_best_price` — meilleur prix par produit
  - Outil `get_category` — produits par catégorie
- [ ] Déployer sur Vercel / Railway
- [ ] Soumettre sur les registres MCP (smithery.ai, mcp.so, glama.ai)
- [ ] Ajouter référence MCP dans `/llms.txt`

---

_Dernière mise à jour : Avril 2026_

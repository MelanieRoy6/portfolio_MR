# Prompt n°1 — Initialiser le projet (à coller dans l'agent)

> Colle tout ce qui suit dans ton agent (Claude Code). Il crée la base, le contrat de données et le fichier PLAN.md. Les agents suivants travailleront ensuite en parallèle.

---

Tu es un développeur front senior. Crée la **base** d'un site portfolio personnel pour Mélanie Roy (QA Automation / développeuse junior, reconversion pro). Tu ne fais QUE la fondation : pas de contenu final, pas d'animation finale.

## Contraintes
- Site 100 % statique : pas de backend, pas de base de données, pas de formulaire côté serveur.
- Stack : **Astro (output: static) + TypeScript + CSS natif (variables CSS)**. Animations : **GSAP + ScrollTrigger** (installés, mais utilisés plus tard par l'agent graphisme). Pas de framework UI (React/Vue) sauf nécessité.
- Le contenu doit être **dans le HTML généré** (rendu à la compilation), pas injecté par JS : indispensable pour le référencement.
- Langue : français (`<html lang="fr">`). Mobile-first, accessible (HTML sémantique, contraste, focus visible, `prefers-reduced-motion` respecté).
- Contact = liens uniquement : `mailto:` + LinkedIn. Pas de formulaire. L'email ne doit pas apparaître en clair dans le HTML (assemblé côté client à partir de deux fragments, avec un lien de repli vers LinkedIn si JS désactivé).
- Ne JAMAIS publier le téléphone ni l'adresse postale (afficher seulement « Nantes et alentours »).

## À réaliser
0. **Dépôt existant** : `https://github.com/MelanieRoy6/portfolio_MR` (déjà cloné dans le dossier courant). Ne fais PAS de `git init`. Lis d'abord `PLAN.md` à la racine : c'est la référence du projet, tu ne le réécris pas. Travaille sur la branche `main`, et pousse (`git push`) à la fin.
1. Initialise le projet Astro (TypeScript strict) **à la racine de ce dépôt**, sans écraser `PLAN.md`, `PROMPT_01_INIT.md` ni le `README`. Scripts : `dev`, `build`, `preview`, `check` (astro check), `lint`. Ajoute un `.gitignore` adapté (node_modules, dist, .astro, .env).
2. Arborescence :
```
src/
  data/        types.ts, profile.ts, timeline.ts, skills.ts   (CONTRAT DE DONNÉES)
  layouts/     Base.astro                                       (head SEO + sécurité)
  components/  Nav, Hero, About, TimelineScroll, TimelineItem, Skills, Contact, Footer (squelettes)
  scripts/     timeline.ts                                      (vide, pour l'agent graphisme)
  styles/      tokens.css, global.css
  pages/       index.astro, 404.astro
public/        favicon, og-image.png (placeholder), robots.txt, _headers
```
3. **Contrat de données** `src/data/types.ts` (ne plus le modifier ensuite sans accord) :
```ts
export type TimelineCategory = 'formation' | 'experience' | 'certification' | 'engagement';
export interface TimelineEntry {
  id: string;                  // slug unique
  start: string;               // 'YYYY' ou 'YYYY-MM'
  end?: string;                // absent = en cours
  category: TimelineCategory;
  title: string;
  org: string;
  place?: string;
  punchline: string;           // 1 phrase percutante (max 120 caractères)
  bullets: string[];           // 2 à 4 points concrets
  tags: string[];
}
export interface Profile { name: string; headline: string; pitch: string; location: string; linkedin: string; emailUser: string; emailDomain: string; }
export interface SkillGroup { label: string; items: string[]; }
```
Remplis `profile.ts`, `timeline.ts` et `skills.ts` avec 2-3 entrées **factices** typées, pour que le site compile.
4. **Base.astro** : titre/description, canonical, Open Graph + Twitter Card, `theme-color`, favicon, JSON-LD `Person` (schema.org), une seule `<h1>` par page. Ajoute `@astrojs/sitemap` et un `robots.txt` pointant vers le sitemap.
5. **Sécurité** : fichier `public/_headers` (compatible Cloudflare Pages / Netlify) avec : `Content-Security-Policy` stricte (default-src 'self', pas d'inline script si possible, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'none'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictive, `Strict-Transport-Security`. Aucune dépendance chargée depuis un CDN (tout est bundlé). Liens externes en `rel="noopener noreferrer"`.
6. Design : implémente seulement les **tokens** (couleurs, typo, espacements) dans `tokens.css`, avec un thème sobre inspiré de karimbouzgarne.fr (navbar fixe en haut, hero plein écran, sections Services / Portfolio / Formation / Contact, parcours vertical). Palette provisoire, facile à changer.
7. Crée `AGENTS.md` (conventions de code, règles de non-chevauchement ci-dessous, renvoi vers `PLAN.md`). Ne modifie pas `PLAN.md`.
8. Vérifie : `npm run build` et `npm run check` passent sans erreur. Fais un commit « chore: base du projet » puis `git push origin main`.
9. Crée ensuite les branches `feat/contenu` et `feat/graphisme` à partir de `main` et pousse-les, pour que les deux agents de la phase 1 puissent démarrer.

## Règles de propriété des fichiers (pour le travail en parallèle)
- Agent CONTENU : seulement `src/data/**` (sauf `types.ts`).
- Agent GRAPHISME : seulement `src/components/**`, `src/scripts/**`, `src/styles/**`.
- Fondation/SEO/sécurité : `src/layouts/**`, `src/pages/**`, `public/**`, config.

Termine en listant ce que tu as créé et les commandes pour lancer le site.
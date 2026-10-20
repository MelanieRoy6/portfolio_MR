# PLAN.md — Portfolio de Mélanie Roy

## 1. Objectif
Site portfolio 100 % front, statique, rapide, bien référencé, sécurisé. Au centre : une **animation de timeline pilotée par le scroll** qui raconte le parcours (du médico-social au développement/QA). Contact par `mailto` + LinkedIn.

Référence design : karimbouzgarne.fr (navbar fixe, hero plein écran « accroche », sections Services → Portfolio → Formation (parcours vertical) → Contact, pied de page sobre). On reprend la **structure et l'esprit**, pas le code ni les visuels.

## 2. Choix techniques (simplicité d'abord)
| Besoin | Choix | Pourquoi |
|---|---|---|
| Framework | Astro, sortie statique, TypeScript | HTML pré-rendu = SEO optimal, quasi zéro JS par défaut |
| Animation | GSAP + ScrollTrigger (bundlé via npm) | Standard pour le scroll-storytelling, `pin` + `scrub` |
| Styles | CSS natif + variables | Pas de dépendance, facile à maintenir |
| Données | Fichiers TS typés dans `src/data` | Sépare le contenu du graphisme → travail parallèle sans conflit |
| Hébergement | Cloudflare Pages (ou Netlify) | HTTPS auto, fichier `_headers`, déploiement depuis GitHub |
| Contact | `mailto:` assemblé par JS + lien LinkedIn | Pas de backend, anti-scraping basique |

## 3. Sécurité (site statique, mais pas sans risques)
- Surface d'attaque minimale : pas de backend, pas de formulaire, pas de secret dans le dépôt.
- En-têtes HTTP via `public/_headers` : CSP stricte, `frame-ancestors 'none'` (anti-clickjacking / intégration frauduleuse), `nosniff`, Referrer-Policy, Permissions-Policy, HSTS.
- Aucune ressource tierce non maîtrisée (polices et scripts bundlés localement).
- Chaîne de dépendances : `npm audit`, Dependabot activé, versions verrouillées (`package-lock.json`).
- Détournement du site : 2FA sur GitHub, l'hébergeur ET le registrar du nom de domaine ; verrouillage du domaine (registrar lock) ; DNSSEC si disponible ; branche `main` protégée (PR obligatoire).
- Vie privée : ne **pas** publier téléphone ni adresse postale (ville seulement). Email non écrit en clair dans le HTML.

## 4. SEO
- HTML sémantique, une seule `h1`, hiérarchie `h2/h3`, `lang="fr"`, textes réels dans le HTML (pas uniquement dans le JS).
- `title` + `meta description` uniques, canonical, Open Graph / Twitter Card, image OG 1200×630.
- JSON-LD `Person` (nom, métier, ville, liens `sameAs` : LinkedIn, GitHub `MelanieRoy6`).
- `sitemap.xml`, `robots.txt`, déclaration dans Google Search Console.
- Performance (Core Web Vitals) : images WebP/AVIF avec dimensions, polices auto-hébergées avec `font-display: swap`, animation sans bloquer le LCP. Objectif Lighthouse ≥ 95 partout.
- Mots-clés naturels dans les titres/textes : « QA automation », « développeuse », « Nantes », « Playwright », « ISTQB ».
- Repli sans JS : la timeline reste lisible en liste verticale.

## 5. Structure de la page (one-page)
1. **Nav** fixe : Parcours · Compétences · Contact.
2. **Hero** plein écran : nom, titre (« Développeuse & QA Automation, double compétence »), phrase d'accroche, bouton « Voir mon parcours ».
3. **À propos** : pitch court (reconversion, ce que je cherche).
4. **Parcours (cœur du site)** : timeline animée au scroll.
5. **Compétences** : groupes (Test & QA / Dev / Données & IA / DevOps & outils).
6. **Contact** : boutons Email + LinkedIn (+ GitHub). Pas de formulaire.
7. **Footer** : © + mentions minimales.

## 6. L'animation centrale (spécification pour l'agent GRAPHISME)
- Section `TimelineScroll` **épinglée** (`ScrollTrigger pin`) : pendant le scroll, une ligne verticale/ SVG centrale se « dessine » (`stroke-dashoffset` lié au `scrub`).
- Chaque `TimelineEntry` apparaît à son tour de part et d'autre de la ligne (alternance gauche/droite sur desktop, une seule colonne sur mobile) : année en grand, titre, punchline, puces, tags.
- Un « curseur » (point lumineux) suit la ligne ; la **couleur d'accent change par phase** : 1) médico-social, 2) entrepreneuriat/engagement, 3) test logiciel, 4) développement. Cela fait le storytelling.
- Les années défilent en gros chiffres en fond (effet compteur).
- Durée de scroll proportionnelle au nombre d'étapes (≈ 60–80 vh par étape).
- `prefers-reduced-motion: reduce` → pas de pin ni de scrub : liste statique.
- Sans JS → liste statique lisible (progressive enhancement).
- Performance : animer uniquement `transform` et `opacity`; `ScrollTrigger.refresh()` après chargement des polices; pas de layout thrash.

## 7. Répartition du travail

### Phase 0 — Fondation (prompt n°1, 1 agent, séquentiel)
Projet Astro, contrat `src/data/types.ts`, Base.astro (SEO), `_headers`, tokens CSS, squelettes de composants. **Doit être terminée et commitée avant la phase 1.**

### Phase 1 — En parallèle (2 agents, 2 branches/worktrees)

| | Agent A — CONTENU | Agent B — GRAPHISME |
|---|---|---|
| Branche | `feat/contenu` | `feat/graphisme` |
| Fichiers autorisés | `src/data/**` (sauf `types.ts`) | `src/components/**`, `src/scripts/**`, `src/styles/**` |
| Interdit | Toucher composants/styles | Toucher `src/data/**` (utiliser les données factices existantes) |
| Livrable | Données finales validées | Timeline animée + design de toutes les sections |

### Phase 2 — Intégration (1 agent)
Merge des deux branches, branchement des vraies données, réglage de la durée du scroll selon le nombre d'étapes, passage SEO + sécurité + accessibilité, déploiement.

## 8. Prompt — Agent A (CONTENU)

```
Tu es rédacteur CV/portfolio et développeur. Branche : feat/contenu.
Tu modifies UNIQUEMENT src/data/profile.ts, timeline.ts, skills.ts (types.ts est un contrat : ne pas le changer).

Mission : transformer le CV de Mélanie en données structurées.
1. timeline.ts : liste des étapes en ORDRE CHRONOLOGIQUE CROISSANT (la plus ancienne d'abord). Pour chacune : punchline ≤ 120 caractères, concrète et sans jargon creux ; 2 à 4 bullets avec verbes d'action et résultats vérifiables (pas d'invention) ; tags techniques.
   Étapes sources (à valider avec Mélanie) :
   - 2012 Bac Pro SMR (Lycée Saint Martin, Machecoul)
   - 2013 Diplôme d'aide-soignante DEAS (IFAS Croix-Rouge, Rezé)
   - 2012–2024 Aide-soignante (EHPAD Saint Joseph, CHU Laënnec, ICO Gauducheau)
   - 2014–2026 Secrétaire associative e-sport (Naolan)
   - 2017–2019 Co-fondatrice, KWICKY SAS (plateforme de services pour coiffeurs à domicile, première expérience du numérique)
   - 2024–2025 Formation Testeur logiciel, Bac+2 (ENI)
   - 2025 Certification ISTQB Foundation 4
   - 2025 Stage testeuse logicielle, 2 mois (UCAYA) : cahier de tests, framework de test, scripts Playwright/TypeScript, intégration DevOps
   - 2025–2026 Concepteur Développeur d'Applications, Bac+3 (ENI) en alternance chez UCAYA : C#/XAML UWP sur l'application CANAL+, tests E2E (Playwright/FlaUI), tests unitaires (Vitest/MSTest) en CI, Java Spring Boot, Angular, Flutter, SQL Server, Python/ML
2. profile.ts : headline, pitch (3-4 phrases : reconversion → double compétence Dev & QA → ce que je recherche : poste de développeuse junior, ouverte aussi à l'automatisation de tests), localisation « Nantes et alentours », liens LinkedIn/GitHub, email en deux fragments.
3. skills.ts : 4 groupes (Test & QA ; Développement ; Données & IA ; DevOps & outils).
4. Règles : pas de téléphone, pas d'adresse. Ne pas nommer la contrepartie confidentielle du stage (le CV masque le nom de l'application testée : garder la formulation générique). Signaler dans ta réponse toute incohérence ou donnée à confirmer (ex. durée de l'expérience dans le médico-social : 12 ou 13 ans ; dates de fin de l'engagement Naolan).
5. Vérifie : `npm run check` et `npm run build` passent. Commit « feat(contenu): données du parcours ».
```

## 9. Prompt — Agent B (GRAPHISME)

```
Tu es développeur front/creative developer. Branche : feat/graphisme.
Tu modifies UNIQUEMENT src/components/**, src/scripts/**, src/styles/**. Tu n'inventes pas de contenu : tu lis les données typées de src/data/** (des données factices existent, les vraies arriveront de la branche contenu).

Mission : design + animation, dans l'esprit de karimbouzgarne.fr (navbar fixe, hero plein écran, sections nettes, parcours vertical), en version plus soignée.
1. Nav, Hero, About, Skills, Contact, Footer : responsive, accessibles, cohérents avec tokens.css.
2. TimelineScroll + TimelineItem + scripts/timeline.ts : implémente la spec de la section 6 de PLAN.md (pin, ligne SVG qui se dessine, apparition alternée, changement de couleur par catégorie/phase, gros chiffres d'années, reduced-motion, repli sans JS).
3. Le composant doit fonctionner quel que soit le nombre d'étapes (boucle sur les données, jamais de valeurs en dur).
4. Contact : boutons mailto (assemblé en JS depuis emailUser/emailDomain) et LinkedIn, avec repli sans JS vers LinkedIn.
5. Contraintes : pas de CDN, pas de script inline (compatible CSP), animer seulement transform/opacity, images avec width/height.
6. Vérifie : build OK, Lighthouse mobile ≥ 90 perf / 100 accessibilité, test manuel à 375 px, 768 px, 1440 px. Commit « feat(graphisme): timeline animée et sections ».
```

## 10. Phase 2 — Checklist d'intégration (agent final)
- [ ] Merge `feat/contenu` puis `feat/graphisme` ; résoudre les conflits éventuels
- [ ] Réglage de la durée du pin selon le nombre d'étapes réelles
- [ ] Relecture des textes (orthographe, ton, cohérence des dates)
- [ ] SEO : title/description, OG image réelle, JSON-LD valide (test Rich Results), sitemap
- [ ] Sécurité : en-têtes vérifiés (securityheaders.com, Mozilla Observatory), `npm audit` propre
- [ ] Accessibilité : navigation clavier, contrastes, reduced-motion
- [ ] Déploiement Cloudflare Pages/Netlify + domaine + HTTPS + 2FA partout
- [ ] Search Console : ajout du site + soumission du sitemap

## 11. Décisions à prendre (toi)
1. Nom de domaine (ex. `melanie-roy.fr`) ?
2. Positionnement du titre : « QA Automation Engineer » ou « Développeuse junior »  — ton CV actuel met QA en avant ; ta recherche vise surtout le poste de dev junior, avec ouverture au test automatisé. Le titre « Double compétence Dev & QA » fait le lien.
3. Projets à montrer plus tard (section « Projets » facultative) : à ajouter dans `src/data/projects.ts` en phase 3.
4. Photo : oui/non (si oui, WebP, ≤ 100 Ko).

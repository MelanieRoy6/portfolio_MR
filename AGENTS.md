# AGENTS.md — Conventions et règles de non-chevauchement

Référence projet : voir **[PLAN.md](./PLAN.md)** pour la vision globale, les décisions techniques et la spécification de l'animation.

## Règles de propriété des fichiers

| Agent | Fichiers autorisés | Interdit |
|---|---|---|
| **FONDATION** (terminé) | `src/layouts/**`, `src/pages/**`, `public/**`, config racine | Modifier après la phase 0 sans accord |
| **CONTENU** (feat/contenu) | `src/data/profile.ts`, `src/data/timeline.ts`, `src/data/skills.ts` | `src/data/types.ts` (contrat figé), tout le reste |
| **GRAPHISME** (feat/graphisme) | `src/components/**`, `src/scripts/**`, `src/styles/**` | `src/data/**` (utiliser les données factices existantes) |

## Contrat de données

`src/data/types.ts` est **figé**. Ne pas le modifier sans accord explicite de tous les agents.  
Les agents CONTENU et GRAPHISME s'appuient sur ce contrat commun.

## Conventions de code

- **TypeScript strict** : pas de `any`, pas d'assertions non-nulles (`!`) sans justification.
- **Composants Astro** : props typées avec `interface Props`.
- **Styles** : CSS natif uniquement, utiliser les variables de `tokens.css`. Pas de style inline sauf cas exceptionnel.
- **Animations** : uniquement `transform` et `opacity` (pas de layout thrash). Respecter `prefers-reduced-motion`.
- **Accessibilité** : HTML sémantique, `aria-label` sur les éléments interactifs sans texte visible, contrastes WCAG AA minimum.
- **Sécurité** : pas de CDN, pas de script inline, liens externes avec `rel="noopener noreferrer"`.
- **Email** : toujours assemblé depuis `emailUser` + `emailDomain`, jamais en clair dans le HTML.

## Commits

- CONTENU : `feat(contenu): <description>`
- GRAPHISME : `feat(graphisme): <description>`
- Intégration : `feat(integration): <description>`

## Vérifications avant commit

```bash
npm run check   # astro check (TypeScript)
npm run build   # build statique complet
```

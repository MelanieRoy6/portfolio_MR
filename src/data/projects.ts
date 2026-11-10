/**
 * Projets affichés dans la section « Projets ».
 *
 * Pour ajouter un projet : ajoute un objet à la liste `projects` ci-dessous.
 * Images : dépose les captures dans `public/projects/` (3 maximum par projet,
 * la première est la grande image) et renseigne `images`.
 *
 * Catégories (filtres) :
 *   'entreprise' → Projets en entreprise
 *   'perso'      → Projets perso
 */
export type ProjectCategory = 'entreprise' | 'perso';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  context?: string;
  role?: string;
  tech: string[];
  categories: ProjectCategory[];
  /** Logo du projet (petite vignette sur la carte) */
  logo?: { src: string; alt: string };
  /** 3 images maximum */
  images?: { src: string; alt: string; fit?: 'cover' | 'contain' }[];
  links?: ProjectLink[];
  en?: { name?: string; description?: string; role?: string; context?: string };
}

export const projects: Project[] = [
  {
    id: 'canal-uwp',
    name: 'Application CANAL+ (UWP)',
    context: 'Alternance · UCAYA · 1 an',
    description:
      "Pendant un an, j'ai travaillé sur l'application CANAL+ en C#/XAML (UWP) : développement de fonctionnalités, tests automatisés de bout en bout et tests unitaires intégrés à la CI.",
    role: 'Développement et tests',
    tech: ['C#', 'XAML', 'UWP', 'FlaUI', 'MSTest', 'CI/CD'],
    categories: ['entreprise'],
    en: {
      name: 'CANAL+ application (UWP)',
      context: 'Work-study · UCAYA · 1 year',
      description:
        'For one year, I worked on the CANAL+ application in C#/XAML (UWP): feature development, end-to-end automated tests and unit tests integrated in CI.',
      role: 'Development and testing',
    },
  },
  {
    id: 'stargazer',
    name: 'Stargazer',
    context: 'Alternance · UCAYA',
    description:
      "Application de présentation multi-écrans pour des showrooms. J'y ai mis en place des tests automatisés (Playwright) et des tests unitaires (Vitest), créé un outil de gestion de tests sur Notion et développé une nouvelle fonctionnalité.",
    role: 'Tests et développement',
    tech: ['Playwright', 'Vitest', 'TypeScript', 'Notion'],
    categories: ['entreprise'],
    logo: { src: '/projects/stargazer-logo.png', alt: 'Logo Stargazer' },
    images: [
      { src: '/projects/stargazer-showroom.jpg', alt: 'Salle showroom équipée de plusieurs écrans qui diffusent une présentation' },
      { src: '/projects/stargazer-resultats.jpg', alt: 'Tableau de bord Notion des résultats de campagnes de tests : répartition des statuts et tickets par catégorie' },
      { src: '/projects/stargazer-test-management.jpg', fit: 'contain', alt: 'Page d’accueil de l’outil de gestion de tests sur Notion : cas de tests, campagnes, résultats, bugs et rapports' },
    ],
    en: {
      context: 'Work-study · UCAYA',
      description:
        'A multi-screen presentation app for showrooms. I set up automated tests (Playwright) and unit tests (Vitest), built a test management tool on Notion and developed a new feature.',
      role: 'Testing and development',
    },
  },
];

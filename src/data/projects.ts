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
  /** 3 images maximum */
  images?: { src: string; alt: string }[];
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
    tech: ['C#', 'XAML', 'UWP', 'Playwright', 'FlaUI', 'MSTest', 'Vitest', 'CI/CD'],
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
      "Tests automatisés avec Playwright, création d'un outil de gestion de tests sur Notion et développement d'une nouvelle fonctionnalité.",
    role: 'Tests et développement',
    tech: ['Playwright', 'TypeScript', 'Notion'],
    categories: ['entreprise'],
    en: {
      context: 'Work-study · UCAYA',
      description:
        'Automated tests with Playwright, a test management tool built on Notion, and development of a new feature.',
      role: 'Testing and development',
    },
  },
];

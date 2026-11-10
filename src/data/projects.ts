/**
 * Projets affichés dans la section « Projets ».
 *
 * Pour ajouter un projet : ajoute un objet à la liste `projects` ci-dessous
 * (et dépose sa capture d'écran dans `public/projects/`). La section, les
 * filtres et la mise en page asymétrique se mettent à jour toutes seules.
 * Tant que la liste est vide, la section affiche un message d'attente.
 *
 * Catégories (pour les filtres) :
 *   'dev'   → Développement
 *   'tests' → Tests logiciels
 *   'auto'  → Automatisation
 * Un projet peut appartenir à plusieurs catégories.
 *
 * Exemple :
 *   {
 *     id: 'mon-projet',
 *     name: 'Nom du projet',
 *     description: 'Le besoin, la réponse apportée.',
 *     role: 'Conception et développement',
 *     tech: ['TypeScript', 'Playwright'],
 *     categories: ['dev', 'auto'],
 *     image: { src: '/projects/mon-projet.jpg', alt: 'Capture de la page d’accueil' },
 *     links: [
 *       { label: 'Voir le projet', url: 'https://…' },
 *       { label: 'Code source', url: 'https://github.com/MelanieRoy6/…' },
 *     ],
 *     en: { description: 'The need, the answer.', role: 'Design and development' },
 *   }
 */
export type ProjectCategory = 'dev' | 'tests' | 'auto';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role?: string;
  tech: string[];
  categories: ProjectCategory[];
  image?: { src: string; alt: string };
  links?: ProjectLink[];
  en?: { name?: string; description?: string; role?: string };
}

export const projects: Project[] = [];

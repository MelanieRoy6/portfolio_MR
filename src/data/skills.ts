import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  {
    label: 'Test & QA',
    items: [
      'Playwright',
      'FlaUI',
      'ISTQB Foundation 4',
      'Test E2E',
      'Test unitaire',
      'Stratégie de test',
      'Cahier de tests',
    ],
  },
  {
    label: 'Développement',
    items: [
      'C#',
      'XAML / UWP',
      'Java',
      'Spring Boot',
      'Angular',
      'Flutter',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Astro',
    ],
  },
  {
    label: 'Données & IA',
    items: ['Python', 'SQL Server', 'Machine Learning (notions)'],
  },
  {
    label: 'DevOps & Outils',
    items: ['Git', 'GitHub Actions', 'CI/CD', 'Vitest', 'MSTest', 'VS Code'],
  },
];

import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  {
    label: 'Test & QA',
    items: ['Playwright', 'ISTQB Foundation 4', 'Test unitaire', 'Test E2E', 'Stratégie de test', 'Cahier de tests'],
    en: {
      label: 'Test & QA',
      items: ['Playwright', 'ISTQB Foundation 4', 'Unit testing', 'E2E testing', 'Test strategy', 'Test plan'],
    },
  },
  {
    label: 'Développement',
    items: ['TypeScript', 'JavaScript', 'C#', 'Java', 'Angular', 'Astro', 'HTML', 'CSS'],
    en: { label: 'Development' },
  },
  {
    label: 'Données & IA',
    items: ['Python', 'SQL Server', 'Notions de Machine Learning'],
    en: {
      label: 'Data & AI',
      items: ['Python', 'SQL Server', 'Machine Learning basics'],
    },
  },
  {
    label: 'DevOps & Outils',
    items: ['Git', 'GitHub Actions', 'CI/CD', 'VS Code', 'Vitest', 'MSTest'],
    en: { label: 'DevOps & Tools' },
  },
];

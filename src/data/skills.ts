import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  {
    label: 'Tests et qualité',
    items: ['Playwright', 'ISTQB Foundation 4', 'Test unitaire', 'Test E2E', 'Stratégie de test', 'Cahier de tests'],
    description: 'Du cahier de tests aux tests E2E lancés en CI.',
    en: {
      label: 'Testing & Quality',
      items: ['Playwright', 'ISTQB Foundation 4', 'Unit testing', 'E2E testing', 'Test strategy', 'Test plan'],
      description: 'From test plans to E2E tests running in CI.',
    },
  },
  {
    label: 'Développement',
    items: ['TypeScript', 'JavaScript', 'C#', 'Java', 'Angular', 'Astro', 'HTML', 'CSS'],
    description: "Front-end sur une plateforme de streaming vidéo (C# · XAML · UWP · .NET) · Back-end sur une application Google de présentation interactive multi-écran (React · TypeScript) · Et de nombreux projets vus en formation CDA : JavaScript, Flutter, Spring Boot, Angular, Python…",
    en: {
      label: 'Development',
      description: "Front-end on a video streaming platform (C# · XAML · UWP · .NET) · Back-end on a private Google interactive multi-screen app (React · TypeScript) · Plus many projects from CDA training: JavaScript, Flutter, Spring Boot, Angular, Python…",
    },
  },
  {
    label: 'Outils et CI',
    items: ['Git / GitHub', 'GitHub Actions', 'GitLab', 'Jira'],
    description: 'Suivi de bugs et intégration continue.',
    en: {
      label: 'Tools & CI',
      items: ['Git / GitHub', 'GitHub Actions', 'GitLab', 'Jira'],
      description: 'Bug tracking and continuous integration.',
    },
  },
];

import type { TimelineEntry } from './types';

export const timeline: TimelineEntry[] = [
  {
    id: 'bac-pro-smr',
    start: '2010',
    end: '2012',
    category: 'formation',
    title: 'Bac Pro Services aux personnes et Mobilité dans les territoires',
    org: 'Lycée Saint Martin',
    place: 'Machecoul',
    punchline: "Première spécialisation dans l'accompagnement humain et le soin.",
    bullets: [
      "Formation aux techniques de soins et d'aide à la personne",
      'Stages en EHPAD et services de soins à domicile',
    ],
    tags: ['médico-social', 'soin', 'aide à la personne'],
  },
  {
    id: 'aide-soignante',
    start: '2012',
    end: '2024',
    category: 'experience',
    title: 'Aide-soignante',
    org: 'EHPAD Saint Joseph · CHU Laënnec · ICO Gauducheau',
    place: 'Nantes',
    punchline: 'Plus de dix ans au service de patients exigeants, dans des environnements sous haute pression.',
    bullets: [
      'Prise en charge de patients en oncologie, gériatrie et soins de suite',
      "Transmission d'informations précises et documentation rigoureuse",
      "Travail en équipe pluridisciplinaire dans des contextes d'urgence",
    ],
    tags: ['gériatrie', 'oncologie', 'soins', 'travail en équipe'],
  },
  {
    id: 'formation-testeur',
    start: '2024',
    end: '2025',
    category: 'formation',
    title: 'BTS Testeur logiciel (Bac+2)',
    org: 'ENI',
    place: 'Nantes',
    punchline: 'Reconversion réussie : de la rigueur médicale à la rigueur du test logiciel.',
    bullets: [
      'Rédaction de cahiers de tests et stratégies de test',
      'Automatisation avec Playwright/TypeScript',
      'Introduction aux pratiques CI/CD',
    ],
    tags: ['test logiciel', 'Playwright', 'TypeScript', 'CI/CD'],
  },
];

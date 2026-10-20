import type { TimelineEntry } from './types';

export const timeline: TimelineEntry[] = [
  {
    id: 'bac-pro-sapat',
    start: '2010',
    end: '2012',
    category: 'formation',
    title: 'Bac Pro Services aux personnes et Mobilité dans les territoires',
    org: 'Lycée Saint Martin',
    place: 'Machecoul',
    punchline: "Première spécialisation dans l'accompagnement humain, le soin et les services à la personne.",
    bullets: [
      "Formation aux techniques de soins, d'aide à la personne et de mobilité en milieu rural",
      'Stages pratiques en EHPAD et structures de soins à domicile',
    ],
    tags: ['médico-social', 'soin', 'aide à la personne'],
  },
  {
    id: 'deas',
    start: '2012',
    end: '2013',
    category: 'formation',
    title: "Diplôme d'État d'Aide-Soignante (DEAS)",
    org: 'IFAS Croix-Rouge française',
    place: 'Rezé',
    punchline: "Qualification professionnelle d'État : dix mois de formation intensive en établissements de santé.",
    bullets: [
      "Formation aux soins de nursing, d'hygiène et d'accompagnement du patient",
      'Stages cliniques en EHPAD, service de médecine et de chirurgie',
    ],
    tags: ['DEAS', 'aide-soignante', 'soins infirmiers', 'médico-social'],
  },
  {
    id: 'aide-soignante',
    start: '2012',
    end: '2024',
    category: 'experience',
    title: 'Aide-soignante',
    org: 'EHPAD Saint Joseph · CHU Laënnec · ICO Gauducheau',
    place: 'Nantes',
    punchline:
      "Plus de dix ans au contact de patients en oncologie, gériatrie et soins de suite, dans des services à haute exigence.",
    bullets: [
      'Prise en charge de patients en oncologie, gériatrie et soins de suite',
      "Transmission d'informations précises et documentation rigoureuse dans des outils métier",
      "Travail en équipe pluridisciplinaire dans des contextes d'urgence et de charge élevée",
    ],
    tags: ['gériatrie', 'oncologie', 'soins', 'travail en équipe', 'documentation'],
  },
  {
    id: 'naolan',
    start: '2014',
    end: '2026',
    category: 'engagement',
    title: 'Secrétaire associative',
    org: 'Naolan',
    punchline:
      "Dix ans de bénévolat dans l'e-sport : administration, coordination et représentation auprès des partenaires.",
    bullets: [
      "Gestion administrative et secrétariat d'une association e-sport active",
      'Organisation événements et animation de la communauté de joueurs',
      'Interface entre les membres, les équipes et les partenaires extérieurs',
    ],
    tags: ['e-sport', 'associatif', 'organisation', 'coordination'],
  },
  {
    id: 'kwicky',
    start: '2017',
    end: '2019',
    category: 'experience',
    title: 'Co-fondatrice',
    org: 'KWICKY SAS',
    punchline:
      "Première immersion dans l'entrepreneuriat numérique : création d'une plateforme de mise en relation pour coiffeurs à domicile.",
    bullets: [
      "Co-fondation d'une startup de services à domicile pour coiffeurs indépendants",
      "Découverte des enjeux du produit numérique : conception, acquisition, opérations",
    ],
    tags: ['startup', 'entrepreneuriat', 'numérique', 'services à domicile'],
  },
  {
    id: 'formation-testeur',
    start: '2024',
    end: '2025',
    category: 'formation',
    title: 'Formation Testeur logiciel (Bac+2)',
    org: 'ENI',
    place: 'Nantes',
    punchline:
      'Reconversion réussie : de la rigueur médicale à la rigueur du test logiciel, avec Playwright et TypeScript.',
    bullets: [
      'Rédaction de plans de tests, cas de tests et stratégies de test',
      'Automatisation de tests E2E avec Playwright / TypeScript',
      'Introduction aux pratiques CI/CD et aux outils de gestion de la qualité',
    ],
    tags: ['test logiciel', 'Playwright', 'TypeScript', 'CI/CD', 'qualité logicielle'],
  },
  {
    id: 'istqb',
    start: '2025',
    category: 'certification',
    title: 'ISTQB Certified Tester Foundation Level (CTFL) v4',
    org: 'ISTQB',
    punchline:
      'Certification internationale validant les fondamentaux du test logiciel selon le référentiel CTFL v4.',
    bullets: [
      'Cycle de vie du test, niveaux et types de tests, techniques de conception',
      "Gestion des tests, outils et amélioration continue de la qualité",
    ],
    tags: ['ISTQB', 'certification', 'test logiciel', 'CTFL'],
  },
  {
    id: 'stage-ucaya',
    start: '2025',
    category: 'experience',
    title: 'Stage — Testeuse logicielle (2 mois)',
    org: 'UCAYA',
    place: 'Nantes',
    punchline:
      "Premier contact en entreprise : mise en place d'un framework de test et automatisation sur projet client réel.",
    bullets: [
      "Rédaction du cahier de tests et mise en place d'un framework de test structuré",
      'Automatisation de tests E2E avec Playwright / TypeScript sur application cliente',
      "Intégration des tests dans la chaîne CI/CD de l'équipe de développement",
    ],
    tags: ['Playwright', 'TypeScript', 'CI/CD', 'test E2E', 'framework de test'],
  },
  {
    id: 'cda-ucaya',
    start: '2025',
    end: '2026',
    category: 'formation',
    title: "Titre Concepteur Développeur d'Applications (CDA, Bac+3)",
    org: 'ENI · UCAYA (alternance)',
    place: 'Nantes',
    punchline:
      'Alternance Bac+3 : développement C#, Java Spring Boot, Angular, Flutter et tests automatisés E2E en CI/CD.',
    bullets: [
      'Développement application UWP en C# / XAML pour un client stratégique',
      'Tests E2E avec Playwright et FlaUI, tests unitaires Vitest / MSTest intégrés en CI',
      'Projets Java Spring Boot, Angular et Flutter — stack full-stack variée',
      'Requêtes SQL Server, initiation à Python et au Machine Learning',
    ],
    tags: ['C#', 'XAML', 'Java', 'Spring Boot', 'Angular', 'Flutter', 'Playwright', 'FlaUI', 'CI/CD', 'SQL Server'],
  },
];

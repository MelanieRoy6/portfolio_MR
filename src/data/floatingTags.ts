export interface FloatingTag {
  label: string;
  x: number;
  y: number;
  size?: 'sm' | 'md' | 'lg';
}

export const floatingTags: FloatingTag[] = [
  // indices 0-5 : visibles aussi sur mobile — restent à droite (safe toutes tailles)
  { label: 'TypeScript',  x: 72, y: 14, size: 'lg' },
  { label: 'Playwright',  x: 80, y: 35, size: 'md' },
  { label: 'C#',          x: 68, y: 54, size: 'md' },
  { label: '.NET',        x: 76, y: 72, size: 'md' },
  { label: 'SQL Server',  x: 66, y: 85, size: 'md' },
  { label: 'Angular',     x: 85, y: 62, size: 'md' },
  // indices 6-14 : desktop uniquement — éparpillés autour du texte
  { label: 'Tests unitaires', x: 12, y:  8, size: 'sm' }, // haut-gauche
  { label: 'Git',             x:  4, y: 42, size: 'sm' }, // gauche
  { label: 'XAML',            x:  7, y: 67, size: 'sm' }, // gauche-bas
  { label: 'UWP',             x: 40, y:  7, size: 'sm' }, // haut-centre
  { label: 'Spring Boot',     x: 25, y: 90, size: 'lg' }, // bas-gauche
  { label: 'Selenium',        x: 73, y: 44, size: 'sm' }, // droite-milieu
  { label: 'E2E',             x: 45, y: 93, size: 'sm' }, // bas-centre
  { label: 'Postman',         x: 24, y:  7, size: 'sm' }, // haut-gauche-centre
  { label: 'Jira',            x: 55, y: 87, size: 'sm' }, // bas-droite-centre
];

export interface FloatingTag {
  label: string;
  x: number;
  y: number;
  size?: 'sm' | 'md' | 'lg';
}

export const floatingTags: FloatingTag[] = [
  // indices 0-5 : visibles aussi sur mobile
  { label: 'TypeScript',  x: 72, y: 14, size: 'lg' },
  { label: 'Playwright',  x: 80, y: 35, size: 'md' },
  { label: 'C#',          x: 68, y: 54, size: 'md' },
  { label: '.NET',        x: 76, y: 72, size: 'md' },
  { label: 'SQL Server',  x: 66, y: 85, size: 'md' },
  { label: 'Angular',     x: 85, y: 62, size: 'md' },
  // indices 6-17 : desktop uniquement
  { label: 'Flutter',     x: 88, y: 10, size: 'sm' },
  { label: 'Vitest',      x: 65, y: 26, size: 'sm' },
  { label: 'Git',         x: 90, y: 46, size: 'sm' },
  { label: 'XAML',        x: 84, y: 78, size: 'sm' },
  { label: 'UWP',         x: 91, y: 24, size: 'sm' },
  { label: 'Spring Boot', x: 78, y: 90, size: 'lg' },
  { label: 'Selenium',    x: 73, y: 44, size: 'sm' },
  { label: 'FlaUI',       x: 63, y: 68, size: 'sm' },
  { label: 'MSTest',      x: 92, y: 36, size: 'sm' },
  { label: 'Postman',     x: 62, y: 18, size: 'sm' },
  { label: 'Jira',        x: 70, y: 96, size: 'sm' },
  { label: 'Squash TM',   x: 90, y: 93, size: 'sm' },
];

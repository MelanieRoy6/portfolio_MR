export type TimelineCategory = 'formation' | 'experience' | 'certification' | 'engagement';

export interface TimelineEntry {
  id: string;
  start: string;
  end?: string;
  category: TimelineCategory;
  title: string;
  org: string;
  place?: string;
  punchline: string;
  bullets: string[];
  tags: string[];
}

export interface Profile {
  name: string;
  headline: string;
  pitch: string;
  location: string;
  linkedin: string;
  github: string;
  emailUser: string;
  emailDomain: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export type Lang = 'fr' | 'en';

export const i18n: Record<Lang, Record<string, string>> = {
  fr: {
    'nav.parcours':       'Parcours',
    'nav.competences':    'Compétences',
    'nav.contact':        'Contact',
    'hero.location':      'Nantes et alentours',
    'hero.headline':      'Développeuse & QA Automation',
    'hero.pitch':         "Reconversion du médico-social vers le numérique, avec une première expérience solide en test logiciel et développement. Je recherche un poste de développeuse junior, ouverte également à l'automatisation de tests.",
    'hero.cta':           'Découvrir mon parcours',
    'timeline.title':     'Parcours',
    'timeline.subtitle':  'Du médico-social au développement, une reconversion en quatre actes.',
    'skills.title':       'Compétences',
    'contact.intro':      "Disponible à <strong>Nantes et alentours</strong>, ouverte aux opportunités de développement junior et d'automatisation de tests.",
    'footer.location':    'Nantes et alentours',
  },
  en: {
    'nav.parcours':       'Experience',
    'nav.competences':    'Skills',
    'nav.contact':        'Contact',
    'hero.location':      'Nantes area, France',
    'hero.headline':      'Developer & QA Automation',
    'hero.pitch':         'Career change from healthcare to tech, with solid first experience in software testing and development. Looking for a junior developer position, also open to test automation roles.',
    'hero.cta':           'Discover my journey',
    'timeline.title':     'Experience',
    'timeline.subtitle':  'From healthcare to development, a four-act career change.',
    'skills.title':       'Skills',
    'contact.intro':      'Based in <strong>Nantes area, France</strong>, open to junior development and test automation opportunities.',
    'footer.location':    'Nantes area, France',
  },
};

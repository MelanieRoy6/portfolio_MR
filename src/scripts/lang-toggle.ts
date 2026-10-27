import { i18n, type Lang } from '../i18n/translations';

const STORAGE_KEY = 'portfolio-lang';

function getLang(): Lang {
  return (localStorage.getItem(STORAGE_KEY) as Lang) ?? 'fr';
}

function applyLang(lang: Lang): void {
  const t = i18n[lang];

  document.documentElement.lang = lang;

  // Plain text elements
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Elements that contain HTML markup (e.g. <strong>)
  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml!;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Timeline items
  document.querySelectorAll<HTMLElement>('[data-timeline-id]').forEach((article) => {
    const d = article.dataset;
    const title      = lang === 'en' ? d.enTitle     : d.frTitle;
    const punchline  = lang === 'en' ? d.enPunchline  : d.frPunchline;
    const bulletsRaw = lang === 'en' ? d.enBullets    : d.frBullets;
    const tagsRaw    = lang === 'en' ? d.enTags       : d.frTags;

    const titleEl     = article.querySelector('.timeline-item__title');
    const punchlineEl = article.querySelector('.timeline-item__punchline');
    const bulletsEl   = article.querySelector('.timeline-item__bullets');
    const tagsEl      = article.querySelector('.timeline-item__tags');

    if (title     && titleEl)     titleEl.textContent = title;
    if (punchline && punchlineEl) punchlineEl.textContent = punchline;
    if (bulletsRaw && bulletsEl) {
      const bullets = JSON.parse(bulletsRaw) as string[];
      bulletsEl.innerHTML = bullets.map((b) => `<li>${b}</li>`).join('');
    }
    if (tagsRaw && tagsEl) {
      const tags = JSON.parse(tagsRaw) as string[];
      tagsEl.innerHTML = tags.map((tag) => `<li class="tag">${tag}</li>`).join('');
    }
  });

  // Skills groups
  document.querySelectorAll<HTMLElement>('[data-skill-group]').forEach((group) => {
    const d = group.dataset;
    const label    = lang === 'en' ? d.enLabel : d.frLabel;
    const itemsRaw = lang === 'en' ? d.enItems : d.frItems;

    const labelEl = group.querySelector('.skills__group-label');
    const itemsEl = group.querySelector('.skills__items');

    if (label    && labelEl)  labelEl.textContent = label;
    if (itemsRaw && itemsEl) {
      const items = JSON.parse(itemsRaw) as string[];
      itemsEl.innerHTML = items.map((item) => `<li class="tag">${item}</li>`).join('');
    }
  });

  // Toggle button label
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.textContent = lang === 'fr' ? 'EN' : 'FR';
    btn.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
  }
}

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const next: Lang = getLang() === 'fr' ? 'en' : 'fr';
  localStorage.setItem(STORAGE_KEY, next);
  applyLang(next);
});

applyLang(getLang());

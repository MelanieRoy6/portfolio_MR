import { i18n, type Lang } from '../i18n/translations';

const buttons = document.querySelectorAll<HTMLButtonElement>('.projects__filter');
const cards = document.querySelectorAll<HTMLElement>('.project-card');
const status = document.getElementById('projects-status');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter ?? 'all';
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    let shown = 0;
    cards.forEach((card) => {
      const match = f === 'all' || (card.dataset.categories ?? '').split(' ').includes(f);
      card.hidden = !match;
      if (match) shown++;
    });
    if (status) {
      const lang = (document.documentElement.lang === 'en' ? 'en' : 'fr') as Lang;
      status.textContent = `${shown} ${i18n[lang]['projects.count']}`;
    }
  });
});

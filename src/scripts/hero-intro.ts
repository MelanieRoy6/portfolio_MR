import { i18n, type Lang } from '../i18n/translations';

const INTRO_DURATION_MS = 8600;

function currentLang(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'fr';
}

function initHeroIntro(): void {
  const hero = document.querySelector<HTMLElement>('.hero');
  const btn = document.querySelector<HTMLButtonElement>('#hero-intro-btn');
  if (!hero || !btn) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = 0;

  function setLabel(key: 'hero.intro.skip' | 'hero.intro.replay'): void {
    if (!btn) return;
    btn.dataset.i18n = key; // le bouton FR/EN met à jour le texte via data-i18n
    btn.textContent = i18n[currentLang()][key] ?? btn.textContent;
  }

  function finish(): void {
    window.clearTimeout(timer);
    hero?.classList.remove('play');
    void hero?.offsetHeight; // force reflow — évite le glitch visuel sur mobile
    setLabel('hero.intro.replay');
  }

  function play(): void {
    window.clearTimeout(timer);
    hero?.classList.remove('play');
    // Force un reflow pour relancer les animations CSS depuis le début
    void hero?.offsetWidth;
    hero?.classList.add('play');
    setLabel('hero.intro.skip');
    timer = window.setTimeout(finish, INTRO_DURATION_MS);
  }

  btn.addEventListener('click', () => {
    if (hero.classList.contains('play')) finish();
    else play();
  });

  if (reducedMotion) {
    finish();
    return;
  }
  timer = window.setTimeout(finish, INTRO_DURATION_MS);
}

initHeroIntro();

/**
 * Navigation : menu mobile (burger) + soulignement animé de la section active.
 */
const toggle = document.querySelector<HTMLButtonElement>('.nav__toggle');
const menu = document.getElementById('nav-menu');
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav__link'));

function setOpen(open: boolean): void {
  if (!toggle || !menu) return;
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

toggle?.addEventListener('click', () => {
  setOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

links.forEach((link) => link.addEventListener('click', () => setOpen(false)));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setOpen(false);
    toggle.focus();
  }
});

// Section active (scroll-spy) — IntersectionObserver, sans écouteur de scroll
const targets = links
  .map((link) => document.getElementById(link.getAttribute('href')?.slice(1) ?? ''))
  .filter((el): el is HTMLElement => el !== null);

function setActive(id: string): void {
  links.forEach((link) => {
    if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

if ('IntersectionObserver' in window && targets.length) {
  const visible = new Map<string, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
        else visible.delete(entry.target.id);
      });
      // La section la plus visible l'emporte ; l'ordre du DOM départage.
      let best = '';
      let bestRatio = 0;
      targets.forEach((t) => {
        const r = visible.get(t.id) ?? 0;
        if (r > bestRatio) { best = t.id; bestRatio = r; }
      });
      if (best) setActive(best);
    },
    { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
  );
  targets.forEach((t) => observer.observe(t));
}
setActive('accueil');

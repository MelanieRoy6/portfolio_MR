import { createNetworkController } from './hero-network';

function initHeroAnimation(): void {
  const hero = document.querySelector<HTMLElement>('.hero');
  const canvas = document.querySelector<HTMLCanvasElement>('#hero-network-canvas');
  if (!hero || !canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const maybeNetwork = createNetworkController(canvas);
  if (!maybeNetwork) return;
  const network = maybeNetwork;

  if (reducedMotion) {
    network.tick(-9999, -9999);
    return;
  }

  let mouseX = -9999;
  let mouseY = -9999;
  let rafId = 0;
  let isVisible = false;

  function loop(): void {
    if (!isVisible) { rafId = 0; return; }
    network.tick(mouseX, mouseY);
    rafId = requestAnimationFrame(loop);
  }

  function startLoop(): void {
    if (!rafId && isVisible) rafId = requestAnimationFrame(loop);
  }

  hero.addEventListener('pointermove', (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  hero.addEventListener('pointerleave', () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  new IntersectionObserver(
    (entries) => {
      isVisible = entries[0]?.isIntersecting ?? false;
      if (!isVisible && rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      else if (isVisible) startLoop();
    },
    { threshold: 0.1 },
  ).observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } }
    else if (isVisible) startLoop();
  });

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      network.resize();
      if (isVisible) startLoop();
    }, 150);
  });
}

initHeroAnimation();

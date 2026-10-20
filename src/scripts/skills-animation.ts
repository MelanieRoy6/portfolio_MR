import { createNetworkController } from './hero-network';
import { createFloatingTagsController } from './floating-tags';

function initSkillsAnimation(): void {
  const section = document.querySelector<HTMLElement>('.skills');
  const canvas = document.querySelector<HTMLCanvasElement>('#skills-network-canvas');
  if (!section || !canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  const maybeNetwork = createNetworkController(canvas);
  if (!maybeNetwork) return;
  const network = maybeNetwork;

  if (reducedMotion) {
    network.tick(-9999, -9999);
    return;
  }

  const tags = isTouch ? null : createFloatingTagsController(section);

  let mouseX = -9999;
  let mouseY = -9999;
  let rafId = 0;
  let isVisible = false;

  function loop(): void {
    if (!isVisible) { rafId = 0; return; }
    network.tick(mouseX, mouseY);
    tags?.tick(mouseX, mouseY);
    rafId = requestAnimationFrame(loop);
  }

  function startLoop(): void {
    if (!rafId && isVisible) rafId = requestAnimationFrame(loop);
  }

  section.addEventListener('pointermove', (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  section.addEventListener('pointerleave', () => {
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
  ).observe(section);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } }
    else if (isVisible) startLoop();
  });

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      network.resize();
      tags?.measureHomes();
      if (isVisible) startLoop();
    }, 150);
  });
}

initSkillsAnimation();

const RADIUS = 160;
const REPEL = 1.2;
const SPRING = 0.02;
const DAMPING = 0.88;
const MAX_OFFSET = 120;

interface TagState {
  el: HTMLElement;
  sizeMultiplier: number;
  homeX: number;
  homeY: number;
  offsetX: number;
  offsetY: number;
  velX: number;
  velY: number;
}

export interface FloatingTagsController {
  measureHomes: () => void;
  tick: (mouseX: number, mouseY: number) => boolean;
}

export function createFloatingTagsController(heroEl: HTMLElement): FloatingTagsController | null {
  const tagEls = Array.from(document.querySelectorAll<HTMLElement>('.ftag'));
  if (tagEls.length === 0) return null;

  let states: TagState[] = [];
  let heroBounds = { top: 0, left: 0 };

  function measureHomes(): void {
    for (const s of states) {
      s.el.style.transform = 'translate3d(0, 0, 0)';
    }
    const heroRect = heroEl.getBoundingClientRect();
    heroBounds = {
      top: heroRect.top + window.scrollY,
      left: heroRect.left + window.scrollX,
    };
    states = tagEls.map((el) => {
      const rect = el.getBoundingClientRect();
      const size = el.dataset.size ?? 'md';
      return {
        el,
        sizeMultiplier: size === 'sm' ? 0.6 : size === 'lg' ? 1.2 : 1.0,
        homeX: rect.left + rect.width / 2 - heroRect.left,
        homeY: rect.top + rect.height / 2 - heroRect.top,
        offsetX: 0,
        offsetY: 0,
        velX: 0,
        velY: 0,
      };
    });
  }

  function tick(mouseX: number, mouseY: number): boolean {
    const heroTop = heroBounds.top - window.scrollY;
    const heroLeft = heroBounds.left - window.scrollX;
    let atRest = true;

    for (const s of states) {
      const cx = heroLeft + s.homeX + s.offsetX;
      const cy = heroTop + s.homeY + s.offsetY;
      const dx = cx - mouseX;
      const dy = cy - mouseY;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < RADIUS && d > 0) {
        const force = REPEL * s.sizeMultiplier * (1 - d / RADIUS);
        s.velX += (dx / d) * force;
        s.velY += (dy / d) * force;
      }

      s.velX -= s.offsetX * SPRING;
      s.velY -= s.offsetY * SPRING;
      s.velX *= DAMPING;
      s.velY *= DAMPING;
      s.offsetX += s.velX;
      s.offsetY += s.velY;

      const mag = Math.sqrt(s.offsetX * s.offsetX + s.offsetY * s.offsetY);
      if (mag > MAX_OFFSET) {
        const scale = MAX_OFFSET / mag;
        s.offsetX *= scale;
        s.offsetY *= scale;
      }

      s.el.style.transform = `translate3d(${s.offsetX}px, ${s.offsetY}px, 0)`;

      if (
        Math.abs(s.offsetX) >= 0.15 ||
        Math.abs(s.offsetY) >= 0.15 ||
        Math.abs(s.velX) >= 0.15 ||
        Math.abs(s.velY) >= 0.15
      ) {
        atRest = false;
      }
    }

    return atRest;
  }

  measureHomes();

  return { measureHomes, tick };
}

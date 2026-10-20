const COUNT_DESKTOP = 85;
const COUNT_MOBILE = 35;
const LINK_DISTANCE = 150;
const REPULSE_RADIUS = 200;
const SPEED = 0.6;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  ox: number;
  oy: number;
  ovx: number;
  ovy: number;
}

export interface NetworkController {
  resize: () => void;
  tick: (mouseX: number, mouseY: number) => void;
}

export function createNetworkController(canvas: HTMLCanvasElement): NetworkController | null {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return null;
  const ctx: CanvasRenderingContext2D = maybeCtx;

  let particles: Particle[] = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let canvasLeft = 0;
  let canvasTop = 0;

  function initParticles(): void {
    const count = width < 640 ? COUNT_MOBILE : COUNT_DESKTOP;
    particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = SPEED * (0.5 + Math.random() * 0.5);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1 + Math.random() * 2,
        ox: 0,
        oy: 0,
        ovx: 0,
        ovy: 0,
      };
    });
  }

  function resize(): void {
    const parent = canvas.parentElement ?? canvas;
    const rect = parent.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    width = rect.width;
    height = rect.height;
    canvasLeft = rect.left;
    canvasTop = rect.top;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function tick(mouseX: number, mouseY: number): void {
    if (width === 0 || height === 0) return;

    ctx.clearRect(0, 0, width, height);

    const mx = mouseX - canvasLeft;
    const my = mouseY - canvasTop;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const mouseActive = mouseX > -9000 && !isTouch;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x += width;
      if (p.x > width) p.x -= width;
      if (p.y < 0) p.y += height;
      if (p.y > height) p.y -= height;

      if (mouseActive) {
        const dx = p.x + p.ox - mx;
        const dy = p.y + p.oy - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < REPULSE_RADIUS && d > 0) {
          const force = 0.8 * (1 - d / REPULSE_RADIUS);
          p.ovx += (dx / d) * force;
          p.ovy += (dy / d) * force;
        }
      }
      p.ovx -= p.ox * 0.02;
      p.ovy -= p.oy * 0.02;
      p.ovx *= 0.88;
      p.ovy *= 0.88;
      p.ox += p.ovx;
      p.oy += p.ovy;
    }

    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      const px = pi.x + pi.ox;
      const py = pi.y + pi.oy;
      for (let j = i + 1; j < particles.length; j++) {
        const pj = particles[j];
        const dx = px - (pj.x + pj.ox);
        const dy = py - (pj.y + pj.oy);
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DISTANCE) {
          const alpha = (1 - d / LINK_DISTANCE) * 0.4;
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(pj.x + pj.ox, pj.y + pj.oy);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x + p.ox, p.y + p.oy, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resize();

  return { resize, tick };
}

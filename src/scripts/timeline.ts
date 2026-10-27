import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHASE_LABELS: Record<string, string> = {
  medical:    'Médico-social',
  entreprise: 'Engagement',
  test:       'Test logiciel',
  dev:        'Développement',
};

export function initTimeline(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Lire les couleurs depuis tokens.css pour rester synchronisé
  const rootStyle = getComputedStyle(document.documentElement);
  const PHASE_COLORS: Record<string, string> = {
    medical:    rootStyle.getPropertyValue('--phase-medical').trim(),
    entreprise: rootStyle.getPropertyValue('--phase-entreprise').trim(),
    test:       rootStyle.getPropertyValue('--phase-test').trim(),
    dev:        rootStyle.getPropertyValue('--phase-dev').trim(),
  };

  const section  = document.querySelector<HTMLElement>('.timeline');
  const stage    = document.querySelector<HTMLElement>('.timeline__stage');
  const inner    = document.querySelector<HTMLElement>('.timeline__inner');
  const svgEl    = document.querySelector<SVGSVGElement>('.timeline__svg');
  const svgTrack = document.querySelector<SVGPathElement>('.timeline__svg-track');
  const svgProg  = document.querySelector<SVGPathElement>('.timeline__svg-progress');
  const cursor   = document.querySelector<HTMLElement>('.timeline__cursor');
  const yearBg   = document.querySelector<HTMLElement>('.timeline__year-bg');
  const phaseLabel = document.querySelector<HTMLElement>('.timeline__phase-label');
  const items    = Array.from(document.querySelectorAll<HTMLElement>('.timeline__inner .timeline-item'));

  if (!section || !stage || !inner || !svgEl || !svgTrack || !svgProg ||
      !cursor || !yearBg || !phaseLabel || items.length === 0) return;

  const NAV_H  = 64;
  const STEP_VH = 80; // vh of scroll per item

  // ── Layout setup ──────────────────────────────────────────────────────────
  const stageH = window.innerHeight - NAV_H;

  stage.style.height = `${stageH}px`;

  // SVG paths span the full stage height
  const svgPathD = `M 2 0 L 2 ${stageH}`;
  svgTrack.setAttribute('d', svgPathD);
  svgProg.setAttribute('d', svgPathD);

  // Stroke-dashoffset trick: starts fully hidden, fills as animation progresses
  gsap.set(svgProg, { strokeDasharray: stageH, strokeDashoffset: stageH });

  // Enable animated layout (items become position:absolute, stacked)
  section.classList.add('timeline--js');

  // ── GSAP timeline (scrubbed by ScrollTrigger) ─────────────────────────────
  const n  = items.length;
  const tl = gsap.timeline({ paused: true });

  // SVG line draws from top to bottom over the entire scroll
  tl.to(svgProg, { strokeDashoffset: 0, ease: 'none', duration: n }, 0);

  // Cursor travels from 5% to 90% of stage height
  const cursorStart = stageH * 0.08;
  const cursorEnd   = stageH * 0.88;
  gsap.set(cursor, { y: cursorStart });
  tl.to(cursor, { y: cursorEnd, ease: 'none', duration: n }, 0);

  // Each item: slide in from its side, stay visible, slide out before next
  items.forEach((item, i) => {
    const isLeft  = item.classList.contains('timeline-item--left');
    const enterX  = isLeft ? 120 : -120;
    const exitX   = -enterX;

    if (i === 0) {
      // First item: visible immediately at t=0
      tl.fromTo(item,
        { opacity: 0, x: enterX, immediateRender: false },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        0
      );
    } else {
      // Subsequent items enter just before their index
      tl.fromTo(item,
        { opacity: 0, x: enterX, immediateRender: false },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
        i - 0.35
      );
    }

    // All items except the last one exit
    if (i < n - 1) {
      tl.to(item,
        { opacity: 0, x: exitX, duration: 0.35, ease: 'power2.in' },
        i + 0.65
      );
    }
  });

  // ── ScrollTrigger ─────────────────────────────────────────────────────────
  const scrollLength = n * (STEP_VH / 100) * window.innerHeight;

  ScrollTrigger.create({
    trigger:      stage,
    start:        `top ${NAV_H}px`,
    end:          `+=${scrollLength}`,
    pin:          true,
    anticipatePin: 1,
    scrub:        1.5,
    animation:    tl,
    onUpdate(self) {
      // Derive which item is currently "active"
      const rawIdx = self.progress * n;
      const idx    = Math.min(Math.floor(rawIdx), n - 1);
      const item   = items[idx];

      // Update large year in background
      const year = item.querySelector('time')?.textContent ?? '';
      if (yearBg.textContent !== year) yearBg.textContent = year;

      // Update phase label + accent colour
      const phase = item.dataset.phase ?? 'medical';
      const label = PHASE_LABELS[phase] ?? '';
      if (phaseLabel.textContent !== label) phaseLabel.textContent = label;

      const color = PHASE_COLORS[phase] ?? PHASE_COLORS['medical'];
      document.documentElement.style.setProperty('--color-accent', color);
    },
    onLeave() {
      document.documentElement.style.removeProperty('--color-accent');
    },
    onLeaveBack() {
      document.documentElement.style.removeProperty('--color-accent');
    },
  });

  // Recalculate after web fonts are ready
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  // Recalculate on resize
  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  }, { passive: true });
}

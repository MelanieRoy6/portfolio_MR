document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('.carousel__track');
  const cur = root.querySelector<HTMLElement>('[data-current]');
  if (!track) return;
  const slides = track.children.length;
  const index = () => Math.round(track.scrollLeft / track.clientWidth);

  root.querySelectorAll<HTMLButtonElement>('.carousel__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = (index() + Number(btn.dataset.dir) + slides) % slides;
      track.scrollTo({ left: next * track.clientWidth });
    });
  });
  track.addEventListener('scroll', () => { if (cur) cur.textContent = String(index() + 1); }, { passive: true });
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: track.clientWidth }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -track.clientWidth }); }
  });
});

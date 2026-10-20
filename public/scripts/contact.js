const btn = document.getElementById('contact-email');
if (btn) {
  const u = btn.dataset.u;
  const d = btn.dataset.d;
  if (u && d) {
    btn.href = `mailto:${u}@${d}`;
    btn.removeAttribute('target');
    btn.removeAttribute('rel');
  }
}

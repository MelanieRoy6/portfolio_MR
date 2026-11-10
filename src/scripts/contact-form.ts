import { i18n, type Lang } from '../i18n/translations';

const form = document.getElementById('contact-form') as HTMLFormElement | null;
const status = document.getElementById('cf-status');
const mailLink = document.getElementById('contact-email') as HTMLAnchorElement | null;

const t = (k: string) => i18n[(document.documentElement.lang === 'en' ? 'en' : 'fr') as Lang][k];

function setErr(id: string, input: HTMLElement, msg: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
  if (msg) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements.namedItem('name') as HTMLInputElement;
  const email = form.elements.namedItem('email') as HTMLInputElement;
  const msg = form.elements.namedItem('message') as HTMLTextAreaElement;
  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  setErr('cf-name-err', name, name.value.trim() ? '' : t('contact.err.name'));
  setErr('cf-email-err', email, okEmail ? '' : t('contact.err.email'));
  setErr('cf-msg-err', msg, msg.value.trim() ? '' : t('contact.err.message'));
  if (status) { status.textContent = ''; status.removeAttribute('data-state'); }
  if (!name.value.trim() || !okEmail || !msg.value.trim()) {
    (form.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
    return;
  }

  const u = mailLink?.dataset.u;
  const d = mailLink?.dataset.d;
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  if (!u || !d) {
    if (status) { status.dataset.state = 'error'; status.textContent = t('contact.state.error'); }
    return;
  }
  btn.disabled = true;
  if (status) status.textContent = t('contact.state.loading');
  const subject = encodeURIComponent(`${t('contact.subject')} ${name.value.trim()}`);
  const body = encodeURIComponent(`${msg.value.trim()}\n\n${name.value.trim()} <${email.value.trim()}>`);
  window.setTimeout(() => {
    window.location.href = `mailto:${u}@${d}?subject=${subject}&body=${body}`;
    btn.disabled = false;
    if (status) status.textContent = t('contact.state.success');
  }, 400);
});

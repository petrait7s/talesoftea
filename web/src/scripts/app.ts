// Shared client code: language, cart, toast, badge, service worker.
import './fx';
export type Item = { id: number; wi: number; q: number };
type Tea = { id: number; base: number; n: { bn: string; en: string }; c: [string, string] };
type Data = { teas: Tea[]; weights: { g: number; k: number; l: string }[]; delivery: number; api: string };

export const data: Data = JSON.parse(document.getElementById('tot-data')!.textContent || '{}');
const CART_KEY = 'tot_cart';

export const tea = (id: number) => data.teas.find((t) => t.id === id)!;
export const price = (id: number, wi: number) => Math.round((tea(id).base * data.weights[wi].k) / 10) * 10;
export const tk = (n: number) => '৳' + n;

export function getCart(): Item[] {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as Item[];
    return raw.filter((c) => data.teas.some((t) => t.id === c.id) && data.weights[c.wi] && c.q > 0);
  } catch {
    return [];
  }
}
export function setCart(c: Item[]) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch {}
  badge();
}
export function totals(c = getCart()) {
  const sub = c.reduce((a, i) => a + price(i.id, i.wi) * i.q, 0);
  const del = c.length ? data.delivery : 0;
  return { sub, del, tot: sub + del };
}
export function addToCart(id: number, wi: number, q: number, from?: HTMLElement) {
  const c = getCart();
  const e = c.find((i) => i.id === id && i.wi === wi);
  if (e) e.q = Math.min(50, e.q + q);
  else c.push({ id, wi, q });
  setCart(c);
  toast('added');
  if (from) fly(from, tea(id).c);
}
/** A small tea pouch flies from the button to the cart icon. */
export function fly(from: HTMLElement, c: [string, string]) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cb = document.querySelector<HTMLElement>('.cartbtn');
  const target = cb && cb.offsetParent ? cb : document.querySelector<HTMLElement>('.tabs a[href="/cart/"]');
  if (!target) return;
  const a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'fly';
  el.style.background = `linear-gradient(160deg, ${c[1]}, ${c[0]})`;
  const x0 = a.left + a.width / 2 - 15, y0 = a.top + a.height / 2 - 19;
  el.style.left = x0 + 'px'; el.style.top = y0 + 'px';
  document.body.appendChild(el);
  const dx = b.left + b.width / 2 - 15 - x0, dy = b.top + b.height / 2 - 19 - y0;
  el.animate([
    { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
    { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 90}px) scale(.85) rotate(-14deg)`, opacity: 1, offset: 0.55 },
    { transform: `translate(${dx}px, ${dy}px) scale(.25) rotate(10deg)`, opacity: 0.4 },
  ], { duration: 700, easing: 'cubic-bezier(.5,0,.8,.6)' }).finished.then(() => {
    el.remove();
    target.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 320 });
  }).catch(() => el.remove());
}

export function badge() {
  const n = getCart().reduce((a, i) => a + i.q, 0);
  document.querySelectorAll<HTMLElement>('[data-badge]').forEach((b) => {
    b.textContent = String(n);
    b.style.display = n ? 'grid' : 'none';
  });
}
const MSG: Record<string, { bn: string; en: string }> = {
  added: { bn: 'কার্টে দেওয়া হয়েছে', en: 'Added to cart' },
  sent: { bn: 'বার্তা পাঠানো হয়েছে (ডেমো)', en: 'Message sent (demo)' },
  bad_phone: { bn: 'ফোন নম্বর ঠিক নয় (01XXXXXXXXX)', en: 'Phone number is not valid (01XXXXXXXXX)' },
  bad_trx: { bn: 'TrxID ও সেন্ডার নম্বর দিন', en: 'Enter TrxID and sender number' },
  tea_ready: { bn: 'চা তৈরি! এবার পরিবেশন করুন', en: 'Your tea is ready!' },
  net: { bn: 'অর্ডার যায়নি, আবার চেষ্টা করুন', en: 'Order failed, please try again' },
};
export function lang() { return document.documentElement.lang === 'en' ? 'en' : 'bn'; }
export function toast(key: string) {
  const el = document.getElementById('toast')!;
  el.textContent = (MSG[key] || { bn: key, en: key })[lang()];
  el.classList.add('show');
  clearTimeout((el as any)._t);
  (el as any)._t = setTimeout(() => el.classList.remove('show'), 2000);
}
/** 01XXXXXXXXX from +8801…, 8801…, 01… (spaces and dashes ignored). Null if invalid. */
export function normalizePhone(raw: string): string | null {
  let p = raw.replace(/[^\d+]/g, '');
  if (p.startsWith('+880')) p = '0' + p.slice(4);
  else if (p.startsWith('880')) p = '0' + p.slice(3);
  return /^01[3-9]\d{8}$/.test(p) ? p : null;
}

document.getElementById('langBtn')?.addEventListener('click', () => {
  const next = lang() === 'bn' ? 'en' : 'bn';
  document.documentElement.lang = next;
  try { localStorage.setItem('tot_lang', next); } catch {}
  window.dispatchEvent(new Event('langchange'));
});
// quick add buttons on cards
document.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-quick]');
  if (b) { e.preventDefault(); addToCart(Number(b.dataset.quick), 1, 1, b); }
});
badge();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Interaction polish: scroll reveal, hero background parallax and slideshow.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && 'IntersectionObserver' in window) {
  const els = [...document.querySelectorAll<HTMLElement>('main .card, main .feat, main .step, main .it, main .sec h2, main .eyebrow, main .tile, main .panel, main .faq details, main .sbanner, main .pdp > *')];
  const io = new IntersectionObserver((es) => {
    es.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      el.classList.add('in'); io.unobserve(el);
      setTimeout(() => { el.classList.remove('rv', 'in'); el.style.transitionDelay = ''; }, 1100);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  els.forEach((el) => {
    const i = [...(el.parentElement?.children || [])].indexOf(el);
    el.style.transitionDelay = Math.min(i, 7) * 70 + 'ms';
    el.classList.add('rv'); io.observe(el);
  });
}

const hero = document.getElementById('hero');
if (hero) {
  const bgw = hero.querySelector<HTMLElement>('.hero-bgwrap');
  if (bgw && !reduce && matchMedia('(pointer:fine)').matches) {
    let raf = 0, px = 0, py = 0;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5; py = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; bgw.style.transform = `translate3d(${(-px * 22).toFixed(1)}px, ${(-py * 14).toFixed(1)}px, 0)`; });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { bgw.style.transform = ''; });
  }
  const slides = [...hero.querySelectorAll<HTMLElement>('.slide')];
  const dots = [...hero.querySelectorAll<HTMLElement>('[data-slide]')];
  if (slides.length > 1) {
    const HOLD = 4000, FADE = 1900;
    let cur = 0, timer = 0, seen = true, busy = false, outTimer = 0;
    const go = (n: number) => {
      const prev = slides[cur];
      cur = (n + slides.length) % slides.length;
      if (slides[cur] === prev) return;
      slides.forEach((s) => { if (s !== prev && s !== slides[cur]) s.classList.remove('out', 'on'); });
      prev.classList.remove('on'); prev.classList.add('out');
      slides[cur].classList.remove('out'); slides[cur].classList.add('on');
      dots.forEach((d, i) => d.classList.toggle('on', i === cur));
      clearTimeout(outTimer);
      outTimer = window.setTimeout(() => prev.classList.remove('out'), FADE);
    };
    // Only switch once the next photo is fully decoded, so it never pops in half-loaded.
    const goReady = (n: number) => {
      if (busy) return;
      busy = true;
      const img = slides[(n + slides.length) % slides.length].querySelector('img');
      Promise.resolve(img?.decode?.()).catch(() => {}).then(() => { go(n); busy = false; });
    };
    const start = () => { clearInterval(timer); if (!reduce) timer = window.setInterval(() => { if (seen && !document.hidden) goReady(cur + 1); }, HOLD); };
    dots.forEach((d) => d.addEventListener('click', () => { goReady(Number(d.dataset.slide)); start(); }));
    // swipe the hero left or right on touch screens
    let sx = 0;
    hero.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) { goReady(cur + (dx < 0 ? 1 : -1)); start(); }
    });
    new IntersectionObserver((e) => { seen = e[0].isIntersecting; }).observe(hero);
    start();
  }
}

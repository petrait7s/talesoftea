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
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      bgw.style.transform = `translate3d(${(-x * 22).toFixed(1)}px, ${(-y * 14).toFixed(1)}px, 0)`;
    });
    hero.addEventListener('pointerleave', () => { bgw.style.transform = ''; });
  }
  const slides = [...hero.querySelectorAll<HTMLElement>('.slide')];
  const dots = [...hero.querySelectorAll<HTMLElement>('[data-slide]')];
  if (slides.length > 1) {
    let cur = 0, timer = 0, seen = true;
    const go = (n: number) => {
      slides[cur].classList.remove('on'); dots[cur]?.classList.remove('on');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('on'); dots[cur]?.classList.add('on');
    };
    const start = () => { clearInterval(timer); if (!reduce) timer = window.setInterval(() => { if (seen && !document.hidden) go(cur + 1); }, 2000); };
    dots.forEach((d) => d.addEventListener('click', () => { go(Number(d.dataset.slide)); start(); }));
    new IntersectionObserver((e) => { seen = e[0].isIntersecting; }).observe(hero);
    start();
  }
}

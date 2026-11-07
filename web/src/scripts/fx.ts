// Interaction polish: glass spotlight, scroll reveal, hero tilt and steam.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('pointermove', (e) => {
  const g = (e.target as HTMLElement).closest?.('.glass') as HTMLElement | null;
  if (!g) return;
  const r = g.getBoundingClientRect();
  g.style.setProperty('--mx', e.clientX - r.left + 'px');
  g.style.setProperty('--my', e.clientY - r.top + 'px');
}, { passive: true });

if (!reduce && 'IntersectionObserver' in window) {
  const els = [...document.querySelectorAll<HTMLElement>('main .card, main .feat, main .step, main .it, main .sec h2, main .eyebrow, main .tile, main .panel, main .band, main .faq details, main .sbanner, main .pdp > *')];
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
  const tilt = hero.querySelector<HTMLElement>('.tilt');
  if (tilt && !reduce && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      tilt.style.transform = `rotateX(${((0.5 - y) * 9).toFixed(2)}deg) rotateY(${((x - 0.5) * 12).toFixed(2)}deg)`;
    });
    hero.addEventListener('pointerleave', () => { tilt.style.transform = ''; });
  }
  const cv = document.getElementById('steam') as HTMLCanvasElement | null;
  const cup = hero.querySelector<HTMLElement>('.cupwrap');
  if (cv && cup) startSteam(cv, cup);
}

function startSteam(cv: HTMLCanvasElement, cup: HTMLElement) {
  const ctx = cv.getContext('2d')!;
  const spr = document.createElement('canvas'); spr.width = spr.height = 64;
  const sc = spr.getContext('2d')!;
  const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.4, 'rgba(255,255,255,.4)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  sc.fillStyle = g; sc.fillRect(0, 0, 64, 64);

  let W = 0, H = 0, ex = 0, ey = 0, ew = 0, dpr = 1;
  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ex = cup.offsetLeft + cup.offsetWidth / 2; ey = cup.offsetTop + cup.offsetHeight * 0.4; ew = cup.offsetWidth * 0.16;
  };
  size(); addEventListener('resize', size);

  type P = { x: number; y: number; age: number; life: number; sz: number; vy: number; ph: number; sw: number };
  let ps: P[] = [], acc = 0, last = performance.now(), visible = true;
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(cv);
  const scale = cup.offsetWidth / 300;

  const frame = (now: number) => {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = now; return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    acc += dt * 34;
    while (acc >= 1) { acc--; ps.push({ x: ex + (Math.random() - 0.5) * ew * 2, y: ey, age: 0, life: 3.2 + Math.random() * 1.8, sz: (9 + Math.random() * 8) * scale, vy: (34 + Math.random() * 26) * scale, ph: Math.random() * 6.28, sw: (10 + Math.random() * 16) * scale }); }
    ctx.clearRect(0, 0, W, H);
    const t = now / 1000;
    ps = ps.filter((p) => (p.age += dt) < p.life);
    for (const p of ps) {
      const k = p.age / p.life;
      p.y -= p.vy * dt * (1 - k * 0.35);
      const x = p.x + Math.sin(t * 1.1 + p.ph) * p.sw * k * 1.6;
      const s = p.sz * (1 + k * 4.2);
      ctx.globalAlpha = Math.min(1, p.age * 2.4) * Math.pow(1 - k, 1.6) * 0.2;
      ctx.drawImage(spr, x - s, p.y - s, s * 2, s * 2);
    }
    ctx.globalAlpha = 1;
  };
  requestAnimationFrame(frame);
}

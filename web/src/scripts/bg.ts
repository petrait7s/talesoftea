// Living background: tumbling 3D tea leaves with depth of field and parallax.
const cv = document.getElementById('bg3d') as HTMLCanvasElement | null;
if (cv) {
  const ctx = cv.getContext('2d')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = innerWidth < 760;
  const canBlur = 'filter' in ctx;
  const PAL: [string, string][] = [['#8fd16a', '#4f9a4a'], ['#b9e394', '#6fb85a'], ['#e3b95f', '#b9852b'], ['#f2a93b', '#c98022'], ['#6fc088', '#2f8a52'], ['#d9efb4', '#8fc365']];
  let W = 0, H = 0, dpr = 1;
  const cache = new Map<string, HTMLCanvasElement>();

  function sprite(ci: number, bin: number, back: boolean) {
    const key = `${ci}-${bin}-${back ? 1 : 0}`;
    const hit = cache.get(key); if (hit) return hit;
    const blur = bin === 0 ? 1.4 : bin === 2 ? 7 : 0;
    const S = 160, pad = 24, o = document.createElement('canvas');
    o.width = o.height = S + pad * 2;
    const c = o.getContext('2d')!;
    if (canBlur && blur) c.filter = `blur(${blur}px)`;
    c.translate(o.width / 2, o.height / 2); c.scale(S, S);
    const [a, b] = back ? [PAL[ci][1], PAL[ci][0]] : PAL[ci];
    const L = c.createLinearGradient(-0.4, 0, 0, 0); L.addColorStop(0, a); L.addColorStop(1, shade(a, 0.78));
    const R = c.createLinearGradient(0, 0, 0.4, 0); R.addColorStop(0, b); R.addColorStop(1, shade(b, 0.7));
    c.fillStyle = L; c.beginPath(); c.moveTo(0, 0.5); c.bezierCurveTo(-0.34, 0.25, -0.4, -0.2, 0, -0.5); c.fill();
    c.fillStyle = R; c.beginPath(); c.moveTo(0, -0.5); c.bezierCurveTo(0.4, -0.2, 0.34, 0.25, 0, 0.5); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.38)'; c.lineWidth = 0.012; c.lineCap = 'round';
    c.beginPath(); c.moveTo(0, 0.5); c.lineTo(0, -0.44);
    for (const y of [0.28, 0.1, -0.08, -0.24]) { c.moveTo(0, y); c.lineTo(-0.15, y - 0.14); c.moveTo(0, y); c.lineTo(0.15, y - 0.14); }
    c.stroke();
    cache.set(key, o); return o;
  }
  function shade(h: string, k: number) { const n = [1, 3, 5].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * k)); return `rgb(${n})`; }

  type Leaf = { x: number; y: number; z: number; sz: number; rz: number; vrz: number; rx: number; vrx: number; vy: number; sw: number; sp: number; ph: number; ci: number; bin: number; al: number };
  let leaves: Leaf[] = [];
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  function build() {
    const n = small ? 14 : 28;
    leaves = Array.from({ length: n }, (_, i) => {
      const z = Math.pow(Math.random(), 0.9);
      const bin = z < 0.28 ? 0 : z > 0.86 ? 2 : 1;
      return { x: rnd(0, W), y: rnd(0, H), z, sz: 38 + z * z * (small ? 150 : 220), rz: rnd(0, 6.28), vrz: rnd(-0.35, 0.35), rx: rnd(0, 6.28), vrx: rnd(0.25, 0.9) * (Math.random() < 0.5 ? -1 : 1), vy: 7 + z * 26, sw: rnd(14, 36) * (0.4 + z), sp: rnd(0.25, 0.7), ph: rnd(0, 6.28), ci: i % PAL.length, bin, al: bin === 2 ? 0.34 : bin === 0 ? 0.4 : 0.62 };
    }).sort((a, b) => a.z - b.z);
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.75);
    W = innerWidth; H = innerHeight;
    cv!.width = W * dpr; cv!.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }
  let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, last = performance.now(), run = true;
  addEventListener('pointermove', (e) => { tx = e.clientX / W; ty = e.clientY / H; }, { passive: true });
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => { run = !document.hidden; if (run) { last = performance.now(); requestAnimationFrame(frame); } });

  function draw(t: number) {
    ctx.clearRect(0, 0, W, H);
    const sy = scrollY;
    for (const l of leaves) {
      const m = l.sz;
      const ox = (mx - 0.5) * 70 * l.z + Math.sin(t * l.sp + l.ph) * l.sw;
      const oy = (my - 0.5) * 44 * l.z - sy * (0.08 + 0.2 * l.z);
      const span = H + m * 2;
      const px = l.x + ox;
      const py = ((((l.y + oy) % span) + span) % span) - m;
      const cs = Math.cos(l.rx), back = cs < 0;
      const img = sprite(l.ci, l.bin, back);
      const w = m * 1.3, h = m * 1.3;
      ctx.save();
      ctx.translate(px, py); ctx.rotate(l.rz); ctx.scale(Math.max(0.12, Math.abs(cs)), 1);
      ctx.globalAlpha = l.al * (0.6 + 0.4 * Math.abs(cs));
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }
  function frame(now: number) {
    if (!run) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    for (const l of leaves) { l.y += l.vy * dt; l.rz += l.vrz * dt; l.rx += l.vrx * dt; }
    draw(now / 1000);
    requestAnimationFrame(frame);
  }
  resize();
  if (reduce) draw(0); else requestAnimationFrame(frame);
}

/* MedRo — Service Worker
   الهدف: فتح الواجهة بسرعة وعملها بدون إنترنت (قشرة التطبيق فقط). بيانات Supabase لا تُخزَّن هنا أبدًا.
   عند نشر تحديث كبير غيّر رقم VERSION ليُمسح الكاش القديم. */
const VERSION = 'v1';
const SHELL = `medro-shell-${VERSION}`;
const EXTRA = `medro-extra-${VERSION}`;          // الخطوط ومكتبة supabase-js من CDN
const PRECACHE = ['./', 'index.html', 'config.js', 'css/style.css', 'js/app.js', 'manifest.webmanifest',
  'assets/mark-light.png', 'assets/mark-dark.png', 'assets/favicon.png', 'assets/icon-192.png'];
const EXTRA_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    await Promise.allSettled(PRECACHE.map(u => c.add(u)));   // ملف ناقص لا يُفشل التثبيت
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = new Set([SHELL, EXTRA]);
    for (const k of await caches.keys()) if (!keep.has(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function networkFirst(req, cacheName, fallbackUrl) {
  const c = await caches.open(cacheName);
  try {
    const r = await fetch(req);
    if (r && r.ok && r.type === 'basic') c.put(req, r.clone());
    return r;
  } catch (err) {
    const hit = (await c.match(req)) || (fallbackUrl && (await c.match(fallbackUrl)));
    if (hit) return hit;
    throw err;
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const c = await caches.open(cacheName);
  const hit = await c.match(req);
  const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => null);
  return hit || (await net) || Response.error();
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    // الصفحات: الشبكة أولًا، وعند انقطاعها نعرض نسخة index المخزنة
    if (req.mode === 'navigate') { e.respondWith(networkFirst(req, SHELL, 'index.html')); return; }
    e.respondWith(networkFirst(req, SHELL));
    return;
  }
  if (EXTRA_HOSTS.includes(url.hostname)) { e.respondWith(staleWhileRevalidate(req, EXTRA)); return; }
  // أي مصدر آخر (Supabase API / التخزين / الذكاء الاصطناعي): لا نتدخل إطلاقًا
});

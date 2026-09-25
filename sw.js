const CACHE = 'seowon-pwa-v4';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './splash/start.png',
  './sounds/1.wav','./sounds/2.wav','./sounds/3.wav','./sounds/4.wav','./sounds/5.wav',
  './sounds/6.wav','./sounds/7.wav','./sounds/8.wav','./sounds/9.wav'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    try {
      const res = await fetch('./media/manifest.json');
      const list = await res.json();
      await cache.addAll(list.map((item) => new URL(item.path, self.location).href));
    } catch (e) {}
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch (e) {
      const hit = await cache.match(req) || (req.mode === 'navigate' ? await cache.match('./index.html') : null);
      if (hit) return hit;
      throw e;
    }
  })());
});

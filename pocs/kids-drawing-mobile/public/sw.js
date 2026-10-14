const CACHE = 'kids-drawing-v1';
const PAGE = './';

const assetsOf = (html) =>
  [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);

const precache = async () => {
  const cache = await caches.open(CACHE);
  const response = await fetch(PAGE, { cache: 'reload' });
  const html = await response.clone().text();
  await cache.put(PAGE, response);
  await cache.addAll(assetsOf(html));
};

const page = async () => {
  const cache = await caches.open(CACHE);
  const response = await fetch(PAGE).catch(() => null);
  if (response?.ok) {
    await cache.put(PAGE, response.clone());
    return response;
  }
  return (await cache.match(PAGE)) ?? response ?? Response.error();
};

const asset = async (request) => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
};

self.addEventListener('install', (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(event.request.mode === 'navigate' ? page() : asset(event.request));
});

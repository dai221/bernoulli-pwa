const CACHE_NAME = 'shadowing-v1';
const BASE = self.location.pathname.replace(/sw\.js$/, ''); // e.g., /bernoulli-pwa/

const urlsToCache = [
  `${BASE}`,
  `${BASE}index.html`,
  `${BASE}style.css`,
  `${BASE}script.js`,
  `${BASE}manifest.json`,
  // MP3はユーザーが追加後にキャッシュされます（初回はオンラインでOK）
  // `${BASE}audio/phrase1.mp3`,
  // `${BASE}audio/phrase2.mp3`,
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});

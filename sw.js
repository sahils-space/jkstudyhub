const CACHE_NAME = 'jk-study-hub-v18';
const urlsToCache = [
  './',
  './index.html',
  './store.html',
  './cart.html',
  './account.html',
  './style.css',
  './store.js',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/logo-app.png',
  './images/apple-touch-icon.png',
  './images/favicon.png',
  './images/ad-3d-scooter.webp',
  './images/ad-3d-founder.webp',
  './images/ad-3d-scooter.png',
  './images/ad-3d-founder.png',
  './images/diary.webp',
  './images/geometry-box.webp',
  './images/pen-stand.webp',
  './images/quran.webp',
  './images/spiral-copies.webp',
  './images/study-table.webp',
  './images/books/atomic-habits-1.webp',
  './images/books/atomic-habits-2.webp',
  './images/books/atomic-habits-3.webp',
  './images/books/atomic-habits-4.webp',
  './images/books/deep-work-1.webp',
  './images/books/deep-work-2.webp',
  './images/books/deep-work-3.webp',
  './images/books/deep-work-4.webp',
  './images/books/lucent-gk-1.webp',
  './images/books/lucent-gk-2.webp',
  './images/books/lucent-gk-3.webp',
  './images/books/lucent-gk-4.webp',
  './images/books/psychology-of-money-1.webp',
  './images/books/psychology-of-money-2.webp',
  './images/books/psychology-of-money-3.webp',
  './images/books/psychology-of-money-4.webp',
  './images/books/reclaim-your-heart-1.webp',
  './images/books/reclaim-your-heart-2.webp',
  './images/books/reclaim-your-heart-3.webp',
  './images/books/reclaim-your-heart-4.webp',
  './images/books/secrets-of-divine-love-1.webp',
  './images/books/secrets-of-divine-love-2.webp',
  './images/books/secrets-of-divine-love-3.webp',
  './images/books/secrets-of-divine-love-4.webp',
  './images/books/the-alchemist-1.webp',
  './images/books/the-alchemist-2.webp',
  './images/books/the-alchemist-3.webp',
  './images/books/the-alchemist-4.webp',
  './images/books/the-kite-runner-1.webp',
  './images/books/the-kite-runner-2.webp',
  './images/books/the-kite-runner-3.webp',
  './images/books/the-kite-runner-4.webp',
  './images/books/thousand-splendid-suns-1.webp',
  './images/books/thousand-splendid-suns-2.webp',
  './images/books/thousand-splendid-suns-3.webp',
  './images/books/thousand-splendid-suns-4.webp',
  './images/books/wings-of-fire-1.webp',
  './images/books/wings-of-fire-2.webp',
  './images/books/wings-of-fire-3.webp',
  './images/books/wings-of-fire-4.webp',
  './images/books/wren-martin-1.webp',
  './images/books/wren-martin-2.webp',
  './images/books/wren-martin-3.webp',
  './images/books/wren-martin-4.webp'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fast Smooth Strategy: Instant Cache response + Background Network Revalidation
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip external APIs and Firebase
  if (url.origin !== location.origin || url.hostname.includes('google') || url.hostname.includes('firebase') || event.request.method !== 'GET') {
    return;
  }

  // HTML pages: Network first with fast cache fallback
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Static Assets (Images, CSS, JS): Instant Cache-First with Background Revalidation
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});

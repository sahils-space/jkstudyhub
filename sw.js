const CACHE_NAME = 'jk-study-hub-v15';
const urlsToCache = [
  './',
  './index.html',
  './store.html',
  './account.html',
  './style.css',
  './store.js',
  './images/ad-3d-scooter.png',
  './images/ad-3d-founder.png'
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
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
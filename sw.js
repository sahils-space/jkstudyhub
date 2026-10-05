const CACHE_NAME = 'jk-study-hub-v12';
const urlsToCache = [
  './',
  './index.html',
  './store.html',
  './account.html',
  './style.css',
  './store.js'
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

// Network-First Strategy: always get fresh files when online
self.addEventListener('fetch', event => {
  // Bypass Service Worker for API calls and external domains
  const url = new URL(event.request.url);
  if (url.origin !== location.origin || url.hostname.includes('google') || url.hostname.includes('firebase')) {
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && event.request.method === 'GET') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
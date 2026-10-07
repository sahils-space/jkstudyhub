const CACHE_NAME = 'jk-study-hub-v36';
const urlsToCache = [
  './',
  './index.html',
  './store.html',
  './cart.html',
  './account.html',
  './style.css',
  './store.js',
  './script.js',
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
  './images/study-table.webp'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).catch(() => {})
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

self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Real-Time Live Update Strategy:
// 1. Code assets (.html, .js, .css, navigation): Network-First with Cache Fallback
//    Ensures users and mobile phones always get live code updates without clearing browser cookies/data.
// 2. Images & media (.webp, .png, .jpg, .svg): Cache-First with Network Fallback for ultra-fast loading.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip external APIs, Google Sheets, Razorpay, and Firebase
  if (url.origin !== location.origin || url.hostname.includes('google') || url.hostname.includes('firebase') || url.hostname.includes('razorpay') || event.request.method !== 'GET') {
    return;
  }

  const isNavigation = event.request.mode === 'navigate' || event.request.destination === 'document';
  const isCodeAsset = url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname === '';

  // Network-First for core code & HTML (always fresh updates online)
  if (isNavigation || isCodeAsset) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
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

  // Cache-First for static media (images, fonts)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});

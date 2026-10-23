const CACHE_NAME = 'jk-study-hub-v97';
const urlsToCache = [
  './',
  './index.html',
  './store.html',
  './cart.html',
  './account.html',
  './seller.html',
  './reels.json',
  './ads-media.js',
  './print-cards.html',
  './poster.html',
  './analytics.js',
  './seller.css',
  './seller.js',
  './premium-theme.css',
  './promo-offers.css',
  './style.css',
  './store.js',
  './script.js',
  './images/school-bookset.webp',
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
  './images/offer-mascot-delivery.jpg',
  './images/offer-mascot-savings.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => {
        console.error('Service worker precache failed; the previous worker will remain active:', error);
        throw error;
      })
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
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone))
              .catch(error => console.warn('Could not cache the latest site response:', error));
          }
          return response;
        })
        .catch(error => {
          console.warn('Network request failed; checking the offline cache:', url.pathname, error);
          return caches.match(event.request, { ignoreSearch: isNavigation }).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            if (isNavigation) {
              return new Response(
                '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title><body style="font:16px system-ui,sans-serif;max-width:36rem;margin:15vh auto;padding:0 1.25rem;color:#202a25"><h1>You are offline</h1><p>This page is not available on this device yet. Reconnect to the internet and reload JK Study Hub.</p></body></html>',
                { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
              );
            }
            return Response.error();
          });
        })
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
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, clone))
            .catch(error => console.warn('Could not cache the requested media:', error));
        }
        return networkResponse;
      }).catch(error => {
        console.warn('Media request failed and no cached copy was available:', url.pathname, error);
        return Response.error();
      });
    })
  );
});

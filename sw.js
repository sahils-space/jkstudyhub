const CACHE_NAME = 'jk-study-hub-v222';
const urlsToCache = [
  './',
  './index.html',
  './store.html',
  './hub.html',
  './cart.html',
  './account.html',
  './seller.html',
  './art.html',
  './art.css',
  './art.js',
  './jk-bose-class-10-books.html',
  './reels.json',
  './ads-media.js',
  './print-cards.html',
  './poster.html',
  './analytics.js',
  './seller.css',
  './seller.js',
  './premium-theme.css',
  './brand-theme.css',
  './promo-offers.css',
  './style.css',
  './store.js',
  './script.js',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/logo-app.png',
  './images/apple-touch-icon.png',
  './images/favicon.png',
  './images/upi-logo.svg',
  './images/ad-3d-scooter.webp',
  './images/ad-3d-founder.webp',
  './images/ad-3d-scooter.png',
  './images/ad-3d-founder.png',
  './images/diary.webp',
  './images/geometry-box.webp',
  './images/pen-stand.webp',
  './images/quran.webp',
  './images/study-table.webp',
  './images/products/led-study-lamp.webp',
  './images/products/jkbose-class10-master-kit.webp',
  './images/products/jkbose-class12-master-kit.webp',
  './images/products/premium-spiral-copies.webp',
  './images/products/jkbose-solved-papers.webp',
  './images/products/board-exam-stationery-combo.webp',
  './images/products/pdf-printing-spiral.webp',
  './images/products/printed-pyqs-syllabus.webp',
  './images/products/instant-notes.webp',
  './images/products/exam-survival-kit.webp',
  './images/products/premium-pen-set.webp',
  './images/products/school-bookset-bundle.webp',
  './images/products/physical-education-notes-cover.webp',
  './images/products/spectra-paper-a4-1.jpg',
  './images/products/doms-colour-pencils-1.jpg',
  './images/products/doms-small-colour-pencils-1.jpg',
  './images/products/classmate-geometry-box-1.jpg',
  './images/products/water-colours-doms-1.jpg',
  './images/products/doms-glue-stick-10-pcs-1.jpg',
  './images/products/nixon-doms-pen-bundle-1.jpg',
  './images/products/pencils-1.jpg',
  './images/resin/resin-bookmark.webp',
  './images/resin/resin-keychain.webp',
  './images/resin/resin-quran-stand.webp',
  './images/resin/resin-clock.webp',
  './images/resin/resin-coasters.webp',
  './images/resin/resin-ayat-frame.webp',
  './images/resin/resin-wedding-cube.webp',
  './images/resin/resin-tray.webp',
  './images/resin/resin-pen-stand.webp'
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

// Fetch Strategy:
// 1. Versioned JS/CSS (?v=...): Cache-First — version bump forces reload automatically
// 2. HTML & navigation: Network-First with Cache Fallback — always fresh
// 3. Images & media (.webp, .png, .jpg, .svg): Cache-First — ultra fast after first load
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip external APIs, Google Sheets, Razorpay, and Firebase
  if (url.origin !== location.origin || url.hostname.includes('google') || url.hostname.includes('firebase') || url.hostname.includes('razorpay') || event.request.method !== 'GET') {
    return;
  }

  const isNavigation = event.request.mode === 'navigate' || event.request.destination === 'document';
  const isHtml = url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname === '';

  // Versioned JS/CSS (?v=): Cache-First — the version param guarantees freshness
  const isVersionedAsset = (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) && url.search.includes('v=');

  if (isVersionedAsset) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
          }
          return response;
        }).catch(() => caches.match(event.request, { ignoreSearch: true }).then(fallback => fallback || Response.error()));
      })
    );
    return;
  }

  // Network-First for HTML navigation (always get fresh HTML)
  if (isNavigation || isHtml) {
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

  // Cache-First for static media and unversioned JS/CSS (images, fonts, svg)
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

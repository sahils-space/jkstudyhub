const fs = require('fs');
let content = fs.readFileSync('sw.js', 'utf8');

content = content.replace(
  /self\.addEventListener\('fetch', event => \{/,
  `self.addEventListener('fetch', event => {
  // Bypass Service Worker for API calls and external domains
  const url = new URL(event.request.url);
  if (url.origin !== location.origin || url.hostname.includes('google') || url.hostname.includes('firebase')) {
    return;
  }`
);

fs.writeFileSync('sw.js', content);
console.log('Fixed sw.js fetch handler');

const fs = require('fs');
let content = fs.readFileSync('store_v7.js', 'utf8');

const nukeSW = `
// Nuke old Service Workers to fix Safari caching bugs
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}
`;

content = nukeSW + content;
fs.writeFileSync('store_v7.js', content);

let scriptContent = fs.readFileSync('script.js', 'utf8');
scriptContent = nukeSW + scriptContent;
fs.writeFileSync('script.js', scriptContent);
console.log('Added SW nuke to both scripts');

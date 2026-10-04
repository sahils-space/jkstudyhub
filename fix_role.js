const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

content = content.replace(
  /if \(p === '9622605714'\) return 'owner';/,
  `const e = String(user.email || '').toLowerCase();
  if (p === '9622605714' || e === 'sahilsspace20@gmail.com') return 'owner';`
);

fs.writeFileSync('store.js', content);
console.log('Fixed role');

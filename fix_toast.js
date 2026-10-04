const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');
content = content.replace(/showToast\(\`Welcome, \$\{user\.displayName\.split\(' '\)\[0\]\}\!\`\);/g, 'showToast(`Welcome, ${(user.displayName || "Student").split(" ")[0]}!`);');
fs.writeFileSync('store.js', content);
console.log('Fixed');

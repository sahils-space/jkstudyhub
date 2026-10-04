const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

content = content.replace(
  /if \(window\.location\.pathname\.includes\('account\.html'\)\) \{\s*setTimeout\(\(\) => window\.location\.reload\(\), 1000\);\s*\}/g,
  `if (window.location.pathname.includes('account.html')) {
    setTimeout(() => {
      if (typeof renderAccountDashboard === 'function') renderAccountDashboard();
      if (typeof initShop === 'function') initShop();
    }, 100);
  }`
);

fs.writeFileSync('store.js', content);
console.log('Fixed reload 2');

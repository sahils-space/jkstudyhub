const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

content = content.replace(
  /\} else if \(window\.location\.pathname\.includes\('account\.html'\)\) \{\s*setTimeout\(\(\) => window\.location\.reload\(\), 1000\);\s*\}/g,
  `} else if (window.location.pathname.includes('account.html')) {
        setTimeout(() => {
          if (typeof renderAccountDashboard === 'function') renderAccountDashboard();
          if (typeof initShop === 'function') initShop();
        }, 100);
      }`
);

fs.writeFileSync('store.js', content);
console.log('Fixed reload');

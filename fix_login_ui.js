const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

// Fix handleGooglePopupAuth
content = content.replace(
  /setCurrentUser\(user\);\s*showToast\(\`Welcome, \$\{user\.displayName\.split\(' '\)\[0\]\}\!\`\);/,
  `setCurrentUser(user);
      showToast(\`Welcome, \${user.displayName.split(' ')[0]}!\`);
      if (typeof renderAccountDashboard === 'function') { setTimeout(renderAccountDashboard, 100); }
      if (document.getElementById('checkoutModal') && document.getElementById('checkoutModal').style.display === 'flex') {
        const orderName = document.getElementById('orderName');
        if (orderName && !orderName.value) orderName.value = user.displayName;
        const orderPhone = document.getElementById('orderPhone');
        if (orderPhone && !orderPhone.value) orderPhone.value = (user.phoneNumber || '').replace('+91', '');
      } else if (window.location.pathname.includes('account.html')) {
        setTimeout(() => window.location.reload(), 1000);
      }`
);

// Fix finishPhoneLogin
content = content.replace(
  /if \(orderPhone && !orderPhone\.value\) orderPhone\.value = user\.phoneNumber\.replace\('\+91', ''\);/,
  `if (orderPhone && !orderPhone.value) orderPhone.value = user.phoneNumber.replace('+91', '');
  if (typeof renderAccountDashboard === 'function') { setTimeout(renderAccountDashboard, 100); }
  if (window.location.pathname.includes('account.html')) {
    setTimeout(() => window.location.reload(), 1000);
  }`
);

fs.writeFileSync('store.js', content);
console.log('Fixed UI updates after login');

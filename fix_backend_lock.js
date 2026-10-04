const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

const anchor = `  const idx = orders.findIndex(o => o.orderId === orderId);
  if (idx !== -1) {`;

const newCode = `  const idx = orders.findIndex(o => o.orderId === orderId);
  if (idx !== -1) {
    if (orders[idx].status === 'Delivered' || orders[idx].status === 'Cancelled') {
      showToast('⚠️ Cannot modify a ' + orders[idx].status + ' order.');
      if (typeof renderAccountOrders === 'function') { setTimeout(renderAccountOrders, 100); }
      return;
    }`;

content = content.replace(anchor, newCode);
fs.writeFileSync('store.js', content);
console.log('Fixed backend lock logic in store.js');

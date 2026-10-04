const fs = require('fs');

['store.html', 'cart.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Remove old bottom nav completely
  const startMarker = '<!-- Mobile Bottom App Bar (Like Flipkart / Amazon) -->';
  const newMarker = '<!-- Mobile Bottom Navigation -->';
  
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(newMarker);
  
  if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + content.substring(endIdx);
  }
  
  // 2. Fix the 404 links!
  content = content.replace(/orders\.html/g, 'account.html#orders');
  content = content.replace(/wishlist\.html/g, 'account.html#wishlist');
  
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});

// 3. Fix links in index.html, store.js, sw.js
['index.html', 'store.js', 'sw.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/orders\.html/g, 'account.html#orders');
  content = content.replace(/wishlist\.html/g, 'account.html#wishlist');
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});

const fs = require('fs');

['store.html', 'cart.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find start of old nav
  const startIdx = content.indexOf('<!-- Mobile Bottom App Bar (Like Flipkart / Amazon) -->');
  // Find start of new nav
  const endIdx = content.indexOf('<!-- Mobile Bottom Navigation -->');
  
  if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + content.substring(endIdx);
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  } else {
    console.log('Could not find markers in ' + file);
  }
});

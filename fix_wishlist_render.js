const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

// Replace the inner loop of renderAccountWishlist
content = content.replace(
  /<button class="wishlist-icon active" onclick="toggleWishlist[^>]*><i class="fa-solid fa-heart"><\/i><\/button>/g,
  `<button class="wishlist-icon active" onclick="toggleFavorite(this, '\\\${item.name}')" style="top:10px; right:10px;"><i class="fa-solid fa-heart"></i></button>`
);

content = content.replace(
  /<button class="buy-btn" onclick="addToCart[^>]*>Add <i class="fa-solid fa-cart-shopping"><\/i><\/button>/g,
  `<button class="buy-btn" onclick="addToCart('\\\${item.name}', \\\${item.price}, 'standard', '\\\${item.category}')" style="padding:6px 12px; font-size:13px;">Add <i class="fa-solid fa-cart-shopping"></i></button>`
);

fs.writeFileSync('store.js', content);
console.log('Fixed wishlist HTML generation');

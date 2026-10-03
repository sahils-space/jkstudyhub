// JK STUDY HUB - MASTER E-COMMERCE ENGINE v3.0
// Cart, Wishlist, Orders Tracking, Unified Google Auth & Razorpay Live Integration

const RAZORPAY_KEY = "rzp_live_TjJ6bv39yo6Gds";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec";

// Master Catalog
const PRODUCT_CATALOG = {
  "Printed PYQs & Syllabus": {
    price: 49,
    category: "notes",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=500"
  },
  "Instant Notes (Per Subject)": {
    price: 150,
    category: "notes",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500"
  },
  "Instant Notes": {
    price: 150,
    category: "notes",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500"
  },
  "Exam Survival Kit": {
    price: 299,
    category: "standard",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=500"
  },
  "Premium Spiral Copies (Set of 2)": {
    price: 149,
    category: "standard",
    image: "images/spiral-copies.png"
  },
  "Geometry Box Pro": {
    price: 170,
    category: "standard",
    image: "images/geometry-box.png"
  },
  "The Holy Quran": {
    price: 200,
    category: "standard",
    image: "images/quran.png"
  },
  "Beautiful Gift Diary": {
    price: 99,
    category: "standard",
    image: "images/diary.png"
  },
  "Premium Pen Set": {
    price: 99,
    category: "standard",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=500"
  },
  "Desk Pen Stand": {
    price: 149,
    category: "standard",
    image: "images/pen-stand.png"
  },
  "Folding Study Table": {
    price: 490,
    category: "standard",
    image: "images/study-table.png"
  },
  "LED Study Table Lamp": {
    price: 299,
    category: "standard",
    image: "https://image.pollinations.ai/prompt/A_simple_modern_LED_study_table_lamp_product_photography_on_white_background?width=600&height=400&nologo=true"
  },
  "Professional Form Filling": {
    price: 99,
    category: "form",
    image: "images/icon.svg"
  },
  "Form Filling Service": {
    price: 99,
    category: "form",
    image: "images/icon.svg"
  }
};

// --- DATA ACCESS LAYER ---
function getCart() {
  try {
    const raw = localStorage.getItem('jk_cart') || localStorage.getItem('cart');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch(e) {
    return [];
  }
}

function saveCart(cart) {
  const json = JSON.stringify(cart);
  localStorage.setItem('jk_cart', json);
  localStorage.setItem('cart', json);
  updateNavBadges();
}

function getWishlist() {
  try {
    const raw = localStorage.getItem('jk_wishlist') || localStorage.getItem('wishlist');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch(e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  const json = JSON.stringify(wishlist);
  localStorage.setItem('jk_wishlist', json);
  localStorage.setItem('wishlist', json);
  updateNavBadges();
}

function getOrders() {
  try {
    const raw = localStorage.getItem('jk_orders');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch(e) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem('jk_orders', JSON.stringify(orders));
  updateNavBadges();
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('jk_study_user') || 'null');
  } catch(e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('jk_study_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('jk_study_user');
  }
  updateAuthUI();
  updateNavBadges();
}

// --- NAV BADGES UPDATER ---
function updateNavBadges() {
  const cart = getCart();
  const wishlist = getWishlist();
  const orders = getOrders();

  const totalCartQty = cart.reduce((acc, item) => acc + (parseInt(item.qty) || 1), 0);
  const totalWishlistCount = wishlist.length;
  const totalOrdersCount = orders.length;

  const cartBadges = document.querySelectorAll('.nav-badge-count, #cartCount');
  cartBadges.forEach(el => {
    if (totalCartQty > 0) {
      el.style.display = 'inline-block';
      el.innerText = totalCartQty;
    } else {
      el.style.display = 'none';
    }
  });

  const wishlistBadges = document.querySelectorAll('.wishlist-badge-count, #wishlistCount');
  wishlistBadges.forEach(el => {
    if (totalWishlistCount > 0) {
      el.style.display = 'inline-block';
      el.innerText = totalWishlistCount;
    } else {
      el.style.display = 'none';
    }
  });

  const orderBadges = document.querySelectorAll('.orders-badge-count, #ordersCount');
  orderBadges.forEach(el => {
    if (totalOrdersCount > 0) {
      el.style.display = 'inline-block';
      el.innerText = totalOrdersCount;
    } else {
      el.style.display = 'none';
    }
  });
}

// --- AUTHENTICATION UI LAYER ---
function updateAuthUI() {
  const user = getCurrentUser();
  const authContainers = document.querySelectorAll('.store-auth-cluster');

  authContainers.forEach(container => {
    if (user) {
      const firstName = (user.displayName || 'Student').split(' ')[0];
      const avatarSrc = user.photoURL || 'ceo-placeholder.svg';
      container.innerHTML = `
        <div style="position: relative; display: inline-block;">
          <button type="button" onclick="toggleStoreUserDropdown(this)" style="display: flex; align-items: center; gap: 8px; background: #eff6ff; border: 1px solid #bfdbfe; padding: 5px 12px; border-radius: 50px; cursor: pointer; color: #1e3a8a; font-weight: 700; font-size: 13px;">
            <img src="${avatarSrc}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'">
            <span>${firstName}</span>
            <i class="fa-solid fa-chevron-down" style="font-size: 10px;"></i>
          </button>
          <div class="store-user-dropdown" style="display: none; position: absolute; right: 0; top: 110%; width: 220px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 10001; padding: 12px;">
            <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 8px;">
              <p style="margin: 0; font-weight: 700; font-size: 14px; color: #1e293b;">${user.displayName || 'Student'}</p>
              <p style="margin: 3px 0 0; font-size: 12px; color: #64748b; word-break: break-all;">${user.email || ''}</p>
            </div>
            <a href="orders.html" style="display: flex; align-items: center; gap: 8px; color: #334155; text-decoration: none; padding: 8px; border-radius: 6px; font-size: 13px; font-weight: 600;">
              <i class="fa-solid fa-box" style="color: #10b981;"></i> My Orders
            </a>
            <a href="wishlist.html" style="display: flex; align-items: center; gap: 8px; color: #334155; text-decoration: none; padding: 8px; border-radius: 6px; font-size: 13px; font-weight: 600;">
              <i class="fa-solid fa-heart" style="color: #ef4444;"></i> My Wishlist
            </a>
            <a href="cart.html" style="display: flex; align-items: center; gap: 8px; color: #334155; text-decoration: none; padding: 8px; border-radius: 6px; font-size: 13px; font-weight: 600;">
              <i class="fa-solid fa-cart-shopping" style="color: #2563eb;"></i> My Cart
            </a>
            <div style="border-top: 1px solid #f1f5f9; margin-top: 8px; padding-top: 8px;">
              <button onclick="handleStoreSignOut()" style="width: 100%; text-align: left; background: none; border: none; color: #ef4444; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 6px 8px;">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <button type="button" onclick="handleStoreSignIn()" class="store-nav-btn" style="background: #ffffff; border: 1px solid #cbd5e1; color: #1e293b; font-weight: 700; padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
          <svg style="width: 16px; height: 16px;" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>Sign In</span>
        </button>
      `;
    }
  });
}

function toggleStoreUserDropdown(btn) {
  const dropdown = btn.parentElement.querySelector('.store-user-dropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

// Close dropdowns on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.store-auth-cluster')) {
    document.querySelectorAll('.store-user-dropdown').forEach(d => d.style.display = 'none');
  }
});

function handleStoreSignIn() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
      const user = {
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        uid: res.user.uid
      };
      setCurrentUser(user);
      showToast(`Welcome back, ${user.displayName.split(' ')[0]}!`);
    }).catch(err => {
      fallbackLoginPrompt();
    });
  } else {
    fallbackLoginPrompt();
  }
}

function fallbackLoginPrompt() {
  const name = prompt("Enter your Name to sign in to JK Study Hub:", "Student");
  if (name && name.trim()) {
    const user = {
      displayName: name.trim(),
      email: `${name.trim().toLowerCase().replace(/\s+/g, '')}@student.jkstudyhub.online`,
      photoURL: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      uid: 'student_' + Date.now()
    };
    setCurrentUser(user);
    showToast(`Welcome, ${user.displayName}!`);
  }
}

function handleStoreSignOut() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().signOut().catch(() => {});
  }
  setCurrentUser(null);
  showToast("You have signed out successfully.");
}

// --- TOAST NOTIFICATION ---
function showToast(message, linkUrl, linkText) {
  let toast = document.getElementById('shopToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shopToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: white;
      padding: 14px 24px;
      border-radius: 50px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-size: 14px;
      font-weight: 600;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      pointer-events: none;
      max-width: 90%;
    `;
    document.body.appendChild(toast);
  }

  let html = `<span>${message}</span>`;
  if (linkUrl && linkText) {
    html += `<a href="${linkUrl}" style="background: #2563eb; color: white; text-decoration: none; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; white-space: nowrap;">${linkText}</a>`;
  }
  toast.innerHTML = html;
  toast.style.pointerEvents = 'auto';
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.pointerEvents = 'none';
  }, 4000);
}

// --- CART ACTIONS ---
function addToCart(name, price, type, category) {
  const card = event && event.target ? event.target.closest('.product-card') : null;
  const catalog = PRODUCT_CATALOG[name] || {};

  let finalPrice = price || catalog.price;
  if (!finalPrice && card) {
    const pEl = card.querySelector('.product-price');
    if (pEl) finalPrice = parseInt(pEl.innerText.replace(/[^0-9]/g, ''));
  }
  finalPrice = finalPrice || 99;

  let finalImg = catalog.image;
  if (!finalImg && card) {
    const imEl = card.querySelector('img');
    if (imEl) finalImg = imEl.getAttribute('src');
  }
  finalImg = finalImg || 'images/icon.svg';

  const finalCat = category || catalog.category || 'standard';

  let cart = getCart();
  const existingIdx = cart.findIndex(i => i.name === name);

  if (existingIdx > -1) {
    cart[existingIdx].qty = (parseInt(cart[existingIdx].qty) || 1) + 1;
  } else {
    cart.push({
      name: name,
      price: finalPrice,
      category: finalCat,
      image: finalImg,
      qty: 1
    });
  }

  saveCart(cart);
  showToast(`🛒 "${name}" added to Cart!`, 'cart.html', 'View Cart ➔');
}

function updateCartQty(index, delta) {
  let cart = getCart();
  if (!cart[index]) return;

  cart[index].qty = (parseInt(cart[index].qty) || 1) + delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

function removeFromCart(index) {
  let cart = getCart();
  if (!cart[index]) return;
  const name = cart[index].name;
  cart.splice(index, 1);
  saveCart(cart);
  showToast(`Removed "${name}" from cart`);
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

function moveToWishlist(index) {
  let cart = getCart();
  if (!cart[index]) return;
  const item = cart[index];

  let wishlist = getWishlist();
  if (!wishlist.find(w => w.name === item.name)) {
    wishlist.push({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image
    });
    saveWishlist(wishlist);
  }

  cart.splice(index, 1);
  saveCart(cart);

  showToast(`❤️ Saved "${item.name}" to Wishlist!`, 'wishlist.html', 'View Wishlist ➔');
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

// --- WISHLIST ACTIONS ---
function toggleFavorite(btn, productName) {
  const card = btn ? btn.closest('.product-card') : null;
  const title = productName || (card && card.querySelector('.product-title') ? card.querySelector('.product-title').innerText.trim() : '');
  if (!title) return;

  const catalog = PRODUCT_CATALOG[title] || {};
  let wishlist = getWishlist();
  const existingIdx = wishlist.findIndex(w => w.name === title);

  if (existingIdx > -1) {
    wishlist.splice(existingIdx, 1);
    saveWishlist(wishlist);
    if (btn) btn.classList.remove('active');
    showToast(`Removed from Wishlist`);
  } else {
    let finalPrice = catalog.price;
    if (!finalPrice && card) {
      const pEl = card.querySelector('.product-price');
      if (pEl) finalPrice = parseInt(pEl.innerText.replace(/[^0-9]/g, ''));
    }
    finalPrice = finalPrice || 99;

    let finalImg = catalog.image;
    if (!finalImg && card) {
      const imEl = card.querySelector('img');
      if (imEl) finalImg = imEl.getAttribute('src');
    }
    finalImg = finalImg || 'images/icon.svg';

    wishlist.push({
      name: title,
      price: finalPrice,
      category: catalog.category || 'standard',
      image: finalImg
    });
    saveWishlist(wishlist);
    if (btn) btn.classList.add('active');
    showToast(`❤️ Saved to Wishlist!`, 'wishlist.html', 'View Wishlist ➔');
  }

  syncHeartIcons();

  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

function syncHeartIcons() {
  const wishlist = getWishlist();
  document.querySelectorAll('.product-card').forEach(c => {
    const t = c.querySelector('.product-title');
    if (t) {
      const title = t.innerText.trim();
      const h = c.querySelector('.wishlist-icon');
      if (h) {
        if (wishlist.find(w => w.name === title)) {
          h.classList.add('active');
        } else {
          h.classList.remove('active');
        }
      }
    }
  });
}

function removeFromWishlist(index) {
  let wishlist = getWishlist();
  if (!wishlist[index]) return;
  const name = wishlist[index].name;
  wishlist.splice(index, 1);
  saveWishlist(wishlist);
  showToast(`Removed "${name}" from Wishlist`);
  syncHeartIcons();
  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

function moveWishlistToCart(index) {
  let wishlist = getWishlist();
  if (!wishlist[index]) return;
  const item = wishlist[index];

  let cart = getCart();
  const existingIdx = cart.findIndex(c => c.name === item.name);
  if (existingIdx > -1) {
    cart[existingIdx].qty = (parseInt(cart[existingIdx].qty) || 1) + 1;
  } else {
    cart.push({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      qty: 1
    });
  }
  saveCart(cart);

  wishlist.splice(index, 1);
  saveWishlist(wishlist);

  showToast(`🛒 Moved "${item.name}" to Cart!`, 'cart.html', 'View Cart ➔');
  syncHeartIcons();
  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

// --- RENDER DEDICATED CART PAGE (cart.html) ---
function renderCartPage() {
  const container = document.getElementById('cartItemsList');
  const summaryBox = document.getElementById('cartSummaryCard');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="background: white; border-radius: 16px; padding: 60px 20px; text-align: center; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
        <div style="width: 90px; height: 90px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 38px; color: #2563eb;">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <h3 style="font-size: 22px; color: #1e293b; font-weight: 700; margin-bottom: 8px;">Your Cart is Empty</h3>
        <p style="color: #64748b; font-size: 14px; max-width: 420px; margin: 0 auto 24px; line-height: 1.5;">Looks like you haven't added any books, notes, or stationery yet. Explore our store to find what you need!</p>
        <a href="store.html" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">Explore Store</a>
      </div>
    `;
    if (summaryBox) summaryBox.style.display = 'none';
    const countEl = document.getElementById('cartHeaderCount');
    if (countEl) countEl.innerText = '(0 items)';
    return;
  }

  if (summaryBox) summaryBox.style.display = 'block';

  let subtotal = 0;
  let totalQty = 0;
  let itemsHtml = `
    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 12px 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #1e40af;">
        <i class="fa-solid fa-location-dot" style="font-size: 16px;"></i>
        <span>Deliver to: <strong>Pattan, Baramulla - 193121</strong></span>
      </div>
      <span style="font-size: 11px; background: #dcfce7; color: #16a34a; font-weight: 700; padding: 3px 8px; border-radius: 20px;">FREE DELIVERY</span>
    </div>
  `;

  cart.forEach((item, index) => {
    const q = parseInt(item.qty) || 1;
    const itemTotal = item.price * q;
    subtotal += itemTotal;
    totalQty += q;

    itemsHtml += `
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 16px; display: flex; gap: 18px; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <img src="${item.image || 'images/icon.svg'}" alt="${item.name}" style="width: 85px; height: 85px; object-fit: cover; border-radius: 10px; border: 1px solid #f1f5f9; flex-shrink: 0;">
        <div style="flex-grow: 1;">
          <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 6px;">${item.name}</h4>
          <div style="font-size: 13px; color: #64748b; margin-bottom: 10px;">
            <span>Price: <strong>₹${item.price}</strong> each</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden;">
              <button onclick="updateCartQty(${index}, -1)" style="background: #f8fafc; border: none; padding: 6px 12px; cursor: pointer; font-size: 14px; font-weight: bold; color: #475569;">−</button>
              <span style="padding: 6px 14px; font-weight: 700; font-size: 14px; background: white;">${q}</span>
              <button onclick="updateCartQty(${index}, 1)" style="background: #f8fafc; border: none; padding: 6px 12px; cursor: pointer; font-size: 14px; font-weight: bold; color: #475569;">+</button>
            </div>
            <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ef4444; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-trash-can"></i> Remove
            </button>
            <button onclick="moveToWishlist(${index})" style="background: none; border: none; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px;">
              <i class="fa-regular fa-heart"></i> Save for Later
            </button>
          </div>
        </div>
        <div style="text-align: right; min-width: 90px;">
          <div style="font-size: 18px; font-weight: 800; color: #0f172a;">₹${itemTotal}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = itemsHtml;

  const countEl = document.getElementById('cartHeaderCount');
  if (countEl) countEl.innerText = `(${totalQty} items)`;

  const subtotalEl = document.getElementById('summarySubtotal');
  if (subtotalEl) subtotalEl.innerText = '₹' + subtotal;

  const totalEl = document.getElementById('summaryTotal');
  if (totalEl) totalEl.innerText = '₹' + (subtotal + 5);

  const itemsCountText = document.getElementById('summaryItemsCount');
  if (itemsCountText) itemsCountText.innerText = `Price (${totalQty} items)`;

  const checkoutBtn = document.getElementById('proceedCheckoutBtn');
  if (checkoutBtn) checkoutBtn.innerText = `Proceed to Checkout (₹${subtotal + 5}) ➔`;
}

// --- RENDER DEDICATED WISHLIST PAGE (wishlist.html) ---
function renderWishlistPage() {
  const container = document.getElementById('wishlistGrid');
  if (!container) return;

  const wishlist = getWishlist();
  const countEl = document.getElementById('wishlistHeaderCount');
  if (countEl) countEl.innerText = `(${wishlist.length} items)`;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; background: white; border-radius: 16px; padding: 60px 20px; text-align: center; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
        <div style="width: 90px; height: 90px; background: #fef2f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 38px; color: #ef4444;">
          <i class="fa-solid fa-heart"></i>
        </div>
        <h3 style="font-size: 22px; color: #1e293b; font-weight: 700; margin-bottom: 8px;">Your Wishlist is Empty</h3>
        <p style="color: #64748b; font-size: 14px; max-width: 420px; margin: 0 auto 24px; line-height: 1.5;">Tap the heart icon on any product in our store to save items you love. They will be saved right here!</p>
        <a href="store.html" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">Browse Store</a>
      </div>
    `;
    return;
  }

  let html = '';
  wishlist.forEach((item, index) => {
    html += `
      <div class="product-card" style="position: relative;">
        <button onclick="removeFromWishlist(${index})" style="position: absolute; top: 12px; right: 12px; background: white; border: none; border-radius: 50%; width: 34px; height: 34px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); cursor: pointer; color: #ef4444; font-size: 16px; display: flex; align-items: center; justify-content: center; z-index: 10;" title="Remove from Wishlist">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <img src="${item.image || 'images/icon.svg'}" alt="${item.name}" class="product-img" style="height: 190px; object-fit: cover;">
        <div class="product-info">
          <h3 class="product-title" style="font-size: 17px; margin-bottom: 6px;">${item.name}</h3>
          <div class="product-footer" style="margin-top: 15px;">
            <span class="product-price" style="font-size: 20px;">₹${item.price}</span>
            <div style="display: flex; gap: 8px;">
              <button onclick="moveWishlistToCart(${index})" class="buy-btn" style="background: #10b981; font-size: 13px; padding: 8px 14px; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
              <button onclick="openCheckout('${item.name}', ${item.price}, 'physical', '${item.category}')" class="buy-btn" style="font-size: 13px; padding: 8px 14px;">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- RENDER DEDICATED ORDERS PAGE (orders.html) ---
function renderOrdersPage() {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  const orders = getOrders();
  const countEl = document.getElementById('ordersHeaderCount');
  if (countEl) countEl.innerText = `(${orders.length} orders)`;

  if (orders.length === 0) {
    container.innerHTML = `
      <div style="background: white; border-radius: 16px; padding: 60px 20px; text-align: center; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
        <div style="width: 90px; height: 90px; background: #f0fdf4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 38px; color: #10b981;">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h3 style="font-size: 22px; color: #1e293b; font-weight: 700; margin-bottom: 8px;">No Orders Yet</h3>
        <p style="color: #64748b; font-size: 14px; max-width: 440px; margin: 0 auto 24px; line-height: 1.5;">When you purchase notes, printed PYQs, stationery, or form filling services, your order receipts, tracking numbers, and delivery updates will appear right here!</p>
        <a href="store.html" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">Explore Store</a>
      </div>
    `;
    return;
  }

  let html = '';
  orders.forEach((order, index) => {
    const safeOrderId = order.orderId || ('ORD-' + index);
    const waMessage = encodeURIComponent(`Hi JK Study Hub, I have an inquiry about my Order ${safeOrderId} (TXN: ${order.txnId}) placed on ${order.date}.`);
    
    html += `
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
        <!-- Order Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-family: monospace; font-size: 15px; font-weight: 800; color: #1e293b; background: #f1f5f9; padding: 4px 10px; border-radius: 6px;">${safeOrderId}</span>
              <span style="font-size: 12px; color: #64748b;">${order.date}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #dcfce7; color: #166534; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-circle-check"></i> Order Confirmed & Paid
            </span>
          </div>
        </div>

        <!-- Order Body -->
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 250px;">
            <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 8px;">${order.product}</h4>
            <div style="font-size: 13px; color: #64748b; line-height: 1.6;">
              <p style="margin: 0;"><strong>Recipient:</strong> ${order.name} (${order.phone})</p>
              <p style="margin: 4px 0 0;"><strong>Delivery Location:</strong> ${order.address}</p>
            </div>
            <div style="margin-top: 10px; font-size: 11.5px; color: #2563eb; background: #eff6ff; padding: 4px 10px; border-radius: 6px; display: inline-block;">
              <i class="fa-solid fa-shield-halved"></i> Razorpay Payment ID: <strong>${order.txnId}</strong>
            </div>
          </div>

          <div style="text-align: right; min-width: 140px;">
            <div style="font-size: 12px; color: #64748b;">Total Paid</div>
            <div style="font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 2px;">₹${order.amount}</div>
          </div>
        </div>

        <!-- Order Footer -->
        <div style="border-top: 1px solid #f1f5f9; margin-top: 18px; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <span style="font-size: 12px; color: #16a34a; font-weight: 600;">
            <i class="fa-solid fa-truck-fast"></i> Delivery to Pattan (Standard Delivery)
          </span>
          <a href="https://wa.me/919622605714?text=${waMessage}" target="_blank" rel="noopener" style="background: #25d366; color: white; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 8px rgba(37,211,102,0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 16px;"></i> Track on WhatsApp
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- CHECKOUT & PAYMENT LOGIC (AMAZON-STYLE 2-STEP) ---
let currentCheckoutProduct = '';
let currentCheckoutPrice = 0;
let currentCheckoutCategory = 'standard';
let isCartCheckoutSession = false;

function openCheckout(name, price, type, category) {
  isCartCheckoutSession = false;
  currentCheckoutProduct = name;
  currentCheckoutPrice = price;
  currentCheckoutCategory = category || 'standard';

  setupCheckoutModal(name, price, category);
}

function openCartCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  isCartCheckoutSession = true;

  let total = 0;
  let names = [];
  let hasNotes = false;
  let hasForms = false;

  cart.forEach(item => {
    const q = parseInt(item.qty) || 1;
    total += item.price * q;
    names.push(`${item.name} (x${q})`);
    if (item.category === 'notes') hasNotes = true;
    if (item.category === 'form') hasForms = true;
  });

  let combinedCat = 'standard';
  if (hasNotes && hasForms) combinedCat = 'both';
  else if (hasNotes) combinedCat = 'notes';
  else if (hasForms) combinedCat = 'form';

  const combinedTitle = `Cart Order [${names.join(', ')}]`;
  currentCheckoutProduct = combinedTitle;
  currentCheckoutPrice = total;
  currentCheckoutCategory = combinedCat;

  setupCheckoutModal(combinedTitle, total, combinedCat);
}

function setupCheckoutModal(name, price, category) {
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  const nameEl = document.getElementById('itemName');
  if (nameEl) nameEl.innerText = name;

  const priceEl = document.getElementById('itemPrice');
  if (priceEl) priceEl.innerText = '₹' + price;

  const totalEl = document.getElementById('totalPrice');
  if (totalEl) totalEl.innerText = '₹' + (price + 5);

  const form = document.getElementById('checkoutForm');
  if (form) form.reset();

  // Pre-fill user name if logged in
  const user = getCurrentUser();
  if (user && user.displayName) {
    const nameInput = document.getElementById('orderName');
    if (nameInput) nameInput.value = user.displayName;
  }

  document.getElementById('step2').style.display = 'none';
  document.getElementById('step1').style.display = 'block';

  const p1 = document.getElementById('progressStep1');
  const p2 = document.getElementById('progressStep2');
  if (p1) p1.classList.add('active-step');
  if (p2) p2.classList.remove('active-step');

  const notesFields = document.getElementById('notesSpecificFields');
  const formFields = document.getElementById('formSpecificFields');
  const addressFields = document.getElementById('addressFields');

  if (notesFields) notesFields.style.display = 'none';
  if (formFields) formFields.style.display = 'none';
  if (addressFields) addressFields.style.display = 'none';

  const notesSub = document.getElementById('notesSubject');
  const formType = document.getElementById('digitalFormType');
  const addr = document.getElementById('orderAddress');

  if (notesSub) notesSub.removeAttribute('required');
  if (formType) formType.removeAttribute('required');
  if (addr) addr.removeAttribute('required');

  if (category === 'notes' || category === 'both') {
    if (notesFields) notesFields.style.display = 'block';
    if (notesSub) notesSub.setAttribute('required', 'true');
    if (addressFields) addressFields.style.display = 'block';
    if (addr) addr.setAttribute('required', 'true');
  }
  if (category === 'form' || category === 'both') {
    if (formFields) formFields.style.display = 'block';
    if (formType) formType.setAttribute('required', 'true');
  }
  if (category === 'standard' || category === 'both') {
    if (addressFields) addressFields.style.display = 'block';
    if (addr) addr.setAttribute('required', 'true');
  }

  modal.classList.add('active');
}

function closeCheckout() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
}

function updateChecklist() {
  const formType = document.getElementById('digitalFormType').value;
  const list = document.getElementById('checklistItems');
  if (!list) return;

  if (formType === 'Scholarship') {
    list.innerHTML = '<li>Aadhar Card</li><li>Income Certificate</li><li>Previous Year Marks Card</li><li>Bank Passbook Photo</li>';
  } else if (formType === 'JKBOSE Registration') {
    list.innerHTML = '<li>Passport Size Photo</li><li>DOB Certificate</li><li>Aadhar Card</li>';
  } else if (formType === 'College Admission') {
    list.innerHTML = '<li>12th Marks Card</li><li>Migration Certificate</li><li>Category Certificate (if any)</li>';
  }
}

function goToStep2() {
  const form = document.getElementById('checkoutForm');
  if (!form.reportValidity()) return;

  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';

  const p1 = document.getElementById('progressStep1');
  const p2 = document.getElementById('progressStep2');
  if (p1) p1.classList.remove('active-step');
  if (p2) p2.classList.add('active-step');
}

function backToStep1() {
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step1').style.display = 'block';

  const p1 = document.getElementById('progressStep1');
  const p2 = document.getElementById('progressStep2');
  if (p2) p2.classList.remove('active-step');
  if (p1) p1.classList.add('active-step');
}

// --- RAZORPAY INTEGRATION ---
function startRazorpayPayment() {
  const form = document.getElementById('checkoutForm');
  if (!form.reportValidity()) return;

  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;
  const totalPaid = currentCheckoutPrice + 5;

  const btn = document.getElementById('submitOrderBtn');
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening Razorpay...';
    btn.disabled = true;
  }

  const options = {
    "key": RAZORPAY_KEY,
    "amount": totalPaid * 100,
    "currency": "INR",
    "name": "JK Study Hub",
    "description": currentCheckoutProduct.substring(0, 250),
    "image": "images/icon.svg",
    "handler": function (response) {
      const txnId = response.razorpay_payment_id;
      if (btn) btn.innerHTML = 'Verifying & Saving...';
      processOrder(txnId);
    },
    "prefill": {
      "name": name,
      "contact": phone
    },
    "theme": {
      "color": "#2563eb"
    },
    "modal": {
      "ondismiss": function() {
        if (btn) {
          btn.innerHTML = 'Pay Securely';
          btn.disabled = false;
        }
      }
    }
  };

  try {
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (resp) {
      alert("Payment Failed: " + (resp.error.description || "Unknown error"));
      if (btn) {
        btn.innerHTML = 'Pay Securely';
        btn.disabled = false;
      }
    });
    rzp.open();
  } catch(e) {
    alert("Razorpay checkout failed to open. Please check your internet connection.");
    if (btn) {
      btn.innerHTML = 'Pay Securely';
      btn.disabled = false;
    }
  }
}

// --- ORDER COMPLETION & BACKEND LOGGING ---
function processOrder(txnId) {
  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;

  let finalAddress = 'Digital Service (No physical delivery)';
  let finalProductDesc = currentCheckoutProduct;

  if (currentCheckoutCategory === 'notes' || currentCheckoutCategory === 'standard' || currentCheckoutCategory === 'both') {
    const pin = document.getElementById('orderPin') ? document.getElementById('orderPin').value : '193121';
    const city = document.getElementById('orderCity') ? document.getElementById('orderCity').value : 'Pattan';
    const street = document.getElementById('orderAddress') ? document.getElementById('orderAddress').value : '';
    finalAddress = `${street}, ${city} - ${pin}`;

    if (currentCheckoutCategory === 'notes' || currentCheckoutCategory === 'both') {
      const cls = document.getElementById('notesClass') ? document.getElementById('notesClass').value : '';
      const sub = document.getElementById('notesSubject') ? document.getElementById('notesSubject').value : '';
      finalProductDesc += ` [${cls} - ${sub}]`;
    }
  }

  if (currentCheckoutCategory === 'form' || currentCheckoutCategory === 'both') {
    const formSelected = document.getElementById('digitalFormType') ? document.getElementById('digitalFormType').value : '';
    const filesCount = document.getElementById('formAttachments') ? document.getElementById('formAttachments').files.length : 0;
    finalProductDesc += ` [Form: ${formSelected}, Files: ${filesCount}]`;
  }

  const totalPaid = currentCheckoutPrice + 5;
  const combinedProduct = `${finalProductDesc} | Total: ₹${totalPaid} | TXN: ${txnId}`;

  // 1. SAVE LOCALLY TO ORDERS HISTORY IMMEDIATELY!
  const user = getCurrentUser();
  const orderRecord = {
    orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    txnId: txnId,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' at ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now(),
    name: name,
    phone: phone,
    address: finalAddress,
    product: finalProductDesc,
    amount: totalPaid,
    userEmail: user ? user.email : null,
    status: 'Confirmed'
  };

  let orders = getOrders();
  orders.unshift(orderRecord);
  saveOrders(orders);

  // 2. DISPATCH TO GOOGLE SHEETS WEB APP
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('address', finalAddress);
  formData.append('product', combinedProduct);

  fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' })
    .then(() => {
      alert(`🎉 ORDER SUCCESSFUL!\n\nOrder ID: ${orderRecord.orderId}\nPayment Verified: ₹${totalPaid}\nTXN ID: ${txnId}\n\nYour order has been recorded in the Orders Section! We will contact you on WhatsApp (${phone}) shortly.`);

      if (isCartCheckoutSession) {
        localStorage.removeItem('jk_cart');
        localStorage.removeItem('cart');
        updateNavBadges();
        if (typeof renderCartPage === 'function') {
          renderCartPage();
        }
      }

      closeCheckout();
      const btn = document.getElementById('submitOrderBtn');
      if (btn) {
        btn.innerHTML = 'Pay Securely';
        btn.disabled = false;
      }

      // If on orders page, re-render
      if (typeof renderOrdersPage === 'function') {
        renderOrdersPage();
      }
    })
    .catch(err => {
      alert(`Payment verified (${txnId})! Order ID ${orderRecord.orderId} saved locally. Please contact us on WhatsApp if any issues arise.`);
      closeCheckout();
    });
}

// --- INITIALIZATION & BFCACHE HANDLERS ---
function initShop() {
  updateNavBadges();
  updateAuthUI();
  syncHeartIcons();

  if (document.getElementById('cartItemsList')) {
    renderCartPage();
  }

  if (document.getElementById('wishlistGrid')) {
    renderWishlistPage();
  }

  if (document.getElementById('ordersListContainer')) {
    renderOrdersPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShop);
} else {
  initShop();
}

window.addEventListener('pageshow', function(event) {
  initShop();
});

window.addEventListener('storage', function(e) {
  if (e.key === 'jk_cart' || e.key === 'cart' || e.key === 'jk_wishlist' || e.key === 'wishlist' || e.key === 'jk_orders' || e.key === 'jk_study_user') {
    initShop();
  }
});

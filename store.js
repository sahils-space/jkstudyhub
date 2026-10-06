// JK STUDY HUB - MASTER E-COMMERCE ENGINE v3.0
// Cart, Wishlist, Orders Tracking, Unified Google Auth & Razorpay Live Integration

const RAZORPAY_KEY = "rzp_live_TjJ6bv39yo6Gds";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec";

// Master Catalog
const PRODUCT_CATALOG = {
  "Atomic Habits": {
    author: "James Clear",
    mrp: 499,
    price: 249,
    category: "books",
    badge: "Bestseller #1",
    rating: "4.9",
    reviews: "1.2k",
    image: "images/books/atomic-habits-1.webp",
    images: ["images/books/atomic-habits-1.webp", "images/books/atomic-habits-2.webp", "images/books/atomic-habits-3.webp", "images/books/atomic-habits-4.webp"],
    desc: "An easy and proven way to build good habits and break bad ones. The #1 self-discipline handbook for students and high achievers.",
    specs: {
      length: "19.8 cm",
      width: "12.9 cm",
      thickness: "2.4 cm",
      pages: "320 pgs",
      paper: "70 GSM Cream Paper",
      binding: "Paperback",
      language: "English"
    }
  },
  "The Psychology of Money": {
    author: "Morgan Housel",
    mrp: 399,
    price: 220,
    category: "books",
    badge: "Youth Favorite",
    rating: "4.8",
    reviews: "950",
    image: "images/books/psychology-of-money-1.webp",
    images: ["images/books/psychology-of-money-1.webp", "images/books/psychology-of-money-2.webp", "images/books/psychology-of-money-3.webp", "images/books/psychology-of-money-4.webp"],
    desc: "Timeless lessons on wealth, greed, and happiness. Crucial financial wisdom every young student should understand before college.",
    specs: {
      length: "19.8 cm",
      width: "12.9 cm",
      thickness: "2.0 cm",
      pages: "256 pgs",
      paper: "70 GSM Cream Paper",
      binding: "Paperback",
      language: "English"
    }
  },
  "Deep Work": {
    author: "Cal Newport",
    mrp: 499,
    price: 240,
    category: "books",
    badge: "Exam Prep Must-Have",
    rating: "4.8",
    reviews: "820",
    image: "images/books/deep-work-1.webp",
    images: ["images/books/deep-work-1.webp", "images/books/deep-work-2.webp", "images/books/deep-work-3.webp", "images/books/deep-work-4.webp"],
    desc: "Rules for focused success in a distracted world. Master deep study concentration for NEET, JEE, and competitive exams.",
    specs: {
      length: "19.8 cm",
      width: "12.8 cm",
      thickness: "2.2 cm",
      pages: "304 pgs",
      paper: "70 GSM Natural Paper",
      binding: "Paperback",
      language: "English"
    }
  },
  "The Alchemist": {
    author: "Paulo Coelho",
    mrp: 350,
    price: 180,
    category: "books",
    badge: "Inspiring Classic",
    rating: "4.9",
    reviews: "2.1k",
    image: "images/books/the-alchemist-1.webp",
    images: ["images/books/the-alchemist-1.webp", "images/books/the-alchemist-2.webp", "images/books/the-alchemist-3.webp", "images/books/the-alchemist-4.webp"],
    desc: "A magical fable about following your dream. Beautiful, simple English prose that boosts reading fluency and vocabulary.",
    specs: {
      length: "19.8 cm",
      width: "12.9 cm",
      thickness: "1.6 cm",
      pages: "208 pgs",
      paper: "70 GSM Soft White",
      binding: "Paperback",
      language: "English"
    }
  },
  "The Kite Runner": {
    author: "Khaled Hosseini",
    mrp: 499,
    price: 260,
    category: "books",
    badge: "Epic Masterpiece",
    rating: "4.9",
    reviews: "1.8k",
    image: "images/books/the-kite-runner-1.webp",
    images: ["images/books/the-kite-runner-1.webp", "images/books/the-kite-runner-2.webp", "images/books/the-kite-runner-3.webp", "images/books/the-kite-runner-4.webp"],
    desc: "An unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father's servant in Afghanistan.",
    specs: {
      length: "19.8 cm",
      width: "12.9 cm",
      thickness: "2.6 cm",
      pages: "384 pgs",
      paper: "70 GSM Cream Paper",
      binding: "Paperback",
      language: "English"
    }
  },
  "A Thousand Splendid Suns": {
    author: "Khaled Hosseini",
    mrp: 499,
    price: 260,
    category: "books",
    badge: "Emotional Journey",
    rating: "4.9",
    reviews: "1.5k",
    image: "images/books/thousand-splendid-suns-1.webp",
    images: ["images/books/thousand-splendid-suns-1.webp", "images/books/thousand-splendid-suns-2.webp", "images/books/thousand-splendid-suns-3.webp", "images/books/thousand-splendid-suns-4.webp"],
    desc: "A breathtaking story of two women brought together by war and tragedy in Kabul. Unputdownable modern literature.",
    specs: {
      length: "19.8 cm",
      width: "12.9 cm",
      thickness: "2.8 cm",
      pages: "432 pgs",
      paper: "70 GSM Cream Paper",
      binding: "Paperback",
      language: "English"
    }
  },
  "Secrets of Divine Love": {
    author: "A. Helwa",
    mrp: 599,
    price: 299,
    category: "books",
    badge: "Spiritual Bestseller",
    rating: "4.9",
    reviews: "1.3k",
    image: "images/books/secrets-of-divine-love-1.webp",
    images: ["images/books/secrets-of-divine-love-1.webp", "images/books/secrets-of-divine-love-2.webp", "images/books/secrets-of-divine-love-3.webp", "images/books/secrets-of-divine-love-4.webp"],
    desc: "A heart-centered, practical guide to using the Quran and Islamic spirituality to awaken divine love, peace, and hope.",
    specs: {
      length: "21.6 cm",
      width: "14.0 cm",
      thickness: "2.6 cm",
      pages: "400 pgs",
      paper: "80 GSM Royal White",
      binding: "Paperback",
      language: "English"
    }
  },
  "Reclaim Your Heart": {
    author: "Yasmin Mogahed",
    mrp: 450,
    price: 250,
    category: "books",
    badge: "Mental Peace Guide",
    rating: "4.8",
    reviews: "920",
    image: "images/books/reclaim-your-heart-1.webp",
    images: ["images/books/reclaim-your-heart-1.webp", "images/books/reclaim-your-heart-2.webp", "images/books/reclaim-your-heart-3.webp", "images/books/reclaim-your-heart-4.webp"],
    desc: "Manual on freeing the heart from life's attachments, overcoming emotional pain, and staying mentally strong as a student.",
    specs: {
      length: "20.3 cm",
      width: "13.3 cm",
      thickness: "1.8 cm",
      pages: "240 pgs",
      paper: "70 GSM Cream Paper",
      binding: "Paperback",
      language: "English"
    }
  },
  "Wings of Fire": {
    author: "A.P.J. Abdul Kalam",
    mrp: 395,
    price: 199,
    category: "books",
    badge: "National Inspiration",
    rating: "4.9",
    reviews: "3.4k",
    image: "images/books/wings-of-fire-1.webp",
    images: ["images/books/wings-of-fire-1.webp", "images/books/wings-of-fire-2.webp", "images/books/wings-of-fire-3.webp", "images/books/wings-of-fire-4.webp"],
    desc: "Inspiring autobiography of Dr. Kalam—from a humble boy in Rameswaram to leading India's space and missile programs.",
    specs: {
      length: "19.8 cm",
      width: "13.0 cm",
      thickness: "1.5 cm",
      pages: "180 pgs",
      paper: "70 GSM Soft White",
      binding: "Paperback",
      language: "English"
    }
  },
  "Lucent's General Knowledge": {
    author: "Lucent Publication",
    mrp: 420,
    price: 250,
    category: "books",
    badge: "Exam Rank Booster",
    rating: "4.7",
    reviews: "4.1k",
    image: "images/books/lucent-gk-1.webp",
    images: ["images/books/lucent-gk-1.webp", "images/books/lucent-gk-2.webp", "images/books/lucent-gk-3.webp", "images/books/lucent-gk-4.webp"],
    desc: "Essential handbook covering Indian History, Polity, Geography, Economy, and General Science. The Bible for JKSSB & SSC exams.",
    specs: {
      length: "24.0 cm",
      width: "18.0 cm",
      thickness: "2.8 cm",
      pages: "450 pgs",
      paper: "65 GSM Crisp White",
      binding: "Paperback",
      language: "English"
    }
  },
  "Wren & Martin English Grammar": {
    author: "P.C. Wren & H. Martin",
    mrp: 550,
    price: 290,
    category: "books",
    badge: "Grammar Foundation",
    rating: "4.9",
    reviews: "2.8k",
    image: "images/books/wren-martin-1.webp",
    images: ["images/books/wren-martin-1.webp", "images/books/wren-martin-2.webp", "images/books/wren-martin-3.webp", "images/books/wren-martin-4.webp"],
    desc: "High School English Grammar and Composition. Comprehensive rules, sentence structures, vocabulary, and writing techniques.",
    specs: {
      length: "24.0 cm",
      width: "18.0 cm",
      thickness: "3.2 cm",
      pages: "520 pgs",
      paper: "70 GSM Natural White",
      binding: "Paperback",
      language: "English"
    }
  },

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
    image: "images/spiral-copies.webp"
  },
  "Geometry Box Pro": {
    price: 170,
    category: "standard",
    image: "images/geometry-box.webp"
  },
  "The Holy Quran": {
    price: 200,
    category: "standard",
    image: "images/quran.webp"
  },
  "Beautiful Gift Diary": {
    price: 99,
    category: "standard",
    image: "images/diary.webp"
  },
  "Premium Pen Set": {
    price: 99,
    category: "standard",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=500"
  },
  "Desk Pen Stand": {
    price: 149,
    category: "standard",
    image: "images/pen-stand.webp"
  },
  "Folding Study Table": {
    price: 490,
    category: "standard",
    image: "images/study-table.webp"
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

function getValidCustomerPhone(order) {
  if (!order) return '';
  
  // 1. Check order.phone (exclude fixed pincode 193121)
  const raw = String(order.phone || '').trim();
  const digits = raw.replace(/\D/g, '');
  if (digits !== '193121' && digits.length >= 10) {
    const m = digits.match(/[6789]\d{9}$/);
    if (m) return m[0];
  }
  
  // 2. Search other fields if phone was corrupted or shifted
  const candidates = [order.name, order.address, order.product, order.orderId];
  for (let c of candidates) {
    const text = String(c || '').trim();
    const m = text.match(/[6789]\d{9}/);
    if (m && m[0] !== '193121') {
      return m[0];
    }
  }
  return '';
}

function autoHealOrders(orders) {
  if (!Array.isArray(orders)) return [];
  let changed = false;
  orders.forEach(order => {
    const cleanDigits = String(order.phone || '').replace(/\D/g, '');
    // If phone is just pincode 193121 or invalid length
    if (cleanDigits === '193121' || !cleanDigits.match(/^[6789]\d{9}$/)) {
      const fixed = getValidCustomerPhone(order);
      if (fixed) {
        order.phone = fixed;
        changed = true;
      }
    }
    // If order.name was accidentally saved as a mobile number, fix name
    if (String(order.name || '').match(/^[6789]\d{9}$/) && order.orderId && !order.orderId.startsWith('ORD-')) {
      order.name = order.orderId;
      changed = true;
    }
  });
  if (changed) {
    try {
      localStorage.setItem('jk_orders', JSON.stringify(orders));
    } catch(e) {}
  }
  return orders;
}

function getOrders() {
  try {
    const raw = localStorage.getItem('jk_orders');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const orders = autoHealOrders(Array.isArray(parsed) ? parsed : []);
    
    // Permanently enforce Delivered and Cancelled states across reloads
    try {
      const locked = JSON.parse(localStorage.getItem('jk_locked_orders') || '{}');
      orders.forEach(o => {
        if (locked[o.orderId]) {
          o.status = locked[o.orderId];
        }
      });
    } catch(e) {}
    
    return orders;
  } catch(e) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem('jk_orders', JSON.stringify(orders));
  updateNavBadges();
}

function getCurrentUser() {
  if (window.currentUser) return window.currentUser;
  try {
    return JSON.parse(localStorage.getItem('jk_study_user') || 'null');
  } catch(e) {
    return null;
  }
}

function setCurrentUser(user) {
  window.currentUser = user;
  if (user) {
    try { localStorage.setItem('jk_study_user', JSON.stringify(user)); } catch(e) {}
  } else {
    try { localStorage.removeItem('jk_study_user'); } catch(e) {}
  }
  updateAuthUI();
  updateNavBadges();
  if (typeof renderAccountDashboard === 'function') {
    renderAccountDashboard();
  }
}

// --- NAV BADGES UPDATER ---
function updateNavBadges() {
  const cart = getCart();
  const wishlist = getWishlist();
  const orders = getOrders();
  const user = getCurrentUser();
  const role = getUserStoreRole(user);
  const isStaff = (role === 'owner' || role === 'delivery' || sessionStorage.getItem('jk_admin_unlocked') === 'true');
  
  let userOrders = orders;
  if (!isStaff && user) {
    const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    const uEmail = String(user.email || '').trim().toLowerCase();
    userOrders = orders.filter(o => {
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      const oEmail = String(o.userEmail || '').trim().toLowerCase();
      if (uPhone && oPhone === uPhone) return true;
      if (uEmail && oEmail === uEmail) return true;
      return false;
    });
  }
  
  const totalOrdersCount = isStaff ? orders.length : userOrders.length;
  const totalCartQty = cart.reduce((acc, item) => acc + (parseInt(item.qty) || 1), 0);
  const totalWishlistCount = wishlist.length;

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
            <a href="account.html#orders" style="display: flex; align-items: center; gap: 8px; color: #334155; text-decoration: none; padding: 8px; border-radius: 6px; font-size: 13px; font-weight: 600;">
              <i class="fa-solid fa-box" style="color: #10b981;"></i> My Orders
            </a>
            <a href="account.html#wishlist" style="display: flex; align-items: center; gap: 8px; color: #334155; text-decoration: none; padding: 8px; border-radius: 6px; font-size: 13px; font-weight: 600;">
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
        <button type="button" onclick="openPhoneAuthModal()" class="store-nav-btn" style="background: #ffffff; border: 1px solid #cbd5e1; color: #1e293b; font-weight: 700; padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
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

  showToast(`❤️ Saved "${item.name}" to Wishlist!`, 'account.html#wishlist', 'View Wishlist ➔');
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
    showToast(`❤️ Saved to Wishlist!`, 'account.html#wishlist', 'View Wishlist ➔');
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
    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 12px 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap:wrap; gap:8px;">
      <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #1e40af;">
        <i class="fa-solid fa-location-dot" style="font-size: 16px;"></i>
        <span>Deliver to: <strong>All Kashmir Districts &amp; Pincodes</strong></span>
      </div>
      <span style="font-size: 11px; background: #dcfce7; color: #16a34a; font-weight: 800; padding: 4px 10px; border-radius: 20px;"><i class="fa-solid fa-gift"></i> 100% FREE DELIVERY</span>
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
  if (totalEl) totalEl.innerText = '₹' + subtotal;

  const itemsCountText = document.getElementById('summaryItemsCount');
  if (itemsCountText) itemsCountText.innerText = `Price (${totalQty} items)`;

  const checkoutBtn = document.getElementById('proceedCheckoutBtn');
  if (checkoutBtn) checkoutBtn.innerText = `Proceed to Checkout (₹${subtotal}) ➔`;
}

// --- RENDER DEDICATED WISHLIST PAGE (account.html#wishlist) ---
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

// --- LIVE DELIVERY TRACKER & ORDERS ENGINE (STEP 2) ---
let currentOrderFilter = 'all'; // 'all', 'active', 'delivered'
let currentOrderSearchQuery = '';

function getStatusStepInfo(rawStatus) {
  const s = String(rawStatus || 'Confirmed').trim().toLowerCase();
  
  if (s.includes('cancel')) {
    return {
      step: -1,
      label: 'Order Cancelled',
      percent: 0,
      badgeBg: '#fee2e2',
      badgeColor: '#b91c1c',
      badgeBorder: '#fecaca',
      badgeIcon: 'fa-ban',
      summaryText: 'This order was cancelled. Please contact support on WhatsApp for queries.'
    };
  }
  if (s.includes('deliver') || s.includes('complete')) {
    return {
      step: 4,
      label: 'Delivered',
      percent: 100,
      badgeBg: '#dcfce7',
      badgeColor: '#15803d',
      badgeBorder: '#bbf7d0',
      badgeIcon: 'fa-house-circle-check',
      summaryText: 'Delivered successfully at customer doorstep in Pattan / Kashmir.'
    };
  }
  if (s.includes('out') || s.includes('route') || s.includes('pattan')) {
    return {
      step: 3,
      label: 'Out for Delivery (Pattan)',
      percent: 78,
      badgeBg: '#fef3c7',
      badgeColor: '#b45309',
      badgeBorder: '#fde68a',
      badgeIcon: 'fa-truck-fast',
      summaryText: 'Our delivery associate is on the way to your delivery address.'
    };
  }
  if (s.includes('dispatch') || s.includes('transit') || s.includes('ship') || s.includes('pack')) {
    return {
      step: 2,
      label: 'Dispatched from Hub',
      percent: 48,
      badgeBg: '#ede9fe',
      badgeColor: '#6d28d9',
      badgeBorder: '#ddd6fe',
      badgeIcon: 'fa-box-open',
      summaryText: 'Your order has been verified and dispatched from our Pattan Hub.'
    };
  }
  
  // Default: Confirmed & Paid
  return {
    step: 1,
    label: 'Order Confirmed & Paid',
    percent: 16,
    badgeBg: '#e0f2fe',
    badgeColor: '#0369a1',
    badgeBorder: '#bae6fd',
    badgeIcon: 'fa-circle-check',
    summaryText: 'Order confirmed and payment verified via Razorpay.'
  };
}

// --- AUTHORIZED STORE TEAM ROLES ---
// Sahil's Master Owner Credentials (Auto-detected on login):
const STORE_OWNER_PHONES = ['9622605714'];
const STORE_OWNER_EMAILS = ['sahilsspace20@gmail.com', 'info.jkstudyhub@gmail.com', 'admin@jkstudyhub.online'];

// Delivery Team Phones (Add your delivery boy numbers here anytime):
const DELIVERY_BOY_PHONES = [
  // '9876543210'
];

function getUserStoreRole(user) {
  if (!user) return 'student';
  const phone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
  const email = String(user.email || '').trim().toLowerCase();

  if (phone && STORE_OWNER_PHONES.some(p => p.slice(-10) === phone)) {
    return 'owner';
  }
  if (email && STORE_OWNER_EMAILS.includes(email)) {
    return 'owner';
  }
  if (phone && DELIVERY_BOY_PHONES.some(p => p.slice(-10) === phone)) {
    return 'delivery';
  }
  return 'student';
}

function isAdminUnlocked() {
  const user = getCurrentUser();
  const role = getUserStoreRole(user);
  if (role === 'owner' || role === 'delivery') return true;
  return sessionStorage.getItem('jk_admin_unlocked') === 'true';
}

let secretAdminClickCount = 0;
function handleSecretAdminClick() {
  secretAdminClickCount++;
  if (secretAdminClickCount >= 3) {
    secretAdminClickCount = 0;
    promptAdminLogin();
  }
}

function promptAdminLogin() {
  const pin = prompt("Enter JK Study Hub Admin PIN:", "");
  if (pin === "9622" || pin === "1234") {
    sessionStorage.setItem('jk_admin_unlocked', 'true');
    showToast("✅ Admin Mode Unlocked!");
    if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
  } else if (pin !== null) {
    alert("Incorrect Admin PIN.");
  }
}

function toggleAdminAccess() {
  const user = getCurrentUser();
  const role = getUserStoreRole(user);
  
  if (role === 'owner') {
    showToast("👑 You are signed in as Store Owner (Admin).");
    return;
  }
  if (role === 'delivery') {
    showToast("🚚 You are signed in as Delivery Partner.");
    return;
  }

  if (sessionStorage.getItem('jk_admin_unlocked') === 'true') {
    if (confirm("Lock Store Admin Mode?")) {
      sessionStorage.removeItem('jk_admin_unlocked');
      showToast("Store Admin Mode locked.");
      if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
    }
    return;
  }
  
  promptAdminLogin();
}

function updateOrderStatusByAdmin(orderId, newStatus) {
  let orders = getOrders();
  const idx = orders.findIndex(o => o.orderId === orderId);
  if (idx !== -1) {
    if (orders[idx].status === 'Delivered' || orders[idx].status === 'Cancelled') {
      showToast(`⚠️ Order is ${orders[idx].status} and cannot be modified.`);
      if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
      return;
    }

    orders[idx].status = newStatus;
    orders[idx].statusUpdatedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    
    // Permanently record locked status
    if (newStatus === 'Delivered' || newStatus === 'Cancelled') {
      try {
        let locked = JSON.parse(localStorage.getItem('jk_locked_orders') || '{}');
        locked[orderId] = newStatus;
        localStorage.setItem('jk_locked_orders', JSON.stringify(locked));
      } catch(e) {}
    }
    
    saveOrders(orders);
    
    // Sync update to Google Apps Script asynchronously
    if (SCRIPT_URL) {
      try {
        const updateData = new FormData();
        updateData.append('action', 'update_status');
        updateData.append('order_id', orderId);
        updateData.append('status', newStatus);
        fetch(SCRIPT_URL, { method: 'POST', body: updateData, mode: 'no-cors' }).catch(() => {});
      } catch(e) {}
    }
    
    showToast(`Status updated to: ${newStatus}`);
    if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
  }
}

function sendCustomerWhatsAppStatusUpdate(orderId) {
  let orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;
  
  let validPhone = getValidCustomerPhone(order);
  
  // If phone is missing, invalid, or was mistakenly set to pincode 193121
  if (!validPhone || validPhone.length !== 10) {
    const input = prompt(
      `Please confirm the 10-digit WhatsApp mobile number for ${order.name || 'this customer'} (Order: ${order.orderId}):`, 
      ""
    );
    if (!input) return;
    const match = input.match(/[6789]\d{9}/);
    if (!match) {
      alert("Invalid number! Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.");
      return;
    }
    validPhone = match[0];
    order.phone = validPhone;
    saveOrders(orders); // Permanently save so you never have to re-enter it!
  }
  
  const statusInfo = getStatusStepInfo(order.status);
  const customerName = (order.name && !order.name.match(/^[6789]\d{9}$/)) ? order.name : 'Student';
  
  const text = encodeURIComponent(
    `Dear ${customerName},\n\n` +
    `🚚 Update on your JK Study Hub Order #${order.orderId}:\n` +
    `Status: *${statusInfo.label}*\n` +
    `Items: ${order.product}\n` +
    `Delivery Location: ${order.address}\n\n` +
    `Thank you for studying with JK Study Hub, Pattan!`
  );
  
  window.open(`https://wa.me/91${validPhone}?text=${text}`, '_blank');
}

function handleOrderSearchInput(query) {
  currentOrderSearchQuery = (query || '').trim().toLowerCase();
  const clearBtn = document.getElementById('clearOrderFilterBtn');
  if (clearBtn) {
    clearBtn.style.display = currentOrderSearchQuery.length > 0 ? 'inline-flex' : 'none';
  }
  if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
}

function executeOrderSearch() {
  const input = document.getElementById('orderSearchInput');
  if (input) {
    currentOrderSearchQuery = input.value.trim().toLowerCase();
    const clearBtn = document.getElementById('clearOrderFilterBtn');
    if (clearBtn) clearBtn.style.display = currentOrderSearchQuery ? 'inline-flex' : 'none';
    if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
  }
}

function resetOrderSearch() {
  currentOrderSearchQuery = '';
  const input = document.getElementById('orderSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('clearOrderFilterBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
}

function setOrderStatusFilter(filter) {
  currentOrderFilter = filter;
  ['all', 'active', 'delivered'].forEach(f => {
    const el = document.getElementById('filterPill' + f.charAt(0).toUpperCase() + f.slice(1));
    if (el) {
      if (f === filter) el.classList.add('active');
      else el.classList.remove('active');
    }
  });
  if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
}

// --- RENDER DEDICATED ORDERS PAGE (account.html#orders) ---
function renderOrdersPage() {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  const user = getCurrentUser();
  const role = getUserStoreRole(user);
  const isStaff = (role === 'owner' || role === 'delivery' || sessionStorage.getItem('jk_admin_unlocked') === 'true');

  // Update Admin Toggle button state
  const adminBtn = document.getElementById('adminToggleBtn');
  if (adminBtn) {
    if (role === 'owner') {
      adminBtn.style.display = 'inline-flex';
      adminBtn.innerHTML = '<i class="fa-solid fa-crown" style="color: #f59e0b;"></i> Store Owner (Admin)';
      adminBtn.style.background = '#fef3c7';
      adminBtn.style.color = '#b45309';
      adminBtn.style.borderColor = '#fcd34d';
    } else if (role === 'delivery') {
      adminBtn.style.display = 'inline-flex';
      adminBtn.innerHTML = '<i class="fa-solid fa-truck" style="color: #2563eb;"></i> Delivery Partner';
      adminBtn.style.background = '#eff6ff';
      adminBtn.style.color = '#1e40af';
      adminBtn.style.borderColor = '#bfdbfe';
    } else if (sessionStorage.getItem('jk_admin_unlocked') === 'true') {
      adminBtn.style.display = 'inline-flex';
      adminBtn.innerHTML = '<i class="fa-solid fa-lock-open" style="color: #10b981;"></i> Admin Active (Exit)';
      adminBtn.style.background = '#dcfce7';
      adminBtn.style.color = '#15803d';
      adminBtn.style.borderColor = '#86efac';
    } else {
      // Normal students & visitors: completely HIDE the admin button!
      adminBtn.style.display = 'none';
    }
  }

  const allOrders = getOrders();
  
  // For normal logged-in students, only show THEIR orders!
  let baseOrders = allOrders;
  if (!isStaff && user) {
    const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    const uEmail = String(user.email || '').trim().toLowerCase();
    
    baseOrders = allOrders.filter(o => {
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      const oEmail = String(o.userEmail || '').trim().toLowerCase();
      if (uPhone && oPhone === uPhone) return true;
      if (uEmail && oEmail === uEmail) return true;
      return false;
    });
  }

  const countEl = document.getElementById('ordersHeaderCount');
  if (countEl) countEl.innerText = `${baseOrders.length} Orders`;

  if (baseOrders.length === 0) {
    container.innerHTML = `
      <div style="background: white; border-radius: 16px; padding: 60px 20px; text-align: center; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
        <div style="width: 90px; height: 90px; background: #f0fdf4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 38px; color: #10b981;">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h3 style="font-size: 22px; color: #1e293b; font-weight: 700; margin-bottom: 8px;">No Orders Found</h3>
        <p style="color: #64748b; font-size: 14px; max-width: 440px; margin: 0 auto 24px; line-height: 1.5;">When you purchase notes, printed PYQs, stationery, or book online form filling services, your order receipts, tracking numbers, and real-time delivery progress in Pattan will appear right here!</p>
        <a href="store.html" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">Explore Store</a>
      </div>
    `;
    return;
  }

  // Filter orders according to active tabs & search query
  let filtered = baseOrders.filter(order => {
    const info = getStatusStepInfo(order.status);
    
    // Status filter
    if (currentOrderFilter === 'active' && (info.step === 4 || info.step === -1)) {
      return false;
    }
    if (currentOrderFilter === 'delivered' && info.step !== 4) {
      return false;
    }
    
    // Search query filter
    if (currentOrderSearchQuery) {
      const q = currentOrderSearchQuery;
      const idMatch = (order.orderId || '').toLowerCase().includes(q);
      const phoneMatch = (order.phone || '').toLowerCase().includes(q);
      const nameMatch = (order.name || '').toLowerCase().includes(q);
      const productMatch = (order.product || '').toLowerCase().includes(q);
      const txnMatch = (order.txnId || '').toLowerCase().includes(q);
      if (!idMatch && !phoneMatch && !nameMatch && !productMatch && !txnMatch) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background: white; border-radius: 16px; padding: 50px 20px; text-align: center; border: 1px solid #e2e8f0; margin-top: 10px;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; color: #94a3b8; margin-bottom: 12px;"></i>
        <h4 style="font-size: 18px; color: #1e293b; font-weight: 700; margin: 0 0 8px;">No matching orders found</h4>
        <p style="color: #64748b; font-size: 13.5px; margin: 0 0 16px;">Try searching with your 6-digit Order ID (e.g. ORD-123456) or your 10-digit mobile number.</p>
        <button onclick="resetOrderSearch()" style="background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">Clear Search</button>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach((order, index) => {
    const safeOrderId = order.orderId || ('ORD-' + index);
    const statusInfo = getStatusStepInfo(order.status);
    const waMessage = encodeURIComponent(`Hi JK Study Hub, I am inquiring about my Order ${safeOrderId} (TXN: ${order.txnId}) for ${order.product}.`);
    
    // Step classes for Flipkart/Amazon stepper
    let s1Class = 'completed';
    let s2Class = statusInfo.step >= 2 ? 'completed' : (statusInfo.step === 1 ? 'active' : '');
    let s3Class = statusInfo.step >= 3 ? 'completed' : (statusInfo.step === 2 ? 'active' : '');
    let s4Class = statusInfo.step >= 4 ? 'completed' : (statusInfo.step === 3 ? 'active' : '');

    // Step descriptions
    let s2Desc = statusInfo.step >= 2 ? 'Dispatched' : 'Packed at Hub';
    let s3Desc = statusInfo.step >= 3 ? 'En Route (Pattan)' : 'Local Delivery';
    let s4Desc = statusInfo.step >= 4 ? 'Delivered' : 'Expected Shortly';

    const matchedBook = (typeof BOOK_CATALOG_DATA !== 'undefined' ? BOOK_CATALOG_DATA : []).find(b => order.product && order.product.includes(b.name)) || (PRODUCT_CATALOG[order.product] ? { image: PRODUCT_CATALOG[order.product].image } : null);
    const orderImgSrc = (matchedBook && matchedBook.photos && matchedBook.photos[0]) ? matchedBook.photos[0] : ((matchedBook && matchedBook.image) ? matchedBook.image : (order.image || ''));

    html += `
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: transform 0.2s ease;">
        
        <!-- Order Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <span style="font-family: monospace; font-size: 15px; font-weight: 800; color: #1e293b; background: #f1f5f9; padding: 5px 12px; border-radius: 6px; letter-spacing: 0.5px; border: 1px solid #e2e8f0;">
                ${safeOrderId}
              </span>
              <span style="font-size: 12.5px; color: #64748b;">
                <i class="fa-regular fa-calendar"></i> ${order.date}
              </span>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: ${statusInfo.badgeBg}; color: ${statusInfo.badgeColor}; border: 1px solid ${statusInfo.badgeBorder}; font-size: 12.5px; font-weight: 700; padding: 5px 14px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid ${statusInfo.badgeIcon}"></i> ${statusInfo.label}
            </span>
          </div>
        </div>

        <!-- FLIPKART / AMAZON LIVE DELIVERY STEPPER -->
        <div class="delivery-tracker-box">
          <div class="stepper-header-meta">
            <span style="font-weight: 700; color: #0f172a; font-size: 13.5px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-route" style="color: #2563eb;"></i> Live Delivery Progress
            </span>
            <span style="font-size: 12px; color: #64748b; font-weight: 600;">
              Destination: <strong style="color: #1e293b;">Pattan (193121)</strong>
            </span>
          </div>

          <div class="stepper-track-wrap">
            <div class="stepper-line-fill" style="width: ${statusInfo.percent}%;"></div>
            
            <!-- Step 1: Confirmed -->
            <div class="stepper-node ${s1Class}">
              <div class="node-icon"><i class="fa-solid fa-check"></i></div>
              <div class="node-title">Confirmed</div>
              <div class="node-desc">Paid Online</div>
            </div>

            <!-- Step 2: Dispatched -->
            <div class="stepper-node ${s2Class}">
              <div class="node-icon"><i class="fa-solid fa-box"></i></div>
              <div class="node-title">Dispatched</div>
              <div class="node-desc">${s2Desc}</div>
            </div>

            <!-- Step 3: Out for Delivery -->
            <div class="stepper-node ${s3Class}">
              <div class="node-icon"><i class="fa-solid fa-truck-fast"></i></div>
              <div class="node-title">Out for Delivery</div>
              <div class="node-desc">${s3Desc}</div>
            </div>

            <!-- Step 4: Delivered -->
            <div class="stepper-node ${s4Class}">
              <div class="node-icon"><i class="fa-solid fa-house-chimney-check"></i></div>
              <div class="node-title">Delivered</div>
              <div class="node-desc">${s4Desc}</div>
            </div>
          </div>
          
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed #e2e8f0; font-size: 12px; color: #475569; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-circle-info" style="color: #2563eb;"></i>
            <span>${statusInfo.summaryText}</span>
          </div>
        </div>

        <!-- Order Body -->
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; flex-wrap: wrap; margin-top: 16px;">
          <div style="display: flex; gap: 16px; align-items: flex-start; flex: 1; min-width: 250px;">
            ${orderImgSrc ? `<img src="${orderImgSrc}" alt="${order.product}" style="width: 65px; height: 85px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" loading="eager">` : ''}
            <div>
            <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 8px;">${order.product}</h4>
            <div style="font-size: 13px; color: #64748b; line-height: 1.6;">
              <p style="margin: 0;"><strong>Recipient:</strong> ${(order.name && !order.name.match(/^[6789]\d{9}$/)) ? order.name : 'Student'} (${getValidCustomerPhone(order) || order.phone || 'Contact via WhatsApp'})</p>
              <p style="margin: 4px 0 0;"><strong>Address:</strong> ${order.address}</p>
            </div>
            <div style="margin-top: 10px; font-size: 11.5px; color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; padding: 5px 12px; border-radius: 6px; display: inline-block;">
              <i class="fa-solid fa-shield-halved"></i> Razorpay Payment ID: <strong>${order.txnId}</strong>
            </div>
            </div>
          </div>

          <div style="text-align: right; min-width: 140px;">
            <div style="font-size: 12px; color: #64748b; font-weight: 600;">Total Paid</div>
            <div style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 2px;">₹${order.amount}</div>
            <span style="font-size: 11px; color: #16a34a; font-weight: 700; background: #f0fdf4; padding: 2px 8px; border-radius: 4px;">Verified Razorpay</span>
          </div>
        </div>

        <!-- Admin Controls Bar (Active if Admin Mode Unlocked) -->
        ${isAdminUnlocked() ? `
          <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 12px 14px; margin-top: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 12px; font-weight: 800; color: #1e293b;">
                <i class="fa-solid fa-user-shield" style="color: #2563eb;"></i> Admin Status Control:
              </span>
              <select onchange="updateOrderStatusByAdmin('${safeOrderId}', this.value)" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12.5px; font-weight: 600; background: white; color: #0f172a; cursor: pointer;">
                <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed & Paid</option>
                <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>Dispatched from Hub</option>
                <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery (Pattan)</option>
                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered Successfully</option>
                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </div>
            <div>
              <button type="button" onclick="sendCustomerWhatsAppStatusUpdate('${safeOrderId}')" style="background: #25d366; color: white; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                <i class="fa-brands fa-whatsapp"></i> Send WhatsApp Notice
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Order Action Footer -->
        <div style="border-top: 1px solid #f1f5f9; margin-top: 18px; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <button type="button" onclick="printOrderReceipt('${safeOrderId}')" style="background: #f1f5f9; color: #1e293b; border: 1px solid #e2e8f0; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <i class="fa-solid fa-file-invoice" style="color: #2563eb;"></i> View &amp; Print Receipt
          </button>
          
          <a href="https://wa.me/919622605714?text=${waMessage}" target="_blank" rel="noopener" style="background: #25d366; color: white; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 8px rgba(37,211,102,0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 16px;"></i> Track with WhatsApp Support
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- PRINTABLE TAX INVOICE & RECEIPT MODAL ---
function printOrderReceipt(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId) || orders[0];
  if (!order) return;

  const printableArea = document.getElementById('printableReceiptArea');
  if (!printableArea) return;

  const cleanAmount = parseFloat(order.amount) || 0;
  const itemSubtotal = Math.max(0, cleanAmount - 5);

  printableArea.innerHTML = `
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a; line-height: 1.5;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 18px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 800; margin: 0; color: #0f172a; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-graduation-cap" style="color: #2563eb;"></i> JK STUDY HUB
          </h2>
          <p style="margin: 3px 0 0; font-size: 12px; color: #475569;">Baramulla, Jammu &amp; Kashmir - 193121</p>
          <p style="margin: 2px 0 0; font-size: 12px; color: #475569;">Email: info.jkstudyhub@gmail.com | Phone: +91 9622605714</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 11px; font-weight: 800; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 20px; display: inline-block;">
            OFFICIAL PAID RECEIPT
          </span>
          <p style="margin: 5px 0 0; font-family: monospace; font-size: 14px; font-weight: 800; color: #0f172a;">${order.orderId}</p>
          <p style="margin: 2px 0 0; font-size: 11.5px; color: #64748b;">${order.date}</p>
        </div>
      </div>

      <!-- Customer & Delivery Meta -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; background: #f8fafc; padding: 14px 16px; border-radius: 8px; border: 1px solid #e2e8f0; gap: 15px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Student / Recipient:</div>
          <div style="font-weight: 700; font-size: 14px; margin-top: 3px; color: #0f172a;">${order.name}</div>
          <div style="color: #475569; margin-top: 2px;">Phone: +91 ${order.phone}</div>
          <div style="color: #475569; margin-top: 2px;">Location: ${order.address}</div>
        </div>
        <div style="text-align: right; min-width: 160px;">
          <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Payment Details:</div>
          <div style="font-weight: 700; color: #16a34a; margin-top: 3px;">PAID via Razorpay Online</div>
          <div style="font-family: monospace; font-size: 11px; color: #475569; margin-top: 2px;">TXN ID: ${order.txnId}</div>
          <div style="font-size: 11.5px; color: #2563eb; font-weight: 600; margin-top: 2px;">Delivery: Pattan (193121)</div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
        <thead>
          <tr style="background: #0f172a; color: white;">
            <th style="padding: 9px 12px; text-align: left; border-radius: 6px 0 0 6px;">Item Description</th>
            <th style="padding: 9px 12px; text-align: center;">Qty</th>
            <th style="padding: 9px 12px; text-align: right; border-radius: 0 6px 6px 0;">Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: 600; color: #1e293b;">${order.product}</td>
            <td style="padding: 12px; text-align: center;">1</td>
            <td style="padding: 12px; text-align: right; font-weight: 700;">₹${itemSubtotal}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <td style="padding: 8px 12px;">Local Pattan Handling &amp; Verification Fee</td>
            <td style="padding: 8px 12px; text-align: center;">1</td>
            <td style="padding: 8px 12px; text-align: right; font-weight: 600;">₹5</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 14px 12px 6px; font-weight: 800; font-size: 15px; text-align: right;">Grand Total:</td>
            <td style="padding: 14px 12px 6px; font-weight: 800; font-size: 18px; text-align: right; color: #2563eb;">₹${order.amount}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Footer Seal & Disclaimer -->
      <div style="border-top: 1px dashed #cbd5e1; padding-top: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div style="font-size: 11px; color: #64748b; max-width: 320px; line-height: 1.4;">
          This is an electronically generated receipt for your purchase on JK Study Hub. Authorized and verified for Pattan delivery.
        </div>
        <div style="text-align: center; border: 2px dashed #10b981; padding: 6px 14px; border-radius: 8px; color: #10b981; font-weight: 800; font-size: 11px; transform: rotate(-2deg);">
          ✓ VERIFIED PAID ORDER<br><span style="font-size: 9px; font-weight: 600; color: #475569;">JK STUDY HUB PATTAN</span>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('orderReceiptModal');
  if (modal) modal.style.display = 'flex';
}

function triggerPrintReceipt() {
  const printableArea = document.getElementById('printableReceiptArea');
  if (!printableArea) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - JK Study Hub</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 30px; margin: 0; background: #fff; }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      ${printableArea.innerHTML}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 400);
}

function closeReceiptModal() {
  const modal = document.getElementById('orderReceiptModal');
  if (modal) modal.style.display = 'none';
}

// --- GOOGLE SHEETS LIVE SYNC BACKGROUND WORKER ---
function syncOrdersWithGoogleSheet() {
  if (!SCRIPT_URL) return;

  const user = getCurrentUser();
  const role = getUserStoreRole(user);
  const isStaff = (role === 'owner' || role === 'delivery' || sessionStorage.getItem('jk_admin_unlocked') === 'true');
  
  let fetchUrl = SCRIPT_URL + '?action=get_orders';
  if (!isStaff) {
    if (!user) return; // Don't download orders if not logged in
    const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    if (!uPhone) return;
    fetchUrl += '&phone=' + encodeURIComponent(uPhone);
  }

  // Background fetch without blocking UI
  try {
    fetch(fetchUrl + (fetchUrl.includes('?') ? '&' : '?') + 't=' + Date.now(), { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success' && Array.isArray(data.orders)) {
          let localOrders = isStaff ? getOrders() : []; // If student, strictly mirror the backend array for privacy
          let updated = false;

          data.orders.forEach(remote => {
            const match = localOrders.find(l => l.orderId === remote.orderId || (l.txnId && l.txnId === remote.txnId));
            
            // Clean remote phone
            let cleanRemotePhone = '';
            const m = String(remote.phone || '').match(/[6789]\d{9}/);
            if (m && m[0] !== '193121') {
              cleanRemotePhone = m[0];
            } else {
              const m2 = String(remote.name || '').match(/[6789]\d{9}/);
              if (m2) cleanRemotePhone = m2[0];
            }

            if (match) {
              const isLocallyLocked = (match.status === 'Delivered' || match.status === 'Cancelled');
              if (!isLocallyLocked && remote.status && remote.status !== match.status) {
                match.status = remote.status;
                updated = true;
              }
              // If local phone is invalid or pincode, but remote has a valid phone, heal it
              if (cleanRemotePhone && String(match.phone || '').includes('193121')) {
                match.phone = cleanRemotePhone;
                updated = true;
              }
            } else if (remote.orderId) {
              localOrders.push({
                orderId: remote.orderId,
                txnId: remote.txnId || 'N/A',
                date: remote.timestamp || new Date().toLocaleDateString('en-IN'),
                timestamp: Date.now(),
                name: (remote.name && !remote.name.match(/^[6789]\d{9}$/)) ? remote.name : 'Student',
                phone: cleanRemotePhone,
                address: remote.address || 'Pattan - 193121',
                product: remote.product || 'Study Hub Purchase',
                amount: parseFloat(remote.amount) || 0,
                status: remote.status || 'Confirmed'
              });
              updated = true;
            }
          });

          if (updated) {
            localStorage.setItem('jk_orders', JSON.stringify(localOrders));
            updateNavBadges();
            if (typeof renderOrdersPage === 'function') {
              if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
            }
          }
        }
      })
      .catch(() => {
        // Silent fallback to local storage
      });
  } catch(e) {}
}

// Trigger live sync on page show
window.addEventListener('pageshow', function() {
  syncOrdersWithGoogleSheet();
});

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
  if (totalEl) totalEl.innerText = '₹' + price;

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
  if (category === 'standard' || category === 'both' || category === 'books') {
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

// --- PAYMENT METHOD TOGGLE (ONLINE VS CASH ON DELIVERY) ---
function togglePaymentMethod(method) {
  const onlineLabel = document.getElementById('payMethodOnlineLabel');
  const codLabel = document.getElementById('payMethodCodLabel');
  const submitBtn = document.getElementById('submitOrderBtn');
  const note = document.getElementById('checkoutFooterNote');

  if (method === 'cod') {
    if (onlineLabel) onlineLabel.style.border = '1.5px solid #cbd5e1';
    if (codLabel) codLabel.style.border = '2px solid #16a34a';
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> Confirm Order (Cash on Delivery)';
      submitBtn.style.backgroundColor = '#16a34a';
    }
    if (note) {
      note.innerHTML = '<i class="fa-solid fa-truck-fast" style="color:#16a34a;"></i> Pay cash or UPI scan at your doorstep when books arrive!';
    }
  } else {
    if (onlineLabel) onlineLabel.style.border = '2px solid #2563eb';
    if (codLabel) codLabel.style.border = '1.5px solid #cbd5e1';
    if (submitBtn) {
      submitBtn.innerHTML = 'Pay Securely Online';
      submitBtn.style.backgroundColor = '#2563eb';
    }
    if (note) {
      note.innerHTML = '<i class="fa-solid fa-shield-halved" style="color:#2563eb;"></i> 100% Genuine Books • Priority Fast Dispatch via Razorpay';
    }
  }
}

function handlePaymentSubmit() {
  const method = document.querySelector('input[name="paymentMethod"]:checked') ? document.querySelector('input[name="paymentMethod"]:checked').value : 'online';
  if (method === 'cod') {
    processCodOrder();
  } else {
    startRazorpayPayment();
  }
}

function processCodOrder() {
  const form = document.getElementById('checkoutForm');
  if (!form.reportValidity()) return;

  const btn = document.getElementById('submitOrderBtn');
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming COD Order...';
    btn.disabled = true;
  }

  const codTxnId = 'COD_' + Date.now().toString(36).toUpperCase();
  processOrder(codTxnId, 'Confirmed (Cash on Delivery)');
}

// --- RAZORPAY INTEGRATION ---
function startRazorpayPayment() {
  const form = document.getElementById('checkoutForm');
  if (!form.reportValidity()) return;

  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;
  const totalPaid = currentCheckoutPrice;

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
      processOrder(txnId, 'Confirmed (Paid Online)');
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
          btn.innerHTML = 'Pay Securely Online';
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
        btn.innerHTML = 'Pay Securely Online';
        btn.disabled = false;
      }
    });
    rzp.open();
  } catch(e) {
    alert("Razorpay checkout failed to open. Please check your internet connection.");
    if (btn) {
      btn.innerHTML = 'Pay Securely Online';
      btn.disabled = false;
    }
  }
}

// --- ORDER COMPLETION & BACKEND LOGGING ---
function processOrder(txnId, customStatus) {
  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;

  let finalAddress = 'Digital Service (No physical delivery)';
  let finalProductDesc = currentCheckoutProduct;

  if (currentCheckoutCategory === 'notes' || currentCheckoutCategory === 'standard' || currentCheckoutCategory === 'both' || currentCheckoutCategory === 'books') {
    const pin = document.getElementById('orderPin') ? document.getElementById('orderPin').value.trim() : '193121';
    const city = document.getElementById('orderCity') ? document.getElementById('orderCity').value : 'Baramulla';
    const street = document.getElementById('orderAddress') ? document.getElementById('orderAddress').value.trim() : '';
    finalAddress = `${street}, ${city} - PIN: ${pin}`;

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

  const isCod = (customStatus && customStatus.includes('Cash on Delivery')) || txnId.startsWith('COD_');
  const totalPaid = currentCheckoutPrice;
  const orderStatus = customStatus || (isCod ? 'Confirmed (Cash on Delivery)' : 'Confirmed');
  const combinedProduct = `${finalProductDesc} | Total: ₹${totalPaid} | ${isCod ? 'Payment: Pay at Doorstep (COD)' : 'TXN: ' + txnId}`;

  // 1. SAVE LOCALLY TO ORDERS HISTORY IMMEDIATELY!
  const user = getCurrentUser();
  const orderRecord = {
    orderId: 'OD' + Date.now() + Math.floor(Math.random() * 1000),
    txnId: txnId,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' at ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now(),
    name: name,
    phone: phone,
    address: finalAddress,
    product: finalProductDesc,
    amount: totalPaid,
    userEmail: user ? user.email : null,
    status: orderStatus
  };

  let orders = getOrders();
  orders.unshift(orderRecord);
  saveOrders(orders);

  // Auto-link phone number to Google account session
  if (user && (!user.phoneNumber || user.phoneNumber === '') && phone) {
    user.phoneNumber = '+91' + phone;
    setCurrentUser(user);
  }

  // 2. DISPATCH TO GOOGLE SHEETS WEB APP
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('address', finalAddress);
  formData.append('product', combinedProduct);
  formData.append('order_id', orderRecord.orderId);
  formData.append('txn_id', txnId);
  formData.append('amount', totalPaid);
  formData.append('status', orderStatus);

  fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' })
    .then(() => {
      if (isCod) {
        alert(`🎉 CASH ON DELIVERY ORDER CONFIRMED!\n\nOrder ID: ${orderRecord.orderId}\nTotal to Pay at Doorstep: ₹${totalPaid}\nDelivery Location: ${finalAddress}\n\nOur team is packing your order! We will message you on WhatsApp (${phone}) before delivery.`);
        // Instant WhatsApp confirmation ping to Sahil
        const waText = `*📦 New COD Order - JK Study Hub*%0A%0A` +
          `🆔 *Order ID:* ${orderRecord.orderId}%0A` +
          `👤 *Customer:* ${encodeURIComponent(name)}%0A` +
          `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
          `📍 *Address:* ${encodeURIComponent(finalAddress)}%0A` +
          `📚 *Product:* ${encodeURIComponent(finalProductDesc)}%0A` +
          `💵 *Amount to Collect:* ₹${totalPaid} (Cash on Delivery)`;
        window.open(`https://wa.me/919622605714?text=${waText}`, '_blank');
      } else {
        alert(`🎉 ORDER SUCCESSFUL!\n\nOrder ID: ${orderRecord.orderId}\nPayment Verified: ₹${totalPaid}\nTXN ID: ${txnId}\n\nYour order has been recorded in the Orders Section! We will contact you on WhatsApp (${phone}) shortly.`);
      }

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
        btn.innerHTML = 'Pay Securely Online';
        btn.disabled = false;
        btn.style.backgroundColor = '#2563eb';
      }

      // If on orders page, re-render
      if (typeof renderOrdersPage === 'function') {
        if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
      }
    })
    .catch(err => {
      alert(`Order recorded (${orderRecord.orderId})! We will contact you on WhatsApp (${phone}) to confirm delivery.`);
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
    if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
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


// =========================================================
// PHONE NUMBER + OTP AUTHENTICATION CONTROLLER (FIREBASE)
// =========================================================

function injectPhoneAuthModal() {
  if (document.getElementById('phoneAuthModal')) return;

  const modalHtml = `
  <div id="phoneAuthModal" class="phone-auth-modal">
    <div class="phone-auth-card">
      <div class="phone-auth-header">
        <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-mobile-screen" style="color: #2563eb;"></i> Student Sign In
        </h3>
        <button onclick="closePhoneAuthModal()" style="background: none; border: none; font-size: 24px; color: #64748b; cursor: pointer; line-height: 1;">&times;</button>
      </div>

      <div class="phone-auth-body">
        <!-- STEP 1: Enter Phone Number or Google -->
        <div id="phoneStep1">
          <!-- 1-Click Google Sign In (Primary Free Option) -->
          <button type="button" onclick="handleGooglePopupAuth()" style="width: 100%; background: #ffffff; border: 2px solid #cbd5e1; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 14.5px; color: #1e293b; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: all 0.2s;">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span>1-Click Sign in with Google </span>
          </button>

          <div style="text-align: center; margin: 16px 0; display: flex; align-items: center; gap: 10px;">
            <span style="flex: 1; height: 1px; background: #e2e8f0;"></span>
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase;">OR VIA MOBILE SMS OTP</span>
            <span style="flex: 1; height: 1px; background: #e2e8f0;"></span>
          </div>

          <p style="font-size: 13px; color: #64748b; margin: 0 0 12px; line-height: 1.4;">
            Enter your 10-digit mobile number to receive a verification SMS OTP.
          </p>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">Mobile Number</label>
            <div style="display: flex; gap: 8px;">
              <span style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 12px; font-weight: 800; color: #334155; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                🇮🇳 +91
              </span>
              <input type="tel" id="authPhoneNumber" class="form-input" placeholder="10-digit number" maxlength="10" pattern="[6789][0-9]{9}" style="font-size: 15px; font-weight: 700; letter-spacing: 0.5px; flex: 1; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px;">
            </div>
            <p id="phoneErrorMsg" style="color: #ef4444; font-size: 12px; font-weight: 600; margin: 6px 0 0; display: none; line-height: 1.4;"></p>
          </div>

          <div id="recaptcha-container" style="margin-bottom: 12px;"></div>

          <button type="button" id="sendOtpBtn" onclick="handleSendOTP()" style="width: 100%; background: #2563eb; color: white; border: none; padding: 12px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">
            Send OTP Code ➔
          </button>
        </div>

        <!-- STEP 2: Enter OTP -->
        <div id="phoneStep2" style="display: none;">
          <p style="font-size: 13.5px; color: #475569; margin: 0 0 14px; line-height: 1.5;">
            We sent a 6-digit OTP to <strong id="displayTargetPhone">+91 ...</strong>
            <button onclick="backToPhoneStep1()" style="background: none; border: none; color: #2563eb; font-size: 12px; font-weight: 700; cursor: pointer; text-decoration: underline; margin-left: 6px;">Change</button>
          </p>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">Enter 6-Digit OTP</label>
            <input type="text" id="authOtpCode" class="form-input" placeholder="• • • • • •" maxlength="6" style="font-size: 22px; font-weight: 800; letter-spacing: 6px; text-align: center; width: 100%; padding: 10px; border: 2px solid #2563eb; border-radius: 8px; box-sizing: border-box;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
              <p id="otpErrorMsg" style="color: #ef4444; font-size: 12px; font-weight: 600; margin: 0; display: none;"></p>
              <a href="#" onclick="resendOTP(event)" id="resendOtpBtn" style="color: #2563eb; font-size: 12px; font-weight: 700; text-decoration: none; margin-left: auto;">Resend OTP</a>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">Your Full Name (Optional)</label>
            <input type="text" id="authStudentName" class="form-input" placeholder="e.g. Student Name" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box;">
          </div>

          <button type="button" id="verifyOtpBtn" onclick="handleVerifyOTP()" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(16,185,129,0.25);">
            Verify OTP &amp; Login ➔
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = modalHtml;
  document.body.appendChild(div.firstElementChild);

  // Add styles
  const style = document.createElement('style');
  style.innerHTML = `
    .phone-auth-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.7); z-index: 100000; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
    .phone-auth-modal.active { display: flex; }
    .phone-auth-card { background: white; border-radius: 16px; width: 92%; max-width: 400px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.25); }
    .phone-auth-header { background: #f8fafc; padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .phone-auth-body { padding: 20px; }
  `;
  document.head.appendChild(style);
}

function openPhoneAuthModal() {
  injectPhoneAuthModal();
  document.getElementById('phoneStep1').style.display = 'block';
  document.getElementById('phoneStep2').style.display = 'none';
  document.getElementById('phoneErrorMsg').style.display = 'none';
  document.getElementById('phoneAuthModal').classList.add('active');
}

function closePhoneAuthModal() {
  const modal = document.getElementById('phoneAuthModal');
  if (modal) modal.classList.remove('active');
}

function backToPhoneStep1() {
  document.getElementById('phoneStep2').style.display = 'none';
  document.getElementById('phoneStep1').style.display = 'block';
}

let activePhoneConfirmation = null;

function handleSendOTP() {
  const phoneInput = document.getElementById('authPhoneNumber');
  const errorMsg = document.getElementById('phoneErrorMsg');
  const btn = document.getElementById('sendOtpBtn');
  const phone = phoneInput.value.trim();

  if (!/^[6789][0-9]{9}$/.test(phone)) {
    errorMsg.innerText = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
    errorMsg.style.display = 'block';
    return;
  }
  errorMsg.style.display = 'none';

  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending SMS OTP...';
  btn.disabled = true;

  const fullPhoneNumber = '+91' + phone;
  const scriptEndpoint = SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';

  // 1. Try Fast2SMS via Apps Script backend
  fetch(`${scriptEndpoint}?action=send_otp&phone=${encodeURIComponent(phone)}&t=${Date.now()}`)
    .then(r => r.json())
    .then(data => {
      if (data.status === 'success') {
        activePhoneConfirmation = { fast2sms: true, phone: phone };
        btn.innerHTML = 'Send OTP Code ➔';
        btn.disabled = false;

        document.getElementById('displayTargetPhone').innerText = fullPhoneNumber;
        document.getElementById('phoneStep1').style.display = 'none';
        document.getElementById('phoneStep2').style.display = 'block';
        const otpInput = document.getElementById('authOtpCode');
        if (otpInput) {
          otpInput.value = '';
          otpInput.placeholder = '• • • • • •';
          otpInput.focus();
        }
        const msgEl = document.getElementById('otpErrorMsg');
        if (msgEl) {
          msgEl.style.display = 'none';
          msgEl.innerText = '';
        }
        showToast("📱 Real SMS OTP sent to your phone!");
      } else if (data.status === 'fast2sms_pending') {
        btn.innerHTML = 'Send OTP Code ➔';
        btn.disabled = false;
        errorMsg.innerHTML = `⚠️ SMS service is temporarily unavailable. Please click <strong>"1-Click Sign in with Google"</strong> above for instant free login!`;
        errorMsg.style.display = 'block';
      } else {
        throw new Error(data.message || 'Fast2SMS error');
      }
    })
    .catch(err => {
      // 2. Fallback to Firebase Phone Auth if Apps Script fails
      if (typeof firebase !== 'undefined' && firebase.auth) {
        if (window.recaptchaVerifier) {
          try { window.recaptchaVerifier.clear(); } catch(e) {}
          window.recaptchaVerifier = null;
        }
        const rcContainer = document.getElementById('recaptcha-container');
        if (rcContainer) rcContainer.innerHTML = '';

        try {
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': () => {},
            'expired-callback': () => {
              btn.innerHTML = 'Send OTP Code ➔';
              btn.disabled = false;
            }
          });

          firebase.auth().signInWithPhoneNumber(fullPhoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
              activePhoneConfirmation = confirmationResult;
              btn.innerHTML = 'Send OTP Code ➔';
              btn.disabled = false;

              document.getElementById('displayTargetPhone').innerText = fullPhoneNumber;
              document.getElementById('phoneStep1').style.display = 'none';
              document.getElementById('phoneStep2').style.display = 'block';
              const otpInput = document.getElementById('authOtpCode');
              if (otpInput) {
                otpInput.value = '';
                otpInput.placeholder = '• • • • • •';
                otpInput.focus();
              }
            })
            .catch((fbError) => {
              btn.innerHTML = 'Send OTP Code ➔';
              btn.disabled = false;
              errorMsg.innerHTML = `⚠️ SMS is temporarily paused. Please use <strong>"1-Click Sign in with Google"</strong> above to log in instantly!`;
              errorMsg.style.display = 'block';
            });
        } catch(e) {
          btn.innerHTML = 'Send OTP Code ➔';
          btn.disabled = false;
          errorMsg.innerHTML = `⚠️ SMS is temporarily paused. Please use <strong>"1-Click Sign in with Google"</strong> above to log in instantly!`;
          errorMsg.style.display = 'block';
        }
      } else {
        btn.innerHTML = 'Send OTP Code ➔';
        btn.disabled = false;
        errorMsg.innerHTML = `⚠️ SMS is temporarily paused. Please use <strong>"1-Click Sign in with Google"</strong> above to log in instantly!`;
        errorMsg.style.display = 'block';
      }
    });
}

function handleVerifyOTP() {
  const otpInput = document.getElementById('authOtpCode');
  const nameInput = document.getElementById('authStudentName');
  const errorMsg = document.getElementById('otpErrorMsg');
  const btn = document.getElementById('verifyOtpBtn');
  const code = otpInput.value.trim();

  if (code.length < 4) {
    errorMsg.innerText = "Please enter the valid OTP code received on your phone.";
    errorMsg.style.display = 'block';
    return;
  }
  errorMsg.style.display = 'none';

  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';
  btn.disabled = true;

  const phone = document.getElementById('authPhoneNumber').value.trim();
  const isOwner = (phone === '9622605714' || STORE_OWNER_PHONES.some(p => p.slice(-10) === phone));
  const studentName = isOwner ? 'Sahil Zahoor (Owner)' : (nameInput.value.trim() || ('Student ' + phone.slice(-4)));
  const scriptEndpoint = SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';

  // Fast2SMS verification via backend
  if (activePhoneConfirmation && activePhoneConfirmation.fast2sms) {
    fetch(`${scriptEndpoint}?action=verify_otp&phone=${encodeURIComponent(phone)}&otp=${encodeURIComponent(code)}&t=${Date.now()}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success' && data.verified) {
          const user = {
            displayName: studentName,
            phoneNumber: '+91' + phone,
            email: isOwner ? 'sahilsspace20@gmail.com' : (phone + '@student.jkstudyhub.online'),
            uid: 'fast2sms_' + phone,
            photoURL: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
          };
          if (isOwner) {
            sessionStorage.setItem('jk_admin_unlocked', 'true');
          }
          finishPhoneLogin(user);
        } else {
          btn.innerHTML = 'Verify OTP & Login ➔';
          btn.disabled = false;
          errorMsg.innerText = data.message || "❌ Incorrect OTP code. Please enter the valid code received on your phone.";
          errorMsg.style.display = 'block';
        }
      })
      .catch(err => {
        btn.innerHTML = 'Verify OTP & Login ➔';
        btn.disabled = false;
        errorMsg.innerText = "❌ Verification service error. Please try again.";
        errorMsg.style.display = 'block';
      });
    return;
  }

  // Firebase fallback verification
  if (activePhoneConfirmation && typeof activePhoneConfirmation.confirm === 'function') {
    activePhoneConfirmation.confirm(code)
      .then((result) => {
        const user = {
          displayName: studentName,
          phoneNumber: '+91' + phone,
          email: isOwner ? 'sahilsspace20@gmail.com' : ((result.user && result.user.email) ? result.user.email : (phone + '@student.jkstudyhub.online')),
          uid: result.user ? result.user.uid : ('phone_' + phone),
          photoURL: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        };
        if (isOwner) {
          sessionStorage.setItem('jk_admin_unlocked', 'true');
        }
        finishPhoneLogin(user);
      })
      .catch((error) => {
        btn.innerHTML = 'Verify OTP & Login ➔';
        btn.disabled = false;
        errorMsg.innerText = "❌ Incorrect OTP code. Please check your SMS and enter the exact 6-digit code received on your phone.";
        errorMsg.style.display = 'block';
      });
    return;
  }

  btn.innerHTML = 'Verify OTP & Login ➔';
  btn.disabled = false;
  errorMsg.innerText = "❌ Session expired or invalid. Please click 'Change' and request a fresh OTP code.";
  errorMsg.style.display = 'block';
}

function finishPhoneLogin(user) {
  setCurrentUser(user);
  closePhoneAuthModal();
  showToast(`🎉 Logged in as ${user.displayName}!`);
  
  // Also pre-fill checkout if form is open
  const orderName = document.getElementById('orderName');
  if (orderName && !orderName.value) orderName.value = user.displayName;
  const orderPhone = document.getElementById('orderPhone');
  if (orderPhone && !orderPhone.value) orderPhone.value = user.phoneNumber.replace('+91', '');
}

function handleGooglePopupAuth() {
  closePhoneAuthModal();
  if (typeof firebase !== 'undefined' && firebase.auth) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
      const user = {
        displayName: res.user.displayName,
        email: res.user.email,
        phoneNumber: res.user.phoneNumber || '',
        photoURL: res.user.photoURL,
        uid: res.user.uid
      };
      setCurrentUser(user);
      const firstName = (user.displayName || 'Student').split(' ')[0];
      showToast(`Welcome, ${firstName}!`);
      if (typeof renderAccountDashboard === 'function') {
        renderAccountDashboard();
      }
    }).catch(err => {
      fallbackLoginPrompt();
    });
  } else {
    fallbackLoginPrompt();
  }
}

// --- PWA INSTALLATION CONTROLLER ---
let deferredPWA = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPWA = e;
  document.querySelectorAll('.install-app-btn').forEach(b => b.style.display = 'inline-flex');
});

window.installApp = function() {
  if (deferredPWA) {
    deferredPWA.prompt();
    deferredPWA.userChoice.then(() => {
      deferredPWA = null;
      document.querySelectorAll('.install-app-btn').forEach(b => b.style.display = 'none');
    });
  } else {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      alert("📱 How to Install on iPhone:\n\n1. Tap the Share button (square with arrow ↑) at the bottom of Safari.\n2. Scroll down and tap 'Add to Home Screen' (+).\n3. Tap 'Add' in the top right.\n\nJK Study Hub will be added right to your home screen like a real app!");
    } else {
      alert("📲 How to Install JK Study Hub App:\n\n• Android (Chrome): Tap the 3 dots (⋮) in the top right and tap 'Install app' or 'Add to Home screen'.\n\n• Laptop/Mac (Chrome): Look at the right side of the address bar at the top and click the Install icon (computer with down arrow)!");
    }
  }
};

// ==========================================
// ACCOUNT DASHBOARD FUNCTIONS (ZAPVI STYLE)
// ==========================================

function renderAccountDashboard() {
  const user = getCurrentUser();
  const profileCard = document.getElementById('sidebarProfileCard');
  if (!profileCard) return;

  if (user) {
    const firstName = (user.displayName || 'Student').split(' ')[0];
    const phone = String(user.phoneNumber || user.phone || '').replace('+91', '');
    profileCard.innerHTML = `
      <h3 style="font-size: 18px; margin-bottom: 5px;">Hi, ${firstName}!</h3>
      <p style="margin-bottom: 15px; color: #475569;"><i class="fa-solid fa-mobile-screen"></i> +91 ${phone}</p>
      <button class="yellow-btn" style="background: #f87171; color: white;" onclick="handleStoreSignOut()">Sign Out</button>
    `;
    
    // Auto-render current active tab if logged in
    const activeMenu = document.querySelector('.account-menu a.active');
    if (activeMenu) {
      const tabId = activeMenu.id.replace('menu-', '');
      if (tabId === 'orders') renderAccountOrders();
      if (tabId === 'wishlist') renderAccountWishlist();
      if (tabId === 'addresses') renderAddresses();
      if (tabId === 'details') renderAccountDetails();
    }
  } else {
    profileCard.innerHTML = `
      <h3>Login with OTP</h3>
      <p>See your orders and saved addresses on any device.</p>
      <button class="yellow-btn" onclick="openPhoneAuthModal()">Login / Sign up</button>
    `;
    // Empty states are already in HTML, but we need to reset them if user logs out
    const ordersContainer = document.getElementById('ordersListContainer');
    if (ordersContainer) {
      ordersContainer.innerHTML = `
        <div class="empty-state">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png" style="width:100%; "></div>
          <h3>See your orders</h3>
          <p>Login with your mobile number to see all your orders.</p>
          <button class="yellow-btn" style="width:auto; padding: 10px 30px;" onclick="openPhoneAuthModal()">Login with OTP</button>
        </div>
      `;
    }
    const addContainer = document.getElementById('addressesListContainer');
    if(addContainer) {
      addContainer.innerHTML = `
        <div class="empty-state">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House.png" style="width:80%; "></div>
          <h3>See your saved addresses</h3>
          <p>Login with your mobile number to see your saved addresses, or add one here.</p>
          <button class="yellow-btn" style="width:auto; padding: 10px 30px;" onclick="openPhoneAuthModal()">Login with OTP</button>
        </div>
      `;
    }
    const detContainer = document.getElementById('accountDetailsContainer');
    if(detContainer) {
      detContainer.innerHTML = `
        <div class="empty-state">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Monocle.png" style="width:90%; "></div>
          <h3>Manage your account</h3>
          <p>Login to update your profile details.</p>
          <button class="yellow-btn" style="width:auto; padding: 10px 30px;" onclick="openPhoneAuthModal()">Login / Sign up</button>
        </div>
      `;
    }
  }
}

function handleOrderSearch(query) {
  currentOrderSearchQuery = (query || '').toLowerCase().trim();
  renderAccountOrders();
}

function renderAccountOrders() {
  const user = getCurrentUser();
  if (!user) return renderAccountDashboard(); // Will render empty state
  
  const container = document.getElementById('ordersListContainer');
  if (!container) return;
  
  const allOrders = getOrders();
  const role = getUserStoreRole(user);
  const isStaff = (role === 'owner' || role === 'delivery' || sessionStorage.getItem('jk_admin_unlocked') === 'true');
  
  let userOrders = allOrders;
  if (!isStaff) {
    const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    const uEmail = String(user.email || '').trim().toLowerCase();
    userOrders = allOrders.filter(o => {
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      const oEmail = String(o.userEmail || '').trim().toLowerCase();
      if (uPhone && oPhone === uPhone) return true;
      if (uEmail && oEmail === uEmail) return true;
      return false;
    });
  }

  // Filter by search query if user types in search bar
  let filteredOrders = userOrders;
  if (currentOrderSearchQuery) {
    const q = currentOrderSearchQuery;
    filteredOrders = userOrders.filter(o => {
      const idMatch = String(o.orderId || '').toLowerCase().includes(q);
      const phoneMatch = String(o.phone || '').toLowerCase().includes(q);
      const nameMatch = String(o.name || '').toLowerCase().includes(q);
      const prodMatch = String(o.product || '').toLowerCase().includes(q);
      const txnMatch = String(o.txnId || '').toLowerCase().includes(q);
      const statusMatch = String(o.status || '').toLowerCase().includes(q);
      return idMatch || phoneMatch || nameMatch || prodMatch || txnMatch || statusMatch;
    });
  }

  if (filteredOrders.length === 0) {
    if (currentOrderSearchQuery) {
      container.innerHTML = `
        <div class="empty-state" style="padding-top: 40px;">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Monocle.png" style="width:80px; margin: 0 auto 10px;"></div>
          <h3>No matching orders</h3>
          <p>No orders matched your search "<strong>${currentOrderSearchQuery}</strong>".</p>
          <button class="yellow-btn" style="width:auto; padding: 8px 24px; margin-top: 10px;" onclick="const el = document.getElementById('orderSearchInput'); if(el) el.value=''; handleOrderSearch('');">Clear Search</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state" style="padding-top: 60px;">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png" style="width:100%; "></div>
          <h3>No orders found</h3>
          <p>Looks like you haven't placed any orders yet.</p>
          <a href="store.html" class="yellow-btn" style="width:auto; padding: 10px 30px;">Keep shopping</a>
        </div>
      `;
    }
    return;
  }

  // Reverse sort by timestamp
  filteredOrders.sort((a,b) => b.timestamp - a.timestamp);

  let html = '';
  filteredOrders.forEach(o => {
    let statusColor = '#3b82f6';
    if(o.status === 'Delivered') statusColor = '#10b981';
    if(o.status === 'Cancelled') statusColor = '#ef4444';
    
    let adminControls = '';
    if (isStaff) {
      const isLocked = (o.status === 'Delivered' || o.status === 'Cancelled');
      adminControls = `
        <div style="margin-top:15px; padding-top:15px; border-top:1px dashed #cbd5e1; font-size:13px; color:#475569;">
          <div style="margin-bottom:8px;"><strong>Customer:</strong> +91 ${o.phone || ''}</div>
          <div style="margin-bottom:12px; line-height: 1.5;"><strong>Address:</strong> ${o.address || 'N/A'}</div>
          <div style="display:flex; align-items:center; gap:10px;">
            <select ${isLocked ? 'disabled' : ''} class="form-input" style="padding:8px 12px; font-size:13px; flex:1; border: 2px solid #cbd5e1; border-radius: 8px; font-weight: 700; color: #1e293b; ${isLocked ? 'background-color:#f8fafc; cursor:default; pointer-events:none;' : ''}" onchange="updateOrderStatusByAdmin('${o.orderId}', this.value); setTimeout(renderAccountOrders, 300);">
              <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
              <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
            <button onclick="sendCustomerWhatsAppStatusUpdate('${o.orderId}')" style="background:#25d366; color:white; border:none; padding:8px 12px; border-radius:8px; cursor:pointer;"><i class="fa-brands fa-whatsapp"></i> Notify</button>
          </div>
        </div>
      `;
    }

    html += `
      <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:15px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:12px; color:#64748b; font-weight:700; margin-bottom:4px;">ORDER ID</div>
            <div style="font-size:16px; font-weight:800; color:#1e293b;">${o.orderId}</div>
          </div>
          <div style="text-align:right;">
            <span style="background:${statusColor}15; color:${statusColor}; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:700;">${o.status}</span>
          </div>
        </div>
        <div style="font-size:15px; font-weight:600; color:#334155; margin-bottom:10px;">${o.product}</div>
        
        ${(() => {
          let progressWidth = '0%';
          let s1 = '', s2 = '', s3 = '', s4 = '';
          let c1 = '', c2 = '', c3 = '', c4 = '';
          let statusLower = (o.status || 'Confirmed').toLowerCase();
          
          if (statusLower === 'cancelled') {
            progressWidth = '100%';
            s1 = 'active'; s2 = 'active'; s3 = 'active'; s4 = 'active';
            c1 = c2 = c3 = c4 = 'background: #ef4444; box-shadow: 0 0 0 2px #ef4444;';
          } else {
            if (statusLower === 'confirmed' || statusLower === 'processing') {
              progressWidth = '15%'; s1 = 'active current';
            } else if (statusLower === 'shipped') {
              progressWidth = '50%'; s1 = 'active'; s2 = 'active current';
            } else if (statusLower === 'out for delivery') {
              progressWidth = '85%'; s1 = 'active'; s2 = 'active'; s3 = 'active current';
            } else if (statusLower === 'delivered') {
              progressWidth = '100%'; s1 = 'active'; s2 = 'active'; s3 = 'active'; s4 = 'active current';
            }
          }
          
          return `
            <div class="order-track" style="margin-top:25px; margin-bottom: 25px;">
              <div class="track-progress" style="width: ${progressWidth}; ${statusLower === 'cancelled' ? 'background: #ef4444;' : ''}"></div>
              <div class="track-step ${s1}">
                <div class="track-icon" style="${c1}"><i class="fa-solid fa-clipboard-check"></i></div>
                <div class="track-label">Confirmed</div>
              </div>
              <div class="track-step ${s2}">
                <div class="track-icon" style="${c2}"><i class="fa-solid fa-box"></i></div>
                <div class="track-label">Shipped</div>
              </div>
              <div class="track-step ${s3}">
                <div class="track-icon" style="${c3}"><i class="fa-solid fa-truck-fast"></i></div>
                <div class="track-label">Out for delivery</div>
              </div>
              <div class="track-step ${s4}">
                <div class="track-icon" style="${c4}"><i class="${statusLower === 'cancelled' ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-house-circle-check'}"></i></div>
                <div class="track-label" style="${statusLower === 'cancelled' ? 'color:#ef4444;' : ''}">${statusLower === 'cancelled' ? 'Cancelled' : 'Delivered'}</div>
              </div>
            </div>
          `;
        })()}
        <div style="display:flex; justify-content:space-between; font-size:14px; color:#475569; border-top:1px dashed #cbd5e1; padding-top:10px;">
          <span>${o.date}</span>
          <span style="font-weight:700; color:#1e293b;">₹${o.amount}</span>
        </div>
        ${adminControls}
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function renderAccountWishlist() {
  const container = document.getElementById('wishlistContainer');
  if(!container) return;
  const w = getWishlist();
  if (w.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding-top: 40px; margin:0 auto;">
        <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Broken%20Heart.png" style="width:80%; "></div>
        <h3>Your wishlist is empty</h3>
        <p>Save items you love here to easily find them later.</p>
        <a href="store.html" class="yellow-btn" style="width:auto; padding: 10px 30px;">Keep shopping</a>
      </div>
    `;
    return;
  }
  // Render using existing logic but adapted for this container
  let html = `<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:20px;">`;
  w.forEach(item => {
    html += `
      <div class="product-card" style="border-radius:12px; box-shadow:none; border:1px solid #e2e8f0;">
        <button class="wishlist-icon active" onclick="toggleFavorite(this, '${item.name}')" style="top:10px; right:10px;"><i class="fa-solid fa-heart"></i></button>
        <img src="${item.image || item.img}" class="product-img" style="height:160px; object-fit:cover;" onerror="this.src='https://placehold.co/400x300?text=JK+Study+Hub'">
        <div class="product-info" style="padding:15px;">
          <div class="product-title" style="font-size:15px; margin-bottom:10px;">${item.name}</div>
          <div class="product-footer" style="margin-top:auto;">
            <div class="product-price" style="font-size:16px;">₹${item.price}</div>
            <button class="buy-btn" onclick="addToCart('${item.name}', ${item.price}, 'standard', '${item.category}')" style="padding:6px 12px; font-size:13px;">Add <i class="fa-solid fa-cart-shopping"></i></button>
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function renderAddresses() {
  const user = getCurrentUser();
  if (!user) return renderAccountDashboard();
  
  const container = document.getElementById('addressesListContainer');
  if(!container) return;
  
  let addresses = JSON.parse(localStorage.getItem('jk_saved_addresses') || '[]');
  
  if (addresses.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding-top: 40px;">
        <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House.png" style="width:80%; "></div>
        <h3>No saved addresses</h3>
        <p>Add an address to checkout faster next time.</p>
        <button class="yellow-btn" style="width:auto; padding: 10px 30px;" onclick="addNewAddress()">Add Address</button>
      </div>
    `;
    return;
  }
  
  let html = '';
  addresses.forEach((adr, idx) => {
    html += `
      <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:15px; position:relative;">
        <button onclick="deleteAddress(${idx})" style="position:absolute; top:20px; right:20px; background:none; border:none; color:#ef4444; cursor:pointer; font-size:16px;"><i class="fa-regular fa-trash-can"></i></button>
        <div style="font-weight:700; color:#1e293b; margin-bottom:8px; font-size:16px;">${adr.name} <span style="font-size:11px; background:#f1f5f9; padding:2px 8px; border-radius:10px; margin-left:8px; color:#64748b; font-weight:800;">${adr.type || 'HOME'}</span></div>
        <div style="color:#475569; font-size:14px; margin-bottom:5px;">${adr.phone}</div>
        <div style="color:#64748b; font-size:14px; line-height:1.5; max-width:85%;">${adr.fullAddress}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function addNewAddress() {
  const name = prompt("Enter full name for this address:");
  if(!name) return;
  const phone = prompt("Enter phone number for this address:");
  if(!phone) return;
  const address = prompt("Enter full delivery address (Street, Landmark, Pincode):");
  if(!address) return;
  
  let addresses = JSON.parse(localStorage.getItem('jk_saved_addresses') || '[]');
  addresses.push({ name: name, phone: phone, fullAddress: address, type: 'HOME' });
  localStorage.setItem('jk_saved_addresses', JSON.stringify(addresses));
  renderAddresses();
}

function deleteAddress(idx) {
  if(!confirm("Delete this address?")) return;
  let addresses = JSON.parse(localStorage.getItem('jk_saved_addresses') || '[]');
  addresses.splice(idx, 1);
  localStorage.setItem('jk_saved_addresses', JSON.stringify(addresses));
  renderAddresses();
}

function renderAccountDetails() {
  const user = getCurrentUser();
  if (!user) return renderAccountDashboard();
  
  const container = document.getElementById('accountDetailsContainer');
  if(!container) return;
  
  const firstName = (user.displayName || 'Student').split(' ')[0];
  const phone = String(user.phoneNumber || user.phone || '').replace('+91', '');
  
  container.innerHTML = `
    <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:25px;">
      <div style="margin-bottom: 20px;">
        <label style="display:block; font-size:12px; font-weight:700; color:#64748b; margin-bottom:5px;">FULL NAME</label>
        <div style="font-size:16px; font-weight:600; color:#1e293b; padding:10px 15px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">${user.displayName || 'Not Set'}</div>
      </div>
      <div style="margin-bottom: 20px;">
        <label style="display:block; font-size:12px; font-weight:700; color:#64748b; margin-bottom:5px;">MOBILE NUMBER</label>
        <div style="font-size:16px; font-weight:600; color:#1e293b; padding:10px 15px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; display:flex; justify-content:space-between;">
          <span>+91 ${phone}</span>
          <span style="color:#10b981; font-size:12px; font-weight:800;"><i class="fa-solid fa-circle-check"></i> VERIFIED</span>
        </div>
      </div>
      <div style="margin-bottom: 20px;">
        <label style="display:block; font-size:12px; font-weight:700; color:#64748b; margin-bottom:5px;">EMAIL ID</label>
        <div style="font-size:16px; font-weight:600; color:#1e293b; padding:10px 15px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">${user.email || 'Not Set'}</div>
      </div>
      
      <p style="font-size:13px; color:#94a3b8; margin-top:30px;">
        * Phone number cannot be changed as it is verified via OTP. To update your name or email, please contact support.
      </p>
    </div>
  `;
}

// Hook into updateAuthUI so that when user logs in via OTP on the account page, it re-renders
const originalUpdateAuthUI = updateAuthUI;
updateAuthUI = function() {
  originalUpdateAuthUI();
  if (typeof renderAccountDashboard === 'function') {
    renderAccountDashboard();
  }
};

function resendOTP(e) {
  if (e) e.preventDefault();
  const resendBtn = document.getElementById('resendOtpBtn');
  if (resendBtn.style.pointerEvents === 'none') return;
  
  const phone = document.getElementById('authPhoneNumber').value.trim();
  if (!phone) return backToPhoneStep1();
  
  resendBtn.innerText = 'Sending...';
  resendBtn.style.color = '#94a3b8';
  resendBtn.style.pointerEvents = 'none';
  
  const scriptEndpoint = (typeof SCRIPT_URL !== 'undefined' ? SCRIPT_URL : 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec');
  
  fetch(scriptEndpoint + '?action=send_otp&phone=' + encodeURIComponent(phone) + '&t=' + Date.now())
    .then(r => r.json())
    .then(data => {
       if (data.status === 'success') {
         if (typeof showToast === 'function') showToast("📱 New OTP sent to your phone!");
         let countdown = 30;
         resendBtn.innerText = 'Wait ' + countdown + 's';
         const timer = setInterval(() => {
           countdown--;
           resendBtn.innerText = 'Wait ' + countdown + 's';
           if (countdown <= 0) {
             clearInterval(timer);
             resendBtn.innerText = 'Resend OTP';
             resendBtn.style.color = '#2563eb';
             resendBtn.style.pointerEvents = 'auto';
           }
         }, 1000);
       } else {
         throw new Error(data.message);
       }
    })
    .catch(err => {
       resendBtn.innerText = 'Resend OTP';
       resendBtn.style.color = '#2563eb';
       resendBtn.style.pointerEvents = 'auto';
       const msgEl = document.getElementById('otpErrorMsg');
       if (msgEl) {
         msgEl.innerText = "Error sending OTP. Please try again.";
         msgEl.style.display = 'block';
       }
    });
}


// ==========================================
// SWIPEABLE PHOTO CAROUSEL & BOOK DETAILS MODAL
// ==========================================

const BOOK_CATALOG_DATA = [
  {
    "name": "Atomic Habits",
    "author": "James Clear",
    "mrp": 499,
    "price": 249,
    "category": "books",
    "badge": "Bestseller #1",
    "rating": "4.9",
    "reviews": "1.2k",
    "desc": "An easy and proven way to build good habits and break bad ones. The #1 self-discipline handbook for students and high achievers.",
    "length": "19.8 cm",
    "width": "12.9 cm",
    "thickness": "2.4 cm",
    "pages": "320 pgs",
    "paper": "70 GSM Cream Paper",
    "photos": [
      "images/books/atomic-habits-1.webp",
      "images/books/atomic-habits-2.webp",
      "images/books/atomic-habits-3.webp",
      "images/books/atomic-habits-4.webp"
    ],
    "dimSvg": "images/books/atomic-habits-4.webp",
    "allImages": [
      "images/books/atomic-habits-1.webp",
      "images/books/atomic-habits-2.webp",
      "images/books/atomic-habits-3.webp",
      "images/books/atomic-habits-4.webp"
    ]
  },
  {
    "name": "The Psychology of Money",
    "author": "Morgan Housel",
    "mrp": 399,
    "price": 220,
    "category": "books",
    "badge": "Youth Favorite",
    "rating": "4.8",
    "reviews": "950",
    "desc": "Timeless lessons on wealth, greed, and happiness. Crucial financial wisdom every young student should understand before college.",
    "length": "19.8 cm",
    "width": "12.9 cm",
    "thickness": "2.0 cm",
    "pages": "256 pgs",
    "paper": "70 GSM Cream Paper",
    "photos": [
      "images/books/psychology-of-money-1.webp",
      "images/books/psychology-of-money-2.webp",
      "images/books/psychology-of-money-3.webp",
      "images/books/psychology-of-money-4.webp"
    ],
    "dimSvg": "images/books/psychology-of-money-4.webp",
    "allImages": [
      "images/books/psychology-of-money-1.webp",
      "images/books/psychology-of-money-2.webp",
      "images/books/psychology-of-money-3.webp",
      "images/books/psychology-of-money-4.webp"
    ]
  },
  {
    "name": "Deep Work",
    "author": "Cal Newport",
    "mrp": 499,
    "price": 240,
    "category": "books",
    "badge": "Exam Prep Must-Have",
    "rating": "4.8",
    "reviews": "820",
    "desc": "Rules for focused success in a distracted world. Master deep study concentration for NEET, JEE, and competitive exams.",
    "length": "19.8 cm",
    "width": "12.8 cm",
    "thickness": "2.2 cm",
    "pages": "304 pgs",
    "paper": "70 GSM Natural Paper",
    "photos": [
      "images/books/deep-work-1.webp",
      "images/books/deep-work-2.webp",
      "images/books/deep-work-3.webp",
      "images/books/deep-work-4.webp"
    ],
    "dimSvg": "images/books/deep-work-4.webp",
    "allImages": [
      "images/books/deep-work-1.webp",
      "images/books/deep-work-2.webp",
      "images/books/deep-work-3.webp",
      "images/books/deep-work-4.webp"
    ]
  },
  {
    "name": "The Alchemist",
    "author": "Paulo Coelho",
    "mrp": 350,
    "price": 180,
    "category": "books",
    "badge": "Inspiring Classic",
    "rating": "4.9",
    "reviews": "2.1k",
    "desc": "A magical fable about following your dream. Beautiful, simple English prose that boosts reading fluency and vocabulary.",
    "length": "19.8 cm",
    "width": "12.9 cm",
    "thickness": "1.6 cm",
    "pages": "208 pgs",
    "paper": "70 GSM Soft White",
    "photos": [
      "images/books/the-alchemist-1.webp",
      "images/books/the-alchemist-2.webp",
      "images/books/the-alchemist-3.webp",
      "images/books/the-alchemist-4.webp"
    ],
    "dimSvg": "images/books/the-alchemist-4.webp",
    "allImages": [
      "images/books/the-alchemist-1.webp",
      "images/books/the-alchemist-2.webp",
      "images/books/the-alchemist-3.webp",
      "images/books/the-alchemist-4.webp"
    ]
  },
  {
    "name": "The Kite Runner",
    "author": "Khaled Hosseini",
    "mrp": 499,
    "price": 260,
    "category": "books",
    "badge": "Epic Masterpiece",
    "rating": "4.9",
    "reviews": "1.8k",
    "desc": "An unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father's servant in Afghanistan.",
    "length": "19.8 cm",
    "width": "12.9 cm",
    "thickness": "2.6 cm",
    "pages": "384 pgs",
    "paper": "70 GSM Cream Paper",
    "photos": [
      "images/books/the-kite-runner-1.webp",
      "images/books/the-kite-runner-2.webp",
      "images/books/the-kite-runner-3.webp",
      "images/books/the-kite-runner-4.webp"
    ],
    "dimSvg": "images/books/the-kite-runner-4.webp",
    "allImages": [
      "images/books/the-kite-runner-1.webp",
      "images/books/the-kite-runner-2.webp",
      "images/books/the-kite-runner-3.webp",
      "images/books/the-kite-runner-4.webp"
    ]
  },
  {
    "name": "A Thousand Splendid Suns",
    "author": "Khaled Hosseini",
    "mrp": 499,
    "price": 260,
    "category": "books",
    "badge": "Emotional Journey",
    "rating": "4.9",
    "reviews": "1.5k",
    "desc": "A breathtaking story of two women brought together by war and tragedy in Kabul. Unputdownable modern literature.",
    "length": "19.8 cm",
    "width": "12.9 cm",
    "thickness": "2.8 cm",
    "pages": "432 pgs",
    "paper": "70 GSM Cream Paper",
    "photos": [
      "images/books/thousand-splendid-suns-1.webp",
      "images/books/thousand-splendid-suns-2.webp",
      "images/books/thousand-splendid-suns-3.webp",
      "images/books/thousand-splendid-suns-4.webp"
    ],
    "dimSvg": "images/books/thousand-splendid-suns-4.webp",
    "allImages": [
      "images/books/thousand-splendid-suns-1.webp",
      "images/books/thousand-splendid-suns-2.webp",
      "images/books/thousand-splendid-suns-3.webp",
      "images/books/thousand-splendid-suns-4.webp"
    ]
  },
  {
    "name": "Secrets of Divine Love",
    "author": "A. Helwa",
    "mrp": 599,
    "price": 299,
    "category": "books",
    "badge": "Spiritual Bestseller",
    "rating": "4.9",
    "reviews": "1.3k",
    "desc": "A heart-centered, practical guide to using the Quran and Islamic spirituality to awaken divine love, peace, and hope.",
    "length": "21.6 cm",
    "width": "14.0 cm",
    "thickness": "2.6 cm",
    "pages": "400 pgs",
    "paper": "80 GSM Royal White",
    "photos": [
      "images/books/secrets-of-divine-love-1.webp",
      "images/books/secrets-of-divine-love-2.webp",
      "images/books/secrets-of-divine-love-3.webp",
      "images/books/secrets-of-divine-love-4.webp"
    ],
    "dimSvg": "images/books/secrets-of-divine-love-4.webp",
    "allImages": [
      "images/books/secrets-of-divine-love-1.webp",
      "images/books/secrets-of-divine-love-2.webp",
      "images/books/secrets-of-divine-love-3.webp",
      "images/books/secrets-of-divine-love-4.webp"
    ]
  },
  {
    "name": "Reclaim Your Heart",
    "author": "Yasmin Mogahed",
    "mrp": 450,
    "price": 250,
    "category": "books",
    "badge": "Mental Peace Guide",
    "rating": "4.8",
    "reviews": "920",
    "desc": "Manual on freeing the heart from life's attachments, overcoming emotional pain, and staying mentally strong as a student.",
    "length": "20.3 cm",
    "width": "13.3 cm",
    "thickness": "1.8 cm",
    "pages": "240 pgs",
    "paper": "70 GSM Cream Paper",
    "photos": [
      "images/books/reclaim-your-heart-1.webp",
      "images/books/reclaim-your-heart-2.webp",
      "images/books/reclaim-your-heart-3.webp",
      "images/books/reclaim-your-heart-4.webp"
    ],
    "dimSvg": "images/books/reclaim-your-heart-4.webp",
    "allImages": [
      "images/books/reclaim-your-heart-1.webp",
      "images/books/reclaim-your-heart-2.webp",
      "images/books/reclaim-your-heart-3.webp",
      "images/books/reclaim-your-heart-4.webp"
    ]
  },
  {
    "name": "Wings of Fire",
    "author": "A.P.J. Abdul Kalam",
    "mrp": 395,
    "price": 199,
    "category": "books",
    "badge": "National Inspiration",
    "rating": "4.9",
    "reviews": "3.4k",
    "desc": "Inspiring autobiography of Dr. Kalam\u2014from a humble boy in Rameswaram to leading India's space and missile programs.",
    "length": "19.8 cm",
    "width": "13.0 cm",
    "thickness": "1.5 cm",
    "pages": "180 pgs",
    "paper": "70 GSM Soft White",
    "photos": [
      "images/books/wings-of-fire-1.webp",
      "images/books/wings-of-fire-2.webp",
      "images/books/wings-of-fire-3.webp",
      "images/books/wings-of-fire-4.webp"
    ],
    "dimSvg": "images/books/wings-of-fire-4.webp",
    "allImages": [
      "images/books/wings-of-fire-1.webp",
      "images/books/wings-of-fire-2.webp",
      "images/books/wings-of-fire-3.webp",
      "images/books/wings-of-fire-4.webp"
    ]
  },
  {
    "name": "Lucent's General Knowledge",
    "author": "Lucent Publication",
    "mrp": 420,
    "price": 250,
    "category": "books",
    "badge": "Exam Rank Booster",
    "rating": "4.7",
    "reviews": "4.1k",
    "desc": "Essential handbook covering Indian History, Polity, Geography, Economy, and General Science. The Bible for JKSSB & SSC exams.",
    "length": "24.0 cm",
    "width": "18.0 cm",
    "thickness": "2.8 cm",
    "pages": "450 pgs",
    "paper": "65 GSM Crisp White",
    "photos": [
      "images/books/lucent-gk-1.webp",
      "images/books/lucent-gk-2.webp",
      "images/books/lucent-gk-3.webp",
      "images/books/lucent-gk-4.webp"
    ],
    "dimSvg": "images/books/lucent-gk-4.webp",
    "allImages": [
      "images/books/lucent-gk-1.webp",
      "images/books/lucent-gk-2.webp",
      "images/books/lucent-gk-3.webp",
      "images/books/lucent-gk-4.webp"
    ]
  },
  {
    "name": "Wren & Martin English Grammar",
    "author": "P.C. Wren & H. Martin",
    "mrp": 550,
    "price": 290,
    "category": "books",
    "badge": "Grammar Foundation",
    "rating": "4.9",
    "reviews": "2.8k",
    "desc": "High School English Grammar and Composition. Comprehensive rules, sentence structures, vocabulary, and writing techniques.",
    "length": "24.0 cm",
    "width": "18.0 cm",
    "thickness": "3.2 cm",
    "pages": "520 pgs",
    "paper": "70 GSM Natural White",
    "photos": [
      "images/books/wren-martin-1.webp",
      "images/books/wren-martin-2.webp",
      "images/books/wren-martin-3.webp",
      "images/books/wren-martin-4.webp"
    ],
    "dimSvg": "images/books/wren-martin-4.webp",
    "allImages": [
      "images/books/wren-martin-1.webp",
      "images/books/wren-martin-2.webp",
      "images/books/wren-martin-3.webp",
      "images/books/wren-martin-4.webp"
    ]
  }
];

function cycleCardPhoto(cardId, delta, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  const container = document.getElementById(cardId);
  if (!container) return;
  
  const imgs = container.querySelectorAll('.carousel-img');
  const dots = container.querySelectorAll('.carousel-dot');
  if (imgs.length <= 1) return;
  
  let activeIndex = 0;
  imgs.forEach((img, idx) => {
    if (img.classList.contains('active')) activeIndex = idx;
  });
  
  imgs[activeIndex].classList.remove('active');
  if (dots[activeIndex]) dots[activeIndex].classList.remove('active');
  
  let nextIndex = (activeIndex + delta + imgs.length) % imgs.length;
  imgs[nextIndex].classList.add('active');
  if (dots[nextIndex]) dots[nextIndex].classList.add('active');
}

function setCardPhoto(cardId, index, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  const container = document.getElementById(cardId);
  if (!container) return;
  
  const imgs = container.querySelectorAll('.carousel-img');
  const dots = container.querySelectorAll('.carousel-dot');
  
  imgs.forEach((img, idx) => {
    if (idx === index) img.classList.add('active');
    else img.classList.remove('active');
  });
  
  dots.forEach((dot, idx) => {
    if (idx === index) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

// Touch swipe support for card carousels
function initCardSwipes() {
  document.querySelectorAll('.swipe-photo-container').forEach(el => {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    let hasMoved = false;

    el.addEventListener('touchstart', e => {
      if (!e.touches || e.touches.length === 0) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
      hasMoved = false;
    }, { passive: true });

    el.addEventListener('touchmove', e => {
      if (!isSwiping || !e.touches || e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      if (Math.abs(currentX - startX) > 10) {
        hasMoved = true;
      }
    }, { passive: true });
    
    el.addEventListener('touchend', e => {
      if (!isSwiping || !e.changedTouches || e.changedTouches.length === 0) return;
      isSwiping = false;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Horizontal swipe threshold: 25px, with horizontal travel greater than vertical travel
      if (Math.abs(diffX) > 25 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) cycleCardPhoto(el.id, 1);
        else cycleCardPhoto(el.id, -1);
      }
    }, { passive: true });

    // Suppress modal open if user was swiping photos
    el.addEventListener('click', e => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);
  });
}

// Ensure swipe initialization runs whether DOM is already ready or loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCardSwipes);
} else {
  initCardSwipes();
}

let currentModalImages = [];
let currentModalIndex = 0;
let currentModalBook = null;

function openBookDetailsModal(bookName) {
  const book = BOOK_CATALOG_DATA.find(b => b.name === bookName) || (PRODUCT_CATALOG[bookName] ? { name: bookName, ...PRODUCT_CATALOG[bookName] } : null);
  if (!book) return;
  currentModalBook = book;
  currentModalImages = book.allImages || book.images || [book.image];
  currentModalIndex = 0;

  const modal = document.getElementById('bookDetailsModal');
  if (!modal) return;

  document.getElementById('modalBookTitle').innerText = book.name;
  document.getElementById('modalBookAuthor').innerText = 'By ' + (book.author || 'Renowned Author');
  document.getElementById('modalBookPrice').innerText = '₹' + book.price;
  document.getElementById('modalBookMrp').innerText = '₹' + (book.mrp || Math.round(book.price * 1.8));
  document.getElementById('modalBookDesc').innerText = book.desc || 'High quality paperback verified for students.';
  
  const discount = Math.round((((book.mrp || Math.round(book.price * 1.8)) - book.price) / (book.mrp || Math.round(book.price * 1.8))) * 100);
  document.getElementById('modalBookDiscount').innerText = discount + '% OFF';

  // Render Specs
  const specs = book.specs || {
    length: book.length || '19.8 cm',
    width: book.width || '12.9 cm',
    thickness: book.thickness || '2.2 cm',
    pages: book.pages || '300 pgs',
    paper: book.paper || '70 GSM Cream'
  };

  document.getElementById('specLength').innerText = specs.length;
  document.getElementById('specWidth').innerText = specs.width;
  document.getElementById('specThickness').innerText = specs.thickness;
  document.getElementById('specPages').innerText = specs.pages;
  document.getElementById('specPaper').innerText = specs.paper;

  // Render Thumbnails
  const thumbContainer = document.getElementById('modalThumbnails');
  if (thumbContainer) {
    let tHtml = '';
    currentModalImages.forEach((img, idx) => {
      const isDim = (idx === currentModalImages.length - 1);
      tHtml += `
        <div class="modal-thumb ${idx === 0 ? 'active' : ''}" onclick="setModalPhoto(${idx})">
          <img src="${img}" alt="Preview ${idx+1}">
          ${isDim ? '<span class="thumb-dim-badge">Specs</span>' : ''}
        </div>
      `;
    });
    thumbContainer.innerHTML = tHtml;
  }

  // Set Main Photo
  setModalPhoto(0);

  // Setup Actions
  const buyBtn = document.getElementById('modalBuyBtn');
  if (buyBtn) {
    buyBtn.onclick = () => {
      closeBookDetailsModal();
      openCheckout(book.name, book.price, 'physical', 'books');
    };
  }
  const cartBtn = document.getElementById('modalCartBtn');
  if (cartBtn) {
    cartBtn.onclick = () => {
      addToCart(book.name, book.price, 'physical', 'books');
    };
  }

  modal.classList.add('active');
}

function closeBookDetailsModal() {
  const modal = document.getElementById('bookDetailsModal');
  if (modal) modal.classList.remove('active');
}

function setModalPhoto(idx) {
  if (!currentModalImages || currentModalImages.length === 0) return;
  currentModalIndex = (idx + currentModalImages.length) % currentModalImages.length;
  
  const mainImg = document.getElementById('modalMainImg');
  if (mainImg) mainImg.src = currentModalImages[currentModalIndex];
  
  const countEl = document.getElementById('modalImgCounter');
  if (countEl) countEl.innerText = (currentModalIndex + 1) + ' / ' + currentModalImages.length;
  
  document.querySelectorAll('.modal-thumb').forEach((t, i) => {
    if (i === currentModalIndex) t.classList.add('active');
    else t.classList.remove('active');
  });
}

function cycleModalPhoto(delta) {
  setModalPhoto(currentModalIndex + delta);
}


// Global Asset Preloader for Store, Cart & Orders
(function preloadAllCatalogPhotos() {
  if (typeof window === 'undefined') return;
  const webpUrls = [
    'images/ad-3d-scooter.webp', 'images/ad-3d-founder.webp',
    'images/books/atomic-habits-1.webp', 'images/books/atomic-habits-2.webp', 'images/books/atomic-habits-3.webp', 'images/books/atomic-habits-4.webp',
    'images/books/psychology-of-money-1.webp', 'images/books/psychology-of-money-2.webp', 'images/books/psychology-of-money-3.webp', 'images/books/psychology-of-money-4.webp',
    'images/books/deep-work-1.webp', 'images/books/deep-work-2.webp', 'images/books/deep-work-3.webp', 'images/books/deep-work-4.webp',
    'images/books/the-alchemist-1.webp', 'images/books/the-alchemist-2.webp', 'images/books/the-alchemist-3.webp', 'images/books/the-alchemist-4.webp',
    'images/books/the-kite-runner-1.webp', 'images/books/the-kite-runner-2.webp', 'images/books/the-kite-runner-3.webp', 'images/books/the-kite-runner-4.webp',
    'images/books/thousand-splendid-suns-1.webp', 'images/books/thousand-splendid-suns-2.webp', 'images/books/thousand-splendid-suns-3.webp', 'images/books/thousand-splendid-suns-4.webp',
    'images/books/secrets-of-divine-love-1.webp', 'images/books/secrets-of-divine-love-2.webp', 'images/books/secrets-of-divine-love-3.webp', 'images/books/secrets-of-divine-love-4.webp',
    'images/books/reclaim-your-heart-1.webp', 'images/books/reclaim-your-heart-2.webp', 'images/books/reclaim-your-heart-3.webp', 'images/books/reclaim-your-heart-4.webp',
    'images/books/wings-of-fire-1.webp', 'images/books/wings-of-fire-2.webp', 'images/books/wings-of-fire-3.webp', 'images/books/wings-of-fire-4.webp',
    'images/books/lucent-gk-1.webp', 'images/books/lucent-gk-2.webp', 'images/books/lucent-gk-3.webp', 'images/books/lucent-gk-4.webp',
    'images/books/wren-martin-1.webp', 'images/books/wren-martin-2.webp', 'images/books/wren-martin-3.webp', 'images/books/wren-martin-4.webp'
  ];
  setTimeout(() => {
    webpUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, 100);
})();

// ==========================================
// DEDICATED STORE SEARCH & CATEGORY ENGINE
// ==========================================

let currentStoreCategory = 'all';

function getCardCategoryType(card) {
  if (!card) return 'all';
  if (card.classList.contains('book-product-card')) return 'novels';
  const text = (card.textContent || '').toLowerCase();
  if (text.includes('pyqs') || text.includes('instant notes') || text.includes('survival kit')) return 'academic';
  if (text.includes('table') || text.includes('diary') || text.includes('pen') || text.includes('geometry') || text.includes('quran') || text.includes('copies') || text.includes('lamp')) return 'stationery';
  if (text.includes('form filling') || text.includes('digital') || text.includes('scholarship')) return 'digital';
  return 'stationery';
}

function handleStoreLiveSearch(query) {
  const q = String(query || '').trim().toLowerCase();
  const clearBtn = document.getElementById('storeSearchClear');
  const feedback = document.getElementById('storeSearchFeedback');
  const countText = document.getElementById('searchResultCountText');
  const emptyState = document.getElementById('noStoreResults');

  if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';

  const allCards = document.querySelectorAll('.book-product-card, .product-card');
  let matchCount = 0;

  allCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const queryMatch = !q || text.includes(q);
    const cardCat = getCardCategoryType(card);
    const catMatch = (currentStoreCategory === 'all' || currentStoreCategory === cardCat);

    if (queryMatch && catMatch) {
      card.style.display = 'flex';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Section titles visibility
  const secNovels = document.getElementById('section-novels');
  const secAcademic = document.getElementById('section-academic');
  const secDigital = document.getElementById('section-digital');

  if (secNovels) {
    const hasVisibleNovels = Array.from(document.querySelectorAll('.book-product-card')).some(c => c.style.display !== 'none');
    secNovels.style.display = hasVisibleNovels ? 'flex' : 'none';
  }
  if (secAcademic) {
    const hasVisibleAcademic = Array.from(document.querySelectorAll('.product-card')).some(c => {
      const cat = getCardCategoryType(c);
      return (cat === 'academic' || cat === 'stationery') && c.style.display !== 'none';
    });
    secAcademic.style.display = hasVisibleAcademic ? 'block' : 'none';
  }
  if (secDigital) {
    const hasVisibleDigital = Array.from(document.querySelectorAll('.product-card')).some(c => {
      const cat = getCardCategoryType(c);
      return (cat === 'digital') && c.style.display !== 'none';
    });
    secDigital.style.display = hasVisibleDigital ? 'block' : 'none';
  }

  if (feedback && countText) {
    if (q) {
      feedback.style.display = 'flex';
      countText.innerText = `Found ${matchCount} item${matchCount === 1 ? '' : 's'} matching "${query}"`;
    } else if (currentStoreCategory !== 'all') {
      feedback.style.display = 'flex';
      countText.innerText = `Showing ${currentStoreCategory.toUpperCase()} (${matchCount} items)`;
    } else {
      feedback.style.display = 'none';
    }
  }

  if (emptyState) {
    emptyState.style.display = (matchCount === 0) ? 'block' : 'none';
  }
}

function setStoreCategoryFilter(cat, btnEl) {
  currentStoreCategory = cat;
  document.querySelectorAll('.store-filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const target = document.querySelector(`.store-filter-btn[data-category="${cat}"]`);
    if (target) target.classList.add('active');
  }

  const q = document.getElementById('storeSearchInput') ? document.getElementById('storeSearchInput').value : '';
  handleStoreLiveSearch(q);
}

function clearStoreSearch() {
  const input = document.getElementById('storeSearchInput');
  if (input) input.value = '';
  setStoreCategoryFilter('all', document.querySelector('.store-filter-btn[data-category="all"]'));
}

function handleUrlCategoryHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const catParam = (params.get('category') || hash).toLowerCase();

  if (catParam === 'novels' || catParam === 'books') {
    setStoreCategoryFilter('novels');
    const sec = document.getElementById('section-novels') || document.getElementById('storeSearchContainer');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  } else if (catParam === 'academic' || catParam === 'notes') {
    setStoreCategoryFilter('academic');
    const sec = document.getElementById('section-academic');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  } else if (catParam === 'stationery') {
    setStoreCategoryFilter('stationery');
  } else if (catParam === 'digital' || catParam === 'services' || catParam === 'professional') {
    setStoreCategoryFilter('digital');
    const sec = document.getElementById('section-digital');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleUrlCategoryHash);
} else {
  handleUrlCategoryHash();
}
window.addEventListener('hashchange', handleUrlCategoryHash);

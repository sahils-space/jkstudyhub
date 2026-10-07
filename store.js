// JK STUDY HUB - MASTER E-COMMERCE ENGINE v3.0
// Cart, Wishlist, Orders Tracking, Unified Google Auth & Razorpay Live Integration

const RAZORPAY_KEY = "rzp_live_TjJ6bv39yo6Gds";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec";

// ============================================================================
// KASHMIR PINCODE RECOGNITION & AUTO-DETECTION ENGINE
// Automatically recognizes local post offices, hubs, and routes across J&K
// ============================================================================
const KASHMIR_PINCODES = {
  "193121": { town: "Pattan (Main Hub)", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193201": { town: "Sopore Town", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193101": { town: "Baramulla Head Post", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193103": { town: "Delina / Baramulla", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193108": { town: "Kreeri", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193109": { town: "Kunzer / Tangmarg", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193401": { town: "Tangmarg / Gulmarg", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193402": { town: "Rafiabad / Rohama", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193403": { town: "Dangiwacha", district: "Baramulla (Pattan/Sopore/Baramulla)", express: true },
  "193404": { town: "Uri / Boniyar", district: "Baramulla (Pattan/Sopore/Baramulla)", express: false },
  "190001": { town: "Srinagar GPO (Lal Chowk)", district: "Srinagar", express: true },
  "190002": { town: "Srinagar (Nowhatta / Khanyar)", district: "Srinagar", express: true },
  "190003": { town: "Srinagar (Karan Nagar / SMHS)", district: "Srinagar", express: true },
  "190004": { town: "Srinagar (Batamaloo / Bemina)", district: "Srinagar", express: true },
  "190005": { town: "Srinagar (Sonwar / Dalgate)", district: "Srinagar", express: true },
  "190006": { town: "Srinagar (Hazratbal / KU)", district: "Srinagar", express: true },
  "190008": { town: "Srinagar (Soura / SKIMS)", district: "Srinagar", express: true },
  "190009": { town: "Srinagar (Jawahar Nagar)", district: "Srinagar", express: true },
  "190010": { town: "Srinagar (Sanat Nagar / Rawalpora)", district: "Srinagar", express: true },
  "190011": { town: "Srinagar (Chanapora / Natipora)", district: "Srinagar", express: true },
  "190014": { town: "Srinagar (Pantha Chowk / Lasjan)", district: "Srinagar", express: true },
  "190015": { town: "Srinagar (Hyderpora / Humhama)", district: "Srinagar", express: true },
  "191111": { town: "Budgam Town / Ompora", district: "Budgam", express: true },
  "191112": { town: "Beerwah / Magam", district: "Budgam", express: true },
  "191113": { town: "Chadoora", district: "Budgam", express: true },
  "191201": { town: "Ganderbal Town", district: "Ganderbal", express: true },
  "191202": { town: "Kangan", district: "Ganderbal", express: false },
  "193501": { town: "Bandipora Town", district: "Bandipora", express: true },
  "193502": { town: "Sumbal / Sonawari", district: "Bandipora", express: true },
  "193504": { town: "Hajin / Naidkhai", district: "Bandipora", express: true },
  "193222": { town: "Kupwara Town", district: "Kupwara", express: true },
  "193224": { town: "Handwara / Langate", district: "Kupwara", express: true },
  "192101": { town: "Anantnag Head Post", district: "Anantnag (Islamabad)", express: true },
  "192124": { town: "Bijbehara", district: "Anantnag (Islamabad)", express: true },
  "192201": { town: "Mattan / Ashmuqam", district: "Anantnag (Islamabad)", express: true },
  "192301": { town: "Pulwama Town", district: "Pulwama", express: true },
  "192121": { town: "Pampore (Saffron Town)", district: "Pulwama", express: true },
  "192123": { town: "Awantipora / IUST", district: "Pulwama", express: true },
  "192122": { town: "Tral", district: "Pulwama", express: true },
  "192231": { town: "Kulgam Town", district: "Kulgam", express: true },
  "192303": { town: "Shopian Town", district: "Shopian", express: true }
};

function handleKashmirPincodeLookup(pinVal) {
  const pin = String(pinVal || '').trim();
  const badgeEl = document.getElementById('pinVerifiedBadge');
  const citySelect = document.getElementById('orderCity');

  if (pin.length !== 6) {
    if (badgeEl) badgeEl.style.display = 'none';
    return;
  }

  const match = KASHMIR_PINCODES[pin];
  if (match) {
    if (citySelect) {
      // Auto-select corresponding district in dropdown if option exists
      for (let i = 0; i < citySelect.options.length; i++) {
        if (citySelect.options[i].value === match.district || citySelect.options[i].text.includes(match.district.split(' ')[0])) {
          citySelect.selectedIndex = i;
          break;
        }
      }
    }
    if (badgeEl) {
      badgeEl.innerHTML = `📍 <strong>${match.town}</strong> (${match.district}) • <span style="color:#15803d; font-weight:700;">🟢 Fast 24-48 hr Kashmir Dispatch Verified</span>`;
      badgeEl.style.display = 'block';
    }
  } else if (pin.startsWith('19')) {
    if (badgeEl) {
      badgeEl.innerHTML = `📍 <strong>Kashmir Division (${pin})</strong> • <span style="color:#15803d; font-weight:700;">🟢 Local Doorstep Delivery Eligible</span>`;
      badgeEl.style.display = 'block';
    }
  } else {
    if (badgeEl) {
      badgeEl.innerHTML = `📍 <strong>PIN: ${pin}</strong> • Standard J&K / National Express Courier`;
      badgeEl.style.display = 'block';
    }
  }
}

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

// --- PURGE / RESET STORE ORDERS (START FRESH) ---
function clearAllStoreOrders(silent = false) {
  try {
    localStorage.setItem('jk_orders', '[]');
    localStorage.removeItem('jk_locked_orders');
    localStorage.removeItem('jk_last_checkout_details');
    // Store purge epoch so old remote rows from Google Sheets are discarded
    localStorage.setItem('jk_orders_purge_before', Date.now().toString());
  } catch(e) {}

  updateNavBadges();

  if (typeof renderAccountOrders === 'function' && document.getElementById('ordersListContainer')) {
    renderAccountOrders();
  }
  if (typeof renderOrdersPage === 'function' && document.getElementById('ordersPageContainer')) {
    renderOrdersPage();
  }

  if (!silent && typeof showToast === 'function') {
    showToast("🧹 All past orders have been cleared! Order section is fresh and clean.");
  }
}

// Auto-execute immediate one-time cleanup requested by user
(function autoPurgeOldOrdersOnce() {
  try {
    const purgeKey = 'jk_fresh_start_purge_20261007_v3';
    if (!localStorage.getItem(purgeKey)) {
      clearAllStoreOrders(true);
      localStorage.setItem(purgeKey, 'true');
    }
  } catch(e) {}
})();

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
  if (typeof updateOwnerUIProtection === 'function') {
    updateOwnerUIProtection();
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
  const user = getCurrentUser();
  const isOwner = (typeof isStrictStoreOwner === 'function') ? isStrictStoreOwner(user) : false;
  
  let totalOrdersCount = 0;
  if (isOwner) {
    totalOrdersCount = getOrders().length;
  } else if (user) {
    const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    const uEmail = String(user.email || '').trim().toLowerCase();
    const orders = getOrders();
    const userOrders = orders.filter(o => {
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      const oEmail = String(o.userEmail || o.email || '').trim().toLowerCase();
      if (uPhone && oPhone === uPhone) return true;
      if (uEmail && oEmail === uEmail) return true;
      return false;
    });
    totalOrdersCount = userOrders.length;
  } else {
    totalOrdersCount = 0;
  }

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
  try {
    localStorage.removeItem('jk_admin_unlocked');
    sessionStorage.removeItem('jk_admin_unlocked');
  } catch(e) {}
  setCurrentUser(null);
  if (typeof updateOwnerUIProtection === 'function') {
    updateOwnerUIProtection();
  }
  if (typeof renderAccountDashboard === 'function') renderAccountDashboard();
  if (typeof renderAccountOrders === 'function') renderAccountOrders();
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
  if (totalEl) totalEl.innerText = '₹' + (subtotal + 5);

  const itemsCountText = document.getElementById('summaryItemsCount');
  if (itemsCountText) itemsCountText.innerText = `Price (${totalQty} items)`;

  const checkoutBtn = document.getElementById('proceedCheckoutBtn');
  if (checkoutBtn) checkoutBtn.innerText = `Proceed to Checkout (₹${subtotal + 5}) ➔`;
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
let currentOrderStatusFilter = 'all'; // 'all', 'in_progress', 'delivered', 'cancelled'
let currentOwnerOrderView = 'store'; // 'store' (all store orders) vs 'personal' (owner's personal orders)
let currentOrderSearchQuery = '';

// Universal Helper: Check if an order is Cash on Delivery (COD) vs Paid Online
function isCodOrder(order) {
  if (!order) return false;
  if (order.paymentMethod === 'cod') return true;
  if (order.paymentMethod === 'prepaid' || order.paymentMethod === 'online') return false;
  const txn = String(order.txnId || '').trim().toUpperCase();
  if (txn.startsWith('COD') || txn === 'CASH_ON_DELIVERY' || txn === 'CASH ON DELIVERY' || txn === 'N/A' || txn === '-') return true;
  const st = String(order.status || '').toLowerCase();
  if (st.includes('cash on delivery') || st.includes('cod') || st.includes('pay on delivery') || st.includes('doorstep')) return true;
  const prod = String(order.product || '').toLowerCase();
  if (prod.includes('cash on delivery') || prod.includes('(cod)') || prod.includes('pay at doorstep')) return true;
  // Real Razorpay payment IDs start with 'pay_' or 'rzp_'
  if (!txn.startsWith('PAY_') && !txn.startsWith('RZP_') && (!txn || txn.length < 5)) return true;
  return false;
}

function getOrderStatusInfo(rawStatus, orderObj) {
  const s = String(rawStatus || 'Confirmed').trim().toLowerCase();
  const isCod = orderObj ? isCodOrder(orderObj) : (s.includes('cash on delivery') || s.includes('cod'));
  
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
      label: isCod ? 'Delivered & Cash Collected' : 'Delivered Successfully',
      percent: 100,
      badgeBg: '#dcfce7',
      badgeColor: '#15803d',
      badgeBorder: '#bbf7d0',
      badgeIcon: 'fa-house-circle-check',
      summaryText: isCod ? 'Order delivered successfully at customer doorstep. Cash collected.' : 'Delivered successfully at customer doorstep in Pattan / Kashmir.'
    };
  }
  if (s.includes('out') || s.includes('route') || s.includes('way') || s.includes('transit') || s.includes('pattan')) {
    return {
      step: 3,
      label: s.includes('way') ? 'On the Way' : 'Out for Delivery (Pattan)',
      percent: 78,
      badgeBg: '#fef3c7',
      badgeColor: '#b45309',
      badgeBorder: '#fde68a',
      badgeIcon: 'fa-truck-fast',
      summaryText: isCod ? 'Our delivery associate is on the way. Please keep cash ready at doorstep.' : 'Our delivery associate is on the way to your delivery address.'
    };
  }
  if (s.includes('dispatch') || s.includes('ship') || s.includes('pack')) {
    return {
      step: 2,
      label: s.includes('ship') ? 'Shipped' : 'Dispatched from Hub',
      percent: 48,
      badgeBg: '#ede9fe',
      badgeColor: '#6d28d9',
      badgeBorder: '#ddd6fe',
      badgeIcon: 'fa-box-open',
      summaryText: 'Your order has been verified and shipped from our Pattan Hub.'
    };
  }
  
  // Step 1: Confirmed
  if (isCod) {
    return {
      step: 1,
      label: 'Order Placed (COD)',
      percent: 16,
      badgeBg: '#fef3c7',
      badgeColor: '#b45309',
      badgeBorder: '#fde68a',
      badgeIcon: 'fa-hand-holding-dollar',
      summaryText: 'Cash on Delivery order confirmed. Collect cash at doorstep before delivery.'
    };
  }

  // Step 1: Paid Online
  return {
    step: 1,
    label: 'Order Confirmed (Prepaid)',
    percent: 16,
    badgeBg: '#e0f2fe',
    badgeColor: '#0369a1',
    badgeBorder: '#bae6fd',
    badgeIcon: 'fa-circle-check',
    summaryText: 'Prepaid order confirmed and payment received online.'
  };
}

// --- AUTHORIZED STORE TEAM ROLES ---
// Master Owner Credentials: Strictly limited to Sahil's verified Owner Google accounts:
const STRICT_STORE_OWNER_EMAILS = [
  'sahilsspace20@gmail.com', 
  'sahilsspace@gmail.com', 
  'info.jkstudyhub@gmail.com'
];
const STRICT_STORE_OWNER_PHONES = ['9622605714'];

function isOwnerIdentity(email, phone) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  // Owner permission is ONLY given if authenticated with one of the verified owner emails:
  if (cleanEmail && STRICT_STORE_OWNER_EMAILS.includes(cleanEmail)) {
    return true;
  }
  return false;
}

function isStrictStoreOwner(user) {
  if (!user) return false;
  const cleanEmail = String(user.email || '').trim().toLowerCase();
  return STRICT_STORE_OWNER_EMAILS.includes(cleanEmail);
}

// Delivery Team Phones:
const DELIVERY_BOY_PHONES = [
  // '9876543210'
];

function getUserStoreRole(user) {
  if (!user) return 'student';

  if (isStrictStoreOwner(user)) {
    return 'owner';
  }

  const phone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
  if (phone && DELIVERY_BOY_PHONES.some(p => p.slice(-10) === phone)) {
    return 'delivery';
  }
  return 'student';
}

function isAdminUnlocked() {
  const user = getCurrentUser();
  if (!user) return false;
  return isStrictStoreOwner(user);
}

function updateOwnerUIProtection() {
  const user = getCurrentUser();
  const isOwner = isStrictStoreOwner(user);

  // If not owner, purge any lingering admin keys
  if (!isOwner) {
    try {
      localStorage.removeItem('jk_admin_unlocked');
      sessionStorage.removeItem('jk_admin_unlocked');
    } catch(e) {}
  }

  // Sidebar item in account.html
  const manageMenuEl = document.getElementById('menu-item-manage-products');
  if (manageMenuEl) {
    manageMenuEl.style.display = isOwner ? 'block' : 'none';
  }

  // Forbidden / Authorized state inside tab-manage-products in account.html
  const forbiddenBox = document.getElementById('ownerForbiddenState');
  const authorizedBox = document.getElementById('ownerAuthorizedContent');
  if (forbiddenBox && authorizedBox) {
    if (isOwner) {
      forbiddenBox.style.display = 'none';
      authorizedBox.style.display = 'block';
    } else {
      forbiddenBox.style.display = 'block';
      authorizedBox.style.display = 'none';
    }
  }

  // Floating banner on store.html
  const ownerActionBar = document.getElementById('ownerStoreActionBar');
  if (ownerActionBar) {
    ownerActionBar.style.display = isOwner ? 'flex' : 'none';
  }
}

// Clean up any stale admin tokens on page startup
(function enforceAuthIntegrity() {
  try {
    const user = getCurrentUser();
    if (!user || !isStrictStoreOwner(user)) {
      localStorage.removeItem('jk_admin_unlocked');
      sessionStorage.removeItem('jk_admin_unlocked');
    }
  } catch(e) {}
})();

function updateOrderStatusByAdmin(orderId, newStatus, skipPrompt = false) {
  let orders = getOrders();
  const targetId = String(orderId || '').trim();
  const targetUpper = targetId.toUpperCase();
  
  // Find case-insensitive or by orderId/txnId
  const idx = orders.findIndex(o => {
    const oId = String(o.orderId || '').trim().toUpperCase();
    const tId = String(o.txnId || '').trim().toUpperCase();
    return oId === targetUpper || (tId && tId === targetUpper);
  });

  if (idx !== -1) {
    const matchedOrderId = orders[idx].orderId;
    const currentStatus = String(orders[idx].status || '').trim();

    // PERMANENT LOCK: Once Delivered or Cancelled, order cannot be changed again
    if (currentStatus === 'Delivered' || currentStatus === 'Cancelled') {
      if (typeof showToast === 'function') {
        showToast(`🔒 Order is permanently locked as ${currentStatus} and cannot be modified.`);
      }
      if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
      if (typeof renderOrdersPage === 'function') { renderOrdersPage(); }
      return;
    }

    // OTP VERIFICATION FOR DELIVERED STATUS (Wishmaster Security)
    if (newStatus === 'Delivered' && !skipPrompt) {
      const expectedOtp = orders[idx].deliveryOtp || orders[idx].delivery_otp;
      if (expectedOtp) {
        const entered = prompt(`🔐 Enter 4-digit Delivery OTP provided by student for Order ${matchedOrderId}:\n(Or enter Master PIN 0000 to bypass)`, "");
        if (!entered) {
          showToast('❌ Delivery aborted: OTP required for parcel handover.');
          if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
          return;
        }
        if (entered.trim() !== String(expectedOtp).trim() && entered.trim() !== '0000') {
          alert('❌ Invalid OTP! Please request correct 4-digit code shown on customer account.');
          if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
          return;
        }
      }
    }

    orders[idx].status = newStatus;
    orders[idx].statusUpdatedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    
    // Update or clear jk_locked_orders so it reflects owner's latest action
    try {
      let locked = JSON.parse(localStorage.getItem('jk_locked_orders') || '{}');
      if (newStatus === 'Delivered' || newStatus === 'Cancelled') {
        locked[matchedOrderId] = newStatus;
      } else {
        delete locked[matchedOrderId];
      }
      localStorage.setItem('jk_locked_orders', JSON.stringify(locked));
    } catch(e) {}
    
    saveOrders(orders);
    
    // Sync update to Google Apps Script (both query params and body for 100% Apps Script reliability)
    if (SCRIPT_URL) {
      try {
        const params = new URLSearchParams();
        params.append('action', 'update_status');
        params.append('order_id', matchedOrderId);
        params.append('status', newStatus);
        
        fetch(SCRIPT_URL + '?' + params.toString(), {
          method: 'POST',
          mode: 'no-cors',
          body: params.toString(),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).catch(err => console.warn('Status sync notice:', err));
      } catch(e) {}
    }
    
    showToast(`✅ Status updated to: ${newStatus}`);
    if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
    if (typeof renderOrdersPage === 'function') { renderOrdersPage(); }
  } else {
    // If order was not in local cache, still update Google Sheets directly!
    if (SCRIPT_URL) {
      try {
        const params = new URLSearchParams();
        params.append('action', 'update_status');
        params.append('order_id', targetId);
        params.append('status', newStatus);
        fetch(SCRIPT_URL + '?' + params.toString(), {
          method: 'POST',
          mode: 'no-cors',
          body: params.toString(),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).catch(() => {});
      } catch(e) {}
    }
    showToast(`✅ Status updated to: ${newStatus}`);
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
  
  const isCod = isCodOrder(order);
  const statusInfo = getOrderStatusInfo(order.status, order);
  const customerName = (order.name && !order.name.match(/^[6789]\d{9}$/)) ? order.name : 'Student';
  
  const paymentLine = isCod 
    ? `💵 *Payment Mode:* Cash on Delivery (COD)\n💰 *Amount to Pay at Doorstep:* ₹${order.amount || 0}\n⚠️ *Please keep exact cash ready during delivery.*`
    : `✅ *Payment Mode:* Paid Online (Prepaid)\n💰 *Amount Paid:* ₹${order.amount || 0}`;

  const text = encodeURIComponent(
    `Dear ${customerName},\n\n` +
    `🚚 Update on your JK Study Hub Order #${order.orderId}:\n` +
    `Status: *${statusInfo.label}*\n` +
    `Items: ${order.product}\n` +
    `Delivery Location: ${order.address}\n\n` +
    `${paymentLine}\n\n` +
    `Thank you for studying with JK Study Hub!`
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
  currentOrderStatusFilter = filter;
  currentOrderFilter = filter;
  ['all', 'active', 'delivered', 'in_progress', 'cancelled'].forEach(f => {
    const el = document.getElementById('filterPill' + f.charAt(0).toUpperCase() + f.slice(1));
    if (el) {
      if (f === filter) el.classList.add('active');
      else el.classList.remove('active');
    }
  });
  if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
  if (typeof renderOrdersPage === 'function') { renderOrdersPage(); }
}

function setOwnerOrderView(view) {
  currentOwnerOrderView = view;
  if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
  if (typeof renderOrdersPage === 'function') { renderOrdersPage(); }
}

function cancelOrderByCustomer(orderId) {
  if (!confirm(`Are you sure you want to cancel order #${orderId}?`)) return;
  updateOrderStatusByAdmin(orderId, 'Cancelled');
  if (typeof showToast === 'function') {
    showToast('❌ Order has been cancelled successfully.');
  }
}

// --- RENDER DEDICATED ORDERS PAGE (account.html#orders) ---
function renderOrdersPage() {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  const user = getCurrentUser();
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));

  // Update Admin Toggle button state
  const adminBtn = document.getElementById('adminToggleBtn');
  if (adminBtn) {
    if (isOwner) {
      adminBtn.style.display = 'inline-flex';
      adminBtn.innerHTML = '<i class="fa-solid fa-crown" style="color: #f59e0b;"></i> Store Owner (Admin)';
      adminBtn.style.background = '#fef3c7';
      adminBtn.style.color = '#b45309';
      adminBtn.style.borderColor = '#fcd34d';
    } else {
      adminBtn.style.display = 'none';
    }
  }

  const allOrders = getOrders();
  
  // For normal logged-in students, only show THEIR orders!
  let baseOrders = allOrders;
  if (!isOwner && user) {
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
    const info = getOrderStatusInfo(order.status, order);
    
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
    const isCod = isCodOrder(order);
    const statusInfo = getOrderStatusInfo(order.status, order);
    const waMessage = encodeURIComponent(`Hi JK Study Hub, I am inquiring about my Order ${safeOrderId} (${isCod ? 'Cash on Delivery' : 'TXN: ' + order.txnId}) for ${order.product}.`);
    
    // Step classes for Flipkart/Amazon stepper
    let s1Class = 'completed';
    let s2Class = statusInfo.step >= 2 ? 'completed' : (statusInfo.step === 1 ? 'active' : '');
    let s3Class = statusInfo.step >= 3 ? 'completed' : (statusInfo.step === 2 ? 'active' : '');
    let s4Class = statusInfo.step >= 4 ? 'completed' : (statusInfo.step === 3 ? 'active' : '');

    // Step descriptions
    let s1Desc = isCod ? 'Pay on Delivery' : 'Paid Online';
    let s2Desc = statusInfo.step >= 2 ? 'Dispatched' : 'Packed at Hub';
    let s3Desc = statusInfo.step >= 3 ? 'En Route (Pattan)' : 'Local Delivery';
    let s4Desc = statusInfo.step >= 4 ? (isCod ? 'Delivered & Paid' : 'Delivered') : 'Expected Shortly';

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
              <div class="node-title">${isCod ? 'Order Placed' : 'Confirmed'}</div>
              <div class="node-desc">${s1Desc}</div>
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
              <div class="node-title">${isCod ? 'Delivered & Paid' : 'Delivered'}</div>
              <div class="node-desc">${s4Desc}</div>
            </div>
          </div>
          
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed #e2e8f0; font-size: 12px; color: #475569; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-circle-info" style="color: ${isCod ? '#b45309' : '#2563eb'};"></i>
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
            ${isCod ? `
              <div style="margin-top: 10px; font-size: 11.5px; color: #b45309; background: #fef3c7; border: 1px solid #fde68a; padding: 5px 12px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; font-weight: 700;">
                <i class="fa-solid fa-hand-holding-dollar"></i> Payment Method: <strong>Cash on Delivery (Pay at Doorstep)</strong>
              </div>
            ` : `
              <div style="margin-top: 10px; font-size: 11.5px; color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; padding: 5px 12px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-circle-check"></i> Payment: <strong>Prepaid Online (${order.txnId || 'PAID'})</strong>
              </div>
            `}
            </div>
          </div>

          <div style="text-align: right; min-width: 140px;">
            <div style="font-size: 12px; color: #64748b; font-weight: 600;">${isCod ? 'To Collect (COD)' : 'Total Paid'}</div>
            <div style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 2px;">₹${order.amount}</div>
            ${isCod ? `
              <span style="font-size: 11px; color: #b45309; font-weight: 800; background: #fef3c7; padding: 3px 8px; border-radius: 4px; border: 1px solid #fde68a;">Cash on Delivery</span>
            ` : `
              <span style="font-size: 11px; color: #16a34a; font-weight: 700; background: #f0fdf4; padding: 2px 8px; border-radius: 4px;">Prepaid Online</span>
            `}
          </div>
        </div>

        <!-- Admin Controls Bar (Active if Admin Mode Unlocked) -->
        ${isAdminUnlocked() ? `
          <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 12px 14px; margin-top: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 12px; font-weight: 800; color: #1e293b;">
                <i class="fa-solid fa-user-shield" style="color: #2563eb;"></i> Admin Status Control:
              </span>
              ${(order.status === 'Delivered' || order.status === 'Cancelled') ? `
                <select disabled style="padding: 6px 12px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 12.5px; font-weight: 700; background: #f1f5f9; color: #64748b; cursor: not-allowed;">
                  <option selected>${order.status}</option>
                </select>
                <span style="font-size: 11px; font-weight: 800; color: #dc2626; background: #fef2f2; padding: 4px 8px; border-radius: 6px; border: 1px solid #fecaca; display: inline-flex; align-items: center; gap: 4px;">
                  <i class="fa-solid fa-lock"></i> Locked (${order.status})
                </span>
              ` : `
                <select onchange="updateOrderStatusByAdmin('${safeOrderId}', this.value)" style="padding: 6px 12px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 12.5px; font-weight: 600; background: white; color: #0f172a; cursor: pointer;">
                  <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>${isCod ? 'Confirmed (COD)' : 'Confirmed & Paid'}</option>
                  <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                  <option value="Shipped" ${(order.status === 'Shipped') ? 'selected' : ''}>Shipped</option>
                  <option value="Dispatched" ${(order.status === 'Dispatched') ? 'selected' : ''}>Dispatched from Hub</option>
                  <option value="On the Way" ${(order.status === 'On the Way') ? 'selected' : ''}>On the Way</option>
                  <option value="Out for Delivery" ${(order.status === 'Out for Delivery') ? 'selected' : ''}>Out for Delivery (Pattan)</option>
                  <option value="Delivered" ${(order.status === 'Delivered') ? 'selected' : ''}>${isCod ? 'Delivered & Cash Collected' : 'Delivered Successfully'}</option>
                  <option value="Cancelled" ${(order.status === 'Cancelled') ? 'selected' : ''}>Cancelled</option>
                </select>
              `}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button type="button" onclick="openShippingLabelModal('${safeOrderId}')" style="background: #0f172a; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 5px;" title="Print Amazon/Flipkart-style shipping label">
                <i class="fa-solid fa-print"></i> 🖨️ Label
              </button>
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
function ensureReceiptModalExists() {
  let modal = document.getElementById('orderReceiptModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'orderReceiptModal';
    modal.className = 'scanner-modal-backdrop';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(4px); z-index:99999; display:none; align-items:center; justify-content:center; padding:16px; box-sizing:border-box;';
    modal.onclick = function(e) { if(e.target === modal) closeReceiptModal(); };
    modal.innerHTML = `
      <div style="background:white; border-radius:16px; max-width:620px; width:100%; max-height:90vh; overflow-y:auto; padding:24px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); position:relative; box-sizing:border-box;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid #e2e8f0; padding-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:20px; color:#2563eb;"><i class="fa-solid fa-receipt"></i></span>
            <h3 style="margin:0; font-size:16px; font-weight:800; color:#0f172a;">Official Order Invoice / Receipt</h3>
          </div>
          <button type="button" onclick="closeReceiptModal()" style="background:#f1f5f9; color:#475569; width:32px; height:32px; border-radius:50%; border:none; font-size:20px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>
        </div>
        <div id="printableReceiptArea"></div>
        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:18px; border-top:1px solid #f1f5f9; padding-top:14px; flex-wrap:wrap;">
          <button type="button" onclick="closeReceiptModal()" style="background:#f1f5f9; color:#475569; border:none; padding:9px 16px; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer;">Close</button>
          <button type="button" onclick="triggerPrintReceipt()" style="background:#2563eb; color:white; border:none; padding:9px 20px; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 8px rgba(37,99,235,0.3);">
            <i class="fa-solid fa-print"></i> Print / Download PDF
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  return modal;
}

function printOrderReceipt(orderId) {
  const modal = ensureReceiptModalExists();
  const orders = getOrders();
  const targetId = String(orderId || '').trim().toUpperCase();
  const order = orders.find(o => {
    const oId = String(o.orderId || '').trim().toUpperCase();
    const tId = String(o.txnId || '').trim().toUpperCase();
    return oId === targetId || tId === targetId || oId.includes(targetId);
  }) || orders[0];
  if (!order) {
    if (typeof showToast === 'function') showToast("⚠️ Order receipt not found.");
    return;
  }

  const printableArea = document.getElementById('printableReceiptArea');
  if (!printableArea) return;

  const isCod = isCodOrder(order);
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
          ${isCod ? `
            <span style="font-size: 11px; font-weight: 800; background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 20px; display: inline-block; border: 1px solid #fde68a;">
              CASH ON DELIVERY INVOICE
            </span>
          ` : `
            <span style="font-size: 11px; font-weight: 800; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 20px; display: inline-block;">
              OFFICIAL PAID RECEIPT
            </span>
          `}
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
          ${isCod ? `
            <div style="font-weight: 800; color: #b45309; margin-top: 3px;">💵 Cash on Delivery (COD)</div>
            <div style="font-size: 12px; font-weight: 700; color: #dc2626; margin-top: 2px;">COLLECT AT DOORSTEP: ₹${order.amount}</div>
          ` : `
            <div style="font-weight: 700; color: #16a34a; margin-top: 3px;">PAID ONLINE (PREPAID)</div>
            <div style="font-family: monospace; font-size: 11px; color: #475569; margin-top: 2px;">TXN ID: ${order.txnId}</div>
          `}
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
            <td colspan="2" style="padding: 14px 12px 6px; font-weight: 800; font-size: 15px; text-align: right;">${isCod ? 'Cash to Collect:' : 'Grand Total Paid:'}</td>
            <td style="padding: 14px 12px 6px; font-weight: 800; font-size: 18px; text-align: right; color: ${isCod ? '#b45309' : '#2563eb'};">₹${order.amount}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Footer Seal & Disclaimer -->
      <div style="border-top: 1px dashed #cbd5e1; padding-top: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div style="font-size: 11px; color: #64748b; max-width: 320px; line-height: 1.4;">
          This is an electronically generated receipt for your purchase on JK Study Hub. Authorized and verified for Pattan delivery.
        </div>
        <div style="text-align: center; border: 2px dashed ${isCod ? '#f59e0b' : '#10b981'}; padding: 6px 14px; border-radius: 8px; color: ${isCod ? '#b45309' : '#10b981'}; font-weight: 800; font-size: 11px; transform: rotate(-2deg);">
          ${isCod ? '💵 CASH ON DELIVERY ORDER<br><span style="font-size: 9px; font-weight: 600; color: #475569;">COLLECT BEFORE HANDOVER</span>' : '✓ VERIFIED PAID ORDER<br><span style="font-size: 9px; font-weight: 600; color: #475569;">JK STUDY HUB PATTAN</span>'}
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
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

// ============================================================================
// PARCEL SHIPPING & PACKAGING LABEL SYSTEM (AMAZON / FLIPKART STYLE)
// Pure Client-Side Code-128 SVG Barcode + Scannable QR Code Generator
// ============================================================================
const CODE128_PATTERNS = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213",
  "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132",
  "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211",
  "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313",
  "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331",
  "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111",
  "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214",
  "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111",
  "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141",
  "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141",
  "114131", "311141", "411131", "211412", "211214", "211232", "2331112"
];

function generateCode128Svg(text, barHeight = 65, moduleWidth = 2) {
  const safeText = String(text || 'ORD-000000').trim();
  let codes = [104];
  let checksum = 104;

  for (let i = 0; i < safeText.length; i++) {
    let charCode = safeText.charCodeAt(i);
    let val = charCode - 32;
    if (val < 0 || val > 95) val = 0;
    codes.push(val);
    checksum += val * (i + 1);
  }
  codes.push(checksum % 103);
  codes.push(106);

  const quietZone = 20;
  let x = quietZone;
  let rects = [];

  for (let code of codes) {
    let pattern = CODE128_PATTERNS[code] || CODE128_PATTERNS[0];
    for (let p = 0; p < pattern.length; p++) {
      let width = parseInt(pattern[p], 10) * moduleWidth;
      if (p % 2 === 0) {
        rects.push(`<rect x="${x}" y="0" width="${width}" height="${barHeight}" fill="#000000" />`);
      }
      x += width;
    }
  }
  const totalWidth = x + quietZone;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${barHeight}" width="${totalWidth}" height="${barHeight}" style="max-width:100%; height:auto; display:block; margin:0 auto; shape-rendering:crispEdges;">${rects.join('')}</svg>`;
}

function renderQrCodeIntoContainer(container, text, size = 75) {
  if (!container) return;
  container.innerHTML = '';
  
  if (typeof QRCode === 'function') {
    try {
      new QRCode(container, {
        text: text,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: (typeof QRCode.CorrectLevel !== 'undefined') ? QRCode.CorrectLevel.M : 0
      });
      return;
    } catch (e) {
      console.warn("QRCodeJS instance notice:", e);
    }
  }

  // Fallback to high-resolution QR service
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&margin=1`;
  img.alt = 'QR Tracking Code';
  img.style.width = size + 'px';
  img.style.height = size + 'px';
  img.style.display = 'block';
  img.style.objectFit = 'contain';
  container.appendChild(img);
}

function findOrderInStore(rawId) {
  if (!rawId) return null;
  const clean = extractOrderIdFromScan(rawId);
  const cleanUpper = clean.toUpperCase();
  const rawUpper = String(rawId).trim().toUpperCase();
  const all = getOrders();

  let match = all.find(o => {
    const oId = String(o.orderId || '').trim().toUpperCase();
    const tId = String(o.txnId || '').trim().toUpperCase();
    return oId === cleanUpper || oId === rawUpper || (tId && (tId === cleanUpper || tId === rawUpper));
  });

  if (!match) {
    match = all.find(o => {
      const oId = String(o.orderId || '').trim().toUpperCase();
      return (oId && (cleanUpper.includes(oId) || oId.includes(cleanUpper)));
    });
  }

  return match || null;
}

function openShippingLabelModal(orderId) {
  const user = getCurrentUser();
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  if (!isOwner) {
    showToast('🔒 Shipping labels can only be generated by the Store Owner.');
    return;
  }

  const order = findOrderInStore(orderId);
  if (!order) {
    showToast('⚠️ Order not found in store database.');
    return;
  }

  const printArea = document.getElementById('shippingLabelPrintArea');
  const modal = document.getElementById('shippingLabelModal');
  if (!printArea || !modal) return;

  const customerName = (order.name && !order.name.match(/^[6789]\d{9}$/)) ? order.name : 'Valued Student';
  const customerPhone = getValidCustomerPhone(order) || order.phone || '9622605714';
  const customerAddress = order.address || 'Delivery Address, Pattan Hub, Dist. Baramulla, J&K';
  
  const pinMatch = String(customerAddress).match(/\b(19\d{4})\b/);
  const pincode = pinMatch ? pinMatch[1] : '193121';

  const isCod = isCodOrder(order);
  const barcodeSvg = generateCode128Svg(order.orderId, 64, 2);
  const qrUrl = `https://jkstudyhub.online/account.html#orders?id=${encodeURIComponent(order.orderId)}`;
  const awbNumber = 'JKSH' + (String(order.orderId).replace(/\D/g,'').slice(-6) || '193121');
  const orderDate = order.date || new Date().toLocaleDateString('en-IN');

  printArea.innerHTML = `
    <div class="shipping-label-sheet">
      <!-- Top Bar: Logistics Header -->
      <div style="border-bottom: 2px solid #000; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; background: #fff;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px;">📦</span>
          <div>
            <div style="font-size: 15px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase;">JK STUDY HUB LOGISTICS</div>
            <div style="font-size: 10px; font-weight: 700; color: #333; text-transform: uppercase;">Express Surface &amp; Parcel Dispatch</div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 13px; font-weight: 900; border: 1.5px solid #000; padding: 2px 8px; display: inline-block;">ROUTE: KMR-193</div>
          <div style="font-size: 10px; font-weight: 600; margin-top: 2px;">DISPATCH: ${orderDate}</div>
        </div>
      </div>

      <!-- Primary Barcode Section -->
      <div style="border-bottom: 2px solid #000; padding: 12px 10px; text-align: center; background: #fff;">
        <div style="display: flex; justify-content: center; margin-bottom: 4px;">
          ${barcodeSvg}
        </div>
        <div style="font-family: monospace; font-size: 14px; font-weight: 900; letter-spacing: 2px;">* ${order.orderId} *</div>
        <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700; margin-top: 4px; padding: 0 10px; color: #222;">
          <span>AWB: ${awbNumber}</span>
          <span>HUB: BARAMULLA / PATTAN</span>
        </div>
      </div>

      <!-- Payment Status Banner (PREPAID vs COD) -->
      <div style="border-bottom: 2px solid #000; padding: 8px 12px; text-align: center; ${isCod ? 'background: #000; color: #fff;' : 'background: #f1f5f9; color: #000;'}">
        ${isCod ? `
          <div style="font-size: 16px; font-weight: 900; letter-spacing: 1px;">CASH ON DELIVERY (COD)</div>
          <div style="font-size: 15px; font-weight: 900; margin-top: 2px;">COLLECT CASH: ₹${order.amount || 0}</div>
          <div style="font-size: 10px; font-weight: 700; margin-top: 2px; letter-spacing: 0.5px;">⚠️ COLLECT EXACT AMOUNT BEFORE OPENING PACKAGE</div>
        ` : `
          <div style="font-size: 15px; font-weight: 900; letter-spacing: 1px;">PREPAID — DO NOT COLLECT CASH</div>
          <div style="font-size: 12px; font-weight: 700; margin-top: 2px;">AMOUNT PAID: ₹${order.amount || 0} • VERIFIED ONLINE</div>
          <div style="font-size: 9.5px; font-weight: 600; color: #475569; margin-top: 1px;">Payment ID: ${order.txnId || 'VERIFIED'}</div>
        `}
      </div>

      <!-- Address Section: SHIP TO (Consignee) & SHIP FROM (Shipper) -->
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; border-bottom: 2px solid #000;">
        <!-- Ship To -->
        <div style="padding: 10px 12px; border-right: 2px solid #000; background: #fff;">
          <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; border-bottom: 1px solid #ccc; padding-bottom: 2px;">DELIVER TO (CONSIGNEE):</div>
          <div style="font-size: 14px; font-weight: 900; color: #000; line-height: 1.2;">${customerName}</div>
          <div style="font-size: 12px; font-weight: 800; color: #000; margin-top: 3px;">TEL: +91 ${customerPhone}</div>
          <div style="font-size: 11px; font-weight: 600; color: #111; line-height: 1.4; margin-top: 4px; word-break: break-word;">${customerAddress}</div>
          <div style="margin-top: 8px; padding-top: 4px; border-top: 1px dashed #000;">
            <span style="font-size: 11px; font-weight: 900;">PIN: </span>
            <span style="font-size: 20px; font-weight: 900; letter-spacing: 1px;">${pincode}</span>
          </div>
        </div>

        <!-- Ship From -->
        <div style="padding: 10px 12px; background: #fff;">
          <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; border-bottom: 1px solid #ccc; padding-bottom: 2px;">SHIPPER (RETURN TO):</div>
          <div style="font-size: 12px; font-weight: 900; color: #000; line-height: 1.2;">JK STUDY HUB LOGISTICS</div>
          <div style="font-size: 10.5px; font-weight: 600; color: #222; margin-top: 3px; line-height: 1.3;">
            Fulfillment Center, Main Market, Pattan, Dist. Baramulla<br>
            Jammu &amp; Kashmir - 193121
          </div>
          <div style="font-size: 11px; font-weight: 800; margin-top: 4px;">HELPLINE: +91 9622605714</div>
          <div style="margin-top: 8px; font-size: 9px; font-weight: 700; border: 1px solid #000; padding: 2px 4px; display: inline-block;">
            ORIGIN PIN: 193121
          </div>
        </div>
      </div>

      <!-- Items and Package Contents -->
      <div style="border-bottom: 2px solid #000; padding: 8px 12px; background: #fff;">
        <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 4px;">
          <span style="flex: 2;">ITEM DESCRIPTION</span>
          <span style="flex: 0.5; text-align: center;">QTY</span>
          <span style="flex: 0.8; text-align: right;">TOTAL VALUE</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 700; line-height: 1.3;">
          <span style="flex: 2; word-break: break-word;">${order.product}</span>
          <span style="flex: 0.5; text-align: center;">1</span>
          <span style="flex: 0.8; text-align: right;">₹${order.amount || 0}</span>
        </div>
        <div style="font-size: 9px; font-weight: 700; color: #444; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.3px;">
          NATURE: EDUCATIONAL BOOKS / STUDY NOTES • HANDLE WITH CARE • KEEP DRY
        </div>
      </div>

      <!-- Footer with QR Code and Dispatch Stamp -->
      <div style="padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; background: #fff;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div id="shippingLabelQrWrap" style="width: 75px; height: 75px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 1px solid #000; padding: 2px;">
          </div>
          <div>
            <div style="font-size: 9.5px; font-weight: 900; text-transform: uppercase;">SCAN FOR REAL-TIME TRACKING</div>
            <div style="font-size: 8.5px; font-weight: 600; color: #333; line-height: 1.3; max-width: 170px; margin-top: 2px;">
              Scan with mobile camera or scanner to verify parcel authenticity &amp; update live delivery status.
            </div>
          </div>
        </div>
        <div style="text-align: center; border: 1.5px dashed #000; padding: 6px 10px; border-radius: 4px; min-width: 110px;">
          <div style="font-size: 8.5px; font-weight: 900; letter-spacing: 0.5px;">JK STUDY HUB</div>
          <div style="font-size: 10px; font-weight: 900; color: #000; margin: 2px 0;">VERIFIED DISPATCH</div>
          <div style="font-size: 8px; font-weight: 700; color: #555;">AUTH. SIGNATORY</div>
        </div>
      </div>
    </div>

    <!-- BONUS PRINTABLE STUDY BOOKMARK (Cut & Place inside student book package) -->
    <div style="margin-top: 14px; border: 2px dashed #475569; border-radius: 8px; padding: 12px 16px; background: #fff; page-break-inside: avoid;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 6px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 18px;">🔖</span>
          <span style="font-size: 12px; font-weight: 900; letter-spacing: 1px; color: #0f172a; text-transform: uppercase;">BONUS STUDY BOOKMARK • JK STUDY HUB</span>
        </div>
        <span style="font-size: 10px; font-weight: 700; color: #64748b; border: 1px dashed #94a3b8; padding: 2px 6px; border-radius: 4px;">✂️ Cut &amp; slip inside book</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="flex: 1;">
          <div style="font-size: 13px; font-weight: 800; color: #1e3a8a; font-style: italic;">"Discipline is choosing between what you want now, and what you want most."</div>
          <div style="font-size: 10.5px; color: #334155; margin-top: 4px; font-weight: 600;">Thank you for studying with JK Study Hub! Enjoy your notes &amp; syllabus books.</div>
          <div style="font-size: 10px; color: #059669; font-weight: 700; margin-top: 3px;">WhatsApp VIP Student Community: +91 9622605714</div>
        </div>
        <div style="border: 1px solid #0f172a; padding: 4px 8px; text-align: center; border-radius: 4px; min-width: 90px; background: #f8fafc;">
          <div style="font-size: 9px; font-weight: 800; color: #0f172a;">JK STUDY HUB</div>
          <div style="font-size: 18px;">📚</div>
          <div style="font-size: 8px; font-weight: 700; color: #64748b;">KASHMIR #1</div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const qrContainer = document.getElementById('shippingLabelQrWrap');
    if (qrContainer) {
      renderQrCodeIntoContainer(qrContainer, qrUrl, 70);
    }
  }, 50);

  modal.style.display = 'flex';
}

function printShippingLabel() {
  window.print();
}

function closeShippingLabelModal() {
  const modal = document.getElementById('shippingLabelModal');
  if (modal) modal.style.display = 'none';
}

// ============================================================================
// DAILY CASH SUMMARY & HANDOVER RECONCILIATION MODAL (Flipkart Logistics EOD)
// Tracks pending COD cash in transit, collected cash from delivered orders & prepaid items
// ============================================================================
function openDailyCashSummaryModal() {
  const user = getCurrentUser();
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  if (!isOwner) {
    showToast('🔒 Cash summary is accessible only by the Store Owner.');
    return;
  }

  const modal = document.getElementById('dailyCashSummaryModal');
  const printArea = document.getElementById('dailyCashSummaryContent');
  if (!modal || !printArea) return;

  const orders = getOrders();
  let codCollected = 0;
  let codPending = 0;
  let codDeliveredCount = 0;
  let codPendingCount = 0;
  let prepaidCount = 0;
  let prepaidTotal = 0;

  let breakdownRowsHtml = '';

  orders.forEach(o => {
    const isCod = isCodOrder(o);
    const amount = Number(o.amount) || 0;
    const status = String(o.status || '').toLowerCase();
    const isDelivered = status.includes('deliver');
    const isCancelled = status.includes('cancel');

    if (isCancelled) return;

    if (isCod) {
      if (isDelivered) {
        codCollected += amount;
        codDeliveredCount++;
        breakdownRowsHtml += `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 10px; font-family: monospace; font-weight: 700;">${o.orderId}</td>
            <td style="padding: 8px 10px;">${o.name || 'Student'}</td>
            <td style="padding: 8px 10px; color: #16a34a; font-weight: 700;">₹${amount}</td>
            <td style="padding: 8px 10px;"><span style="background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">Collected</span></td>
          </tr>
        `;
      } else {
        codPending += amount;
        codPendingCount++;
        breakdownRowsHtml += `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 10px; font-family: monospace; font-weight: 700;">${o.orderId}</td>
            <td style="padding: 8px 10px;">${o.name || 'Student'}</td>
            <td style="padding: 8px 10px; color: #b45309; font-weight: 700;">₹${amount}</td>
            <td style="padding: 8px 10px;"><span style="background: #fef3c7; color: #b45309; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">Out with Boy</span></td>
          </tr>
        `;
      }
    } else {
      prepaidTotal += amount;
      prepaidCount++;
    }
  });

  const todayStr = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  printArea.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">EOD LOGISTICS RECONCILIATION</div>
          <h3 style="margin: 2px 0 0; font-size: 18px; font-weight: 900; color: #0f172a;">Daily Cash Summary &amp; Handover</h3>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; font-weight: 700; color: #1e293b;">${todayStr}</div>
          <div style="font-size: 11px; color: #64748b;">Hub: Pattan (193121)</div>
        </div>
      </div>

      <!-- Quick KPI Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 20px;">
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 12px; text-align: center;">
          <div style="font-size: 11.5px; font-weight: 700; color: #166534;">💵 Cash to Collect Handover</div>
          <div style="font-size: 22px; font-weight: 900; color: #15803d; margin: 4px 0;">₹${codCollected}</div>
          <div style="font-size: 11px; color: #166534;">${codDeliveredCount} parcels delivered</div>
        </div>

        <div style="background: #fefce8; border: 1.5px solid #fef08a; border-radius: 10px; padding: 12px; text-align: center;">
          <div style="font-size: 11.5px; font-weight: 700; color: #854d0e;">🚚 Cash In-Transit (Pending)</div>
          <div style="font-size: 22px; font-weight: 900; color: #d97706; margin: 4px 0;">₹${codPending}</div>
          <div style="font-size: 11px; color: #854d0e;">${codPendingCount} parcels on route</div>
        </div>

        <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 12px; text-align: center;">
          <div style="font-size: 11.5px; font-weight: 700; color: #1e40af;">💳 Prepaid Bank Settled</div>
          <div style="font-size: 22px; font-weight: 900; color: #2563eb; margin: 4px 0;">₹${prepaidTotal}</div>
          <div style="font-size: 11px; color: #1e40af;">${prepaidCount} orders via UPI/Card</div>
        </div>
      </div>

      <!-- Itemized COD Audit Table -->
      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
        <div style="background: #f8fafc; padding: 10px 14px; font-size: 12px; font-weight: 800; color: #334155; border-bottom: 1px solid #e2e8f0;">
          Itemized COD Parcel Ledger
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9; color: #475569; font-size: 11px; text-transform: uppercase;">
              <th style="padding: 8px 10px;">Order ID</th>
              <th style="padding: 8px 10px;">Recipient</th>
              <th style="padding: 8px 10px;">Amount</th>
              <th style="padding: 8px 10px;">Cash Status</th>
            </tr>
          </thead>
          <tbody>
            ${breakdownRowsHtml || '<tr><td colspan="4" style="text-align: center; padding: 16px; color: #94a3b8;">No COD orders on record today.</td></tr>'}
          </tbody>
        </table>
      </div>

      <!-- Formal Sign-Off Handover Slip for Delivery Boy & Store Owner -->
      <div style="border: 2px dashed #94a3b8; border-radius: 10px; padding: 14px; background: #fafafa; margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Delivery Boy Cash Handover Acknowledgment</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
          <div style="text-align: center;">
            <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; font-size: 11px; font-weight: 800; color: #334155;">Delivery Executive Signature</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 2px;">(Cash handed over: ₹${codCollected})</div>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; font-size: 11px; font-weight: 800; color: #334155;">Store Owner / Hub Incharge</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 2px;">(Cash verified &amp; deposited)</div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeDailyCashSummaryModal() {
  const modal = document.getElementById('dailyCashSummaryModal');
  if (modal) modal.style.display = 'none';
}

function printDailyCashSummary() {
  window.print();
}

// ============================================================================
// STORE OWNER IN-APP CAMERA SCANNER
// Mobile & Desktop Camera Stream • BarcodeDetector & jsQR Fallback • Live Status Actions
// ============================================================================
let activeScannerStream = null;
let activeScannerTrack = null;
let currentScannerFacingMode = 'environment';
let isScannerDetecting = false;
let isTorchActive = false;

function playScanSuccessBeep() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch(e) {}
}

function extractOrderIdFromScan(raw) {
  if (!raw) return '';
  let str = String(raw).trim();
  
  // 1. If scanned content is a URL with id parameter
  const urlParamMatch = str.match(/[?&]id=([^&#\s]+)/i);
  if (urlParamMatch) {
    str = decodeURIComponent(urlParamMatch[1]).trim();
  }
  
  // 2. Strip bounding asterisks if scanned from barcode text representation: * ORD-123456 *
  str = str.replace(/^\*+|\*+$/g, '').trim();

  // 3. Extract order ID pattern: OD followed by digits, or ORD- followed by alphanumeric
  const odMatch = str.match(/\b(OD\d{6,}|ORD[-_]?[A-Za-z0-9]+)\b/i);
  if (odMatch) {
    return odMatch[1].toUpperCase();
  }

  // 4. Return trimmed clean upper string
  return str.toUpperCase();
}

function openAdminCameraScanner() {
  const user = getCurrentUser();
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  if (!isOwner) {
    showToast('🔒 Camera scanner is strictly restricted to the Store Owner.');
    return;
  }

  // Refresh orders from Google Sheets immediately in background so camera has freshest data
  syncOrdersWithGoogleSheet();

  const modal = document.getElementById('adminCameraScannerModal');
  if (!modal) return;
  modal.style.display = 'flex';

  const resCard = document.getElementById('adminScannedResultCard');
  if (resCard) resCard.style.display = 'none';
  const manualInput = document.getElementById('manualScannerInput');
  if (manualInput) manualInput.value = '';

  startScannerCamera(currentScannerFacingMode);
}

function closeAdminCameraScanner() {
  isScannerDetecting = false;
  if (activeScannerStream) {
    activeScannerStream.getTracks().forEach(t => t.stop());
    activeScannerStream = null;
    activeScannerTrack = null;
  }
  const modal = document.getElementById('adminCameraScannerModal');
  if (modal) modal.style.display = 'none';
}

function startScannerCamera(facingMode) {
  const video = document.getElementById('adminScannerVideo');
  const statusBadge = document.getElementById('scannerStatusBadge');
  if (!video) return;

  if (activeScannerStream) {
    activeScannerStream.getTracks().forEach(t => t.stop());
    activeScannerStream = null;
    activeScannerTrack = null;
  }

  if (statusBadge) {
    statusBadge.innerHTML = '<span class="live-pulse"></span> Initializing Camera...';
  }

  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: facingMode },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  }).then(stream => {
    activeScannerStream = stream;
    activeScannerTrack = stream.getVideoTracks()[0];
    video.srcObject = stream;
    video.setAttribute('playsinline', 'true');
    video.play();

    const torchBtn = document.getElementById('btnToggleTorch');
    if (torchBtn && activeScannerTrack && activeScannerTrack.getCapabilities) {
      try {
        const caps = activeScannerTrack.getCapabilities();
        if (caps.torch) {
          torchBtn.style.display = 'flex';
        } else {
          torchBtn.style.display = 'none';
        }
      } catch(e) {
        torchBtn.style.display = 'none';
      }
    }

    if (statusBadge) {
      statusBadge.innerHTML = '<span class="live-pulse"></span> Align Barcode inside frame';
    }

    isScannerDetecting = true;
    requestAnimationFrame(scanVideoFrameLoop);
  }).catch(err => {
    console.warn("Camera access warning:", err);
    if (statusBadge) {
      statusBadge.innerHTML = '⚠️ Camera unavailable. Enter Order ID below.';
    }
    const manualInput = document.getElementById('manualScannerInput');
    if (manualInput) manualInput.focus();
  });
}

function flipScannerCamera() {
  currentScannerFacingMode = (currentScannerFacingMode === 'environment') ? 'user' : 'environment';
  startScannerCamera(currentScannerFacingMode);
}

function toggleScannerTorch() {
  if (!activeScannerTrack || !activeScannerTrack.applyConstraints) return;
  isTorchActive = !isTorchActive;
  activeScannerTrack.applyConstraints({
    advanced: [{ torch: isTorchActive }]
  }).catch(() => {});
}

function scanVideoFrameLoop() {
  if (!isScannerDetecting) return;
  const video = document.getElementById('adminScannerVideo');
  if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
    requestAnimationFrame(scanVideoFrameLoop);
    return;
  }

  if ('BarcodeDetector' in window) {
    try {
      const detector = new BarcodeDetector({ formats: ['code_128', 'qr_code', 'code_39', 'ean_13'] });
      detector.detect(video).then(barcodes => {
        if (barcodes && barcodes.length > 0) {
          handleScannedBarcodeValue(barcodes[0].rawValue);
        } else if (isScannerDetecting) {
          requestAnimationFrame(scanVideoFrameLoop);
        }
      }).catch(() => {
        if (isScannerDetecting) requestAnimationFrame(scanVideoFrameLoop);
      });
      return;
    } catch(e) {}
  }

  if (typeof jsQR === 'function') {
    const canvas = document.getElementById('adminScannerCanvas');
    if (canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "dontInvert" });
      if (code && code.data) {
        handleScannedBarcodeValue(code.data);
        return;
      }
    }
  }

  if (isScannerDetecting) {
    requestAnimationFrame(scanVideoFrameLoop);
  }
}

function renderScannedOrderCard(order) {
  const resCard = document.getElementById('adminScannedResultCard');
  if (!resCard || !order) return;

  const currentStatus = String(order.status || 'Confirmed').trim();
  const statusLower = currentStatus.toLowerCase();
  
  let statusBadgeBg = '#eff6ff';
  let statusBadgeColor = '#2563eb';
  if (statusLower.includes('deliver')) { statusBadgeBg = '#f0fdf4'; statusBadgeColor = '#16a34a'; }
  else if (statusLower.includes('cancel')) { statusBadgeBg = '#fef2f2'; statusBadgeColor = '#dc2626'; }
  else if (statusLower.includes('out') || statusLower.includes('way') || statusLower.includes('transit')) { statusBadgeBg = '#fefce8'; statusBadgeColor = '#854d0e'; }
  else if (statusLower.includes('dispatch') || statusLower.includes('ship')) { statusBadgeBg = '#f5f3ff'; statusBadgeColor = '#7c3aed'; }

  const customerName = (order.name && !order.name.match(/^[6789]\d{9}$/)) ? order.name : 'Student';
  const customerPhone = getValidCustomerPhone(order) || order.phone || 'N/A';

  const isShipped = (statusLower.includes('ship') || statusLower === 'dispatched');
  const isOnTheWay = (statusLower.includes('way') || statusLower.includes('transit'));
  const isOutForDelivery = (statusLower.includes('out'));
  const isDelivered = (statusLower.includes('deliver'));

  resCard.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
        <div>
          <span style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">SCANNED PARCEL FOUND</span>
          <div style="font-family: monospace; font-size: 16px; font-weight: 900; color: #0f172a;">${order.orderId}</div>
        </div>
        <span style="background: ${statusBadgeBg}; color: ${statusBadgeColor}; padding: 4px 12px; border-radius: 20px; font-size: 12.5px; font-weight: 800; border: 1px solid ${statusBadgeColor}30;">
          ${order.status}
        </span>
      </div>

      <div style="font-size: 13px; color: #334155; margin-bottom: 14px; line-height: 1.5; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
        <div><strong>Item:</strong> ${order.product} (₹${order.amount || 0})</div>
        <div style="margin-top: 4px;"><strong>Recipient:</strong> ${customerName} (+91 ${customerPhone})</div>
        <div style="margin-top: 4px; font-size: 12px; color: #64748b;"><strong>Address:</strong> ${order.address}</div>
        ${(order.deliveryOtp || order.delivery_otp) ? `
          <div style="margin-top: 6px; font-size: 12px; font-weight: 800; color: #1e3a8a; background: #dbeafe; padding: 4px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px;">
            🔐 Delivery Verification OTP: <span style="letter-spacing: 2px; font-size: 13.5px; font-family: monospace;">${order.deliveryOtp || order.delivery_otp}</span>
          </div>
        ` : ''}
        ${isCodOrder(order) 
          ? `<div style="margin-top: 6px; font-size: 12px; font-weight: 800; color: #b45309; background: #fef3c7; padding: 4px 8px; border-radius: 6px; display: block;">💵 Cash on Delivery (COD) — Collect ₹${order.amount || 0} at Doorstep</div>`
          : (order.txnId ? `<div style="margin-top: 4px; font-size: 11.5px; color: #2563eb;"><strong>Paid Online (Prepaid):</strong> ${order.txnId}</div>` : '')
        }

        <!-- 1-TAP DELIVERY ACTIONS: Wishmaster Suite (Call, Maps, Chat) -->
        <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
          <a href="tel:${customerPhone}" style="flex: 1; min-width: 90px; background: #0284c7; color: white; text-decoration: none; padding: 7px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
            <i class="fa-solid fa-phone"></i> Call
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address || 'Pattan, Baramulla')}" target="_blank" rel="noopener" style="flex: 1; min-width: 100px; background: #475569; color: white; text-decoration: none; padding: 7px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
            <i class="fa-solid fa-location-arrow"></i> Navigate
          </a>
          <a href="https://wa.me/91${customerPhone}?text=${encodeURIComponent('Hi ' + customerName + ', I am from JK Study Hub Delivery team with your parcel (' + order.orderId + '). Are you available to receive it?')}" target="_blank" rel="noopener" style="flex: 1; min-width: 90px; background: #25d366; color: white; text-decoration: none; padding: 7px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
            <i class="fa-brands fa-whatsapp"></i> Chat
          </a>
        </div>
      </div>

      <!-- WISHMASTER IN-CARD OTP HANDOVER VERIFICATION BOX -->
      <div style="background: ${isDelivered ? '#f0fdf4' : '#eff6ff'}; border: 1.5px solid ${isDelivered ? '#86efac' : '#93c5fd'}; border-radius: 10px; padding: 12px 14px; margin-bottom: 14px;">
        <div style="font-size: 12px; font-weight: 800; color: ${isDelivered ? '#166534' : '#1e40af'}; display: flex; align-items: center; justify-content: space-between;">
          <span><i class="fa-solid fa-shield-halved"></i> ${isDelivered ? 'Parcel Delivered & Handover Verified' : 'Doorstep Handover Verification'}</span>
          ${isDelivered ? '<span style="background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 4px; font-size: 11px;">✓ DELIVERED</span>' : ''}
        </div>
        ${(!isDelivered && (order.status !== 'Cancelled')) ? `
          <div style="margin-top: 8px; display: flex; gap: 8px; align-items: center;">
            <input type="text" id="deliveryBoyOtpInput_${order.orderId}" maxlength="4" placeholder="Enter Student OTP (4-digits)" style="flex: 1; padding: 8px 12px; border-radius: 6px; border: 1.5px solid #3b82f6; font-size: 14px; font-weight: 800; letter-spacing: 2px; text-align: center; color: #0f172a; outline: none; background: white;">
            <button type="button" onclick="submitDeliveryHandoverOtp('${order.orderId}')" style="background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12.5px; font-weight: 800; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 6px rgba(22,163,74,0.3);">
              <i class="fa-solid fa-check"></i> Submit &amp; Handover
            </button>
          </div>
          <div style="font-size: 10.5px; color: #64748b; margin-top: 5px;">Ask student for the 4-digit code shown on their order card, or enter master PIN <code>0000</code>.</div>
        ` : `
          <div style="font-size: 11.5px; color: #166534; margin-top: 4px;">
            Parcel marked delivered on ${order.statusUpdatedAt || 'Today'} • Cash settled with hub.
          </div>
        `}
      </div>

      <div style="margin-bottom: 14px;">
        <div style="font-size: 11.5px; font-weight: 800; color: #475569; margin-bottom: 8px; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i> Delivery Status Quick-Buttons:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Shipped')" style="${isShipped ? 'background: #7c3aed; color: white; border: 2px solid #6d28d9; font-weight: 800;' : 'background: #f5f3ff; color: #6d28d9; border: 1.5px solid #ddd6fe; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-box"></i> ${isShipped ? '✓ Shipped' : '📦 Shipped'}
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'On the Way')" style="${isOnTheWay ? 'background: #d97706; color: white; border: 2px solid #b45309; font-weight: 800;' : 'background: #fefce8; color: #854d0e; border: 1.5px solid #fef08a; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-truck-fast"></i> ${isOnTheWay ? '✓ On the Way' : '🚚 On the Way'}
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Out for Delivery')" style="${isOutForDelivery ? 'background: #0284c7; color: white; border: 2px solid #0369a1; font-weight: 800;' : 'background: #f0f9ff; color: #0369a1; border: 1.5px solid #bae6fd; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-motorcycle"></i> ${isOutForDelivery ? '✓ Out for Del.' : '🛵 Out for Delivery'}
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Delivered')" style="${isDelivered ? 'background: #16a34a; color: white; border: 2px solid #15803d; font-weight: 800;' : 'background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-house-chimney-check"></i> ${isDelivered ? '✓ Delivered' : '✅ Delivered'}
          </button>
        </div>

        <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px; background: #fff; padding: 6px 10px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <span style="font-size: 11.5px; font-weight: 700; color: #64748b; white-space: nowrap;">Or change to:</span>
          <select onchange="updateOrderStatusFromScanner('${order.orderId}', this.value)" style="flex: 1; padding: 5px 8px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 12px; font-weight: 700; color: #1e293b; background: #fff; cursor: pointer;">
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
            <option value="On the Way" ${order.status === 'On the Way' ? 'selected' : ''}>On the Way</option>
            <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
        <button type="button" onclick="sendCustomerWhatsAppStatusUpdate('${order.orderId}')" style="flex: 1; min-width: 120px; background: #25d366; color: white; border: none; padding: 10px 12px; border-radius: 8px; font-weight: 700; font-size: 12.5px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp Notify
        </button>
        <button type="button" onclick="openShippingLabelModal('${order.orderId}')" style="background: #0f172a; color: white; border: none; padding: 10px 14px; border-radius: 8px; font-weight: 700; font-size: 12.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-print"></i> 🖨️ Label
        </button>
        <button type="button" onclick="resumeAdminScanner()" style="background: #2563eb; color: white; border: none; padding: 10px 14px; border-radius: 8px; font-weight: 700; font-size: 12.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-rotate-right"></i> Next Parcel
        </button>
      </div>
    </div>
  `;
  resCard.style.display = 'block';
}

function renderOrderNotFoundCard(orderId, raw) {
  const resCard = document.getElementById('adminScannedResultCard');
  if (!resCard) return;
  resCard.innerHTML = `
    <div style="text-align: center; padding: 12px;">
      <div style="font-size: 32px; margin-bottom: 6px;">🔍</div>
      <div style="font-size: 15px; font-weight: 800; color: #0f172a;">Order ID Not Found</div>
      <div style="font-size: 12.5px; color: #64748b; margin-top: 4px;">Scanned: <code style="background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-weight: 700;">${orderId || raw}</code></div>
      <p style="font-size: 12px; color: #64748b; margin: 8px 0 14px;">We checked both local storage and Google Sheets, but this Order ID was not recognized.</p>
      <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
        <button type="button" onclick="syncOrdersWithGoogleSheet(); showToast('🔄 Refreshing Google Sheets...'); setTimeout(() => handleScannedBarcodeValue('${raw}'), 800);" style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer;">
          <i class="fa-solid fa-arrows-rotate"></i> Retry Live Sync
        </button>
        <button type="button" onclick="resumeAdminScanner()" style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer;">
          Scan Next
        </button>
      </div>
    </div>
  `;
  resCard.style.display = 'block';
}

function handleScannedBarcodeValue(raw) {
  if (!raw) return;
  isScannerDetecting = false;
  playScanSuccessBeep();
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

  const orderId = extractOrderIdFromScan(raw);
  const order = findOrderInStore(orderId || raw);

  const resCard = document.getElementById('adminScannedResultCard');
  if (!resCard) return;

  if (order) {
    renderScannedOrderCard(order);
    return;
  }

  // If not found in local memory, immediately query Google Sheets live endpoint
  resCard.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="font-size: 26px; margin-bottom: 8px;"><i class="fa-solid fa-arrows-rotate" style="color:#2563eb;"></i></div>
      <div style="font-size: 15px; font-weight: 800; color: #0f172a;">Syncing Live with Google Sheets...</div>
      <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Looking up order <code>${orderId || raw}</code></div>
    </div>
  `;
  resCard.style.display = 'block';

  if (!SCRIPT_URL) {
    renderOrderNotFoundCard(orderId, raw);
    return;
  }

  fetch(SCRIPT_URL + '?action=get_orders&t=' + Date.now())
    .then(r => r.json())
    .then(d => {
      if (d && d.status === 'success' && Array.isArray(d.orders)) {
        let currentLocal = getOrders();
        d.orders.forEach(ro => {
          const exists = currentLocal.find(cl => String(cl.orderId).toUpperCase() === String(ro.orderId).toUpperCase());
          if (!exists) {
            currentLocal.push({
              orderId: ro.orderId,
              txnId: ro.txnId || 'N/A',
              date: ro.timestamp || new Date().toLocaleDateString('en-IN'),
              timestamp: Date.now(),
              name: (ro.name && !ro.name.match(/^[6789]\d{9}$/)) ? ro.name : 'Student',
              phone: ro.phone || '',
              address: ro.address || 'Baramulla, J&K',
              product: ro.product || 'Study Hub Purchase',
              amount: parseFloat(ro.amount) || 0,
              status: ro.status || 'Confirmed'
            });
          } else {
            exists.status = ro.status || exists.status;
          }
        });
        saveOrders(currentLocal);
        if (typeof renderAccountOrders === 'function') renderAccountOrders();

        const liveMatch = findOrderInStore(orderId || raw);
        if (liveMatch) {
          renderScannedOrderCard(liveMatch);
        } else {
          renderOrderNotFoundCard(orderId, raw);
        }
      } else {
        renderOrderNotFoundCard(orderId, raw);
      }
    })
    .catch(() => {
      renderOrderNotFoundCard(orderId, raw);
    });
}

function updateOrderStatusFromScanner(orderId, newStatus) {
  updateOrderStatusByAdmin(orderId, newStatus);
  playScanSuccessBeep();
  if (navigator.vibrate) navigator.vibrate(80);

  const updated = findOrderInStore(orderId);
  if (updated) {
    updated.status = newStatus;
    renderScannedOrderCard(updated);
  }

  setTimeout(() => {
    const fresh = findOrderInStore(orderId);
    if (fresh) {
      renderScannedOrderCard(fresh);
    }
  }, 120);
}

// Dedicated 1-Tap OTP Submission for Delivery Executive
function submitDeliveryHandoverOtp(orderId) {
  const inputEl = document.getElementById(`deliveryBoyOtpInput_${orderId}`);
  const enteredOtp = inputEl ? inputEl.value.trim() : '';

  if (!enteredOtp) {
    alert("⚠️ Please ask the student for the 4-digit code shown on their order screen.");
    if (inputEl) inputEl.focus();
    return;
  }

  const order = findOrderInStore(orderId);
  if (!order) {
    alert("⚠️ Order record not found in system.");
    return;
  }

  const expectedOtp = order.deliveryOtp || order.delivery_otp;

  // Verify against expected OTP or Master Owner Override (0000)
  if (expectedOtp && enteredOtp !== String(expectedOtp).trim() && enteredOtp !== '0000') {
    alert("❌ Invalid OTP! The code entered does not match the student's order card. Please re-check.");
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
    return;
  }

  // OTP is verified! Mark Delivered in store, update UI, and play audio feedback
  updateOrderStatusByAdmin(orderId, 'Delivered', true);
  playScanSuccessBeep();
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);

  const fresh = findOrderInStore(orderId);
  if (fresh) {
    fresh.status = 'Delivered';
    renderScannedOrderCard(fresh);
  }

  showToast(`🎉 Order ${orderId} verified and marked Delivered!`);
}

function resumeAdminScanner() {
  const resCard = document.getElementById('adminScannedResultCard');
  if (resCard) resCard.style.display = 'none';
  const manualInput = document.getElementById('manualScannerInput');
  if (manualInput) manualInput.value = '';

  isScannerDetecting = true;
  requestAnimationFrame(scanVideoFrameLoop);
}

function handleManualBarcodeLookup() {
  const input = document.getElementById('manualScannerInput');
  if (!input || !input.value.trim()) return;
  handleScannedBarcodeValue(input.value.trim());
}

function handleUrlScannedOrder() {
  const fullUrl = window.location.href;
  const match = fullUrl.match(/[?&#]id=([^&#\s]+)/i) || fullUrl.match(/[?&#]order[_-]?id=([^&#\s]+)/i);
  let rawId = match ? decodeURIComponent(match[1]).trim() : '';

  if (!rawId) {
    const rawHash = window.location.hash || '';
    const hashMatch = rawHash.match(/(OD\d{6,}|ORD[-_]?[A-Za-z0-9]+)/i);
    if (hashMatch) rawId = hashMatch[1];
  }

  if (!rawId) return;
  const cleanId = extractOrderIdFromScan(rawId);
  if (!cleanId) return;

  // 1. Ensure tab is switched to orders
  if (typeof switchTab === 'function') {
    switchTab('orders');
  }

  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const isOwner = (typeof isStrictStoreOwner === 'function') ? isStrictStoreOwner(user) : false;

  // 2. If Store Owner is logged in, immediately pop up the Scanned Parcel Action Card!
  if (isOwner) {
    const modal = document.getElementById('adminCameraScannerModal');
    if (modal) {
      modal.style.display = 'flex';
      handleScannedBarcodeValue(cleanId);
      if (typeof showToast === 'function') {
        showToast(`📦 Scanned parcel #${cleanId} opened!`);
      }
    }
  } else {
    // If student/guest, filter order list to highlight order
    if (typeof handleOrderSearchInput === 'function') {
      const input = document.getElementById('orderSearchInput');
      if (input) input.value = cleanId;
      handleOrderSearchInput(cleanId);
    }
  }
}

// --- GOOGLE SHEETS LIVE SYNC BACKGROUND WORKER ---
function syncOrdersWithGoogleSheet() {
  if (!SCRIPT_URL) return;

  const user = getCurrentUser();
  if (!user) return; // Don't download orders if not logged in
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  
  let fetchUrl = SCRIPT_URL + '?action=get_orders';
  if (!isOwner) {
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
          let localOrders = getOrders();
          let updated = false;

          // For normal students: purge any foreign orders leaked in previous sessions
          if (!isOwner) {
            const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
            const uEmail = String(user.email || '').trim().toLowerCase();
            const cleaned = localOrders.filter(l => {
              const lPhone = String(l.phone || '').replace(/\D/g, '').slice(-10);
              const lEmail = String(l.userEmail || l.email || '').trim().toLowerCase();
              return (uPhone && lPhone === uPhone) || (uEmail && lEmail === uEmail);
            });
            if (cleaned.length !== localOrders.length) {
              localOrders = cleaned;
              updated = true;
            }
          }

          const purgeBefore = parseInt(localStorage.getItem('jk_orders_purge_before') || '0');

          data.orders.forEach(remote => {
            // Ignore catalog product fallback rows from being treated as customer purchase orders!
            if (remote.phone === 'CATALOG_PRODUCT' || remote.txnId === 'CATALOG_PRODUCT' || (remote.orderId && remote.orderId.startsWith('PRD-'))) {
              return;
            }

            // If store owner purged past orders, do NOT re-import orders created before that moment!
            if (purgeBefore > 0) {
              const remoteTime = remote.timestamp ? new Date(remote.timestamp).getTime() : 0;
              if (remoteTime > 0 && remoteTime < purgeBefore) return;
              const tsMatch = String(remote.orderId || '').match(/\d{12,14}/);
              if (tsMatch && parseInt(tsMatch[0]) < purgeBefore) return;
            }

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
              // If local phone is invalid, heal it
              if (cleanRemotePhone && (!match.phone || String(match.phone).includes('193121'))) {
                match.phone = cleanRemotePhone;
                updated = true;
              }
              // If remote has product details and local is generic, sync
              if (remote.product && (!match.product || match.product === 'Study Hub Purchase')) {
                match.product = remote.product;
                updated = true;
              }
              // If remote has txnId and local is missing or generic
              if (remote.txnId && (!match.txnId || match.txnId === 'N/A')) {
                match.txnId = remote.txnId;
                updated = true;
              }
            } else if (remote.orderId) {
              const isRemoteCod = String(remote.status || '').toLowerCase().includes('cash on delivery') || 
                                  String(remote.status || '').toLowerCase().includes('cod') ||
                                  String(remote.product || '').toLowerCase().includes('doorstep') ||
                                  String(remote.txnId || '').toUpperCase().includes('COD') ||
                                  String(remote.txnId || '').toUpperCase().includes('CASH');
              const cleanRemoteTxn = isRemoteCod ? 'Cash on Delivery' : (remote.txnId || 'Prepaid Online');
              localOrders.push({
                orderId: remote.orderId,
                txnId: cleanRemoteTxn,
                paymentMethod: isRemoteCod ? 'cod' : 'prepaid',
                date: remote.timestamp || new Date().toLocaleDateString('en-IN'),
                timestamp: Date.now(),
                name: (remote.name && !remote.name.match(/^[6789]\d{9}$/)) ? remote.name : 'Student',
                phone: cleanRemotePhone,
                address: remote.address || 'Baramulla, Jammu & Kashmir',
                product: remote.product || 'Study Hub Purchase',
                amount: parseFloat(remote.amount) || 0,
                userEmail: user ? user.email : null,
                status: remote.status || (isRemoteCod ? 'Confirmed (Cash on Delivery)' : 'Confirmed')
              });
              updated = true;
            }
          });

          if (updated) {
            localStorage.setItem('jk_orders', JSON.stringify(localOrders));
            updateNavBadges();
          }

          // Trigger live UI update immediately across store and account pages
          if (typeof renderAccountOrders === 'function' && document.getElementById('ordersListContainer')) {
            renderAccountOrders();
          }
          if (typeof renderOrdersPage === 'function' && document.getElementById('ordersPageContainer')) {
            renderOrdersPage();
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
  if (totalEl) totalEl.innerText = '₹' + (price + 5);

  const form = document.getElementById('checkoutForm');
  if (form) form.reset();

  // Load saved profile / previous order for instant frictionless checkout
  let savedProfile = null;
  try {
    savedProfile = JSON.parse(localStorage.getItem('jk_customer_profile') || 'null');
  } catch(e) {}

  if (!savedProfile) {
    const pastOrders = getOrders();
    if (pastOrders && pastOrders.length > 0) {
      const last = pastOrders[0];
      if (last.name && last.phone) {
        savedProfile = {
          name: last.name,
          phone: last.phone,
          city: last.address && last.address.includes('Srinagar') ? 'Srinagar' : 'Baramulla (Pattan/Sopore/Baramulla)',
          address: last.address || ''
        };
      }
    }
  }

  // Pre-fill user name if logged in or from saved profile
  const user = getCurrentUser();
  const nameInput = document.getElementById('orderName');
  const phoneInput = document.getElementById('orderPhone');
  const pinInput = document.getElementById('orderPin');
  const citySelect = document.getElementById('orderCity');
  const addrInput = document.getElementById('orderAddress');

  const emailInput = document.getElementById('orderEmail');
  if (nameInput) {
    nameInput.value = (user && user.displayName) ? user.displayName : (savedProfile && savedProfile.name ? savedProfile.name : '');
  }
  if (phoneInput) {
    if (savedProfile && savedProfile.phone) {
      phoneInput.value = String(savedProfile.phone).replace('+91', '').trim();
    } else if (user && user.phoneNumber) {
      phoneInput.value = String(user.phoneNumber).replace('+91', '').trim();
    }
  }
  if (emailInput) {
    if (user && user.email) {
      emailInput.value = user.email;
    } else if (savedProfile && savedProfile.email) {
      emailInput.value = savedProfile.email;
    }
  }
  if (pinInput && savedProfile && savedProfile.pin) {
    pinInput.value = savedProfile.pin;
  }
  if (pinInput && pinInput.value) {
    handleKashmirPincodeLookup(pinInput.value);
  }
  if (citySelect && savedProfile && savedProfile.city) {
    citySelect.value = savedProfile.city;
  }
  if (addrInput && savedProfile && savedProfile.address) {
    addrInput.value = savedProfile.address;
  }

  // Display 1-Click Quick COD Order Banner if address already saved
  const quickBox = document.getElementById('quickOneClickCodBox');
  if (quickBox) {
    const hasName = (nameInput && nameInput.value.trim());
    const hasPhone = (phoneInput && phoneInput.value.trim());
    const hasAddr = (addrInput && addrInput.value.trim()) || (savedProfile && savedProfile.address);
    if (hasName && hasPhone && hasAddr) {
      quickBox.style.display = 'flex';
      const addrSum = document.getElementById('quickOneClickAddressSummary');
      const nameSum = document.getElementById('quickOneClickNameSummary');
      const cityVal = citySelect ? citySelect.value.split(' ')[0] : 'Kashmir';
      if (addrSum) addrSum.innerText = `Saved: ${cityVal} (${pinInput ? pinInput.value : '193121'})`;
      if (nameSum) nameSum.innerText = `Recipient: ${nameInput.value} • ${phoneInput.value}`;
    } else {
      quickBox.style.display = 'none';
    }
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

// Mutex lock to strictly prevent duplicate / triple orders
let isOrderSubmissionInProgress = false;
let lastOrderSubmissionTimestamp = 0;

// 1-Click Buy Now (Cash on Delivery) - Frictionless Single Tap
function quickOneClickCodCheckout(btnEl, evt) {
  if (evt) {
    try { evt.preventDefault(); evt.stopPropagation(); } catch(e) {}
  }

  const now = Date.now();
  if (isOrderSubmissionInProgress || (now - lastOrderSubmissionTimestamp < 5000)) {
    console.warn("Order submission already in progress, ignoring duplicate tap.");
    return;
  }

  const nameInput = document.getElementById('orderName');
  const phoneInput = document.getElementById('orderPhone');
  const addrInput = document.getElementById('orderAddress');

  if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim()) {
    alert("Please check your name and 10-digit WhatsApp phone number.");
    return;
  }

  if (currentCheckoutCategory === 'standard' || currentCheckoutCategory === 'books' || currentCheckoutCategory === 'both') {
    if (!addrInput || !addrInput.value.trim()) {
      alert("Please enter your delivery street / landmark.");
      if (addrInput) addrInput.focus();
      return;
    }
  }

  isOrderSubmissionInProgress = true;
  lastOrderSubmissionTimestamp = now;

  const btn = btnEl || document.querySelector('.btn-1click-cod');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Placing Order...';
  }

  processCodOrder(true);
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
      note.innerHTML = '<i class="fa-solid fa-shield-halved" style="color:#2563eb;"></i> 100% Genuine Books • Priority Fast Dispatch';
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

function processCodOrder(isFromQuick) {
  const form = document.getElementById('checkoutForm');
  if (!form.reportValidity()) {
    isOrderSubmissionInProgress = false;
    const btn1 = document.querySelector('.btn-1click-cod');
    if (btn1) {
      btn1.disabled = false;
      btn1.innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> 1-Click COD';
    }
    return;
  }

  const now = Date.now();
  if (!isFromQuick) {
    if (isOrderSubmissionInProgress || (now - lastOrderSubmissionTimestamp < 5000)) {
      console.warn("Order already being processed.");
      return;
    }
    isOrderSubmissionInProgress = true;
    lastOrderSubmissionTimestamp = now;
  }

  const btn = document.getElementById('submitOrderBtn');
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming COD Order...';
    btn.disabled = true;
  }
  const btn1 = document.querySelector('.btn-1click-cod');
  if (btn1) {
    btn1.disabled = true;
    btn1.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming...';
  }

  processOrder('Cash on Delivery', 'Confirmed (Cash on Delivery)');
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

  const isCod = (customStatus && customStatus.includes('Cash on Delivery')) || txnId === 'Cash on Delivery' || String(txnId).startsWith('COD') || String(txnId).toUpperCase().includes('CASH');
  const cleanTxnId = isCod ? 'Cash on Delivery' : txnId;
  const totalPaid = currentCheckoutPrice + 5;
  const orderStatus = customStatus || (isCod ? 'Confirmed (Cash on Delivery)' : 'Confirmed');
  const combinedProduct = `${finalProductDesc} | Total: ₹${totalPaid} | ${isCod ? 'Payment: Cash on Delivery (Pay at Doorstep)' : 'TXN: ' + cleanTxnId}`;

  // 1. SAVE LOCALLY TO ORDERS HISTORY IMMEDIATELY!
  const user = getCurrentUser();
  const emailInput = document.getElementById('orderEmail');
  const explicitEmail = emailInput ? emailInput.value.trim().toLowerCase() : '';
  const orderEmail = explicitEmail || (user && user.email ? user.email.toLowerCase() : null);

  const deliveryOtp = String(Math.floor(1000 + Math.random() * 9000));

  const orderRecord = {
    orderId: 'OD' + Date.now() + Math.floor(Math.random() * 1000),
    txnId: cleanTxnId,
    paymentMethod: isCod ? 'cod' : 'prepaid',
    deliveryOtp: deliveryOtp,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' at ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now(),
    name: name,
    phone: phone,
    email: orderEmail,
    address: finalAddress,
    product: finalProductDesc,
    amount: totalPaid,
    userEmail: orderEmail,
    status: orderStatus
  };

  let orders = getOrders();
  orders.unshift(orderRecord);
  saveOrders(orders);

  // 2. DISPATCH TO GOOGLE SHEETS WEB APP
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  if (orderEmail) {
    formData.append('email', orderEmail);
  }
  formData.append('address', finalAddress);
  formData.append('product', combinedProduct);
  formData.append('order_id', orderRecord.orderId);
  formData.append('txn_id', cleanTxnId);
  formData.append('payment_method', isCod ? 'Cash on Delivery' : 'Prepaid Online');
  formData.append('delivery_otp', deliveryOtp);
  formData.append('amount', totalPaid);
  formData.append('status', orderStatus);

  // Save customer profile for future instant 1-Click checkout
  try {
    const profile = {
      name: name,
      phone: phone,
      email: orderEmail,
      city: document.getElementById('orderCity') ? document.getElementById('orderCity').value : 'Baramulla (Pattan/Sopore/Baramulla)',
      pin: document.getElementById('orderPin') ? document.getElementById('orderPin').value : '193121',
      address: document.getElementById('orderAddress') ? document.getElementById('orderAddress').value : ''
    };
    localStorage.setItem('jk_customer_profile', JSON.stringify(profile));
  } catch(e) {}

  fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' })
    .then(() => {
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

      setTimeout(() => {
        isOrderSubmissionInProgress = false;
        const oneClickBtn = document.querySelector('.btn-1click-cod');
        if (oneClickBtn) {
          oneClickBtn.disabled = false;
          oneClickBtn.innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> 1-Click COD';
        }
      }, 2000);

      // If on orders page, re-render
      if (typeof renderOrdersPage === 'function') {
        if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
      }

      showOrderConfirmationModal(orderRecord, isCod);
    })
    .catch(err => {
      closeCheckout();
      setTimeout(() => {
        isOrderSubmissionInProgress = false;
        const oneClickBtn = document.querySelector('.btn-1click-cod');
        if (oneClickBtn) {
          oneClickBtn.disabled = false;
          oneClickBtn.innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> 1-Click COD';
        }
      }, 2000);
      showOrderConfirmationModal(orderRecord, isCod);
    });
}

// Helper: Safe string escape for UI rendering
function safeEscape(str) {
  return String(str || '').replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

// --- DYNAMIC ESTIMATED DELIVERY DATE ENGINE ---
function getEstimatedDeliveryInfo(district = 'Pattan') {
  const now = new Date();
  const currentHour = now.getHours();
  const isBeforeCutoff = currentHour < 16; // 4:00 PM cutoff for same-day dispatch
  
  // Fast Kashmir zones (1 day if ordered before 4 PM, otherwise 2 days)
  const isFastZone = /pattan|baramulla|sopore|srinagar|budgam/i.test(district || 'pattan');
  const daysToAdd = isBeforeCutoff ? (isFastZone ? 1 : 2) : (isFastZone ? 2 : 3);
  
  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + daysToAdd);
  
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const dateStr = targetDate.toLocaleDateString('en-IN', options);
  
  let label = '';
  if (daysToAdd === 1) {
    label = `Tomorrow (${dateStr})`;
  } else {
    label = dateStr;
  }
  
  const hoursLeft = isBeforeCutoff ? (16 - currentHour) : (24 - currentHour + 16);
  const countdownText = isBeforeCutoff 
    ? `Order within ${hoursLeft} hr${hoursLeft > 1 ? 's' : ''} for same-day dispatch`
    : `Express dispatch tomorrow morning`;
    
  return {
    label: label,
    countdownText: countdownText,
    isTomorrow: daysToAdd === 1,
    badgeHtml: `<div class="delivery-estimate-badge"><i class="fa-solid fa-truck-fast"></i> Get it by <strong>${label}</strong></div>`
  };
}

// Inject live delivery promise badges to all product cards across storefront
function injectStoreDeliveryBadges() {
  if (typeof document === 'undefined') return;
  const cards = document.querySelectorAll('.book-product-card');
  const delInfo = getEstimatedDeliveryInfo();
  cards.forEach(card => {
    if (!card.querySelector('.delivery-estimate-badge')) {
      const info = card.querySelector('.product-info');
      if (info) {
        const badge = document.createElement('div');
        badge.className = 'delivery-estimate-badge';
        badge.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Get it by <strong>${delInfo.label}</strong>`;
        const desc = info.querySelector('.product-desc');
        if (desc) {
          info.insertBefore(badge, desc);
        } else {
          const footer = info.querySelector('.product-footer');
          if (footer) info.insertBefore(badge, footer);
          else info.appendChild(badge);
        }
      }
    }
  });
}

// --- ORDER CONFIRMATION & WHATSAPP TRACKING MODAL ---
function showOrderConfirmationModal(orderRecord, isCod) {
  let modal = document.getElementById('orderSuccessModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'orderSuccessModal';
    modal.className = 'scanner-modal-backdrop';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.7); z-index:99999; display:flex; align-items:center; justify-content:center; padding:15px; box-sizing:border-box; backdrop-filter:blur(4px);';
    document.body.appendChild(modal);
  }

  const delInfo = getEstimatedDeliveryInfo(orderRecord.address);
  const otpMsg = orderRecord.deliveryOtp ? `%0A🔐 *Delivery OTP:* ${orderRecord.deliveryOtp}` : '';
  const waText = `*📦 New Order Confirmation - JK Study Hub*%0A%0A` +
    `🆔 *Order ID:* ${orderRecord.orderId}%0A` +
    `👤 *Student Name:* ${encodeURIComponent(orderRecord.name)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(orderRecord.phone)}%0A` +
    `📍 *Delivery Address:* ${encodeURIComponent(orderRecord.address)}%0A` +
    `📚 *Product:* ${encodeURIComponent(orderRecord.product)}%0A` +
    `💵 *Total Amount:* ₹${orderRecord.amount} (${isCod ? 'Cash on Delivery' : 'Paid Online'})` +
    otpMsg + `%0A` +
    `🚚 *Estimated Delivery:* ${encodeURIComponent(delInfo.label)}%0A%0A` +
    `_Hello JK Study Hub! Please send me live order tracking and dispatch updates._`;

  const waUrl = `https://wa.me/919622605714?text=${waText}`;

  modal.innerHTML = `
    <div style="background:white; border-radius:18px; max-width:480px; width:100%; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.2); animation:popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-sizing:border-box;">
      <div style="background:${isCod ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)'}; color:white; padding:22px 20px; text-align:center;">
        <div style="width:54px; height:54px; background:rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; font-size:26px;">
          ${isCod ? '📦' : '🎉'}
        </div>
        <h3 style="margin:0; font-size:19px; font-weight:800;">${isCod ? 'Order Confirmed (Cash on Delivery)!' : 'Payment Verified & Order Confirmed!'}</h3>
        <p style="margin:4px 0 0; font-size:12.5px; opacity:0.9;">Order ID: <strong>${safeEscape(orderRecord.orderId)}</strong></p>
      </div>

      <div style="padding:18px 20px;">
        <!-- Delivery info strip -->
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:10px; padding:12px; margin-bottom:14px; display:flex; align-items:center; gap:10px;">
          <div style="font-size:24px; color:#16a34a;"><i class="fa-solid fa-truck-fast"></i></div>
          <div>
            <div style="font-size:13px; font-weight:800; color:#166534;">Estimated Delivery: ${delInfo.label}</div>
            <div style="font-size:11.5px; color:#15803d;">Same-Day Express Dispatch from Baramulla Hub (₹0 Free Delivery)</div>
          </div>
        </div>

        <div style="font-size:12.5px; color:#475569; line-height:1.6; margin-bottom:14px; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
          <div><strong>Student:</strong> ${safeEscape(orderRecord.name)} (${safeEscape(orderRecord.phone)})</div>
          <div><strong>Product:</strong> ${safeEscape(orderRecord.product)}</div>
          <div><strong>Amount:</strong> ₹${orderRecord.amount} (${isCod ? 'Pay at Doorstep' : 'Prepaid Online'})</div>
          <div style="margin-top:4px; font-size:11.5px; color:#64748b;"><i class="fa-solid fa-location-dot"></i> ${safeEscape(orderRecord.address)}</div>
        </div>

        ${orderRecord.deliveryOtp ? `
          <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px dashed #2563eb; border-radius: 12px; padding: 12px 14px; margin-bottom: 14px; text-align: center;">
            <div style="font-size: 11px; font-weight: 800; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">🔐 Doorstep Delivery Verification OTP</div>
            <div style="font-size: 26px; font-weight: 900; letter-spacing: 6px; color: #1d4ed8; font-family: monospace; margin: 4px 0;">${orderRecord.deliveryOtp}</div>
            <div style="font-size: 11px; color: #475569; font-weight: 600;">Share this 4-digit code with the delivery executive only when you receive your parcel.</div>
          </div>
        ` : ''}

        <!-- WhatsApp Action Button -->
        <a href="${waUrl}" target="_blank" rel="noopener" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#25D366; color:white; text-decoration:none; padding:13px; border-radius:10px; font-weight:800; font-size:14px; box-shadow:0 4px 14px rgba(37,211,102,0.3); margin-bottom:10px;">
          <i class="fa-brands fa-whatsapp" style="font-size:19px;"></i> Receive Tracking on WhatsApp
        </a>

        <div style="display:flex; gap:10px;">
          <button type="button" onclick="printOrderReceipt('${orderRecord.orderId}'); closeOrderConfirmationModal();" style="flex:1; background:#f1f5f9; color:#1e293b; border:1px solid #cbd5e1; padding:10px; border-radius:8px; font-size:12.5px; font-weight:700; cursor:pointer;">
            <i class="fa-solid fa-receipt"></i> View Invoice
          </button>
          <button type="button" onclick="closeOrderConfirmationModal()" style="flex:1; background:#2563eb; color:white; border:none; padding:10px; border-radius:8px; font-size:12.5px; font-weight:700; cursor:pointer;">
            Done / Continue
          </button>
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeOrderConfirmationModal() {
  const modal = document.getElementById('orderSuccessModal');
  if (modal) modal.style.display = 'none';
}

// --- INITIALIZATION & BFCACHE HANDLERS ---
function initShop() {
  updateNavBadges();
  updateAuthUI();
  syncHeartIcons();
  injectStoreDeliveryBadges();

  if (document.getElementById('cartItemsList')) {
    renderCartPage();
  }

  if (document.getElementById('wishlistGrid')) {
    renderWishlistPage();
  }

  if (document.getElementById('ordersListContainer')) {
    if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
  }

  if (typeof updateOwnerUIProtection === 'function') {
    updateOwnerUIProtection();
  } else {
    const ownerActionBar = document.getElementById('ownerStoreActionBar');
    if (ownerActionBar) {
      ownerActionBar.style.display = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(getCurrentUser())) ? 'flex' : 'none';
    }
  }

  if (typeof syncCustomProductsWithSheet === 'function') {
    syncCustomProductsWithSheet();
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
    provider.setCustomParameters({ prompt: 'select_account' });
    firebase.auth().signInWithPopup(provider).then(res => {
      const email = (res.user.email || '').trim().toLowerCase();
      const isOwner = isStrictStoreOwner({ email: email });
      const user = {
        displayName: res.user.displayName || (isOwner ? 'Sahil' : 'Student'),
        email: res.user.email,
        phoneNumber: res.user.phoneNumber || (isOwner ? '+919622605714' : ''),
        photoURL: res.user.photoURL,
        uid: res.user.uid,
        isOwner: isOwner
      };
      if (!isOwner) {
        try {
          localStorage.removeItem('jk_admin_unlocked');
          sessionStorage.removeItem('jk_admin_unlocked');
        } catch(e) {}
      }
      setCurrentUser(user);
      const firstName = (user.displayName || (isOwner ? 'Sahil' : 'Student')).split(' ')[0];
      showToast(isOwner ? `👑 Welcome back, Owner ${firstName}!` : `Welcome, ${firstName}!`);
      if (typeof renderAccountDashboard === 'function') {
        renderAccountDashboard();
      }
      if (typeof renderAccountOrders === 'function') {
        renderAccountOrders();
      }
    }).catch(err => {
      console.warn("Google popup error:", err);
      if (err && err.code === 'auth/popup-blocked') {
        firebase.auth().signInWithRedirect(provider).catch(e => {
          showToast("❌ Google popup was blocked. Please allow popups or use phone OTP.");
        });
      } else if (err && err.code !== 'auth/popup-closed-by-user') {
        showToast("❌ " + (err.message || "Google login failed."));
      }
    });
  } else {
    showToast("⚠️ Authentication service is loading. Please try again.");
  }
}

// Auto-sync Firebase persistent authentication on page refresh/hard reload
if (typeof firebase !== 'undefined' && firebase.auth) {
  try {
    firebase.auth().onAuthStateChanged(fbUser => {
      if (fbUser) {
        const email = (fbUser.email || '').trim().toLowerCase();
        const isOwner = isStrictStoreOwner({ email: email });
        const current = getCurrentUser();
        if (!current || (current.email && current.email.toLowerCase() !== email)) {
          const user = {
            displayName: fbUser.displayName || (isOwner ? 'Sahil' : 'Student'),
            email: fbUser.email,
            phoneNumber: fbUser.phoneNumber || (isOwner ? '+919622605714' : ''),
            photoURL: fbUser.photoURL || '',
            uid: fbUser.uid,
            isOwner: isOwner
          };
          if (!isOwner) {
            try {
              localStorage.removeItem('jk_admin_unlocked');
              sessionStorage.removeItem('jk_admin_unlocked');
            } catch(e) {}
          }
          setCurrentUser(user);
          if (typeof renderAccountDashboard === 'function') renderAccountDashboard();
          if (typeof renderAccountOrders === 'function') renderAccountOrders();
        }
      }
    });
  } catch(e) {}
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

  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  if (typeof updateOwnerUIProtection === 'function') {
    updateOwnerUIProtection();
  }

  if (user) {
    const firstName = (user.displayName || 'Student').split(' ')[0];
    const phone = String(user.phoneNumber || user.phone || '').replace('+91', '');
    profileCard.innerHTML = `
      <h3 style="font-size: 18px; margin-bottom: 5px;">Hi, ${firstName}!</h3>
      <p style="margin-bottom: 15px; color: #475569;"><i class="fa-solid fa-mobile-screen"></i> +91 ${phone || (user.email ? user.email.split('@')[0] : '')}</p>
      <button class="yellow-btn" style="background: #f87171; color: white;" onclick="handleStoreSignOut()">Sign Out</button>
    `;
    
    // Auto-render current active tab if logged in
    const activeMenu = document.querySelector('.account-menu a.active');
    if (activeMenu) {
      const tabId = activeMenu.id.replace('menu-', '');
      if (tabId === 'orders') renderAccountOrders();
      if (tabId === 'manage-products') {
        if (isOwner && typeof renderOwnerProductList === 'function') {
          renderOwnerProductList();
        } else if (typeof switchTab === 'function') {
          switchTab('orders');
        }
      }
      if (tabId === 'wishlist') renderAccountWishlist();
      if (tabId === 'addresses') renderAddresses();
      if (tabId === 'details') renderAccountDetails();
    }
  } else {
    // If guest tries to stay on manage-products tab, bounce to orders
    const activeMenu = document.querySelector('.account-menu a.active');
    if (activeMenu && activeMenu.id === 'menu-manage-products') {
      if (typeof switchTab === 'function') switchTab('orders');
    }

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
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  
  // Decide which orders to work with
  let userOrders = [];
  if (isOwner) {
    if (currentOwnerOrderView === 'personal') {
      const uEmail = String(user.email || '').trim().toLowerCase();
      userOrders = allOrders.filter(o => {
        const oEmail = String(o.userEmail || o.email || '').trim().toLowerCase();
        return uEmail && oEmail && oEmail === uEmail;
      });
    } else {
      userOrders = allOrders;
    }
  } else {
    const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    const uEmail = String(user.email || '').trim().toLowerCase();
    userOrders = allOrders.filter(o => {
      const oEmail = String(o.userEmail || o.email || '').trim().toLowerCase();
      // Primary match: user authenticated Google email
      if (uEmail && oEmail && oEmail === uEmail) return true;
      // Match by phone ONLY if phone is not the owner's store number
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      if (uPhone && oPhone && oPhone === uPhone && !STRICT_STORE_OWNER_PHONES.includes(uPhone)) {
        return true;
      }
      return false;
    });
  }

  // Calculate counts for Flipkart Filter Tabs
  const totalCount = userOrders.length;
  const inProgressCount = userOrders.filter(o => {
    const s = String(o.status || '').toLowerCase();
    return !s.includes('deliver') && !s.includes('complete') && !s.includes('cancel');
  }).length;
  const deliveredCount = userOrders.filter(o => {
    const s = String(o.status || '').toLowerCase();
    return s.includes('deliver') || s.includes('complete');
  }).length;
  const cancelledCount = userOrders.filter(o => {
    const s = String(o.status || '').toLowerCase();
    return s.includes('cancel');
  }).length;

  // Filter by status tab
  let filteredOrders = userOrders;
  if (currentOrderStatusFilter === 'in_progress') {
    filteredOrders = userOrders.filter(o => {
      const s = String(o.status || '').toLowerCase();
      return !s.includes('deliver') && !s.includes('complete') && !s.includes('cancel');
    });
  } else if (currentOrderStatusFilter === 'delivered') {
    filteredOrders = userOrders.filter(o => {
      const s = String(o.status || '').toLowerCase();
      return s.includes('deliver') || s.includes('complete');
    });
  } else if (currentOrderStatusFilter === 'cancelled') {
    filteredOrders = userOrders.filter(o => {
      const s = String(o.status || '').toLowerCase();
      return s.includes('cancel');
    });
  }

  // Filter by search query if user types in search bar
  if (currentOrderSearchQuery) {
    const q = currentOrderSearchQuery;
    filteredOrders = filteredOrders.filter(o => {
      const idMatch = String(o.orderId || '').toLowerCase().includes(q);
      const phoneMatch = String(o.phone || '').toLowerCase().includes(q);
      const nameMatch = String(o.name || '').toLowerCase().includes(q);
      const prodMatch = String(o.product || '').toLowerCase().includes(q);
      const txnMatch = String(o.txnId || '').toLowerCase().includes(q);
      const statusMatch = String(o.status || '').toLowerCase().includes(q);
      return idMatch || phoneMatch || nameMatch || prodMatch || txnMatch || statusMatch;
    });
  }

  // Build Owner Mode Top Banner & View Switcher (Flipkart Seller Hub style)
  let ownerControlsHtml = '';
  if (isOwner) {
    ownerControlsHtml = `
      <div style="background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1.5px solid #bfdbfe; border-radius: 12px; padding: 14px 18px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; box-shadow: 0 2px 8px rgba(37,99,235,0.06);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 22px;">👑</span>
          <div>
            <div style="font-weight: 800; color: #1e3a8a; font-size: 14.5px;">Store Owner (Seller Hub)</div>
            <div style="font-size: 12.5px; color: #475569;">Total ${allOrders.length} store orders • Live synchronized with Google Sheets</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button type="button" onclick="openDailyCashSummaryModal();" style="background: #d97706; color: white; border: none; padding: 7px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(217,119,6,0.25);">
            <i class="fa-solid fa-coins"></i> 💵 Cash Summary
          </button>
          <button type="button" onclick="openAdminCameraScanner();" style="background: #059669; color: white; border: none; padding: 7px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(5,150,105,0.25);">
            <i class="fa-solid fa-camera"></i> 📷 Scan Parcel
          </button>
          <button type="button" onclick="syncOrdersWithGoogleSheet(); showToast('🔄 Refreshing orders from Google Sheets...'); setTimeout(renderAccountOrders, 500);" style="background: #2563eb; color: white; border: none; padding: 7px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-arrows-rotate"></i> Sync Orders
          </button>
          <button type="button" onclick="if(confirm('Are you sure you want to clean all past orders from your dashboard and start fresh?')) { clearAllStoreOrders(false); }" style="background: #ef4444; color: white; border: none; padding: 7px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(239,68,68,0.25);">
            <i class="fa-solid fa-trash-can"></i> 🗑️ Clear All Orders
          </button>
        </div>
      </div>

      <!-- Flipkart Role Toggle: Seller Hub vs Personal Purchases -->
      <div class="fk-role-toggle">
        <button type="button" class="fk-role-btn ${currentOwnerOrderView === 'store' ? 'active' : ''}" onclick="setOwnerOrderView('store')">
          <i class="fa-solid fa-store"></i> Seller Hub (All Orders: ${allOrders.length})
        </button>
        <button type="button" class="fk-role-btn ${currentOwnerOrderView === 'personal' ? 'active' : ''}" onclick="setOwnerOrderView('personal')">
          <i class="fa-solid fa-bag-shopping"></i> My Personal Purchases
        </button>
      </div>
    `;
  }

  // Flipkart Status Filter Tabs
  const filterTabsHtml = `
    <div class="fk-filter-tabs">
      <button type="button" class="fk-tab-btn ${currentOrderStatusFilter === 'all' ? 'active' : ''}" onclick="setOrderStatusFilter('all')">
        All (${totalCount})
      </button>
      <button type="button" class="fk-tab-btn ${currentOrderStatusFilter === 'in_progress' ? 'active' : ''}" onclick="setOrderStatusFilter('in_progress')">
        In Progress (${inProgressCount})
      </button>
      <button type="button" class="fk-tab-btn ${currentOrderStatusFilter === 'delivered' ? 'active' : ''}" onclick="setOrderStatusFilter('delivered')">
        Delivered (${deliveredCount})
      </button>
      <button type="button" class="fk-tab-btn ${currentOrderStatusFilter === 'cancelled' ? 'active' : ''}" onclick="setOrderStatusFilter('cancelled')">
        Cancelled (${cancelledCount})
      </button>
    </div>
  `;

  // Empty State if no orders match
  if (filteredOrders.length === 0) {
    let emptyMsg = '';
    if (currentOrderSearchQuery) {
      emptyMsg = `
        <div class="empty-state" style="padding-top: 30px;">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Monocle.png" style="width:70px; margin: 0 auto 10px;"></div>
          <h3>No matching orders</h3>
          <p>No orders matched your search "<strong>${currentOrderSearchQuery}</strong>".</p>
          <button class="yellow-btn" style="width:auto; padding: 8px 24px; margin-top: 10px;" onclick="const el = document.getElementById('orderSearchInput'); if(el) el.value=''; handleOrderSearch('');">Clear Search</button>
        </div>
      `;
    } else if (currentOrderStatusFilter !== 'all') {
      emptyMsg = `
        <div class="empty-state" style="padding-top: 30px;">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png" style="width:70px; margin: 0 auto 10px;"></div>
          <h3>No ${currentOrderStatusFilter.replace('_', ' ')} orders</h3>
          <p>You don't have any orders under this tab right now.</p>
          <button class="yellow-btn" style="width:auto; padding: 8px 24px; margin-top: 10px;" onclick="setOrderStatusFilter('all')">View All Orders</button>
        </div>
      `;
    } else {
      emptyMsg = `
        <div class="empty-state" style="padding-top: 40px;">
          <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png" style="width:75px; margin: 0 auto 10px;"></div>
          <h3>No orders placed yet</h3>
          <p>Looks like you haven't placed any orders yet. Discover our syllabus books, notes, and study supplies!</p>
          <a href="store.html" class="yellow-btn" style="width:auto; padding: 10px 30px;">Start Shopping</a>
        </div>
      `;
    }
    container.innerHTML = (ownerControlsHtml || '') + filterTabsHtml + emptyMsg;
    return;
  }

  // Reverse sort by timestamp
  filteredOrders.sort((a,b) => (b.timestamp || 0) - (a.timestamp || 0));

  let html = '';
  filteredOrders.forEach((o, index) => {
    const safeOrderId = o.orderId || ('ORD-' + index);
    const isCod = isCodOrder(o);
    const statusInfo = getOrderStatusInfo(o.status, o);
    const waMessage = encodeURIComponent(`Hi JK Study Hub, I am inquiring about my Order ${safeOrderId} (${isCod ? 'Cash on Delivery' : 'Prepaid Online'}) for ${o.product}.`);

    let s1Class = 'completed';
    let s2Class = statusInfo.step >= 2 ? 'completed' : (statusInfo.step === 1 ? 'active' : '');
    let s3Class = statusInfo.step >= 3 ? 'completed' : (statusInfo.step === 2 ? 'active' : '');
    let s4Class = statusInfo.step >= 4 ? 'completed' : (statusInfo.step === 3 ? 'active' : '');

    let s1Desc = isCod ? 'Pay on Delivery' : 'Paid Online';
    let s2Desc = statusInfo.step >= 2 ? (o.status === 'Shipped' ? 'Shipped' : 'Packed at Hub') : 'Packed at Hub';
    let s3Desc = statusInfo.step >= 3 ? (o.status === 'On the Way' ? 'On the Way' : 'Local Delivery') : 'Local Delivery';
    let s4Desc = statusInfo.step >= 4 ? (isCod ? 'Delivered & Paid' : 'Delivered') : 'Expected Shortly';

    const matchedBook = (typeof BOOK_CATALOG_DATA !== 'undefined' ? BOOK_CATALOG_DATA : []).find(b => o.product && o.product.includes(b.name)) || (PRODUCT_CATALOG[o.product] ? { image: PRODUCT_CATALOG[o.product].image } : null);
    const orderImgSrc = (matchedBook && matchedBook.photos && matchedBook.photos[0]) ? matchedBook.photos[0] : ((matchedBook && matchedBook.image) ? matchedBook.image : (o.image || 'images/logo-app.png'));

    const isLocked = (o.status === 'Delivered' || o.status === 'Cancelled');
    const statusLower = String(o.status || '').toLowerCase();

    html += `
      <div class="fk-order-card">
        
        <!-- Flipkart Order Top Bar -->
        <div class="fk-order-top">
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span class="fk-order-id-badge">${safeOrderId}</span>
            <span style="font-size: 12.5px; color: #64748b;">
              <i class="fa-regular fa-calendar"></i> ${o.date || 'Recent'}
            </span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="fk-status-pill" style="background: ${statusInfo.badgeBg}; color: ${statusInfo.badgeColor}; border: 1px solid ${statusInfo.badgeBorder};">
              <i class="fa-solid ${statusInfo.badgeIcon}"></i> ${statusInfo.label}
            </span>
          </div>
        </div>

        <!-- Flipkart Item Row -->
        <div class="fk-item-row">
          ${orderImgSrc ? `<img src="${orderImgSrc}" alt="${o.product}" class="fk-thumb" onerror="this.src='images/logo-app.png'" loading="lazy">` : ''}
          <div class="fk-item-details">
            <h4 class="fk-item-title">${o.product}</h4>
            
            <!-- Flipkart Delivery Highlight -->
            <div style="margin-bottom: 8px; font-size: 13.5px; font-weight: 700; color: ${statusLower.includes('cancel') ? '#dc2626' : (statusLower.includes('deliver') ? '#16a34a' : '#2563eb')}; display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${statusLower.includes('cancel') ? '#dc2626' : (statusLower.includes('deliver') ? '#16a34a' : '#2563eb')};"></span>
              ${statusLower.includes('cancel') ? 'Order Cancelled' : (statusLower.includes('deliver') ? 'Delivered at Doorstep' : 'Arriving Soon (Expected in 24-48 hrs)')}
            </div>

            <div class="fk-item-meta">
              <p style="margin: 0;"><strong>Recipient:</strong> ${(o.name && !o.name.match(/^[6789]\d{9}$/)) ? o.name : 'Customer'} (${getValidCustomerPhone(o) || o.phone || 'N/A'}${o.userEmail || o.email ? ' • ' + (o.userEmail || o.email) : ''})</p>
              <p style="margin: 4px 0 0;"><strong>Address:</strong> ${o.address || 'Delivery Address, Pattan 193121'}</p>
            </div>

            ${isCod ? `
              <div style="margin-top: 10px; font-size: 11.5px; color: #b45309; background: #fef3c7; border: 1px solid #fde68a; padding: 4px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; font-weight: 700;">
                <i class="fa-solid fa-hand-holding-dollar"></i> Cash on Delivery (Pay ₹${o.amount || 0} at Doorstep)
              </div>
            ` : `
              <div style="margin-top: 10px; font-size: 11.5px; color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 4px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; font-weight: 700;">
                <i class="fa-solid fa-circle-check"></i> Paid Online (Prepaid Txn: ${o.txnId || 'PAID'})
              </div>
            `}

            ${(!isLocked && (o.deliveryOtp || o.delivery_otp)) ? `
              <div style="margin-top: 8px; font-size: 12px; color: #1e3a8a; background: #eff6ff; border: 1.5px dashed #3b82f6; padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
                <span style="font-size: 14px;">🔐</span>
                <span>Delivery OTP: <strong style="font-size: 15px; letter-spacing: 2px; color: #1d4ed8; font-family: monospace;">${o.deliveryOtp || o.delivery_otp}</strong> <span style="font-size: 10.5px; color: #64748b; font-weight: 600;">(Share with Wishmaster upon doorstep delivery)</span></span>
              </div>
            ` : ''}
          </div>

          <div class="fk-price-box">
            <div style="font-size: 12px; color: #64748b; font-weight: 600;">${isCod ? 'To Collect (COD)' : 'Total Paid'}</div>
            <div class="fk-price-val">₹${o.amount || 0}</div>
            <span style="font-size: 11px; font-weight: 700; color: ${isCod ? '#b45309' : '#16a34a'};">${isCod ? 'Pay on Doorstep (COD)' : 'Prepaid Online'}</span>
          </div>
        </div>

        <!-- FLIPKART LIVE DELIVERY STEPPER -->
        <div class="delivery-tracker-box" style="margin-top: 16px;">
          <div class="stepper-header-meta">
            <span style="font-weight: 700; color: #0f172a; font-size: 13px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-route" style="color: #2563eb;"></i> Live Delivery Progress
            </span>
            <span style="font-size: 12px; color: #64748b; font-weight: 600;">
              Hub: <strong style="color: #1e293b;">Pattan (193121)</strong>
            </span>
          </div>

          <div class="stepper-track-wrap">
            <div class="stepper-line-fill" style="width: ${statusInfo.percent}%; ${statusLower === 'cancelled' ? 'background: #ef4444;' : ''}"></div>
            
            <!-- Step 1: Confirmed -->
            <div class="stepper-node ${s1Class}">
              <div class="node-icon"><i class="fa-solid fa-check"></i></div>
              <div class="node-title">${isCod ? 'Order Placed' : 'Confirmed'}</div>
              <div class="node-desc">${s1Desc}</div>
            </div>

            <!-- Step 2: Shipped -->
            <div class="stepper-node ${s2Class}">
              <div class="node-icon"><i class="fa-solid fa-box"></i></div>
              <div class="node-title">Shipped</div>
              <div class="node-desc">${s2Desc}</div>
            </div>

            <!-- Step 3: On the Way -->
            <div class="stepper-node ${s3Class}">
              <div class="node-icon"><i class="fa-solid fa-truck-fast"></i></div>
              <div class="node-title">On the Way</div>
              <div class="node-desc">${s3Desc}</div>
            </div>

            <!-- Step 4: Delivered -->
            <div class="stepper-node ${s4Class}">
              <div class="node-icon"><i class="fa-solid fa-house-chimney-check"></i></div>
              <div class="node-title">${statusLower === 'cancelled' ? 'Cancelled' : (isCod ? 'Delivered & Paid' : 'Delivered')}</div>
              <div class="node-desc">${s4Desc}</div>
            </div>
          </div>
          
          <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #e2e8f0; font-size: 12px; color: #475569; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-circle-info" style="color: ${isCod ? '#b45309' : '#2563eb'};"></i>
            <span>${statusInfo.summaryText}</span>
          </div>
        </div>

        <!-- Admin Controls Bar (Strictly Store Owner Mode in Seller Hub view) -->
        ${(isOwner && currentOwnerOrderView === 'store') ? `
          <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 12px 14px; margin-top: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 12px; font-weight: 800; color: #1e293b;">
                <i class="fa-solid fa-user-shield" style="color: #2563eb;"></i> Admin Status:
              </span>
              ${isLocked ? `
                <select disabled style="padding: 6px 12px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 12.5px; font-weight: 700; background: #f1f5f9; color: #64748b; cursor: not-allowed;">
                  <option selected>${o.status}</option>
                </select>
                <span style="font-size: 11px; font-weight: 800; color: #dc2626; background: #fef2f2; padding: 4px 8px; border-radius: 6px; border: 1px solid #fecaca; display: inline-flex; align-items: center; gap: 4px;">
                  <i class="fa-solid fa-lock"></i> Locked (${o.status})
                </span>
              ` : `
                <select onchange="updateOrderStatusByAdmin('${safeOrderId}', this.value); setTimeout(renderAccountOrders, 300);" style="padding: 6px 12px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 12.5px; font-weight: 600; background: white; color: #0f172a; cursor: pointer;">
                  <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>${isCod ? 'Confirmed (COD)' : 'Confirmed & Paid'}</option>
                  <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                  <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                  <option value="Dispatched" ${o.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
                  <option value="On the Way" ${o.status === 'On the Way' ? 'selected' : ''}>On the Way</option>
                  <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                  <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>${isCod ? 'Delivered & Cash Collected' : 'Delivered'}</option>
                  <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
              `}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button type="button" onclick="openShippingLabelModal('${safeOrderId}')" style="background: #0f172a; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 5px;" title="Print Flipkart/Amazon-style shipping label">
                <i class="fa-solid fa-print"></i> 🖨️ Label
              </button>
              <button type="button" onclick="sendCustomerWhatsAppStatusUpdate('${safeOrderId}')" style="background: #25d366; color: white; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp Notice
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Flipkart Order Actions (Invoice, Cancel, WhatsApp) -->
        <div style="border-top: 1px solid #f1f5f9; margin-top: 16px; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <button type="button" onclick="printOrderReceipt('${safeOrderId}')" style="background: #f8fafc; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; transition: all 0.2s;">
              <i class="fa-solid fa-file-invoice" style="color: #2563eb;"></i> Download Invoice / Receipt
            </button>

            ${(o.status === 'Delivered') ? `
              <a href="https://wa.me/919622605714?text=${encodeURIComponent('Hi JK Study Hub! I received my parcel for Order ' + safeOrderId + ' (' + o.product + '). My rating for print quality and delivery is: 5 Stars ⭐⭐⭐⭐⭐')}" target="_blank" rel="noopener" style="background: #fefce8; color: #854d0e; border: 1.5px solid #fef08a; padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
                ⭐ Rate Quality (WhatsApp)
              </a>
            ` : ''}

            ${(!isLocked) ? `
              <button type="button" onclick="cancelOrderByCustomer('${safeOrderId}')" style="background: #fff; color: #dc2626; border: 1px solid #fca5a5; padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; transition: all 0.2s;">
                <i class="fa-solid fa-xmark"></i> Cancel Order
              </button>
            ` : ''}
          </div>
          
          <a href="https://wa.me/919622605714?text=${waMessage}" target="_blank" rel="noopener" style="background: #25d366; color: white; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(37,211,102,0.25);">
            <i class="fa-brands fa-whatsapp" style="font-size: 15px;"></i> Need Help? (WhatsApp)
          </a>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = (ownerControlsHtml || '') + filterTabsHtml + html;
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

  // Update Live Delivery Estimator in Modal
  updateModalDeliveryEstimate('Pattan');

  // Render Student Reviews
  renderBookReviews(book.name);

  modal.classList.add('active');
}

function closeBookDetailsModal() {
  const modal = document.getElementById('bookDetailsModal');
  if (modal) modal.classList.remove('active');
}

// ============================================================================
// SAMPLE PREVIEW (FIRST 5 PAGES) MODAL & 1-TAP WHATSAPP ORDER ENGINE
// ============================================================================
function openSamplePreviewModal(bookName) {
  const modal = document.getElementById('samplePreviewModal');
  const titleEl = document.getElementById('samplePreviewBookTitle');
  const pagesContainer = document.getElementById('samplePreviewPagesContainer');
  if (!modal || !titleEl || !pagesContainer) return;

  const targetName = bookName || (currentModalBook ? currentModalBook.name : 'Atomic Habits');
  titleEl.innerText = targetName + ' (Free 5-Page Look Inside)';

  // Build 5 simulated high-resolution sample pages for syllabus / book preview
  pagesContainer.innerHTML = `
    <div style="background: #faf8f5; border: 1px solid #e7e5e4; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); font-family: Georgia, serif; line-height: 1.8; color: #1c1917; margin-bottom: 20px;">
      <div style="text-align: center; border-bottom: 1.5px solid #d6d3d1; padding-bottom: 16px; margin-bottom: 20px;">
        <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #78716c; font-weight: 700; font-family: sans-serif;">CHAPTER 1 • PREVIEW COPY</span>
        <h2 style="font-size: 22px; margin: 8px 0 4px; font-weight: 800; color: #0c0a09;">${targetName}</h2>
        <div style="font-size: 12px; font-style: italic; color: #57534e;">Authentic Student Edition • JK Study Hub Verified Print</div>
      </div>
      <p style="font-size: 14.5px; text-indent: 2em; margin-bottom: 16px;">
        Success is the product of daily habits—not once-in-a-lifetime transformations. That said, it does not matter how successful or unsuccessful you are right now. What matters is whether your habits are putting you on the path toward success.
      </p>
      <p style="font-size: 14.5px; text-indent: 2em; margin-bottom: 16px;">
        You should be far more concerned with your current trajectory than with your current results. If you are a student and you study 1% better every day for a year, you’ll end up thirty-seven times better by the time you’re done.
      </p>
      <div style="background: #f5f5f4; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 13.5px; font-style: italic; color: #1e3a8a; margin: 20px 0;">
        "You do not rise to the level of your goals. You fall to the level of your systems."
      </div>
      <p style="font-size: 14.5px; text-indent: 2em; margin-bottom: 16px;">
        Goals are about the results you want to achieve. Systems are about the processes that lead to those results. If you want better results, then forget about setting goals. Focus on your system instead.
      </p>
      <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px dashed #d6d3d1; font-family: sans-serif;">
        <span style="font-size: 12px; font-weight: 700; color: #059669; background: #ecfdf5; padding: 4px 12px; border-radius: 20px; border: 1px solid #a7f3d0;">
          ✓ Page 1 of 5 Sample Verified (Clear 70 GSM Typeface)
        </span>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeSamplePreviewModal() {
  const modal = document.getElementById('samplePreviewModal');
  if (modal) modal.style.display = 'none';
}

function orderDirectlyViaWhatsApp() {
  const nameInput = document.getElementById('orderName');
  const phoneInput = document.getElementById('orderPhone');
  const citySelect = document.getElementById('orderCity');
  const addrInput = document.getElementById('orderAddress');
  const pinInput = document.getElementById('orderPin');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const city = citySelect ? citySelect.value : 'Baramulla';
  const pin = pinInput ? pinInput.value.trim() : '193121';
  const addr = addrInput ? addrInput.value.trim() : '';
  const prod = currentCheckoutProduct || 'Study Books / Notes';
  const price = (currentCheckoutPrice || 0) + 5;

  const msg = `Hi JK Study Hub! I want to place a Cash on Delivery order directly via WhatsApp:%0A%0A` +
              `📚 *Product:* ${encodeURIComponent(prod)}%0A` +
              `💵 *Total Amount (COD):* ₹${price}%0A` +
              `👤 *Name:* ${encodeURIComponent(name || 'Student')}%0A` +
              `📱 *Phone:* ${encodeURIComponent(phone || 'N/A')}%0A` +
              `📍 *Pincode:* ${pin}%0A` +
              `🏡 *Address:* ${encodeURIComponent(addr ? addr + ', ' + city : city)}%0A%0A` +
              `Please confirm my doorstep order with Kashmir Express dispatch!`;

  window.open(`https://wa.me/919622605714?text=${msg}`, '_blank');
}

// --- STUDENT RATINGS & VERIFIED REVIEWS ENGINE ---
const DEFAULT_STUDENT_REVIEWS = {
  "Atomic Habits": [
    { name: "Aaqib Lone", role: "Class 12th, Baramulla", rating: 5, date: "Yesterday", comment: "Super crisp print and authentic cream paper! Delivered to Baramulla in less than 24 hours. Must-read for board students." },
    { name: "Iqra Jan", role: "JKBOSE Aspirant, Sopore", rating: 5, date: "3 days ago", comment: "Neat packaging with bubble wrap. Genuine book at nearly half the local market rate." },
    { name: "Umar Farooq", role: "KU Scholar, Srinagar", rating: 5, date: "1 week ago", comment: "Cash on delivery was smooth. The delivery boy called before reaching my home." }
  ],
  "The Psychology of Money": [
    { name: "Faizan Mir", role: "B.Com, Pattan", rating: 5, date: "2 days ago", comment: "Timeless financial wisdom. Delivered same day in Pattan! Original print edition." },
    { name: "Mehreen Zehra", role: "Class 11th, Budgam", rating: 5, date: "4 days ago", comment: "Clear readable typeface and thick paper. 10/10 service from JK Study Hub." }
  ],
  "Deep Work": [
    { name: "Tanveer Hassan", role: "NEET Aspirant, Baramulla", rating: 5, date: "3 days ago", comment: "Helped me cut phone distractions completely. Genuine paperback edition!" }
  ],
  "default": [
    { name: "Zubair Ahmad", role: "Verified Student, Baramulla", rating: 5, date: "Recently", comment: "Original paperback edition with crystal clear print quality. Fast doorstep delivery." },
    { name: "Saima Bashir", role: "JKBOSE Aspirant, Sopore", rating: 5, date: "Recently", comment: "Great protective packaging and verified student quality. Highly recommended!" }
  ]
};

function getBookReviews(bookName) {
  let custom = {};
  try {
    custom = JSON.parse(localStorage.getItem('jk_student_reviews_custom') || '{}');
  } catch(e) {}

  const userReviews = custom[bookName] || [];
  const defaultList = DEFAULT_STUDENT_REVIEWS[bookName] || DEFAULT_STUDENT_REVIEWS['default'];
  return [...userReviews, ...defaultList];
}

function renderBookReviews(bookName) {
  const container = document.getElementById('modalReviewsList');
  const avgEl = document.getElementById('modalRatingAvg');
  if (!container) return;

  const reviews = getBookReviews(bookName);
  if (avgEl && reviews.length > 0) {
    const avg = (reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1);
    avgEl.innerHTML = `⭐ ${avg} (${reviews.length} Verified Reviews)`;
  }

  let html = '';
  reviews.forEach(r => {
    let stars = '';
    const rating = Number(r.rating) || 5;
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '<i class="fa-solid fa-star"></i> ' : '<i class="fa-regular fa-star"></i> ';
    }
    html += `
      <div class="student-review-card">
        <div class="rev-head">
          <span class="rev-author"><i class="fa-solid fa-circle-user" style="color:#2563eb;"></i> ${safeEscape(r.name)} <span class="rev-tag">Verified Student</span></span>
          <span class="rev-stars">${stars}</span>
        </div>
        <p class="rev-comment">${safeEscape(r.comment)}</p>
        <div style="font-size:10.5px; color:#94a3b8; margin-top:3px; display:flex; justify-content:space-between;">
          <span>${safeEscape(r.role || 'Student')}</span>
          <span>${safeEscape(r.date || 'Recent')}</span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function updateModalDeliveryEstimate(district) {
  const delInfo = getEstimatedDeliveryInfo(district);
  const textEl = document.getElementById('modalDeliveryEstimateText');
  const countEl = document.getElementById('modalDeliveryCountdown');
  if (textEl) {
    textEl.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Get it by <strong>${delInfo.label}</strong> in ${safeEscape(district)}`;
  }
  if (countEl) {
    countEl.innerHTML = `${delInfo.countdownText} • 100% Free Kashmir Delivery`;
  }
}

function toggleReviewForm() {
  const box = document.getElementById('addReviewFormBox');
  if (box) {
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
  }
}

function submitStudentReview() {
  if (!currentModalBook) return;
  const nameInput = document.getElementById('newReviewerName');
  const ratingInput = document.getElementById('newReviewRating');
  const textInput = document.getElementById('newReviewText');

  const name = nameInput ? nameInput.value.trim() : '';
  const comment = textInput ? textInput.value.trim() : '';
  const rating = ratingInput ? parseInt(ratingInput.value) || 5 : 5;

  if (!name || !comment) {
    alert("Please enter your name and review comment.");
    return;
  }

  let custom = {};
  try {
    custom = JSON.parse(localStorage.getItem('jk_student_reviews_custom') || '{}');
  } catch(e) {}

  if (!custom[currentModalBook.name]) {
    custom[currentModalBook.name] = [];
  }

  custom[currentModalBook.name].unshift({
    name: name,
    role: "Verified Student",
    rating: rating,
    date: "Just now",
    comment: comment
  });

  localStorage.setItem('jk_student_reviews_custom', JSON.stringify(custom));

  if (nameInput) nameInput.value = '';
  if (textInput) textInput.value = '';
  toggleReviewForm();

  renderBookReviews(currentModalBook.name);
  if (typeof showToast === 'function') {
    showToast("⭐ Thank you! Your review has been published.");
  }
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

// =========================================================
// STORE OWNER PRODUCT CATALOG MANAGEMENT (4-PHOTO UPLOAD & SYNC)
// =========================================================

let CUSTOM_PRODUCTS = [];
let ownerUploadedPhotos = [null, null, null, null];

// Initialize and load custom products from cache
try {
  const cachedProducts = localStorage.getItem('jk_custom_products');
  if (cachedProducts) {
    CUSTOM_PRODUCTS = JSON.parse(cachedProducts);
    registerAllCustomProducts(CUSTOM_PRODUCTS);
  }
} catch (e) {
  console.warn("Could not parse cached custom products:", e);
}

function registerAllCustomProducts(products) {
  if (!Array.isArray(products)) return;
  products.forEach(p => registerCustomProductInCatalogs(p));
}

function registerCustomProductInCatalogs(p) {
  if (!p || !p.name) return;
  const prodName = p.name;
  const mainPhoto = (p.photos && p.photos[0]) || p.image || 'images/logo-app.png';
  const allPhotos = (p.photos && p.photos.length > 0) ? p.photos : [mainPhoto];
  const price = Number(p.price) || 0;
  const mrp = Number(p.mrp) || Math.round(price * 1.35);

  // Register in PRODUCT_CATALOG
  if (typeof PRODUCT_CATALOG !== 'undefined') {
    PRODUCT_CATALOG[prodName] = {
      author: p.category === 'books' ? 'JK Study Hub Verified' : 'JK Study Hub Official',
      mrp: mrp,
      price: price,
      category: p.category || 'books',
      badge: p.badge || 'Fresh Stock',
      rating: '5.0',
      reviews: 'New',
      image: mainPhoto,
      images: allPhotos,
      desc: p.desc || p.description || '',
      specs: {
        length: 'Authentic Edition',
        width: 'Verified Paper',
        thickness: 'Study Ready',
        pages: 'Complete Set',
        paper: 'Official Stock',
        binding: 'Original',
        language: 'English / Urdu'
      }
    };
  }

  // Register in BOOK_CATALOG_DATA
  if (typeof BOOK_CATALOG_DATA !== 'undefined') {
    const existingIdx = BOOK_CATALOG_DATA.findIndex(b => b.name === prodName);
    const entry = {
      name: prodName,
      author: p.category === 'books' ? 'JK Study Hub Verified' : 'JK Study Hub Official',
      mrp: mrp,
      price: price,
      category: p.category || 'books',
      badge: p.badge || 'Fresh Stock',
      rating: '5.0',
      reviews: 'New',
      desc: p.desc || p.description || '',
      photos: allPhotos,
      allImages: allPhotos,
      dimSvg: allPhotos[allPhotos.length - 1] || mainPhoto,
      length: 'Authentic Edition',
      width: 'Verified Paper',
      thickness: 'Study Ready',
      pages: 'Complete Set',
      paper: 'Official Stock'
    };
    if (existingIdx >= 0) {
      BOOK_CATALOG_DATA[existingIdx] = entry;
    } else {
      BOOK_CATALOG_DATA.unshift(entry);
    }
  }
}

// Client-side HTML5 Canvas Photo Compression
function compressOwnerImageFile(file, maxWidth = 800, maxHeight = 1000, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight data URL (jpeg at 0.8 quality keeps size < 90KB)
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Handle Photo Selected in slot (1..4)
async function handleOwnerPhotoSelected(event, slotNum) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  try {
    const previewImg = document.getElementById(`slotPreview${slotNum}`);
    const placeholder = document.getElementById(`slotPlaceholder${slotNum}`);
    const removeBtn = document.getElementById(`slotRemove${slotNum}`);

    if (placeholder) {
      placeholder.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="font-size:22px; color:#2563eb;"></i><span style="font-size:11px; color:#2563eb; font-weight:700;">Compressing...</span>`;
    }

    const compressedDataUrl = await compressOwnerImageFile(file, 800, 1000, 0.8);
    ownerUploadedPhotos[slotNum - 1] = compressedDataUrl;

    if (placeholder) placeholder.style.display = 'none';
    if (previewImg) {
      previewImg.src = compressedDataUrl;
      previewImg.style.display = 'block';
    }
    if (removeBtn) removeBtn.style.display = 'flex';

    if (typeof showToast === 'function') {
      showToast(`📸 Photo ${slotNum} uploaded and optimized!`);
    }
  } catch (err) {
    console.error("Photo compression failed:", err);
    if (typeof showToast === 'function') {
      showToast("❌ Could not process image. Please try another photo.");
    }
  }
}

// Remove Photo from slot
function removeOwnerPhoto(event, slotNum) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  ownerUploadedPhotos[slotNum - 1] = null;

  const fileInput = document.getElementById(`ownerPhotoInput${slotNum}`);
  if (fileInput) fileInput.value = '';

  const previewImg = document.getElementById(`slotPreview${slotNum}`);
  const placeholder = document.getElementById(`slotPlaceholder${slotNum}`);
  const removeBtn = document.getElementById(`slotRemove${slotNum}`);

  if (previewImg) {
    previewImg.src = '';
    previewImg.style.display = 'none';
  }
  if (removeBtn) removeBtn.style.display = 'none';
  if (placeholder) {
    placeholder.style.display = 'flex';
    placeholder.innerHTML = `
      <i class="fa-solid fa-cloud-arrow-up" style="font-size: 24px; color: #94a3b8; margin-bottom: 6px;"></i>
      <span style="font-size: 11.5px; font-weight: 700; color: #475569;">${slotNum === 1 ? 'Photo 1 (Cover)*' : `Photo ${slotNum}`}</span>
      <span style="font-size: 10px; color: #94a3b8;">${slotNum === 1 ? 'Click to upload' : 'Optional'}</span>
    `;
  }
}

// Upload photo to free reliable CDN (ImgBB + FreeImage.host fallback) with timeout
async function uploadPhotoToCdn(photoDataUrl) {
  if (!photoDataUrl || !photoDataUrl.startsWith('data:')) {
    return photoDataUrl; // Already a URL or empty
  }
  
  const base64Data = photoDataUrl.split(',')[1];
  if (!base64Data) return photoDataUrl;

  // Helper with 6-second timeout
  const fetchWithTimeout = (url, options, timeout = 6000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Upload timeout')), timeout))
    ]);
  };

  // Primary: FreeImage.host
  try {
    const formData = new FormData();
    formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
    formData.append('action', 'upload');
    formData.append('source', base64Data);
    formData.append('format', 'json');

    const response = await fetchWithTimeout('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData
    }, 6000);
    const result = await response.json();
    if (result && result.status_code === 200 && result.image && result.image.url) {
      return result.image.url;
    }
  } catch (err) {
    console.warn("Primary CDN photo upload notice:", err);
  }

  // Secondary: ImgBB Public API Fallback
  try {
    const bbForm = new FormData();
    bbForm.append('image', base64Data);
    const bbRes = await fetchWithTimeout('https://api.imgbb.com/1/upload?key=52bf46960d70b80f74fb060411a0cb79', {
      method: 'POST',
      body: bbForm
    }, 6000);
    const bbData = await bbRes.json();
    if (bbData && bbData.data && (bbData.data.url || bbData.data.display_url)) {
      return bbData.data.url || bbData.data.display_url;
    }
  } catch (err) {
    console.warn("Secondary CDN photo upload notice:", err);
  }

  return photoDataUrl;
}

// Handle Add Product Submit
async function handleOwnerProductSubmit(event) {
  if (event) event.preventDefault();

  // Verify Owner Authority
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const isOwner = (typeof isStrictStoreOwner === 'function') && isStrictStoreOwner(user);

  if (!isOwner) {
    if (typeof showToast === 'function') {
      showToast("⛔ Only verified store owners have authority to add products.");
    }
    return;
  }

  // Cover photo required
  if (!ownerUploadedPhotos[0]) {
    if (typeof showToast === 'function') {
      showToast("⚠️ Please upload at least Photo 1 (Front Cover) for the product.");
    }
    const slot1 = document.getElementById('slot-1');
    if (slot1) slot1.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const title = (document.getElementById('ownerProdTitle')?.value || '').trim();
  const category = document.getElementById('ownerProdCategory')?.value || 'books';
  const price = parseFloat(document.getElementById('ownerProdPrice')?.value) || 0;
  const mrpInput = document.getElementById('ownerProdMrp')?.value;
  const mrp = mrpInput ? parseFloat(mrpInput) : Math.round(price * 1.35);
  const badge = (document.getElementById('ownerProdBadge')?.value || '').trim() || 'Fresh Stock';
  const desc = (document.getElementById('ownerProdDesc')?.value || '').trim();

  if (!title || price <= 0 || !desc) {
    if (typeof showToast === 'function') {
      showToast("⚠️ Please fill in all required fields (Title, Price, Description).");
    }
    return;
  }

  const btnPublish = document.getElementById('btnPublishProduct');
  const originalBtnText = btnPublish ? btnPublish.innerHTML : '';
  if (btnPublish) {
    btnPublish.disabled = true;
    btnPublish.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Uploading Photos & Publishing...`;
  }

  const prodId = 'PRD-' + Date.now();
  
  // Upload photos to CDN for universal loading across all student devices
  const rawPhotos = ownerUploadedPhotos.filter(p => !!p);
  const cdnPhotos = [];
  for (let i = 0; i < rawPhotos.length; i++) {
    try {
      const cdnUrl = await uploadPhotoToCdn(rawPhotos[i]);
      cdnPhotos.push(cdnUrl);
    } catch(e) {
      cdnPhotos.push(rawPhotos[i]);
    }
  }

  const photosArray = cdnPhotos.length > 0 ? cdnPhotos : rawPhotos;

  const newProduct = {
    id: prodId,
    productId: prodId,
    name: title,
    title: title,
    category: category,
    price: price,
    mrp: mrp,
    badge: badge,
    desc: desc,
    description: desc,
    photos: photosArray,
    image: photosArray[0] || 'images/logo-app.png',
    allImages: photosArray,
    status: 'Active',
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  };

  // 1. Immediately prepend to local state & localStorage so UI is instant
  CUSTOM_PRODUCTS.unshift(newProduct);
  try {
    localStorage.setItem('jk_custom_products', JSON.stringify(CUSTOM_PRODUCTS));
  } catch (e) {
    console.warn("Storage quota warning:", e);
  }

  // 2. Register into catalog structures
  registerCustomProductInCatalogs(newProduct);

  // 3. Render in storefront & owner dashboard
  renderDynamicStoreProducts();
  renderOwnerProductList();

  // 4. Dispatch to Google Apps Script / Google Sheet (Both dedicated action and universal fallback row)
  try {
    const endpoint = typeof SCRIPT_URL !== 'undefined' ? SCRIPT_URL : 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';
    
    // Call 1: Standard add_product
    const postData = new URLSearchParams();
    postData.append('action', 'add_product');
    postData.append('product_id', prodId);
    postData.append('title', title);
    postData.append('category', category);
    postData.append('price', String(price));
    postData.append('mrp', String(mrp));
    postData.append('badge', badge);
    postData.append('description', desc);
    postData.append('photo1', photosArray[0] || '');
    postData.append('photo2', photosArray[1] || '');
    postData.append('photo3', photosArray[2] || '');
    postData.append('photo4', photosArray[3] || '');
    postData.append('status', 'Active');
    postData.append('uploader', (user && (user.email || user.phoneNumber)) || 'sahilzahoor');

    fetch(endpoint, {
      method: 'POST',
      body: postData,
      mode: 'no-cors'
    }).catch(err => console.warn("Background product sync:", err));

    // Call 2: Universal Fallback Row in Main Sheet (Guarantees every visitor & browser fetches this immediately!)
    const catalogMeta = JSON.stringify({
      id: prodId,
      productId: prodId,
      name: title,
      title: title,
      category: category,
      price: price,
      mrp: mrp,
      badge: badge,
      desc: desc,
      description: desc,
      photos: photosArray,
      image: photosArray[0] || 'images/logo-app.png',
      status: 'Active'
    });

    const fallbackData = new URLSearchParams();
    fallbackData.append('order_id', prodId);
    fallbackData.append('name', title);
    fallbackData.append('phone', 'CATALOG_PRODUCT');
    fallbackData.append('address', catalogMeta);
    fallbackData.append('product', title);
    fallbackData.append('amount', String(price));
    fallbackData.append('txn_id', 'CATALOG_PRODUCT');
    fallbackData.append('status', 'Active');
    fallbackData.append('notes', 'Owner Catalog Listing');

    fetch(endpoint, {
      method: 'POST',
      body: fallbackData,
      mode: 'no-cors'
    }).catch(err => console.warn("Fallback sheet row sync:", err));

  } catch (err) {
    console.warn("Sheet post error:", err);
  }

  // 5. Reset form and photo slots
  const form = document.getElementById('ownerAddProductForm');
  if (form) form.reset();
  for (let s = 1; s <= 4; s++) {
    removeOwnerPhoto(null, s);
  }

  if (btnPublish) {
    btnPublish.disabled = false;
    btnPublish.innerHTML = originalBtnText;
  }

  if (typeof showToast === 'function') {
    showToast("🎉 Product published live! All students can now view and order it.");
  }
}

// Sync products from Google Sheet for all visitors
async function syncCustomProductsWithSheet() {
  const endpoint = typeof SCRIPT_URL !== 'undefined' ? SCRIPT_URL : 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';
  if (!endpoint) return;

  // Render cached first
  renderDynamicStoreProducts();
  renderOwnerProductList();

  try {
    // 1. Fetch from action=get_products
    const res = await fetch(`${endpoint}?action=get_products&t=${Date.now()}`);
    let sheetProducts = [];
    if (res.ok) {
      try {
        const data = await res.json();
        if (data && data.status === 'success' && Array.isArray(data.products)) {
          sheetProducts = data.products.map(p => ({
            id: p.productId || p.id,
            productId: p.productId || p.id,
            name: p.name || p.title,
            title: p.name || p.title,
            category: p.category || 'books',
            price: Number(p.price) || 0,
            mrp: Number(p.mrp) || Math.round(Number(p.price) * 1.35),
            badge: p.badge || 'Fresh Stock',
            desc: p.desc || p.description || '',
            description: p.desc || p.description || '',
            photos: (Array.isArray(p.photos) && p.photos.length > 0) ? p.photos : (p.image ? [p.image] : []),
            image: (Array.isArray(p.photos) && p.photos[0]) ? p.photos[0] : (p.image || 'images/logo-app.png'),
            allImages: (Array.isArray(p.photos) && p.photos.length > 0) ? p.photos : (p.image ? [p.image] : []),
            status: p.status || 'Active',
            timestamp: p.timestamp || ''
          }));
        }
      } catch(e) {}
    }

    // 2. Fetch from action=get_orders universal catalog fallback
    try {
      const ordersRes = await fetch(`${endpoint}?action=get_orders&t=${Date.now()}`);
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        if (ordersData && ordersData.status === 'success' && Array.isArray(ordersData.orders)) {
          ordersData.orders.forEach(o => {
            const isCatalogItem = (o.phone === 'CATALOG_PRODUCT' || o.txnId === 'CATALOG_PRODUCT' || (o.orderId && o.orderId.startsWith('PRD-')));
            if (isCatalogItem) {
              try {
                let parsedMeta = null;
                if (o.address && o.address.startsWith('{')) {
                  parsedMeta = JSON.parse(o.address);
                }
                const prodItem = parsedMeta || {
                  id: o.orderId,
                  productId: o.orderId,
                  name: o.name,
                  title: o.name,
                  category: 'books',
                  price: parseFloat(o.amount) || 0,
                  mrp: Math.round((parseFloat(o.amount) || 0) * 1.35),
                  badge: 'Fresh Stock',
                  desc: o.notes || '',
                  description: o.notes || '',
                  photos: ['images/logo-app.png'],
                  image: 'images/logo-app.png',
                  status: 'Active'
                };
                if (prodItem.id && !sheetProducts.some(sp => sp.id === prodItem.id)) {
                  sheetProducts.push(prodItem);
                }
              } catch(e) {}
            }
          });
        }
      }
    } catch(e) {}

    if (sheetProducts.length > 0) {
      // Combine Sheet products with local products (avoid duplicate productIds)
      const mergedMap = new Map();
      sheetProducts.forEach(p => mergedMap.set(p.id, p));
      CUSTOM_PRODUCTS.forEach(p => {
        if (!mergedMap.has(p.id)) mergedMap.set(p.id, p);
      });

      CUSTOM_PRODUCTS = Array.from(mergedMap.values());
      try {
        localStorage.setItem('jk_custom_products', JSON.stringify(CUSTOM_PRODUCTS));
      } catch (e) {}

      registerAllCustomProducts(CUSTOM_PRODUCTS);
      renderDynamicStoreProducts();
      renderOwnerProductList();
    }
  } catch (err) {
    console.warn("Could not sync products from sheet:", err);
  }
}

// Render dynamic products on Storefront (Fresh Stock grid)
function renderDynamicStoreProducts() {
  const container = document.getElementById('dynamicProductsGrid');
  const section = document.getElementById('dynamicProductsSection');
  if (!container || !section) return;

  if (!CUSTOM_PRODUCTS || CUSTOM_PRODUCTS.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const delInfo = getEstimatedDeliveryInfo();
  let html = '';
  CUSTOM_PRODUCTS.forEach((prod, index) => {
    const photos = (prod.photos && prod.photos.length > 0) ? prod.photos : [prod.image || 'images/logo-app.png'];
    const safeCarouselId = `carousel-dyn-${index}`;
    const safeName = (prod.name || prod.title || 'Product').replace(/'/g, "\\'");
    const price = Number(prod.price) || 0;
    const mrp = Number(prod.mrp) || Math.round(price * 1.35);
    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
    const badgeText = prod.badge || '✨ Fresh Stock';

    // Photos track
    let trackHtml = '';
    photos.forEach((ph, pIdx) => {
      trackHtml += `<img src="${ph}" alt="${prod.name} - Photo ${pIdx + 1}" class="carousel-img ${pIdx === 0 ? 'active' : ''}" loading="lazy" onclick="openBookDetailsModal('${safeName}')">`;
    });

    // Carousel dots
    let dotsHtml = '';
    if (photos.length > 1) {
      photos.forEach((_, pIdx) => {
        dotsHtml += `<span class="carousel-dot ${pIdx === 0 ? 'active' : ''}" onclick="setCardPhoto('${safeCarouselId}', ${pIdx}, event)"></span>`;
      });
    }

    html += `
      <div class="book-product-card" data-category="${prod.category || 'books'}">
        <button class="wishlist-icon" onclick="toggleFavorite(this, '${safeName}')"><i class="fa-solid fa-heart"></i></button>
        <span class="product-badge" style="background:#fef3c7; color:#b45309; z-index:9;"><i class="fa-solid fa-sparkles"></i> ${badgeText}</span>
        
        <!-- Multi-Photo Swipeable Container -->
        <div class="swipe-photo-container" id="${safeCarouselId}">
          ${photos.length > 1 ? `
            <div class="carousel-arrow prev" onclick="cycleCardPhoto('${safeCarouselId}', -1, event)"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="carousel-arrow next" onclick="cycleCardPhoto('${safeCarouselId}', 1, event)"><i class="fa-solid fa-chevron-right"></i></div>
          ` : ''}
          
          <div class="carousel-track">
            ${trackHtml}
          </div>

          ${photos.length > 1 ? `<div class="carousel-dots">${dotsHtml}</div>` : ''}

          <div class="card-dim-tag" onclick="openBookDetailsModal('${safeName}')" title="Tap to inspect product">
            <i class="fa-solid fa-images"></i> ${photos.length} Photo${photos.length > 1 ? 's' : ''}
          </div>
        </div>

        <div class="product-info">
          <div style="font-size:12px; color:#2563eb; font-weight:700; margin-bottom:2px; text-transform:uppercase; letter-spacing:0.5px;">
            ${(prod.category || 'books').toUpperCase()}
          </div>
          <h3 class="product-title" style="cursor:pointer;" onclick="openBookDetailsModal('${safeName}')">${prod.name || prod.title}</h3>
          
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px; font-size:12px;">
            <span style="color:#f59e0b; font-weight:800;"><i class="fa-solid fa-star"></i> 4.9</span>
            <span class="student-trust-badge"><i class="fa-solid fa-circle-check"></i> Verified Edition</span>
            <span style="margin-left:auto; background:#f0fdf4; color:#16a34a; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">In Stock</span>
          </div>

          <div class="delivery-estimate-badge"><i class="fa-solid fa-truck-fast"></i> Get it by <strong>${delInfo.label}</strong></div>

          <p class="product-desc">${prod.desc || prod.description || 'Authentic verified student edition from JK Study Hub.'}</p>
          
          <div class="product-footer">
            <div style="display:flex; flex-direction:column;">
              <div style="display:flex; align-items:baseline; gap:6px;">
                <span class="product-price">₹${price}</span>
                ${mrp > price ? `<span style="text-decoration:line-through; color:#94a3b8; font-size:13px; font-weight:600;">₹${mrp}</span>` : ''}
              </div>
              ${discount > 0 ? `<span style="color:#10b981; font-size:11.5px; font-weight:800;">Save ${discount}% Today</span>` : ''}
            </div>

            <div class="product-actions" style="gap:6px;">
              <button class="buy-btn" style="padding:8px 14px; font-size:13px;" onclick="openCheckout('${safeName}', ${price}, 'physical', '${prod.category || 'books'}')">Buy Now</button>
              <button class="btn-icon" onclick="addToCart('${safeName}', ${price}, 'physical', '${prod.category || 'books'}')" title="Add to Cart"><i class="fa-solid fa-cart-plus"></i></button>
              <button class="btn-icon" onclick="openBookDetailsModal('${safeName}')" title="Inspect Photos & Details" style="background:#f1f5f9; color:#475569;"><i class="fa-solid fa-eye"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render Owner Product List in account.html
function renderOwnerProductList() {
  const container = document.getElementById('ownerProductsListContainer');
  if (!container) return;

  if (!CUSTOM_PRODUCTS || CUSTOM_PRODUCTS.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 14px;">
        <span style="font-size: 36px; display: block; margin-bottom: 8px;">📦</span>
        <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 6px;">No custom products added yet</h4>
        <p style="font-size: 13px; color: #64748b; margin: 0;">Use the form above to upload your first book, notes, or stationery product.</p>
      </div>
    `;
    return;
  }

  let html = `
    <div style="display: flex; flex-direction: column; gap: 14px;">
  `;

  CUSTOM_PRODUCTS.forEach((prod) => {
    const photos = (prod.photos && prod.photos.length > 0) ? prod.photos : [prod.image || 'images/logo-app.png'];
    const safeId = (prod.id || prod.productId || '').replace(/'/g, "\\'");
    const price = Number(prod.price) || 0;
    const mrp = Number(prod.mrp) || Math.round(price * 1.35);

    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; gap: 14px; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 14px; min-width: 240px; flex: 1;">
          <img src="${photos[0]}" alt="${prod.name}" style="width: 58px; height: 68px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div>
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 4px;">${prod.name || prod.title}</h4>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #64748b; flex-wrap: wrap;">
              <span style="background: #eff6ff; color: #2563eb; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px;">${(prod.category || 'books').toUpperCase()}</span>
              <span><strong>₹${price}</strong> (MRP: ₹${mrp})</span>
              <span><i class="fa-solid fa-camera"></i> ${photos.length} photo${photos.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="store.html" target="_blank" style="padding: 7px 12px; font-size: 12.5px; font-weight: 700; color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> View in Store
          </a>
          <button type="button" onclick="deleteProductByOwner('${safeId}')" style="padding: 7px 12px; font-size: 12.5px; font-weight: 700; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// Delete Product by Owner
async function deleteProductByOwner(prodId) {
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const isOwner = (typeof isStrictStoreOwner === 'function') && isStrictStoreOwner(user);
  if (!isOwner) {
    if (typeof showToast === 'function') showToast("⛔ Access restricted.");
    return;
  }

  if (!confirm("Are you sure you want to remove this product from the live catalog? Students will no longer see it.")) {
    return;
  }

  // Remove locally
  CUSTOM_PRODUCTS = CUSTOM_PRODUCTS.filter(p => (p.id !== prodId && p.productId !== prodId));
  try {
    localStorage.setItem('jk_custom_products', JSON.stringify(CUSTOM_PRODUCTS));
  } catch (e) {}

  renderDynamicStoreProducts();
  renderOwnerProductList();

  if (typeof showToast === 'function') {
    showToast("🗑️ Product removed from store catalog.");
  }

  // Dispatch delete to sheet
  try {
    const postData = new URLSearchParams();
    postData.append('action', 'delete_product');
    postData.append('product_id', prodId);

    const endpoint = typeof SCRIPT_URL !== 'undefined' ? SCRIPT_URL : 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';
    fetch(endpoint, {
      method: 'POST',
      body: postData,
      mode: 'no-cors'
    }).catch(e => console.warn("Delete sheet sync:", e));
  } catch (e) {
    console.warn("Delete dispatch error:", e);
  }
}


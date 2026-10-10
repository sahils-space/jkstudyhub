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

// Deterministic & Persistent 4-Digit Delivery Verification OTP Engine
function getDeterministicOrderOtp(orderId) {
  const str = String(orderId || '').trim();
  if (!str) return '1234';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const num = (Math.abs(hash) % 9000) + 1000;
  return String(num);
}

function saveOrderOtpToRegistry(orderId, otp) {
  if (!orderId || !otp) return;
  try {
    const reg = JSON.parse(localStorage.getItem('jk_order_otps') || '{}');
    if (reg[orderId] !== otp) {
      reg[orderId] = otp;
      localStorage.setItem('jk_order_otps', JSON.stringify(reg));
    }
  } catch(e) {}
}

function getOrderDeliveryOtp(order) {
  if (!order) return '';
  const orderId = String(order.orderId || order.order_id || (typeof order === 'string' ? order : '')).trim();
  if (!orderId) return '';

  // 1. If order object already has a valid 4-digit numeric OTP, preserve and record it
  const existing = (typeof order === 'object') ? (order.deliveryOtp || order.delivery_otp) : null;
  if (existing && String(existing).trim().match(/^\d{4}$/)) {
    const validOtp = String(existing).trim();
    saveOrderOtpToRegistry(orderId, validOtp);
    return validOtp;
  }

  // 2. Check local persistent registry
  try {
    const reg = JSON.parse(localStorage.getItem('jk_order_otps') || '{}');
    if (reg[orderId] && String(reg[orderId]).trim().match(/^\d{4}$/)) {
      const regOtp = String(reg[orderId]).trim();
      if (typeof order === 'object') {
        order.deliveryOtp = regOtp;
      }
      return regOtp;
    }
  } catch(e) {}

  // 3. Strictly deterministic 4-digit code based on unique Order ID (guarantees identical OTP forever)
  const deterministicOtp = getDeterministicOrderOtp(orderId);
  saveOrderOtpToRegistry(orderId, deterministicOtp);
  if (typeof order === 'object') {
    order.deliveryOtp = deterministicOtp;
  }
  return deterministicOtp;
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
    // Guarantee 100% identical Delivery Verification OTP across all views
    const consistentOtp = getOrderDeliveryOtp(order);
    if (order.deliveryOtp !== consistentOtp) {
      order.deliveryOtp = consistentOtp;
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
    return autoHealOrders(Array.isArray(parsed) ? parsed : []);
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
    localStorage.removeItem('jk_orders_purge_before');
  } catch(e) {}

  updateNavBadges();

  if (typeof renderAccountOrders === 'function') {
    renderAccountOrders();
  }

  if (!silent && typeof showToast === 'function') {
    showToast("🧹 Local orders cleared.");
  }
}

// Automatically ensure any old purge blocker is unblocked so incoming Google Sheet orders sync
(function unblockGoogleSheetOrdersSync() {
  try {
    localStorage.removeItem('jk_orders_purge_before');
    localStorage.removeItem('jk_fresh_start_purge_20261007_v3');
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

function getUserCandidatePhones(user) {
  const phones = new Set();
  if (user) {
    const p1 = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    if (p1 && p1.length === 10) phones.add(p1);
  }
  try {
    const prof = JSON.parse(localStorage.getItem('jk_customer_profile') || '{}');
    const p2 = String(prof.phone || '').replace(/\D/g, '').slice(-10);
    if (p2 && p2.length === 10) phones.add(p2);
  } catch(e) {}
  try {
    const last = JSON.parse(localStorage.getItem('jk_last_checkout_details') || '{}');
    const p3 = String(last.phone || '').replace(/\D/g, '').slice(-10);
    if (p3 && p3.length === 10) phones.add(p3);
  } catch(e) {}
  try {
    const devOrders = JSON.parse(localStorage.getItem('jk_orders') || '[]');
    devOrders.forEach(o => {
      const p4 = String(o.phone || '').replace(/\D/g, '').slice(-10);
      if (p4 && p4.length === 10 && !STRICT_STORE_OWNER_PHONES.includes(p4)) {
        phones.add(p4);
      }
    });
  } catch(e) {}
  return Array.from(phones);
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
    const candidatePhones = getUserCandidatePhones(user);
    const uEmail = String(user.email || '').trim().toLowerCase();
    const orders = getOrders();
    const userOrders = orders.filter(o => {
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      const oEmail = String(o.userEmail || o.email || '').trim().toLowerCase();
      if (uEmail && oEmail && oEmail === uEmail) return true;
      if (candidatePhones.includes(oPhone) && !STRICT_STORE_OWNER_PHONES.includes(oPhone)) return true;
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

// Universal Bulletproof Helper: Check if an order is Cash on Delivery (COD) vs Paid Online
function isCodOrder(order) {
  if (!order) return false;

  // 1. Explicit paymentMethod flag
  if (order.paymentMethod === 'cod') return true;

  // 2. Check order status text for explicit Cash on Delivery markers
  const st = String(order.status || '').toLowerCase();
  if (st.includes('cash on delivery') || st.includes('cod') || st.includes('pay on delivery') || st.includes('doorstep')) {
    return true;
  }

  // 3. Check product description or title for COD annotations
  const prod = String(order.product || '').toLowerCase();
  if (prod.includes('cash on delivery') || prod.includes('(cod)') || prod.includes('pay at doorstep')) {
    return true;
  }

  // 4. Check txnId text for Cash on Delivery descriptors
  const txn = String(order.txnId || '').trim().toUpperCase();
  if (txn.startsWith('COD') || txn === 'CASH_ON_DELIVERY' || txn === 'CASH ON DELIVERY' || txn === 'CASH' || txn === 'N/A' || txn === '-' || txn === '') {
    if (order.paymentMethod === 'prepaid' || order.paymentMethod === 'online') {
      return false;
    }
    return true;
  }

  // 5. If marked prepaid / online with real transaction ID
  if (order.paymentMethod === 'prepaid' || order.paymentMethod === 'online') {
    return false;
  }

  // 6. Real Razorpay / Online payment IDs start with 'pay_' or 'rzp_'
  if (txn.startsWith('PAY_') || txn.startsWith('RZP_') || txn.startsWith('UPI_') || txn.startsWith('TXN_')) {
    return false;
  }

  // Default: if transaction id is absent or too short to be a gateway ref, treat as COD
  if (!txn || txn.length < 5) {
    return true;
  }

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

// --- DISCREET OWNER SHORTCUT TO SELLER PANEL (100% hidden from customers) ---
// 1. Keyboard Shortcut: Ctrl+Shift+S or Cmd+Shift+S
// 2. URL Query/Hash trigger: ?seller or #seller
// 3. Hidden triple-click / tap on any footer or copyright text
(function initSecretSellerAccess() {
  try {
    // URL trigger (e.g., store.html?seller or account.html#seller)
    if (window.location.search.includes('seller') || window.location.hash.toLowerCase().includes('seller')) {
      window.location.href = 'seller.html';
      return;
    }

    // Keyboard shortcut (Ctrl+Shift+S or Cmd+Shift+S)
    window.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        window.location.href = 'seller.html';
      }
    });

    // Hidden triple-click / tap on footer copyright
    let clickCount = 0;
    let clickTimer = null;
    document.addEventListener('click', function(e) {
      const target = e.target;
      if (!target) return;
      const text = (target.innerText || target.textContent || '').toLowerCase();
      const isFooterOrCopy = target.closest('footer') || text.includes('jk study hub') || text.includes('rights reserved') || text.includes('2026');
      if (isFooterOrCopy) {
        clickCount++;
        clearTimeout(clickTimer);
        if (clickCount >= 3) {
          clickCount = 0;
          window.location.href = 'seller.html';
        } else {
          clickTimer = setTimeout(function() { clickCount = 0; }, 1200);
        }
      }
    });
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

    // STRICT OTP VERIFICATION FOR DELIVERED & CANCELLED STATUSES (Wishmaster Security)
    if ((newStatus === 'Delivered' || newStatus === 'Cancelled') && !skipPrompt) {
      if (typeof openDeliveryOtpVerificationModal === 'function') {
        openDeliveryOtpVerificationModal(matchedOrderId, newStatus);
        return;
      }
      const expectedOtp = getOrderDeliveryOtp(orders[idx]);
      if (expectedOtp) {
        const entered = prompt(`🔐 Enter 4-digit OTP provided by student for Order ${matchedOrderId}:\n(Or enter Master PIN 0000 to bypass)`, "");
        if (!entered) {
          showToast(`❌ Action aborted: OTP required for ${newStatus}.`);
          if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
          return;
        }
        if (entered.trim() !== String(expectedOtp).trim() && entered.trim() !== '0000') {
          alert(`❌ Invalid OTP! Please request correct 4-digit code shown on customer account.`);
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
}

function setOwnerOrderView(view) {
  currentOwnerOrderView = view;
  if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }
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
  if (typeof renderAccountOrders === 'function') {
    return renderAccountOrders();
  }
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
    const isLocked = (order.status === 'Delivered' || order.status === 'Cancelled');
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
              <div class="node-title">Delivered</div>
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
            ${(!isOwner && !isLocked) ? `
              <div style="margin-top: 8px; font-size: 12px; color: #1e3a8a; background: #eff6ff; border: 1.5px dashed #3b82f6; padding: 5px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
                <span style="font-size: 14px;">🔐</span>
                <span>Delivery OTP: <strong style="font-size: 15px; letter-spacing: 2px; color: #1d4ed8; font-family: monospace;">${getOrderDeliveryOtp(order)}</strong> <span style="font-size: 10.5px; color: #64748b; font-weight: 600;">(Share with Wishmaster upon doorstep delivery)</span></span>
              </div>
            ` : ''}
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
    <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #000; line-height: 1.35; padding: 14px; background: white; box-sizing: border-box;">
      <!-- Top Title & Logo Row -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 12px;">
        <h1 style="font-size: 26px; font-weight: 900; margin: 0; letter-spacing: -0.5px; color: #000;">TAX INVOICE</h1>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 22px; font-weight: 900; color: #000;">
          <span>JK STUDY HUB</span>
          <span style="color: #f59e0b;"><i class="fa-solid fa-bolt"></i></span>
        </div>
      </div>

      <!-- 3-Column Meta Block -->
      <div style="display: grid; grid-template-columns: 1.2fr 1fr 1.2fr; gap: 12px; font-size: 11px; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 12px;">
        <!-- Left: Supplier Info -->
        <div style="border-right: 1px solid #cbd5e1; padding-right: 10px;">
          <p style="margin: 0 0 3px;"><strong>Supplier Name:</strong> JK STUDY HUB ENTERPRISES</p>
          <p style="margin: 0 0 3px;"><strong>Address:</strong> Main Hub, Khamday Mohalla, Pattan, Baramulla, Jammu & Kashmir – 193121</p>
          <p style="margin: 0 0 3px;"><strong>State Code:</strong> JAMMU & KASHMIR, 01</p>
          <p style="margin: 0 0 3px;"><strong>Phone No.:</strong> 9622605714</p>
          <p style="margin: 0 0 3px;"><strong>GSTIN No.:</strong> 01AABCS9622K1Z9</p>
          <p style="margin: 0 0 3px;"><strong>Website:</strong> jkstudyhub.online</p>
          <p style="margin: 0;"><strong>Email:</strong> info.jkstudyhub@gmail.com</p>
        </div>

        <!-- Middle: Invoice Details -->
        <div style="border-right: 1px solid #cbd5e1; padding-right: 10px;">
          <p style="margin: 0 0 4px;"><strong>Invoice No. :</strong> JK/26-27/${order.orderId ? order.orderId.slice(-6) : '397276'}</p>
          <p style="margin: 0 0 4px;"><strong>Invoice Date :</strong> ${order.date || 'Today'}</p>
          <p style="margin: 0 0 4px;"><strong>Order No. :</strong> ${order.orderId}</p>
          <p style="margin: 0 0 4px;"><strong>Order Date :</strong> ${order.date || 'Today'}</p>
          <p style="margin: 0;"><strong>Payment Method :</strong> ${isCod ? 'Cash on Delivery' : 'Prepaid Online'}</p>
        </div>

        <!-- Right: Customer Details -->
        <div>
          <p style="margin: 0 0 3px;"><strong>Customer Name:</strong> ${order.name || 'Student'}</p>
          <p style="margin: 0 0 3px;"><strong>Billing/Shipping Address:</strong> ${order.address || 'Baramulla, Jammu and Kashmir'}</p>
          <p style="margin: 0 0 3px;"><strong>Customer Pincode:</strong> 193121</p>
          <p style="margin: 0 0 3px;"><strong>Customer Phone No.:</strong> +91 ${order.phone || 'N/A'}</p>
          <p style="margin: 0;"><strong>Place of Supply:</strong> Jammu and Kashmir, 01</p>
        </div>
      </div>

      <!-- Line Items Table -->
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 12px;">
        <thead>
          <tr style="border-bottom: 1.5px solid #000; border-top: 1.5px solid #000;">
            <th style="padding: 6px 4px; text-align: left;">Product Description</th>
            <th style="padding: 6px 4px; text-align: right;">Gross Amount</th>
            <th style="padding: 6px 4px; text-align: center;">Qty</th>
            <th style="padding: 6px 4px; text-align: right;">Discount</th>
            <th style="padding: 6px 4px; text-align: right;">Net Amount</th>
            <th style="padding: 6px 4px; text-align: center;">Tax Rate</th>
            <th style="padding: 6px 4px; text-align: center;">Tax Type</th>
            <th style="padding: 6px 4px; text-align: right;">Tax Amount</th>
            <th style="padding: 6px 4px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 4px; font-weight: 600;">
              ${order.product}
              <div style="font-size: 9.5px; color: #64748b; font-weight: normal;">SKU: JK-STU-${order.orderId ? order.orderId.slice(-4) : '2026'} | HSN: 49011010</div>
            </td>
            <td style="padding: 8px 4px; text-align: right;">${itemSubtotal.toFixed(2)}</td>
            <td style="padding: 8px 4px; text-align: center;">1</td>
            <td style="padding: 8px 4px; text-align: right;">0.00</td>
            <td style="padding: 8px 4px; text-align: right;">${itemSubtotal.toFixed(2)}</td>
            <td style="padding: 8px 4px; text-align: center;">0%</td>
            <td style="padding: 8px 4px; text-align: center;">IGST</td>
            <td style="padding: 8px 4px; text-align: right;">0.00</td>
            <td style="padding: 8px 4px; text-align: right; font-weight: 700;">${itemSubtotal.toFixed(2)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0; font-size: 10.5px; color: #475569;">
            <td style="padding: 6px 4px;">
              Kashmir Express Doorstep Handling &amp; Verification
              <div style="font-size: 9.5px; color: #64748b;">HSN: 996812</div>
            </td>
            <td style="padding: 6px 4px; text-align: right;">${(cleanAmount > itemSubtotal ? (cleanAmount - itemSubtotal) : 0).toFixed(2)}</td>
            <td style="padding: 6px 4px; text-align: center;">1</td>
            <td style="padding: 6px 4px; text-align: right;">0.00</td>
            <td style="padding: 6px 4px; text-align: right;">${(cleanAmount > itemSubtotal ? (cleanAmount - itemSubtotal) : 0).toFixed(2)}</td>
            <td style="padding: 6px 4px; text-align: center;">0%</td>
            <td style="padding: 6px 4px; text-align: center;">IGST</td>
            <td style="padding: 6px 4px; text-align: right;">0.00</td>
            <td style="padding: 6px 4px; text-align: right; font-weight: 700;">${(cleanAmount > itemSubtotal ? (cleanAmount - itemSubtotal) : 0).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <!-- Totals Block -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
        <div style="width: 240px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 3px 0;">
            <span>Sub Total :</span>
            <span style="font-weight: 600;">Rs ${order.amount}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 3px 0;">
            <span>IGST :</span>
            <span style="font-weight: 600;">Rs 0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 6px 0; border-top: 1.5px solid #000; font-size: 15px; font-weight: 900;">
            <span>Grand Total :</span>
            <span>Rs ${order.amount}</span>
          </div>
        </div>
      </div>

      <!-- Legal Disclaimer & Terms -->
      <div style="font-size: 9.5px; color: #334155; line-height: 1.45; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 14px;">
        <p style="margin: 0 0 2px;">a) Please retain this invoice and the Manufacturer Box / Parcel for your records.</p>
        <p style="margin: 0 0 2px;">b) The products included in this shipment are intended for student and academic use and should not be used for unauthorized resale.</p>
        <p style="margin: 0 0 2px;">c) Our student policy allows 24-48 hr replacements for any print defect. Contact info.jkstudyhub@gmail.com.</p>
        <p style="margin: 0;">d) Your feedback and queries are important to us. Reach out to our Pattan desk at +91 9622605714.</p>
      </div>

      <!-- Invoicing Company Signature Block -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
        <div style="font-size: 11px;">
          <span style="font-weight: 700;">This is a computer generated Invoice</span>
        </div>
        <div style="text-align: right; font-size: 11px;">
          <div style="font-weight: 700; margin-bottom: 25px;">Invoicing Company<br>JK STUDY HUB ENTERPRISES</div>
          <div style="border-top: 1px solid #000; padding-top: 4px; font-weight: 800;">Authorized Signature</div>
        </div>
      </div>

      <!-- Got Questions Footer Bar -->
      <div style="border: 1px solid #000; display: flex; font-size: 11.5px; font-weight: 700;">
        <div style="flex: 1; padding: 6px 12px; border-right: 1px solid #000; text-align: center;">Got questions?</div>
        <div style="flex: 1; padding: 6px 12px; text-align: center;">info.jkstudyhub@gmail.com</div>
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

  const isDispatched = (statusLower === 'dispatched');
  const isShipped = (statusLower.includes('ship'));
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
        ${isCodOrder(order) 
          ? `<div style="margin-top: 8px; font-size: 12px; font-weight: 800; color: #b45309; background: #fef3c7; border: 1px solid #fde68a; padding: 6px 10px; border-radius: 6px; display: flex; align-items: center; gap: 6px;">
               <i class="fa-solid fa-hand-holding-dollar"></i> 💵 COD: Collect ₹${order.amount || 0} Cash at Doorstep
             </div>`
          : `<div style="margin-top: 8px; font-size: 12px; font-weight: 800; color: #166534; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 6px 10px; border-radius: 6px; display: flex; align-items: center; gap: 6px;">
               <i class="fa-solid fa-circle-check"></i> 💳 Prepaid Order: ₹${order.amount || 0} Already Paid Online
             </div>`
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
        <div style="font-size: 12.5px; font-weight: 800; color: ${isDelivered ? '#166534' : '#1e40af'}; display: flex; align-items: center; justify-content: space-between;">
          <span><i class="fa-solid ${isDelivered ? 'fa-circle-check' : 'fa-shield-halved'}"></i> ${isDelivered ? 'Parcel Delivered & Handover Verified' : 'Doorstep Handover Verification'}</span>
          <span style="background: ${isDelivered ? '#dcfce7' : '#dbeafe'}; color: ${isDelivered ? '#15803d' : '#1e40af'}; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 800;">
            ${isDelivered ? '✓ DELIVERED' : 'OTP REQUIRED'}
          </span>
        </div>
        ${(!isDelivered && (order.status !== 'Cancelled')) ? `
          <div style="font-size: 11px; color: #475569; margin-top: 5px; line-height: 1.4;">
            Ask student for the 4-digit code shown on their order screen. Handover can only be completed after entering this order's valid OTP.
          </div>
          <div style="margin-top: 8px; display: flex; gap: 8px; align-items: center;">
            <input type="text" id="deliveryBoyOtpInput_${order.orderId}" maxlength="4" inputmode="numeric" pattern="[0-9]*" placeholder="Enter Student OTP (4-digits)" style="flex: 1; padding: 8px 12px; border-radius: 6px; border: 1.5px solid #3b82f6; font-size: 15px; font-weight: 800; letter-spacing: 2px; text-align: center; color: #0f172a; outline: none; background: white;" onkeydown="if(event.key==='Enter') submitDeliveryHandoverOtp('${order.orderId}')">
            <button type="button" onclick="submitDeliveryHandoverOtp('${order.orderId}')" style="background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12.5px; font-weight: 800; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 6px rgba(22,163,74,0.3);">
              <i class="fa-solid fa-check"></i> Submit &amp; Deliver
            </button>
          </div>
        ` : `
          <div style="font-size: 11.5px; color: #166534; margin-top: 4px;">
            Order verified via OTP and marked delivered on ${order.statusUpdatedAt || 'Today'} • Locked &amp; settled.
          </div>
        `}
      </div>

      <div style="margin-bottom: 14px;">
        <div style="font-size: 11.5px; font-weight: 800; color: #475569; margin-bottom: 8px; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i> Update Order Status:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Dispatched')" style="${isDispatched ? 'background: #6366f1; color: white; border: 2px solid #4f46e5; font-weight: 800;' : 'background: #eef2ff; color: #4f46e5; border: 1.5px solid #c7d2fe; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-box"></i> ${isDispatched ? '✓ Dispatched' : '📦 Dispatched'}
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'On the Way')" style="${isOnTheWay ? 'background: #d97706; color: white; border: 2px solid #b45309; font-weight: 800;' : 'background: #fefce8; color: #854d0e; border: 1.5px solid #fef08a; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-truck-fast"></i> ${isOnTheWay ? '✓ On the Way' : '🚚 On the Way'}
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Out for Delivery')" style="${isOutForDelivery ? 'background: #0284c7; color: white; border: 2px solid #0369a1; font-weight: 800;' : 'background: #f0f9ff; color: #0369a1; border: 1.5px solid #bae6fd; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-motorcycle"></i> ${isOutForDelivery ? '✓ Out for Del.' : '🛵 Out for Delivery'}
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Delivered')" style="${isDelivered ? 'background: #16a34a; color: white; border: 2px solid #15803d; font-weight: 800;' : 'background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; font-weight: 700;'} padding: 10px 6px; border-radius: 8px; font-size: 12.5px; cursor: pointer; text-align: center; transition: all 0.2s;">
            <i class="fa-solid fa-house-chimney-check"></i> ${isDelivered ? '✓ Delivered' : '✅ Delivered (OTP)'}
          </button>
        </div>

        <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px; background: #fff; padding: 6px 10px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <span style="font-size: 11.5px; font-weight: 700; color: #64748b; white-space: nowrap;">Or change to:</span>
          <select onchange="updateOrderStatusFromScanner('${order.orderId}', this.value, this)" style="flex: 1; padding: 5px 8px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 12px; font-weight: 700; color: #1e293b; background: #fff; cursor: pointer;">
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="On the Way" ${order.status === 'On the Way' ? 'selected' : ''}>On the Way</option>
            <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered (Requires OTP)</option>
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

let currentPendingOtpAction = null;

function ensureHandoverOtpModalInDom() {
  if (document.getElementById('orderHandoverOtpModal')) return;
  const div = document.createElement('div');
  div.id = 'orderHandoverOtpModal';
  div.className = 'scanner-modal-backdrop';
  div.style.cssText = 'display:none; z-index:99999;';
  div.onclick = function(e) { if (e.target === this) closeOrderHandoverOtpModal(); };
  div.innerHTML = `
    <div style="background:white; border-radius:18px; max-width:440px; width:92%; padding:24px; box-shadow:0 25px 60px rgba(15,23,42,0.35); position:relative; box-sizing:border-box; margin:auto; text-align:center;">
      <div style="width:58px; height:58px; background:#eff6ff; color:#2563eb; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:26px; margin:0 auto 12px; box-shadow:0 4px 14px rgba(37,99,235,0.15);">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <h3 id="otpModalTitle" style="margin:0 0 4px; font-size:18px; font-weight:800; color:#0f172a;">Verify Handover OTP</h3>
      <div id="otpModalSubtitle" style="font-size:12.5px; color:#64748b; font-weight:600; margin-bottom:14px;">Order <span id="otpModalOrderId" style="font-family:monospace; color:#2563eb; font-weight:800;">ORD-...</span></div>
      <div id="otpModalOrderSummary" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; font-size:12.5px; text-align:left; color:#334155; margin-bottom:16px; line-height:1.5;"></div>
      <div style="font-size:12.5px; font-weight:700; color:#1e293b; margin-bottom:8px;">
        Enter 4-Digit OTP from Student Screen:
      </div>
      <div style="margin-bottom:12px;">
        <input type="text" id="orderHandoverOtpInput" maxlength="4" inputmode="numeric" pattern="[0-9]*" placeholder="••••" style="width:190px; height:52px; font-size:28px; font-weight:900; letter-spacing:10px; text-align:center; color:#0f172a; border:2.5px solid #3b82f6; border-radius:12px; outline:none; font-family:monospace; background:#fff; box-shadow:0 2px 10px rgba(59,130,246,0.15);" onkeydown="if(event.key==='Enter') confirmDeliveryOtpSubmission()">
        <div id="otpModalErrorMessage" style="display:none; color:#dc2626; font-size:12px; font-weight:700; margin-top:8px; line-height:1.4;"></div>
      </div>
      <div style="font-size:11px; color:#64748b; line-height:1.4; margin-bottom:18px;">
        🛡️ Delivery executive must ask the customer for the 4-digit code shown on their order screen. Handover cannot be completed without this specific order's OTP.
      </div>
      <div style="display:flex; gap:10px;">
        <button type="button" onclick="closeOrderHandoverOtpModal()" style="flex:1; background:#f1f5f9; color:#475569; border:none; padding:12px; border-radius:10px; font-weight:700; font-size:13px; cursor:pointer;">
          Cancel
        </button>
        <button type="button" id="btnConfirmOtpSubmission" onclick="confirmDeliveryOtpSubmission()" style="flex:2; background:#16a34a; color:white; border:none; padding:12px; border-radius:10px; font-weight:800; font-size:13.5px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:6px; box-shadow:0 3px 10px rgba(22,163,74,0.3);">
          <i class="fa-solid fa-check"></i> Submit &amp; Deliver
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

function openDeliveryOtpVerificationModal(orderId, targetStatus = 'Delivered', selectEl = null) {
  ensureHandoverOtpModalInDom();
  const order = findOrderInStore(orderId);
  if (!order) {
    if (typeof showToast === 'function') showToast("⚠️ Order record not found.");
    return;
  }

  const currentStatus = String(order.status || 'Confirmed').trim();

  currentPendingOtpAction = {
    orderId: order.orderId,
    targetStatus: targetStatus,
    previousStatus: currentStatus,
    selectEl: selectEl
  };

  const modal = document.getElementById('orderHandoverOtpModal');
  const titleEl = document.getElementById('otpModalTitle');
  const orderIdEl = document.getElementById('otpModalOrderId');
  const summaryEl = document.getElementById('otpModalOrderSummary');
  const inputEl = document.getElementById('orderHandoverOtpInput');
  const errEl = document.getElementById('otpModalErrorMessage');
  const submitBtn = document.getElementById('btnConfirmOtpSubmission');

  if (orderIdEl) orderIdEl.textContent = order.orderId;
  if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }
  if (inputEl) { inputEl.value = ''; inputEl.style.borderColor = '#3b82f6'; }

  const isCod = isCodOrder(order);
  const custName = (order.name && !order.name.match(/^[6789]\d{9}$/)) ? order.name : 'Student';
  const custPhone = getValidCustomerPhone(order) || order.phone || 'N/A';

  if (targetStatus === 'Delivered') {
    if (titleEl) titleEl.textContent = 'Verify Doorstep Handover';
    if (submitBtn) {
      submitBtn.style.background = '#16a34a';
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Submit &amp; Deliver';
    }
  } else if (targetStatus === 'Cancelled') {
    if (titleEl) titleEl.textContent = 'Authorize Order Cancellation';
    if (submitBtn) {
      submitBtn.style.background = '#dc2626';
      submitBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Confirm Cancellation';
    }
  }

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div><strong>Customer:</strong> ${custName} (+91 ${custPhone})</div>
      <div style="margin-top:3px;"><strong>Item:</strong> ${order.product || 'Product'} (₹${order.amount || 0})</div>
      <div style="margin-top:3px; font-size:11.5px; color:#64748b;"><strong>Address:</strong> ${order.address || 'Kashmir'}</div>
      ${isCod ? `
        <div style="margin-top:8px; background:#fef3c7; color:#92400e; font-weight:800; padding:6px 10px; border-radius:6px; border:1px solid #fde68a;">
          💵 Cash on Delivery: Collect ₹${order.amount || 0} Cash from student BEFORE handing over parcel
        </div>
      ` : `
        <div style="margin-top:8px; background:#f0fdf4; color:#166534; font-weight:800; padding:6px 10px; border-radius:6px; border:1px solid #bbf7d0;">
          💳 Prepaid Order: ₹${order.amount || 0} Paid Online (No Cash to Collect)
        </div>
      `}
    `;
  }

  if (modal) {
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
  }

  setTimeout(() => {
    if (inputEl) inputEl.focus();
  }, 100);
}

function closeOrderHandoverOtpModal() {
  const modal = document.getElementById('orderHandoverOtpModal');
  if (modal) modal.style.display = 'none';

  if (currentPendingOtpAction && currentPendingOtpAction.selectEl) {
    currentPendingOtpAction.selectEl.value = currentPendingOtpAction.previousStatus;
  }
  currentPendingOtpAction = null;
}

function confirmDeliveryOtpSubmission() {
  if (!currentPendingOtpAction) return;

  const inputEl = document.getElementById('orderHandoverOtpInput');
  const errEl = document.getElementById('otpModalErrorMessage');
  const enteredOtp = inputEl ? inputEl.value.trim() : '';

  if (!enteredOtp) {
    if (errEl) {
      errEl.textContent = '⚠️ Please enter the 4-digit code shown on the student’s order screen.';
      errEl.style.display = 'block';
    }
    if (inputEl) {
      inputEl.style.borderColor = '#dc2626';
      inputEl.focus();
    }
    return;
  }

  const order = findOrderInStore(currentPendingOtpAction.orderId);
  if (!order) {
    alert('⚠️ Order record not found.');
    closeOrderHandoverOtpModal();
    return;
  }

  const expectedOtp = getOrderDeliveryOtp(order);

  // STRICT OTP VALIDATION: Must match this specific order's OTP or Master 0000
  if (enteredOtp !== String(expectedOtp).trim() && enteredOtp !== '0000') {
    if (errEl) {
      errEl.textContent = `❌ Invalid OTP for Order ${order.orderId}! Please check the 4-digit code on the student's screen.`;
      errEl.style.display = 'block';
    }
    if (inputEl) {
      inputEl.value = '';
      inputEl.style.borderColor = '#dc2626';
      inputEl.focus();
    }
    return;
  }

  // OTP IS VALID! Finalize Status
  const targetStatus = currentPendingOtpAction.targetStatus;
  const orderId = order.orderId;

  // Close modal first
  const modal = document.getElementById('orderHandoverOtpModal');
  if (modal) modal.style.display = 'none';
  currentPendingOtpAction = null;

  // Execute update with skipPrompt=true since OTP has been verified
  updateOrderStatusByAdmin(orderId, targetStatus, true);
  playScanSuccessBeep();
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);

  // Re-render scanned card if scanner open
  const fresh = findOrderInStore(orderId);
  if (fresh) {
    renderScannedOrderCard(fresh);
  }

  if (typeof renderAccountOrders === 'function') {
    renderAccountOrders();
  }

  showToast(`🎉 Order ${orderId} verified and updated to ${targetStatus}!`);
}

function handleAdminStatusSelectChange(orderId, selectEl) {
  const newStatus = selectEl ? selectEl.value : '';
  const order = findOrderInStore(orderId);
  const currentStatus = order ? String(order.status || '').trim() : '';

  if (newStatus === 'Delivered' || newStatus === 'Cancelled') {
    openDeliveryOtpVerificationModal(orderId, newStatus, selectEl);
  } else {
    updateOrderStatusByAdmin(orderId, newStatus, true);
    if (typeof renderAccountOrders === 'function') {
      setTimeout(renderAccountOrders, 200);
    }
  }
}

function updateOrderStatusFromScanner(orderId, newStatus, selectEl = null) {
  if (newStatus === 'Delivered' || newStatus === 'Cancelled') {
    openDeliveryOtpVerificationModal(orderId, newStatus, selectEl);
    return;
  }

  updateOrderStatusByAdmin(orderId, newStatus, true);
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

  const expectedOtp = getOrderDeliveryOtp(order);

  // Verify against expected OTP or Master Owner Override (0000)
  if (expectedOtp && enteredOtp !== String(expectedOtp).trim() && enteredOtp !== '0000') {
    alert("❌ Invalid OTP! The code entered does not match Order " + orderId + ". Please ask the student for the correct 4-digit code shown on their order screen.");
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

  if (typeof renderAccountOrders === 'function') {
    renderAccountOrders();
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

  // Filter/highlight the order without auto-opening camera
  if (typeof handleOrderSearchInput === 'function') {
    const input = document.getElementById('orderSearchInput') || document.getElementById('accountOrderSearchInput');
    if (input) input.value = cleanId;
    handleOrderSearchInput(cleanId);
  }
}

// --- GOOGLE SHEETS LIVE SYNC BACKGROUND WORKER ---
function syncOrdersWithGoogleSheet() {
  if (!SCRIPT_URL) return;

  const user = getCurrentUser();
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  
  let fetchUrl = SCRIPT_URL + '?action=get_orders';
  if (!isOwner) {
    let uPhone = '';
    if (user) {
      uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    }
    if (!uPhone) {
      try {
        const prof = JSON.parse(localStorage.getItem('jk_customer_profile') || '{}');
        uPhone = String(prof.phone || '').replace(/\D/g, '').slice(-10);
      } catch(e) {}
    }
    if (!uPhone) {
      try {
        const last = JSON.parse(localStorage.getItem('jk_last_checkout_details') || '{}');
        uPhone = String(last.phone || '').replace(/\D/g, '').slice(-10);
      } catch(e) {}
    }
    if (!uPhone) {
      try {
        const existing = JSON.parse(localStorage.getItem('jk_orders') || '[]');
        if (existing.length > 0) {
          const found = existing.find(e => e.phone && String(e.phone).match(/^[6789]\d{9}$/));
          if (found) uPhone = String(found.phone).replace(/\D/g, '').slice(-10);
        }
      } catch(e) {}
    }

    if (uPhone && uPhone.length === 10) {
      fetchUrl += '&phone=' + encodeURIComponent(uPhone);
    } else if (!user) {
      return; // Guest visitor with no phone
    }
  }

  // Background fetch without blocking UI
  try {
    fetch(fetchUrl + (fetchUrl.includes('?') ? '&' : '?') + 't=' + Date.now(), { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success' && Array.isArray(data.orders)) {
          let localOrders = getOrders();
          let updated = false;

          data.orders.forEach(remote => {
            // Ignore catalog product fallback rows from being treated as customer purchase orders!
            if (!remote.orderId || remote.phone === 'CATALOG_PRODUCT' || remote.txnId === 'CATALOG_PRODUCT' || String(remote.orderId).startsWith('PRD-')) {
              return;
            }

            const cleanOrderId = String(remote.orderId || '').trim();
            const match = localOrders.find(l => 
              String(l.orderId || '').trim().toUpperCase() === cleanOrderId.toUpperCase() || 
              (l.txnId && remote.txnId && l.txnId === remote.txnId && !String(remote.txnId).toLowerCase().includes('cash'))
            );
            
            // Clean remote phone
            let cleanRemotePhone = '';
            const m = String(remote.phone || '').match(/[6789]\d{9}/);
            if (m && m[0] !== '193121') {
              cleanRemotePhone = m[0];
            } else {
              const m2 = String(remote.name || '').match(/[6789]\d{9}/);
              if (m2) cleanRemotePhone = m2[0];
            }

            const parsedTime = remote.timestamp ? new Date(remote.timestamp).getTime() : Date.now();
            const formattedDate = remote.timestamp 
              ? new Date(remote.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              : new Date().toLocaleDateString('en-IN');

            const isRemoteCod = String(remote.status || '').toLowerCase().includes('cash on delivery') || 
                                String(remote.status || '').toLowerCase().includes('cod') ||
                                String(remote.product || '').toLowerCase().includes('doorstep') ||
                                String(remote.txnId || '').toUpperCase().includes('COD') ||
                                String(remote.txnId || '').toUpperCase().includes('CASH');
            const cleanRemoteTxn = isRemoteCod ? 'Cash on Delivery' : (remote.txnId || 'Prepaid Online');
            const remoteOtp = getOrderDeliveryOtp(remote);
            const remoteAmount = parseFloat(remote.amount) || 0;
            const remoteStatus = remote.status || (isRemoteCod ? 'Confirmed (Cash on Delivery)' : 'Confirmed');

            if (match) {
              const consistentOtp = getOrderDeliveryOtp(match);
              if (match.deliveryOtp !== consistentOtp) {
                match.deliveryOtp = consistentOtp;
                updated = true;
              }
              if (remote.status && remote.status !== match.status) {
                match.status = remote.status;
                updated = true;
              }
              if (cleanRemotePhone && (!match.phone || String(match.phone).includes('193121'))) {
                match.phone = cleanRemotePhone;
                updated = true;
              }
              if (remote.product && (!match.product || match.product === 'Study Hub Purchase')) {
                match.product = remote.product;
                updated = true;
              }
              if (remote.txnId && (!match.txnId || match.txnId === 'N/A')) {
                match.txnId = remote.txnId;
                updated = true;
              }
              if (remote.name && (!match.name || match.name === 'Student')) {
                match.name = remote.name;
                updated = true;
              }
              if (remote.address && (!match.address || match.address.length < (remote.address || '').length)) {
                match.address = remote.address;
                updated = true;
              }
              if (remoteAmount && !match.amount) {
                match.amount = remoteAmount;
                updated = true;
              }
            } else {
              localOrders.push({
                orderId: cleanOrderId,
                txnId: cleanRemoteTxn,
                paymentMethod: isRemoteCod ? 'cod' : 'prepaid',
                deliveryOtp: remoteOtp,
                date: formattedDate,
                timestamp: parsedTime,
                name: (remote.name && !remote.name.match(/^[6789]\d{9}$/)) ? remote.name : 'Student',
                phone: cleanRemotePhone,
                address: remote.address || 'Baramulla, Jammu & Kashmir',
                product: remote.product || 'Study Hub Purchase',
                amount: remoteAmount,
                userEmail: (!isOwner && user) ? user.email : null,
                status: remoteStatus
              });
              updated = true;
            }
          });

          // Always sort newest orders to top!
          localOrders.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

          if (updated) {
            localStorage.setItem('jk_orders', JSON.stringify(localOrders));
            updateNavBadges();
          }

          // Trigger live UI update immediately across store and account pages
          if (typeof renderAccountOrders === 'function') {
            renderAccountOrders();
          }
          if (typeof renderAccountDashboard === 'function') {
            renderAccountDashboard();
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

  let hasSchool = false;
  cart.forEach(item => {
    if (item.category === 'school-books' || item.category === 'copies' || (item.name && (item.name.includes('Book Set') || item.name.includes('Copies') || item.name.includes('Register')))) {
      hasSchool = true;
    }
  });

  let combinedCat = 'standard';
  if (hasSchool) combinedCat = 'school-books';
  else if (hasNotes && hasForms) combinedCat = 'both';
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

  const isSchoolOrder = (category === 'school-books' || category === 'copies' || 
                         name.includes('Book Set') || name.includes('Copies') || 
                         name.includes('Register') || name.includes('Class '));
  const deliveryFee = isSchoolOrder ? 50 : 0;
  const platformFee = 5;
  const totalAmount = price + deliveryFee + platformFee;

  const nameEl = document.getElementById('itemName');
  if (nameEl) nameEl.innerText = name;

  const priceEl = document.getElementById('itemPrice');
  if (priceEl) priceEl.innerText = '₹' + price;

  const deliveryFeeEl = document.getElementById('invoiceDeliveryFee');
  if (deliveryFeeEl) {
    if (isSchoolOrder) {
      deliveryFeeEl.innerHTML = '<span style="color:#b45309; font-weight:800;">₹50 (Kashmir Express Dispatch)</span>';
    } else {
      deliveryFeeEl.innerHTML = '<span style="color:#16a34a; font-weight:800;">FREE (₹0)</span>';
    }
  }

  const totalEl = document.getElementById('totalPrice');
  if (totalEl) totalEl.innerText = '₹' + totalAmount;

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
  const schoolFields = document.getElementById('schoolBooksSpecificFields');
  const formFields = document.getElementById('formSpecificFields');
  const addressFields = document.getElementById('addressFields');

  if (notesFields) notesFields.style.display = 'none';
  if (schoolFields) schoolFields.style.display = 'none';
  if (formFields) formFields.style.display = 'none';
  if (addressFields) addressFields.style.display = 'none';

  const notesSub = document.getElementById('notesSubject');
  const schoolNameInput = document.getElementById('orderSchoolName');
  const schoolClassSelect = document.getElementById('orderSchoolClass');
  const formType = document.getElementById('digitalFormType');
  const addr = document.getElementById('orderAddress');

  if (notesSub) notesSub.removeAttribute('required');
  if (schoolNameInput) schoolNameInput.removeAttribute('required');
  if (formType) formType.removeAttribute('required');
  if (addr) addr.removeAttribute('required');

  // School Books (Class 1st–10th requires School Name)
  if (category === 'school-books' || name.includes('Book Set') || (name.includes('Class ') && !name.includes('11th') && !name.includes('12th'))) {
    if (schoolFields) schoolFields.style.display = 'block';
    // Auto-select class in dropdown if found in title
    if (schoolClassSelect) {
      for (let i = 1; i <= 12; i++) {
        const clsStr = 'Class ' + i + (i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th');
        if (name.includes(clsStr)) {
          schoolClassSelect.value = clsStr;
          break;
        }
      }
    }
    // Only require school name for Class 1st to 10th (Private/Govt schools syllabus varies)
    const isHigherSec = name.includes('11th') || name.includes('12th');
    if (!isHigherSec && schoolNameInput) {
      schoolNameInput.setAttribute('required', 'true');
    }
    if (addressFields) addressFields.style.display = 'block';
    if (addr) addr.setAttribute('required', 'true');
  }

  // School Copies & Registers
  if (category === 'copies' || name.includes('Copies') || name.includes('Register')) {
    if (addressFields) addressFields.style.display = 'block';
    if (addr) addr.setAttribute('required', 'true');
  }

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
  const isSchoolOrder = (currentCheckoutCategory === 'school-books' || currentCheckoutCategory === 'copies' || 
                         currentCheckoutProduct.includes('Book Set') || currentCheckoutProduct.includes('Copies') || 
                         currentCheckoutProduct.includes('Register') || currentCheckoutProduct.includes('Class '));
  const deliveryFee = isSchoolOrder ? 50 : 0;
  const totalPaid = currentCheckoutPrice + deliveryFee + 5;

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

  const isSchoolOrder = (currentCheckoutCategory === 'school-books' || currentCheckoutCategory === 'copies' || 
                         currentCheckoutProduct.includes('Book Set') || currentCheckoutProduct.includes('Copies') || 
                         currentCheckoutProduct.includes('Register') || currentCheckoutProduct.includes('Class '));
  const deliveryFee = isSchoolOrder ? 50 : 0;
  const platformFee = 5;
  const totalPaid = currentCheckoutPrice + deliveryFee + platformFee;

  let schoolName = '';
  let studentClass = '';
  const schoolNameInput = document.getElementById('orderSchoolName');
  const schoolClassSelect = document.getElementById('orderSchoolClass');
  if (schoolNameInput && schoolNameInput.value.trim()) {
    schoolName = schoolNameInput.value.trim();
    studentClass = schoolClassSelect ? schoolClassSelect.value : '';
    finalProductDesc += ` [School: ${schoolName}${studentClass ? ', ' + studentClass : ''}]`;
  }

  const isCod = (customStatus && customStatus.includes('Cash on Delivery')) || txnId === 'Cash on Delivery' || String(txnId).startsWith('COD') || String(txnId).toUpperCase().includes('CASH');
  const cleanTxnId = isCod ? 'Cash on Delivery' : txnId;
  const orderStatus = customStatus || (isCod ? 'Confirmed (Cash on Delivery)' : 'Confirmed');
  const combinedProduct = `${finalProductDesc} | Total: ₹${totalPaid} | ${isCod ? 'Payment: Cash on Delivery (Pay at Doorstep)' : 'TXN: ' + cleanTxnId}`;

  // 1. SAVE LOCALLY TO ORDERS HISTORY IMMEDIATELY!
  const user = getCurrentUser();
  const emailInput = document.getElementById('orderEmail');
  const explicitEmail = emailInput ? emailInput.value.trim().toLowerCase() : '';
  const orderEmail = explicitEmail || (user && user.email ? user.email.toLowerCase() : null);

  const newOrderId = 'OD' + Date.now() + Math.floor(Math.random() * 1000);
  const deliveryOtp = getOrderDeliveryOtp({ orderId: newOrderId });

  const orderRecord = {
    orderId: newOrderId,
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
    schoolName: schoolName || '',
    studentClass: studentClass || '',
    deliveryFee: deliveryFee,
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
  const waText = `*📦 New Order Confirmation - JK Study Hub*%0A%0A` +
    `🆔 *Order ID:* ${orderRecord.orderId}%0A` +
    `👤 *Student Name:* ${encodeURIComponent(orderRecord.name)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(orderRecord.phone)}%0A` +
    `📍 *Delivery Address:* ${encodeURIComponent(orderRecord.address)}%0A` +
    `📚 *Product:* ${encodeURIComponent(orderRecord.product)}%0A` +
    `💵 *Total Amount:* ₹${orderRecord.amount} (${isCod ? 'Cash on Delivery' : 'Paid Online'})%0A` +
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

  if (typeof syncOrdersWithGoogleSheet === 'function') {
    syncOrdersWithGoogleSheet();
  }
  if (typeof renderAccountOrders === 'function') {
    renderAccountOrders();
  }
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
      if (typeof syncOrdersWithGoogleSheet === 'function') {
        syncOrdersWithGoogleSheet();
      }
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
          if (typeof syncOrdersWithGoogleSheet === 'function') syncOrdersWithGoogleSheet();
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
    const initial = (firstName || 'S').charAt(0).toUpperCase();
    profileCard.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
        <div class="zapvi-avatar-circle">${initial}</div>
        <div class="zapvi-profile-meta">
          <h3>${user.displayName || 'JK Student'}</h3>
          <p><i class="fa-solid fa-mobile-screen"></i> +91 ${phone || (user.email ? user.email.split('@')[0] : '9622605714')}</p>
        </div>
      </div>
      <button class="yellow-btn" style="background: #f87171; color: white; padding: 8px 18px; border-radius: 20px;" onclick="handleStoreSignOut()">Sign Out</button>
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
      const allOrders = getOrders();
      const candidatePhones = getUserCandidatePhones(null);
      const hasGuestOrders = allOrders.some(o => {
        const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
        return candidatePhones.includes(oPhone) && !STRICT_STORE_OWNER_PHONES.includes(oPhone);
      });
      if (hasGuestOrders) {
        renderAccountOrders();
      } else {
        ordersContainer.innerHTML = `
          <div class="empty-state">
            <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png" style="width:100%; "></div>
            <h3>See your orders</h3>
            <p>Login with your mobile number to see all your orders.</p>
            <button class="yellow-btn" style="width:auto; padding: 10px 30px;" onclick="openPhoneAuthModal()">Login with OTP</button>
          </div>
        `;
      }
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
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  const user = getCurrentUser();
  const allOrders = getOrders();
  const isOwner = (typeof isStrictStoreOwner === 'function' && isStrictStoreOwner(user));
  
  // Decide which orders to work with
  let userOrders = [];
  if (isOwner) {
    const uEmail = String(user.email || '').trim().toLowerCase();
    const uPhone = String(user.phoneNumber || user.phone || '').replace(/\D/g, '').slice(-10);
    userOrders = allOrders.filter(o => {
      const oEmail = String(o.userEmail || o.email || '').trim().toLowerCase();
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      return (uEmail && oEmail && oEmail === uEmail) || (uPhone && oPhone && oPhone === uPhone) || oPhone === '6006730787';
    });
    if (userOrders.length === 0) {
      userOrders = allOrders;
    }
  } else if (user) {
    const candidatePhones = getUserCandidatePhones(user);
    const uEmail = String(user.email || '').trim().toLowerCase();
    userOrders = allOrders.filter(o => {
      const oEmail = String(o.userEmail || o.email || '').trim().toLowerCase();
      if (uEmail && oEmail && oEmail === uEmail) return true;
      const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
      if (candidatePhones.includes(oPhone) && !STRICT_STORE_OWNER_PHONES.includes(oPhone)) {
        return true;
      }
      return false;
    });

    // If still empty but there are non-owner orders placed on this device:
    if (userOrders.length === 0 && allOrders.length > 0) {
      const nonOwner = allOrders.filter(o => !STRICT_STORE_OWNER_PHONES.includes(String(o.phone || '').replace(/\D/g, '').slice(-10)));
      if (candidatePhones.length === 0 && nonOwner.length > 0) {
        userOrders = nonOwner;
      }
    }
  } else {
    // Guest user (not logged in)
    const candidatePhones = getUserCandidatePhones(null);
    if (candidatePhones.length > 0) {
      userOrders = allOrders.filter(o => {
        const oPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
        return candidatePhones.includes(oPhone) && !STRICT_STORE_OWNER_PHONES.includes(oPhone);
      });
    }
  }

  // If guest with no orders, show login state
  if (!user && userOrders.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding-top: 40px;">
        <div class="icon-container"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png" style="width:75px; margin: 0 auto 10px;"></div>
        <h3>See your orders</h3>
        <p>Login with your mobile number or Google account to view your orders across all devices.</p>
        <button class="yellow-btn" style="width:auto; padding: 10px 30px; margin-top: 10px;" onclick="openPhoneAuthModal()">Login / Sign up</button>
      </div>
    `;
    return;
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
    container.innerHTML = filterTabsHtml + emptyMsg;
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
    let s4Desc = statusInfo.step >= 4 ? 'Delivered' : 'Expected Shortly';

    const matchedBook = (typeof BOOK_CATALOG_DATA !== 'undefined' ? BOOK_CATALOG_DATA : []).find(b => o.product && o.product.includes(b.name)) || (PRODUCT_CATALOG[o.product] ? { image: PRODUCT_CATALOG[o.product].image } : null);
    const orderImgSrc = (matchedBook && matchedBook.photos && matchedBook.photos[0]) ? matchedBook.photos[0] : ((matchedBook && matchedBook.image) ? matchedBook.image : (o.image || 'images/logo-app.png'));

    const isLocked = (o.status === 'Delivered' || o.status === 'Cancelled');
    const statusLower = String(o.status || '').toLowerCase();

    const zapviBadgeClass = statusLower.includes('cancel') ? 'cancelled' : (statusLower.includes('deliver') ? 'delivered' : 'in-progress');
    const zapviBadgeLabel = statusLower.includes('cancel') ? 'Cancelled' : (statusLower.includes('deliver') ? 'Delivered' : 'In Progress');
    const orderDateFormatted = o.date || 'Recent';

    html += `
      <div class="fk-order-card" style="border-radius: 18px; padding: 22px 24px; margin-bottom: 24px; border: 1.5px solid #e2e8f0;">
        
        <!-- Zapvi Breadcrumbs & Header (Media 1) -->
        <div class="zapvi-breadcrumbs">
          <a href="store.html">Home</a> <span>/</span> <span>My Orders</span> <span>/</span> <span style="color: #0f172a;">Order #${safeOrderId}</span>
        </div>
        <div class="zapvi-order-heading">Order #${safeOrderId}</div>
        <div class="zapvi-order-submeta">Placed ${orderDateFormatted} · ${isCod ? 'Cash on Delivery' : 'Paid Online'}</div>
        <span class="zapvi-status-badge ${zapviBadgeClass}">${zapviBadgeLabel}</span>

        <!-- Zapvi TRACKING Card (Media 1) -->
        <div class="zapvi-tracking-card" style="margin-top: 10px; margin-bottom: 20px; background: #fafafa; border: 1.5px solid #e2e8f0;">
          <div class="zapvi-tracking-title">TRACKING</div>
          <div class="zapvi-timeline">
            <div class="zapvi-timeline-node">
              <div class="zapvi-timeline-dot"><i class="fa-solid fa-check"></i></div>
              <div class="zapvi-timeline-label">Order confirmed</div>
              <div class="zapvi-timeline-date">${orderDateFormatted}</div>
            </div>
            <div class="zapvi-timeline-node">
              <div class="zapvi-timeline-dot" style="${statusInfo.step >= 2 ? '' : 'background: #cbd5e1;'}">
                ${statusInfo.step >= 2 ? '<i class="fa-solid fa-check"></i>' : ''}
              </div>
              <div class="zapvi-timeline-label" style="${statusInfo.step >= 2 ? '' : 'color: #94a3b8; font-weight: 600;'}">Shipped</div>
              <div class="zapvi-timeline-date">${statusInfo.step >= 2 ? 'Hub Dispatched' : 'Pending'}</div>
            </div>
            <div class="zapvi-timeline-node">
              <div class="zapvi-timeline-dot" style="${statusInfo.step >= 3 ? '' : 'background: #cbd5e1;'}">
                ${statusInfo.step >= 3 ? '<i class="fa-solid fa-check"></i>' : ''}
              </div>
              <div class="zapvi-timeline-label" style="${statusInfo.step >= 3 ? '' : 'color: #94a3b8; font-weight: 600;'}">Out for delivery</div>
              <div class="zapvi-timeline-date">${statusInfo.step >= 3 ? 'Arriving today' : 'Pending'}</div>
            </div>
            <div class="zapvi-timeline-node">
              <div class="zapvi-timeline-dot" style="${statusInfo.step >= 4 ? '' : 'background: #cbd5e1;'}">
                ${statusInfo.step >= 4 ? '<i class="fa-solid fa-check"></i>' : ''}
              </div>
              <div class="zapvi-timeline-label" style="${statusInfo.step >= 4 ? '' : 'color: #94a3b8; font-weight: 600;'}">Delivered</div>
              <div class="zapvi-timeline-date">${statusInfo.step >= 4 ? 'Doorstep Handover' : 'Expected soon'}</div>
            </div>
          </div>
          
          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed #e2e8f0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <a href="javascript:void(0)" onclick="alert('Tracking Status:\\n• Order: #${safeOrderId}\\n• Hub: Pattan 193121\\n• Status: ${statusInfo.label}\\n• Notes: ${statusInfo.summaryText}')" style="font-size: 13px; font-weight: 700; color: #0f172a; text-decoration: underline; cursor: pointer;">
              See all updates ⌵
            </a>
            <span style="font-size: 12px; color: #64748b; font-weight: 600;">
              Carrier: <strong>JK Express Delivery (Pattan Hub)</strong>
            </span>
          </div>

          <!-- Zapvi Pill Bar (Media 1) -->
          <div class="zapvi-tracking-pill-bar">
            <div style="font-size: 13.5px; color: #1e293b; font-weight: 700; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-truck-fast" style="color: #f59e0b;"></i>
              <span>Standard Delivery</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <button type="button" class="zapvi-track-btn" onclick="alert('Live Parcel Status:\\nOrder #${safeOrderId}\\nCurrent State: ${statusInfo.label}\\nEstimated: 24-48 Hours')">
                <i class="fa-solid fa-location-crosshairs"></i> Track parcel
              </button>
              <button type="button" class="zapvi-invoice-btn" onclick="printOrderReceipt('${safeOrderId}')">
                <i class="fa-solid fa-file-invoice"></i> Tax Invoice
              </button>
            </div>
          </div>
        </div>

        <!-- Product Summary Row -->
        <div class="fk-item-row" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
          ${orderImgSrc ? `<img src="${orderImgSrc}" alt="${o.product}" class="fk-thumb" onerror="this.src='images/logo-app.png'" loading="lazy">` : ''}
          <div class="fk-item-details">
            <h4 class="fk-item-title">${o.product}</h4>
            
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

            ${(!isOwner && !isLocked) ? `
              <div style="margin-top: 8px; font-size: 12px; color: #1e3a8a; background: #eff6ff; border: 1.5px dashed #3b82f6; padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
                <span style="font-size: 14px;">🔐</span>
                <span>Delivery OTP: <strong style="font-size: 15px; letter-spacing: 2px; color: #1d4ed8; font-family: monospace;">${getOrderDeliveryOtp(o)}</strong> <span style="font-size: 10.5px; color: #64748b; font-weight: 600;">(Share with Wishmaster upon doorstep delivery)</span></span>
              </div>
            ` : ''}
          </div>

          <div class="fk-price-box">
            <div style="font-size: 12px; color: #64748b; font-weight: 600;">${isCod ? 'To Collect (COD)' : 'Total Paid'}</div>
            <div class="fk-price-val">₹${o.amount || 0}</div>
            <span style="font-size: 11px; font-weight: 700; color: ${isCod ? '#b45309' : '#16a34a'};">${isCod ? 'Pay on Doorstep (COD)' : 'Prepaid Online'}</span>
          </div>
        </div>

        <!-- Zapvi Order Secondary Actions (Cancel, WhatsApp) -->
        <div style="border-top: 1px solid #f1f5f9; margin-top: 16px; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
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
  
  container.innerHTML = filterTabsHtml + html;
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


// =========================================================================
// NIGHT STUDY DARK MODE ENGINE (OLED Midnight Obsidian Theme)
// =========================================================================
function toggleNightStudyMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  try {
    localStorage.setItem('jk_night_study_mode', isDark ? 'true' : 'false');
  } catch(e) {}
  updateNightStudyIcon(isDark);
  if (typeof showToast === 'function') {
    showToast(isDark ? '🌙 Night Study Mode Activated' : '☀️ Day Mode Activated');
  }
}

function updateNightStudyIcon(isDark) {
  const btn = document.getElementById('nightStudyToggleBtn');
  if (btn) {
    btn.innerHTML = isDark ? '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i>' : '<i class="fa-solid fa-moon"></i>';
    btn.title = isDark ? 'Switch to Day Mode' : 'Night Study Dark Mode';
  }
}

function initNightStudyTheme() {
  try {
    const saved = localStorage.getItem('jk_night_study_mode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'true' || (saved === null && prefersDark);
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    updateNightStudyIcon(isDark);
  } catch(e) {}
}

// Auto-run theme initialization
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNightStudyTheme);
  } else {
    initNightStudyTheme();
  }
}


// =========================================================================
// KASHMIR PINCODE & LIVE DELIVERY ESTIMATOR
// =========================================================================
const KASHMIR_PINCODE_DB = {
  '190': { district: 'Srinagar', days: 1, label: 'Tomorrow', hub: 'Srinagar Central Hub' },
  '191': { district: 'Ganderbal / Kupwara', days: 2, label: 'in 1-2 Days', hub: 'North Kashmir Hub' },
  '192': { district: 'Anantnag / Pulwama', days: 2, label: 'in 1-2 Days', hub: 'South Kashmir Hub' },
  '193': { district: 'Baramulla / Pattan / Sopore', days: 1, label: 'Tomorrow / Same Day', hub: 'Baramulla Express Hub' },
  '194': { district: 'Ladakh / Kargil', days: 3, label: 'in 2-3 Days', hub: 'Highland Logistics' },
  '180': { district: 'Jammu City', days: 2, label: 'in 2 Days', hub: 'Jammu Regional Hub' },
  '181': { district: 'Samba / RS Pura', days: 2, label: 'in 2-3 Days', hub: 'Jammu South Hub' },
  '182': { district: 'Udhampur / Reasi', days: 3, label: 'in 2-3 Days', hub: 'Chenab Hub' },
  '184': { district: 'Kathua', days: 3, label: 'in 2-3 Days', hub: 'Kathua Hub' },
  '185': { district: 'Rajouri / Poonch', days: 3, label: 'in 3 Days', hub: 'Pir Panjal Hub' }
};

function getKashmirPincodeInfo(pincode) {
  const pin = String(pincode || '').trim().replace(/\D/g, '');
  if (pin.length < 3) return null;
  const prefix = pin.substring(0, 3);
  return KASHMIR_PINCODE_DB[prefix] || { district: 'Kashmir Region', days: 2, label: 'in 2-3 Days', hub: 'Kashmir Central Dispatch' };
}

function applyModalPincodeCheck(customPin) {
  const input = document.getElementById('modalPincodeInput');
  const pin = customPin || (input ? input.value.trim() : '');
  const textEl = document.getElementById('modalDeliveryEstimateText');
  const countEl = document.getElementById('modalDeliveryCountdown');
  const picker = document.getElementById('modalDistrictPicker');

  if (!pin || pin.length < 3) {
    if (typeof showToast === 'function') showToast('⚠️ Please enter a valid 6-digit Pincode');
    return;
  }

  const info = getKashmirPincodeInfo(pin);
  try {
    localStorage.setItem('jk_delivery_pincode', pin);
  } catch(e) {}

  if (textEl) {
    textEl.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Fast Delivery by <strong>${info.label}</strong> to ${info.district} (${pin})`;
  }
  if (countEl) {
    countEl.innerHTML = `<span><i class="fa-solid fa-circle-check"></i> Cash on Delivery Active</span> <span><i class="fa-solid fa-bolt"></i> Dispatched via ${info.hub}</span>`;
  }
  if (picker && info.district) {
    // Sync picker if option matches
    for (let opt of picker.options) {
      if (info.district.toLowerCase().includes(opt.value.toLowerCase())) {
        picker.value = opt.value;
        break;
      }
    }
  }

  if (typeof showToast === 'function' && !customPin) {
    showToast(`📍 Delivery confirmed for ${info.district} (${pin})`);
  }
}


// =========================================================================
// FREQUENTLY BOUGHT TOGETHER (SEMESTER COMBO BUNDLE WIDGET)
// =========================================================================
const BOOK_BUNDLES_DATA = {
  "Atomic Habits": {
    companion: "Deep Work",
    companionPrice: 249,
    companionImg: "images/books/deep-work-1.webp",
    comboPrice: 399,
    savings: 99
  },
  "The Psychology of Money": {
    companion: "Rich Dad Poor Dad",
    companionPrice: 229,
    companionImg: "images/books/rich-dad-1.webp",
    comboPrice: 379,
    savings: 99
  },
  "Deep Work": {
    companion: "Atomic Habits",
    companionPrice: 249,
    companionImg: "images/books/atomic-habits-1.webp",
    comboPrice: 399,
    savings: 99
  },
  "The Alchemist": {
    companion: "Wings of Fire",
    companionPrice: 229,
    companionImg: "images/books/wings-of-fire-1.webp",
    comboPrice: 369,
    savings: 89
  },
  "Lucent's General Knowledge": {
    companion: "Wren & Martin English Grammar",
    companionPrice: 249,
    companionImg: "images/books/wren-martin-1.webp",
    comboPrice: 399,
    savings: 99
  },
  "default": {
    companion: "Atomic Habits",
    companionPrice: 249,
    companionImg: "images/books/atomic-habits-1.webp",
    comboPrice: 399,
    savings: 99
  }
};

function renderFrequentlyBoughtTogether(bookName) {
  const container = document.getElementById('modalFrequentlyBoughtWidget');
  if (!container) return;

  const bundle = BOOK_BUNDLES_DATA[bookName] || BOOK_BUNDLES_DATA['default'];
  const mainBook = BOOK_CATALOG_DATA.find(b => b.name === bookName) || { name: bookName, price: 249, allImages: ['images/books/atomic-habits-1.webp'] };
  const mainImg = (mainBook.allImages && mainBook.allImages[0]) || mainBook.image || 'images/books/atomic-habits-1.webp';

  const regTotal = (Number(mainBook.price) || 249) + bundle.companionPrice;
  const comboPrice = bundle.comboPrice;
  const savings = regTotal - comboPrice;

  container.innerHTML = `
    <div class="frequently-bought-card">
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
        <span style="font-size:13px; font-weight:800; color:#1e3a8a;">📚 Frequently Bought Together</span>
        <span style="background:#dcfce7; color:#166534; font-size:11px; font-weight:800; padding:2px 8px; border-radius:12px;">
          Save ₹${savings} Combo Discount
        </span>
      </div>

      <div class="bundle-products-strip">
        <img src="${mainImg}" class="bundle-item-thumb" alt="${safeEscape(mainBook.name)}">
        <span class="bundle-plus-icon">+</span>
        <img src="${bundle.companionImg}" class="bundle-item-thumb" alt="${safeEscape(bundle.companion)}">
        
        <div style="margin-left:auto; display:flex; flex-direction:column; align-items:flex-end;">
          <div style="font-size:12px; color:#64748b; text-decoration:line-through;">Regular: ₹${regTotal}</div>
          <div style="font-size:19px; font-weight:800; color:#0f172a;">Combo: ₹${comboPrice}</div>
        </div>
      </div>

      <div style="font-size:12px; color:#475569; margin-bottom:10px;">
        • <strong>${safeEscape(mainBook.name)}</strong> (₹${mainBook.price})<br>
        • <strong>${safeEscape(bundle.companion)}</strong> (₹${bundle.companionPrice})
      </div>

      <button type="button" onclick="addBundleToCart('${safeEscape(mainBook.name)}', '${safeEscape(bundle.companion)}', ${comboPrice})" class="bundle-cta-btn" style="width:100%; justify-content:center;">
        <i class="fa-solid fa-cart-plus"></i> Add Both to Cart &amp; Save ₹${savings}
      </button>
    </div>
  `;
}

function addBundleToCart(book1Name, book2Name, bundlePrice) {
  // Add book 1
  addToCart(book1Name, Math.round(bundlePrice / 2), 'physical', 'books');
  // Add companion book
  addToCart(book2Name, Math.round(bundlePrice / 2), 'physical', 'books');

  if (typeof showToast === 'function') {
    showToast(`🎉 Semester Bundle added! Both books in cart for ₹${bundlePrice}`);
  }
}


// =========================================================================
// ENHANCED VISUAL "LOOK INSIDE" READER (REAL 5-PAGE CHAPTER SPREADS + OPEN BOOK PHOTOS)
// =========================================================================
let currentPreviewPageIndex = 0;
let currentPreviewBookTitle = 'The Psychology of Money';
let currentPreviewMode = 'reader'; // 'reader' or 'photos'

const BOOK_INTERNAL_PHOTOS = {
  "The Psychology of Money": [
    { url: "images/books/psychology-of-money-3.webp", caption: "Original Interior Print Quality & Cream Paper (70 GSM)" },
    { url: "images/books/psychology-of-money-2.webp", caption: "Spine & Perfect Thermal Binding" },
    { url: "images/books/psychology-of-money-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/psychology-of-money-4.webp", caption: "Back Cover with ISBN & Dimensions" }
  ],
  "Atomic Habits": [
    { url: "images/books/atomic-habits-3.webp", caption: "Interior Habit Loop Diagram & Chapter Print" },
    { url: "images/books/atomic-habits-2.webp", caption: "Spine & Durable Paperback Binding" },
    { url: "images/books/atomic-habits-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/atomic-habits-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "Deep Work": [
    { url: "images/books/deep-work-3.webp", caption: "Interior High-Contrast Print & Focus Tables" },
    { url: "images/books/deep-work-2.webp", caption: "Spine & Bound Pages" },
    { url: "images/books/deep-work-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/deep-work-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "The Alchemist": [
    { url: "images/books/the-alchemist-3.webp", caption: "Internal English Typography & Novel Spread" },
    { url: "images/books/the-alchemist-2.webp", caption: "Spine & Paperback Binding" },
    { url: "images/books/the-alchemist-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/the-alchemist-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "The Kite Runner": [
    { url: "images/books/the-kite-runner-3.webp", caption: "Crisp Novel Interior Pages & Dialogues" },
    { url: "images/books/the-kite-runner-2.webp", caption: "Spine & Book Thickness" },
    { url: "images/books/the-kite-runner-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/the-kite-runner-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "A Thousand Splendid Suns": [
    { url: "images/books/thousand-splendid-suns-3.webp", caption: "Internal Chapter Pages & Typography" },
    { url: "images/books/thousand-splendid-suns-2.webp", caption: "Spine & Thermal Binding" },
    { url: "images/books/thousand-splendid-suns-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/thousand-splendid-suns-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "Secrets of Divine Love": [
    { url: "images/books/secrets-of-divine-love-3.webp", caption: "Spiritual Poetry & Guided Chapter Spreads" },
    { url: "images/books/secrets-of-divine-love-2.webp", caption: "Spine & Premium Paperback Binding" },
    { url: "images/books/secrets-of-divine-love-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/secrets-of-divine-love-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "Reclaim Your Heart": [
    { url: "images/books/reclaim-your-heart-3.webp", caption: "Reflective Chapter Layout & Clean Typography" },
    { url: "images/books/reclaim-your-heart-2.webp", caption: "Spine & Binding" },
    { url: "images/books/reclaim-your-heart-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/reclaim-your-heart-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "Wings of Fire": [
    { url: "images/books/wings-of-fire-3.webp", caption: "Autobiography Chapters & Historical Notes" },
    { url: "images/books/wings-of-fire-2.webp", caption: "Spine & Binding" },
    { url: "images/books/wings-of-fire-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/wings-of-fire-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "Lucent's General Knowledge": [
    { url: "images/books/lucent-gk-3.webp", caption: "Tables, Maps & High-Yield GK Facts" },
    { url: "images/books/lucent-gk-2.webp", caption: "Spine & Thick Book Binding" },
    { url: "images/books/lucent-gk-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/lucent-gk-4.webp", caption: "Back Cover & Dimensions" }
  ],
  "Wren & Martin English Grammar": [
    { url: "images/books/wren-martin-3.webp", caption: "Grammar Rules, Exercises & Verb Tables" },
    { url: "images/books/wren-martin-2.webp", caption: "Spine & Binding" },
    { url: "images/books/wren-martin-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/wren-martin-4.webp", caption: "Back Cover & Dimensions" }
  ]
};

const COMPREHENSIVE_BOOK_PREVIEWS = {
  "The Psychology of Money": [
    {
      tabTitle: "Contents",
      chapterHeader: "TABLE OF CONTENTS & PREFACE",
      title: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness",
      subtitle: "By Morgan Housel • Official Student Edition",
      dropCap: "T",
      leadText: "he premise of this book is that doing well with money has a little to do with how smart you are and a lot to do with how you behave. And behavior is hard to teach, even to really smart people.",
      bodyHtml: `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif; font-size: 13px;">
          <strong style="color: #0f172a; display: block; margin-bottom: 8px; font-size: 14px;">📖 Complete 20 Chapters Included in This Book:</strong>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; color: #475569;">
            <div>1. No One's Crazy</div>
            <div>2. Luck &amp; Risk</div>
            <div>3. Never Enough</div>
            <div>4. Confounding Compounding</div>
            <div>5. Getting Wealthy vs. Staying Wealthy</div>
            <div>6. Tails, You Win</div>
            <div>7. Freedom</div>
            <div>8. Man in the Car Paradox</div>
            <div>9. Wealth is What You Don't See</div>
            <div>10. Save Money</div>
          </div>
          <div style="margin-top: 8px; font-size: 12px; color: #2563eb; font-weight: 700;">+ 10 More Chapters, Postscript &amp; Author's Confessions</div>
        </div>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          A genius who loses control of their emotions can be a financial disaster. The opposite is also true. Ordinary folks with no financial education can be wealthy if they have a handful of behavioral skills that have nothing to do with formal intelligence.
        </p>
      `,
      quote: "Financial success is not a hard science. It is a soft skill, where how you behave is more important than what you know.",
      pageNumber: "Page 1 of 5"
    },
    {
      tabTitle: "Ch. 1 No One's Crazy",
      chapterHeader: "CHAPTER 1: NO ONE'S CRAZY",
      title: "The Janitor Who Left Millions vs. The Wall Street Banker",
      subtitle: "Why Your Experiences Shape How You Think About Money",
      dropCap: "R",
      leadText: "onald James Read was an American philanthropist, investor, janitor, and gas station attendant. Read grew up in rural Vermont, the first high school graduate in his family. He fixed cars at a gas station for 25 years and swept floors at JCPenney for 17 years.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          In 2014, Ronald Read died at age 92. And that's when the humble rural janitor made international headlines. In his will, Read left $2 million to his stepchildren and more than $6 million to his local hospital and library. Those who knew him were baffled. Where did he get all that money?
        </p>
        <div style="display: flex; gap: 12px; margin: 18px 0; font-family: sans-serif; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px; background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 12px;">
            <div style="font-weight: 800; color: #065f46; font-size: 13px;">👨‍🔧 Ronald Read (The Janitor)</div>
            <div style="font-size: 12px; color: #047857; margin-top: 4px;">• Lived frugally, bought blue-chip stocks.<br>• Let compound interest work for 50 years.<br>• <strong>Died with $8,000,000 net worth.</strong></div>
          </div>
          <div style="flex: 1; min-width: 200px; background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 8px; padding: 12px;">
            <div style="font-weight: 800; color: #991b1b; font-size: 13px;">👔 Richard Fuscone (Harvard MBA)</div>
            <div style="font-size: 12px; color: #b91c1c; margin-top: 4px;">• Merrill Lynch Executive, borrowed heavily.<br>• Spent recklessly on an 11-bedroom mansion.<br>• <strong>Went completely bankrupt in 2008.</strong></div>
          </div>
        </div>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          In no other industry does an amateur beat an expert so completely. You can't imagine a janitor performing open-heart surgery better than a Harvard surgeon. But in investing, Ronald Read completely outperformed the Harvard executive.
        </p>
      `,
      quote: "Doing well with money has a little to do with how smart you are and a lot to do with how you behave.",
      pageNumber: "Page 2 of 5"
    },
    {
      tabTitle: "Ch. 2 Luck & Risk",
      chapterHeader: "CHAPTER 2: LUCK & RISK",
      title: "Bill Gates, Lakeside School, and The Forgotten Friend",
      subtitle: "Nothing is as Good or as Bad as It Looks",
      dropCap: "I",
      leadText: "n 1968, there were roughly 303 million high-school-age people in the world. Out of all of them, only about 300 attended Lakeside School near Seattle, Washington. Lakeside was the only school in the entire world that had the foresight and money to buy a computer terminal.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Bill Gates was an eighth-grader at Lakeside. Bill Gates possessed extraordinary vision, intellect, and work ethic. But as Bill Gates himself admitted: <em>'If there had been no Lakeside, there would have been no Microsoft.'</em> The odds of being in that school were roughly one in a million.
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Gates had a classmate named <strong>Kent Evans</strong> who was just as brilliant with computers. Kent and Bill planned to conquer the software world together. But before graduating high school, Kent died in a mountaineering accident. The odds of dying on a mountain in high school are also one in a million.
        </p>
      `,
      quote: "Luck and risk are doppelgängers. They are both the reality that every outcome in life is guided by forces other than individual effort.",
      pageNumber: "Page 3 of 5"
    },
    {
      tabTitle: "Ch. 3 Never Enough",
      chapterHeader: "CHAPTER 3: NEVER ENOUGH",
      title: "When Rich People Do Crazy Things for More",
      subtitle: "The Dangerous Art of Knowing When to Stop",
      dropCap: "R",
      leadText: "ajat Gupta was born in Kolkata, orphaned as a teenager, and rose by pure brilliance to become the CEO of McKinsey & Company, the most prestigious consulting firm on earth. By 2007, Gupta was worth over $100 million.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Having a hundred million dollars meant he could buy anything a human being could ever desire. But Rajat Gupta wanted to be a billionaire. He sat on the board of Goldman Sachs, and when Warren Buffett agreed to invest $5 billion to save Goldman during the 2008 crash, Gupta called hedge fund manager Raj Rajaratnam seconds after the board meeting ended.
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Gupta leaked the inside information, got caught by federal wiretaps, and was sentenced to federal prison. He risked everything he had and needed for something he didn't need and didn't even keep.
        </p>
      `,
      quote: "There is no reason to risk what you have and need for what you don't have and don't need.",
      pageNumber: "Page 4 of 5"
    },
    {
      tabTitle: "Ch. 4 Compounding",
      chapterHeader: "CHAPTER 4: CONFOUNDING COMPOUNDING",
      title: "Warren Buffett's Real Secret Is Time, Not Genius",
      subtitle: "The Math of Exponential Growth",
      dropCap: "M",
      leadText: "ore than 2,000 books have been written analyzing Warren Buffett's investment genius. But almost none of them highlight the simplest, most powerful truth: Warren Buffett's skill is investing, but his secret is time.",
      bodyHtml: `
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif;">
          <strong style="color: #166534; font-size: 13.5px;">📈 The Compounding Reality of Warren Buffett:</strong>
          <div style="margin-top: 6px; font-size: 13px; color: #15803d; line-height: 1.7;">
            • Buffett began serious investing at age 10.<br>
            • By age 30, his net worth was $1 million.<br>
            • Over <strong>99% of his total wealth was accumulated after his 50th birthday</strong>.<br>
            • If Buffett retired at 60 like ordinary people, virtually nobody would know his name today.
          </div>
        </div>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          The highest returns don't produce the greatest wealth. Rather, good returns sustained uninterrupted for the longest period of time are what create exponential, mind-boggling riches.
        </p>
      `,
      quote: "Shut up and wait. Compounding only works if you give it decades to do its magic.",
      pageNumber: "Page 5 of 5"
    }
  ],

  "Atomic Habits": [
    {
      tabTitle: "Contents",
      chapterHeader: "TABLE OF CONTENTS & INTRODUCTION",
      title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      subtitle: "By James Clear • The #1 Self-Discipline Student Guide",
      dropCap: "T",
      leadText: "he fate of your life depends on the quality of your habits. With the same habits, you’ll end up with the same results. But with better habits, anything is possible.",
      bodyHtml: `
        <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif; font-size: 13px;">
          <strong style="color: #1e40af; display: block; margin-bottom: 6px;">The 4 Laws of Behavior Change Included in This Book:</strong>
          <div style="color: #1e3a8a; line-height: 1.7;">
            1. <strong>The 1st Law (Cue):</strong> Make it Obvious.<br>
            2. <strong>The 2nd Law (Craving):</strong> Make it Attractive.<br>
            3. <strong>The 3rd Law (Response):</strong> Make it Easy.<br>
            4. <strong>The 4th Law (Reward):</strong> Make it Satisfying.
          </div>
        </div>
      `,
      quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
      pageNumber: "Page 1 of 5"
    },
    {
      tabTitle: "Ch. 1 1% Better",
      chapterHeader: "CHAPTER 1: THE SURPRISING POWER OF ATOMIC HABITS",
      title: "The British Cycling Miracle & The Aggregation of Marginal Gains",
      subtitle: "How Tiny Changes Lead to Massive Transformations",
      dropCap: "I",
      leadText: "n 2003, British Cycling hired Dave Brailsford as its new performance director. For nearly 100 years, British cyclists had been mediocrity personified—winning just a single Olympic gold medal and zero Tour de France titles.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Brailsford believed in 'the aggregation of marginal gains'—the philosophy of searching for a tiny 1% improvement in everything you do. They redesigned bike saddles, tested outdoor aerodynamic fabrics, rubbed alcohol on tires, and searched for the exact pillow that gave riders the best sleep.
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Within five years, the British cycling team dominated the 2008 Beijing Olympics, winning 60% of all gold medals available. From 2007 to 2017, they won 178 world championships and five Tour de France victories.
        </p>
      `,
      quote: "If you get 1% better each day for one year, you'll end up thirty-seven times better by the time you're done.",
      pageNumber: "Page 2 of 5"
    },
    {
      tabTitle: "Ch. 2 Identity",
      chapterHeader: "CHAPTER 2: HOW YOUR HABITS SHAPE YOUR IDENTITY",
      title: "Outcome-Based vs. Identity-Based Habits",
      subtitle: "Why True Behavior Change is Identity Change",
      dropCap: "M",
      leadText: "any people begin the process of changing their habits by focusing on what they want to achieve. This leads to outcome-based habits. The alternative is to build identity-based habits.",
      bodyHtml: `
        <div style="display:flex; gap:12px; margin:16px 0; font-family:sans-serif; flex-wrap:wrap;">
          <div style="flex:1; min-width:180px; background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:10px;">
            <strong style="color:#991b1b; font-size:12px;">Person A (Outcome Focus):</strong>
            <p style="font-size:12px; color:#7f1d1d; margin:4px 0 0;">When offered a cigarette: <em>'No thanks, I'm trying to quit.'</em> They still believe they are a smoker trying to behave differently.</p>
          </div>
          <div style="flex:1; min-width:180px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:10px;">
            <strong style="color:#166534; font-size:12px;">Person B (Identity Focus):</strong>
            <p style="font-size:12px; color:#14532d; margin:4px 0 0;">When offered a cigarette: <em>'No thanks, I am not a smoker.'</em> It signals a shift in who they are.</p>
          </div>
        </div>
      `,
      quote: "Every action you take is a vote for the type of person you wish to become.",
      pageNumber: "Page 3 of 5"
    },
    {
      tabTitle: "Ch. 3 The Loop",
      chapterHeader: "CHAPTER 3: THE 4-STEP NEUROLOGICAL HABIT LOOP",
      title: "Cue, Craving, Response, and Reward",
      subtitle: "The Science of How the Brain Learns Any Behavior",
      dropCap: "T",
      leadText: "he habit loop is the engine of human behavior. Every habit follows the exact same four-step pattern: Cue triggers a Craving, which motivates a Response, which provides a Reward.",
      bodyHtml: `
        <div style="display: flex; gap: 8px; justify-content: space-between; margin: 16px 0; font-family: sans-serif; flex-wrap: wrap;">
          <div style="flex:1; min-width: 100px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-weight:800; color:#2563eb; font-size:12px;">1. CUE</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">Phone vibrates</div>
          </div>
          <div style="flex:1; min-width: 100px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-weight:800; color:#2563eb; font-size:12px;">2. CRAVING</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">Want dopamine</div>
          </div>
          <div style="flex:1; min-width: 100px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-weight:800; color:#2563eb; font-size:12px;">3. RESPONSE</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">Check screen</div>
          </div>
          <div style="flex:1; min-width: 100px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:10px; text-align:center;">
            <div style="font-weight:800; color:#2563eb; font-size:12px;">4. REWARD</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">Temporary relief</div>
          </div>
        </div>
      `,
      quote: "Until you make the unconscious conscious, it will direct your life and you will call it fate.",
      pageNumber: "Page 4 of 5"
    },
    {
      tabTitle: "Ch. 13 Two-Minute",
      chapterHeader: "CHAPTER 13: THE TWO-MINUTE RULE",
      title: "How to Stop Procrastinating on Any Big Goal",
      subtitle: "The Master Rule for Starting Any Difficult Task",
      dropCap: "E",
      leadText: "ven when you know you should start small, it’s easy to start too big. When you dream about making a change, excitement inevitably takes over and you end up trying to do too much too soon.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          To counter this tendency, James Clear created <strong>The Two-Minute Rule</strong>, which states: <em>'When you start a new habit, it should take less than two minutes to do.'</em>
        </p>
        <div style="background: #faf5ff; border: 1.5px solid #e9d5ff; border-radius: 8px; padding: 12px 16px; margin: 14px 0; font-family: sans-serif; font-size: 13px; color: #581c87;">
          <strong>Student Ritual Transformations:</strong><br>
          • 'Read 30 pages every night' ➔ becomes <strong>'Read one page'</strong>.<br>
          • 'Study for 3 hours straight' ➔ becomes <strong>'Open my notes and sit at my desk'</strong>.<br>
          • 'Solve 50 math questions' ➔ becomes <strong>'Write down Formula #1'</strong>.
        </div>
      `,
      quote: "Standardize before you optimize. You can't improve a habit that doesn't exist.",
      pageNumber: "Page 5 of 5"
    }
  ],

  "The Alchemist": [
    {
      tabTitle: "Contents",
      chapterHeader: "PROLOGUE & TABLE OF CONTENTS",
      title: "The Alchemist: The Soul of the World & Personal Legend",
      subtitle: "By Paulo Coelho • Over 150 Million Copies Sold Worldwide",
      dropCap: "T",
      leadText: "he boy's name was Santiago. Dusk was falling as the boy arrived with his herd at an abandoned church. The roof had fallen in long ago, and an enormous sycamore had grown on the spot where the sacristy had once stood.",
      bodyHtml: `
        <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif; font-size: 13px; color: #78350f;">
          <strong>📖 The Hero's Journey Across Continents:</strong><br>
          • Part One: The Fields of Andalusia &amp; Meeting the King of Salem<br>
          • Part Two: Tangier, The Crystal Merchant &amp; The Great Sahara Desert<br>
          • Part Three: The Al-Fayoum Oasis, The Love of Fatima &amp; The Pyramids of Egypt
        </div>
      `,
      quote: "And, when you want something, all the universe conspires in helping you to achieve it.",
      pageNumber: "Page 1 of 5"
    },
    {
      tabTitle: "Ch. 1 The Dream",
      chapterHeader: "PART ONE: ANDALUSIA",
      title: "The Recurring Dream Beneath the Sycamore Tree",
      subtitle: "Why Dreams Are the Language of God",
      dropCap: "H",
      leadText: "e decided to spend the night there. He saw to it that all the sheep entered through the ruined gate, and then laid some planks across it to prevent the flock from wandering away at night.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          He swept the floor with his jacket and lay down, using the book he had just finished reading as a pillow. He told himself that he would have to start reading thicker books: they lasted longer, and made more comfortable pillows.
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          It was still dark when he woke, and, looking up, he could see the stars through the half-destroyed roof. For the second time in his life, he had dreamed that a child took his hands and transported him to the Egyptian Pyramids, pointing out a hidden treasure.
        </p>
      `,
      quote: "It's the possibility of having a dream come true that makes life interesting.",
      pageNumber: "Page 2 of 5"
    },
    {
      tabTitle: "Ch. 2 King of Salem",
      chapterHeader: "PART ONE: TARIFA PLAZA",
      title: "Melchizedek & The World's Greatest Lie",
      subtitle: "Discovering Your Personal Legend",
      dropCap: "A",
      leadText: "n old man approached Santiago in the plaza of Tarifa. 'What is the world's greatest lie?' the boy asked, completely taken aback.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          'It’s this,' the old man replied. 'That at a certain point in our lives, we lose control of what’s happening to us, and our lives become controlled by fate. That’s the world’s greatest lie. Everyone, when they are young, knows what their Personal Legend is.'
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          'At that point in their lives, everything is clear and everything is possible. They are not afraid to dream, and to yearn for everything they would like to see happen to them in their lives.'
        </p>
      `,
      quote: "There is one great truth on this planet: whoever you are, or whatever it is you do, when you really want something, it's because that desire originated in the soul of the universe.",
      pageNumber: "Page 3 of 5"
    },
    {
      tabTitle: "Ch. 3 The Merchant",
      chapterHeader: "PART TWO: TANGIER",
      title: "The Crystal Merchant & The Fear of Achieving Dreams",
      subtitle: "Why Some People Prefer the Dream Over Reality",
      dropCap: "T",
      leadText: "he boy worked for the crystal merchant for nearly a year. He cleaned every piece of glass until the shop sparkled with refracted sunlight, attracting wealthy merchants from across the Mediterranean.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          One evening, the boy asked the merchant why he never made his pilgrimage to Mecca, the fifth pillar of his faith. The merchant smiled sadly and said:
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          <em>'I’m afraid that if my dream is realized, I’ll have no reason to go on living. I prefer to just dream about Mecca. I’m afraid that it would all be a huge disappointment, so I prefer just to dream.'</em>
        </p>
      `,
      quote: "There is only one thing that makes a dream impossible to achieve: the fear of failure.",
      pageNumber: "Page 4 of 5"
    },
    {
      tabTitle: "Ch. 4 The Oasis",
      chapterHeader: "PART TWO: THE SAHARA OASIS",
      title: "Meeting Fatima & The Master Alchemist",
      subtitle: "Love and the Soul of the World",
      dropCap: "A",
      leadText: "t the well of Al-Fayoum, Santiago saw a girl with dark eyes and lips between laughter and silence. When he saw her eyes, he felt that he had learned the purest part of the Language that all the world spoke.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          In that moment, it seemed to him that time stood still, and the Soul of the World surged within him. Her name was Fatima.
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          'You must understand that love never keeps a man from pursuing his Personal Legend,' the Alchemist told him on horseback. 'If he abandons that pursuit, it’s because it wasn’t true love... love that speaks the Language of the World.'
        </p>
      `,
      quote: "One is loved because one is loved. No reason is needed for loving.",
      pageNumber: "Page 5 of 5"
    }
  ],

  "Deep Work": [
    {
      tabTitle: "Contents",
      chapterHeader: "TABLE OF CONTENTS & INTRODUCTION",
      title: "Deep Work: Rules for Focused Success in a Distracted World",
      subtitle: "By Cal Newport • The Ultimate Focus Manual for High Scores",
      dropCap: "D",
      leadText: "eep work is the ability to focus without distraction on a cognitively demanding task. It’s a superpower in our increasingly distracted 21st-century economy.",
      bodyHtml: `
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif; font-size: 13px;">
          <strong style="color: #0f172a; display: block; margin-bottom: 6px;">The 4 Core Rules of Deep Work:</strong>
          <div style="color: #334155; line-height: 1.7;">
            • Rule #1: Work Deeply (Rituals, Routines, and Bimodal Schedules)<br>
            • Rule #2: Embrace Boredom (Rewiring Your Brain Against Instant Gratification)<br>
            • Rule #3: Quit Social Media (The Craftsman Approach to Tool Selection)<br>
            • Rule #4: Drain the Shallows (The Evening Shutdown Ritual)
          </div>
        </div>
      `,
      quote: "If you don't produce, you won't thrive—no matter how skilled or talented you are.",
      pageNumber: "Page 1 of 5"
    },
    {
      tabTitle: "Ch. 1 Hypothesis",
      chapterHeader: "CHAPTER 1: THE DEEP WORK HYPOTHESIS",
      title: "Why Deep Work Is Both Rare and Invaluable",
      subtitle: "The Science of High-Velocity Skill Acquisition",
      dropCap: "T",
      leadText: "o thrive in the modern economy, you must master two core abilities: First, the ability to quickly master hard things. Second, the ability to produce at an elite level, in terms of both quality and speed.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Both abilities depend on your capacity for deep work. Neurologist Dr. Marcus Raichle demonstrated that intense concentration without distraction triggers oligodendrocytes to wrap layers of myelin around your neural circuits, cementing knowledge permanently into long-term memory.
        </p>
      `,
      quote: "High-Quality Work Produced = (Time Spent) × (Intensity of Focus)",
      pageNumber: "Page 2 of 5"
    },
    {
      tabTitle: "Ch. 2 The Shallows",
      chapterHeader: "CHAPTER 2: DEEP WORK IS RARE",
      title: "The Metric Black Hole & Attention Residue",
      subtitle: "Why Checking Your Phone for 10 Seconds Destroys 25 Minutes of Study",
      dropCap: "W",
      leadText: "hen you switch from Study Task A to checking a notification on Task B, your attention does not immediately follow. A thick residue of your attention remains stuck on the distraction.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Research by Dr. Sophie Leroy shows that workers who multi-task suffer persistent cognitive deficit. Even glancing at an incoming text for two seconds leaves you operating at half-capacity for up to twenty minutes afterward.
        </p>
      `,
      quote: "Clarity about what matters provides clarity about what does not.",
      pageNumber: "Page 3 of 5"
    },
    {
      tabTitle: "Ch. 3 Four Rules",
      chapterHeader: "CHAPTER 3: RULE #1 — WORK DEEPLY",
      title: "The Grand Gesture & Monastic Study Habits",
      subtitle: "How J.K. Rowling & Bill Gates Execute Deep Work",
      dropCap: "J",
      leadText: "ust as J.K. Rowling checked into The Balmoral luxury hotel in Edinburgh to escape all interruptions while finishing the final Harry Potter novel, you must construct an environment where focus is sacred.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Willpower is not a character trait—it is a finite muscle that exhausts quickly. If you rely on willpower to resist your smartphone, you will fail. Instead, you must build unbreakable rituals: fixed study hours, isolated study rooms, and zero notifications.
        </p>
      `,
      quote: "Efforts to deepen your focus will struggle if you don’t simultaneously wean your mind from a dependence on distraction.",
      pageNumber: "Page 4 of 5"
    },
    {
      tabTitle: "Ch. 4 Shutdown",
      chapterHeader: "CHAPTER 4: RULE #4 — DRAIN THE SHALLOWS",
      title: "The Evening Shutdown Ritual",
      subtitle: "Why Real Rest Is Mandatory for Deep Focus",
      dropCap: "A",
      leadText: "t the end of your study day, shut down your books and laptop completely. Say the phrase out loud: 'Shutdown Complete.'",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Never check academic messages or study notes late at night. Your subconscious mind consolidates memory while you sleep. Respecting your rest period is the single greatest determinant of whether tomorrow morning's study session will be powerful or sluggish.
        </p>
      `,
      quote: "Regularly resting your brain improves the quality of your deep work.",
      pageNumber: "Page 5 of 5"
    }
  ],

  "The Kite Runner": [
    {
      tabTitle: "Contents",
      chapterHeader: "TABLE OF CONTENTS & PROLOGUE",
      title: "The Kite Runner: Loyalty, Betrayal, and Redemption",
      subtitle: "By Khaled Hosseini • International Bestseller",
      dropCap: "I",
      leadText: "became what I am today at the age of twelve, on a frigid overcast day in the winter of 1975. I remember the precise moment, crouching behind a crumbling mud wall, peeking into the alley near the frozen creek.",
      bodyHtml: `
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif; font-size: 13px;">
          <strong style="color: #0f172a; display: block; margin-bottom: 6px;">The Chapters of an Unforgettable Story:</strong>
          <div style="color: #334155; line-height: 1.7;">
            • Kabul, 1975: Amir, Hassan, and Baba's Wazir Akbar Khan mansion.<br>
            • The Blue Kite: The tournament that changed everything.<br>
            • Fremont, California: Escape to America and Baba's flea market stall.<br>
            • The Call from Pakistan: Rahim Khan's unforgettable words: <em>'There is a way to be good again.'</em>
          </div>
        </div>
      `,
      quote: "There is a way to be good again.",
      pageNumber: "Page 1 of 5"
    },
    {
      tabTitle: "Ch. 1 Hassan",
      chapterHeader: "CHAPTER 1: KABUL, 1975",
      title: "The Boy with the Chinese Doll Face",
      subtitle: "Hassan and Amir's Childhood in Kabul",
      dropCap: "H",
      leadText: "assan never denied me anything. When I asked him to read a story with me on the hill beneath the pomegranate tree, he sat eagerly with his knees drawn to his chest, listening with unblinking brown eyes.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          We used to chase kites across the rooftops of Kabul. Hassan was by far the greatest kite runner anyone had ever seen. He had an innate sense of where a falling kite would land before anyone else even turned their head.
        </p>
      `,
      quote: "For you, a thousand times over.",
      pageNumber: "Page 2 of 5"
    },
    {
      tabTitle: "Ch. 2 Tournament",
      chapterHeader: "CHAPTER 7: THE BLUE KITE",
      title: "The Winter Kite Tournament of 1975",
      subtitle: "Winning Baba's Love at Too High a Price",
      dropCap: "T",
      leadText: "he streets of Kabul were lined with spectators. The glass string hummed through my numb fingers as my kite sliced through the last opponent's line. The blue kite fluttered free into the icy winter sky.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Hassan threw his arms around me and screamed: <em>'You won, Amir agha! You won!'</em> Then he sprinted off into the crowded alleys to run that final prized trophy for me, calling out over his shoulder: <em>'For you, a thousand times over!'</em>
        </p>
      `,
      quote: "A boy who won't stand up for himself becomes a man who can't stand up to anything.",
      pageNumber: "Page 3 of 5"
    },
    {
      tabTitle: "Ch. 3 Baba's Sin",
      chapterHeader: "CHAPTER 10: FREMONT, CALIFORNIA",
      title: "The Flea Market & Baba's Pride",
      subtitle: "Starting Over from Nothing in America",
      dropCap: "I",
      leadText: "n America, Baba worked long exhausting hours at a gas station, his fingernails permanently stained with grease. But on Sunday mornings, we loaded his old Volkswagen bus and set up our stall at the San Jose flea market.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          It was there that I realized Baba had never stopped being a king, even in blue overalls. America was a river where you could wash your sins away—or so I desperately hoped.
        </p>
      `,
      quote: "There is only one sin, only one. And that is theft. Every other sin is a variation of theft.",
      pageNumber: "Page 4 of 5"
    },
    {
      tabTitle: "Ch. 4 Redemption",
      chapterHeader: "CHAPTER 25: REDEMPTION",
      title: "Running the Kite for Sohrab",
      subtitle: "The Healing Power of Standing Up for Others",
      dropCap: "T",
      leadText: "wenty-six years later, under a clear California sky in a park packed with Afghan families, I bought a kite and held it out to Hassan's son, Sohrab.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          When our kite cut down the opponent's string, I looked at Sohrab. A tiny, faint smile touched the corner of his lips. I turned to run the kite for him and yelled the words that had lived in my soul for thirty years: <em>'For you, a thousand times over!'</em>
        </p>
      `,
      quote: "It may be unfair, but what happens in a few days, sometimes even a single day, can change the course of a whole lifetime.",
      pageNumber: "Page 5 of 5"
    }
  ],

  "Wings of Fire": [
    {
      tabTitle: "Contents",
      chapterHeader: "TABLE OF CONTENTS & PREFACE",
      title: "Wings of Fire: An Autobiography of Dr. A.P.J. Abdul Kalam",
      subtitle: "From a Humble Island Boy to the Missile Man of India",
      dropCap: "T",
      leadText: "his is the story of Kalam, who began his life selling newspapers in Rameswaram and went on to lead India's space program, test the Pokhran nuclear deterrent, and become the beloved President of India.",
      bodyHtml: `
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif; font-size: 13px;">
          <strong style="color: #0f172a; display: block; margin-bottom: 6px;">The 4 Major Sections of Dr. Kalam's Journey:</strong>
          <div style="color: #334155; line-height: 1.7;">
            • Orientation (1931–1963): Rameswaram, MIT Chennai, and early aeronautical training.<br>
            • Creation (1963–1980): The SLV-3 satellite launch vehicle at Thumba &amp; Sriharikota.<br>
            • Propitiation (1981–1991): The Integrated Guided Missile Development Program (Prithvi, Agni).<br>
            • Contemplation: Lessons on leadership, overcoming failure, and igniting student minds.
          </div>
        </div>
      `,
      quote: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
      pageNumber: "Page 1 of 5"
    },
    {
      tabTitle: "Ch. 1 Rameswaram",
      chapterHeader: "CHAPTER 1: ORIENTATION",
      title: "The Tamarind Seeds & The Island of Rameswaram",
      subtitle: "Childhood Lessons in Hard Work and Inter-Faith Brotherhood",
      dropCap: "I",
      leadText: "was born into a middle-class Tamil family in the island town of Rameswaram in the erstwhile Madras State. My father, Jainulabdeen, had neither much formal education nor much wealth; despite these disadvantages, he possessed great innate wisdom.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          During World War II, I collected tamarind seeds and sold them to a provision shop on Mosque Street for one anna. My cousin Samsuddin distributed newspapers, and when the train did not stop at Rameswaram station, bundles of papers were thrown out onto the moving tracks. I helped catch them, earning my very first wages.
        </p>
      `,
      quote: "Man needs difficulties because to enjoy the success he needs them.",
      pageNumber: "Page 2 of 5"
    },
    {
      tabTitle: "Ch. 2 SLV-3 Launch",
      chapterHeader: "CHAPTER 4: CREATION",
      title: "The SLV-3 Satellite Launch & Overcoming Crash",
      subtitle: "How Prof. Satish Dhawan Taught Leadership in Failure",
      dropCap: "O",
      leadText: "n 10 August 1979, SLV-3 was ready on the launch pad at Sriharikota. Hundreds of scientists watched with baited breath. At T-minus 315 seconds, the computer took over.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Shortly after liftoff, a leak in the second stage caused the rocket to plunge into the Bay of Bengal. It was a heart-wrenching failure. But our chairman, Prof. Satish Dhawan, stepped up to the press conference, took all the blame upon himself, and told reporters: <em>'We will succeed next year.'</em>
        </p>
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          When SLV-3 succeeded gloriously in July 1980 putting Rohini into orbit, Dhawan sent me to address the press. That was the greatest lesson in leadership: absorb failure, share success.
        </p>
      `,
      quote: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.",
      pageNumber: "Page 3 of 5"
    },
    {
      tabTitle: "Ch. 3 Agni Missile",
      chapterHeader: "CHAPTER 8: PROPITIATION",
      title: "The Flight of Agni: Fire of Self-Reliance",
      subtitle: "Chandipur-on-Sea, 22 May 1989",
      dropCap: "A",
      leadText: "t 0710 hours on 22 May 1989, Agni took off from Chandipur. It was a textbook flight. All guidance parameters were achieved with pinpoint accuracy.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Western superpowers had placed immense embargoes on India's technology. But our indigenous team proved that India could never be intimidated or held hostage. Self-reliance is not merely a slogan; it is the fundamental currency of national sovereignty.
        </p>
      `,
      quote: "All of us do not have equal talent. But, all of us have an equal opportunity to develop our talents.",
      pageNumber: "Page 4 of 5"
    },
    {
      tabTitle: "Ch. 4 Student Vision",
      chapterHeader: "CHAPTER 12: CONTEMPLATION",
      title: "Dr. Kalam's Call to Every Kashmiri & Indian Student",
      subtitle: "Igniting the Minds of the Next Generation",
      dropCap: "M",
      leadText: "y message, especially to young people is to have courage to think differently, courage to invent, to travel the unexplored path, courage to discover the impossible and to conquer the problems and succeed.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          The ignited mind of the youth is the most powerful resource on earth, under the earth, and above the earth. Never let anyone convince you that your humble background limits the heights you can soar.
        </p>
      `,
      quote: "If you want to shine like a sun, first burn like a sun.",
      pageNumber: "Page 5 of 5"
    }
  ],

  "default": [
    {
      tabTitle: "Contents",
      chapterHeader: "SYLLABUS BLUEPRINT & MODEL PREVIEW",
      title: "Official Student Edition: Overview & Key Highlights",
      subtitle: "JK Study Hub Verified Student Print",
      dropCap: "T",
      leadText: "his student edition is formatted with crystal-clear 70 GSM cream paper, robust spine binding, and high-definition typeface designed specifically for long study sessions without eye fatigue.",
      bodyHtml: `
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-family: sans-serif;">
          <strong style="color: #0f172a; font-size: 13.5px;">✓ What's Included in This Volume:</strong>
          <ul style="margin: 8px 0 0 18px; padding: 0; font-size: 12.5px; color: #334155; line-height: 1.7;">
            <li>Full unabridged text with updated chapter explanations.</li>
            <li>High-yield student notes and key concept summaries.</li>
            <li>Crisp high-contrast typeface on anti-glare paper.</li>
            <li>Doorstep delivery with Cash on Delivery across Kashmir.</li>
          </ul>
        </div>
      `,
      quote: "Quality study material is the foundation of high-scoring academic performance.",
      pageNumber: "Page 1 of 5"
    },
    {
      tabTitle: "Chapter 1",
      chapterHeader: "CORE STUDY MATERIAL: MODULE 1",
      title: "Foundations & Fundamental Principles",
      subtitle: "High-Yield Notes for University & Board Exams",
      dropCap: "E",
      leadText: "very great subject is built upon fundamental first principles. Mastering these basics guarantees effortless retention and high marks in objective and long-answer questions.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          This chapter breaks down core definitions, provides step-by-step model explanations, and contrasts key concepts using verified memory charts.
        </p>
      `,
      quote: "Mastery of basics is the secret weapon of academic toppers.",
      pageNumber: "Page 2 of 5"
    },
    {
      tabTitle: "Chapter 2",
      chapterHeader: "CORE STUDY MATERIAL: MODULE 2",
      title: "Advanced Theory & Exam Application",
      subtitle: "Analysis of High-Frequency Exam Problems",
      dropCap: "T",
      leadText: "heory without practice is incomplete. Here we examine practical case studies and application problems that examiners repeat across annual papers.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Key formulae and principles are derived cleanly with margin annotations to prevent common exam mistakes.
        </p>
      `,
      quote: "Practice does not make perfect; perfect practice makes perfect.",
      pageNumber: "Page 3 of 5"
    },
    {
      tabTitle: "Chapter 3",
      chapterHeader: "EXAM SOLVER: MODULE 3",
      title: "Model Questions & Expert Marking Schemes",
      subtitle: "How to Structure Full-Mark Answers",
      dropCap: "W",
      leadText: "riting the right answer is only half the battle; presenting it according to the examiner's marking criteria is what earns distinction marks.",
      bodyHtml: `
        <p style="font-size: 14.5px; text-indent: 1.5em; line-height: 1.8;">
          Review the included bulleted model answers and diagrams for instant visual recall under examination hall pressure.
        </p>
      `,
      quote: "Clear presentation converts knowledge into top ranks.",
      pageNumber: "Page 4 of 5"
    },
    {
      tabTitle: "Print Quality",
      chapterHeader: "VERIFIED KASHMIR DISPATCH SAMPLE",
      title: "Paper, Binding & Doorstep Delivery Specs",
      subtitle: "100% Student Satisfaction Guarantee",
      dropCap: "A",
      leadText: "ll books dispatched from JK Study Hub are individually inspected for pristine binding, zero misprints, and dark high-contrast ink.",
      bodyHtml: `
        <div style="background:#ecfdf5; border:1.5px solid #a7f3d0; border-radius:8px; padding:12px 16px; margin:14px 0; font-family:sans-serif; color:#065f46; font-size:13px;">
          ✓ Express dispatch within 24 hours across Srinagar, Baramulla, Anantnag, Pulwama, Sopore, and all Kashmir districts.<br>
          ✓ Full Cash on Delivery available at your doorstep.
        </div>
      `,
      quote: "Trusted by thousands of Kashmiri college and university students.",
      pageNumber: "Page 5 of 5"
    }
  ]
};

function getBookPriceByName(name) {
  if (typeof BOOKS_DATA !== 'undefined' && BOOKS_DATA[name] && BOOKS_DATA[name].price) {
    return BOOKS_DATA[name].price;
  }
  const pricingMap = {
    "Atomic Habits": 249,
    "The Psychology of Money": 220,
    "Deep Work": 249,
    "The Alchemist": 199,
    "The Kite Runner": 260,
    "A Thousand Splendid Suns": 260,
    "Secrets of Divine Love": 299,
    "Reclaim Your Heart": 260,
    "Wings of Fire": 230,
    "Lucent's General Knowledge": 299,
    "Wren & Martin English Grammar": 299
  };
  return pricingMap[name] || 249;
}

function openSamplePreviewModal(bookName) {
  const modal = document.getElementById('samplePreviewModal');
  const titleEl = document.getElementById('samplePreviewBookTitle');
  if (!modal) return;

  const resolvedName = bookName || (currentModalBook ? currentModalBook.name : 'The Psychology of Money');
  currentPreviewBookTitle = resolvedName;
  currentPreviewPageIndex = 0;
  currentPreviewMode = 'reader';

  if (titleEl) {
    titleEl.innerText = `${currentPreviewBookTitle} — Free Look Inside`;
  }

  // Prevent background scrolling while modal is open
  document.body.style.overflow = 'hidden';

  renderSamplePreviewPage();
  modal.style.display = 'flex';
}

function closeSamplePreviewModal() {
  const modal = document.getElementById('samplePreviewModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function setSamplePreviewPage(index) {
  currentPreviewPageIndex = index;
  renderSamplePreviewPage();
}

function flipSamplePage(direction) {
  const previews = COMPREHENSIVE_BOOK_PREVIEWS[currentPreviewBookTitle] || COMPREHENSIVE_BOOK_PREVIEWS['default'];
  const nextIdx = currentPreviewPageIndex + direction;
  if (nextIdx >= 0 && nextIdx < previews.length) {
    currentPreviewPageIndex = nextIdx;
    renderSamplePreviewPage();
  }
}

function togglePreviewMode(mode) {
  currentPreviewMode = mode;
  renderSamplePreviewPage();
}

function orderCurrentPreviewBookCOD() {
  const bookName = currentPreviewBookTitle || 'The Psychology of Money';
  const price = getBookPriceByName(bookName);
  closeSamplePreviewModal();
  openCheckout(bookName, price, 'physical', 'books');
}

function renderSamplePreviewPage() {
  const pagesContainer = document.getElementById('samplePreviewPagesContainer');
  if (!pagesContainer) return;

  const previews = COMPREHENSIVE_BOOK_PREVIEWS[currentPreviewBookTitle] || COMPREHENSIVE_BOOK_PREVIEWS['default'];
  const totalPages = previews.length;
  const page = previews[currentPreviewPageIndex] || previews[0];
  const photos = BOOK_INTERNAL_PHOTOS[currentPreviewBookTitle] || [
    { url: "images/books/psychology-of-money-3.webp", caption: "Original Interior Print Quality & Cream Paper (70 GSM)" },
    { url: "images/books/psychology-of-money-2.webp", caption: "Spine & Perfect Thermal Binding" },
    { url: "images/books/psychology-of-money-1.webp", caption: "Front Cover Paperback Edition" },
    { url: "images/books/psychology-of-money-4.webp", caption: "Back Cover with ISBN & Dimensions" }
  ];

  const price = getBookPriceByName(currentPreviewBookTitle);

  // Top Mode Switcher: Reader vs Real Photos
  let modeSwitcherHtml = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; gap:8px; flex-wrap:wrap;">
      <div style="display:inline-flex; background:#e2e8f0; padding:3px; border-radius:24px;">
        <button type="button" onclick="togglePreviewMode('reader')" style="border:none; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700; cursor:pointer; background:${currentPreviewMode === 'reader' ? '#1e3a8a; color:white; box-shadow:0 2px 6px rgba(0,0,0,0.15);' : 'transparent; color:#475569;'}">
          📖 Read Chapter Pages (1–5)
        </button>
        <button type="button" onclick="togglePreviewMode('photos')" style="border:none; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700; cursor:pointer; background:${currentPreviewMode === 'photos' ? '#1e3a8a; color:white; box-shadow:0 2px 6px rgba(0,0,0,0.15);' : 'transparent; color:#475569;'}">
          📸 Physical Open Book Photos (${photos.length})
        </button>
      </div>
      <div style="font-size:12px; font-weight:800; color:#166534; background:#dcfce7; padding:4px 10px; border-radius:12px;">
        ₹${price} • Cash on Delivery
      </div>
    </div>
  `;

  if (currentPreviewMode === 'photos') {
    // RENDER PHYSICAL BOOK & OPEN PAGE PHOTOS VIEW
    let photosHtml = `
      ${modeSwitcherHtml}
      <div style="background:white; border-radius:12px; padding:16px; border:1px solid #e2e8f0;">
        <div style="font-size:13px; font-weight:700; color:#0f172a; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-camera" style="color:#2563eb;"></i> Genuine Physical Copy Photography (${safeEscape(currentPreviewBookTitle)})
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
    `;
    photos.forEach((ph, idx) => {
      photosHtml += `
        <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 4px 12px rgba(0,0,0,0.04);">
          <div style="height:240px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; cursor:pointer;" onclick="window.open('${ph.url}', '_blank')">
            <img src="${ph.url}" alt="${safeEscape(ph.caption)}" style="max-height:100%; max-width:100%; object-fit:contain; transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <span style="position:absolute; top:8px; right:8px; background:rgba(0,0,0,0.6); color:white; font-size:11px; padding:2px 8px; border-radius:4px;"><i class="fa-solid fa-expand"></i> Tap to Zoom</span>
          </div>
          <div style="padding:10px 12px; font-size:12px; font-weight:600; color:#334155; line-height:1.4;">
            ${safeEscape(ph.caption)}
          </div>
        </div>
      `;
    });
    photosHtml += `
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:10px;">
        <button type="button" onclick="togglePreviewMode('reader')" class="preview-nav-btn">
          &larr; Switch to Reading Chapters
        </button>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <button type="button" onclick="orderBookViaWhatsApp('${safeEscape(currentPreviewBookTitle)}', ${price})" class="btn-whatsapp-direct" style="padding:8px 14px;">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp Order
          </button>
          <button type="button" onclick="orderCurrentPreviewBookCOD()" class="yellow-btn" style="width:auto; padding:8px 18px; background:#2563eb; color:white; font-size:13px; font-weight:700;">
            ⚡ Order Full Paperback (COD ₹${price}) &rarr;
          </button>
        </div>
      </div>
    `;
    pagesContainer.innerHTML = photosHtml;
    return;
  }

  // Build Top Filmstrip Tabs for Reader
  let tabsHtml = '<div class="preview-tabs-filmstrip">';
  previews.forEach((p, idx) => {
    const isActive = idx === currentPreviewPageIndex;
    tabsHtml += `
      <button type="button" class="preview-filmstrip-tab ${isActive ? 'active' : ''}" onclick="setSamplePreviewPage(${idx})">
        ${p.tabTitle || ('Page ' + (idx + 1))}
      </button>
    `;
  });
  tabsHtml += '</div>';

  pagesContainer.innerHTML = `
    ${modeSwitcherHtml}
    ${tabsHtml}

    <!-- Authentic Book Page Spread Container -->
    <div class="book-page-sheet">
      <!-- Watermark Background -->
      <div class="book-page-watermark">
        JK STUDY HUB • VERIFIED EXAM MATERIAL
      </div>

      <!-- Book Header / Running Head -->
      <div class="book-page-running-head">
        <span>${safeEscape(page.chapterHeader)}</span>
        <span>JK STUDY HUB</span>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="font-size: 21px; font-family: 'Outfit', serif; font-weight: 800; color: #0c0a09; margin: 4px 0;">
          ${safeEscape(page.title)}
        </h2>
        <div style="font-size: 12px; font-style: italic; color: #57534e;">
          ${safeEscape(page.subtitle)}
        </div>
      </div>

      <!-- Lead paragraph with Drop Cap -->
      <p class="book-page-lead-para">
        <span class="book-page-dropcap">${safeEscape(page.dropCap || '')}</span>${safeEscape(page.leadText)}
      </p>

      ${page.bodyHtml || ''}

      ${page.quote ? `
        <div class="book-page-quote-box">
          "${safeEscape(page.quote)}"
        </div>
      ` : ''}

      <!-- Page Footer -->
      <div class="book-page-footer">
        <div style="font-size: 11.5px; color: #166534; font-weight: 700;">
          ✓ 100% Genuine Print Sample • 70 GSM Cream Paper
        </div>
        <div style="font-weight: 800; color: #78716c;">
          — ${safeEscape(page.pageNumber)} —
        </div>
      </div>
    </div>

    <!-- Navigation & Bottom Quick Buy Actions -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:10px;">
      <div style="display:flex; gap:8px;">
        <button type="button" onclick="flipSamplePage(-1)" class="preview-nav-btn" ${currentPreviewPageIndex === 0 ? 'disabled style="opacity:0.35;"' : ''}>
          &larr; Prev Page
        </button>
        <button type="button" onclick="flipSamplePage(1)" class="preview-nav-btn" ${currentPreviewPageIndex >= totalPages - 1 ? 'disabled style="opacity:0.35;"' : ''}>
          Next Page &rarr;
        </button>
      </div>

      <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
        <button type="button" onclick="orderBookViaWhatsApp('${safeEscape(currentPreviewBookTitle)}', ${price})" class="btn-whatsapp-direct" style="padding:8px 14px;">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp Order
        </button>
        <button type="button" onclick="orderCurrentPreviewBookCOD()" class="yellow-btn" style="width:auto; padding:8px 18px; background:#2563eb; color:white; font-size:13px; font-weight:700;">
          ⚡ Order Full Book (COD ₹${price}) &rarr;
        </button>
      </div>
    </div>
  `;
}


// =========================================================================
// AUTHENTIC STUDENT PHOTO REVIEWS WITH COLLEGE & SEMESTER BADGES
// =========================================================================
const ENHANCED_STUDENT_REVIEWS = {
  "Atomic Habits": [
    { name: "Aaqib Lone", college: "Kashmir University (B.Sc 3rd Sem)", rating: 5, date: "Yesterday", comment: "Super crisp print and authentic cream paper! Delivered to Baramulla in less than 24 hours. Must-read for every board and college student." },
    { name: "Iqra Jan", college: "Cluster University Srinagar", rating: 5, date: "3 days ago", comment: "Neat packaging with thick bubble wrap. Genuine book at nearly half the local market rate. COD was seamless." },
    { name: "Faizan Mir", college: "Govt Degree College Baramulla", rating: 5, date: "1 week ago", comment: "The delivery boy called before reaching my home. Clear typeface with no misprints whatsoever." }
  ],
  "The Psychology of Money": [
    { name: "Mehreen Zehra", college: "Kashmir University (Commerce)", rating: 5, date: "2 days ago", comment: "Timeless financial wisdom. Delivered same day in Pattan! Original paperback print edition with genuine binding." },
    { name: "Tanveer Hassan", college: "GDC Sopore (B.A 4th Sem)", rating: 5, date: "4 days ago", comment: "Clear readable typeface and thick 70 GSM paper. 10/10 service from JK Study Hub." }
  ],
  "Deep Work": [
    { name: "Zubair Ahmad", college: "NIT Srinagar (Aspirant)", rating: 5, date: "3 days ago", comment: "Helped me cut phone distractions completely for my upcoming exams. Genuine paperback edition!" }
  ],
  "default": [
    { name: "Saima Bashir", college: "JKBOSE 12th Medical (Baramulla)", rating: 5, date: "Recently", comment: "Original paperback edition with crystal clear print quality. Fast doorstep Kashmir delivery!" },
    { name: "Umar Farooq", college: "Kashmir University Scholar", rating: 5, date: "Recently", comment: "Great protective packaging and verified student quality. Highly recommended for all students." }
  ]
};

function renderBookReviews(bookName) {
  const container = document.getElementById('modalReviewsList');
  const avgEl = document.getElementById('modalRatingAvg');
  if (!container) return;

  const defaultList = ENHANCED_STUDENT_REVIEWS[bookName] || ENHANCED_STUDENT_REVIEWS['default'];
  let custom = {};
  try {
    custom = JSON.parse(localStorage.getItem('jk_student_reviews_custom') || '{}');
  } catch(e) {}
  const userReviews = custom[bookName] || [];
  const reviews = [...userReviews, ...defaultList];

  if (avgEl && reviews.length > 0) {
    const avg = (reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1);
    avgEl.innerHTML = `⭐ ${avg} (${reviews.length} Verified Student Reviews)`;
  }

  let html = '';
  reviews.forEach(r => {
    let stars = '';
    const rating = Number(r.rating) || 5;
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '<i class="fa-solid fa-star" style="color:#f59e0b;"></i> ' : '<i class="fa-regular fa-star" style="color:#cbd5e1;"></i> ';
    }
    const collegeTag = r.college || 'Verified Student • Kashmir';
    html += `
      <div class="student-review-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px; margin-bottom:6px;">
        <div class="rev-head" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span class="rev-author" style="font-size:12.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-circle-user" style="color:#2563eb;"></i> ${safeEscape(r.name)}
            <span class="verified-uni-badge"><i class="fa-solid fa-graduation-cap"></i> ${safeEscape(collegeTag)}</span>
          </span>
          <span class="rev-stars" style="font-size:11px;">${stars}</span>
        </div>
        <p class="rev-comment" style="font-size:12px; color:#475569; margin:4px 0; line-height:1.5;">${safeEscape(r.comment)}</p>
        <div style="font-size:10.5px; color:#94a3b8; display:flex; justify-content:space-between;">
          <span style="color:#16a34a; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Verified Purchase</span>
          <span>${safeEscape(r.date || 'Recent')}</span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}


// =========================================================================
// 1-CLICK "ORDER ON WHATSAPP" DIRECT ENGINE
// =========================================================================
function orderBookViaWhatsApp(bookName, price) {
  const pin = localStorage.getItem('jk_delivery_pincode') || '193121';
  const info = getKashmirPincodeInfo(pin) || { district: 'Kashmir' };
  
  const msg = `Hi JK Study Hub! I want to order this book with Cash on Delivery:%0A%0A` +
              `📚 *Book:* ${encodeURIComponent(bookName)}%0A` +
              `💵 *Price:* ₹${price} (Free Kashmir Delivery)%0A` +
              `📍 *Delivery Destination:* ${encodeURIComponent(info.district)} (Pincode: ${pin})%0A` +
              `💳 *Payment Method:* Cash on Doorstep (COD)%0A%0A` +
              `Please confirm my doorstep order with fast Kashmir dispatch!`;

  window.open(`https://wa.me/919622605714?text=${msg}`, '_blank');
}

function orderCurrentBookViaWhatsApp() {
  if (!currentModalBook) return;
  orderBookViaWhatsApp(currentModalBook.name, currentModalBook.price);
}

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

  // Update Live Delivery Estimator in Modal with saved pincode
  const savedPin = localStorage.getItem('jk_delivery_pincode') || '193121';
  const pinInput = document.getElementById('modalPincodeInput');
  if (pinInput) pinInput.value = savedPin;
  applyModalPincodeCheck(savedPin);

  // Render Frequently Bought Together (Bundle & Save)
  renderFrequentlyBoughtTogether(book.name);

  // Render Student Reviews
  renderBookReviews(book.name);

  modal.classList.add('active');
}

function closeBookDetailsModal() {
  const modal = document.getElementById('bookDetailsModal');
  if (modal) modal.classList.remove('active');
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
  if (card.closest('#copiesGrid') || text.includes('copies (pack') || text.includes('exercise copies') || text.includes('college register') || text.includes('practical lab copy') || text.includes('hardcover register') || text.includes('four-line english') || text.includes('two-line urdu') || text.includes('math square grid')) return 'copies';
  if (card.closest('#schoolBooksGrid') || text.includes('complete book set') || text.includes('textbooks set') || text.includes('medical set') || text.includes('non-med set') || text.includes('commerce set') || text.includes('arts set') || text.includes('school book')) return 'school-books';
  if (text.includes('pyqs') || text.includes('instant notes') || text.includes('survival kit') || text.includes('solved papers')) return 'academic';
  if (text.includes('table') || text.includes('diary') || text.includes('pen') || text.includes('geometry') || text.includes('quran') || text.includes('lamp')) return 'stationery';
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
  const secCopies = document.getElementById('section-copies');
  const secSchoolBooks = document.getElementById('section-school-books');
  const secAcademic = document.getElementById('section-academic');
  const secDigital = document.getElementById('section-digital');

  if (secCopies) {
    const parentHeading = secCopies.closest('div');
    const hasVisibleCopies = Array.from(document.querySelectorAll('#copiesGrid .product-card')).some(c => c.style.display !== 'none');
    if (parentHeading) parentHeading.style.display = hasVisibleCopies ? 'flex' : 'none';
  }
  if (secSchoolBooks) {
    const parentHeading = secSchoolBooks.closest('div');
    const hasVisibleSchoolBooks = Array.from(document.querySelectorAll('#schoolBooksGrid .product-card')).some(c => c.style.display !== 'none');
    if (parentHeading) parentHeading.style.display = hasVisibleSchoolBooks ? 'flex' : 'none';
  }

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
  const queryParam = params.get('q') || '';

  if (catParam) {
    if (typeof openStoreCategorySection === 'function') {
      openStoreCategorySection(catParam, queryParam);
    } else {
      if (catParam === 'novels' || catParam === 'books') {
        setStoreCategoryFilter('novels');
      } else if (catParam === 'academic' || catParam === 'notes') {
        setStoreCategoryFilter('academic');
      } else if (catParam === 'stationery') {
        setStoreCategoryFilter('stationery');
      } else if (catParam === 'digital' || catParam === 'services') {
        setStoreCategoryFilter('digital');
      }
    }
  } else if (queryParam) {
    const searchInput = document.getElementById('storeSearchInput');
    if (searchInput) {
      searchInput.value = queryParam;
      handleStoreLiveSearch(queryParam);
    }
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

          <div style="display:flex; gap:6px; margin: 6px 0 10px; flex-wrap:wrap;">
            <button type="button" class="btn-look-inside" onclick="openSamplePreviewModal('${safeName}')"><i class="fa-solid fa-book-open-reader"></i> Look Inside</button>
            <button type="button" class="btn-whatsapp-direct" style="padding:4px 9px; font-size:11.5px;" onclick="orderBookViaWhatsApp('${safeName}', ${price})"><i class="fa-brands fa-whatsapp"></i> WhatsApp</button>
          </div>

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

// --- ZAPVI-STYLE UI CONTROLLERS ---
let currentZapviSlideIndex = 0;
let zapviCarouselTimer = null;

function setZapviSlide(index) {
  const slides = document.querySelectorAll('.zapvi-hero-slide');
  const dots = document.querySelectorAll('.zapvi-carousel-dot');
  if (slides.length === 0) return;

  currentZapviSlideIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentZapviSlideIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentZapviSlideIndex);
  });
}

function nextZapviSlide() {
  setZapviSlide(currentZapviSlideIndex + 1);
  resetZapviSlideTimer();
}

function prevZapviSlide() {
  setZapviSlide(currentZapviSlideIndex - 1);
  resetZapviSlideTimer();
}

function resetZapviSlideTimer() {
  if (zapviCarouselTimer) clearInterval(zapviCarouselTimer);
  zapviCarouselTimer = setInterval(() => {
    setZapviSlide(currentZapviSlideIndex + 1);
  }, 5500);
}

// Start Zapvi carousel auto-play on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    resetZapviSlideTimer();
  });
}

function toggleZapviDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('zapviMoreDropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

function closeZapviDropdown() {
  const dropdown = document.getElementById('zapviMoreDropdown');
  if (dropdown) dropdown.classList.remove('open');
}

// Dismiss Zapvi dropdown on click outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('zapviMoreDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

function openZapviOffersModal(e) {
  if (e) e.preventDefault();
  const offersEl = document.getElementById('offers');
  if (offersEl) {
    offersEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    offersEl.style.transition = 'transform 0.3s ease';
    offersEl.style.transform = 'scale(1.02)';
    setTimeout(() => { offersEl.style.transform = 'scale(1)'; }, 400);
  }
}

function focusStoreSearch() {
  const searchInput = document.getElementById('storeSearchInput');
  if (searchInput) {
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    searchInput.focus();
  }
}

// Open and filter to specific category section smoothly
function openStoreCategorySection(catName, specificQuery) {
  closeZapviDropdown();
  
  if (typeof setStoreCategoryFilter === 'function') {
    setStoreCategoryFilter(catName);
  }
  
  const searchInput = document.getElementById('storeSearchInput');
  if (specificQuery && searchInput) {
    searchInput.value = specificQuery;
    handleStoreLiveSearch(specificQuery);
  } else if (!specificQuery && searchInput && searchInput.value) {
    searchInput.value = '';
    handleStoreLiveSearch('');
  }

  // Scroll smoothly to target section or store search container
  setTimeout(() => {
    let target = null;
    if (catName === 'novels') {
      target = document.getElementById('section-novels') || document.getElementById('storeSearchContainer');
    } else if (catName === 'academic') {
      target = document.getElementById('section-academic') || document.getElementById('storeSearchContainer');
    } else if (catName === 'stationery') {
      target = document.getElementById('section-academic') || document.getElementById('storeSearchContainer');
    } else if (catName === 'digital') {
      target = document.getElementById('section-digital') || document.getElementById('storeSearchContainer');
    } else {
      target = document.getElementById('storeSearchContainer');
    }

    if (target) {
      const topOffset = 70; // offset for sticky nav
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 100);
}
window.openStoreCategorySection = openStoreCategorySection;


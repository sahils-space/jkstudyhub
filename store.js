// JK STUDY HUB - E-COMMERCE ENGINE (Cart, Wishlist, Multi-Step Checkout & Razorpay)

const RAZORPAY_KEY = "rzp_live_TjJ6bv39yo6Gds";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec";

// Master Product Catalog
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
    return JSON.parse(localStorage.getItem('jk_cart') || '[]');
  } catch(e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('jk_cart', JSON.stringify(cart));
  updateNavBadges();
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('jk_wishlist') || '[]');
  } catch(e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem('jk_wishlist', JSON.stringify(wishlist));
  updateNavBadges();
}

// --- BADGE UPDATER ---
function updateNavBadges() {
  const cart = getCart();
  const wishlist = getWishlist();

  const totalCartQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

  const cartBadges = document.querySelectorAll('.cart-badge-count, #cartCount');
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
    if (wishlist.length > 0) {
      el.style.display = 'inline-block';
      el.innerText = wishlist.length;
    } else {
      el.style.display = 'none';
    }
  });
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
    html += `<a href="${linkUrl}" style="background: #2563eb; color: white; text-decoration: none; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;">${linkText}</a>`;
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

// --- CART OPERATIONS ---
function addToCart(name, price, type, category) {
  const catalog = PRODUCT_CATALOG[name] || {};
  const finalPrice = price || catalog.price || 99;
  const finalCat = category || catalog.category || 'standard';
  const finalImg = catalog.image || 'images/icon.svg';

  let cart = getCart();
  const existingIndex = cart.findIndex(i => i.name === name);

  if (existingIndex > -1) {
    cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
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

  cart[index].qty = (cart[index].qty || 1) + delta;
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

  // Add to wishlist
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

  // Remove from cart
  cart.splice(index, 1);
  saveCart(cart);

  showToast(`❤️ Moved "${item.name}" to Wishlist!`, 'wishlist.html', 'View Wishlist ➔');
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

// --- WISHLIST OPERATIONS ---
function toggleFavorite(btn, productName) {
  const card = btn ? btn.closest('.product-card') : null;
  const title = productName || (card ? card.querySelector('.product-title').innerText : '');
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
    wishlist.push({
      name: title,
      price: catalog.price || 99,
      category: catalog.category || 'standard',
      image: catalog.image || 'images/icon.svg'
    });
    saveWishlist(wishlist);
    if (btn) btn.classList.add('active');
    showToast(`❤️ Saved to Wishlist!`, 'wishlist.html', 'View Wishlist ➔');
  }

  // Update all hearts on current page with this title
  document.querySelectorAll('.product-card').forEach(c => {
    const t = c.querySelector('.product-title');
    if (t && t.innerText === title) {
      const h = c.querySelector('.wishlist-icon');
      if (h) {
        if (wishlist.find(w => w.name === title)) h.classList.add('active');
        else h.classList.remove('active');
      }
    }
  });

  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

function removeFromWishlist(index) {
  let wishlist = getWishlist();
  if (!wishlist[index]) return;
  const name = wishlist[index].name;
  wishlist.splice(index, 1);
  saveWishlist(wishlist);
  showToast(`Removed "${name}" from Wishlist`);
  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

function moveWishlistToCart(index) {
  let wishlist = getWishlist();
  if (!wishlist[index]) return;
  const item = wishlist[index];

  // Add to cart
  let cart = getCart();
  const existingIdx = cart.findIndex(c => c.name === item.name);
  if (existingIdx > -1) {
    cart[existingIdx].qty = (cart[existingIdx].qty || 1) + 1;
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

  // Remove from wishlist
  wishlist.splice(index, 1);
  saveWishlist(wishlist);

  showToast(`🛒 Moved "${item.name}" to Cart!`, 'cart.html', 'View Cart ➔');
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
    const itemTotal = item.price * (item.qty || 1);
    subtotal += itemTotal;
    totalQty += (item.qty || 1);

    itemsHtml += `
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 16px; display: flex; gap: 18px; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <img src="${item.image}" alt="${item.name}" style="width: 85px; height: 85px; object-fit: cover; border-radius: 10px; border: 1px solid #f1f5f9; flex-shrink: 0;">
        <div style="flex-grow: 1;">
          <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 6px;">${item.name}</h4>
          <div style="font-size: 13px; color: #64748b; margin-bottom: 10px;">
            <span>Price: <strong>₹${item.price}</strong> each</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden;">
              <button onclick="updateCartQty(${index}, -1)" style="background: #f8fafc; border: none; padding: 6px 12px; cursor: pointer; font-size: 14px; font-weight: bold; color: #475569;">−</button>
              <span style="padding: 6px 14px; font-weight: 700; font-size: 14px; background: white;">${item.qty || 1}</span>
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

  // Update Summary
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
        <img src="${item.image}" alt="${item.name}" class="product-img" style="height: 190px; object-fit: cover;">
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
    const itemTotal = item.price * (item.qty || 1);
    total += itemTotal;
    names.push(`${item.name} (x${item.qty || 1})`);
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

  // Set invoice
  const nameEl = document.getElementById('itemName');
  if (nameEl) nameEl.innerText = name;

  const priceEl = document.getElementById('itemPrice');
  if (priceEl) priceEl.innerText = '₹' + price;

  const totalEl = document.getElementById('totalPrice');
  if (totalEl) totalEl.innerText = '₹' + (price + 5);

  // Reset form
  const form = document.getElementById('checkoutForm');
  if (form) form.reset();

  // Reset Step view
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step1').style.display = 'block';

  const p1 = document.getElementById('progressStep1');
  const p2 = document.getElementById('progressStep2');
  if (p1) p1.classList.add('active-step');
  if (p2) p2.classList.remove('active-step');

  // Dynamic Fields
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
    "amount": totalPaid * 100, // Amount in paise
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

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('address', finalAddress);
  formData.append('product', combinedProduct);

  fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' })
    .then(() => {
      alert(`🎉 ORDER SUCCESSFUL!

Thank you, ${name}!
Your payment of ₹${totalPaid} is verified.
Razorpay TXN ID: ${txnId}

We will contact your WhatsApp (${phone}) shortly to confirm delivery!`);

      if (isCartCheckoutSession) {
        localStorage.removeItem('jk_cart');
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
    })
    .catch(err => {
      alert(`Payment verified (${txnId}), but error saving details. Please message us on WhatsApp with your payment ID!`);
      closeCheckout();
    });
}

// --- PAGE INITIALIZATION ---
function initShop() {
  updateNavBadges();

  // Restore Wishlist heart states on store page
  const wishlist = getWishlist();
  document.querySelectorAll('.product-card').forEach(card => {
    const titleEl = card.querySelector('.product-title');
    if (titleEl) {
      const title = titleEl.innerText.trim();
      const icon = card.querySelector('.wishlist-icon');
      if (icon) {
        if (wishlist.find(w => w.name === title)) {
          icon.classList.add('active');
        } else {
          icon.classList.remove('active');
        }
      }
    }
  });

  // If on cart page, render it
  if (document.getElementById('cartItemsList')) {
    renderCartPage();
  }

  // If on wishlist page, render it
  if (document.getElementById('wishlistGrid')) {
    renderWishlistPage();
  }
}

// Run immediately and also on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShop);
} else {
  initShop();
}

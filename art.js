/* ==========================================================================
   AURA RESIN ATELIER - SHOPIFY-STYLE STOREFRONT CONTROLLER
   Handcrafted in Kashmir • Pure Crystal Artisanship
   ========================================================================== */

(function() {
  'use strict';

  // Force-purge any legacy cached navigation links to main store/study hub from DOM
  function purgeLegacyNavLinks() {
    try {
      const legacy = document.querySelectorAll('.site-nav a[href*="index.html"], .site-nav a[href*="store.html"]');
      legacy.forEach(a => {
        const li = a.closest('li') || a;
        li.remove();
      });
    } catch(e) {}
  }
  purgeLegacyNavLinks();

  // 1. PRODUCT CATALOG DATA
  const RESIN_PRODUCTS = [
    {
      id: 'prod-1',
      title: 'Bismillah Calligraphy & 24K Gold Leaf Resin Bookmark',
      category: 'bookmarks',
      categoryLabel: 'Botanical & Sacred Bookmarks',
      badge: 'Bestseller',
      price: 349,
      mrp: 599,
      rating: 5.0,
      reviewsCount: 42,
      stock: 5,
      image: 'images/resin/resin-bookmark.jpg?v=5.0',
      description: 'Sacred Bismillah calligraphy in reflective gold, encased in optical-grade crystal clear resin with shimmering 24K gold foil flakes at the top and base. Finished with a luxury champagne gold braided silk tassel.',
      specs: ['Dimensions: 14cm x 3cm', 'Thickness: 3.5mm shatterproof crystal', 'Calligraphy: Reflective gold Bismillah', 'Tassel: Pure Braided Silk Tassel included']
    },
    {
      id: 'prod-2',
      title: 'Black & Gold Luxe Word / Initial Resin Keychain',
      category: 'keychains',
      categoryLabel: 'Custom Keychains',
      badge: 'Personalized',
      price: 249,
      mrp: 450,
      rating: 5.0,
      reviewsCount: 68,
      stock: 8,
      image: 'images/resin/resin-keychain.jpg?v=5.0',
      description: 'Handcrafted circular resin keychains in deep glossy obsidian black with floating 24K gold foil flakes and bold gold lettering (HOPE, LIFE, JOY, DREAM, or your custom name/initial). Fitted with heavy-duty anti-tarnish gold hardware.',
      specs: ['Diameter: 4.5cm circular charm', 'Available words: HOPE, LIFE, JOY, DREAM or Custom Name', 'Anti-tarnish reinforced steel keyring', 'Scratch-resistant glass finish']
    },
    {
      id: 'prod-3',
      title: 'Royal Pearl & Magenta Floral Folding Quran Stand (Rehal)',
      category: 'islamic',
      categoryLabel: 'Sacred Rehal & Quran Stands',
      badge: 'Masterpiece',
      price: 1599,
      mrp: 2799,
      rating: 5.0,
      reviewsCount: 56,
      stock: 3,
      image: 'images/resin/resin-quran-stand.jpg?v=5.0',
      description: 'Exquisite two-piece interlocking folding Rehal crafted from shimmering pearl-white resin, infused with magenta floral accents, floating gold leaf, and sacred Arabic calligraphy ("Wa khalaqnakum azwaja"). Includes matching floral bookmark and gold silk tassel.',
      specs: ['Detachable 2-piece folding X-shape rehal', 'Dimensions: 12 x 8 inches per wing', 'Calligraphy: "Wa Khalaqnakum Azwaja" + Bismillah', 'Free matching floral bookmark with gold tassel']
    },
    {
      id: 'prod-4',
      title: 'Dal Lake Ocean Wave 3D Geode Wall Clock (12-inch)',
      category: 'clocks',
      categoryLabel: 'Ocean & Geode Clocks',
      badge: 'Signature',
      price: 1899,
      mrp: 3200,
      rating: 4.9,
      reviewsCount: 22,
      stock: 2,
      image: 'images/resin/resin-clock.jpg?v=5.0',
      description: 'A breathtaking 3-layered ocean pour inspired by the serene waters of Kashmir. Crafted with real crushed white quartz crystals, authentic beach sand, and multi-layered cellular ocean foam. Fitted with a high-torque silent sweep quartz clock mechanism.',
      specs: ['Diameter: 12 inches (30 cm)', 'Base: Heavy moisture-resistant engineered wood', 'Movement: Sweep Silent Quartz (No ticking sound)', 'Gold teardrop clock hands']
    },
    {
      id: 'prod-5',
      title: 'Royal Emerald Agate Resin Coasters (Set of 4)',
      category: 'coasters',
      categoryLabel: 'Luxury Coasters',
      badge: 'Hand-Gilded',
      price: 699,
      mrp: 1199,
      rating: 4.8,
      reviewsCount: 41,
      stock: 5,
      image: 'images/resin/resin-coasters.jpg?v=5.0',
      description: 'Inspired by natural raw emerald geodes. Translucent jewel-toned green and pearlescent white resin swirls with genuine natural crackle texture. Each coaster rim is individually hand-gilded with metallic gold leaf paint.',
      specs: ['Set of 4 Coasters (approx 10cm each)', 'Heat resistant up to 90°C (ideal for hot tea/coffee)', 'Silicone anti-slip bumpers on bottom', 'Waterproof & wipe-clean']
    },
    {
      id: 'prod-6',
      title: 'Ayat-ul-Kursi Mirror Gold Calligraphy Resin Frame',
      category: 'islamic',
      categoryLabel: 'Islamic Sacred Art',
      badge: 'Spiritual Decor',
      price: 1299,
      mrp: 2199,
      rating: 5.0,
      reviewsCount: 53,
      stock: 3,
      image: 'images/resin/resin-ayat-frame.jpg?v=5.0',
      description: 'Sacred Ayat-ul-Kursi script precision-cut in 3D reflective gold mirror acrylic, seamlessly cast within a pearl white and gold marble resin slab. The perfect spiritual gift for housewarmings, weddings, or personal study desks.',
      specs: ['Size: 8 x 10 inches', 'Display: Comes with luxury clear acrylic table stand', '3D gold mirror reflection script', 'Fade-proof epoxy seal']
    },
    {
      id: 'prod-7',
      title: 'Nikah & Wedding Flower Keepsake Crystal Cube',
      category: 'wedding',
      categoryLabel: 'Wedding Keepsakes',
      badge: 'Bespoke Order',
      price: 2499,
      mrp: 4000,
      rating: 5.0,
      reviewsCount: 19,
      stock: 3,
      image: 'images/resin/resin-wedding-cube.jpg?v=5.0',
      description: 'Preserve the real fresh roses, jasmine, and petals from your Nikah or wedding garland forever. Cast in an optical-grade solid crystal resin cube with couple names and wedding date engraved in gold.',
      specs: ['Dimensions: 10cm x 10cm x 10cm solid block', 'Custom Name & Date inclusion', 'Dry-flower preservation guidance provided', 'Luxe satin-lined keepsake gift box']
    },
    {
      id: 'prod-8',
      title: 'Golden Ginkgo Leaf Vanity & Jewelry Trinket Tray',
      category: 'coasters',
      categoryLabel: 'Vanity Trays',
      badge: 'Artisan Crafted',
      price: 549,
      mrp: 899,
      rating: 4.8,
      reviewsCount: 30,
      stock: 6,
      image: 'images/resin/resin-tray.jpg?v=5.0',
      description: 'Organic leaf silhouette tray for rings, earrings, watches, and bedside trinkets. Hand-poured with semi-opaque milky white resin, deep amber accents, and gold leaf veins.',
      specs: ['Length: 18cm | Width: 11cm', 'Curved lip prevents jewelry from sliding', 'Food-safe certified resin topcoat', 'Glossy ceramic-like crystal weight']
    },
    {
      id: 'prod-9',
      title: 'Botanical Crystal Resin Pen Stand & Brush Holder',
      category: 'bookmarks',
      categoryLabel: 'Desk Artifacts',
      badge: 'Study Aesthetic',
      price: 499,
      mrp: 799,
      rating: 4.9,
      reviewsCount: 34,
      stock: 5,
      image: 'images/resin/resin-pen-stand.jpg?v=5.0',
      description: 'Heavyweight cylindrical & square desk vessels cast with crystal-clear resin, real embedded wildflower sprigs, floating bubbles, and ocean blue gradient bases. Perfect for holding study pens, makeup brushes, or desk scissors.',
      specs: ['Height: 10cm | Width: 7.5cm', 'Cast with real dried alpine wildflowers', 'Heavy non-toppling crystal base', 'Smooth rounded lip']
    }
  ];

  // 2. STATE MANAGEMENT
  let state = {
    cart: [],
    wishlist: [],
    activeCategory: 'all',
    customCraftShape: 'heart',
    customPhotoData: null,
    customName: 'Rahul & Riya',
    customTrim: 'gold',
    checkoutItems: []
  };

  // Load persisted cart & wishlist
  try {
    const savedCart = localStorage.getItem('aura_cart');
    if (savedCart) state.cart = JSON.parse(savedCart);
    const savedWish = localStorage.getItem('aura_wishlist');
    if (savedWish) state.wishlist = JSON.parse(savedWish);
  } catch(e) {}

  function persistState() {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(state.cart));
      localStorage.setItem('aura_wishlist', JSON.stringify(state.wishlist));
    } catch(e) {}
  }

  // Seller Panel Sync: Read custom price overrides from localStorage if updated
  function getProductEffectivePrice(product) {
    try {
      const priceMap = JSON.parse(localStorage.getItem('jk_custom_prices') || '{}');
      const mrpMap = JSON.parse(localStorage.getItem('jk_custom_mrps') || '{}');
      const matchedKey = Object.keys(priceMap).find(k => k.toLowerCase() === product.title.toLowerCase());
      const p = (matchedKey && Number(priceMap[matchedKey])) ? Number(priceMap[matchedKey]) : product.price;
      const matchedMrpKey = Object.keys(mrpMap).find(k => k.toLowerCase() === product.title.toLowerCase());
      const m = (matchedMrpKey && Number(mrpMap[matchedMrpKey])) ? Number(mrpMap[matchedMrpKey]) : product.mrp;
      return { price: p, mrp: m };
    } catch(e) {
      return { price: product.price, mrp: product.mrp };
    }
  }

  // 3. RENDER PRODUCTS
  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const filtered = state.activeCategory === 'all' 
      ? RESIN_PRODUCTS 
      : RESIN_PRODUCTS.filter(p => p.category === state.activeCategory);

    grid.innerHTML = filtered.map(p => {
      const isWish = state.wishlist.includes(p.id);
      const { price, mrp } = getProductEffectivePrice(p);
      return `
        <article class="product-card" data-id="${p.id}" data-category="${p.category}">
          ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
          <button type="button" class="product-card-wishlist" onclick="window.auraAtelier.toggleWishlist('${p.id}')" aria-label="Add to wishlist" style="color: ${isWish ? '#ef4444' : 'inherit'};">
            <i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          
          <div class="product-media" onclick="window.auraAtelier.openQuickView('${p.id}')" style="cursor: pointer;">
            <img src="${p.image}" alt="${p.title}" loading="lazy" decoding="async">
            <button type="button" class="product-quick-view-btn">
              <i class="fa-solid fa-eye"></i> Quick View
            </button>
          </div>

          <div class="product-content">
            <span class="product-category-meta">${p.categoryLabel}</span>
            <h3 class="product-title" onclick="window.auraAtelier.openQuickView('${p.id}')">${p.title}</h3>
            
            <div class="product-rating">
              ${renderStars(p.rating)}
              <span class="product-rating-count">(${p.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <span class="product-price">₹${price.toLocaleString('en-IN')}</span>
              <span class="product-mrp">₹${mrp.toLocaleString('en-IN')}</span>
              <span class="product-save-pill">Save ₹${(mrp - price).toLocaleString('en-IN')}</span>
            </div>

            <div class="product-card-actions">
              <button type="button" class="btn-card-add" onclick="window.auraAtelier.addToCart('${p.id}')">
                <i class="fa-solid fa-bag-shopping"></i> Add to Cart
              </button>
              <button type="button" class="btn-card-wa" onclick="window.auraAtelier.orderViaWhatsApp('${p.id}')" title="Quick WhatsApp Order">
                <i class="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    attach3DTiltEffect();
  }

  function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars += '<i class="fa-solid fa-star"></i>';
      } else if (i - 0.5 <= rating) {
        stars += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        stars += '<i class="fa-regular fa-star"></i>';
      }
    }
    return stars;
  }

  // 4. 3D CARD TILT ON MOUSEMOVE (Shopify Prestige Style)
  function attach3DTiltEffect() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth <= 820) return; // Skip on mobile for performance

    const cards = document.querySelectorAll('.product-card, .hero-3d-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 5. 3D RESIN PHOTO & NAME KEEPSAKE STUDIO
  function initSimulator() {
    const canvas = document.getElementById('simResinCanvas');
    const input = document.getElementById('simTextInput');
    const photoEl = document.getElementById('simPhotoLayer');
    if (!canvas) return;

    if (photoEl && !state.customPhotoData) {
      photoEl.style.backgroundImage = "url('images/resin/demo-heart-keychain.jpg')";
    }

    if (input) {
      input.addEventListener('input', e => {
        updateCustomNameText(e.target.value);
      });
    }

    // 3D tilt tracking for simulator canvas
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      canvas.style.transform = `rotateY(${x * 0.12}deg) rotateX(${-y * 0.12}deg)`;
    });

    canvas.addEventListener('mouseleave', () => {
      canvas.style.transform = 'rotateY(-6deg) rotateX(6deg)';
    });
  }

  function setCustomCraftShape(shape) {
    state.customCraftShape = shape;
    const btnHeart = document.getElementById('shapeBtnHeart');
    const btnKeychain = document.getElementById('shapeBtnKeychain');
    const canvas = document.getElementById('simResinCanvas');
    const hardware = document.getElementById('simKeychainHardware');
    const stand = document.getElementById('simHeartStand');
    const sizeTag = document.getElementById('simSizeTag');
    const priceDisplay = document.getElementById('simPriceDisplay');
    const mrpDisplay = document.getElementById('simMrpDisplay');
    const savePill = document.getElementById('simSavePill');
    const photoEl = document.getElementById('simPhotoLayer');

    if (shape === 'heart') {
      if (btnHeart) btnHeart.classList.add('active');
      if (btnKeychain) btnKeychain.classList.remove('active');
      if (canvas) {
        canvas.className = 'sim-resin-canvas sim-shape-heart';
      }
      if (hardware) hardware.style.display = 'none';
      if (stand) stand.style.display = 'flex';
      if (sizeTag) sizeTag.textContent = '💖 Heart Keepsake / Keychain';
      if (priceDisplay) priceDisplay.textContent = '₹899';
      if (mrpDisplay) mrpDisplay.textContent = '₹1,499';
      if (savePill) savePill.textContent = 'Save 40%';
      // Update demo photo if no custom photo uploaded
      if (photoEl && !state.customPhotoData) {
        photoEl.style.backgroundImage = "url('images/resin/demo-heart-keychain.jpg')";
      }
    } else {
      if (btnHeart) btnHeart.classList.remove('active');
      if (btnKeychain) btnKeychain.classList.add('active');
      if (canvas) {
        canvas.className = 'sim-resin-canvas sim-shape-keychain';
      }
      if (hardware) hardware.style.display = 'flex';
      if (stand) stand.style.display = 'none';
      if (sizeTag) sizeTag.textContent = '⭕ Round Geode & Gold Keychain';
      if (priceDisplay) priceDisplay.textContent = '₹299';
      if (mrpDisplay) mrpDisplay.textContent = '₹599';
      if (savePill) savePill.textContent = 'Save 50%';
      // Update demo photo if no custom photo uploaded
      if (photoEl && !state.customPhotoData) {
        photoEl.style.backgroundImage = "url('images/resin/demo-round-keychain.jpg')";
      }
    }
  }

  function handleCustomPhotoUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      state.customPhotoData = e.target.result;
      const photoEl = document.getElementById('simPhotoLayer');
      if (photoEl) {
        photoEl.style.backgroundImage = `url('${e.target.result}')`;
      }
      const label = document.getElementById('uploaderLabelText');
      if (label) {
        label.innerHTML = `<strong>Photo Attached:</strong> ${file.name.slice(0, 18)}... <span style="color:#16a34a; font-weight:700;">✔ Ready</span>`;
      }
    };
    reader.readAsDataURL(file);
  }

  function updateCustomNameText(val) {
    state.customName = (val || '').trim();
    const nameEl = document.getElementById('simNameDisplay');
    if (nameEl) {
      nameEl.textContent = val.trim() || 'Rahul & Riya';
    }
  }

  function setResinTrim(trim, btnEl) {
    state.customTrim = trim;
    if (btnEl) {
      const swatches = document.querySelectorAll('.color-swatch');
      swatches.forEach(s => s.classList.remove('active'));
      btnEl.classList.add('active');
    }
    const foilLayer = document.getElementById('simFoilLayer');
    if (!foilLayer) return;

    if (trim === 'gold') {
      foilLayer.style.backgroundImage = 'radial-gradient(#fde047 12%, transparent 22%), radial-gradient(#d97706 8%, transparent 18%)';
      foilLayer.style.opacity = '0.65';
    } else if (trim === 'rose') {
      foilLayer.style.backgroundImage = 'radial-gradient(#f43f5e 14%, transparent 25%), radial-gradient(#fde047 8%, transparent 18%)';
      foilLayer.style.opacity = '0.7';
    } else if (trim === 'ocean') {
      foilLayer.style.backgroundImage = 'radial-gradient(#38bdf8 15%, transparent 25%), radial-gradient(#ffffff 10%, transparent 20%)';
      foilLayer.style.opacity = '0.6';
    } else if (trim === 'obsidian') {
      foilLayer.style.backgroundImage = 'radial-gradient(#18181b 20%, transparent 35%), radial-gradient(#fde047 10%, transparent 20%)';
      foilLayer.style.opacity = '0.75';
    }
  }

  // 6. CART DRAWER OPERATIONS
  function updateCartUI() {
    const countBadge = document.getElementById('cartCountBadge');
    const drawerItems = document.getElementById('cartDrawerItems');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    const meterFill = document.getElementById('shippingMeterFill');
    const meterText = document.getElementById('shippingMeterText');

    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (countBadge) countBadge.textContent = totalQty;
    const mobileBottomBadge = document.getElementById('artMobileBottomCartBadge');
    if (mobileBottomBadge) {
      mobileBottomBadge.textContent = totalQty;
      mobileBottomBadge.style.display = totalQty > 0 ? 'flex' : 'none';
    }
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');

    // Free delivery meter threshold = ₹999
    const freeDeliveryThreshold = 999;
    if (meterFill && meterText) {
      if (subtotal >= freeDeliveryThreshold) {
        meterFill.style.width = '100%';
        meterText.innerHTML = '🎉 <strong>Congratulations! You have unlocked Free Kashmir Delivery!</strong>';
      } else {
        const remaining = freeDeliveryThreshold - subtotal;
        const pct = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
        meterFill.style.width = pct + '%';
        meterText.innerHTML = `Add <strong>₹${remaining.toLocaleString('en-IN')}</strong> more for <strong>Free Kashmir Delivery</strong>`;
      }
    }

    if (drawerItems) {
      if (state.cart.length === 0) {
        drawerItems.innerHTML = `
          <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
            <i class="fa-solid fa-bag-shopping" style="font-size: 38px; color: var(--border-light); margin-bottom: 12px; display: block;"></i>
            <p style="font-size: 15px; font-weight: 600; margin-bottom: 6px;">Your treasure bag is empty</p>
            <p style="font-size: 13px;">Discover our handmade resin bookmarks, geode clocks, and custom gifts.</p>
          </div>
        `;
      } else {
        drawerItems.innerHTML = state.cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
              <h4>${item.title}</h4>
              ${item.customNote ? `<div class="cart-item-meta">${item.customNote}</div>` : ''}
              <div class="cart-qty-stepper">
                <button type="button" class="cart-qty-btn" onclick="window.auraAtelier.updateQty('${item.id}', -1)">-</button>
                <span class="cart-qty-val">${item.qty}</span>
                <button type="button" class="cart-qty-btn" onclick="window.auraAtelier.updateQty('${item.id}', 1)">+</button>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
              <button type="button" onclick="window.auraAtelier.removeItem('${item.id}')" style="background:none; border:none; color:#9ca3af; cursor:pointer; font-size:12px; display:block; margin-top:6px; margin-left:auto;">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    persistState();
  }

  function toggleCartDrawer(open) {
    const overlay = document.getElementById('cartDrawerOverlay');
    if (!overlay) return;
    if (open) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  }

  function addToCart(productId, customNote = '') {
    const prod = RESIN_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const { price } = getProductEffectivePrice(prod);
    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({
        id: prod.id,
        title: prod.title,
        price: price,
        image: prod.image,
        qty: 1,
        customNote: customNote
      });
    }

    updateCartUI();
    toggleCartDrawer(true);
  }

  function updateQty(productId, delta) {
    const item = state.cart.find(p => p.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      state.cart = state.cart.filter(p => p.id !== productId);
    }
    updateCartUI();
  }

  function removeItem(productId) {
    state.cart = state.cart.filter(p => p.id !== productId);
    updateCartUI();
  }

  // 7. QUICK VIEW MODAL
  function openQuickView(productId) {
    const prod = RESIN_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    if (!modal || !content) return;

    const { price, mrp } = getProductEffectivePrice(prod);

    content.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:12px;">
        <img src="${prod.image}" alt="${prod.title}" class="modal-gallery-img">
        <div style="font-size:11.5px; color:#15803d; font-weight:700; background:#dcfce7; padding:6px 12px; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-leaf"></i> 100% Non-toxic, UV-protected epoxy resin
        </div>
      </div>

      <div style="display:flex; flex-direction:column;">
        <span class="product-category-meta" style="margin-bottom:8px;">${prod.categoryLabel}</span>
        <h2 style="font-family:var(--font-serif); font-size:26px; line-height:1.2; margin-bottom:8px;">${prod.title}</h2>
        
        <div class="product-rating" style="margin-bottom:14px;">
          ${renderStars(prod.rating)}
          <span class="product-rating-count">(${prod.reviewsCount} verified reviews)</span>
        </div>

        <div class="product-price-row" style="margin-bottom:18px;">
          <span style="font-size:24px; font-weight:800; color:var(--bg-dark);">₹${price.toLocaleString('en-IN')}</span>
          <span class="product-mrp" style="font-size:16px;">₹${mrp.toLocaleString('en-IN')}</span>
          <span class="product-save-pill">Save ₹${(mrp - price).toLocaleString('en-IN')}</span>
        </div>

        <p style="font-size:14px; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">
          ${prod.description}
        </p>

        <ul style="list-style:none; display:flex; flex-direction:column; gap:6px; font-size:12.5px; color:var(--text-main); margin-bottom:24px;">
          ${prod.specs.map(s => `<li><i class="fa-solid fa-check" style="color:var(--accent-gold); margin-right:8px;"></i> ${s}</li>`).join('')}
        </ul>

        <div style="margin-bottom:20px;">
          <label style="font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; display:block; margin-bottom:6px;">Custom Engraving / Name / Initial (Optional):</label>
          <input type="text" id="quickCustomInput" placeholder="e.g. Letter 'A', or Name 'Zoya & Faizan'" style="width:100%; padding:10px 14px; border:1.5px solid var(--border-subtle); border-radius:8px; font-size:13px; outline:none;">
        </div>

        <div style="display:flex; flex-direction:column; gap:10px; margin-top:auto;">
          <div style="display:flex; gap:10px;">
            <button type="button" class="btn-luxury-primary" style="flex-grow:1; justify-content:center;" onclick="window.auraAtelier.addFromModal('${prod.id}')">
              <i class="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>
            <button type="button" class="btn-card-wa" style="padding:14px 18px; font-size:18px;" onclick="window.auraAtelier.orderViaWhatsApp('${prod.id}')" title="Quick WhatsApp Order">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
          <button type="button" class="btn-checkout-prepaid-rzp" style="padding:12px; font-size:13px;" onclick="window.auraAtelier.buyNowOnline('${prod.id}')">
            <i class="fa-solid fa-lock"></i> Buy Now (Prepaid Razorpay)
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
  }

  function addFromModal(productId) {
    const input = document.getElementById('quickCustomInput');
    const note = input ? input.value.trim() : '';
    addToCart(productId, note ? `Customization: ${note}` : '');
    closeQuickView();
  }

  function buyNowOnline(productId) {
    const prod = RESIN_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    const input = document.getElementById('quickCustomInput');
    const note = input ? input.value.trim() : '';
    const { price, mrp } = getProductEffectivePrice(prod);
    const item = {
      id: prod.id,
      title: prod.title,
      price: price,
      mrp: mrp,
      image: prod.image,
      qty: 1,
      customNote: note ? `Customization: ${note}` : ''
    };
    closeQuickView();
    openCheckoutModal([item]);
  }

  // 8. ATTRACTIVE WHATSAPP ORDER DISPATCH (RICH EMOJIS, QR CODE REQUEST & DIRECT IMAGE PREVIEWS)
  const DOMAIN_URL = 'https://art.jkstudyhub.online';
  const RAZORPAY_KEY = 'rzp_live_TjJ6bv39yo6Gds';

  function openWhatsApp(text) {
    const phone = '919622605714';
    const cleanText = (text || '').trim();
    const encoded = encodeURIComponent(cleanText);
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    
    // Attempt window.open first; fallback to direct navigation if popup blocker interferes on mobile
    try {
      const win = window.open(url, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = url;
      }
    } catch(e) {
      window.location.href = url;
    }
  }

  function orderViaWhatsApp(productId) {
    const prod = RESIN_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const imgUrl = prod.image.startsWith('http') ? prod.image : `${DOMAIN_URL}/${prod.image.replace(/^\.\//, '')}`;
    const mrp = prod.mrp || Math.round(prod.price * 1.5);

    const msg = 
`✨💎 *AURA RESIN ATELIER — BESPOKE ART ORDER* 💎✨
════════════════════════════════
🛍️ *ITEM DETAILS:*
════════════════════════════════
🏷️ *Product:* ${prod.title}
💎 *Collection:* ${prod.categoryLabel}
💰 *Prepaid Price:* ₹${prod.price.toLocaleString('en-IN')} (MRP: ₹${mrp.toLocaleString('en-IN')})
🔢 *Quantity:* 1 Piece

🖼️ *Product Image Preview:*
${imgUrl}

════════════════════════════════
💳 *Payment Mode:* 100% Prepaid via UPI QR Code
📍 *Free Kashmir Delivery on ₹999+*
════════════════════════════════
🙏 *Hello!* I want to place a prepaid order for this handcrafted piece. Please send your *UPI QR Code / Payment details* so I can pay and confirm!`;

    openWhatsApp(msg);
  }

  function checkoutCartWhatsApp() {
    if (state.cart.length === 0) {
      alert("Your shopping bag is empty! Please add a piece or design a keepsake.");
      return;
    }

    let itemsFormatted = '';
    let subtotal = 0;
    state.cart.forEach((item, idx) => {
      const imgUrl = item.image.startsWith('http') ? item.image : `${DOMAIN_URL}/${item.image.replace(/^\.\//, '')}`;
      itemsFormatted += 
`🔸 *${idx + 1}. ${item.title}*
   • Qty: ${item.qty} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.price * item.qty).toLocaleString('en-IN')}
` + (item.customNote ? `   • Customization: ${item.customNote}\n` : '') +
`   • Photo Preview: ${imgUrl}\n\n`;
      subtotal += item.price * item.qty;
    });

    const delivery = subtotal >= 999 ? 0 : 60;
    const grandTotal = subtotal + delivery;

    const msg = 
`✨💎 *AURA RESIN ATELIER — SHOPPING BAG ORDER* 💎✨
════════════════════════════════
🛍️ *SELECTED ITEMS:*
════════════════════════════════
${itemsFormatted}────────────────────────────────
🧾 *Items Subtotal:* ₹${subtotal.toLocaleString('en-IN')}
🚚 *Delivery:* ${delivery === 0 ? 'FREE (Kashmir Promo)' : '₹60'}
💰 *Grand Total Payable:* ₹${grandTotal.toLocaleString('en-IN')} *(100% PREPAID)*
════════════════════════════════
💳 *Payment Mode:* 100% Prepaid via UPI QR Code
════════════════════════════════
🙏 *Hello!* I am ready to confirm my handcrafted resin order. Please send your *UPI QR Code* on this chat so I can pay and confirm my order!`;

    openWhatsApp(msg);
  }

  // 9. ORDER CUSTOM PHOTO & NAME STUDIO PIECE VIA WHATSAPP
  function orderSimulatorPieceWhatsApp() {
    const isHeart = state.customCraftShape === 'heart';
    const craftName = isHeart ? '💖 Heart Photo Keepsake / Keychain' : '⭕ Round Geode & Gold Keychain';
    const price = isHeart ? 899 : 299;
    const mrp = isHeart ? 1499 : 599;
    const trimNames = {
      gold: '24K Gold Foil Flakes & Crystal Clear',
      rose: 'Kashmiri Red Rose Petals + Gold Leaf',
      ocean: 'Ocean Wave Coastal Cyan & Sand',
      obsidian: 'Midnight Obsidian Black + Gold Leaf'
    };
    const trimLabel = trimNames[state.customTrim] || '24K Gold Foil Flakes';
    const demoImg = isHeart ? 'images/resin/demo-heart-keychain.jpg' : 'images/resin/demo-round-keychain.jpg';
    const showcaseUrl = `${DOMAIN_URL}/${demoImg}`;

    const msg = 
`✨💎 *AURA RESIN ATELIER — BESPOKE KEEPSAKE ORDER* 💎✨
════════════════════════════════
🛍️ *CUSTOM CRAFT DETAILS:*
════════════════════════════════
🏷️ *Craft Selected:* ${craftName}
💰 *Prepaid Price:* ₹${price.toLocaleString('en-IN')} (MRP: ₹${mrp.toLocaleString('en-IN')})
🎨 *Resin Style:* ${trimLabel}
✍️ *Custom Name / Inscription:* "${state.customName || 'Rahul & Riya'}"
📸 *Photo Attachment:* ${state.customPhotoData ? 'I will send my custom photo in this chat!' : 'Please craft matching the reference demo!'}

🖼️ *Design Reference Preview:*
${showcaseUrl}

════════════════════════════════
💳 *Payment Mode:* 100% Prepaid via UPI QR Code
📍 *Delivery:* Handcrafted & Shipped across Kashmir & India
════════════════════════════════
🙏 *Hello Atelier!* I want to place this custom prepaid order. Please send me your *UPI QR Code* on this chat so I can pay and confirm!`;

    openWhatsApp(msg);
  }

  // 10. PREPAID ONLINE CHECKOUT VIA RAZORPAY
  function buySimulatorPieceOnline() {
    const isHeart = state.customCraftShape === 'heart';
    const defaultImg = isHeart ? 'images/resin/demo-heart-keychain.jpg' : 'images/resin/demo-round-keychain.jpg';
    const customItem = {
      id: 'custom-' + Date.now(),
      title: isHeart ? 'Custom 💖 Heart Keepsake / Keychain (Photo & Name)' : 'Custom ⭕ Round Geode & Gold Keychain (Name)',
      price: isHeart ? 899 : 299,
      mrp: isHeart ? 1499 : 599,
      qty: 1,
      image: state.customPhotoData || defaultImg,
      categoryLabel: 'Custom Photo Keepsake',
      customNote: `Name: "${state.customName || 'Rahul & Riya'}" | Style: ${state.customTrim} | Shape: ${state.customCraftShape}`,
      isCustom: true
    };
    openCheckoutModal([customItem]);
  }
      image: state.customPhotoData || 'images/resin/resin-wedding-cube.jpg',
      categoryLabel: 'Custom Photo Keepsake',
      customNote: `Name: "${state.customName}" | Style: ${state.customTrim} | Shape: ${state.customCraftShape}`,
      isCustom: true
    };
    openCheckoutModal([customItem]);
  }

  function openCheckoutModal(customItems) {
    const items = customItems || state.cart;
    if (!items || items.length === 0) {
      alert("Your bag is empty! Please choose a product or design a keepsake.");
      return;
    }
    state.checkoutItems = items;

    const summaryBox = document.getElementById('checkoutSummaryBox');
    const subtotalEl = document.getElementById('checkoutItemsTotal');
    const deliveryEl = document.getElementById('checkoutDeliveryFee');
    const finalTotalEl = document.getElementById('checkoutFinalTotal');
    const payBtnText = document.getElementById('btnPayRazorpayText');

    let subtotal = 0;
    let html = '';
    items.forEach(item => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;
      html += `
        <div class="checkout-summary-item">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${item.image}" alt="" style="width:40px; height:40px; border-radius:8px; object-fit:cover; border:1px solid #e2e8f0;">
            <div>
              <strong style="color:#1e293b; font-size:13px; display:block;">${item.title}</strong>
              <small style="color:#64748b;">Qty: ${item.qty} &bull; ₹${item.price.toLocaleString('en-IN')}${item.customNote ? ` &bull; ${item.customNote}` : ''}</small>
            </div>
          </div>
          <strong style="color:#b45309; font-size:13.5px;">₹${lineTotal.toLocaleString('en-IN')}</strong>
        </div>
      `;
    });

    const delivery = subtotal >= 999 ? 0 : 60;
    const grandTotal = subtotal + delivery;

    if (summaryBox) summaryBox.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
    if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'FREE (Kashmir Promo)' : '₹60';
    if (finalTotalEl) finalTotalEl.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    if (payBtnText) payBtnText.textContent = `Pay Online via Razorpay • ₹${grandTotal.toLocaleString('en-IN')}`;

    const modal = document.getElementById('artCheckoutModal');
    if (modal) modal.style.display = 'flex';
    toggleCartDrawer(false);
  }

  function closeCheckoutModal() {
    const modal = document.getElementById('artCheckoutModal');
    if (modal) modal.style.display = 'none';
  }

  function submitPrepaidOrder(event) {
    if (event && event.preventDefault) event.preventDefault();

    const name = document.getElementById('checkoutName')?.value.trim();
    const phone = document.getElementById('checkoutPhone')?.value.trim();
    const address = document.getElementById('checkoutAddress')?.value.trim();
    const district = document.getElementById('checkoutDistrict')?.value.trim();
    const pincode = document.getElementById('checkoutPincode')?.value.trim();

    if (!name || !phone || !address || !district || !pincode) {
      alert("Please complete all shipping address fields.");
      return;
    }

    if (typeof Razorpay === 'undefined') {
      alert("Razorpay Payment Gateway is still loading. Please check internet connection or choose WhatsApp checkout.");
      return;
    }

    const items = state.checkoutItems.length > 0 ? state.checkoutItems : state.cart;
    const subtotal = items.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const delivery = subtotal >= 999 ? 0 : 60;
    const grandTotal = subtotal + delivery;

    const payBtn = document.getElementById('btnPayRazorpay');
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Connecting to Secure Razorpay...';
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(grandTotal * 100),
      currency: "INR",
      name: "Aura Resin Atelier",
      description: `Prepaid Bespoke Resin Order (${items.length} items)`,
      image: `${DOMAIN_URL}/images/resin/resin-quran-stand.jpg`,
      handler: function(response) {
        onRazorpayPaymentSuccess(response, {
          items,
          name,
          phone,
          address,
          district,
          pincode,
          subtotal,
          delivery,
          grandTotal
        });
      },
      prefill: {
        name: name,
        contact: phone
      },
      theme: {
        color: "#d97706"
      },
      modal: {
        ondismiss: function() {
          if (payBtn) {
            payBtn.disabled = false;
            payBtn.innerHTML = `<i class="fa-solid fa-lock"></i> <span id="btnPayRazorpayText">Pay Online via Razorpay • ₹${grandTotal.toLocaleString('en-IN')}</span>`;
          }
        }
      }
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function(resp) {
        alert("Payment Unsuccessful: " + ((resp && resp.error && resp.error.description) ? resp.error.description : "Transaction could not be completed."));
        if (payBtn) {
          payBtn.disabled = false;
          payBtn.innerHTML = `<i class="fa-solid fa-lock"></i> <span id="btnPayRazorpayText">Pay Online via Razorpay • ₹${grandTotal.toLocaleString('en-IN')}</span>`;
        }
      });
      rzp.open();
    } catch(err) {
      console.error("Razorpay error:", err);
      alert("Could not initialize Razorpay: " + (err.message || "Please check internet"));
      if (payBtn) {
        payBtn.disabled = false;
        payBtn.innerHTML = `<i class="fa-solid fa-lock"></i> <span id="btnPayRazorpayText">Pay Online via Razorpay • ₹${grandTotal.toLocaleString('en-IN')}</span>`;
      }
    }
  }

  function checkoutWithWhatsAppPrepaid() {
    const name = document.getElementById('checkoutName')?.value.trim() || 'Valued Client';
    const phone = document.getElementById('checkoutPhone')?.value.trim() || '';
    const address = document.getElementById('checkoutAddress')?.value.trim() || 'Kashmir';
    const district = document.getElementById('checkoutDistrict')?.value.trim() || '';
    const pincode = document.getElementById('checkoutPincode')?.value.trim() || '';

    const items = state.checkoutItems.length > 0 ? state.checkoutItems : state.cart;
    if (items.length === 0) return;

    let itemsFormatted = '';
    let subtotal = 0;
    items.forEach((item, idx) => {
      const imgUrl = item.image.startsWith('http') ? item.image : `${DOMAIN_URL}/${item.image.replace(/^\.\//, '')}`;
      itemsFormatted += 
`🔸 *${idx + 1}. ${item.title}*
   • Qty: ${item.qty} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.price * item.qty).toLocaleString('en-IN')}
` + (item.customNote ? `   • Customization: ${item.customNote}\n` : '') +
`   • Photo Preview: ${imgUrl}\n\n`;
      subtotal += item.price * item.qty;
    });

    const delivery = subtotal >= 999 ? 0 : 60;
    const grandTotal = subtotal + delivery;

    const msg = 
`✨💎 *AURA RESIN ATELIER — PREPAID ORDER VIA WHATSAPP* 💎✨
════════════════════════════════
🛍️ *ORDER PIECES (100% PREPAID):*
════════════════════════════════
${itemsFormatted}────────────────────────────────
🧾 *Items Subtotal:* ₹${subtotal.toLocaleString('en-IN')}
🚚 *Delivery:* ${delivery === 0 ? 'FREE (Kashmir Promo)' : '₹60'}
💰 *Grand Total Payable:* ₹${grandTotal.toLocaleString('en-IN')} *(PREPAID ONLY)*
════════════════════════════════
👤 *Customer Name:* ${name}
📱 *Phone:* ${phone}
📍 *Shipping Address:* ${address}, ${district} - ${pincode}
════════════════════════════════
🙏 *Hello!* I have filled out my delivery details for this bespoke resin order. Please send your official payment QR code / UPI ID to confirm this prepaid order!`;

    openWhatsApp(msg);
  }

  function onRazorpayPaymentSuccess(response, orderData) {
    const orderId = 'AURA-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const txnId = response.razorpay_payment_id || 'TXN-' + Date.now();

    const orderRecord = {
      id: orderId,
      orderId: orderId,
      date: new Date().toISOString(),
      items: orderData.items,
      productTitle: orderData.items.map(i => `${i.title} (x${i.qty})`).join(', '),
      customerName: orderData.name,
      phone: orderData.phone,
      address: `${orderData.address}, ${orderData.district} - ${orderData.pincode}`,
      total: orderData.grandTotal,
      paid: true,
      paymentMethod: 'Razorpay Online Prepaid',
      transactionId: txnId,
      status: 'Confirmed (Paid Online)',
      category: 'resin'
    };

    // Save to local resin orders
    try {
      const existingResin = JSON.parse(localStorage.getItem('aura_resin_orders') || '[]');
      existingResin.unshift(orderRecord);
      localStorage.setItem('aura_resin_orders', JSON.stringify(existingResin));
    } catch(e) {}

    // Sync to jk_orders for seller panel visibility
    try {
      const existingJk = JSON.parse(localStorage.getItem('jk_orders') || '[]');
      existingJk.unshift(orderRecord);
      localStorage.setItem('jk_orders', JSON.stringify(existingJk));
    } catch(e) {}

    // Clear cart if ordered from cart
    if (state.checkoutItems === state.cart) {
      state.cart = [];
      persistState();
      updateCartUI();
    }
    state.checkoutItems = [];

    closeCheckoutModal();

    // Render Success Screen
    const receiptEl = document.getElementById('orderReceiptSummary');
    if (receiptEl) {
      receiptEl.innerHTML = `
        <div class="receipt-row"><span>Order ID:</span><strong>${orderId}</strong></div>
        <div class="receipt-row"><span>Razorpay Payment ID:</span><span style="font-family:monospace; color:#059669; font-weight:700;">${txnId}</span></div>
        <div class="receipt-row"><span>Customer:</span><span>${orderData.name} (${orderData.phone})</span></div>
        <div class="receipt-row"><span>Delivery To:</span><span>${orderData.district} - ${orderData.pincode}</span></div>
        <div class="receipt-row" style="font-weight:800; color:#b45309;"><span>Total Paid (Prepaid):</span><span>₹${orderData.grandTotal.toLocaleString('en-IN')}</span></div>
      `;
    }

    const btnWa = document.getElementById('btnSendWaReceipt');
    if (btnWa) {
      btnWa.onclick = function() {
        const waMsg = 
`✨💎 *AURA RESIN ATELIER — PAYMENT CONFIRMED* 💎✨
════════════════════════════════
🧾 *Order ID:* ${orderId}
💳 *Razorpay Txn ID:* ${txnId}
💰 *Total Paid:* ₹${orderData.grandTotal.toLocaleString('en-IN')} (Prepaid)
👤 *Customer:* ${orderData.name} (${orderData.phone})
📍 *Shipping To:* ${orderData.address}, ${orderData.district} - ${orderData.pincode}
════════════════════════════════
🙏 My payment was successful on Razorpay! Please confirm receipt and begin crafting my piece.`;
        openWhatsApp(waMsg);
      };
    }

    const successModal = document.getElementById('artOrderSuccessModal');
    if (successModal) successModal.style.display = 'flex';
  }

  function closeSuccessModal() {
    const successModal = document.getElementById('artOrderSuccessModal');
    if (successModal) successModal.style.display = 'none';
  }

  // 11. BESPOKE INQUIRY FORM DISPATCH
  function handleBespokeInquiry(e) {
    if (e && e.preventDefault) e.preventDefault();

    const name = document.getElementById('bespokeName')?.value.trim() || 'Client';
    const type = document.getElementById('bespokeType')?.value || 'Wedding Flower Preservation';
    const deadline = document.getElementById('bespokeDeadline')?.value || 'Flexible';
    const details = document.getElementById('bespokeDetails')?.value.trim() || 'Custom bespoke design';

    const msg = `💍 *Bespoke Custom Resin Inquiry - Aura Resin Atelier*\n\n` +
                `👤 *Client Name:* ${name}\n` +
                `💎 *Project Type:* ${type}\n` +
                `📅 *Required By:* ${deadline}\n` +
                `📝 *Details & Vision:*\n"${details}"\n\n` +
                `Looking forward to your consultation and quotation!`;

    window.open(`https://wa.me/919622605714?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // 11. WISHLIST
  function toggleWishlist(productId) {
    if (state.wishlist.includes(productId)) {
      state.wishlist = state.wishlist.filter(id => id !== productId);
    } else {
      state.wishlist.push(productId);
    }
    const wishBadge = document.getElementById('wishlistCountBadge');
    if (wishBadge) wishBadge.textContent = state.wishlist.length;
    renderProducts();
    persistState();
  }

  // 12. INITIALIZATION
  document.addEventListener('DOMContentLoaded', () => {
    purgeLegacyNavLinks();
    renderProducts();
    initSimulator();
    updateCartUI();

    const wishBadge = document.getElementById('wishlistCountBadge');
    if (wishBadge) wishBadge.textContent = state.wishlist.length;

    // Filter pill buttons
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeCategory = pill.getAttribute('data-filter') || 'all';
        renderProducts();
      });
    });

    // Close modal on backdrop click
    const modal = document.getElementById('quickViewModal');
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeQuickView();
      });
    }

    // Close cart drawer on overlay click
    const drawerOverlay = document.getElementById('cartDrawerOverlay');
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', e => {
        if (e.target === drawerOverlay) toggleCartDrawer(false);
      });
    }
  });

  // Global API
  window.auraAtelier = {
    addToCart,
    updateQty,
    removeItem,
    toggleCartDrawer,
    openQuickView,
    closeQuickView,
    addFromModal,
    buyNowOnline,
    orderViaWhatsApp,
    checkoutCartWhatsApp,
    handleBespokeInquiry,
    toggleWishlist,
    // Custom Photo & Name Studio
    setCustomCraftShape,
    handleCustomPhotoUpload,
    updateCustomNameText,
    setResinTrim,
    buySimulatorPieceOnline,
    orderSimulatorPieceWhatsApp,
    // Prepaid Razorpay Checkout
    openCheckoutModal,
    closeCheckoutModal,
    submitPrepaidOrder,
    checkoutWithWhatsAppPrepaid,
    closeSuccessModal
  };

})();

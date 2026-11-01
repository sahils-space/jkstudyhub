/* ==========================================================================
   AURA RESIN ATELIER - SHOPIFY-STYLE STOREFRONT CONTROLLER
   Handcrafted in Kashmir • Pure Crystal Artisanship
   ========================================================================== */

(function() {
  'use strict';

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
      image: 'images/resin/resin-bookmark.jpg',
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
      image: 'images/resin/resin-keychain.jpg',
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
      image: 'images/resin/resin-quran-stand.jpg',
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
      image: 'images/resin/resin-clock.jpg',
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
      image: 'images/resin/resin-coasters.jpg',
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
      image: 'images/resin/resin-ayat-frame.jpg',
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
      image: 'images/resin/resin-wedding-cube.jpg',
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
      image: 'images/resin/resin-tray.jpg',
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
      image: 'images/resin/resin-pen-stand.jpg',
      description: 'Heavyweight cylindrical & square desk vessels cast with crystal-clear resin, real embedded wildflower sprigs, floating bubbles, and ocean blue gradient bases. Perfect for holding study pens, makeup brushes, or desk scissors.',
      specs: ['Height: 10cm | Width: 7.5cm', 'Cast with real dried alpine wildflowers', 'Heavy non-toppling crystal base', 'Smooth rounded lip']
    }
  ];

  // 2. STATE MANAGEMENT
  let state = {
    cart: [],
    wishlist: [],
    activeCategory: 'all',
    customInitial: 'S',
    customColor: 'radial-gradient(circle at 30% 30%, #1e3a8a, #0f172a)',
    customFoil: 'gold'
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

  // 3. RENDER PRODUCTS
  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const filtered = state.activeCategory === 'all' 
      ? RESIN_PRODUCTS 
      : RESIN_PRODUCTS.filter(p => p.category === state.activeCategory);

    grid.innerHTML = filtered.map(p => {
      const isWish = state.wishlist.includes(p.id);
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
              <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
              <span class="product-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>
              <span class="product-save-pill">Save ₹${(p.mrp - p.price).toLocaleString('en-IN')}</span>
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

  // 5. 3D RESIN CUSTOM SIMULATOR LOGIC
  function initSimulator() {
    const canvas = document.getElementById('simResinCanvas');
    const initialDisplay = document.getElementById('simInitialDisplay');
    const input = document.getElementById('simTextInput');
    if (!canvas || !initialDisplay || !input) return;

    input.addEventListener('input', e => {
      const val = (e.target.value || 'S').trim().charAt(0).toUpperCase();
      state.customInitial = val || 'S';
      initialDisplay.textContent = state.customInitial;
    });

    // Swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        colorSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        state.customColor = swatch.getAttribute('data-bg');
        canvas.style.background = state.customColor;
      });
    });

    // 3D tilt tracking for simulator canvas
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      canvas.style.transform = `rotateY(${x * 0.15}deg) rotateX(${-y * 0.15}deg)`;
    });

    canvas.addEventListener('mouseleave', () => {
      canvas.style.transform = 'rotateY(-8deg) rotateX(8deg)';
    });
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

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({
        id: prod.id,
        title: prod.title,
        price: prod.price,
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
          <span style="font-size:24px; font-weight:800; color:var(--bg-dark);">₹${prod.price.toLocaleString('en-IN')}</span>
          <span class="product-mrp" style="font-size:16px;">₹${prod.mrp.toLocaleString('en-IN')}</span>
          <span class="product-save-pill">Save ₹${(prod.mrp - prod.price).toLocaleString('en-IN')}</span>
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

        <div style="display:flex; gap:10px; margin-top:auto;">
          <button type="button" class="btn-luxury-primary" style="flex-grow:1; justify-content:center;" onclick="window.auraAtelier.addFromModal('${prod.id}')">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
          <button type="button" class="btn-card-wa" style="padding:14px 18px; font-size:18px;" onclick="window.auraAtelier.orderViaWhatsApp('${prod.id}')">
            <i class="fa-brands fa-whatsapp"></i>
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

  // 8. 1-CLICK WHATSAPP CHECKOUT & ORDER DISPATCH
  function orderViaWhatsApp(productId) {
    const prod = RESIN_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const msg = `✨ *Hello Aura Resin Atelier!* \n\n` +
                `I would like to order this handcrafted resin piece:\n\n` +
                `📌 *Item:* ${prod.title}\n` +
                `💎 *Collection:* ${prod.categoryLabel}\n` +
                `💰 *Price:* ₹${prod.price.toLocaleString('en-IN')} (MRP: ₹${prod.mrp.toLocaleString('en-IN')})\n\n` +
                `Please let me know customization options, lead time, and Kashmir delivery details!`;

    window.open(`https://wa.me/919622605714?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function checkoutCartWhatsApp() {
    if (state.cart.length === 0) return;

    let itemsList = '';
    let total = 0;
    state.cart.forEach((item, idx) => {
      itemsList += `${idx + 1}. ${item.title} (Qty: ${item.qty}) - ₹${(item.price * item.qty).toLocaleString('en-IN')}\n`;
      if (item.customNote) itemsList += `   └ ${item.customNote}\n`;
      total += item.price * item.qty;
    });

    const msg = `✨ *Aura Resin Atelier - New Order Request* \n\n` +
                `Hello! I want to confirm my resin order:\n\n` +
                itemsList + `\n` +
                `🧾 *Total Amount:* ₹${total.toLocaleString('en-IN')}\n` +
                `📍 *Delivery Location:* Kashmir / J&K\n\n` +
                `Please share payment details (UPI/COD) and dispatch schedule!`;

    window.open(`https://wa.me/919622605714?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // 9. ORDER SIMULATOR PIECE VIA WHATSAPP
  function orderSimulatorCustomPiece() {
    const letter = state.customInitial;
    const msg = `✨ *Hello Aura Resin Atelier!* \n\n` +
                `I designed a custom botanical initial piece on your 3D simulator:\n\n` +
                `🔤 *Initial / Letter:* "${letter}"\n` +
                `🎨 *Base Tone:* Custom Selected\n` +
                `✨ *Foil Accent:* 24K Gold Leaf\n\n` +
                `Could you please craft this for me? Let me know the price and delivery timeline.`;

    window.open(`https://wa.me/919622605714?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // 10. BESPOKE INQUIRY FORM DISPATCH
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
    orderViaWhatsApp,
    checkoutCartWhatsApp,
    orderSimulatorCustomPiece,
    handleBespokeInquiry,
    toggleWishlist
  };

})();

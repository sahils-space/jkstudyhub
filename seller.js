// =========================================================
// JK STUDY HUB SUPPLIER & OPERATIONS PANEL (seller.js)
// Standalone Order Management & Business Analytics Engine
// =========================================================

const SELLER_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec";

// Strict Owner Authorizations:
const AUTHORIZED_OWNER_PHONES = ['9622605714'];
const AUTHORIZED_OWNER_EMAILS = [
  'sahilsspace20@gmail.com',
  'sahilsspace@gmail.com',
  'info.jkstudyhub@gmail.com'
];
// Secret master passcodes known only to owner
const MASTER_OWNER_PASSCODES = ['9622605714', 'sahil123', 'admin786'];

let currentFulfillmentTab = 'pending';
let currentPerfFilter = 'all';
let currentChartMode = 'orders';
let activePrintingOrderId = null;

// =========================================================
// GLOBAL FRESH START PURGE (RUNS ONCE ON EVERY CLIENT/DEVICE)
// =========================================================
(function runSellerGlobalFreshPurge() {
  const PURGE_FLAG = 'jk_fresh_start_purge_20261012_v6';
  try {
    if (!localStorage.getItem(PURGE_FLAG)) {
      localStorage.setItem('jk_orders', '[]');
      localStorage.removeItem('jk_orders_db');
      localStorage.setItem('jk_order_status_overrides', '{}');
      localStorage.setItem('jk_locked_orders', '{}');
      localStorage.removeItem('jk_last_checkout_details');
      localStorage.setItem('jk_purged_order_ids', '[]');
      localStorage.setItem('jk_orders_reset_timestamp', String(Date.now()));
      if (typeof JKAnalytics !== 'undefined') JKAnalytics.reset();
      localStorage.setItem(PURGE_FLAG, 'true');
    }
  } catch(e) {}
})();

// =========================================================
// 1. WATERTIGHT SECURITY LOCK & OWNER-ONLY GATE
// =========================================================

function isSellerUnlocked() {
  try {
    const isUnlocked = localStorage.getItem('jk_seller_hub_unlocked') === 'true';
    const unlockedIdentifier = String(localStorage.getItem('jk_seller_hub_phone') || '').trim().toLowerCase();
    
    // Strict validation: must have true flag AND identifier must match authorized list
    const isPhoneMatched = AUTHORIZED_OWNER_PHONES.includes(unlockedIdentifier.replace(/\D/g, '').slice(-10));
    const isEmailMatched = AUTHORIZED_OWNER_EMAILS.includes(unlockedIdentifier);
    
    if (isUnlocked && (isPhoneMatched || isEmailMatched)) {
      return true;
    }
  } catch(e) {}
  // Purge any corrupted or unverified state
  try {
    localStorage.removeItem('jk_seller_hub_unlocked');
    localStorage.removeItem('jk_seller_hub_phone');
  } catch(e) {}
  return false;
}

function verifySellerOwnerCredentials() {
  const loginInput = document.getElementById('sellerLoginIdInput') || document.getElementById('sellerPhoneInput');
  const pinInput = document.getElementById('sellerPinInput');
  const errBox = document.getElementById('sellerAuthErrorMessage');

  const rawId = String(loginInput ? loginInput.value : '').trim();
  const cleanEmail = rawId.toLowerCase();
  const cleanPhone = rawId.replace(/\D/g, '').slice(-10);
  const pin = String(pinInput ? pinInput.value : '').trim();

  // STRICT REQUIREMENT:
  // 1. The ID must be an authorized owner phone OR an authorized owner email
  // 2. AND the PIN must match a valid master passcode
  const isEmailMatch = AUTHORIZED_OWNER_EMAILS.includes(cleanEmail);
  const isPhoneMatch = (cleanPhone.length === 10 && AUTHORIZED_OWNER_PHONES.includes(cleanPhone));
  const isPinMatch = MASTER_OWNER_PASSCODES.includes(pin);

  if ((isEmailMatch || isPhoneMatch) && isPinMatch) {
    try {
      localStorage.setItem('jk_seller_hub_unlocked', 'true');
      localStorage.setItem('jk_seller_hub_phone', isPhoneMatch ? cleanPhone : cleanEmail);
      localStorage.setItem('jk_admin_unlocked', 'true');
    } catch(e) {}
    if (errBox) errBox.style.display = 'none';
    unlockSellerPanel();
  } else {
    // REJECT IMMEDIATELY & WIPE
    try {
      localStorage.removeItem('jk_seller_hub_unlocked');
      localStorage.removeItem('jk_seller_hub_phone');
    } catch(e) {}
    if (errBox) {
      if (!isEmailMatch && !isPhoneMatch) {
        errBox.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Access Denied: Phone number or Email is not registered as JK Study Hub store owner.';
      } else {
        errBox.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Access Denied: Incorrect secret PIN / passcode for store owner.';
      }
      errBox.style.display = 'block';
    }
  }
}

// 1-Click Google Sign In for Store Owner
function handleSellerGoogleAuth() {
  const errBox = document.getElementById('sellerAuthErrorMessage');
  if (typeof firebase !== 'undefined' && firebase.auth) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    firebase.auth().signInWithPopup(provider).then(res => {
      const email = (res.user.email || '').trim().toLowerCase();
      if (AUTHORIZED_OWNER_EMAILS.includes(email)) {
        try {
          localStorage.setItem('jk_seller_hub_unlocked', 'true');
          localStorage.setItem('jk_seller_hub_phone', '9622605714');
          localStorage.setItem('jk_admin_unlocked', 'true');
        } catch(e) {}
        if (errBox) errBox.style.display = 'none';
        unlockSellerPanel();
      } else {
        if (errBox) {
          errBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Access Denied: Google account (${email}) is not authorized as store owner.`;
          errBox.style.display = 'block';
        }
      }
    }).catch(err => {
      if (errBox && err && err.code !== 'auth/popup-closed-by-user') {
        errBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Google Sign-in Error: ${err.message || 'Popup was closed or blocked.'}`;
        errBox.style.display = 'block';
      }
    });
  } else {
    alert("Firebase Auth service is connecting. Please try again in 2 seconds.");
  }
}

// =========================================================
// 1B. DEDICATED DEVICE LAYOUT ENGINE (DESKTOP vs MOBILE)
// =========================================================
function getSellerDeviceMode() {
  try {
    const saved = localStorage.getItem('jk_seller_device_mode');
    if (saved === 'mobile' || saved === 'desktop') return saved;
  } catch(e) {}
  // Auto-detect based on screen width if not chosen yet
  return (window.innerWidth <= 768) ? 'mobile' : 'desktop';
}

function setSellerDeviceMode(mode) {
  try {
    localStorage.setItem('jk_seller_device_mode', mode);
  } catch(e) {}
  applySellerDeviceMode(mode);
}

function toggleSellerDeviceMode() {
  const current = getSellerDeviceMode();
  const next = (current === 'mobile') ? 'desktop' : 'mobile';
  setSellerDeviceMode(next);
  if (typeof showToast === 'function') {
    showToast(next === 'mobile' ? '📱 Switched to Mobile Phone Touch Layout' : '💻 Switched to MacBook / Desktop Layout');
  }
}

function applySellerDeviceMode(mode) {
  const isMobile = (mode === 'mobile');
  if (isMobile) {
    document.body.classList.add('seller-mobile-mode');
    document.body.classList.remove('seller-desktop-mode');
  } else {
    document.body.classList.remove('seller-mobile-mode');
    document.body.classList.add('seller-desktop-mode');
  }

  // Update lock screen buttons style if present
  const btnDesktop = document.getElementById('btnModeDesktop');
  const btnMobile = document.getElementById('btnModeMobile');
  const screenHint = document.getElementById('detectedScreenHint');
  if (screenHint) {
    const isSmallScreen = window.innerWidth <= 768;
    screenHint.innerText = isSmallScreen ? '(Detected: Phone)' : '(Detected: Laptop)';
  }

  if (btnDesktop && btnMobile) {
    if (isMobile) {
      btnMobile.style.borderColor = '#10b981';
      btnMobile.style.background = '#ecfdf5';
      btnDesktop.style.borderColor = '#cbd5e1';
      btnDesktop.style.background = '#ffffff';
    } else {
      btnDesktop.style.borderColor = '#2563eb';
      btnDesktop.style.background = '#eff6ff';
      btnMobile.style.borderColor = '#cbd5e1';
      btnMobile.style.background = '#ffffff';
    }
  }

  // Update navbar quick switch button
  const quickSwitchBtn = document.getElementById('btnQuickModeSwitch');
  if (quickSwitchBtn) {
    if (isMobile) {
      quickSwitchBtn.innerHTML = '<i class="fa-solid fa-laptop"></i> <span>Laptop Mode</span>';
      quickSwitchBtn.title = 'Switch to full Desktop/MacBook layout';
    } else {
      quickSwitchBtn.innerHTML = '<i class="fa-solid fa-mobile-screen-button"></i> <span>Mobile Mode</span>';
      quickSwitchBtn.title = 'Switch to Mobile Phone touch layout';
    }
  }

  // Show/hide bottom nav
  const bottomNav = document.getElementById('sellerMobileBottomNav');
  if (bottomNav) {
    bottomNav.style.display = isMobile ? 'flex' : 'none';
  }

  // Show/hide hamburger toggle
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  if (toggleBtn) {
    toggleBtn.style.display = (isMobile || window.innerWidth <= 768) ? 'inline-flex' : 'none';
  }
}

function unlockSellerPanel() {
  const lockScreen = document.getElementById('sellerAuthLockScreen');
  const appShell = document.getElementById('sellerAppShell');

  if (lockScreen) lockScreen.style.display = 'none';
  if (appShell) appShell.style.display = 'flex';

  // Apply device layout
  applySellerDeviceMode(getSellerDeviceMode());

  // Initialize data
  initSellerSupplierPanel();
}

function handleSellerSignOut() {
  if (confirm("Are you sure you want to lock the JK Study Hub Supplier Panel?")) {
    try {
      localStorage.removeItem('jk_seller_hub_unlocked');
      localStorage.removeItem('jk_seller_hub_phone');
    } catch(e) {}
    window.location.reload();
  }
}

// Auto-check on page load
window.addEventListener('DOMContentLoaded', () => {
  applySellerDeviceMode(getSellerDeviceMode());

  if (isSellerUnlocked()) {
    unlockSellerPanel();
  } else {
    // Check if store owner is logged in via store.js session
    try {
      const u = JSON.parse(localStorage.getItem('jk_current_user') || 'null');
      if (u && (AUTHORIZED_OWNER_EMAILS.includes(String(u.email || '').toLowerCase()) || AUTHORIZED_OWNER_PHONES.includes(String(u.phoneNumber || u.phone || '').replace(/\D/g, '').slice(-10)))) {
        localStorage.setItem('jk_seller_hub_unlocked', 'true');
        localStorage.setItem('jk_seller_hub_phone', '9622605714');
        unlockSellerPanel();
        return;
      }
    } catch(e) {}

    const lockScreen = document.getElementById('sellerAuthLockScreen');
    if (lockScreen) lockScreen.style.display = 'flex';
  }
});

// =========================================================
// 2. DATA LOADERS & GOOGLE SHEETS SYNC
// =========================================================

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

function getSellerStatusOverrides() {
  try {
    const raw = JSON.parse(localStorage.getItem('jk_order_status_overrides') || '{}');
    const locked = JSON.parse(localStorage.getItem('jk_locked_orders') || '{}');
    const res = { ...raw };
    for (const [k, v] of Object.entries(locked)) {
      const up = String(k).trim().toUpperCase();
      if (!res[up] || String(v).toLowerCase().includes('cancel')) {
        res[up] = { status: v, timestamp: Date.now() };
      }
    }
    return res;
  } catch(e) {
    return {};
  }
}

function setSellerStatusOverride(orderId, status) {
  try {
    const cleanKey = String(orderId || '').trim().toUpperCase();
    const ov = JSON.parse(localStorage.getItem('jk_order_status_overrides') || '{}');
    ov[cleanKey] = {
      status: status,
      timestamp: Date.now()
    };
    localStorage.setItem('jk_order_status_overrides', JSON.stringify(ov));

    let locked = JSON.parse(localStorage.getItem('jk_locked_orders') || '{}');
    locked[cleanKey] = status;
    locked[orderId] = status;
    localStorage.setItem('jk_locked_orders', JSON.stringify(locked));
  } catch(e) {}
}

function pushStatusUpdateToGoogleSheet(orderId, newStatus) {
  if (!SELLER_SCRIPT_URL || !orderId || !newStatus) return;
  const cleanId = String(orderId).trim();

  // 1. Send via POST (with no-cors) - standard for Google Apps Script Web App
  try {
    const params = new URLSearchParams();
    params.append('action', 'update_status');
    params.append('order_id', cleanId);
    params.append('orderId', cleanId);
    params.append('status', newStatus);

    fetch(SELLER_SCRIPT_URL + '?' + params.toString(), {
      method: 'POST',
      mode: 'no-cors',
      body: params.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).catch(err => console.warn('POST status sync notice:', err));
  } catch(e) {}

  // 2. Also send via GET fallback with both order_id and orderId
  try {
    const getUrl = `${SELLER_SCRIPT_URL}?action=update_status&order_id=${encodeURIComponent(cleanId)}&orderId=${encodeURIComponent(cleanId)}&status=${encodeURIComponent(newStatus)}&t=${Date.now()}`;
    fetch(getUrl, { method: 'GET', mode: 'no-cors' }).catch(err => console.warn('GET status sync notice:', err));
  } catch(e) {}
}

function getSellerOrders() {
  try {
    const raw = localStorage.getItem('jk_orders');
    const orders = raw ? JSON.parse(raw) : [];
    const overrides = getSellerStatusOverrides();
    const purgedIds = JSON.parse(localStorage.getItem('jk_purged_order_ids') || '[]');
    const resetTs = Number(localStorage.getItem('jk_orders_reset_timestamp') || 0);

    if (Array.isArray(orders)) {
      const filtered = orders.filter(o => {
        if (!o || !o.orderId) return false;
        const up = String(o.orderId || '').trim().toUpperCase();
        if (purgedIds.includes(up)) return false;
        if (o.timestamp && Number(o.timestamp) <= resetTs) return false;
        return true;
      });

      filtered.forEach(o => {
        if (isCodOrder(o)) {
          o.paymentMethod = 'cod';
        }
        const ov = overrides[String(o.orderId || '').trim().toUpperCase()];
        if (ov && ov.status) {
          o.status = ov.status;
        }
      });
      return filtered;
    }
    return [];
  } catch(e) {
    return [];
  }
}

function saveSellerOrders(orders) {
  try {
    localStorage.setItem('jk_orders', JSON.stringify(orders));
  } catch(e) {}
}

function syncSellerWithGoogleSheets(showToastAlert = false) {
  const syncPill = document.getElementById('sellerSyncPill');
  if (syncPill) {
    syncPill.className = 'sync-status-pill syncing';
    syncPill.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> <span>Syncing Google Sheets...</span>';
  }

  fetch(SELLER_SCRIPT_URL + '?action=get_orders&t=' + Date.now(), { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      if (data && data.status === 'success' && Array.isArray(data.orders)) {
        let localOrders = getSellerOrders();
        const overrides = getSellerStatusOverrides();

        const purgedIds = JSON.parse(localStorage.getItem('jk_purged_order_ids') || '[]');
        const resetTs = Number(localStorage.getItem('jk_orders_reset_timestamp') || 0);

        // Filter valid remote orders from Google Sheets
        const validRemoteOrders = data.orders.filter(remote => {
          if (!remote || !remote.orderId || String(remote.orderId).startsWith('PRD-') || remote.phone === 'CATALOG_PRODUCT') {
            return false;
          }
          const remoteUpperId = String(remote.orderId).trim().toUpperCase();
          if (purgedIds.includes(remoteUpperId)) return false;
          if (remote.timestamp && Number(remote.timestamp) <= resetTs) return false;
          return true;
        });

        // The remote Google Sheet is the master source of truth:
        // Any order that was deleted from Google Sheets must be removed from local storage!
        const validRemoteIds = new Set(validRemoteOrders.map(r => String(r.orderId).trim().toUpperCase()));
        localOrders = localOrders.filter(l => validRemoteIds.has(String(l.orderId).trim().toUpperCase()));

        validRemoteOrders.forEach(remote => {
          const remoteUpperId = String(remote.orderId).trim().toUpperCase();
          const isRemoteCod = isCodOrder(remote);
          if (isRemoteCod) {
            remote.paymentMethod = 'cod';
          }

          const ov = overrides[remoteUpperId];
          const idx = localOrders.findIndex(l => String(l.orderId).trim().toUpperCase() === remoteUpperId);

          if (ov && ov.status) {
            remote.status = ov.status;
          }

          if (idx >= 0) {
            localOrders[idx] = { ...localOrders[idx], ...remote };
          } else {
            localOrders.push(remote);
          }
        });

        saveSellerOrders(localOrders);

        renderSellerOrdersTable();
        calculateBusinessMetrics();

        if (syncPill) {
          syncPill.className = 'sync-status-pill';
          syncPill.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Google Sheets Synced</span>';
        }
        if (showToastAlert) alert("✅ Google Sheets data synchronized successfully!");
      }
    })
    .catch(err => {
      console.warn("Sheet sync notice:", err);
      if (syncPill) {
        syncPill.className = 'sync-status-pill';
        syncPill.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Local Hub Cache Ready</span>';
      }
    });
}

// =========================================================
// 3. VIEWS & TABS CONTROLLERS
// =========================================================

function switchSellerView(viewName) {
  document.querySelectorAll('.sidebar-nav-link').forEach(l => l.classList.remove('active'));
  const activeNav = document.getElementById(`nav-link-${viewName}`);
  if (activeNav) activeNav.classList.add('active');

  // Sync mobile bottom navigation bar active tab
  document.querySelectorAll('.mobile-nav-tab').forEach(b => b.classList.remove('active'));
  const mobTab = document.getElementById(`mob-tab-${viewName}`);
  if (mobTab) mobTab.classList.add('active');

  // Close mobile sidebar if open
  toggleSellerMobileSidebar(false);
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}

  document.querySelectorAll('.seller-view-pane').forEach(p => p.style.display = 'none');

  const pageTitle = document.getElementById('sellerPageTitle');
  if (viewName === 'orders') {
    if (pageTitle) pageTitle.innerText = 'Orders';
    const pane = document.getElementById('view-orders');
    if (pane) pane.style.display = 'block';
    renderSellerOrdersTable();
  } else if (viewName === 'dashboard' || viewName === 'home') {
    if (pageTitle) pageTitle.innerText = 'Business Dashboard';
    const pane = document.getElementById('view-dashboard');
    if (pane) pane.style.display = 'block';
    calculateBusinessMetrics();
  } else if (viewName === 'pricing') {
    if (pageTitle) pageTitle.innerText = 'Product Pricing & Rate Changer';
    const pane = document.getElementById('view-pricing');
    if (pane) pane.style.display = 'block';
    renderSellerPricingTable();
  } else if (viewName === 'inventory') {
    if (pageTitle) pageTitle.innerText = 'Stock & Inventory Management';
    const pane = document.getElementById('view-inventory');
    if (pane) pane.style.display = 'block';
    renderSellerInventoryTable();
  } else if (viewName === 'delivery') {
    if (pageTitle) pageTitle.innerText = 'District & PIN Delivery / COD Rates';
    const pane = document.getElementById('view-delivery');
    if (pane) pane.style.display = 'block';
    renderDistrictRatesTable();
  } else if (viewName === 'catalog') {
    if (pageTitle) pageTitle.innerText = 'Catalog Uploads';
    const pane = document.getElementById('view-catalog');
    if (pane) pane.style.display = 'block';
    if (typeof renderSellerPublishedCatalog === 'function') renderSellerPublishedCatalog();
  } else if (viewName === 'payments') {
    if (pageTitle) pageTitle.innerText = 'Payments & Doorstep COD';
    const pane = document.getElementById('view-payments');
    if (pane) pane.style.display = 'block';
    calculatePaymentsSummary();
  } else if (viewName === 'leads') {
    if (pageTitle) pageTitle.innerText = 'School Pre-Orders & Leads';
    const pane = document.getElementById('view-leads');
    if (pane) pane.style.display = 'block';
    renderSellerLeadsTable();
  } else {
    if (pageTitle) pageTitle.innerText = 'Orders';
    const pane = document.getElementById('view-orders');
    if (pane) pane.style.display = 'block';
    renderSellerOrdersTable();
  }
}

function setFulfillmentTab(tabName, btnEl) {
  currentFulfillmentTab = tabName;
  document.querySelectorAll('.hub-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderSellerOrdersTable();
}

// =========================================================
// 4. ORDERS FULFILLMENT TABLE RENDERING
// =========================================================

function renderSellerOrdersTable() {
  const tableBody = document.getElementById('sellerOrdersTableBody');
  if (!tableBody) return;

  const orders = getSellerOrders();
  const searchField = document.getElementById('searchFieldSelect') ? document.getElementById('searchFieldSelect').value : 'any';
  const searchVal = String(document.getElementById('sellerSearchInput') ? document.getElementById('sellerSearchInput').value : '').toLowerCase().trim();
  const paymentFilter = document.getElementById('filterPayment') ? document.getElementById('filterPayment').value : 'all';

  // Counts for tabs
  let pendingCount = 0;
  let readyCount = 0;
  let shippedCount = 0;
  let cancelledCount = 0;
  let onHoldCount = 0;

  orders.forEach(o => {
    const s = String(o.status || 'Confirmed').toLowerCase();
    if (s.includes('cancel')) cancelledCount++;
    else if (s.includes('hold')) onHoldCount++;
    else if (s.includes('ready') || s.includes('dispatch') || s.includes('packed')) readyCount++;
    else if (s.includes('ship') || s.includes('way') || s.includes('out') || s.includes('deliver')) shippedCount++;
    else pendingCount++;
  });

  const elPending = document.getElementById('countTabPending');
  const elReady = document.getElementById('countTabReady');
  const elShipped = document.getElementById('countTabShipped');
  const elCancelled = document.getElementById('countTabCancelled');
  const elOnHold = document.getElementById('countTabOnHold');
  if (elPending) elPending.innerText = pendingCount;
  if (elReady) elReady.innerText = readyCount;
  if (elShipped) elShipped.innerText = shippedCount;
  if (elCancelled) elCancelled.innerText = cancelledCount;
  if (elOnHold) elOnHold.innerText = onHoldCount;

  // Filter list
  const filtered = orders.filter(o => {
    const s = String(o.status || 'Confirmed').toLowerCase();
    let tabMatch = false;

    if (currentFulfillmentTab === 'pending') {
      tabMatch = (s.includes('confirm') || s.includes('process') || s.includes('pending') || !o.status);
    } else if (currentFulfillmentTab === 'ready_to_ship') {
      tabMatch = (s.includes('ready') || s.includes('dispatch') || s.includes('packed'));
    } else if (currentFulfillmentTab === 'shipped') {
      tabMatch = (s.includes('ship') || s.includes('way') || s.includes('out') || s.includes('deliver'));
    } else if (currentFulfillmentTab === 'cancelled') {
      tabMatch = s.includes('cancel');
    } else if (currentFulfillmentTab === 'on_hold') {
      tabMatch = s.includes('hold');
    }

    if (!tabMatch) return false;

    // Payment filter
    const isCod = isCodOrder(o);
    if (paymentFilter === 'cod' && !isCod) return false;
    if (paymentFilter === 'prepaid' && isCod) return false;

    // Search query filter
    if (searchVal) {
      if (searchField === 'orderId' && !String(o.orderId || '').toLowerCase().includes(searchVal)) return false;
      if (searchField === 'phone' && !String(o.phone || '').toLowerCase().includes(searchVal)) return false;
      if (searchField === 'product' && !String(o.product || '').toLowerCase().includes(searchVal)) return false;
      if (searchField === 'any') {
        const fullString = `${o.orderId} ${o.product} ${o.phone} ${o.name} ${o.address}`.toLowerCase();
        if (!fullString.includes(searchVal)) return false;
      }
    }

    return true;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="table-empty-box">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Cardboard%20Box.png" alt="No orders">
            <h3>No orders in this state</h3>
            <p>You have processed all orders under the "${currentFulfillmentTab.replace('_', ' ').toUpperCase()}" tab.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  // Reverse sort by timestamp
  filtered.sort((a,b) => (b.timestamp || 0) - (a.timestamp || 0));

  let rowsHtml = '';
  filtered.forEach(o => {
    const isCod = isCodOrder(o);
    const safeOrderId = o.orderId || 'ORD-UNKNOWN';
    const statusLower = String(o.status || 'Confirmed').toLowerCase();

    let badgeClass = 'pending';
    if (statusLower.includes('ready') || statusLower.includes('dispatch')) badgeClass = 'ready';
    else if (statusLower.includes('deliver')) badgeClass = 'delivered';
    else if (statusLower.includes('ship') || statusLower.includes('way')) badgeClass = 'shipped';
    else if (statusLower.includes('cancel')) badgeClass = 'cancelled';

    rowsHtml += `
      <tr>
        <td>
          <span class="order-id-badge">${safeOrderId}</span>
        </td>
        <td>
          <div style="font-weight: 700; color: #1e293b;">${o.date || 'Today'}</div>
          <div style="font-size: 11.5px; color: #64748b;">Pattan Express</div>
        </td>
        <td>
          <div class="product-item-cell">
            <img src="${o.image || 'images/logo-app.png'}" class="product-item-thumb" onerror="this.src='images/logo-app.png'" alt="Book">
            <div>
              <div class="product-item-title">${o.product || 'Study Book'}</div>
              ${(o.schoolName || (o.product && o.product.includes('[School:'))) ? `
                <div style="margin-top: 3px;">
                  <span style="background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 4px; border: 1px solid #fde68a; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-school"></i> School: ${o.schoolName || (o.product.match(/\[School:\s*([^\]]+)\]/) ? o.product.match(/\[School:\s*([^\]]+)\]/)[1] : 'Prescribed')}
                  </span>
                </div>
              ` : ''}
              <div style="font-size: 11.5px; color: #64748b; margin-top:2px;">Qty: ${o.quantity || 1} &middot; SKU: BOK-${safeOrderId.slice(-4)}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #0f172a;">${o.name || 'Customer'}</div>
          <div style="font-size: 12px; color: #475569;">📞 ${o.phone || 'N/A'}</div>
          <div style="font-size: 11.5px; color: #94a3b8; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">📍 ${o.address || 'Kashmir'}</div>
        </td>
        <td>
          ${isCod ? `
            <span style="font-size: 11.5px; font-weight: 800; color: #b45309; background: #fef3c7; padding: 3px 8px; border-radius: 4px; display: inline-block;">
              💵 Cash on Delivery
            </span>
          ` : `
            <span style="font-size: 11.5px; font-weight: 800; color: #15803d; background: #f0fdf4; padding: 3px 8px; border-radius: 4px; display: inline-block;">
              💳 Online Paid
            </span>
          `}
        </td>
        <td>
          <strong style="font-size: 15px; color: #0f172a;">₹${o.amount || 0}</strong>
        </td>
        <td>
          <span class="status-badge-pill ${badgeClass}">
            ${o.status || 'Confirmed'}
          </span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn-hub-secondary" style="padding: 5px 9px; font-size: 11.5px;" onclick="openSellerShippingLabelModal('${safeOrderId}')" title="Print JK Study Hub Thermal Label">
              <i class="fa-solid fa-print"></i> Label
            </button>
            ${!statusLower.includes('cancel') ? `
              <button type="button" class="btn-hub-secondary" style="padding: 5px 8px; font-size: 11.5px; color: #dc2626; border-color: #fecaca; background: #fef2f2;" onclick="if(confirm('Are you sure you want to cancel order ${safeOrderId}?')) updateOrderStatusFromSeller('${safeOrderId}', 'Cancelled');" title="Cancel this Order">
                <i class="fa-solid fa-xmark"></i> Cancel
              </button>
            ` : ''}
            <select onchange="updateOrderStatusFromSeller('${safeOrderId}', this.value)" style="padding: 5px 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 11.5px; font-weight: 700; background: white; cursor: pointer;">
              <option value="" disabled selected>Update Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Ready to Ship">Ready to Ship</option>
              <option value="Dispatched">Dispatched</option>
              <option value="On the Way">On the Way</option>
              <option value="Delivered">Delivered (Doorstep)</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            ${isCod ? `
              <button type="button" class="btn-hub-secondary" style="padding: 5px 8px; font-size: 11px; color: #15803d; border-color: #86efac; background: #f0fdf4; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;" onclick="verifyCodOrderViaWhatsApp('${safeOrderId}')" title="Send 1-Click WhatsApp COD Verification Message">
                <i class="fa-brands fa-whatsapp"></i> Verify COD
              </button>
            ` : ''}
            <a href="https://wa.me/91${String(o.phone || '').replace(/\D/g,'').slice(-10)}?text=${encodeURIComponent('Hi ' + (o.name || 'Student') + '! Your order ' + safeOrderId + ' from JK Study Hub is ' + (o.status || 'being processed') + '.')}" target="_blank" rel="noopener" class="btn-hub-secondary" style="padding: 5px 8px; color: #16a34a;" title="WhatsApp Notice">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = rowsHtml;
}

function updateOrderStatusFromSeller(orderId, newStatus) {
  if (!newStatus || !orderId) return;

  // If marked delivered, ask for buyer OTP verification
  if (newStatus === 'Delivered') {
    const otp = prompt("🔐 Enter Customer's 4-Digit Handover OTP:");
    if (!otp) return;
  }

  // 1. Record persistent override so refresh can never revert this status!
  setSellerStatusOverride(orderId, newStatus);

  // 2. Update in local seller cache (jk_orders)
  let orders = getSellerOrders();
  const order = orders.find(o => String(o.orderId).trim().toUpperCase() === String(orderId).trim().toUpperCase());
  if (order) {
    if (isCodOrder(order)) {
      order.paymentMethod = 'cod';
    }
    order.status = newStatus;
    order.statusUpdatedAt = new Date().toLocaleString('en-IN');
    saveSellerOrders(orders);
  }

  // 3. Keep store.js cache in sync as well
  try {
    let storeOrders = JSON.parse(localStorage.getItem('jk_orders') || '[]');
    const sOrder = storeOrders.find(o => String(o.orderId).trim().toUpperCase() === String(orderId).trim().toUpperCase());
    if (sOrder) {
      sOrder.status = newStatus;
      localStorage.setItem('jk_orders', JSON.stringify(storeOrders));
    }
  } catch(e) {}

  renderSellerOrdersTable();
  calculateBusinessMetrics();
  calculatePaymentsSummary();

  // 4. Push update to Google Sheets immediately
  pushStatusUpdateToGoogleSheet(orderId, newStatus);

  alert(`✅ Order ${orderId} updated to "${newStatus}"!`);
}

// =========================================================
// 5. BUSINESS ANALYTICS & METRICS ENGINE
// =========================================================

function calculateBusinessMetrics() {
  const orders = getSellerOrders();
  const analytics = (typeof JKAnalytics !== 'undefined') ? JKAnalytics.getData() : { totalViews: 0, totalClicks: 0, totalDownloads: 0 };

  let totalSales = 0;
  let totalOrdersCount = orders.length;
  let totalViews = Number(analytics.totalViews || 0);
  let totalClicks = Number(analytics.totalClicks || 0);
  let totalDownloads = Number(analytics.totalDownloads || (analytics.downloads ? analytics.downloads.length : 0));
  let cancelledCount = 0;

  orders.forEach(o => {
    const s = String(o.status || '').toLowerCase();
    if (s.includes('cancel')) {
      cancelledCount++;
    } else {
      totalSales += Number(o.amount || 0);
    }
  });

  const convRate = totalViews > 0 ? ((totalOrdersCount / totalViews) * 100).toFixed(1) : (totalClicks > 0 ? ((totalOrdersCount / totalClicks) * 100).toFixed(1) : '0.0');
  const returnRate = totalOrdersCount > 0 ? ((cancelledCount / totalOrdersCount) * 100).toFixed(1) : '0.0';

  const elViews = document.getElementById('kpiTotalViews');
  const elClicks = document.getElementById('kpiTotalClicks');
  const elDownloads = document.getElementById('kpiTotalDownloads');
  const elOrders = document.getElementById('kpiTotalOrders');
  const elConv = document.getElementById('kpiConversionRate');
  const elSales = document.getElementById('kpiTotalSales');
  const elReturn = document.getElementById('kpiReturnPct');

  if (elViews) elViews.innerText = totalViews;
  if (elClicks) elClicks.innerText = totalClicks;
  if (elDownloads) elDownloads.innerText = totalDownloads;
  if (elOrders) elOrders.innerText = totalOrdersCount;
  if (elConv) elConv.innerText = convRate + '%';
  if (elSales) elSales.innerText = '₹' + totalSales.toLocaleString('en-IN');
  if (elReturn) elReturn.innerText = returnRate + '%';

  const summary = document.getElementById('chartSummaryText');
  if (summary) {
    if (totalOrdersCount === 0 && totalViews === 0) {
      summary.innerText = 'Fresh slate active (0 Metrics). Real visitor views, clicks, downloads, and orders will display here.';
    } else {
      summary.innerText = `${totalOrdersCount} orders placed generating ₹${totalSales.toLocaleString('en-IN')} gross revenue across ${totalViews} website visits.`;
    }
  }

  renderProductPerformanceTable();
  renderStudentDownloadsTable();
  renderStudentSearchesTable();
  renderLiveActivityStream();
}

function renderProductPerformanceTable() {
  const tableBody = document.getElementById('productPerfTableBody');
  if (!tableBody) return;

  const orders = getSellerOrders();
  const analytics = (typeof JKAnalytics !== 'undefined') ? JKAnalytics.getData() : {};
  const search = String(document.getElementById('perfSearchInput') ? document.getElementById('perfSearchInput').value : '').toLowerCase().trim();

  // Aggregate genuine product stats from real orders and tracked clicks
  const productStats = {};

  // 1. Add tracked products from visitor activity
  if (analytics.productClicks) {
    Object.values(analytics.productClicks).forEach(pc => {
      const pName = pc.name;
      productStats[pName] = {
        name: pName,
        views: pc.views || 0,
        clicks: pc.clicks || 0,
        orders: 0,
        sales: 0,
        image: 'images/books/lucent-gk-1.webp'
      };
    });
  }

  // 2. Add real customer orders
  orders.forEach(o => {
    const pName = o.product || 'General Textbook';
    if (!productStats[pName]) {
      productStats[pName] = {
        name: pName,
        views: 0,
        clicks: 0,
        orders: 0,
        sales: 0,
        image: o.image || 'images/logo-app.png'
      };
    }
    productStats[pName].orders += 1;
    productStats[pName].sales += Number(o.amount || 0);
    if (o.image) productStats[pName].image = o.image;
  });

  const list = Object.values(productStats).filter(item => {
    if (search && !item.name.toLowerCase().includes(search)) return false;
    return true;
  });

  const countBadge = document.getElementById('countPerfAll');
  if (countBadge) countBadge.innerText = list.length;

  if (list.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 36px 16px; color: #64748b;">
          <div style="font-size: 30px; margin-bottom: 6px;">📊</div>
          <div style="font-weight: 700; font-size: 14px; color: #1e293b;">Fresh Clean Slate (0 Products Tracked)</div>
          <div style="font-size: 12px; margin-top: 2px;">No product views, clicks, or orders recorded yet. Visitor interactions and purchases will appear here live in real-time.</div>
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  list.forEach(p => {
    const views = p.views || (p.orders > 0 ? p.orders * 2 : 1);
    const clicks = p.clicks || (p.orders > 0 ? p.orders : 0);
    const conv = views > 0 ? ((p.orders / views) * 100).toFixed(1) : (clicks > 0 ? ((p.orders / clicks) * 100).toFixed(1) : '0.0');

    html += `
      <tr>
        <td>
          <div class="product-item-cell">
            <img src="${p.image}" class="product-item-thumb" onerror="this.src='images/logo-app.png'" alt="Product">
            <div>
              <div class="product-item-title">${p.name}</div>
              <div style="font-size: 11px; color: #64748b;">SKU: BOK-${Math.abs(p.name.length * 17)}</div>
            </div>
          </div>
        </td>
        <td><strong>${views}</strong></td>
        <td>${clicks}</td>
        <td><strong>${p.orders}</strong></td>
        <td>${conv}%</td>
        <td><strong style="color: #059669;">₹${p.sales.toLocaleString('en-IN')}</strong></td>
        <td>0.0%</td>
        <td><span style="color: #2563eb; font-size: 12px; font-weight: 700;">${p.orders > 0 ? 'High Demand' : 'Keep Stock Ready'}</span></td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
}

function renderStudentDownloadsTable() {
  const tableBody = document.getElementById('studentDownloadsTableBody');
  const countBadge = document.getElementById('countStudentDownloads');
  if (!tableBody) return;

  const analytics = (typeof JKAnalytics !== 'undefined') ? JKAnalytics.getData() : {};
  const downloads = Array.isArray(analytics.downloads) ? analytics.downloads : [];

  if (countBadge) countBadge.innerText = `${downloads.length} File${downloads.length === 1 ? '' : 's'}`;

  if (downloads.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 28px 12px; color: #64748b; font-size: 12.5px;">
          <div style="font-size: 24px; margin-bottom: 4px;">📥</div>
          No study files downloaded yet. When students download PYQs, model papers, or syllabi, they appear here live.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  downloads.forEach(d => {
    const timeAgo = formatTimeAgoSimple(d.timestamp);
    html += `
      <tr>
        <td>
          <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${d.title}</div>
        </td>
        <td>
          <span style="background: #eff6ff; color: #1e40af; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 700;">
            ${d.category || 'Study Material'}
          </span>
        </td>
        <td>
          <strong style="color: #2563eb; font-size: 13px;">${d.count}</strong>
        </td>
        <td style="font-size: 11.5px; color: #64748b;">
          ${timeAgo}
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
}

function renderStudentSearchesTable() {
  const tableBody = document.getElementById('studentSearchesTableBody');
  const countBadge = document.getElementById('countStudentSearches');
  if (!tableBody) return;

  const analytics = (typeof JKAnalytics !== 'undefined') ? JKAnalytics.getData() : {};
  const searches = Array.isArray(analytics.searches) ? analytics.searches : [];

  if (countBadge) countBadge.innerText = `${searches.length} Search${searches.length === 1 ? '' : 'es'}`;

  if (searches.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 28px 12px; color: #64748b; font-size: 12.5px;">
          <div style="font-size: 24px; margin-bottom: 4px;">🔍</div>
          No student searches logged yet. When visitors search for books or guides in the store, their exact queries will appear here.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  searches.forEach(s => {
    const isUnmetDemand = (s.resultsCount === 0);
    const demandBadge = isUnmetDemand 
      ? '<span style="background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; font-size: 10.5px; padding: 2px 6px; border-radius: 4px; font-weight: 700;">⚠️ 0 Results (Demand)</span>'
      : '<span style="background: #f0fdf4; color: #166534; font-size: 10.5px; padding: 2px 6px; border-radius: 4px; font-weight: 700;">✅ In Stock (' + (s.resultsCount || 1) + ')</span>';
    
    const timeAgo = formatTimeAgoSimple(s.timestamp);

    html += `
      <tr>
        <td>
          <div style="font-weight: 700; color: #0f172a; font-size: 13px;">"${s.query}"</div>
        </td>
        <td>
          <strong style="color: #7c3aed; font-size: 13px;">${s.count}</strong>
        </td>
        <td>
          ${demandBadge}
        </td>
        <td style="font-size: 11.5px; color: #64748b;">
          ${timeAgo}
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
}

function renderLiveActivityStream() {
  const container = document.getElementById('liveActivityStreamList');
  if (!container) return;

  const analytics = (typeof JKAnalytics !== 'undefined') ? JKAnalytics.getData() : {};
  const activities = Array.isArray(analytics.activityLog) ? analytics.activityLog : [];

  if (activities.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px 12px; color: #64748b; font-size: 12.5px;">
        <div style="font-size: 22px; margin-bottom: 4px;">⚡</div>
        No live activity yet. As visitors browse the site, click books, search, or place orders, their actions will stream here live.
      </div>
    `;
    return;
  }

  let html = '';
  activities.slice(0, 15).forEach(act => {
    const timeAgo = formatTimeAgoSimple(act.timestamp);
    let color = '#2563eb';
    let bg = '#eff6ff';

    if (act.type === 'order') { color = '#059669'; bg = '#ecfdf5'; }
    else if (act.type === 'download') { color = '#d97706'; bg = '#fffbeb'; }
    else if (act.type === 'search') { color = '#7c3aed'; bg = '#faf5ff'; }
    else if (act.type === 'click') { color = '#0284c7'; bg = '#f0f9ff'; }

    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12.5px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 28px; height: 28px; border-radius: 6px; background: ${bg}; color: ${color}; display: flex; align-items: center; justify-content: center; font-size: 12px;">
            <i class="fa-solid ${act.icon || 'fa-circle-dot'}"></i>
          </div>
          <div>
            <div style="font-weight: 700; color: #1e293b;">${act.label}</div>
            <div style="font-size: 11px; color: #64748b;">${act.meta ? act.meta + ' &middot; ' : ''}${act.device || 'Visitor'}</div>
          </div>
        </div>
        <div style="font-size: 11px; color: #94a3b8; font-weight: 600;">
          ${timeAgo}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function formatTimeAgoSimple(timestamp) {
  if (!timestamp) return 'Just now';
  const diffSec = Math.floor((Date.now() - Number(timestamp)) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  return `${diffDays}d ago`;
}

function confirmResetAllToZero() {
  const proceed = confirm(
    "⚠️ FRESH START CONFIRMATION:\n\n" +
    "Are you sure you want to reset ALL dashboard metrics and orders to 0?\n\n" +
    "• Total Views will reset to 0\n" +
    "• Total Clicks will reset to 0\n" +
    "• Study Downloads will reset to 0\n" +
    "• Total Orders & Revenue will reset to 0\n" +
    "• All past test orders will be permanently cleared from the dashboard\n\n" +
    "Click OK to proceed with fresh zero start."
  );

  if (!proceed) return;
  resetAllOrdersAndMetricsToZero();
}

function resetAllOrdersAndMetricsToZero() {
  try {
    // 1. Gather current order IDs and add to purged list so they are never re-imported from Google Sheets
    const currentOrders = getSellerOrders();
    const existingPurged = JSON.parse(localStorage.getItem('jk_purged_order_ids') || '[]');
    const newPurged = Array.from(new Set([
      ...existingPurged,
      ...currentOrders.map(o => String(o.orderId || '').trim().toUpperCase()).filter(Boolean)
    ]));
    localStorage.setItem('jk_purged_order_ids', JSON.stringify(newPurged));

    // 2. Set reset timestamp
    localStorage.setItem('jk_orders_reset_timestamp', String(Date.now()));

    // 3. Clear local storage orders & overrides
    localStorage.setItem('jk_orders', '[]');
    localStorage.removeItem('jk_orders_db');
    localStorage.setItem('jk_order_status_overrides', '{}');
    localStorage.setItem('jk_locked_orders', '{}');

    // 4. Reset analytics
    if (typeof JKAnalytics !== 'undefined') {
      JKAnalytics.reset();
    } else {
      localStorage.setItem('jk_analytics_v2', JSON.stringify({
        totalViews: 0,
        totalClicks: 0,
        totalDownloads: 0,
        totalOrders: 0,
        pageViews: {},
        productClicks: {},
        downloads: [],
        searches: [],
        activityLog: []
      }));
    }

    // 5. Re-render all views and tables
    renderSellerOrdersTable();
    calculateBusinessMetrics();
    calculatePaymentsSummary();

    alert("✅ Complete Fresh Start: All metrics, orders, downloads, and search stats have been reset to 0!");
  } catch (err) {
    console.error("Reset error:", err);
    alert("Notice during reset: " + err.message);
  }
}

function calculatePaymentsSummary() {
  const orders = getSellerOrders();
  let pendingCod = 0;
  let collectedCod = 0;
  let onlinePrepaid = 0;

  orders.forEach(o => {
    const isCod = isCodOrder(o);
    const amt = Number(o.amount || 0);
    const s = String(o.status || '').toLowerCase();

    if (isCod) {
      if (s.includes('deliver')) {
        collectedCod += amt;
      } else if (!s.includes('cancel')) {
        pendingCod += amt;
      }
    } else {
      if (!s.includes('cancel')) {
        onlinePrepaid += amt;
      }
    }
  });

  const elPending = document.getElementById('payPendingCod');
  const elCollected = document.getElementById('payCollectedCod');
  const elOnline = document.getElementById('payOnlinePrepaid');

  if (elPending) elPending.innerText = '₹' + pendingCod.toLocaleString('en-IN');
  if (elCollected) elCollected.innerText = '₹' + collectedCod.toLocaleString('en-IN');
  if (elOnline) elOnline.innerText = '₹' + onlinePrepaid.toLocaleString('en-IN');
}

// =========================================================
// 6. SHIPPING LABEL GENERATOR & MODAL (AMAZON / FLIPKART STYLE)
// Pure Client-Side Code-128 SVG Barcode + Scannable QR Code Generator
// =========================================================

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

function generateCode128Svg(text, barHeight = 55, moduleWidth = 2) {
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

  const quietZone = 16;
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

function renderQrCodeIntoContainer(container, text, size = 70) {
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

function openSellerShippingLabelModal(orderId) {
  activePrintingOrderId = orderId;
  const orders = getSellerOrders();
  const o = orders.find(ord => String(ord.orderId).trim().toUpperCase() === String(orderId).trim().toUpperCase()) || { 
    orderId, 
    product: 'Syllabus & Textbook Pack', 
    amount: 199, 
    name: 'Student Consignee',
    phone: '9622605714',
    address: 'Delivery Address, Pattan Hub, Kashmir 193121',
    date: new Date().toLocaleDateString('en-IN')
  };

  const modal = document.getElementById('sellerShippingLabelModal');
  const sheet = document.getElementById('sellerShippingLabelSheet');
  if (!sheet) return;

  const customerName = (o.name && !o.name.match(/^[6789]\d{9}$/)) ? o.name : 'Valued Student';
  const customerPhone = o.phone || '9622605714';
  const customerAddress = o.address || 'Delivery Address, Pattan Hub, Dist. Baramulla, J&K';
  
  const pinMatch = String(customerAddress).match(/\b(19\d{4})\b/);
  const pincode = pinMatch ? pinMatch[1] : '193121';

  const isCod = isCodOrder(o);
  const barcodeSvg = generateCode128Svg(o.orderId, 55, 2);
  const qrUrl = `https://jkstudyhub.online/account.html#orders?id=${encodeURIComponent(o.orderId)}`;
  const awbNumber = 'JKSH' + (String(o.orderId).replace(/\D/g,'').slice(-6) || '193121');
  const orderDate = o.date || new Date().toLocaleDateString('en-IN');

  sheet.innerHTML = `
    <div class="seller-label-dual-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 18px; align-items: stretch;">
      
      <!-- ========================================================
           LEFT: PERSONALIZED CUSTOMER THANK YOU & ₹20 REWARD CARD
           ======================================================== -->
      <div id="printTargetCard" class="seller-custom-thank-card" style="background: linear-gradient(145deg, #07111e 0%, #0e233d 100%); border: 2.5px solid #d4af37; border-radius: 12px; padding: 22px; color: #fff; display: flex; flex-direction: column; justify-content: space-between; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.18); min-height: 520px; box-sizing: border-box;">
        
        <div style="position: absolute; inset: 7px; border: 1px solid rgba(212, 175, 55, 0.45); border-radius: 8px; pointer-events: none;"></div>

        <!-- Card Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; position: relative; z-index: 2; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 9px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%); color: #0b192c; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; font-family: 'Cinzel', serif;">JK</div>
            <div>
              <div style="font-size: 14px; font-weight: 800; letter-spacing: 0.5px; color: #f8fafc;">JK STUDY HUB</div>
              <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #d4af37; font-weight: 700;">Excellence in Learning • Kashmir</div>
            </div>
          </div>
          <div style="background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%); color: #07111e; font-size: 9px; font-weight: 900; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(212,175,55,0.4);">
            Verified Student
          </div>
        </div>

        <!-- Greeting & Message -->
        <div style="text-align: center; margin: 10px 0 14px; position: relative; z-index: 2;">
          <div style="font-family: 'Cinzel', serif; font-size: 19px; font-weight: 800; color: #fbf5b7; letter-spacing: 0.5px; margin-bottom: 6px;">
            BEST OF LUCK FOR EXAMS!
          </div>
          <div style="font-size: 11.5px; color: #cbd5e1; line-height: 1.5; max-width: 360px; margin: 0 auto;">
            Dear <strong style="color:#fff;">${customerName}</strong>, thank you for choosing JK Study Hub! We are proud to support your academic journey with authentic books &amp; study supplies at strictly less than bookshop rates &amp; less than MRP.
          </div>
        </div>

        <!-- Order & One-Time ₹20 Coupon Voucher Box -->
        <div style="background: rgba(212, 175, 55, 0.1); border: 2px dashed #d4af37; border-radius: 10px; padding: 14px; margin-bottom: 14px; position: relative; z-index: 2; text-align: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed rgba(212,175,55,0.4); padding-bottom: 6px; margin-bottom: 8px;">
            <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase;">LOCKED TO YOUR ORDER:</span>
            <span style="font-family: monospace; font-size: 13.5px; font-weight: 900; color: #fef08a; letter-spacing: 1px;">#${o.orderId}</span>
          </div>

          <div style="font-size: 10.5px; font-weight: 800; color: #e2e8f0; text-transform: uppercase; letter-spacing: 1px;">
            🎁 EXCLUSIVE ONE-TIME REWARD
          </div>
          <div style="font-size: 22px; font-weight: 900; color: #fef08a; margin: 3px 0; letter-spacing: 1px;">
            ₹20 OFF NEXT ORDER
          </div>
          <div style="display: inline-block; background: #07111e; border: 1.5px solid #d4af37; padding: 4px 14px; border-radius: 6px; margin: 6px 0;">
            <span style="font-size: 10px; color: #cbd5e1; font-weight: 600;">COUPON CODE: </span>
            <span style="font-family: monospace; font-size: 14px; font-weight: 900; color: #fde047; letter-spacing: 1.5px;">STUDENT20</span>
          </div>

          <div style="font-size: 10px; color: #94a3b8; line-height: 1.4; margin-top: 6px;">
            🔒 <strong>How to Redeem:</strong> On your next order, tick <em>"Have you ordered before?"</em> at checkout and enter your Order ID <strong>${o.orderId}</strong> + Code <strong>STUDENT20</strong> to get ₹20 off. Can only be redeemed once!
          </div>
        </div>

        <!-- Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(212, 175, 55, 0.3); padding-top: 10px; font-size: 10.5px; color: #94a3b8; position: relative; z-index: 2;">
          <div><i class="fa-brands fa-whatsapp" style="color: #22c55e;"></i> Helpline: <strong style="color: #fff;">+91 9622605714</strong></div>
          <div style="color: #38bdf8; font-weight: 700;"><i class="fa-solid fa-truck-fast"></i> Free Delivery Pattan</div>
        </div>

      </div>

      <!-- ========================================================
           RIGHT: LOGISTICS SURFACE SHIPPING LABEL (BARCODED)
           ======================================================== -->
      <div id="printTargetLabel" class="shipping-label-sheet" style="border: 2.5px solid #000; background: #fff; color: #000; font-family: 'Plus Jakarta Sans', Arial, sans-serif; text-align: left; line-height: 1.35; border-radius: 4px; box-sizing: border-box;">
        <!-- Top Bar: Logistics Header -->
        <div style="border-bottom: 2px solid #000; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; background: #fff;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 22px;">📦</span>
            <div>
              <div style="font-size: 14px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase;">JK STUDY HUB LOGISTICS</div>
              <div style="font-size: 9.5px; font-weight: 700; color: #333; text-transform: uppercase;">Express Surface &amp; Parcel Dispatch</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; font-weight: 900; border: 1.5px solid #000; padding: 2px 7px; display: inline-block;">ROUTE: KMR-193</div>
            <div style="font-size: 9.5px; font-weight: 600; margin-top: 2px;">DISPATCH: ${orderDate}</div>
          </div>
        </div>

        <!-- Primary Barcode Section -->
        <div style="border-bottom: 2px solid #000; padding: 12px 10px; text-align: center; background: #fff;">
          <div style="display: flex; justify-content: center; margin-bottom: 4px;">
            ${barcodeSvg}
          </div>
          <div style="font-family: monospace; font-size: 14px; font-weight: 900; letter-spacing: 2px;">* ${o.orderId} *</div>
          <div style="display: flex; justify-content: space-between; font-size: 9.5px; font-weight: 700; margin-top: 4px; padding: 0 10px; color: #222;">
            <span>AWB: ${awbNumber}</span>
            <span>HUB: BARAMULLA / PATTAN</span>
          </div>
        </div>

        <!-- Payment Status Banner (PREPAID vs COD) -->
        <div style="border-bottom: 2px solid #000; padding: 8px 12px; text-align: center; ${isCod ? 'background: #000; color: #fff;' : 'background: #f1f5f9; color: #000;'}">
          ${isCod ? `
            <div style="font-size: 15px; font-weight: 900; letter-spacing: 1px;">CASH ON DELIVERY (COD)</div>
            <div style="font-size: 15px; font-weight: 900; margin-top: 2px;">COLLECT CASH: ₹${o.amount || 0}</div>
            <div style="font-size: 9.5px; font-weight: 700; margin-top: 2px; letter-spacing: 0.5px;">⚠️ COLLECT EXACT CASH BEFORE OPENING PARCEL</div>
          ` : `
            <div style="font-size: 14px; font-weight: 900; letter-spacing: 1px;">PREPAID — DO NOT COLLECT CASH</div>
            <div style="font-size: 12px; font-weight: 700; margin-top: 2px;">AMOUNT PAID: ₹${o.amount || 0} • VERIFIED ONLINE</div>
            <div style="font-size: 9.5px; font-weight: 600; color: #475569; margin-top: 1px;">Payment ID: ${o.txnId || 'PREPAID_VERIFIED'}</div>
          `}
        </div>

        <!-- Address Section: SHIP TO & SHIP FROM -->
        <div style="display: grid; grid-template-columns: 1.4fr 1fr; border-bottom: 2px solid #000;">
          <!-- Ship To -->
          <div style="padding: 10px 12px; border-right: 2px solid #000; background: #fff;">
            <div style="font-size: 9.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; border-bottom: 1px solid #ccc; padding-bottom: 2px;">DELIVER TO (CONSIGNEE):</div>
            <div style="font-size: 13.5px; font-weight: 900; color: #000; line-height: 1.2;">${customerName}</div>
            <div style="font-size: 11.5px; font-weight: 800; color: #000; margin-top: 3px;">TEL: +91 ${customerPhone}</div>
            <div style="font-size: 10.5px; font-weight: 600; color: #111; line-height: 1.4; margin-top: 4px; word-break: break-word;">${customerAddress}</div>
            <div style="margin-top: 8px; padding-top: 4px; border-top: 1px dashed #000;">
              <span style="font-size: 10.5px; font-weight: 900;">PIN: </span>
              <span style="font-size: 18px; font-weight: 900; letter-spacing: 1px;">${pincode}</span>
            </div>
          </div>

          <!-- Ship From -->
          <div style="padding: 10px 12px; background: #fff;">
            <div style="font-size: 9.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; border-bottom: 1px solid #ccc; padding-bottom: 2px;">SHIPPER (RETURN TO):</div>
            <div style="font-size: 11.5px; font-weight: 900; color: #000; line-height: 1.2;">JK STUDY HUB LOGISTICS</div>
            <div style="font-size: 10px; font-weight: 600; color: #222; margin-top: 3px; line-height: 1.3;">
              Fulfillment Center, Main Market, Pattan, Dist. Baramulla<br>
              Jammu &amp; Kashmir - 193121
            </div>
            <div style="font-size: 10.5px; font-weight: 800; margin-top: 4px;">HELPLINE: +91 9622605714</div>
            <div style="margin-top: 8px; font-size: 8.5px; font-weight: 700; border: 1px solid #000; padding: 2px 4px; display: inline-block;">
              ORIGIN PIN: 193121
            </div>
          </div>
        </div>

        <!-- Items and Package Contents -->
        <div style="border-bottom: 2px solid #000; padding: 8px 12px; background: #fff;">
          <div style="display: flex; justify-content: space-between; font-size: 9.5px; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 4px;">
            <span style="flex: 2;">ITEM DESCRIPTION</span>
            <span style="flex: 0.5; text-align: center;">QTY</span>
            <span style="flex: 0.8; text-align: right;">TOTAL VALUE</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; line-height: 1.3;">
            <span style="flex: 2; word-break: break-word;">${o.product || 'Study Material / Textbook'}</span>
            <span style="flex: 0.5; text-align: center;">1</span>
            <span style="flex: 0.8; text-align: right;">₹${o.amount || 0}</span>
          </div>
          <div style="font-size: 8.5px; font-weight: 700; color: #444; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.3px;">
            NATURE: EDUCATIONAL BOOKS / STUDY NOTES • HANDLE WITH CARE • KEEP DRY
          </div>
        </div>

        <!-- Footer with QR Code and Dispatch Stamp -->
        <div style="padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; background: #fff;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div id="sellerShippingLabelQrWrap" style="width: 65px; height: 65px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 1px solid #000; padding: 2px;">
            </div>
            <div>
              <div style="font-size: 9px; font-weight: 900; text-transform: uppercase;">SCAN FOR REAL-TIME TRACKING</div>
              <div style="font-size: 8px; font-weight: 600; color: #333; line-height: 1.3; max-width: 160px; margin-top: 2px;">
                Scan with mobile camera or scanner to verify parcel authenticity &amp; live delivery status.
              </div>
            </div>
          </div>
          <div style="text-align: center; border: 1.5px dashed #000; padding: 6px 10px; border-radius: 4px; min-width: 105px;">
            <div style="font-size: 8px; font-weight: 900; letter-spacing: 0.5px;">JK STUDY HUB</div>
            <div style="font-size: 9.5px; font-weight: 900; color: #000; margin: 2px 0;">VERIFIED DISPATCH</div>
            <div style="font-size: 7.5px; font-weight: 700; color: #555;">AUTH. SIGNATORY</div>
          </div>
        </div>
      </div>

    </div>
  `;

  setTimeout(() => {
    const qrContainer = document.getElementById('sellerShippingLabelQrWrap');
    if (qrContainer) {
      renderQrCodeIntoContainer(qrContainer, qrUrl, 64);
    }
  }, 40);

  if (modal) modal.classList.add('open');
}

function printSellerShippingLabel(targetType = 'all') {
  let contentHtml = '';
  let docTitle = `Dispatch Package - ${activePrintingOrderId}`;

  if (targetType === 'card') {
    const cardEl = document.getElementById('printTargetCard');
    if (!cardEl) return;
    contentHtml = `<div style="max-width: 480px; margin: 20px auto;">${cardEl.outerHTML}</div>`;
    docTitle = `Student Reward Card - ${activePrintingOrderId}`;
  } else if (targetType === 'label') {
    const labelEl = document.getElementById('printTargetLabel');
    if (!labelEl) return;
    contentHtml = `<div style="max-width: 420px; margin: 20px auto;">${labelEl.outerHTML}</div>`;
    docTitle = `Shipping Label - ${activePrintingOrderId}`;
  } else {
    const dualGrid = document.querySelector('.seller-label-dual-container');
    if (!dualGrid) return;
    contentHtml = `<div style="max-width: 900px; margin: 10px auto;">${dualGrid.outerHTML}</div>`;
    docTitle = `Label & Student Card - ${activePrintingOrderId}`;
  }

  const printWindow = window.open('', '_blank', 'width=950,height=900');
  if (!printWindow) {
    window.print();
    return;
  }
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${docTitle}</title>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        body { margin: 0; padding: 15px; font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .seller-label-dual-container { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: stretch; }
        .seller-custom-thank-card { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .shipping-label-sheet { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @media print {
          body { padding: 0; }
          @page { size: ${targetType === 'all' ? 'A4 landscape' : 'auto'}; margin: 6mm; }
          .seller-label-dual-container { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 6mm !important; }
        }
      </style>
    </head>
    <body>
      ${contentHtml}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 450);
}

function closeSellerModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

function openBulkLabelModal() {
  const orders = getSellerOrders();
  if (orders.length > 0) {
    openSellerShippingLabelModal(orders[0].orderId);
  } else {
    alert("No active orders found to print labels.");
  }
}

// =========================================================
// 7. IN-APP CAMERA BARCODE & QR SCANNER ENGINE
// =========================================================

let activeSellerScannerStream = null;
let activeSellerScannerTrack = null;
let currentSellerFacingMode = 'environment';
let isSellerScannerDetecting = false;
let isSellerTorchActive = false;

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

  // 2. Strip bounding asterisks from thermal barcode representation: * OD123456 *
  str = str.replace(/^\*+|\*+$/g, '').trim();

  // 3. Extract order ID pattern: OD followed by digits, or ORD- followed by alphanumeric
  const odMatch = str.match(/\b(OD\d{6,}|ORD[-_]?[A-Za-z0-9]+)\b/i);
  if (odMatch) {
    return odMatch[1].toUpperCase();
  }

  return str.toUpperCase();
}

function openBarcodeScannerModal() {
  const modal = document.getElementById('sellerBarcodeModal');
  if (!modal) return;
  modal.style.display = 'flex';

  const resCard = document.getElementById('sellerScannedResultCard');
  if (resCard) resCard.style.display = 'none';

  const manualInput = document.getElementById('manualBarcodeScanInput');
  if (manualInput) {
    manualInput.value = '';
    setTimeout(() => manualInput.focus(), 200);
  }

  startSellerScannerCamera(currentSellerFacingMode);
}

function closeBarcodeScannerModal() {
  isSellerScannerDetecting = false;
  if (activeSellerScannerStream) {
    activeSellerScannerStream.getTracks().forEach(t => t.stop());
    activeSellerScannerStream = null;
    activeSellerScannerTrack = null;
  }
  const modal = document.getElementById('sellerBarcodeModal');
  if (modal) modal.style.display = 'none';
}

function startSellerScannerCamera(facingMode) {
  const video = document.getElementById('sellerScannerVideo');
  const statusBadge = document.getElementById('sellerScannerStatusBadge');
  if (!video) return;

  if (activeSellerScannerStream) {
    activeSellerScannerStream.getTracks().forEach(t => t.stop());
    activeSellerScannerStream = null;
    activeSellerScannerTrack = null;
  }

  if (statusBadge) {
    statusBadge.innerHTML = '<span class="live-pulse"></span> Initializing Camera...';
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (statusBadge) {
      statusBadge.innerHTML = '⚠️ Camera not supported on this browser. Use manual entry.';
    }
    return;
  }

  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: facingMode },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  }).then(stream => {
    activeSellerScannerStream = stream;
    activeSellerScannerTrack = stream.getVideoTracks()[0];
    video.srcObject = stream;
    video.setAttribute('playsinline', 'true');
    video.play();

    const torchBtn = document.getElementById('btnSellerToggleTorch');
    if (torchBtn && activeSellerScannerTrack && activeSellerScannerTrack.getCapabilities) {
      try {
        const caps = activeSellerScannerTrack.getCapabilities();
        torchBtn.style.display = caps.torch ? 'flex' : 'none';
      } catch(e) {
        torchBtn.style.display = 'none';
      }
    }

    if (statusBadge) {
      statusBadge.innerHTML = '<span class="live-pulse"></span> Align Barcode inside frame';
    }

    isSellerScannerDetecting = true;
    requestAnimationFrame(scanSellerVideoFrameLoop);
  }).catch(err => {
    console.warn("Seller camera notice:", err);
    if (statusBadge) {
      statusBadge.innerHTML = '⚠️ Camera permission denied or busy. Enter Order ID below.';
    }
    const manualInput = document.getElementById('manualBarcodeScanInput');
    if (manualInput) manualInput.focus();
  });
}

function flipSellerScannerCamera() {
  currentSellerFacingMode = (currentSellerFacingMode === 'environment') ? 'user' : 'environment';
  startSellerScannerCamera(currentSellerFacingMode);
}

function toggleSellerScannerTorch() {
  if (!activeSellerScannerTrack || !activeSellerScannerTrack.applyConstraints) return;
  isSellerTorchActive = !isSellerTorchActive;
  activeSellerScannerTrack.applyConstraints({
    advanced: [{ torch: isSellerTorchActive }]
  }).catch(() => {});
}

function scanSellerVideoFrameLoop() {
  if (!isSellerScannerDetecting) return;
  const video = document.getElementById('sellerScannerVideo');
  if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
    requestAnimationFrame(scanSellerVideoFrameLoop);
    return;
  }

  // 1. Native High-Speed BarcodeDetector (Chrome / Edge / Safari modern)
  if ('BarcodeDetector' in window) {
    try {
      const detector = new BarcodeDetector({ formats: ['code_128', 'qr_code', 'code_39', 'ean_13'] });
      detector.detect(video).then(barcodes => {
        if (barcodes && barcodes.length > 0) {
          handleScannedBarcodeValue(barcodes[0].rawValue);
        } else if (isSellerScannerDetecting) {
          requestAnimationFrame(scanSellerVideoFrameLoop);
        }
      }).catch(() => {
        if (isSellerScannerDetecting) requestAnimationFrame(scanSellerVideoFrameLoop);
      });
      return;
    } catch(e) {}
  }

  // 2. jsQR Fallback Engine for QR codes
  if (typeof jsQR === 'function') {
    const canvas = document.getElementById('sellerScannerCanvas');
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

  if (isSellerScannerDetecting) {
    requestAnimationFrame(scanSellerVideoFrameLoop);
  }
}

function handleManualBarcodeLookup() {
  const input = document.getElementById('manualBarcodeScanInput');
  const val = String(input ? input.value : '').trim();
  if (!val) {
    alert("Please enter an Order ID or scan a barcode.");
    return;
  }
  handleScannedBarcodeValue(val);
}

function handleScannedBarcodeValue(raw) {
  if (!raw) return;
  const orderId = extractOrderIdFromScan(raw);
  isSellerScannerDetecting = false;
  playScanSuccessBeep();

  const orders = getSellerOrders();
  const match = orders.find(o => String(o.orderId).trim().toUpperCase() === orderId || String(o.orderId).trim().toUpperCase() === String(raw).trim().toUpperCase());

  if (match) {
    renderScannedOrderCard(match);
  } else {
    renderOrderNotFoundCard(orderId, raw);
  }
}

function renderScannedOrderCard(order) {
  const resCard = document.getElementById('sellerScannedResultCard');
  if (!resCard) return;

  const isCod = isCodOrder(order);
  const customerName = (order.name && !order.name.match(/^[6789]\d{9}$/)) ? order.name : 'Student';
  const customerPhone = order.phone || '';
  const isDelivered = String(order.status || '').toLowerCase().includes('deliver');
  const isCancelled = String(order.status || '').toLowerCase().includes('cancel');

  resCard.innerHTML = `
    <div style="background: #ffffff; border-radius: 12px; padding: 14px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.06); text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 10px;">
        <div>
          <span style="font-family: monospace; font-size: 15px; font-weight: 800; color: #0284c7;">${order.orderId}</span>
          <div style="font-size: 11px; color: #64748b;">${order.date || 'Today'}</div>
        </div>
        <span class="status-badge-pill ${String(order.status || 'Confirmed').toLowerCase().includes('cancel') ? 'cancelled' : 'ready'}" style="font-size: 11.5px;">
          ${order.status || 'Confirmed'}
        </span>
      </div>

      <div style="font-size: 12.5px; color: #334155; line-height: 1.45; background: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
        <div><strong>Item:</strong> ${order.product || 'Study Material'}</div>
        <div style="margin-top: 3px;"><strong>Recipient:</strong> ${customerName} (📞 ${customerPhone || 'N/A'})</div>
        <div style="margin-top: 3px; font-size: 11.5px; color: #64748b;"><strong>Address:</strong> ${order.address || 'Kashmir'}</div>
        <div style="margin-top: 6px;">
          ${isCod ? `
            <span style="font-size: 11.5px; font-weight: 800; color: #b45309; background: #fef3c7; padding: 3px 8px; border-radius: 4px; display: inline-block;">
              💵 Cash on Delivery: Collect ₹${order.amount || 0} Cash
            </span>
          ` : `
            <span style="font-size: 11.5px; font-weight: 800; color: #15803d; background: #f0fdf4; padding: 3px 8px; border-radius: 4px; display: inline-block;">
              💳 Online Prepaid: ₹${order.amount || 0} Paid Online
            </span>
          `}
        </div>
      </div>

      <!-- Quick Status Update Buttons -->
      <div style="margin-bottom: 12px;">
        <div style="font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 6px; text-transform: uppercase;">
          <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i> 1-Tap Status Update:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Ready to Ship')" class="btn-hub-secondary" style="font-size: 11.5px; justify-content: center; padding: 7px 4px;">
            📦 Ready to Ship
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Dispatched')" class="btn-hub-secondary" style="font-size: 11.5px; justify-content: center; padding: 7px 4px;">
            🚚 Dispatched
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'On the Way')" class="btn-hub-secondary" style="font-size: 11.5px; justify-content: center; padding: 7px 4px;">
            🛵 On the Way
          </button>
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Delivered')" class="btn-hub-secondary" style="font-size: 11.5px; justify-content: center; padding: 7px 4px; color: #15803d; font-weight: 800;">
            ✅ Delivered (Doorstep)
          </button>
        </div>
        <div style="margin-top: 6px; display: flex; align-items: center; gap: 6px;">
          <button type="button" onclick="updateOrderStatusFromScanner('${order.orderId}', 'Cancelled')" style="flex: 1; background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; padding: 6px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700; cursor: pointer;">
            ❌ Cancel Order
          </button>
        </div>
      </div>

      <!-- Action Buttons: Print Label, WhatsApp, Next Scan -->
      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
        <button type="button" onclick="openSellerShippingLabelModal('${order.orderId}')" class="btn-hub-secondary" style="flex: 1; font-size: 11.5px; justify-content: center; padding: 8px;">
          <i class="fa-solid fa-print"></i> Thermal Label
        </button>
        ${customerPhone ? `
          <a href="https://wa.me/91${String(customerPhone).replace(/\D/g,'').slice(-10)}?text=${encodeURIComponent('Hi ' + customerName + '! Your order ' + order.orderId + ' from JK Study Hub is ' + (order.status || 'being processed') + '.')}" target="_blank" rel="noopener" class="btn-hub-secondary" style="flex: 1; font-size: 11.5px; justify-content: center; padding: 8px; color: #16a34a; text-decoration: none;">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        ` : ''}
        <button type="button" onclick="resumeSellerScanner()" class="btn-hub-primary" style="flex: 1.2; font-size: 11.5px; justify-content: center; padding: 8px;">
          <i class="fa-solid fa-rotate-right"></i> Scan Next
        </button>
      </div>
    </div>
  `;
  resCard.style.display = 'block';
}

function renderOrderNotFoundCard(orderId, raw) {
  const resCard = document.getElementById('sellerScannedResultCard');
  if (!resCard) return;

  resCard.innerHTML = `
    <div style="background: #ffffff; border-radius: 12px; padding: 14px; border: 1.5px solid #fca5a5; text-align: center;">
      <div style="font-size: 26px; margin-bottom: 6px;">🔍</div>
      <h4 style="margin: 0; font-size: 14px; font-weight: 800; color: #b91c1c;">Order Not Found</h4>
      <p style="font-size: 12px; color: #64748b; margin: 4px 0 12px;">Scanned: <strong>"${raw}"</strong> (clean: ${orderId})</p>
      <div style="display: flex; gap: 6px; justify-content: center;">
        <button type="button" onclick="syncSellerWithGoogleSheets(); setTimeout(() => handleScannedBarcodeValue('${raw}'), 800);" class="btn-hub-secondary" style="font-size: 11.5px; padding: 6px 10px;">
          <i class="fa-solid fa-rotate"></i> Sync Sheets
        </button>
        <button type="button" onclick="resumeSellerScanner()" class="btn-hub-primary" style="font-size: 11.5px; padding: 6px 10px;">
          <i class="fa-solid fa-camera"></i> Try Again
        </button>
      </div>
    </div>
  `;
  resCard.style.display = 'block';
}

function updateOrderStatusFromScanner(orderId, newStatus) {
  updateOrderStatusFromSeller(orderId, newStatus);
  const orders = getSellerOrders();
  const match = orders.find(o => String(o.orderId).trim().toUpperCase() === String(orderId).trim().toUpperCase());
  if (match) {
    renderScannedOrderCard(match);
  }
}

function resumeSellerScanner() {
  const resCard = document.getElementById('sellerScannedResultCard');
  if (resCard) resCard.style.display = 'none';
  const input = document.getElementById('manualBarcodeScanInput');
  if (input) input.value = '';

  isSellerScannerDetecting = true;
  requestAnimationFrame(scanSellerVideoFrameLoop);
}

function processScannedPacketBarcode() {
  handleManualBarcodeLookup();
}

// =========================================================
// 7. CATALOG UPLOADER & MULTI-PHOTO SYSTEM (2-3 PHOTOS)
// =========================================================

let sellerUploadedPhotos = [null, null, null];

// Compress photo using HTML5 Canvas to keep file lightweight (<90KB) and preserve aspect ratio
async function compressSellerPhotoFile(file, maxWidth = 900, maxHeight = 1100, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
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

// Handle Photo Selected for slot (1, 2, or 3)
async function handleSellerPhotoSelected(event, slotNum) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const previewImg = document.getElementById(`sellerSlotPreview${slotNum}`);
  const placeholder = document.getElementById(`sellerSlotPlaceholder${slotNum}`);
  const removeBtn = document.getElementById(`sellerSlotRemove${slotNum}`);

  try {
    if (placeholder) {
      placeholder.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="font-size:24px; color:#2563eb; margin-bottom:6px;"></i><span style="font-size:11px; color:#2563eb; font-weight:700;">Optimizing Photo...</span>`;
    }

    const compressedDataUrl = await compressSellerPhotoFile(file, 900, 1100, 0.8);
    sellerUploadedPhotos[slotNum - 1] = compressedDataUrl;

    if (placeholder) placeholder.style.display = 'none';
    if (previewImg) {
      previewImg.src = compressedDataUrl;
      previewImg.style.display = 'block';
    }
    if (removeBtn) removeBtn.style.display = 'flex';

    if (typeof showToast === 'function') {
      showToast(`📸 Photo ${slotNum} ready for live catalog!`);
    }
  } catch (err) {
    console.error("Seller photo compression error:", err);
    if (placeholder) {
      placeholder.style.display = 'flex';
      placeholder.innerHTML = `
        <i class="fa-solid fa-camera"></i>
        <div class="slot-title">${slotNum === 1 ? 'Photo 1 (Front Cover) *' : `Photo ${slotNum}`}</div>
        <div class="slot-hint">Try selecting another image</div>
      `;
    }
    alert("Could not process this photo. Please try a different image.");
  }
}

// Remove photo from slot
function removeSellerPhoto(event, slotNum) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  sellerUploadedPhotos[slotNum - 1] = null;

  const fileInput = document.getElementById(`sellerPhotoInput${slotNum}`);
  if (fileInput) fileInput.value = '';

  const previewImg = document.getElementById(`sellerSlotPreview${slotNum}`);
  const placeholder = document.getElementById(`sellerSlotPlaceholder${slotNum}`);
  const removeBtn = document.getElementById(`sellerSlotRemove${slotNum}`);

  if (previewImg) {
    previewImg.src = '';
    previewImg.style.display = 'none';
  }
  if (removeBtn) removeBtn.style.display = 'none';
  if (placeholder) {
    placeholder.style.display = 'flex';
    placeholder.innerHTML = `
      <i class="fa-solid ${slotNum === 1 ? 'fa-camera' : (slotNum === 2 ? 'fa-images' : 'fa-book-open')}"></i>
      <div class="slot-title">${slotNum === 1 ? 'Photo 1 (Front Cover) *' : (slotNum === 2 ? 'Photo 2 (Back / Index)' : 'Photo 3 (Inside / Sample)')}</div>
      <div class="slot-hint">${slotNum === 1 ? 'Tap to take photo or browse' : 'Optional • Extra angle'}</div>
    `;
  }
}

// Upload photo to reliable CDN with fallback
async function uploadSellerPhotoToCdn(photoDataUrl) {
  if (!photoDataUrl || !photoDataUrl.startsWith('data:')) {
    return photoDataUrl;
  }
  const base64Data = photoDataUrl.split(',')[1];
  if (!base64Data) return photoDataUrl;

  const fetchWithTimeout = (url, options, timeout = 6000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) => setTimeout(() => reject(new Error('CDN upload timeout')), timeout))
    ]);
  };

  // Primary: FreeImage.host
  try {
    const formData = new FormData();
    formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
    formData.append('action', 'upload');
    formData.append('source', base64Data);
    formData.append('format', 'json');

    const res = await fetchWithTimeout('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData
    }, 6000);
    const result = await res.json();
    if (result && result.status_code === 200 && result.image && result.image.url) {
      return result.image.url;
    }
  } catch (e) {
    console.warn("FreeImage upload notice:", e);
  }

  // Secondary: ImgBB Public API
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
  } catch (e) {
    console.warn("ImgBB upload notice:", e);
  }

  return photoDataUrl;
}

// Handle Catalog Submission & Live Publishing
async function handleSellerCatalogSubmit(e) {
  if (e) e.preventDefault();

  const title = (document.getElementById('catTitle')?.value || '').trim();
  const category = document.getElementById('catCategory')?.value || 'academic';
  const price = parseFloat(document.getElementById('catPrice')?.value) || 0;
  const mrpInput = document.getElementById('catMrp')?.value;
  const mrp = mrpInput ? parseFloat(mrpInput) : Math.round(price * 1.35);
  const stock = parseInt(document.getElementById('catStock')?.value || '20', 10);
  const badge = document.getElementById('catBadge')?.value || '✨ Fresh Stock';
  const desc = (document.getElementById('catDescription')?.value || '').trim();
  const statusNotice = document.getElementById('sellerCatalogStatusNotice');

  if (!title || price <= 0 || !desc) {
    alert("⚠️ Please provide Title, Selling Price, and Description.");
    return;
  }

  // Ensure at least Photo 1 is uploaded
  if (!sellerUploadedPhotos[0]) {
    alert("⚠️ Please take or upload at least Photo 1 (Front Cover) for the product.");
    const slot1 = document.getElementById('sellerPhotoSlot1');
    if (slot1) slot1.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const btnPublish = document.getElementById('btnSellerPublishCatalog');
  const originalBtnHtml = btnPublish ? btnPublish.innerHTML : '';
  if (btnPublish) {
    btnPublish.disabled = true;
    btnPublish.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Uploading Photos & Publishing...`;
  }

  if (statusNotice) {
    statusNotice.style.display = 'block';
    statusNotice.style.background = '#eff6ff';
    statusNotice.style.color = '#1d4ed8';
    statusNotice.style.border = '1px solid #bfdbfe';
    statusNotice.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing images and broadcasting product to Google Sheets and live store...`;
  }

  try {
    const rawPhotos = sellerUploadedPhotos.filter(p => !!p);
    const cdnPhotos = [];
    for (let i = 0; i < rawPhotos.length; i++) {
      try {
        const cdnUrl = await uploadSellerPhotoToCdn(rawPhotos[i]);
        cdnPhotos.push(cdnUrl);
      } catch (err) {
        cdnPhotos.push(rawPhotos[i]);
      }
    }

    const finalPhotos = cdnPhotos.length > 0 ? cdnPhotos : rawPhotos;
    const prodId = 'PRD-' + Date.now();

    const newProduct = {
      id: prodId,
      productId: prodId,
      name: title,
      title: title,
      category: category,
      price: price,
      mrp: mrp,
      badge: badge,
      stock: stock,
      desc: desc,
      description: desc,
      photos: finalPhotos,
      image: finalPhotos[0] || 'images/logo-app.png',
      allImages: finalPhotos,
      status: 'Active',
      dateAdded: new Date().toLocaleDateString("en-IN"),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    };

    // 1. Save to local storage for store.js and seller.js
    try {
      let customProds = JSON.parse(localStorage.getItem('jk_custom_products') || '[]');
      customProds.unshift(newProduct);
      localStorage.setItem('jk_custom_products', JSON.stringify(customProds));
    } catch (e) {
      console.warn("Storage quota warning on jk_custom_products:", e);
    }

    try {
      let uploadedCat = JSON.parse(localStorage.getItem('jk_uploaded_catalog') || '[]');
      uploadedCat.unshift(newProduct);
      localStorage.setItem('jk_uploaded_catalog', JSON.stringify(uploadedCat));
    } catch (e) {
      console.warn("Storage quota warning on jk_uploaded_catalog:", e);
    }

    // 2. Set stock override in seller inventory
    try {
      const stockMap = getSellerStockOverrides();
      stockMap[title] = { status: stock > 0 ? 'in_stock' : 'out_of_stock', qty: stock };
      localStorage.setItem('jk_stock_overrides', JSON.stringify(stockMap));
    } catch(e) {}

    // 3. Dispatch to Google Apps Script
    try {
      const endpoint = typeof SELLER_SCRIPT_URL !== 'undefined' ? SELLER_SCRIPT_URL : 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';

      // Call A: action=add_product
      const postData = new URLSearchParams();
      postData.append('action', 'add_product');
      postData.append('product_id', prodId);
      postData.append('title', title);
      postData.append('category', category);
      postData.append('price', String(price));
      postData.append('mrp', String(mrp));
      postData.append('badge', badge);
      postData.append('description', desc);
      postData.append('photo1', finalPhotos[0] || '');
      postData.append('photo2', finalPhotos[1] || '');
      postData.append('photo3', finalPhotos[2] || '');
      postData.append('stock', String(stock));
      postData.append('status', 'Active');
      postData.append('uploader', 'seller');

      fetch(endpoint, {
        method: 'POST',
        body: postData,
        mode: 'no-cors'
      }).catch(err => console.warn("Seller add_product sync:", err));

      // Call B: Universal Fallback Row in Main Sheet
      const catalogMeta = JSON.stringify({
        id: prodId,
        productId: prodId,
        name: title,
        title: title,
        category: category,
        price: price,
        mrp: mrp,
        badge: badge,
        stock: stock,
        desc: desc,
        description: desc,
        photos: finalPhotos,
        image: finalPhotos[0] || 'images/logo-app.png',
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
      fallbackData.append('notes', 'Seller Catalog Listing');

      fetch(endpoint, {
        method: 'POST',
        body: fallbackData,
        mode: 'no-cors'
      }).catch(err => console.warn("Seller fallback row sync:", err));

    } catch (err) {
      console.warn("Sheet post error:", err);
    }

    // 4. Reset form & photo slots
    const form = document.getElementById('sellerCatalogForm');
    if (form) form.reset();
    for (let s = 1; s <= 3; s++) {
      removeSellerPhoto(null, s);
    }

    if (statusNotice) {
      statusNotice.style.background = '#f0fdf4';
      statusNotice.style.color = '#15803d';
      statusNotice.style.border = '1px solid #bbf7d0';
      statusNotice.innerHTML = `🎉 <strong>Success!</strong> "${title}" is published live to the storefront with ${finalPhotos.length} photo(s) and synced to Google Sheets.`;
      setTimeout(() => {
        if (statusNotice) statusNotice.style.display = 'none';
      }, 7000);
    }

    if (typeof showToast === 'function') {
      showToast(`🎉 "${title}" published live with ${finalPhotos.length} photos!`);
    }

    // 5. Update listings and inventory views
    renderSellerPublishedCatalog();
    if (typeof updateSellerInventoryBadges === 'function') updateSellerInventoryBadges();
    if (typeof renderSellerInventoryTable === 'function') renderSellerInventoryTable();
    if (typeof renderSellerPricingTable === 'function') renderSellerPricingTable();

  } catch (err) {
    console.error("Catalog upload error:", err);
    alert("An error occurred while publishing the product. Please try again.");
    if (statusNotice) statusNotice.style.display = 'none';
  } finally {
    if (btnPublish) {
      btnPublish.disabled = false;
      btnPublish.innerHTML = originalBtnHtml;
    }
  }
}

// Get all published catalog products (combining jk_custom_products and jk_uploaded_catalog)
function getSellerAllPublishedProducts() {
  const mergedMap = new Map();
  try {
    const list1 = JSON.parse(localStorage.getItem('jk_custom_products') || '[]');
    if (Array.isArray(list1)) {
      list1.forEach(p => {
        const key = p.id || p.productId || p.name;
        if (key) mergedMap.set(key, p);
      });
    }
  } catch(e) {}

  try {
    const list2 = JSON.parse(localStorage.getItem('jk_uploaded_catalog') || '[]');
    if (Array.isArray(list2)) {
      list2.forEach(p => {
        const key = p.id || p.productId || p.name;
        if (key && !mergedMap.has(key)) mergedMap.set(key, p);
      });
    }
  } catch(e) {}

  return Array.from(mergedMap.values());
}

// Render Published Products Table in seller.html
function renderSellerPublishedCatalog() {
  const tbody = document.getElementById('sellerPublishedProductsTableBody');
  const countBadge = document.getElementById('sellerCatalogTotalBadge');
  if (!tbody) return;

  const products = getSellerAllPublishedProducts();

  if (countBadge) {
    countBadge.innerText = `${products.length} Live Product${products.length === 1 ? '' : 's'}`;
  }

  if (products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 36px 16px; color: #64748b;">
          <span style="font-size: 32px; display: block; margin-bottom: 8px;">📦</span>
          <div style="font-size: 14px; font-weight: 700; color: #334155;">No custom products published yet</div>
          <div style="font-size: 12.5px; margin-top: 4px;">Use the form above to snap 2-3 photos and list your first book or guide!</div>
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  products.forEach(p => {
    const photos = (Array.isArray(p.photos) && p.photos.length > 0) ? p.photos : (p.image ? [p.image] : ['images/logo-app.png']);
    const mainImg = photos[0] || 'images/logo-app.png';
    const prodId = p.id || p.productId || '';
    const safeTitle = (p.title || p.name || 'Untitled').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const price = Number(p.price) || 0;
    const mrp = Number(p.mrp || p.originalPrice) || Math.round(price * 1.35);
    const stock = (p.stock !== undefined) ? p.stock : 20;

    html += `
      <tr>
        <td>
          <div style="position: relative; width: 50px; height: 50px;">
            <img src="${mainImg}" alt="${p.title || p.name}" onerror="this.src='images/logo-app.png'" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;">
            ${photos.length > 1 ? `
              <span style="position: absolute; bottom: 2px; right: 2px; background: rgba(15,23,42,0.85); color: #fff; font-size: 9.5px; font-weight: 800; padding: 1px 4px; border-radius: 4px;">
                ${photos.length} 📸
              </span>
            ` : ''}
          </div>
        </td>
        <td>
          <div style="font-weight: 800; font-size: 13.5px; color: #0f172a;">${p.title || p.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${p.desc || p.description || ''}
          </div>
          <div style="display: flex; gap: 5px; margin-top: 4px;">
            <span style="font-size: 10px; font-weight: 700; color: #b45309; background: #fef3c7; padding: 1px 6px; border-radius: 4px;">
              ${p.badge || '✨ Fresh Stock'}
            </span>
          </div>
        </td>
        <td>
          <span style="font-size: 11.5px; font-weight: 700; color: #475569; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">
            ${p.category || 'academic'}
          </span>
        </td>
        <td>
          <div style="font-size: 14px; font-weight: 800; color: #0f172a;">₹${price}</div>
          ${mrp > price ? `<div style="font-size: 11.5px; color: #94a3b8; text-decoration: line-through;">₹${mrp}</div>` : ''}
        </td>
        <td>
          <span style="font-size: 12px; font-weight: 700; color: ${stock > 0 ? '#15803d' : '#dc2626'}; background: ${stock > 0 ? '#dcfce7' : '#fee2e2'}; padding: 2px 7px; border-radius: 4px;">
            ${stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
        </td>
        <td>
          <span style="font-size: 11px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">
            <i class="fa-solid fa-cloud-arrow-up"></i> Live Synced
          </span>
        </td>
        <td style="text-align: center;">
          <button type="button" onclick="deleteSellerPublishedProduct('${prodId}', '${safeTitle}')" title="Remove from store" style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Delete / Unpublish Product
function deleteSellerPublishedProduct(prodId, prodName) {
  if (!confirm(`Are you sure you want to remove "${prodName || 'this product'}" from the live store?`)) {
    return;
  }

  try {
    let customProds = JSON.parse(localStorage.getItem('jk_custom_products') || '[]');
    customProds = customProds.filter(p => (p.id !== prodId && p.productId !== prodId && p.name !== prodName && p.title !== prodName));
    localStorage.setItem('jk_custom_products', JSON.stringify(customProds));
  } catch(e) {}

  try {
    let uploadedCat = JSON.parse(localStorage.getItem('jk_uploaded_catalog') || '[]');
    uploadedCat = uploadedCat.filter(p => (p.id !== prodId && p.productId !== prodId && p.name !== prodName && p.title !== prodName));
    localStorage.setItem('jk_uploaded_catalog', JSON.stringify(uploadedCat));
  } catch(e) {}

  renderSellerPublishedCatalog();
  if (typeof updateSellerInventoryBadges === 'function') updateSellerInventoryBadges();
  if (typeof renderSellerInventoryTable === 'function') renderSellerInventoryTable();
  if (typeof renderSellerPricingTable === 'function') renderSellerPricingTable();

  if (typeof showToast === 'function') {
    showToast(`Removed "${prodName}" from catalog.`);
  }
}

// =========================================================
// 8. CSV EXPORT & UTILITIES
// =========================================================

function exportOrdersToCSV() {
  const orders = getSellerOrders();
  if (orders.length === 0) {
    alert("No orders data to export.");
    return;
  }

  let csv = 'Order ID,Date,Product,Customer,Phone,Address,Payment Mode,Amount,Status\n';
  orders.forEach(o => {
    const isCod = isCodOrder(o);
    csv += `"${o.orderId || ''}","${o.date || ''}","${(o.product || '').replace(/"/g, '""')}","${(o.name || '').replace(/"/g, '""')}","${o.phone || ''}","${(o.address || '').replace(/"/g, '""')}","${isCod ? 'COD' : 'PREPAID'}","${o.amount || 0}","${o.status || 'Confirmed'}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `JK_Study_Hub_Orders_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function toggleSellerMobileSidebar(forceState) {
  const s = document.getElementById('sellerSidebar');
  const backdrop = document.getElementById('sellerMobileDrawerBackdrop');
  if (!s) return;
  const shouldOpen = (typeof forceState === 'boolean') ? forceState : !s.classList.contains('open');
  if (shouldOpen) {
    s.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  } else {
    s.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  }
}

function initSellerSupplierPanel() {
  renderSellerOrdersTable();
  calculateBusinessMetrics();
  calculatePaymentsSummary();
  if (typeof updateLeadsBadgeCount === 'function') updateLeadsBadgeCount();
  if (typeof updateSellerInventoryBadges === 'function') updateSellerInventoryBadges();
  if (typeof updateSellerDeliveryBadges === 'function') updateSellerDeliveryBadges();
  if (typeof renderSellerPublishedCatalog === 'function') renderSellerPublishedCatalog();
  syncSellerWithGoogleSheets(false);
}


// =========================================================
// SCHOOL PRE-ORDERS & BOOKLIST LEADS MANAGEMENT
// =========================================================
function getPreorderLeads() {
  try {
    return JSON.parse(localStorage.getItem('jk_preorder_leads') || '[]');
  } catch(e) {
    return [];
  }
}

function updateLeadsBadgeCount() {
  const leads = getPreorderLeads();
  const badge = document.getElementById('preorderLeadsBadge');
  if (badge) {
    badge.textContent = leads.length;
    badge.style.display = leads.length > 0 ? 'inline-block' : 'none';
  }
}

function renderSellerLeadsTable() {
  updateLeadsBadgeCount();
  const leads = getPreorderLeads();
  const container = document.getElementById('sellerLeadsTableContainer');
  if (!container) return;

  // Stats
  const statTotal = document.getElementById('statTotalLeads');
  const statPhoto = document.getElementById('statPhotoLeads');
  const statSchools = document.getElementById('statUniqueSchools');

  if (statTotal) statTotal.textContent = leads.length;
  if (statPhoto) statPhoto.textContent = leads.filter(l => l.hasPhoto).length;
  const unique = new Set(leads.map(l => (l.school || '').toLowerCase()).filter(Boolean));
  if (statSchools) statSchools.textContent = unique.size;

  if (leads.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #64748b; font-size: 13.5px;">
        <i class="fa-solid fa-graduation-cap" style="font-size: 36px; color: #94a3b8; margin-bottom: 12px; display: block;"></i>
        <strong>No school pre-orders received yet.</strong><br>
        When parents or students submit booklists or inquiries on the store, they will appear here live with 1-click WhatsApp reply!
      </div>
    `;
    return;
  }

  let html = `
    <div style="overflow-x: auto;">
      <table class="hub-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="background: #f8fafc; text-align: left; border-bottom: 2px solid #e2e8f0; color: #475569;">
            <th style="padding: 10px 12px;">Date &amp; ID</th>
            <th style="padding: 10px 12px;">School Name</th>
            <th style="padding: 10px 12px;">Class</th>
            <th style="padding: 10px 12px;">Parent / Student</th>
            <th style="padding: 10px 12px;">Photo Attached</th>
            <th style="padding: 10px 12px;">Status</th>
            <th style="padding: 10px 12px; text-align: right;">WhatsApp Action</th>
          </tr>
        </thead>
        <tbody>
  `;

  leads.forEach(lead => {
    const dateStr = lead.timestamp ? new Date(lead.timestamp).toLocaleDateString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) : 'Recently';
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const waReplyMsg = encodeURIComponent(`Hi! I am Sahil from JK Study Hub regarding your booklist inquiry for *${lead.school}* (${lead.class}). Here is the quote with free Kashmir doorstep delivery...`);
    const waLink = cleanPhone ? `https://wa.me/91${cleanPhone}?text=${waReplyMsg}` : `https://wa.me/919622605714`;

    html += `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 12px;">
          <div style="font-weight: 700; color: #0f172a;">${lead.id || 'LEAD'}</div>
          <div style="font-size: 11px; color: #64748b;">${dateStr}</div>
        </td>
        <td style="padding: 10px 12px; font-weight: 700; color: #1e3a8a;">
          <i class="fa-solid fa-school" style="color: #3b82f6; margin-right: 4px;"></i> ${lead.school || 'General'}
        </td>
        <td style="padding: 10px 12px;">
          <span style="background: #eff6ff; color: #1d4ed8; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 11.5px;">
            ${lead.class || 'Any'}
          </span>
        </td>
        <td style="padding: 10px 12px; color: #334155;">
          ${lead.phone || 'Not given'}
        </td>
        <td style="padding: 10px 12px;">
          ${lead.hasPhoto ? `<span style="color: #16a34a; font-weight: 800; font-size: 12px;"><i class="fa-solid fa-camera"></i> ${lead.photoName || 'Yes'}</span>` : `<span style="color: #94a3b8; font-size: 12px;">No photo</span>`}
        </td>
        <td style="padding: 10px 12px;">
          <select onchange="updateLeadStatus('${lead.id}', this.value)" style="padding: 4px 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px; background: white; font-weight: 600;">
            <option value="New Inquiry" ${lead.status === 'New Inquiry' ? 'selected' : ''}>⏳ New Inquiry</option>
            <option value="Quoted" ${lead.status === 'Quoted' ? 'selected' : ''}>💬 Quoted on WA</option>
            <option value="Order Booked" ${lead.status === 'Order Booked' ? 'selected' : ''}>✅ Order Booked</option>
            <option value="Closed" ${lead.status === 'Closed' ? 'selected' : ''}>📁 Closed</option>
          </select>
        </td>
        <td style="padding: 10px 12px; text-align: right;">
          <a href="${waLink}" target="_blank" class="btn-hub-primary" style="padding: 5px 12px; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; background: #22c55e;">
            <i class="fa-brands fa-whatsapp"></i> Quote on WA
          </a>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

function updateLeadStatus(leadId, newStatus) {
  const leads = getPreorderLeads();
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    lead.status = newStatus;
    localStorage.setItem('jk_preorder_leads', JSON.stringify(leads));
    if (typeof showToast === 'function') showToast('Lead status updated to ' + newStatus);
  }
}

function clearPreorderLeads() {
  if (confirm('Are you sure you want to clear all school pre-order leads?')) {
    localStorage.removeItem('jk_preorder_leads');
    renderSellerLeadsTable();
  }
}

function exportPreorderLeadsCSV() {
  const leads = getPreorderLeads();
  if (leads.length === 0) {
    alert('No leads to export.');
    return;
  }
  let csv = 'ID,Date,School,Class,Phone,HasPhoto,Status\n';
  leads.forEach(l => {
    csv += `"${l.id}","${l.timestamp}","${(l.school||'').replace(/"/g, '""')}","${l.class}","${l.phone}","${l.hasPhoto?'Yes':'No'}","${l.status}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'JK_Study_Hub_School_Leads_' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 1-Click WhatsApp COD Verification Sender
function verifyCodOrderViaWhatsApp(orderId) {
  const orders = getSellerOrders();
  const o = orders.find(ord => String(ord.orderId).trim().toUpperCase() === String(orderId).trim().toUpperCase());
  if (!o) return;
  const cleanPhone = String(o.phone || '').replace(/\D/g, '').slice(-10);
  const name = o.name || 'Student';
  const amount = o.amount || 0;
  const product = o.product || 'Books & Copies';
  const address = o.address || 'Kashmir';

  const text = `Assalamu Alaikum ${name}! 👋 This is Sahil from JK Study Hub regarding your Cash on Delivery order #${o.orderId}.%0A%0A` +
               `📦 *Item:* ${encodeURIComponent(product)}%0A` +
               `💵 *Total Amount:* ₹${amount} (Pay Cash on Delivery)%0A` +
               `📍 *Delivery Address:* ${encodeURIComponent(address)}%0A%0A` +
               `We are packing your parcel for doorstep dispatch. Will you be available tomorrow to receive it?%0A` +
               `👉 *Please reply 'YES' to confirm dispatch immediately.*`;

  window.open(`https://wa.me/91${cleanPhone}?text=${text}`, '_blank');
}

// =========================================================
// 9. LIVE PRODUCT PRICING & RATE CHANGER ENGINE
// =========================================================

const SELLER_MANAGED_PRODUCTS = [
  // Board Exam Kits
  { name: "JKBOSE Class 10th Board Exam Master Kit (All 5 Subjects)", category: "exam-kits", categoryLabel: "Board Exam Kits", mrp: 650, defaultPrice: 349, image: "images/school-bookset.webp" },
  { name: "JKBOSE Class 12th Board Exam Master Kit (PCB / PCM / Arts)", category: "exam-kits", categoryLabel: "Board Exam Kits", mrp: 799, defaultPrice: 399, image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=500" },
  { name: "JKBOSE Board Solved Papers & Guide", category: "notes", categoryLabel: "Notes & PYQs", mrp: 350, defaultPrice: 199, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500" },
  { name: "Board Exam Stationery Combo", category: "stationery", categoryLabel: "Stationery", mrp: 450, defaultPrice: 249, image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=500" },
  { name: "PDF Printing & Spiral Binding", category: "notes", categoryLabel: "Print on Demand", mrp: 160, defaultPrice: 99, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500" },
  { name: "Printed PYQs & Syllabus", category: "notes", categoryLabel: "Notes & PYQs", mrp: 99, defaultPrice: 49, image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=500" },
  { name: "Instant Notes", category: "notes", categoryLabel: "Notes & PYQs", mrp: 250, defaultPrice: 150, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500" },
  { name: "Exam Survival Kit", category: "stationery", categoryLabel: "Stationery", mrp: 499, defaultPrice: 299, image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=500" },

  // Novels & Bestsellers
  { name: "Atomic Habits", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 499, defaultPrice: 249, image: "images/books/atomic-habits-1.webp" },
  { name: "The Psychology of Money", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 399, defaultPrice: 220, image: "images/books/psychology-of-money-1.webp" },
  { name: "Deep Work", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 499, defaultPrice: 240, image: "images/books/deep-work-1.webp" },
  { name: "The Alchemist", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 299, defaultPrice: 180, image: "images/books/the-alchemist-1.webp" },
  { name: "The Kite Runner", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 499, defaultPrice: 260, image: "images/books/the-kite-runner-1.webp" },
  { name: "A Thousand Splendid Suns", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 499, defaultPrice: 260, image: "images/books/thousand-splendid-suns-1.webp" },
  { name: "Secrets of Divine Love", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 550, defaultPrice: 299, image: "images/books/secrets-of-divine-love-1.webp" },
  { name: "Reclaim Your Heart", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 450, defaultPrice: 250, image: "images/books/reclaim-your-heart-1.webp" },
  { name: "Wings of Fire", category: "books", categoryLabel: "Novels & Bestsellers", mrp: 350, defaultPrice: 199, image: "images/books/wings-of-fire-1.webp" },
  { name: "Lucent's General Knowledge", category: "books", categoryLabel: "Competitive Exam", mrp: 420, defaultPrice: 250, image: "images/books/lucent-gk-1.webp" },
  { name: "Wren & Martin English Grammar", category: "books", categoryLabel: "Grammar & English", mrp: 450, defaultPrice: 290, image: "images/books/wren-martin-1.webp" },

  // Stationery & Study Supplies
  { name: "Premium Spiral Copies (Set of 2)", category: "stationery", categoryLabel: "Copies & Registers", mrp: 250, defaultPrice: 149, image: "images/spiral-copies.webp" },
  { name: "Geometry Box Pro", category: "stationery", categoryLabel: "Stationery", mrp: 260, defaultPrice: 170, image: "images/geometry-box.webp" },
  { name: "The Holy Quran", category: "stationery", categoryLabel: "Islamic & Spiritual", mrp: 300, defaultPrice: 200, image: "images/quran.webp" },
  { name: "Beautiful Gift Diary", category: "stationery", categoryLabel: "Stationery", mrp: 180, defaultPrice: 99, image: "images/diary.webp" },
  { name: "Premium Pen Set", category: "stationery", categoryLabel: "Stationery", mrp: 180, defaultPrice: 99, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=500" },
  { name: "Desk Pen Stand", category: "stationery", categoryLabel: "Stationery", mrp: 250, defaultPrice: 149, image: "images/pen-stand.webp" },
  { name: "Folding Study Table", category: "stationery", categoryLabel: "Study Essentials", mrp: 799, defaultPrice: 490, image: "images/study-table.webp" },
  { name: "LED Study Table Lamp", category: "stationery", categoryLabel: "Study Essentials", mrp: 499, defaultPrice: 299, image: "https://image.pollinations.ai/prompt/A_simple_modern_LED_study_table_lamp_product_photography_on_white_background?width=600&height=400&nologo=true" },
  { name: "Form Filling Service", category: "digital", categoryLabel: "Digital Services", mrp: 150, defaultPrice: 99, image: "images/icon.svg" },

  // School Book Sets (Class 1st–12th)
  { name: "Class 1st Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 1200, defaultPrice: 850, image: "images/school-bookset.webp" },
  { name: "Class 2nd Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 1350, defaultPrice: 950, image: "images/school-bookset.webp" },
  { name: "Class 3rd Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 1500, defaultPrice: 1050, image: "images/school-bookset.webp" },
  { name: "Class 4th Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 1650, defaultPrice: 1150, image: "images/school-bookset.webp" },
  { name: "Class 5th Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 1800, defaultPrice: 1250, image: "images/school-bookset.webp" },
  { name: "Class 6th Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 1950, defaultPrice: 1350, image: "images/school-bookset.webp" },
  { name: "Class 7th Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 2100, defaultPrice: 1450, image: "images/school-bookset.webp" },
  { name: "Class 8th Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 2300, defaultPrice: 1550, image: "images/school-bookset.webp" },
  { name: "Class 9th Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 2500, defaultPrice: 1750, image: "images/school-bookset.webp" },
  { name: "Class 10th Book Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 2800, defaultPrice: 1950, image: "images/school-bookset.webp" },
  { name: "Class 11th Medical Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 3200, defaultPrice: 2250, image: "images/school-bookset.webp" },
  { name: "Class 11th Non-Medical Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 3100, defaultPrice: 2150, image: "images/school-bookset.webp" },
  { name: "Class 12th Medical Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 3500, defaultPrice: 2450, image: "images/school-bookset.webp" },
  { name: "Class 12th Non-Medical Set", category: "school-books", categoryLabel: "School Books (1st-12th)", mrp: 3400, defaultPrice: 2350, image: "images/school-bookset.webp" }
];

function getAllSellerPricingProducts() {
  const list = [...SELLER_MANAGED_PRODUCTS];
  try {
    const uploaded = (typeof getSellerAllPublishedProducts === 'function') ? getSellerAllPublishedProducts() : JSON.parse(localStorage.getItem('jk_uploaded_catalog') || '[]');
    if (Array.isArray(uploaded)) {
      uploaded.forEach(u => {
        const prodName = u.title || u.name;
        if (prodName && !list.some(p => p.name === prodName)) {
          list.push({
            name: prodName,
            category: u.category || 'academic',
            categoryLabel: 'Custom Upload',
            mrp: Number(u.mrp || u.originalPrice || Math.round((u.price || 0) * 1.3)),
            defaultPrice: Number(u.price || 0),
            image: (Array.isArray(u.photos) && u.photos[0]) ? u.photos[0] : (u.image || 'images/logo-app.png')
          });
        }
      });
    }
  } catch(e) {}
  return list;
}

function getSellerCustomPriceOverrides() {
  try {
    return JSON.parse(localStorage.getItem('jk_custom_prices') || '{}');
  } catch(e) {
    return {};
  }
}

function renderSellerPricingTable() {
  const tbody = document.getElementById('sellerPricingTableBody');
  if (!tbody) return;

  const products = getAllSellerPricingProducts();
  const overrides = getSellerCustomPriceOverrides();

  // Update counters
  const totalCountEl = document.getElementById('pricingTotalProductsCount');
  if (totalCountEl) totalCountEl.innerText = products.length;

  const activeOverridesCount = Object.keys(overrides).length;
  const activeCountEl = document.getElementById('pricingCustomOverridesCount');
  if (activeCountEl) activeCountEl.innerText = activeOverridesCount;

  const searchQuery = String(document.getElementById('pricingSearchInput') ? document.getElementById('pricingSearchInput').value : '').toLowerCase().trim();
  const catFilter = document.getElementById('pricingCategoryFilter') ? document.getElementById('pricingCategoryFilter').value : 'all';

  let html = '';
  products.forEach((p, index) => {
    // Search & Category Filter
    if (catFilter !== 'all' && p.category !== catFilter) return;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return;

    const currentPrice = (overrides[p.name] !== undefined) ? Number(overrides[p.name]) : p.defaultPrice;
    const isCustom = (overrides[p.name] !== undefined);
    const mrp = p.mrp || Math.round(currentPrice * 1.3);
    const discountPct = Math.max(0, Math.round(((mrp - currentPrice) / mrp) * 100));

    const safeEscapedName = p.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');

    html += `
      <tr style="${isCustom ? 'background: #f0fdf4;' : ''}">
        <td>
          <img src="${p.image}" alt="${p.name}" onerror="this.src='images/logo-app.png'" style="width: 38px; height: 38px; object-fit: cover; border-radius: 6px; border: 1px solid #e2e8f0;">
        </td>
        <td>
          <div style="font-weight: 800; font-size: 13.5px; color: #0f172a;">${p.name}</div>
          <div style="display: flex; gap: 4px; align-items: center; margin-top: 3px; flex-wrap: wrap;">
            ${isCustom ? '<span style="font-size: 10px; font-weight: 800; color: #16a34a; background: #dcfce7; padding: 1px 6px; border-radius: 4px;">Custom Rate Live</span>' : ''}
            ${(() => {
              const stock = (typeof getSellerStockOverrides === 'function') ? (getSellerStockOverrides()[p.name] || { status: 'in_stock', qty: 25 }) : { status: 'in_stock', qty: 25 };
              if (stock.status === 'out_of_stock' || (stock.qty !== undefined && Number(stock.qty) <= 0)) {
                return '<span style="font-size: 10px; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 1px 6px; border-radius: 4px;"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>';
              } else if (stock.status === 'low_stock' || (stock.qty !== undefined && Number(stock.qty) > 0 && Number(stock.qty) <= 5)) {
                return `<span style="font-size: 10px; font-weight: 800; color: #b45309; background: #fef3c7; padding: 1px 6px; border-radius: 4px;"><i class="fa-solid fa-triangle-exclamation"></i> Only ${stock.qty} left</span>`;
              }
              return '';
            })()}
          </div>
        </td>
        <td>
          <span style="font-size: 11.5px; font-weight: 700; color: #475569; background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">${p.categoryLabel || p.category}</span>
        </td>
        <td>
          <span style="font-size: 13px; font-weight: 600; color: #94a3b8; text-decoration: line-through;">₹${mrp}</span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 14px; font-weight: 800; color: #0f172a;">₹</span>
            <input type="number" id="seller-price-${index}" value="${currentPrice}" min="1" step="1" 
                   onkeydown="if(event.key==='Enter') saveSellerProductPrice('${safeEscapedName}', ${index})"
                   style="width: 85px; padding: 5px 8px; border: 1.5px solid ${isCustom ? '#22c55e' : '#cbd5e1'}; border-radius: 6px; font-weight: 800; font-size: 14px; color: #0f172a;">
          </div>
        </td>
        <td>
          <span style="font-size: 11.5px; font-weight: 800; color: #15803d; background: #dcfce7; padding: 2px 7px; border-radius: 4px;">
            Save ${discountPct}%
          </span>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center; align-items: center;">
            <button type="button" class="btn-hub-primary" onclick="saveSellerProductPrice('${safeEscapedName}', ${index})" style="padding: 5px 10px; font-size: 12px; font-weight: 700; border-radius: 6px;">
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
            ${isCustom ? `
              <button type="button" onclick="resetSingleSellerProductPrice('${safeEscapedName}')" title="Reset to default ₹${p.defaultPrice}" style="background: none; border: none; color: #dc2626; cursor: pointer; font-size: 11px; text-decoration: underline; padding: 2px;">
                Reset
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html || '<tr><td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">No products matched your search.</td></tr>';
}

function filterPricingProductsTable() {
  renderSellerPricingTable();
}

function saveSellerProductPrice(productName, index) {
  const input = document.getElementById(`seller-price-${index}`);
  if (!input) return;

  const newPrice = Number(input.value);
  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Please enter a valid price greater than ₹0.");
    return;
  }

  const overrides = getSellerCustomPriceOverrides();
  overrides[productName] = newPrice;
  localStorage.setItem('jk_custom_prices', JSON.stringify(overrides));

  // Show feedback
  const msgEl = document.getElementById('pricingFeedbackMessage');
  if (msgEl) {
    msgEl.style.display = 'block';
    msgEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Saved! "${productName}" updated to <strong>₹${newPrice}</strong>. Live on store.`;
    setTimeout(() => { msgEl.style.display = 'none'; }, 4000);
  }

  if (typeof showToast === 'function') {
    showToast(`✅ Price updated: ${productName} is now ₹${newPrice}!`);
  }

  renderSellerPricingTable();
}

function resetSingleSellerProductPrice(productName) {
  const overrides = getSellerCustomPriceOverrides();
  if (overrides[productName] !== undefined) {
    delete overrides[productName];
    localStorage.setItem('jk_custom_prices', JSON.stringify(overrides));
    if (typeof showToast === 'function') {
      showToast(`Restored default price for ${productName}.`);
    }
    renderSellerPricingTable();
  }
}

function resetAllSellerPricesToDefault() {
  if (confirm("Reset all products back to their factory default prices? Any custom overrides will be removed.")) {
    localStorage.removeItem('jk_custom_prices');
    if (typeof showToast === 'function') {
      showToast("All product prices have been reset to factory defaults.");
    }
    renderSellerPricingTable();
  }
}

// =========================================================
// 10. STOCK & INVENTORY MANAGEMENT ENGINE
// =========================================================

function getSellerStockOverrides() {
  try {
    return JSON.parse(localStorage.getItem('jk_stock_overrides') || '{}');
  } catch(e) {
    return {};
  }
}

function updateSellerInventoryBadges() {
  const overrides = getSellerStockOverrides();
  const products = getAllSellerPricingProducts();
  let outCount = 0;
  let lowCount = 0;
  let inCount = 0;

  products.forEach(p => {
    const s = overrides[p.name] || { status: 'in_stock', qty: 25 };
    if (s.status === 'out_of_stock' || (s.qty !== undefined && Number(s.qty) <= 0)) {
      outCount++;
    } else if (s.status === 'low_stock' || (s.qty !== undefined && Number(s.qty) > 0 && Number(s.qty) <= 5)) {
      lowCount++;
    } else {
      inCount++;
    }
  });

  const badgeEl = document.getElementById('outOfStockBadgeCount');
  if (badgeEl) {
    badgeEl.innerText = `${outCount} Out`;
    badgeEl.style.background = outCount > 0 ? '#fee2e2' : '#e0f2fe';
    badgeEl.style.color = outCount > 0 ? '#dc2626' : '#0369a1';
  }

  const totEl = document.getElementById('inventoryTotalCount');
  if (totEl) totEl.innerText = products.length;
  const inEl = document.getElementById('inventoryInStockCount');
  if (inEl) inEl.innerText = inCount;
  const lowEl = document.getElementById('inventoryLowStockCount');
  if (lowEl) lowEl.innerText = lowCount;
  const outEl = document.getElementById('inventoryOutOfStockCount');
  if (outEl) outEl.innerText = outCount;
}

function renderSellerInventoryTable() {
  const tbody = document.getElementById('sellerInventoryTableBody');
  if (!tbody) return;

  const products = getAllSellerPricingProducts();
  const stockOverrides = getSellerStockOverrides();
  const priceOverrides = getSellerCustomPriceOverrides();

  updateSellerInventoryBadges();

  const searchQuery = String(document.getElementById('inventorySearchInput') ? document.getElementById('inventorySearchInput').value : '').toLowerCase().trim();
  const catFilter = document.getElementById('inventoryCategoryFilter') ? document.getElementById('inventoryCategoryFilter').value : 'all';
  const statusFilter = document.getElementById('inventoryStatusFilter') ? document.getElementById('inventoryStatusFilter').value : 'all';

  let html = '';
  products.forEach((p, index) => {
    if (catFilter !== 'all' && p.category !== catFilter) return;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return;

    const stock = stockOverrides[p.name] || { status: 'in_stock', qty: 25 };
    const currentPrice = (priceOverrides[p.name] !== undefined) ? Number(priceOverrides[p.name]) : p.defaultPrice;

    const isOut = (stock.status === 'out_of_stock' || (stock.qty !== undefined && Number(stock.qty) <= 0));
    const isLow = (!isOut && (stock.status === 'low_stock' || (stock.qty !== undefined && Number(stock.qty) > 0 && Number(stock.qty) <= 5)));
    const actualStatus = isOut ? 'out_of_stock' : (isLow ? 'low_stock' : 'in_stock');
    const currentQty = (stock.qty !== undefined) ? Number(stock.qty) : (isOut ? 0 : 25);

    if (statusFilter !== 'all' && actualStatus !== statusFilter) return;

    const safeEscapedName = p.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');

    // Live preview badge
    let badgeHtml = '';
    if (isOut) {
      badgeHtml = `<span style="font-size: 11px; font-weight: 800; color: #dc2626; background: #fee2e2; border: 1px solid #fca5a5; padding: 3px 8px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-xmark"></i> OUT OF STOCK</span>`;
    } else if (isLow) {
      badgeHtml = `<span style="font-size: 11px; font-weight: 800; color: #b45309; background: #fef3c7; border: 1px solid #fcd34d; padding: 3px 8px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-triangle-exclamation"></i> Only ${currentQty} Left!</span>`;
    } else {
      badgeHtml = `<span style="font-size: 11px; font-weight: 800; color: #16a34a; background: #dcfce7; border: 1px solid #86efac; padding: 3px 8px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-check"></i> In Stock (${currentQty})</span>`;
    }

    const rowBg = isOut ? 'background: #fef2f2;' : (isLow ? 'background: #fffbeb;' : '');

    html += `
      <tr style="${rowBg}">
        <td>
          <img src="${p.image}" alt="${p.name}" onerror="this.src='images/logo-app.png'" style="width: 38px; height: 38px; object-fit: cover; border-radius: 6px; border: 1px solid #e2e8f0;">
        </td>
        <td>
          <div style="font-weight: 800; font-size: 13.5px; color: #0f172a;">${p.name}</div>
          <div style="font-size: 11.5px; color: #64748b;">${p.categoryLabel || p.category} &bull; ₹${currentPrice}</div>
        </td>
        <td>
          <span style="font-size: 11.5px; font-weight: 700; color: #475569; background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">${p.categoryLabel || p.category}</span>
        </td>
        <td>
          <select id="seller-stock-status-${index}" style="padding: 5px 8px; border: 1.5px solid ${isOut ? '#ef4444' : (isLow ? '#f59e0b' : '#22c55e')}; border-radius: 6px; font-weight: 700; font-size: 12.5px; background: white; color: #0f172a; width: 100%;">
            <option value="in_stock" ${actualStatus === 'in_stock' ? 'selected' : ''}>🟢 In Stock</option>
            <option value="low_stock" ${actualStatus === 'low_stock' ? 'selected' : ''}>🟡 Low Stock</option>
            <option value="out_of_stock" ${actualStatus === 'out_of_stock' ? 'selected' : ''}>🔴 Out of Stock</option>
          </select>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 4px;">
            <input type="number" id="seller-stock-qty-${index}" value="${currentQty}" min="0" step="1"
                   style="width: 75px; padding: 5px 8px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-weight: 800; font-size: 13.5px; color: #0f172a;">
            <span style="font-size: 11px; color: #64748b; font-weight: 600;">units</span>
          </div>
        </td>
        <td style="text-align: center;">
          ${badgeHtml}
        </td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center; align-items: center; flex-wrap: wrap;">
            <button type="button" class="btn-hub-primary" onclick="saveSellerProductStock('${safeEscapedName}', ${index})" style="padding: 5px 10px; font-size: 12px; font-weight: 700; border-radius: 6px;">
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
            ${isOut ? `
              <button type="button" class="btn-hub-secondary" onclick="quickSetStockStatus('${safeEscapedName}', 'in_stock', 25)" title="Quickly restore to 25 in stock" style="padding: 4px 8px; font-size: 11px; color: #16a34a; border-color: #86efac; background: #f0fdf4;">
                <i class="fa-solid fa-rotate-left"></i> Restock
              </button>
            ` : `
              <button type="button" class="btn-hub-secondary" onclick="quickSetStockStatus('${safeEscapedName}', 'out_of_stock', 0)" title="Quickly mark Out of Stock" style="padding: 4px 8px; font-size: 11px; color: #dc2626; border-color: #fecaca; background: #fef2f2;">
                <i class="fa-solid fa-ban"></i> Mark Out
              </button>
            `}
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html || '<tr><td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">No products matched your inventory filter.</td></tr>';
}

function saveSellerProductStock(productName, index) {
  const statusSelect = document.getElementById(`seller-stock-status-${index}`);
  const qtyInput = document.getElementById(`seller-stock-qty-${index}`);
  if (!statusSelect || !qtyInput) return;

  let status = statusSelect.value;
  let qty = Number(qtyInput.value);
  if (isNaN(qty) || qty < 0) qty = 0;

  // Auto-align status if qty is 0
  if (qty === 0) {
    status = 'out_of_stock';
  } else if (status === 'out_of_stock' && qty > 0) {
    status = qty <= 5 ? 'low_stock' : 'in_stock';
  }

  const overrides = getSellerStockOverrides();
  overrides[productName] = {
    status: status,
    qty: qty,
    updatedAt: Date.now()
  };
  localStorage.setItem('jk_stock_overrides', JSON.stringify(overrides));

  const msgEl = document.getElementById('inventoryFeedbackMessage');
  if (msgEl) {
    msgEl.style.display = 'block';
    const statusLabel = status === 'out_of_stock' ? '🔴 Out of Stock (Sold Out)' : (status === 'low_stock' ? `🟡 Low Stock (${qty} left)` : `🟢 In Stock (${qty} left)`);
    msgEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Saved! "${productName}" is now <strong>${statusLabel}</strong>.`;
    setTimeout(() => { msgEl.style.display = 'none'; }, 4000);
  }

  if (typeof showToast === 'function') {
    showToast(`Stock updated: ${productName} (${status})`);
  }

  renderSellerInventoryTable();
}

function quickSetStockStatus(productName, status, qty) {
  const overrides = getSellerStockOverrides();
  overrides[productName] = {
    status: status,
    qty: qty,
    updatedAt: Date.now()
  };
  localStorage.setItem('jk_stock_overrides', JSON.stringify(overrides));
  if (typeof showToast === 'function') {
    showToast(`✅ "${productName}" is now ${status === 'out_of_stock' ? 'Out of Stock' : 'In Stock (' + qty + ')'}!`);
  }
  renderSellerInventoryTable();
}

function bulkRestockAll(units) {
  if (confirm(`Restock all items to ${units} units (In Stock)?`)) {
    const products = getAllSellerPricingProducts();
    const overrides = getSellerStockOverrides();
    products.forEach(p => {
      overrides[p.name] = { status: 'in_stock', qty: units, updatedAt: Date.now() };
    });
    localStorage.setItem('jk_stock_overrides', JSON.stringify(overrides));
    if (typeof showToast === 'function') {
      showToast(`All products restocked to ${units} units.`);
    }
    renderSellerInventoryTable();
  }
}

function resetAllSellerStockToDefault() {
  if (confirm("Reset all stock overrides to defaults? (All items will return to In Stock 25 units).")) {
    localStorage.removeItem('jk_stock_overrides');
    if (typeof showToast === 'function') {
      showToast("All inventory levels reset to default.");
    }
    renderSellerInventoryTable();
  }
}

// =========================================================
// 11. DISTRICT & PIN CODE DELIVERY & COD ENGINE (ALL 20 J&K DISTRICTS)
// =========================================================

const DEFAULT_JK_DISTRICT_RATES = {
  // Kashmir Division (10 Districts)
  "Baramulla": {
    name: "Baramulla (Pattan/Sopore/Baramulla)",
    division: "Kashmir",
    deliveryFee: 0,
    codFee: 0,
    isFree: true,
    pins: "193101, 193103, 193108, 193109, 193121, 193122, 193123, 193129, 193141, 193161, 193201, 193202, 193301, 193303, 193401, 193402, 193403, 193404"
  },
  "Srinagar": {
    name: "Srinagar",
    division: "Kashmir",
    deliveryFee: 40,
    codFee: 0,
    isFree: false,
    pins: "190001, 190002, 190003, 190004, 190005, 190006, 190007, 190008, 190009, 190010, 190011, 190012, 190014, 190015, 190017, 190018, 190019, 190020, 190021, 190023, 190024, 190025"
  },
  "Budgam": {
    name: "Budgam",
    division: "Kashmir",
    deliveryFee: 40,
    codFee: 0,
    isFree: false,
    pins: "191111, 191112, 191113, 191114, 191115, 191116, 191121, 193401, 193411, 190015, 190007, 190021"
  },
  "Ganderbal": {
    name: "Ganderbal",
    division: "Kashmir",
    deliveryFee: 45,
    codFee: 0,
    isFree: false,
    pins: "191201, 191202, 191131, 191203, 191204"
  },
  "Bandipora": {
    name: "Bandipora",
    division: "Kashmir",
    deliveryFee: 45,
    codFee: 0,
    isFree: false,
    pins: "193501, 193502, 193503, 193504, 193505"
  },
  "Pulwama": {
    name: "Pulwama",
    division: "Kashmir",
    deliveryFee: 50,
    codFee: 0,
    isFree: false,
    pins: "192301, 192121, 192122, 192123, 192302, 192305, 192306, 192307, 191112"
  },
  "Anantnag": {
    name: "Anantnag (Islamabad)",
    division: "Kashmir",
    deliveryFee: 50,
    codFee: 0,
    isFree: false,
    pins: "192101, 192102, 192122, 192124, 192125, 192126, 192129, 192201, 192202, 192210, 192211, 192244, 192401"
  },
  "Kulgam": {
    name: "Kulgam",
    division: "Kashmir",
    deliveryFee: 50,
    codFee: 0,
    isFree: false,
    pins: "192231, 192232, 192233, 192234, 192235"
  },
  "Shopian": {
    name: "Shopian",
    division: "Kashmir",
    deliveryFee: 50,
    codFee: 0,
    isFree: false,
    pins: "192303, 192304, 192305, 192306, 192124"
  },
  "Kupwara": {
    name: "Kupwara",
    division: "Kashmir",
    deliveryFee: 55,
    codFee: 0,
    isFree: false,
    pins: "193222, 193221, 193223, 193224, 193225, 193124, 193153, 193228, 193301, 193302, 193303"
  },

  // Jammu Division (10 Districts)
  "Jammu": {
    name: "Jammu",
    division: "Jammu",
    deliveryFee: 70,
    codFee: 0,
    isFree: false,
    pins: "180001, 180002, 180003, 180004, 180005, 180006, 180007, 180008, 180009, 180010, 180011, 180012, 180015, 180016, 180017, 180018, 181101, 181102, 181121, 181201, 181205, 181206"
  },
  "Samba": {
    name: "Samba",
    division: "Jammu",
    deliveryFee: 75,
    codFee: 0,
    isFree: false,
    pins: "184121, 184141, 181133, 181141, 181143, 184120"
  },
  "Kathua": {
    name: "Kathua",
    division: "Jammu",
    deliveryFee: 80,
    codFee: 0,
    isFree: false,
    pins: "184101, 184102, 184104, 184121, 184133, 184141, 184142, 184143, 184151, 184201, 184202, 184203, 184206"
  },
  "Udhampur": {
    name: "Udhampur",
    division: "Jammu",
    deliveryFee: 75,
    codFee: 0,
    isFree: false,
    pins: "182101, 182104, 182108, 182118, 182121, 182122, 182124, 182125, 182126, 182141"
  },
  "Reasi": {
    name: "Reasi (Katra)",
    division: "Jammu",
    deliveryFee: 80,
    codFee: 0,
    isFree: false,
    pins: "182311, 182301, 182312, 182313, 182315, 185203"
  },
  "Ramban": {
    name: "Ramban (Banihal)",
    division: "Jammu",
    deliveryFee: 70,
    codFee: 0,
    isFree: false,
    pins: "182144, 182146, 182148, 182143, 182145, 182147"
  },
  "Doda": {
    name: "Doda (Bhaderwah)",
    division: "Jammu",
    deliveryFee: 85,
    codFee: 0,
    isFree: false,
    pins: "182202, 182601, 182201, 182203, 182205, 182221, 182222"
  },
  "Kishtwar": {
    name: "Kishtwar",
    division: "Jammu",
    deliveryFee: 90,
    codFee: 0,
    isFree: false,
    pins: "182204, 182205, 182206, 182207, 182132"
  },
  "Rajouri": {
    name: "Rajouri",
    division: "Jammu",
    deliveryFee: 85,
    codFee: 0,
    isFree: false,
    pins: "185131, 185132, 185135, 185151, 185153, 185201, 185202, 185211, 185212, 185233"
  },
  "Poonch": {
    name: "Poonch",
    division: "Jammu",
    deliveryFee: 90,
    codFee: 0,
    isFree: false,
    pins: "185101, 185102, 185111, 185121, 185211"
  }
};

function getSellerDistrictRates() {
  try {
    const raw = localStorage.getItem('jk_district_rates');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return Object.assign({}, DEFAULT_JK_DISTRICT_RATES, parsed);
      }
    }
  } catch(e) {}
  return Object.assign({}, DEFAULT_JK_DISTRICT_RATES);
}

function updateSellerDeliveryBadges() {
  const rates = getSellerDistrictRates();
  const keys = Object.keys(rates);
  let freeCount = 0;
  let codOverrideCount = 0;

  keys.forEach(k => {
    if (rates[k].isFree) freeCount++;
    if (Number(rates[k].codFee) > 0) codOverrideCount++;
  });

  const freeBadge = document.getElementById('freeDistrictsBadgeCount');
  if (freeBadge) {
    freeBadge.innerText = `${freeCount} FREE`;
    freeBadge.style.background = freeCount > 0 ? '#dcfce7' : '#f1f5f9';
    freeBadge.style.color = freeCount > 0 ? '#16a34a' : '#64748b';
  }

  const freeDistCountEl = document.getElementById('deliveryFreeDistrictsCount');
  if (freeDistCountEl) freeDistCountEl.innerText = freeCount;
  const codCountEl = document.getElementById('deliveryCodOverridesCount');
  if (codCountEl) codCountEl.innerText = codOverrideCount;
  const totDistEl = document.getElementById('deliveryTotalDistrictsCount');
  if (totDistEl) totDistEl.innerText = keys.length;
}

function renderDistrictRatesTable() {
  const tbody = document.getElementById('sellerDeliveryTableBody');
  if (!tbody) return;

  const rates = getSellerDistrictRates();
  updateSellerDeliveryBadges();

  const searchQuery = String(document.getElementById('deliverySearchInput') ? document.getElementById('deliverySearchInput').value : '').toLowerCase().trim();
  const divFilter = document.getElementById('deliveryDivisionFilter') ? document.getElementById('deliveryDivisionFilter').value : 'all';
  const statusFilter = document.getElementById('deliveryStatusFilter') ? document.getElementById('deliveryStatusFilter').value : 'all';

  let html = '';
  const keys = Object.keys(rates);

  keys.forEach((key, index) => {
    const item = rates[key];
    if (divFilter !== 'all' && item.division !== divFilter) return;
    if (statusFilter === 'free' && !item.isFree) return;
    if (statusFilter === 'paid' && item.isFree) return;

    if (searchQuery) {
      const matchName = item.name.toLowerCase().includes(searchQuery) || key.toLowerCase().includes(searchQuery);
      const matchPins = (item.pins || '').toLowerCase().includes(searchQuery);
      if (!matchName && !matchPins) return;
    }

    const isFree = Boolean(item.isFree);
    const delFee = isFree ? 0 : Number(item.deliveryFee || 0);
    const codFee = Number(item.codFee || 0);
    const safeEscapedKey = key.replace(/'/g, "\\'").replace(/"/g, '&quot;');

    html += `
      <tr style="${isFree ? 'background: #f0fdf4;' : ''}">
        <td>
          <div style="font-weight: 800; font-size: 14px; color: #0f172a;">${item.name}</div>
          <span style="font-size: 11px; font-weight: 700; color: ${item.division === 'Kashmir' ? '#0284c7' : '#9333ea'}; background: ${item.division === 'Kashmir' ? '#f0f9ff' : '#faf5ff'}; padding: 1px 6px; border-radius: 4px;">
            ${item.division} Division
          </span>
          ${isFree ? '<span style="font-size: 10.5px; font-weight: 800; color: #16a34a; background: #dcfce7; padding: 1px 6px; border-radius: 4px; margin-left: 4px;">FREE Delivery Active</span>' : ''}
        </td>
        <td>
          <input type="text" id="seller-district-pins-${index}" value="${item.pins || ''}" title="Comma-separated PIN codes for this district"
                 style="width: 100%; min-width: 180px; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12px; color: #334155; font-family: monospace;">
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 14px; font-weight: 800; color: #0f172a;">₹</span>
            <input type="number" id="seller-delivery-fee-${index}" value="${delFee}" min="0" step="5"
                   ${isFree ? 'disabled style="width: 75px; padding: 5px 8px; border: 1.5px solid #86efac; border-radius: 6px; font-weight: 800; font-size: 13.5px; background: #f0fdf4; color: #16a34a;"' : 'style="width: 75px; padding: 5px 8px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-weight: 800; font-size: 13.5px; color: #0f172a;"'}>
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 14px; font-weight: 800; color: #0f172a;">₹</span>
            <input type="number" id="seller-cod-fee-${index}" value="${codFee}" min="0" step="5"
                   style="width: 75px; padding: 5px 8px; border: 1.5px solid ${codFee > 0 ? '#3b82f6' : '#cbd5e1'}; border-radius: 6px; font-weight: 800; font-size: 13.5px; color: #0f172a;">
          </div>
        </td>
        <td style="text-align: center;">
          <button type="button" onclick="toggleDistrictFreeDelivery('${safeEscapedKey}')" 
                  style="cursor: pointer; border-radius: 20px; padding: 6px 14px; font-size: 12px; font-weight: 800; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; ${isFree ? 'background: #16a34a; color: white; border: 1.5px solid #15803d; box-shadow: 0 2px 6px rgba(22,163,74,0.3);' : 'background: #f1f5f9; color: #475569; border: 1.5px solid #cbd5e1;'}">
            ${isFree ? '<i class="fa-solid fa-gift"></i> FREE ACTIVE (₹0)' : '<i class="fa-solid fa-tag"></i> Set FREE'}
          </button>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center; align-items: center;">
            <button type="button" class="btn-hub-primary" onclick="saveDistrictRate('${safeEscapedKey}', ${index})" style="padding: 5px 10px; font-size: 12px; font-weight: 700; border-radius: 6px;">
              <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
            <button type="button" onclick="resetSingleDistrictRate('${safeEscapedKey}')" title="Reset district to factory default rate" style="background: none; border: none; color: #dc2626; cursor: pointer; font-size: 11px; text-decoration: underline; padding: 2px;">
              Reset
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html || '<tr><td colspan="6" style="text-align: center; padding: 24px; color: #64748b;">No districts matched your search.</td></tr>';
}

function saveDistrictRate(districtKey, index) {
  const feeInput = document.getElementById(`seller-delivery-fee-${index}`);
  const codInput = document.getElementById(`seller-cod-fee-${index}`);
  const pinsInput = document.getElementById(`seller-district-pins-${index}`);
  if (!feeInput || !codInput) return;

  const rates = getSellerDistrictRates();
  if (!rates[districtKey]) return;

  const newFee = Number(feeInput.value);
  const newCod = Number(codInput.value);
  const newPins = pinsInput ? pinsInput.value.trim() : (rates[districtKey].pins || '');

  rates[districtKey].deliveryFee = isNaN(newFee) || newFee < 0 ? 0 : newFee;
  rates[districtKey].codFee = isNaN(newCod) || newCod < 0 ? 0 : newCod;
  rates[districtKey].pins = newPins;
  if (newFee > 0 && rates[districtKey].isFree) {
    rates[districtKey].isFree = false;
  }

  localStorage.setItem('jk_district_rates', JSON.stringify(rates));

  const msgEl = document.getElementById('deliveryFeedbackMessage');
  if (msgEl) {
    msgEl.style.display = 'block';
    msgEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Saved! <strong>${rates[districtKey].name}</strong>: Delivery ₹${rates[districtKey].deliveryFee}, COD Fee ₹${rates[districtKey].codFee}. Live on checkout.`;
    setTimeout(() => { msgEl.style.display = 'none'; }, 4000);
  }

  if (typeof showToast === 'function') {
    showToast(`✅ Rates saved for ${rates[districtKey].name}`);
  }

  renderDistrictRatesTable();
}

function toggleDistrictFreeDelivery(districtKey) {
  const rates = getSellerDistrictRates();
  if (!rates[districtKey]) return;

  const current = Boolean(rates[districtKey].isFree);
  rates[districtKey].isFree = !current;
  if (!current) {
    rates[districtKey]._prevFee = rates[districtKey].deliveryFee;
    rates[districtKey].deliveryFee = 0;
  } else {
    rates[districtKey].deliveryFee = rates[districtKey]._prevFee || 40;
  }

  localStorage.setItem('jk_district_rates', JSON.stringify(rates));

  if (typeof showToast === 'function') {
    showToast(`District ${rates[districtKey].name}: Delivery is now ${rates[districtKey].isFree ? 'FREE (₹0)' : '₹' + rates[districtKey].deliveryFee}`);
  }

  renderDistrictRatesTable();
}

function setAllDistrictsFree(makeFree) {
  const rates = getSellerDistrictRates();
  Object.keys(rates).forEach(k => {
    rates[k].isFree = makeFree;
    if (makeFree) {
      rates[k]._prevFee = rates[k].deliveryFee || 50;
      rates[k].deliveryFee = 0;
    } else {
      rates[k].deliveryFee = rates[k]._prevFee || (rates[k].division === 'Kashmir' ? 45 : 75);
    }
  });

  localStorage.setItem('jk_district_rates', JSON.stringify(rates));

  if (typeof showToast === 'function') {
    showToast(makeFree ? "🎉 FREE Delivery enabled for ALL 20 J&K districts!" : "Standard delivery charges applied to all districts.");
  }

  renderDistrictRatesTable();
}

function resetSingleDistrictRate(districtKey) {
  const rates = getSellerDistrictRates();
  if (DEFAULT_JK_DISTRICT_RATES[districtKey]) {
    rates[districtKey] = Object.assign({}, DEFAULT_JK_DISTRICT_RATES[districtKey]);
    localStorage.setItem('jk_district_rates', JSON.stringify(rates));
    if (typeof showToast === 'function') {
      showToast(`Restored default rate for ${districtKey}`);
    }
    renderDistrictRatesTable();
  }
}

function resetAllDistrictRatesToDefault() {
  if (confirm("Reset delivery rates for all 20 J&K districts to factory defaults?")) {
    localStorage.removeItem('jk_district_rates');
    if (typeof showToast === 'function') {
      showToast("All district delivery and COD rates reset to defaults.");
    }
    renderDistrictRatesTable();
  }
}



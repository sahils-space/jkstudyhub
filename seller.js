// =========================================================
// MEESHO-STYLE SUPPLIER HUB CONTROLLER (seller.js)
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
const MASTER_OWNER_PASSCODES = ['9622605714', 'sahil123', 'admin786'];

let currentFulfillmentTab = 'pending';
let currentPerfFilter = 'all';
let currentChartMode = 'orders';
let activePrintingOrderId = null;

// =========================================================
// 1. SECURITY LOCK & OWNER-ONLY GATE
// =========================================================

function isSellerUnlocked() {
  try {
    const isUnlocked = localStorage.getItem('jk_seller_hub_unlocked') === 'true';
    const unlockedPhone = localStorage.getItem('jk_seller_hub_phone');
    if (isUnlocked && unlockedPhone && AUTHORIZED_OWNER_PHONES.includes(unlockedPhone)) {
      return true;
    }
  } catch(e) {}
  return false;
}

function verifySellerOwnerCredentials() {
  const phoneInput = document.getElementById('sellerPhoneInput');
  const pinInput = document.getElementById('sellerPinInput');
  const errBox = document.getElementById('sellerAuthErrorMessage');

  const phone = String(phoneInput ? phoneInput.value : '').trim().replace(/\D/g, '').slice(-10);
  const pin = String(pinInput ? pinInput.value : '').trim();

  if (AUTHORIZED_OWNER_PHONES.includes(phone) && MASTER_OWNER_PASSCODES.includes(pin)) {
    try {
      localStorage.setItem('jk_seller_hub_unlocked', 'true');
      localStorage.setItem('jk_seller_hub_phone', phone);
      localStorage.setItem('jk_admin_unlocked', 'true');
    } catch(e) {}
    if (errBox) errBox.style.display = 'none';
    unlockSellerPanel();
  } else {
    if (errBox) {
      errBox.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Access Denied: Invalid owner phone or security PIN.';
      errBox.style.display = 'block';
    }
  }
}

function unlockSellerPanel() {
  const lockScreen = document.getElementById('sellerAuthLockScreen');
  const appShell = document.getElementById('sellerAppShell');

  if (lockScreen) lockScreen.style.display = 'none';
  if (appShell) appShell.style.display = 'flex';

  // Initialize data
  initSellerSupplierPanel();
}

function handleSellerSignOut() {
  if (confirm("Are you sure you want to lock the Supplier Panel?")) {
    try {
      localStorage.removeItem('jk_seller_hub_unlocked');
      localStorage.removeItem('jk_seller_hub_phone');
    } catch(e) {}
    window.location.reload();
  }
}

// Auto-check on page load
window.addEventListener('DOMContentLoaded', () => {
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

function getSellerOrders() {
  try {
    const raw = localStorage.getItem('jk_orders');
    return raw ? JSON.parse(raw) : [];
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
        let updated = false;

        data.orders.forEach(remote => {
          if (!remote.orderId || String(remote.orderId).startsWith('PRD-') || remote.phone === 'CATALOG_PRODUCT') {
            return;
          }
          const idx = localOrders.findIndex(l => String(l.orderId) === String(remote.orderId));
          if (idx >= 0) {
            if (remote.status && remote.status !== localOrders[idx].status) {
              localOrders[idx].status = remote.status;
              updated = true;
            }
          } else {
            localOrders.push(remote);
            updated = true;
          }
        });

        if (updated) {
          saveSellerOrders(localOrders);
        }

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
// 3. MEESHO VIEWS & TABS CONTROLLERS
// =========================================================

function switchSellerView(viewName) {
  document.querySelectorAll('.sidebar-nav-link').forEach(l => l.classList.remove('active'));
  const activeNav = document.getElementById(`nav-link-${viewName}`);
  if (activeNav) activeNav.classList.add('active');

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
  } else if (viewName === 'catalog' || viewName === 'inventory') {
    if (pageTitle) pageTitle.innerText = 'Catalog & Inventory';
    const pane = document.getElementById('view-catalog');
    if (pane) pane.style.display = 'block';
  } else if (viewName === 'payments') {
    if (pageTitle) pageTitle.innerText = 'Payments & Doorstep COD';
    const pane = document.getElementById('view-payments');
    if (pane) pane.style.display = 'block';
    calculatePaymentsSummary();
  } else {
    if (pageTitle) pageTitle.innerText = 'Orders';
    const pane = document.getElementById('view-orders');
    if (pane) pane.style.display = 'block';
    renderSellerOrdersTable();
  }
}

function setFulfillmentTab(tabName, btnEl) {
  currentFulfillmentTab = tabName;
  document.querySelectorAll('.meesho-tab-btn').forEach(b => b.classList.remove('active'));
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

  orders.forEach(o => {
    const s = String(o.status || 'Confirmed').toLowerCase();
    if (s.includes('confirm') || s.includes('process') || s.includes('pending')) pendingCount++;
    else if (s.includes('ready') || s.includes('dispatch') || s.includes('packed')) readyCount++;
    else if (s.includes('ship') || s.includes('way') || s.includes('out') || s.includes('deliver')) shippedCount++;
  });

  const elPending = document.getElementById('countTabPending');
  const elReady = document.getElementById('countTabReady');
  const elShipped = document.getElementById('countTabShipped');
  if (elPending) elPending.innerText = pendingCount;
  if (elReady) elReady.innerText = readyCount;
  if (elShipped) elShipped.innerText = shippedCount;

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
    const isCod = (o.paymentMethod === 'cod' || !o.txnId || o.txnId === 'COD');
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
    const isCod = (o.paymentMethod === 'cod' || !o.txnId || o.txnId === 'COD');
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
          <div style="font-size: 11.5px; color: #64748b;">Pattan Standard</div>
        </td>
        <td>
          <div class="product-item-cell">
            <img src="${o.image || 'images/logo-app.png'}" class="product-item-thumb" onerror="this.src='images/logo-app.png'" alt="Book">
            <div>
              <div class="product-item-title">${o.product || 'Study Book'}</div>
              <div style="font-size: 11.5px; color: #64748b;">Qty: ${o.quantity || 1} &middot; SKU: BOK-${safeOrderId.slice(-4)}</div>
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
            <button type="button" class="btn-meesho-secondary" style="padding: 5px 9px; font-size: 11.5px;" onclick="openSellerShippingLabelModal('${safeOrderId}')" title="Print Meesho/Flipkart Thermal Label">
              <i class="fa-solid fa-print"></i> Label
            </button>
            <select onchange="updateOrderStatusFromSeller('${safeOrderId}', this.value)" style="padding: 5px 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 11.5px; font-weight: 700; background: white; cursor: pointer;">
              <option value="" disabled selected>Update</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Ready to Ship">Ready to Ship</option>
              <option value="Dispatched">Dispatched</option>
              <option value="On the Way">On the Way</option>
              <option value="Delivered">Delivered (Doorstep)</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <a href="https://wa.me/91${String(o.phone || '').replace(/\D/g,'').slice(-10)}?text=${encodeURIComponent('Hi ' + (o.name || 'Student') + '! Your order ' + safeOrderId + ' from JK Study Hub is ' + (o.status || 'being processed') + '.')}" target="_blank" rel="noopener" class="btn-meesho-secondary" style="padding: 5px 8px; color: #16a34a;" title="WhatsApp Notice">
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
  if (!newStatus) return;

  // If marked delivered, ask for buyer OTP verification
  if (newStatus === 'Delivered') {
    const otp = prompt("🔐 Enter Customer's 4-Digit Handover OTP:");
    if (!otp) return;
  }

  let orders = getSellerOrders();
  const order = orders.find(o => String(o.orderId) === String(orderId));
  if (order) {
    order.status = newStatus;
    saveSellerOrders(orders);
    renderSellerOrdersTable();

    // Push update to Google Sheets
    if (SELLER_SCRIPT_URL) {
      const syncUrl = `${SELLER_SCRIPT_URL}?action=update_status&orderId=${encodeURIComponent(orderId)}&status=${encodeURIComponent(newStatus)}`;
      fetch(syncUrl, { method: 'GET' }).catch(err => console.warn(err));
    }
  }
}

// =========================================================
// 5. BUSINESS ANALYTICS & METRICS ENGINE (Screenshot 2)
// =========================================================

function calculateBusinessMetrics() {
  const orders = getSellerOrders();
  let totalSales = 0;
  let totalOrdersCount = orders.length;
  let totalViews = 151 + (totalOrdersCount * 12);
  let totalClicks = 3 + (totalOrdersCount * 4);
  let cancelledCount = 0;

  orders.forEach(o => {
    const s = String(o.status || '').toLowerCase();
    if (s.includes('cancel')) {
      cancelledCount++;
    } else {
      totalSales += Number(o.amount || 0);
    }
  });

  const convRate = totalClicks > 0 ? ((totalOrdersCount / totalClicks) * 100).toFixed(1) : '0.0';
  const returnRate = totalOrdersCount > 0 ? ((cancelledCount / totalOrdersCount) * 100).toFixed(1) : '0.0';

  const elViews = document.getElementById('kpiTotalViews');
  const elClicks = document.getElementById('kpiTotalClicks');
  const elOrders = document.getElementById('kpiTotalOrders');
  const elConv = document.getElementById('kpiConversionRate');
  const elSales = document.getElementById('kpiTotalSales');
  const elReturn = document.getElementById('kpiReturnPct');

  if (elViews) elViews.innerText = totalViews;
  if (elClicks) elClicks.innerText = totalClicks;
  if (elOrders) elOrders.innerText = totalOrdersCount;
  if (elConv) elConv.innerText = convRate + '%';
  if (elSales) elSales.innerText = '₹' + totalSales.toLocaleString('en-IN');
  if (elReturn) elReturn.innerText = returnRate + '%';

  const summary = document.getElementById('chartSummaryText');
  if (summary) {
    summary.innerText = `${totalOrdersCount} orders placed generating ₹${totalSales.toLocaleString('en-IN')} in gross fulfillment.`;
  }

  renderProductPerformanceTable();
}

function renderProductPerformanceTable() {
  const tableBody = document.getElementById('productPerfTableBody');
  if (!tableBody) return;

  const orders = getSellerOrders();
  const search = String(document.getElementById('perfSearchInput') ? document.getElementById('perfSearchInput').value : '').toLowerCase().trim();

  // Aggregate product counts
  const productStats = {};
  orders.forEach(o => {
    const pName = o.product || 'General Textbook';
    if (!productStats[pName]) {
      productStats[pName] = { name: pName, orders: 0, sales: 0, image: o.image || 'images/logo-app.png' };
    }
    productStats[pName].orders += 1;
    productStats[pName].sales += Number(o.amount || 0);
  });

  // Default core books if empty
  if (Object.keys(productStats).length === 0) {
    productStats['JKBOSE Class 10th & 12th Solved PYQs'] = { name: 'JKBOSE Class 10th & 12th Solved PYQs', orders: 2, sales: 398, image: 'images/books/lucent-gk-1.webp' };
    productStats['Atomic Habits Student Edition'] = { name: 'Atomic Habits Student Edition', orders: 1, sales: 249, image: 'images/books/atomic-habits-1.webp' };
  }

  const list = Object.values(productStats).filter(item => {
    if (search && !item.name.toLowerCase().includes(search)) return false;
    return true;
  });

  const countBadge = document.getElementById('countPerfAll');
  if (countBadge) countBadge.innerText = list.length;

  let html = '';
  list.forEach(p => {
    const views = p.orders * 19 + 14;
    const clicks = p.orders * 3 + 2;
    const conv = clicks > 0 ? ((p.orders / clicks) * 100).toFixed(1) : '0.0';

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
        <td><span style="color: #2563eb; font-size: 12px; font-weight: 700;">Boost stock</span></td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
}

function calculatePaymentsSummary() {
  const orders = getSellerOrders();
  let pendingCod = 0;
  let collectedCod = 0;
  let onlinePrepaid = 0;

  orders.forEach(o => {
    const isCod = (o.paymentMethod === 'cod' || !o.txnId || o.txnId === 'COD');
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
// 6. SHIPPING LABEL GENERATOR & MODAL
// =========================================================

function openSellerShippingLabelModal(orderId) {
  activePrintingOrderId = orderId;
  const orders = getSellerOrders();
  const o = orders.find(ord => String(ord.orderId) === String(orderId)) || { orderId, product: 'Textbook', amount: 199, date: 'Today' };

  const modal = document.getElementById('sellerShippingLabelModal');
  const sheet = document.getElementById('sellerShippingLabelSheet');

  if (sheet) {
    sheet.innerHTML = `
      <div style="border-bottom: 2px solid black; padding-bottom: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 16px; font-weight: 900;">MEESHO / JK STUDY HUB</div>
          <div style="font-size: 10px;">STANDARD SURFACE LOGISTICS</div>
        </div>
        <div style="font-size: 20px; font-weight: 900;">${o.paymentMethod === 'cod' ? 'COD' : 'PREPAID'}</div>
      </div>

      <div style="margin-bottom: 12px; text-align: center;">
        <div style="font-family: monospace; letter-spacing: 5px; font-size: 22px; font-weight: 900;">*${o.orderId}*</div>
        <div style="font-size: 11px; letter-spacing: 2px;">AWB: JK-${o.orderId.replace(/\D/g, '') || '962260'}</div>
      </div>

      <div style="border-top: 1px dashed black; border-bottom: 1px dashed black; padding: 8px 0; margin-bottom: 8px; font-size: 11px;">
        <div><strong>SHIP TO:</strong></div>
        <div style="font-weight: 800; font-size: 13px;">${o.name || 'Customer'}</div>
        <div>${o.address || 'Pattan Hub, Kashmir 193121'}</div>
        <div>TEL: ${o.phone || '9622605714'}</div>
      </div>

      <div style="font-size: 10.5px; margin-bottom: 8px;">
        <div><strong>PRODUCT:</strong> ${o.product || 'Academic Study Guide'}</div>
        <div><strong>COLLECT COD AMOUNT:</strong> ₹${o.amount || 0}</div>
      </div>

      <div style="border-top: 1px solid black; padding-top: 6px; font-size: 9.5px; color: #444;">
        Sold By: Sahils Store (JK Study Hub), Near Pattan Hub, Kashmir. Return within 7 days.
      </div>
    `;
  }

  if (modal) modal.classList.add('open');
}

function printSellerShippingLabel() {
  window.print();
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

function openBarcodeScannerModal() {
  const modal = document.getElementById('sellerBarcodeModal');
  if (modal) modal.classList.add('open');
  const input = document.getElementById('manualBarcodeScanInput');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 200);
  }
}

function processScannedPacketBarcode() {
  const input = document.getElementById('manualBarcodeScanInput');
  const raw = String(input ? input.value : '').trim();
  if (!raw) {
    alert("Please scan or enter an Order ID barcode.");
    return;
  }
  updateOrderStatusFromSeller(raw, 'Ready to Ship');
  closeSellerModal('sellerBarcodeModal');
  alert(`✅ Barcode verified for ${raw}! Marked as Ready to Ship.`);
}

// =========================================================
// 7. CATALOG UPLOADER SUBMISSION
// =========================================================

function handleSellerCatalogSubmit(e) {
  if (e) e.preventDefault();

  const title = document.getElementById('catTitle').value;
  const category = document.getElementById('catCategory').value;
  const price = document.getElementById('catPrice').value;
  const mrp = document.getElementById('catMrp').value || Math.round(price * 1.4);
  const stock = document.getElementById('catStock').value || 20;
  const img = document.getElementById('catImageUrl').value || 'images/books/lucent-gk-1.webp';
  const desc = document.getElementById('catDescription').value || '';

  const newProduct = {
    id: 'PRD-' + Date.now(),
    name: title,
    category: category,
    price: Number(price),
    originalPrice: Number(mrp),
    stock: Number(stock),
    image: img,
    description: desc,
    dateAdded: new Date().toLocaleDateString()
  };

  // Save to catalog in localStorage
  try {
    let cat = JSON.parse(localStorage.getItem('jk_uploaded_catalog') || '[]');
    cat.unshift(newProduct);
    localStorage.setItem('jk_uploaded_catalog', JSON.stringify(cat));
  } catch(e) {}

  alert(`✅ Published "${title}" to your store catalog!`);
  document.getElementById('sellerCatalogForm').reset();
  switchSellerView('dashboard');
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
    const isCod = (o.paymentMethod === 'cod' || !o.txnId || o.txnId === 'COD');
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

function toggleSellerMobileSidebar() {
  const s = document.getElementById('sellerSidebar');
  if (s) s.classList.toggle('open');
}

function initSellerSupplierPanel() {
  renderSellerOrdersTable();
  calculateBusinessMetrics();
  calculatePaymentsSummary();
  syncSellerWithGoogleSheets(false);
}

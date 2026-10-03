let currentProduct = '';
let currentPrice = 0;
let productCategory = 'standard';

function openCheckout(name, price, type, category) {
  currentProduct = name;
  currentPrice = price;
  productCategory = category;

  // Update Invoice
  document.getElementById('itemName').innerText = name;
  document.getElementById('itemPrice').innerText = '₹' + price;
  document.getElementById('totalPrice').innerText = '₹' + (price + 5);

  // Reset Modal to Step 1
  document.getElementById('checkoutForm').reset();
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step1').style.display = 'block';
  document.getElementById('progressStep2').classList.remove('active-step');
  document.getElementById('progressStep1').classList.add('active-step');

  // Reset displays
  document.getElementById('notesSpecificFields').style.display = 'none';
  document.getElementById('formSpecificFields').style.display = 'none';
  document.getElementById('addressFields').style.display = 'none';
  
  document.getElementById('notesSubject').removeAttribute('required');
  document.getElementById('digitalFormType').removeAttribute('required');
  document.getElementById('orderAddress').removeAttribute('required');

  // Specific Modal Views
  if (category === 'notes' || category === 'both') {
    document.getElementById('notesSpecificFields').style.display = 'block';
    document.getElementById('notesSubject').setAttribute('required', 'true');
    document.getElementById('addressFields').style.display = 'block';
    document.getElementById('orderAddress').setAttribute('required', 'true');
  } 
  if (category === 'form' || category === 'both') {
    document.getElementById('formSpecificFields').style.display = 'block';
    document.getElementById('digitalFormType').setAttribute('required', 'true');
  } 
  if (category === 'standard' || category === 'both') {
    document.getElementById('addressFields').style.display = 'block';
    document.getElementById('orderAddress').setAttribute('required', 'true');
  }

  document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('active');
}

function updateChecklist() {
  const formType = document.getElementById('digitalFormType').value;
  const list = document.getElementById('checklistItems');
  
  if (formType === 'Scholarship') {
    list.innerHTML = '<li>Aadhar Card</li><li>Income Certificate</li><li>Previous Year Marks Card</li><li>Bank Passbook Photo</li>';
  } else if (formType === 'JKBOSE Registration') {
    list.innerHTML = '<li>Passport Size Photo</li><li>DOB Certificate</li><li>Aadhar Card</li>';
  } else if (formType === 'College Admission') {
    list.innerHTML = '<li>12th Marks Card</li><li>Migration Certificate</li><li>Category Certificate (if any)</li>';
  }
}

// --- WIZARD NAVIGATION ---
function goToStep2() {
  const form = document.getElementById('checkoutForm');
  if (!form.reportValidity()) {
    return; // Stop if required fields are empty
  }
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  document.getElementById('progressStep1').classList.remove('active-step');
  document.getElementById('progressStep2').classList.add('active-step');
}

function backToStep1() {
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step1').style.display = 'block';
  document.getElementById('progressStep2').classList.remove('active-step');
  document.getElementById('progressStep1').classList.add('active-step');
}

// --- RAZORPAY INTEGRATION ---
function startRazorpayPayment() {
  const form = document.getElementById('checkoutForm');
  if (!form.reportValidity()) {
    return;
  }

  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;
  const totalPaid = currentPrice + 5;
  
  const btn = document.getElementById('submitOrderBtn');
  btn.innerHTML = 'Opening Secure Checkout...';
  btn.disabled = true;

  var options = {
    "key": "rzp_live_TjJ6bv39yo6Gds",
    "amount": totalPaid * 100, // Amount is in currency subunits (paise)
    "currency": "INR",
    "name": "JK Study Hub",
    "description": currentProduct,
    "image": "images/icon.svg",
    "handler": function (response) {
        // Automatically called when payment succeeds
        const txnId = response.razorpay_payment_id;
        btn.innerHTML = 'Verifying & Saving...';
        processOrder(txnId); // Save to Google Sheets
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
            btn.innerHTML = 'Pay Securely';
            btn.disabled = false;
        }
    }
  };
  
  var rzp1 = new Razorpay(options);
  
  rzp1.on('payment.failed', function (response){
      alert("Payment Failed! Reason: " + response.error.description);
      btn.innerHTML = 'Pay Securely';
      btn.disabled = false;
  });
  
  rzp1.open();
}

// --- GOOGLE SHEETS BACKEND (Will be called after successful payment) ---
function processOrder(txnId) {
  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;
  
  let finalAddress = 'Digital Service (No Address)';
  let finalProductDesc = currentProduct;

  if (productCategory === 'notes' || productCategory === 'standard') {
    const pin = document.getElementById('orderPin').value;
    const city = document.getElementById('orderCity').value;
    const street = document.getElementById('orderAddress').value;
    finalAddress = `${street}, ${city} - ${pin}`;
    
    if (productCategory === 'notes') {
      const cls = document.getElementById('notesClass').value;
      const sub = document.getElementById('notesSubject').value;
      finalProductDesc = `${currentProduct} [${cls} - ${sub}]`;
    }
  } 
  else if (productCategory === 'form') {
    const formSelected = document.getElementById('digitalFormType').value;
    const filesAttached = document.getElementById('formAttachments').files.length;
    finalProductDesc = `${currentProduct} [Type: ${formSelected}] (Files Attached: ${filesAttached})`;
  }

  const totalPaid = currentPrice + 5;
  const combinedProduct = `${finalProductDesc} | Paid: ₹${totalPaid} | TXN: ${txnId}`;

  const scriptURL = 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('address', finalAddress);
  formData.append('product', combinedProduct);

  fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
    .then(() => {
            alert(`Order Successful!\n\nThank you, ${name}. Your payment of ₹${totalPaid} has been verified.\nWe will contact you on WhatsApp shortly.`);
      if(isCartCheckout) { cart = []; saveState(); isCartCheckout = false; }
      closeCheckout();
      document.getElementById('submitOrderBtn').innerHTML = 'Pay Securely';
      document.getElementById('submitOrderBtn').disabled = false;
    })
    .catch(error => {
      alert("Error saving order details. Please contact support.");
    });
}



// --- CART & WISHLIST STATE ---
let cart = JSON.parse(localStorage.getItem('jk_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let isCartCheckout = false;

function saveState() {
  localStorage.setItem('jk_cart', JSON.stringify(cart));
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateBadges();
}

function updateBadges() {
  const cBadge = document.getElementById('cartCount');
  const wBadge = document.getElementById('wishlistCount');
  
  if(cart.length > 0) { cBadge.style.display = 'inline-block'; cBadge.innerText = cart.length; }
  else { cBadge.style.display = 'none'; }
  
  if(wishlist.length > 0) { wBadge.style.display = 'inline-block'; wBadge.innerText = wishlist.length; }
  else { wBadge.style.display = 'none'; }
}

// --- SIDEBAR UI ---
function openCart() {
  renderCart();
  document.getElementById('sidebarOverlay').classList.add('active');
  document.getElementById('cartSidebar').classList.add('active');
}

function openWishlist() {
  renderWishlist();
  document.getElementById('sidebarOverlay').classList.add('active');
  document.getElementById('wishlistSidebar').classList.add('active');
}

function closeSidebars() {
  document.getElementById('sidebarOverlay').classList.remove('active');
  document.getElementById('cartSidebar').classList.remove('active');
  document.getElementById('wishlistSidebar').classList.remove('active');
}

// --- WISHLIST LOGIC ---
function toggleFavorite(btn) {
  const card = btn.closest('.product-card');
  const title = card.querySelector('.product-title').innerText;
  const priceText = card.querySelector('.product-price').innerText.replace('₹','');
  
  // Try to find the onclick args from the buy button to save category data
  const onclickStr = card.querySelector('.buy-btn').getAttribute('onclick');
  const args = onclickStr.replace('openCheckout(', '').replace(')', '').split(',');
  const category = args[3] ? args[3].replace(/'/g, '').trim() : 'standard';

  btn.classList.toggle('active');
  
  if (btn.classList.contains('active')) {
    if(!wishlist.find(i => i.name === title)) {
      wishlist.push({ name: title, price: parseInt(priceText), category: category });
    }
  } else {
    wishlist = wishlist.filter(item => item.name !== title);
  }
  saveState();
}

function renderWishlist() {
  const container = document.getElementById('wishlistItemsContainer');
  if (wishlist.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#64748b; margin-top: 20px;">Your wishlist is empty.</p>';
    return;
  }
  
  let html = '';
  wishlist.forEach((item, index) => {
    html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <button class="remove-btn" onclick="removeFromWishlist(${index})">Remove</button>
        </div>
        <button class="btn-primary" style="padding: 6px 12px; font-size:12px;" onclick="addToCart('${item.name}', ${item.price}, 'physical', '${item.category}')">Add to Cart</button>
      </div>
    `;
  });
  container.innerHTML = html;
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  saveState();
  renderWishlist();
  
  // Also uncheck the heart on the main page
  document.querySelectorAll('.product-card').forEach(card => {
    const title = card.querySelector('.product-title').innerText;
    if(!wishlist.find(i => i.name === title)) {
      const icon = card.querySelector('.wishlist-icon');
      if(icon) icon.classList.remove('active');
    }
  });
}

// --- CART LOGIC ---
function addToCart(name, price, type, category) {
  cart.push({ name, price, category });
  saveState();
  
  // Show quick toast/alert or just open cart
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveState();
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  
  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#64748b; margin-top: 20px;">Your cart is empty.</p>';
    subtotalEl.innerText = '₹0';
    return;
  }
  
  let html = '';
  let subtotal = 0;
  cart.forEach((item, index) => {
    subtotal += item.price;
    html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
  subtotalEl.innerText = '₹' + subtotal;
}

function checkoutCart() {
  if (cart.length === 0) return;
  
  isCartCheckout = true;
  
  // Calculate totals and combined names
  let total = 0;
  let names = [];
  let hasNotes = false;
  let hasForms = false;
  
  cart.forEach(item => {
    total += item.price;
    names.push(item.name);
    if(item.category === 'notes') hasNotes = true;
    if(item.category === 'form') hasForms = true;
  });
  
  const combinedName = "Cart: " + names.join(", ");
  
  // We need to trigger the checkout modal but adapt it for multiple items
  // To keep it simple, if they mix forms and notes, show both fields.
  let targetCategory = 'standard';
  if (hasNotes && hasForms) targetCategory = 'both';
  else if (hasNotes) targetCategory = 'notes';
  else if (hasForms) targetCategory = 'form';
  
  closeSidebars();
  openCheckout(combinedName, total, 'mixed', targetCategory);
}

// --- INIT ---
window.addEventListener('DOMContentLoaded', () => {
  updateBadges();
  
  // Restore heart icons
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const title = card.querySelector('.product-title').innerText;
    if(wishlist.find(i => i.name === title)) {
      const icon = card.querySelector('.wishlist-icon');
      if(icon) icon.classList.add('active');
    }
  });
});

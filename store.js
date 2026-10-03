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
  if (category === 'notes') {
    document.getElementById('notesSpecificFields').style.display = 'block';
    document.getElementById('notesSubject').setAttribute('required', 'true');
    document.getElementById('addressFields').style.display = 'block';
    document.getElementById('orderAddress').setAttribute('required', 'true');
  } 
  else if (category === 'form') {
    document.getElementById('formSpecificFields').style.display = 'block';
    document.getElementById('digitalFormType').setAttribute('required', 'true');
  } 
  else if (category === 'standard') {
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

  if (productCategory === 'notes') {
    const cls = document.getElementById('notesClass').value;
    const sub = document.getElementById('notesSubject').value;
    finalProductDesc = `${currentProduct} [${cls} - ${sub}]`;
    finalAddress = document.getElementById('orderAddress').value;
  } 
  else if (productCategory === 'form') {
    const formSelected = document.getElementById('digitalFormType').value;
    const filesAttached = document.getElementById('formAttachments').files.length;
    finalProductDesc = `${currentProduct} [Type: ${formSelected}] (Files Attached: ${filesAttached})`;
  } 
  else if (productCategory === 'standard') {
    finalAddress = document.getElementById('orderAddress').value;
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
      closeCheckout();
      document.getElementById('submitOrderBtn').innerHTML = 'Pay Securely';
      document.getElementById('submitOrderBtn').disabled = false;
    })
    .catch(error => {
      alert("Error saving order details. Please contact support.");
    });
}

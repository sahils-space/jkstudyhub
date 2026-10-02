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
  document.getElementById('checkoutForm').reset();
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

function processOrder(e) {
  e.preventDefault();
  
  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;
  const txnId = document.getElementById('orderTxn').value;
  
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

  const btn = document.getElementById('submitOrderBtn');
  btn.innerHTML = 'Processing...';
  btn.disabled = true;

  const scriptURL = 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec';
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('address', finalAddress);
  formData.append('product', combinedProduct);

  fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
    .then(() => {
      alert(`Order Successful!\n\nThank you, ${name}. Your payment of ₹${totalPaid} has been recorded.\nWe will contact you on WhatsApp shortly.`);
      closeCheckout();
      btn.innerHTML = 'Place Order';
      btn.disabled = false;
    })
    .catch(error => {
      alert("Error placing order. Please try again.");
      btn.innerHTML = 'Place Order';
      btn.disabled = false;
    });
}

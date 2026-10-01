with open('script.js', 'r') as f:
    content = f.read()

js_addition = """
  // =========================================================
  // STORE & ORDER MODAL CONTROLLER
  // =========================================================

  const orderModalOverlay = document.getElementById('orderModalOverlay');
  const orderProductSelect = document.getElementById('orderProduct');
  const orderSubmitBtn = document.getElementById('orderSubmitBtn');

  window.openOrderModal = function(productName) {
    if (!orderModalOverlay) return;
    
    // Pre-select the product in the dropdown
    if (orderProductSelect && productName) {
      for(let i=0; i<orderProductSelect.options.length; i++) {
        if(orderProductSelect.options[i].value === productName) {
          orderProductSelect.selectedIndex = i;
          break;
        }
      }
    }
    
    orderModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeOrderModalDirect = function() {
    if (orderModalOverlay) {
      orderModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      document.getElementById('storeOrderForm').reset();
    }
  };

  window.closeOrderModal = function(e) {
    if (e.target === orderModalOverlay) {
      closeOrderModalDirect();
    }
  };

  window.submitOrderForm = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const address = document.getElementById('orderAddress').value;
    const product = document.getElementById('orderProduct').value;
    
    orderSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    orderSubmitBtn.style.opacity = '0.7';
    orderSubmitBtn.disabled = true;

    // TODO: Connect this to Google Apps Script URL later!
    // For now, simulate network delay and success
    setTimeout(() => {
      alert(`Order Successful!\\n\\nThank you, ${name}. Your order for '${product}' has been received.\\nWe will contact you shortly at ${phone} to confirm delivery to your address.`);
      
      orderSubmitBtn.innerHTML = 'Confirm Order (Cash on Delivery)';
      orderSubmitBtn.style.opacity = '1';
      orderSubmitBtn.disabled = false;
      closeOrderModalDirect();
    }, 1500);
  };
"""

content = content + "\n" + js_addition

with open('script.js', 'w') as f:
    f.write(content)

print("Updated script.js")

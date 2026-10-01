import re

with open('script.js', 'r') as f:
    content = f.read()

new_submit_logic = """
  window.submitOrderForm = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const address = document.getElementById('orderAddress').value;
    const product = document.getElementById('orderProduct').value;
    const orderSubmitBtn = document.getElementById('orderSubmitBtn');
    
    orderSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    orderSubmitBtn.style.opacity = '0.7';
    orderSubmitBtn.disabled = true;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwNrVQ5f00XGkX6iOxJqup2YsOeA89ITUr-qIZkYieLtbldxeLZ5E-rhPVdxCapUXmm/exec';
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('product', product);

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        alert(`Order Successful!\\n\\nThank you, ${name}. Your order for '${product}' has been received.\\nWe will contact you shortly at ${phone} to confirm delivery to your address.`);
        
        orderSubmitBtn.innerHTML = 'Confirm Order (Cash on Delivery)';
        orderSubmitBtn.style.opacity = '1';
        orderSubmitBtn.disabled = false;
        closeOrderModalDirect();
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("Sorry, there was an error processing your order. Please try again.");
        orderSubmitBtn.innerHTML = 'Confirm Order (Cash on Delivery)';
        orderSubmitBtn.style.opacity = '1';
        orderSubmitBtn.disabled = false;
      });
  };
"""

# Replace the old submitOrderForm
pattern = re.compile(r'  window\.submitOrderForm = function\(e\) \{.*?\n  \};\n', re.DOTALL)
content = pattern.sub(new_submit_logic, content)

with open('script.js', 'w') as f:
    f.write(content)

print("Updated script.js with Google Apps Script URL")

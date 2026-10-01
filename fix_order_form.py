import re

with open('index.html', 'r') as f:
    content = f.read()

# We need to replace the modal body with the updated fields
old_modal_start = '<div class="modal-body" style="padding: 24px;">'
old_modal_end = '</form>\n      </div>'

# Let's use regex to replace the entire form inside the modal
new_form_html = """
        <form id="storeOrderForm" onsubmit="submitOrderForm(event)">
          
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 4px;">Service Type</label>
            <select id="orderProduct" required style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none;">
              <option value="Printed PYQs & Notes">Printed PYQs & Notes (₹49 per subject)</option>
              <option value="Exam Survival Kit">Exam Survival Kit (₹299)</option>
              <option value="Form Filling Service">Form Filling Service (₹99)</option>
            </select>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 4px;">Specific Subject / Details</label>
            <input type="text" id="orderSubject" required placeholder="e.g. Class 11 Physics PYQs" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 4px;">Full Name</label>
              <input type="text" id="orderName" required placeholder="Your name" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;">
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 4px;">Phone (WhatsApp)</label>
              <input type="tel" id="orderPhone" required placeholder="10-digit number" pattern="[0-9]{10}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;">
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 4px;">House / Street Address</label>
            <input type="text" id="orderStreet" required placeholder="House No, Street Name" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;">
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 16px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 4px;">Nearest Landmark</label>
              <input type="text" id="orderLandmark" required placeholder="e.g. Near Post Office" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;">
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 4px;">Pincode</label>
              <input type="text" id="orderPincode" required placeholder="6-digits" pattern="[0-9]{6}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;">
            </div>
          </div>

          <button type="submit" id="orderSubmitBtn" style="width: 100%; background: #2563eb; color: white; border: none; padding: 12px; border-radius: 6px; font-size: 15px; font-weight: 700; cursor: pointer; transition: 0.2s;">
            Confirm Order (Cash on Delivery)
          </button>
"""

pattern = re.compile(r'<form id="storeOrderForm" onsubmit="submitOrderForm\(event\)">.*?</form>', re.DOTALL)
content = pattern.sub(new_form_html + '</form>', content)

with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html form")

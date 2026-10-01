import re

with open('index.html', 'r') as f:
    content = f.read()

store_html = """
  <!-- JK Study Hub Store Section -->
  <section class="section" id="store">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Local Services</span>
        <h2 class="section-title">JK Study Hub Store</h2>
        <div class="title-underline"></div>
        <p style="text-align: center; color: var(--text-muted); margin-top: 15px; max-width: 600px; margin-left: auto; margin-right: auto;">
          Get high-quality printed materials and essential exam kits delivered directly to your door within 24 hours!
        </p>
      </div>

      <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px;">
        
        <!-- Product 1 -->
        <div class="product-card" style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.3s;">
          <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <i class="fa-solid fa-print" style="font-size: 48px; color: #2563eb;"></i>
          </div>
          <div style="padding: 24px;">
            <h3 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 10px;">Printed PYQs &amp; Notes</h3>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 20px; line-height: 1.5;">Get past year papers, syllabus, and premium notes printed and neatly bound. Delivered straight to your home.</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: #0f172a; font-size: 18px;">From ₹49</span>
              <button onclick="openOrderModal('Printed PYQs & Notes')" style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s;">Order Now</button>
            </div>
          </div>
        </div>

        <!-- Product 2 -->
        <div class="product-card" style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.3s;">
          <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <i class="fa-solid fa-box-open" style="font-size: 48px; color: #16a34a;"></i>
          </div>
          <div style="padding: 24px;">
            <h3 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 10px;">Exam Survival Kit</h3>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 20px; line-height: 1.5;">A complete bundle: Graph papers, premium pens, geometry tools, and printed formula cheat-sheets. Save time!</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: #0f172a; font-size: 18px;">₹299</span>
              <button onclick="openOrderModal('Exam Survival Kit')" style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s;">Order Now</button>
            </div>
          </div>
        </div>

        <!-- Product 3 -->
        <div class="product-card" style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.3s;">
          <div style="background: linear-gradient(135deg, #fef2f2, #fee2e2); padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <i class="fa-solid fa-file-signature" style="font-size: 48px; color: #dc2626;"></i>
          </div>
          <div style="padding: 24px;">
            <h3 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 10px;">Form Filling Service</h3>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 20px; line-height: 1.5;">Don't risk mistakes on important forms. We professionally fill scholarship, registration, and entrance forms for you.</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: #0f172a; font-size: 18px;">₹99</span>
              <button onclick="openOrderModal('Form Filling Service')" style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s;">Order Now</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
"""

modal_html = """
  <!-- Order Form Modal -->
  <div class="modal-overlay" id="orderModalOverlay" onclick="closeOrderModal(event)">
    <div class="modal-card" id="orderModalCard" style="max-width: 500px;">
      <div class="modal-header" style="background: linear-gradient(135deg, #1e293b, #0f172a);">
        <div class="modal-title-wrap">
          <h3 style="color: white; font-size: 20px; font-weight: 700;">Place Your Order</h3>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Fill details for 24-hour local delivery</p>
        </div>
        <button class="modal-close-btn" onclick="closeOrderModalDirect()">&times;</button>
      </div>
      <div class="modal-body" style="padding: 24px;">
        <form id="storeOrderForm" onsubmit="submitOrderForm(event)">
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">Product / Service</label>
            <select id="orderProduct" required style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 14px; outline: none;">
              <option value="Printed PYQs & Notes">Printed PYQs & Notes</option>
              <option value="Exam Survival Kit">Exam Survival Kit</option>
              <option value="Form Filling Service">Form Filling Service</option>
            </select>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">Full Name</label>
            <input type="text" id="orderName" required placeholder="Enter your full name" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 14px; outline: none; box-sizing: border-box;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">Phone Number (WhatsApp)</label>
            <input type="tel" id="orderPhone" required placeholder="10-digit mobile number" pattern="[0-9]{10}" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 14px; outline: none; box-sizing: border-box;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">Full Delivery Address</label>
            <textarea id="orderAddress" required rows="3" placeholder="Enter your complete address/landmark" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 14px; outline: none; resize: vertical; box-sizing: border-box;"></textarea>
          </div>

          <button type="submit" id="orderSubmitBtn" style="width: 100%; background: #2563eb; color: white; border: none; padding: 12px; border-radius: 6px; font-size: 15px; font-weight: 700; cursor: pointer; transition: 0.2s; margin-top: 10px;">
            Confirm Order (Cash on Delivery)
          </button>
        </form>
      </div>
    </div>
  </div>
"""

# Insert Store Section
content = content.replace('  <!-- Contact Us Section -->', store_html + '\n  <!-- Contact Us Section -->')

# Insert Modal
content = content.replace('  <div class="modal-overlay" id="libraryModalOverlay"', modal_html + '\n  <div class="modal-overlay" id="libraryModalOverlay"')

# Add menu link
nav_link = '<li><a href="#store" class="nav-item">Store &amp; Services <span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 4px; animation: pulse 2s infinite;">NEW</span></a></li>'
content = content.replace('<li><a href="#contact" class="nav-item">Contact</a></li>', nav_link + '\n          <li><a href="#contact" class="nav-item">Contact</a></li>')


with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html")

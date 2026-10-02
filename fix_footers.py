import re

def update_footer(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # Check if a legal footer already exists, if not, inject it before closing body
    legal_links = """
  <!-- Legal Footer for Payment Gateway -->
  <footer style="background: #0f172a; padding: 20px 0; text-align: center; font-size: 13px; color: #94a3b8; margin-top: 40px;">
    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 10px;">
      <a href="terms.html" style="color: #cbd5e1; text-decoration: none;">Terms &amp; Conditions</a>
      <a href="privacy.html" style="color: #cbd5e1; text-decoration: none;">Privacy Policy</a>
      <a href="refund.html" style="color: #cbd5e1; text-decoration: none;">Refund &amp; Cancellation</a>
      <a href="index.html#contact" style="color: #cbd5e1; text-decoration: none;">Contact Us</a>
    </div>
    <p>&copy; 2026 JK Study Hub. All rights reserved.</p>
  </footer>
"""
    # Replace the existing closing body tag
    if "Legal Footer for Payment Gateway" not in content:
        content = content.replace('</body>', legal_links + '\n</body>')
        
    with open(filename, 'w') as f:
        f.write(content)

update_footer('index.html')
update_footer('store.html')
print("Added legal footers")

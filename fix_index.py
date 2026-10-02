import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Remove the old inline Store section and its modal
# Remove everything between <!-- JK Study Hub Store Section --> and <!-- Contact Us Section -->
content = re.sub(r'<!-- JK Study Hub Store Section -->.*?<!-- Contact Us Section -->', '<!-- Contact Us Section -->', content, flags=re.DOTALL)

# Remove the Order Form Modal entirely from index.html (it's now in store.html)
content = re.sub(r'<!-- Order Form Modal -->.*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)

# 2. Add the Floating Store Button right before </body>
floating_btn = """
  <!-- Floating Store Button -->
  <a href="store.html" style="position: fixed; right: 20px; bottom: 30px; background: #2563eb; color: white; padding: 14px 24px; border-radius: 50px; box-shadow: 0 4px 15px rgba(37,99,235,0.4); font-weight: 700; z-index: 1000; text-decoration: none; display: flex; align-items: center; gap: 8px; font-size: 16px; transition: transform 0.2s;">
    <i class="fa-solid fa-bag-shopping"></i> Store
  </a>
"""
content = content.replace('</body>', floating_btn + '\n</body>')

# 3. Update the Nav link for Store to point to store.html instead of #store
content = content.replace('href="#store"', 'href="store.html"')

with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html to link to new store.html and added floating button")

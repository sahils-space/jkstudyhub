import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Update Menu Links
content = re.sub(r'<a href="#ceo" class="nav-item">Founder\'s Desk</a>', r'<a href="#ceo" class="nav-item">Vision</a>', content)
content = re.sub(r'<li><a href="#ceo">Message from Founder &amp; CEO</a></li>', r'<li><a href="#ceo">Vision</a></li>', content)

# 2. Update Section Title
content = re.sub(r'<h2 class="section-title">Message from Founder &amp; CEO</h2>', r'<h2 class="section-title">Vision</h2>', content)

# 3. Remove Photo Container
# Look for <div class="ceo-photo-container"> ... </div> up to <div class="ceo-message-content">
photo_pattern = re.compile(r'<div class="ceo-photo-container">.*?</div>\s*</div>\s*<!-- CEO Message Content -->', re.DOTALL)
content = photo_pattern.sub(r'<!-- CEO Message Content -->', content)

# 4. Add Signature Font
if 'Herr+Von+Muellerhoff' not in content:
    content = content.replace('family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap', 'family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Herr+Von+Muellerhoff&display=swap')

# 5. Update Signature Block
signature_html = """<div class="ceo-signature-block">
            <div class="signature-box" style="
                border: 2px solid rgba(37, 99, 235, 0.3);
                background: linear-gradient(135deg, #f8fafc, #eff6ff);
                padding: 10px 30px;
                border-radius: 12px;
                display: inline-block;
                margin-bottom: 15px;
                box-shadow: 0 4px 15px rgba(37, 99, 235, 0.1);
                transform: rotate(-3deg);
            ">
              <span style="
                  font-family: 'Herr Von Muellerhoff', cursive;
                  font-size: 42px;
                  color: #1e3a8a;
                  line-height: 1;
                  display: block;
                  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
              ">Sahil</span>
            </div>
            <br>
            <span class="ceo-role">Founder &amp; Chief Executive Officer</span>
            <span class="ceo-hub">JK Study Hub</span>
          </div>"""

content = re.sub(r'<div class="ceo-signature-block">.*?</div>', signature_html, content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html")

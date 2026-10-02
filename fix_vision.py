import re

with open('index.html', 'r') as f:
    content = f.read()

new_block = """<div class="ceo-signature-block" style="margin-top: 30px; text-align: left;">
            <div class="founder-info-box" style="
                border: 3px solid #2563eb;
                background: #ffffff;
                padding: 20px 30px;
                border-radius: 8px;
                display: inline-block;
                box-shadow: 4px 4px 0px rgba(37, 99, 235, 0.2);
            ">
              <h4 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0; font-family: 'Outfit', sans-serif;">Sahil Zahoor</h4>
              <div style="height: 3px; background: #2563eb; width: 40px; margin: 8px 0; border-radius: 2px;"></div>
              <span class="ceo-role" style="display: block; font-weight: 700; color: #334155; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Founder & Chief Executive Officer</span>
              <span class="ceo-hub" style="display: block; color: #64748b; font-size: 13px; margin-top: 4px; font-weight: 500;">JK Study Hub</span>
            </div>
          </div>"""

# Replace the existing block
pattern = re.compile(r'<div class="ceo-signature-block">.*?<span class="ceo-hub">JK Study Hub</span>\s*</div>', re.DOTALL)
content = pattern.sub(new_block, content)

with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html")

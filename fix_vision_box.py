import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Add big border box to the Vision text (ceo-message-content)
# We will inject inline styles into ceo-message-content
old_content_div = '<div class="ceo-message-content">'
new_content_div = '<div class="ceo-message-content" style="border: 4px solid #2563eb; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 8px 8px 0px rgba(37, 99, 235, 0.15); margin-top: 20px;">'
content = content.replace(old_content_div, new_content_div)

# 2. Replace the bordered founder-info-box with just the plain text for Founder & CEO
old_signature_block = re.search(r'<div class="ceo-signature-block".*?</div>\s*</div>', content, re.DOTALL).group(0)

new_signature_block = """<div class="ceo-signature-block" style="margin-top: 30px; text-align: left; padding-left: 10px;">
            <span class="ceo-role" style="display: block; font-weight: 800; color: #1e293b; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Founder & Chief Executive Officer</span>
            <span class="ceo-hub" style="display: block; color: #2563eb; font-size: 15px; margin-top: 4px; font-weight: 700;">JK Study Hub</span>
          </div>"""

content = content.replace(old_signature_block, new_signature_block)

with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html to put Vision text in big box and remove name")

import re

with open('style.css', 'r') as f:
    content = f.read()

content = content.replace('grid-template-columns: 320px 1fr;', 'grid-template-columns: 1fr;')

with open('style.css', 'w') as f:
    f.write(content)

print("Updated style.css")

import re

with open('script.js', 'r') as f:
    content = f.read()

old_url = 'https://script.google.com/macros/s/AKfycbwNrVQ5f00XGkX6iOxJqup2YsOeA89ITUr-qIZkYieLtbldxeLZ5E-rhPVdxCapUXmm/exec'
new_url = 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec'

content = content.replace(old_url, new_url)

with open('script.js', 'w') as f:
    f.write(content)

print("Updated script.js with NEW Google Apps Script URL")

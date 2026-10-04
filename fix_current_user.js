const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

content = content.replace(
  /function getCurrentUser\(\) \{\s*try \{\s*return JSON\.parse\(localStorage\.getItem\('jk_study_user'\) \|\| 'null'\);\s*\} catch\(e\) \{\s*return null;\s*\}\s*\}/,
  `function getCurrentUser() {
  if (window.currentUser) return window.currentUser;
  try {
    return JSON.parse(localStorage.getItem('jk_study_user') || 'null');
  } catch(e) {
    return null;
  }
}`
);

content = content.replace(
  /function setCurrentUser\(user\) \{\s*if \(user\) \{\s*localStorage\.setItem\('jk_study_user', JSON\.stringify\(user\)\);/,
  `function setCurrentUser(user) {
  window.currentUser = user;
  if (user) {
    try { localStorage.setItem('jk_study_user', JSON.stringify(user)); } catch(e) { console.warn('LocalStorage error', e); }`
);

content = content.replace(
  /\} else \{\s*localStorage\.removeItem\('jk_study_user'\);/,
  `} else {
    try { localStorage.removeItem('jk_study_user'); } catch(e) {}`
);

fs.writeFileSync('store.js', content);
console.log('Fixed getCurrentUser and setCurrentUser');

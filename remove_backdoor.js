const fs = require('fs');
function patchFile(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  
  const backdoorRegex = /\/\/ OWNER BACKDOOR - INSTANT LOGIN[\s\S]*?return;\s*\}/;
  content = content.replace(backdoorRegex, '');
  
  fs.writeFileSync(filename, content);
  console.log('Removed backdoor from ' + filename);
}
patchFile('store.js');
patchFile('script.js');

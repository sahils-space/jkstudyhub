const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('syllabus-data.js', 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(code, context);

fs.writeFileSync('syllabus_dump.json', JSON.stringify({
  class11: context.SYLLABUS_DATA,
  class10: context.SYLLABUS_10_DATA
}, null, 2));
console.log("JSON generated");

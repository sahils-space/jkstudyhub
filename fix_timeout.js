const fs = require('fs');
function patchFile(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  
  content = content.replace(
    /btn\.innerHTML = '<i class="fa-solid fa-spinner fa-spin"><\/i> Sending SMS OTP\.\.\.';\s*btn\.disabled = true;/,
    `btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending SMS OTP...';
  btn.disabled = true;
  
  // Timeout safeguard
  setTimeout(() => {
    if (btn.disabled && btn.innerHTML.includes('Sending SMS OTP')) {
      btn.innerHTML = 'Send OTP Code ➔';
      btn.disabled = false;
      errorMsg.innerHTML = '⚠️ Network timeout. Firebase verification may be blocked by your browser. Please try "1-Click Sign in with Google" instead.';
      errorMsg.style.display = 'block';
    }
  }, 12000);`
  );
  fs.writeFileSync(filename, content);
  console.log('Patched timeout in ' + filename);
}
patchFile('store.js');
patchFile('script.js');

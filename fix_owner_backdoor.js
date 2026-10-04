const fs = require('fs');
function patchFile(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  
  const backdoor = `  const phone = phoneInput.value.trim();

  // OWNER BACKDOOR - INSTANT LOGIN
  if (phone === '9622605714') {
    const user = {
      displayName: 'Sahil Zahoor (Owner)',
      phoneNumber: '+919622605714',
      email: 'sahilsspace20@gmail.com',
      uid: 'owner_9622605714',
      photoURL: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    };
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('jk_admin_unlocked', 'true');
    if (typeof finishPhoneLogin === 'function') {
      finishPhoneLogin(user);
    } else if (typeof setLoggedInUser === 'function') {
      setLoggedInUser(user);
      closePhoneAuthModal();
      if (typeof showToast === 'function') showToast("🎉 Welcome back, Boss!");
    }
    return;
  }
`;

  content = content.replace(/const phone = phoneInput\.value\.trim\(\);/, backdoor);
  fs.writeFileSync(filename, content);
  console.log('Patched ' + filename);
}

patchFile('store.js');
patchFile('script.js');

const fs = require('fs');

function rewriteResendOTP(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  
  const newFunction = `function resendOTP(e) {
  if (e) e.preventDefault();
  const resendBtn = document.getElementById('resendOtpBtn');
  if (resendBtn.style.pointerEvents === 'none') return;
  
  const phone = document.getElementById('authPhoneNumber').value.trim();
  if (!phone) return backToPhoneStep1();
  
  resendBtn.innerText = 'Sending...';
  resendBtn.style.color = '#94a3b8';
  resendBtn.style.pointerEvents = 'none';
  
  const fullPhoneNumber = '+91' + phone;

  if (typeof firebase !== 'undefined' && firebase.auth && window.recaptchaVerifier) {
    firebase.auth().signInWithPhoneNumber(fullPhoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        activePhoneConfirmation = confirmationResult;
        resendBtn.innerText = 'Sent!';
        resendBtn.style.color = '#10b981';
        if (typeof showToast === 'function') showToast("📱 Free Firebase OTP sent!");
        setTimeout(() => {
          resendBtn.innerText = 'Resend OTP';
          resendBtn.style.color = '#2563eb';
          resendBtn.style.pointerEvents = 'auto';
        }, 5000);
      })
      .catch((error) => {
        resendBtn.innerText = 'Failed';
        resendBtn.style.color = '#ef4444';
        setTimeout(() => {
          resendBtn.innerText = 'Resend OTP';
          resendBtn.style.color = '#2563eb';
          resendBtn.style.pointerEvents = 'auto';
        }, 3000);
      });
  } else {
    // Fallback if reCAPTCHA is missing
    backToPhoneStep1();
  }
}`;

  const resendRegex = /function resendOTP\(e\) \{[\s\S]*?(?=function verifyOTP|function backToPhoneStep1)/;
  if (content.match(resendRegex)) {
    content = content.replace(resendRegex, newFunction + '\n\n');
    fs.writeFileSync(filename, content);
    console.log('Replaced resendOTP in ' + filename);
  }
}

rewriteResendOTP('script.js');
rewriteResendOTP('store_v7.js');

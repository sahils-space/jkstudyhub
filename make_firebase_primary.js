const fs = require('fs');

function rewriteHandleSendOTP(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  
  const newFunction = `function handleSendOTP() {
  const phoneInput = document.getElementById('authPhoneNumber');
  const errorMsg = document.getElementById('phoneErrorMsg');
  const btn = document.getElementById('sendOtpBtn');
  const phone = phoneInput.value.trim();

  if (!/^[6789][0-9]{9}$/.test(phone)) {
    errorMsg.innerText = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
    errorMsg.style.display = 'block';
    return;
  }
  errorMsg.style.display = 'none';

  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending SMS OTP...';
  btn.disabled = true;
  
  // Timeout safeguard
  setTimeout(() => {
    if (btn.disabled && btn.innerHTML.includes('Sending SMS OTP')) {
      btn.innerHTML = 'Send OTP Code ➔';
      btn.disabled = false;
      errorMsg.innerHTML = '⚠️ Network timeout. Please try "1-Click Sign in with Google" instead.';
      errorMsg.style.display = 'block';
    }
  }, 12000);

  const fullPhoneNumber = '+91' + phone;

  if (typeof firebase !== 'undefined' && firebase.auth) {
    if (window.recaptchaVerifier) {
      try { window.recaptchaVerifier.clear(); } catch(e) {}
      window.recaptchaVerifier = null;
    }
    const rcContainer = document.getElementById('recaptcha-container');
    if (rcContainer) {
      rcContainer.innerHTML = '';
      rcContainer.style.display = 'block';
      rcContainer.style.margin = '10px auto';
    }

    try {
      // Use normal visible Recaptcha to bypass Safari strict blocking
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': () => {},
        'expired-callback': () => {
          btn.innerHTML = 'Send OTP Code ➔';
          btn.disabled = false;
        }
      });

      window.recaptchaVerifier.render().then(() => {
        firebase.auth().signInWithPhoneNumber(fullPhoneNumber, window.recaptchaVerifier)
          .then((confirmationResult) => {
            activePhoneConfirmation = confirmationResult;
            btn.innerHTML = 'Send OTP Code ➔';
            btn.disabled = false;
            if(rcContainer) rcContainer.style.display = 'none';

            document.getElementById('displayTargetPhone').innerText = fullPhoneNumber;
            document.getElementById('phoneStep1').style.display = 'none';
            document.getElementById('phoneStep2').style.display = 'block';
            
            const otpInput = document.getElementById('authOtpCode');
            if (otpInput) {
              otpInput.value = '';
              otpInput.placeholder = '• • • • • •';
              otpInput.focus();
            }
            if (typeof showToast === 'function') showToast("📱 Free Firebase OTP sent!");
          })
          .catch((error) => {
            btn.innerHTML = 'Send OTP Code ➔';
            btn.disabled = false;
            if(rcContainer) rcContainer.style.display = 'none';
            errorMsg.innerText = "Failed to send OTP: " + error.message;
            errorMsg.style.display = 'block';
          });
      });
    } catch (e) {
      btn.innerHTML = 'Send OTP Code ➔';
      btn.disabled = false;
      errorMsg.innerText = "Security check failed. Try Google Sign-in.";
      errorMsg.style.display = 'block';
    }
  }
}`;

  // Replace the old handleSendOTP function with regex
  const handleRegex = /function handleSendOTP\(\) \{[\s\S]*?(?=function resendOTP|function verifyOTP)/;
  if (content.match(handleRegex)) {
    content = content.replace(handleRegex, newFunction + '\n\n');
    fs.writeFileSync(filename, content);
    console.log('Replaced handleSendOTP in ' + filename);
  } else {
    console.log('Could not find handleSendOTP in ' + filename);
  }
}

rewriteHandleSendOTP('script.js');
rewriteHandleSendOTP('store_v7.js');

const fs = require('fs');

const replacement = `            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
              <p id="otpErrorMsg" style="color: #ef4444; font-size: 12px; font-weight: 600; margin: 0; display: none;"></p>
              <a href="#" onclick="resendOTP(event)" id="resendOtpBtn" style="color: #2563eb; font-size: 12px; font-weight: 700; text-decoration: none; margin-left: auto;">Resend OTP</a>
            </div>
          </div>`;

['store.js', 'script.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the HTML
  content = content.replace(/<p id="otpErrorMsg"[^>]*><\/p>\s*<\/div>/, replacement);
  
  // Add the function
  const jsFunc = `
function resendOTP(e) {
  if (e) e.preventDefault();
  const resendBtn = document.getElementById('resendOtpBtn');
  if (resendBtn.style.pointerEvents === 'none') return;
  
  const phone = document.getElementById('authPhoneNumber').value.trim();
  if (!phone) return backToPhoneStep1();
  
  resendBtn.innerText = 'Sending...';
  resendBtn.style.color = '#94a3b8';
  resendBtn.style.pointerEvents = 'none';
  
  const scriptEndpoint = (typeof SCRIPT_URL !== 'undefined' ? SCRIPT_URL : 'https://script.google.com/macros/s/AKfycbw2onZMdMGJ2Z3Hzgr35yZUo-fl1UYNU5X-a9RS5EeXwKg86xBc0u6Tm3bk4fsOXd5rPA/exec');
  
  fetch(scriptEndpoint + '?action=send_otp&phone=' + encodeURIComponent(phone) + '&t=' + Date.now())
    .then(r => r.json())
    .then(data => {
       if (data.status === 'success') {
         if (typeof showToast === 'function') showToast("📱 New OTP sent to your phone!");
         let countdown = 30;
         resendBtn.innerText = 'Wait ' + countdown + 's';
         const timer = setInterval(() => {
           countdown--;
           resendBtn.innerText = 'Wait ' + countdown + 's';
           if (countdown <= 0) {
             clearInterval(timer);
             resendBtn.innerText = 'Resend OTP';
             resendBtn.style.color = '#2563eb';
             resendBtn.style.pointerEvents = 'auto';
           }
         }, 1000);
       } else {
         throw new Error(data.message);
       }
    })
    .catch(err => {
       resendBtn.innerText = 'Resend OTP';
       resendBtn.style.color = '#2563eb';
       resendBtn.style.pointerEvents = 'auto';
       const msgEl = document.getElementById('otpErrorMsg');
       if (msgEl) {
         msgEl.innerText = "Error sending OTP. Please try again.";
         msgEl.style.display = 'block';
       }
    });
}
`;
  
  if (!content.includes('function resendOTP')) {
    content += jsFunc;
  }
  
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});

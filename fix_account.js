const fs = require('fs');
let content = fs.readFileSync('account.html', 'utf8');

const fbScript = `<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js"></script>`;
const fbInit = `<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js"></script>
  <script>
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyA_fgnUKqpy15ku81BKKSa5b-wMuyeT9uw",
        authDomain: "jk-study-hub-574c7.firebaseapp.com",
        projectId: "jk-study-hub-574c7",
        storageBucket: "jk-study-hub-574c7.firebasestorage.app",
        messagingSenderId: "544447856590",
        appId: "1:544447856590:web:9280ed66e744e6b8cfb59f"
      });
    }
  </script>`;

if (!content.includes('firebase.initializeApp')) {
  content = content.replace(fbScript, fbInit);
  fs.writeFileSync('account.html', content);
  console.log('Fixed firebase init in account.html');
} else {
  console.log('firebase.initializeApp already present');
}

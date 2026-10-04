const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

const anchor = `        <div style="font-size:15px; font-weight:600; color:#334155; margin-bottom:10px;">\\\${o.product}</div>`;

const newCode = `        <div style="font-size:15px; font-weight:600; color:#334155; margin-bottom:10px;">\${o.product}</div>
        
        \${(() => {
          let progressWidth = '0%';
          let s1 = '', s2 = '', s3 = '', s4 = '';
          let c1 = '', c2 = '', c3 = '', c4 = '';
          let statusLower = (o.status || 'Confirmed').toLowerCase();
          
          if (statusLower === 'cancelled') {
            progressWidth = '100%';
            s1 = 'active'; s2 = 'active'; s3 = 'active'; s4 = 'active';
            c1 = c2 = c3 = c4 = 'background: #ef4444; box-shadow: 0 0 0 2px #ef4444;';
          } else {
            if (statusLower === 'confirmed' || statusLower === 'processing') {
              progressWidth = '15%'; s1 = 'active current';
            } else if (statusLower === 'shipped') {
              progressWidth = '50%'; s1 = 'active'; s2 = 'active current';
            } else if (statusLower === 'out for delivery') {
              progressWidth = '85%'; s1 = 'active'; s2 = 'active'; s3 = 'active current';
            } else if (statusLower === 'delivered') {
              progressWidth = '100%'; s1 = 'active'; s2 = 'active'; s3 = 'active'; s4 = 'active current';
            }
          }
          
          return \`
            <div class="order-track" style="margin-top:25px; margin-bottom: 25px;">
              <div class="track-progress" style="width: \${progressWidth}; \${statusLower === 'cancelled' ? 'background: #ef4444;' : ''}"></div>
              <div class="track-step \${s1}">
                <div class="track-icon" style="\${c1}"><i class="fa-solid fa-clipboard-check"></i></div>
                <div class="track-label">Confirmed</div>
              </div>
              <div class="track-step \${s2}">
                <div class="track-icon" style="\${c2}"><i class="fa-solid fa-box"></i></div>
                <div class="track-label">Shipped</div>
              </div>
              <div class="track-step \${s3}">
                <div class="track-icon" style="\${c3}"><i class="fa-solid fa-truck-fast"></i></div>
                <div class="track-label">Out for delivery</div>
              </div>
              <div class="track-step \${s4}">
                <div class="track-icon" style="\${c4}"><i class="\${statusLower === 'cancelled' ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-house-circle-check'}"></i></div>
                <div class="track-label" style="\${statusLower === 'cancelled' ? 'color:#ef4444;' : ''}">\${statusLower === 'cancelled' ? 'Cancelled' : 'Delivered'}</div>
              </div>
            </div>
          \`;
        })()}`;

content = content.replace(new RegExp(anchor, 'g'), newCode);
fs.writeFileSync('store.js', content);
console.log('Fixed tracking timeline in store.js');

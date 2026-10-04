const fs = require('fs');
let content = fs.readFileSync('store.js', 'utf8');

// 1. Fix the renderOrdersPage() reference in updateOrderStatusByAdmin
content = content.replace(/renderOrdersPage\(\);/g, "if (typeof renderAccountOrders === 'function') { renderAccountOrders(); }");

// 2. Inject admin controls into renderAccountOrders
const oldHtmlGeneration = `    html \\+= \\\`
      <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:15px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px; flex-wrap:wrap; gap:10px;">`;

const newHtmlGeneration = `    let adminControls = '';
    if (isStaff) {
      adminControls = \`
        <div style="margin-top:15px; padding-top:15px; border-top:1px dashed #cbd5e1; font-size:13px; color:#475569;">
          <div style="margin-bottom:8px;"><strong>Customer:</strong> +91 \${o.phone || ''}</div>
          <div style="margin-bottom:12px; line-height: 1.5;"><strong>Address:</strong> \${o.address || 'N/A'}</div>
          <div style="display:flex; align-items:center; gap:10px;">
            <select class="form-input" style="padding:8px 12px; font-size:13px; flex:1; border: 2px solid #cbd5e1; border-radius: 8px; font-weight: 700; color: #1e293b;" onchange="updateOrderStatusByAdmin('\${o.orderId}', this.value); setTimeout(renderAccountOrders, 300);">
              <option value="Confirmed" \${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Processing" \${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Shipped" \${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Out for Delivery" \${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
              <option value="Delivered" \${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Cancelled" \${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
            <button onclick="sendCustomerWhatsAppStatusUpdate('\${o.orderId}')" style="background:#25d366; color:white; border:none; padding:8px 12px; border-radius:8px; cursor:pointer;"><i class="fa-brands fa-whatsapp"></i> Notify</button>
          </div>
        </div>
      \`;
    }

    html += \`
      <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:15px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px; flex-wrap:wrap; gap:10px;">`;

content = content.replace(new RegExp(oldHtmlGeneration, 'g'), newHtmlGeneration);

// 3. And append \${adminControls} inside the card
const oldCardBottom = `        <div style="display:flex; justify-content:space-between; font-size:14px; color:#475569; border-top:1px dashed #cbd5e1; padding-top:10px;">
          <span>\\\${o.date}</span>
          <span style="font-weight:700; color:#1e293b;">₹\\\${o.amount}</span>
        </div>
      </div>`;

const newCardBottom = `        <div style="display:flex; justify-content:space-between; font-size:14px; color:#475569; border-top:1px dashed #cbd5e1; padding-top:10px;">
          <span>\${o.date}</span>
          <span style="font-weight:700; color:#1e293b;">₹\${o.amount}</span>
        </div>
        \${adminControls}
      </div>`;

content = content.replace(new RegExp(oldCardBottom, 'g'), newCardBottom);

fs.writeFileSync('store.js', content);
console.log('Fixed admin orders UI in store.js');

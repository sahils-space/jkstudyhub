/**
 * JK STUDY HUB - Google Apps Script Backend (v2.0)
 * Location: Pattan, Baramulla, Jammu & Kashmir (193121)
 *
 * HOW TO INSTALL IN GOOGLE SHEETS:
 * 1. Open your Google Sheet where orders are saved.
 * 2. Click "Extensions" -> "Apps Script".
 * 3. Delete existing code and replace with this complete script.
 * 4. Click "Deploy" -> "Manage Deployments" -> Edit -> "New Version" -> "Deploy".
 * 5. Ensure "Who has access" is set to "Anyone".
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create standard headers if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Order ID",
        "Customer Name",
        "Phone Number",
        "Delivery Address",
        "Product Details",
        "Amount (INR)",
        "Payment ID (Razorpay)",
        "Status",
        "Admin Notes"
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#e0f2fe");
    }
    
    var p = e.parameter || {};
    
    // --- FAST2SMS OTP CONFIGURATION ---
    var FAST2SMS_API_KEY = "WdLfVOXlz9U0EiJe5t8kxCm3sqHwcbFATDrpI46gjGB2NMRSKZDUqXtJIKMHSzPAEybfTreQlRpVhL5a";

    // ACTION: Send SMS OTP via Fast2SMS
    if (p.action === "send_otp") {
      var phone = String(p.phone || "").replace(/\D/g, "").slice(-10);
      if (!phone.match(/^[6789]\d{9}$/)) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Please enter a valid 10-digit Indian mobile number."
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // Generate secure 6-digit random OTP
      var otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Cache OTP for 10 minutes
      var cache = CacheService.getScriptCache();
      cache.put("otp_" + phone, otp, 600);
      
      var message = "Your JK Study Hub OTP is: " + otp + ". Valid for 10 min.";
      var url = "https://www.fast2sms.com/dev/bulkV2?authorization=" + encodeURIComponent(FAST2SMS_API_KEY) + "&route=q&message=" + encodeURIComponent(message) + "&flash=0&numbers=" + encodeURIComponent(phone);
      
      try {
        var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        var resJson = JSON.parse(response.getContentText());
        
        if (resJson.return === true || resJson.status_code === 200) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "OTP sent successfully to your phone via SMS.",
            phone: phone
          })).setMimeType(ContentService.MimeType.JSON);
        } else {
          return ContentService.createTextOutput(JSON.stringify({
            status: "fast2sms_pending",
            message: resJson.message || "Fast2SMS activation pending.",
            status_code: resJson.status_code,
            raw: JSON.stringify(resJson)
          })).setMimeType(ContentService.MimeType.JSON);
        }
      } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "SMS Gateway error: " + err.toString()
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // ACTION: Verify SMS OTP
    if (p.action === "verify_otp") {
      var phone = String(p.phone || "").replace(/\D/g, "").slice(-10);
      var userOtp = String(p.otp || "").trim();
      var cache = CacheService.getScriptCache();
      var storedOtp = cache.get("otp_" + phone);
      
      if (!storedOtp) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "OTP has expired or was not requested. Please request a new code."
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (storedOtp === userOtp) {
        cache.remove("otp_" + phone);
        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          verified: true,
          phone: phone
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Incorrect OTP code. Please enter the valid 6-digit code received on your phone."
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // ACTION: Admin Status Update from Website
    if (p.action === "update_status") {
      var targetId = String(p.order_id || "").trim();
      var newStatus = String(p.status || "Confirmed").trim();
      var data = sheet.getDataRange().getValues();
      var updated = false;
      
      for (var i = 1; i < data.length; i++) {
        var rowOrderId = String(data[i][1] || "").trim();
        if (rowOrderId === targetId) {
          // Column 9 (I) is Status
          sheet.getRange(i + 1, 9).setValue(newStatus);
          updated = true;
          break;
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: updated ? "success" : "not_found",
        order_id: targetId,
        new_status: newStatus
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ACTION: New Order Placement
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var orderId = p.order_id || ("OD" + Date.now() + Math.floor(Math.random() * 1000));
    var name = p.name || "Customer";
    var phone = p.phone || "";
    var address = p.address || "Pattan, Baramulla - 193121";
    var product = p.product || "";
    var amount = p.amount || "";
    var txnId = p.txn_id || "";
    var status = p.status || "Confirmed";
    var notes = p.notes || "";
    
    sheet.appendRow([
      timestamp,
      orderId,
      name,
      phone,
      address,
      product,
      amount,
      txnId,
      status,
      notes
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      order_id: orderId,
      status_recorded: status
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var FAST2SMS_API_KEY = "WdLfVOXlz9U0EiJe5t8kxCm3sqHwcbFATDrpI46gjGB2NMRSKZDUqXtJIKMHSzPAEybfTreQlRpVhL5a";

    // ACTION: Send SMS OTP via Fast2SMS (GET)
    if (p.action === "send_otp") {
      var phone = String(p.phone || "").replace(/\D/g, "").slice(-10);
      if (!phone.match(/^[6789]\d{9}$/)) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Please enter a valid 10-digit Indian mobile number."
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      var otp = Math.floor(100000 + Math.random() * 900000).toString();
      var cache = CacheService.getScriptCache();
      cache.put("otp_" + phone, otp, 600);
      
      var message = "Your JK Study Hub OTP is: " + otp + ". Valid for 10 min.";
      var url = "https://www.fast2sms.com/dev/bulkV2?authorization=" + encodeURIComponent(FAST2SMS_API_KEY) + "&route=q&message=" + encodeURIComponent(message) + "&flash=0&numbers=" + encodeURIComponent(phone);
      
      try {
        var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        var resJson = JSON.parse(response.getContentText());
        
        if (resJson.return === true || resJson.status_code === 200) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "OTP sent successfully to your phone via SMS.",
            phone: phone
          })).setMimeType(ContentService.MimeType.JSON);
        } else {
          return ContentService.createTextOutput(JSON.stringify({
            status: "fast2sms_pending",
            message: resJson.message || "Fast2SMS activation pending.",
            status_code: resJson.status_code,
            raw: JSON.stringify(resJson)
          })).setMimeType(ContentService.MimeType.JSON);
        }
      } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "SMS Gateway error: " + err.toString()
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // ACTION: Verify SMS OTP (GET)
    if (p.action === "verify_otp") {
      var phone = String(p.phone || "").replace(/\D/g, "").slice(-10);
      var userOtp = String(p.otp || "").trim();
      var cache = CacheService.getScriptCache();
      var storedOtp = cache.get("otp_" + phone);
      
      if (!storedOtp) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "OTP has expired or was not requested. Please request a new code."
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (storedOtp === userOtp) {
        cache.remove("otp_" + phone);
        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          verified: true,
          phone: phone
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Incorrect OTP code. Please enter the valid 6-digit code received on your phone."
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        orders: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var filterId = String(p.order_id || "").trim();
    var filterPhone = String(p.phone || "").trim();
    
    var orders = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row || row.length === 0) continue;

      var oTimestamp = row[0];
      var oId = "";
      var oName = "";
      var oPhone = "";
      var oAddress = "";
      var oProduct = "";
      var oAmount = "";
      var oTxnId = "";
      var oStatus = "Confirmed";

      // Detect if row follows 9-column format (starts with ORD- or OD in col 1)
      var col1Str = String(row[1] || "").trim().toUpperCase();
      if (col1Str.startsWith("ORD-") || col1Str.startsWith("OD")) {
        oId = String(row[1] || "");
        oName = String(row[2] || "");
        oPhone = String(row[3] || "");
        oAddress = String(row[4] || "");
        oProduct = String(row[5] || "");
        oAmount = String(row[6] || "");
        oTxnId = String(row[7] || "");
        oStatus = String(row[8] || "Confirmed");
      } else {
        // Legacy 5-column format: [Timestamp, Name, Phone, Address, Product]
        oId = "ORD-" + (100000 + i);
        oName = String(row[1] || "");
        oPhone = String(row[2] || ""); // Column 2 is PHONE, not Address!
        oAddress = String(row[3] || "");
        oProduct = String(row[4] || "");
      }

      // Safeguard: Extract valid 10-digit Indian mobile number
      var cleanDigits = String(oPhone).replace(/\D/g, "");
      if (cleanDigits === "193121" || !cleanDigits.match(/[6789]\d{9}/)) {
        for (var c = 0; c < row.length; c++) {
          var match = String(row[c]).match(/[6789]\d{9}/);
          if (match) {
            oPhone = match[0];
            break;
          }
        }
      }

      // Apply filters if passed
      if (filterId && oId.toLowerCase() !== filterId.toLowerCase()) continue;
      if (filterPhone && !oPhone.includes(filterPhone)) continue;

      orders.push({
        timestamp: oTimestamp,
        orderId: oId,
        name: oName,
        phone: oPhone,
        address: oAddress,
        product: oProduct,
        amount: oAmount,
        txnId: oTxnId,
        status: oStatus
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      count: orders.length,
      orders: orders
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

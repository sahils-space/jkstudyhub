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
    
    // --- FAST2SMS OTP DISCONNECTED ---
    if (p.action === "send_otp") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "disabled",
        message: "Fast2SMS gateway has been permanently disconnected."
      })).setMimeType(ContentService.MimeType.JSON);
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

    // ACTION: Add New Product by Owner
    if (p.action === "add_product") {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var prodSheet = ss.getSheetByName("Products");
      if (!prodSheet) {
        prodSheet = ss.insertSheet("Products");
        prodSheet.appendRow([
          "Timestamp",
          "Product ID",
          "Title",
          "Category",
          "Price",
          "MRP",
          "Description",
          "Photo 1",
          "Photo 2",
          "Photo 3",
          "Photo 4",
          "Status"
        ]);
        prodSheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#fef3c7");
      }

      var prdId = String(p.product_id || ("PRD-" + Date.now())).trim();
      var prdTitle = String(p.title || "").trim();
      var prdCat = String(p.category || "books").trim();
      var prdPrice = String(p.price || "0").trim();
      var prdMrp = String(p.mrp || "").trim();
      var prdDesc = String(p.description || "").trim();
      var photo1 = String(p.photo1 || "").trim();
      var photo2 = String(p.photo2 || "").trim();
      var photo3 = String(p.photo3 || "").trim();
      var photo4 = String(p.photo4 || "").trim();
      var status = String(p.status || "Active").trim();
      var time = p.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

      prodSheet.appendRow([
        time,
        prdId,
        prdTitle,
        prdCat,
        prdPrice,
        prdMrp,
        prdDesc,
        photo1,
        photo2,
        photo3,
        photo4,
        status
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        product_id: prdId,
        title: prdTitle
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ACTION: Delete / Remove Product by Owner
    if (p.action === "delete_product") {
      var targetPrdId = String(p.product_id || "").trim();
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var prodSheet = ss.getSheetByName("Products");
      var deleted = false;
      if (prodSheet) {
        var pData = prodSheet.getDataRange().getValues();
        for (var pi = 1; pi < pData.length; pi++) {
          if (String(pData[pi][1] || "").trim() === targetPrdId) {
            prodSheet.deleteRow(pi + 1);
            deleted = true;
            break;
          }
        }
      }
      return ContentService.createTextOutput(JSON.stringify({
        status: deleted ? "success" : "not_found",
        product_id: targetPrdId
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ACTION: Student Inquiry Submission
    if (p.action === "inquiry") {
      var inqTime = p.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      var inqName = p.name || "Student";
      var inqEmail = p.email || "No email";
      var inqClass = p.class || "General";
      var inqMessage = p.message || "";
      
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var inqSheet = ss.getSheetByName("Inquiries");
      if (!inqSheet) {
        inqSheet = ss.insertSheet("Inquiries");
        inqSheet.appendRow(["Timestamp", "Student Name", "Email", "Class", "Message", "Status"]);
        inqSheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#e0f2fe");
      }
      inqSheet.appendRow([inqTime, inqName, inqEmail, inqClass, inqMessage, "New"]);
      
      // Auto-dispatch Email to info.jkstudyhub@gmail.com
      try {
        MailApp.sendEmail({
          to: "info.jkstudyhub@gmail.com",
          subject: "📩 New Student Inquiry: " + inqName + " (" + inqClass + ")",
          htmlBody: "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px;'>" +
            "<h2 style='color: #2563eb; margin-top: 0;'>New Student Inquiry - JK Study Hub</h2>" +
            "<p><strong>Student Name:</strong> " + inqName + "</p>" +
            "<p><strong>Email:</strong> <a href='mailto:" + inqEmail + "'>" + inqEmail + "</a></p>" +
            "<p><strong>Class:</strong> " + inqClass + "</p>" +
            "<p><strong>Received At:</strong> " + inqTime + "</p>" +
            "<div style='background: #f8fafc; padding: 14px; border-left: 4px solid #2563eb; margin: 15px 0; border-radius: 4px;'>" +
            "<strong>Student Query:</strong><br><p style='margin: 8px 0 0 0; white-space: pre-wrap;'>" + inqMessage + "</p>" +
            "</div>" +
            "<p style='font-size: 12px; color: #64748b;'>Reply directly to student: <a href='mailto:" + inqEmail + "'>" + inqEmail + "</a></p>" +
            "</div>"
        });
      } catch (mailErr) {
        Logger.log("MailApp error: " + mailErr);
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Inquiry recorded and email notification dispatched"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ACTION: New Order Placement
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var orderId = p.order_id || ("OD" + Date.now() + Math.floor(Math.random() * 1000));
    var name = p.name || "Customer";
    var phone = p.phone || "";
    var address = p.address || "Baramulla, Jammu & Kashmir - 193121";
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

    // Auto-dispatch Order Alert Email to info.jkstudyhub@gmail.com
    try {
      MailApp.sendEmail({
        to: "info.jkstudyhub@gmail.com",
        subject: "🛍️ New Order: " + orderId + " - " + name + " (₹" + amount + ")",
        htmlBody: "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px;'>" +
          "<h2 style='color: #10b981; margin-top: 0;'>🎉 New Order Placed!</h2>" +
          "<p><strong>Order ID:</strong> " + orderId + "</p>" +
          "<p><strong>Customer Name:</strong> " + name + "</p>" +
          "<p><strong>Phone:</strong> <a href='tel:" + phone + "'>" + phone + "</a></p>" +
          "<p><strong>Delivery Address:</strong> " + address + "</p>" +
          "<p><strong>Product Details:</strong> " + product + "</p>" +
          "<p><strong>Amount Paid:</strong> ₹" + amount + "</p>" +
          "<p><strong>Razorpay Txn ID:</strong> " + txnId + "</p>" +
          "<p><strong>Status:</strong> " + status + "</p>" +
          "</div>"
      });
    } catch (orderMailErr) {
      Logger.log("Order mail error: " + orderMailErr);
    }
    
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
    // --- FAST2SMS OTP DISCONNECTED ---
    if (p.action === "send_otp") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "disabled",
        message: "Fast2SMS gateway has been permanently disconnected."
      })).setMimeType(ContentService.MimeType.JSON);
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

    // ACTION: Get Dynamic Products for Students & Storefront
    if (p.action === "get_products") {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var prodSheet = ss.getSheetByName("Products");
      var products = [];
      if (prodSheet) {
        var pData = prodSheet.getDataRange().getValues();
        for (var pj = 1; pj < pData.length; pj++) {
          var pRow = pData[pj];
          if (!pRow || pRow.length === 0) continue;
          var pStatus = String(pRow[11] || "Active").trim();
          if (pStatus !== "Active") continue;

          var photos = [];
          if (pRow[7]) photos.push(String(pRow[7]));
          if (pRow[8]) photos.push(String(pRow[8]));
          if (pRow[9]) photos.push(String(pRow[9]));
          if (pRow[10]) photos.push(String(pRow[10]));

          products.push({
            productId: String(pRow[1] || ""),
            name: String(pRow[2] || ""),
            category: String(pRow[3] || "books"),
            price: parseFloat(pRow[4]) || 0,
            mrp: parseFloat(pRow[5]) || (parseFloat(pRow[4]) ? Math.round(parseFloat(pRow[4]) * 1.3) : 0),
            desc: String(pRow[6] || ""),
            photos: photos,
            image: photos[0] || "images/logo-app.png",
            timestamp: pRow[0]
          });
        }
      }
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        count: products.length,
        products: products
      })).setMimeType(ContentService.MimeType.JSON);
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

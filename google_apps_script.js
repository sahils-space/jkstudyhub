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
    var orderId = p.order_id || ("ORD-" + Math.floor(100000 + Math.random() * 900000));
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
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        orders: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var p = (e && e.parameter) ? e.parameter : {};
    var filterId = String(p.order_id || "").trim();
    var filterPhone = String(p.phone || "").trim();
    
    var orders = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var oTimestamp = row[0];
      var oId = String(row[1] || "");
      var oName = String(row[2] || "");
      var oPhone = String(row[3] || "");
      var oAddress = String(row[4] || "");
      var oProduct = String(row[5] || "");
      var oAmount = String(row[6] || "");
      var oTxnId = String(row[7] || "");
      var oStatus = String(row[8] || "Confirmed");
      
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

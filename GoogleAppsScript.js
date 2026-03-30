// ================================================================
// ROCC Operations Log - Google Apps Script Backend
// ================================================================
// This script goes in Google Apps Script (script.google.com)
// It stores and retrieves data from a Google Sheet.
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Click "New Project"
// 3. Delete the default code and paste this entire file
// 4. Click the floppy disk icon (Save) - name it "ROCC Backend"
// 5. Click "Deploy" > "New deployment"
// 6. Click the gear icon next to "Select type" > choose "Web app"
// 7. Set:
//    - Description: "ROCC Backend"
//    - Execute as: "Me"
//    - Who has access: "Anyone" (or "Anyone with the link")
// 8. Click "Deploy"
// 9. Click "Authorize access" and follow the prompts
//    - Click "Advanced" > "Go to ROCC Backend (unsafe)" > "Allow"
// 10. Copy the Web app URL
// 11. Paste that URL into index.html on line 32 (SCRIPT_URL)
//
// IMPORTANT: Every time you edit this script, you must:
//   Deploy > "New deployment" (not "Manage deployments")
//   to get changes to take effect.
// ================================================================

var SHEET_NAME = "ROCCData";

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["key", "value", "updated_at", "updated_by"]);
    sheet.setFrozenRows(1);
    var header = sheet.getRange(1, 1, 1, 4);
    header.setFontWeight("bold");
    header.setBackground("#0a0e14");
    header.setFontColor("#ffffff");
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 800);
    sheet.setColumnWidth(3, 180);
    sheet.setColumnWidth(4, 150);
  }
  return sheet;
}

function doGet(e) {
  try {
    var action = "";
    if (e && e.parameter && e.parameter.action) {
      action = e.parameter.action;
    }

    // API: return JSON data
    if (action === "getAll") {
      var sheet = getSheet();
      var data = sheet.getDataRange().getValues();
      var result = {};

      for (var i = 1; i < data.length; i++) {
        var key = data[i][0];
        var value = data[i][1];
        if (key) {
          result[key] = value;
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // No action param: serve the app HTML
    return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('ROCC Operations Log')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action || "set";
    var key = body.key;

    if (!key) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Missing key" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();

    // Find existing row for this key
    var rowIndex = -1;
    var existingValue = null;
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        rowIndex = i + 1; // 1-based for sheet
        existingValue = data[i][1];
        break;
      }
    }

    var finalValue;

    if (action === "merge") {
      // Deep merge: merge incoming section data into existing day data
      // This prevents User B from overwriting User A's changes
      var existing = {};
      if (existingValue) {
        try { existing = JSON.parse(existingValue); } catch(ex) { existing = {}; }
      }
      var incoming = {};
      try { incoming = JSON.parse(body.value); } catch(ex) { incoming = {}; }

      // Merge at section > site > slot level
      for (var secKey in incoming) {
        if (!existing[secKey]) { existing[secKey] = {}; }
        var secData = incoming[secKey];
        if (secKey === "shifts" || secKey === "notes") {
          // Arrays: merge by deduplication
          if (secKey === "shifts") {
            var arr = existing[secKey] || [];
            if (!Array.isArray(arr)) arr = [];
            var newArr = secData || [];
            if (!Array.isArray(newArr)) newArr = [];
            for (var s = 0; s < newArr.length; s++) {
              var dup = false;
              for (var a = 0; a < arr.length; a++) {
                if (arr[a].name === newArr[s].name && arr[a].shift === newArr[s].shift) { dup = true; break; }
              }
              if (!dup) arr.push(newArr[s]);
            }
            existing[secKey] = arr;
          } else {
            // Notes: append any new notes (by timestamp)
            var notes = existing[secKey] || [];
            if (!Array.isArray(notes)) notes = [];
            var newNotes = secData || [];
            if (!Array.isArray(newNotes)) newNotes = [];
            var tsSet = {};
            for (var n = 0; n < notes.length; n++) { tsSet[notes[n].ts + "_" + notes[n].user] = true; }
            for (var n2 = 0; n2 < newNotes.length; n2++) {
              if (!tsSet[newNotes[n2].ts + "_" + newNotes[n2].user]) notes.push(newNotes[n2]);
            }
            existing[secKey] = notes;
          }
        } else if (typeof secData === "object" && secData !== null && !Array.isArray(secData)) {
          // Section object: merge site > slot > fields
          if (typeof existing[secKey] !== "object" || Array.isArray(existing[secKey])) existing[secKey] = {};
          for (var siteId in secData) {
            if (!existing[secKey][siteId]) existing[secKey][siteId] = {};
            var siteData = secData[siteId];
            if (typeof siteData === "object" && siteData !== null && !Array.isArray(siteData)) {
              for (var slot in siteData) {
                if (!existing[secKey][siteId][slot]) existing[secKey][siteId][slot] = {};
                var slotData = siteData[slot];
                if (typeof slotData === "object" && slotData !== null && !Array.isArray(slotData)) {
                  for (var field in slotData) {
                    existing[secKey][siteId][slot][field] = slotData[field];
                  }
                } else {
                  existing[secKey][siteId][slot] = slotData;
                }
              }
            } else {
              existing[secKey][siteId] = siteData;
            }
          }
        } else {
          existing[secKey] = secData;
        }
      }
      finalValue = JSON.stringify(existing);
    } else {
      // Legacy full replace
      finalValue = body.value;
    }

    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 2).setValue(finalValue);
      sheet.getRange(rowIndex, 3).setValue(new Date().toISOString());
      sheet.getRange(rowIndex, 4).setValue(body.user || "");
    } else {
      sheet.appendRow([key, finalValue, new Date().toISOString(), body.user || ""]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setup() {
  getSheet();
  Logger.log("Sheet created/verified: " + SHEET_NAME);
}

function clearAllData() {
  var sheet = getSheet();
  if (sheet.getLastRow() > 1) {
    sheet.deleteRows(2, sheet.getLastRow() - 1);
  }
  Logger.log("All data cleared");
}

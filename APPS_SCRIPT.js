// ============================================================
// EASIER SYSTEMS — Google Apps Script
// Paste this entire file into your Apps Script editor
// ============================================================

var NOTIFY_EMAIL = 'tom.flores1000@gmail.com';
var SHEET_ID     = '16y66sCXeXZNCGjRZeKSgK0sMO9fS6QihQ2CQXEA61fY';
var TAB_GID      = 566573973;

function doGet(e) {
  return handleSubmission(e.parameter);
}

function doPost(e) {
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = e.parameter || {};
  }
  return handleSubmission(data);
}

function handleSubmission(d) {
  try {
    // --- Write to Google Sheet ---
    var ss     = SpreadsheetApp.openById(SHEET_ID);
    var sheets = ss.getSheets();
    var sheet  = null;
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === TAB_GID) {
        sheet = sheets[i];
        break;
      }
    }
    if (!sheet) sheet = ss.getSheets()[0];

    sheet.appendRow([
      new Date(),
      d.firstName    || '',
      d.businessName || '',
      d.businessType || '',
      d.phone        || '',
      d.email        || '',
      d.problem      || ''
    ]);

    // --- Send email notification ---
    var subject = 'New Audit Request — ' + (d.businessName || d.firstName || 'Unknown');
    var body    = [
      'New audit request from easiersystems.com',
      '',
      'Name:     ' + (d.firstName    || ''),
      'Business: ' + (d.businessName || ''),
      'Type:     ' + (d.businessType || ''),
      'Phone:    ' + (d.phone        || ''),
      'Email:    ' + (d.email        || ''),
      '',
      'Their biggest problem:',
      d.problem || ''
    ].join('\n');

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

  } catch (err) {
    console.error('Submission error:', err.toString());
  }

  return ContentService
    .createTextOutput('ok')
    .setMimeType(ContentService.MimeType.TEXT);
}

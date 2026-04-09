/**
 * Google Apps Script — RSVP Handler for Ayres Apparel Grand Opening
 *
 * SETUP:
 * 1. Buka Google Sheets baru → Extensions → Apps Script
 * 2. Paste seluruh kode ini ke Code.gs
 * 3. Klik Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy URL deployment, simpan di .env.local sebagai GOOGLE_SCRIPT_URL
 * 5. Pastikan Sheet pertama memiliki header di row 1:
 *    | Timestamp | Nama | Email | No HP | Asal | Kehadiran |
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),         // Timestamp
      data.nama,          // Nama
      data.email,         // Email
      data.noHp,          // No HP
      data.asal,          // Asal (Komunitas/Organisasi)
      data.kehadiran,     // Kehadiran (hadir / tidak)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("RSVP API is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

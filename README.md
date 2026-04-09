📄 Dokumentasi Project
🎉 Digital Invitation – Opening Store Ayres Apparel
🧠 1. Overview

Aplikasi ini adalah undangan digital berbasis web untuk acara opening store Ayres Apparel yang memiliki fitur:

Landing page undangan (scrollable)
Informasi acara (tanggal, lokasi, dll)
CTA untuk konfirmasi kehadiran
Form RSVP (kehadiran)
Penyimpanan data otomatis ke Google Spreadsheet
🏗️ 2. Tech Stack
Kebutuhan	Teknologi
Frontend	Next.js (App Router)
Styling	Tailwind CSS
Backend API	Next.js API Routes
Database	Google Sheets
Deployment	Vercel
🧩 3. Arsitektur Sistem
User
 ↓
Landing Page (Next.js)
 ↓
Form RSVP
 ↓
POST /api/rsvp
 ↓
Google Sheets API
 ↓
Spreadsheet tersimpan
🎨 4. Flow User
User buka link undangan
Langsung masuk ke halaman invitation
Scroll sampai bawah
Klik tombol "Konfirmasi Kehadiran"
Form muncul (modal / section)
Isi data:
Nama
No HP
Kehadiran (Hadir / Tidak)
Jumlah orang
Klik submit
Data langsung masuk ke Google Spreadsheet
📁 5. Struktur Project (Next.js)
/app
  /page.tsx          → Landing page
  /components
    Hero.tsx
    EventInfo.tsx
    RSVPForm.tsx
  /api
    /rsvp
      route.ts       → API handler
/lib
  googleSheets.ts    → Helper ke Google Sheets
🧾 6. UI Section (Landing Page)
🔹 Section:
Hero (Nama Event)
Detail Acara
Lokasi (Google Maps embed)
Gallery (optional)
CTA Button
Form RSVP
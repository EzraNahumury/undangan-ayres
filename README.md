# Ayres Apparel — Grand Opening Solo
### Digital Invitation Website

---

## Overview

A web-based digital invitation for the Grand Opening of **Ayres Apparel Solo Branch** — the home of custom jerseys crafted with genuine Indonesian character. Features a particle-animated hero, event details, embedded map, and an RSVP form that saves responses to Google Sheets and automatically sends an invitation email to attending guests.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Animation | OGL (WebGL particles) |
| Backend API | Next.js API Routes |
| Database | Google Sheets via Apps Script |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel |

---

## Features

- Particle background animation (WebGL, mouse-interactive)
- Animated CTA buttons (pulsing ring + shimmer sweep)
- Event info cards with Google Maps embed
- RSVP modal form — saves to Google Sheets
- Auto-sends a branded invitation email when guest selects **Attending**

---

## Project Structure

```
/app
  page.tsx                  → Root page
  layout.tsx                → Metadata & fonts
  globals.css               → Theme variables & animations
  /components
    Hero.tsx                → Particle hero, nav, headline, CTA
    Particles.tsx           → WebGL particle component (OGL)
    EventInfo.tsx           → Event detail cards + map
    RSVPForm.tsx            → RSVP modal form
  /api
    /rsvp
      route.ts              → POST handler: saves to Sheets + sends email
/public
  /logo
    1.png                   → Ayres logo
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Google Apps Script (saves RSVP to Google Sheets)
GOOGLE_SCRIPT_URL=your_google_apps_script_deployment_url

# Gmail SMTP (sends invitation email to attending guests)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=your_email@gmail.com
```

> For `SMTP_PASS`, use a [Gmail App Password](https://myaccount.google.com/apppasswords), not your regular account password.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## RSVP Flow

1. Guest opens the invitation link
2. Scrolls through the landing page
3. Clicks **RSVP Now** or **Confirm Attendance**
4. Fills in: Full Name, Email, Phone, Origin, Attendance
5. On submit:
   - Data saved to Google Sheets
   - If **Attending** → branded invitation email sent to guest's email

---

## Deployment

Deploy via [Vercel](https://vercel.com). Add all environment variables in the Vercel project settings under **Settings → Environment Variables**.

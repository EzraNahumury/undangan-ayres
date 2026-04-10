import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function buildInvitationEmail(nama: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're Invited — Ayres Apparel Solo</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111111;border-radius:16px;overflow:hidden;border:1px solid #222;">

          <!-- Red accent bar -->
          <tr>
            <td style="background:#E8192C;height:4px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding:48px 40px 32px;">
              <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#888;">
                Grand Opening Invitation
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#222;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:13px;color:#888;letter-spacing:0.15em;text-transform:uppercase;">
                Dear
              </p>
              <h1 style="margin:0 0 24px;font-size:28px;font-weight:400;color:#ffffff;line-height:1.2;">
                ${nama}
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#aaaaaa;">
                You are cordially invited to the <strong style="color:#ffffff;">Grand Opening</strong>
                of Ayres Apparel Solo — the home of custom jerseys crafted with genuine
                Indonesian character, where every pattern is a class of its own.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.8;color:#aaaaaa;">
                We look forward to welcoming you and celebrating this milestone together.
              </p>
            </td>
          </tr>

          <!-- Event details card -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;overflow:hidden;">
                <tr>
                  <td style="padding:28px 28px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="12">
                      <tr>
                        <td style="padding-bottom:16px;">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#E8192C;">
                            Date
                          </p>
                          <p style="margin:0;font-size:15px;color:#ffffff;font-weight:500;">
                            Saturday, April 26, 2026
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:16px;">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#E8192C;">
                            Time
                          </p>
                          <p style="margin:0;font-size:15px;color:#ffffff;font-weight:500;">
                            4:00 PM — 9:00 PM WIB
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#E8192C;">
                            Location
                          </p>
                          <p style="margin:0;font-size:15px;color:#ffffff;font-weight:500;">
                            Ayres Apparel Solo
                          </p>
                          <p style="margin:4px 0 0;font-size:13px;color:#888888;">
                            Perempatan Menco, Solo
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 28px 28px;">
                    <a href="https://maps.app.goo.gl/m4yUtfnY2pK8vkPV6"
                      style="display:inline-block;background:#E8192C;color:#ffffff;font-size:13px;
                             letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;
                             padding:12px 24px;border-radius:999px;">
                      Open in Google Maps
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;padding:24px 40px;border-top:1px solid #1f1f1f;">
              <p style="margin:0;font-size:12px;color:#555;text-align:center;line-height:1.6;">
                Ayres Apparel &nbsp;·&nbsp; Solo Branch<br/>
                <em style="color:#444;">Pola Ayres Beda Kelas</em>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { nama, email, noHp, asal, kehadiran } = body;

  if (!nama || !email || !noHp || !asal || !kehadiran) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
  if (!SCRIPT_URL) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, email, noHp, asal, kehadiran }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 502 });
  }

  // Send invitation email only when attending
  if (kehadiran === "hadir") {
    await transporter.sendMail({
      from: `"Ayres Apparel Solo" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Your Invitation — Ayres Apparel Grand Opening Solo",
      html: buildInvitationEmail(nama),
    });
  }

  return NextResponse.json({ success: true });
}

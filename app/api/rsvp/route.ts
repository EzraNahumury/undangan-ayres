import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { nama, email, noHp, asal, kehadiran } = body;

  if (!nama || !email || !noHp || !asal || !kehadiran) {
    return NextResponse.json(
      { error: "Data tidak lengkap" },
      { status: 400 }
    );
  }

  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!SCRIPT_URL) {
    console.error("GOOGLE_SCRIPT_URL is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, email, noHp, asal, kehadiran }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}

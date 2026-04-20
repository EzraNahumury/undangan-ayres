import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grand Opening Ayres",
  description:
    "You're invited to the Grand Opening of Ayres Apparel Solo. Join us for an unforgettable experience.",
  openGraph: {
    title: "Grand Opening Ayres",
    description:
      "You're invited to the Grand Opening of Ayres Apparel Solo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="antialiased">
      <body>{children}</body>
    </html>
  );
}

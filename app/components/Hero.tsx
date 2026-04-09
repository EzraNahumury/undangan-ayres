"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const NAV_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "Event", href: "#event" },
  { label: "Lokasi", href: "#lokasi" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_DURATION = 0.5;

    function loop() {
      if (!video) return;
      const { currentTime, duration } = video;

      if (duration && duration > 0) {
        if (currentTime < FADE_DURATION) {
          // Fade in
          video.style.opacity = String(
            Math.min(currentTime / FADE_DURATION, 1)
          );
        } else if (currentTime > duration - FADE_DURATION) {
          // Fade out
          video.style.opacity = String(
            Math.max((duration - currentTime) / FADE_DURATION, 0)
          );
        } else {
          video.style.opacity = "1";
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    function handleEnded() {
      if (!video) return;
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    }

    video.addEventListener("ended", handleEnded);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      video.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Video Background */}
      <div
        className="absolute z-0"
        style={{ top: "300px", inset: "auto 0 0 0", position: "absolute" }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover transition-none"
          style={{ opacity: 0 }}
        />
        {/* Gradient overlay on video */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        {/* Logo */}
        <a
          href="#"
          className="font-serif text-3xl tracking-tight text-black"
        >
          Ayres<sup className="text-sm">®</sup>
        </a>

        {/* Menu items — hidden on mobile */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`text-sm transition-colors hover:text-black ${
                  item.active ? "text-black" : "text-gray"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#rsvp"
          className="rounded-full bg-black px-6 py-2.5 text-sm text-white transition-transform hover:scale-103"
        >
          Konfirmasi
        </a>
      </nav>

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
        style={{ paddingTop: "calc(8rem - 75px)" }}
      >
        {/* Headline */}
        <h1
          className="animate-fade-rise max-w-7xl font-serif text-5xl font-normal text-black sm:text-7xl md:text-8xl"
          style={{ lineHeight: 0.95, letterSpacing: "-2.46px" }}
        >
          Beyond fashion,{" "}
          <em className="text-gray">we craft</em>
          <br />
          <em className="text-gray">the timeless.</em>
        </h1>

        {/* Description */}
        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-gray sm:text-lg">
          Kami dengan bangga mengundang Anda ke grand opening store pertama
          kami. Sebuah ruang baru untuk gaya, kreativitas, dan jiwa yang
          autentik.
        </p>

        {/* Date Badge */}
        <div className="animate-fade-rise-delay mt-6 inline-flex items-center gap-3 rounded-full border border-gray-light bg-white/80 px-5 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-black">
            26 April 2026
          </span>
          <span className="h-1 w-1 rounded-full bg-gray" />
          <span className="text-sm text-gray">16:00 WIB</span>
        </div>

        {/* CTA */}
        <a
          href="#rsvp"
          className="animate-fade-rise-delay-2 mt-12 rounded-full bg-black px-14 py-5 text-base text-white transition-transform hover:scale-103"
        >
          Konfirmasi Kehadiran
        </a>
      </div>
    </section>
  );
}

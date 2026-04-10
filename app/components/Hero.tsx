"use client";

import Image from "next/image";
import Particles from "./Particles";

const NAV_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "Event", href: "#event" },
  { label: "Location", href: "#lokasi" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#E8192C", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        {/* Logo */}
        <a href="#">
          <Image
            src="/logo/1.png"
            alt="Ayres"
            width={140}
            height={48}
            className="object-contain"
            priority
          />
        </a>

        {/* Menu items — hidden on mobile */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`text-sm transition-colors hover:text-white ${
                  item.active ? "text-white" : "text-white/60"
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
          className="rounded-full bg-white px-6 py-2.5 text-sm text-black transition-transform hover:scale-103"
        >
          RSVP
        </a>
      </nav>

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
        style={{ paddingTop: "calc(8rem - 75px)" }}
      >
        {/* Invitation label */}
        <p className="animate-fade-rise mb-6 font-serif text-sm italic text-white/50 sm:text-base">
          You are cordially invited to the Grand Opening of
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-rise max-w-7xl font-serif text-5xl font-normal text-white sm:text-7xl md:text-8xl"
          style={{ lineHeight: 0.95, letterSpacing: "-2.46px" }}
        >
          Ayres Apparel{" "}
          <em className="text-red">Solo —</em>
          <br />
          <em className="text-red">now open.</em>
        </h1>

        {/* Invitation copy */}
        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          We warmly invite you to celebrate the opening of our Solo branch.
          Come experience custom jerseys crafted with genuine Indonesian
          character — where every pattern is a class of its own.
        </p>

        {/* Date Badge */}
        <div className="animate-fade-rise-delay mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-white">
            April 26, 2026
          </span>
          <span className="h-1 w-1 rounded-full bg-red" />
          <span className="text-sm text-white/60">4:00 PM WIB</span>
        </div>

        {/* CTA */}
        <div className="animate-fade-rise-delay-2 relative mt-12 inline-block">
          {/* Pulsing ring */}
          <span className="animate-btn-ring absolute inset-0 rounded-full bg-red" />
          <a
            href="#rsvp"
            className="relative block overflow-hidden rounded-full bg-red px-14 py-5 text-base text-white transition-transform hover:scale-103"
          >
            {/* Shimmer sweep */}
            <span className="animate-btn-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-white/25 blur-sm" />
            Confirm Attendance
          </a>
        </div>
      </div>
    </section>
  );
}

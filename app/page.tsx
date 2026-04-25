import Hero from "./components/Hero";
import EventInfo from "./components/EventInfo";
import RSVPForm from "./components/RSVPForm";
import Particles from "./components/Particles";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#ffffff", "#E8192C", "#ffffff"]}
            particleCount={300}
            particleSpread={12}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            particleHoverFactor={0.5}
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>

        <div className="relative z-10">
          <EventInfo />
          <RSVPForm />

          <footer className="border-t border-white/10 px-6 py-8 text-center">
            <p className="font-serif text-sm text-white/40">
              &copy; 2026 Ayres Apparel. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

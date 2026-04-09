import Hero from "./components/Hero";
import EventInfo from "./components/EventInfo";
import RSVPForm from "./components/RSVPForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventInfo />
      <RSVPForm />

      {/* Footer */}
      <footer className="border-t border-gray-light bg-white px-6 py-8 text-center">
        <p className="font-serif text-sm text-gray">
          &copy; 2026 Ayres Apparel. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

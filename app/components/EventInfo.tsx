const details = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    label: "Date",
    value: "Friday, May 1, 2026",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Time",
    value: "10:00 WIB — selesai",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Location",
    value: "Ayres Apparel Solo, Ruko Menco City",
  },
];

export default function EventInfo() {
  return (
    <section id="event" className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="font-serif text-sm italic text-gray">
            Grand Opening — Solo
          </p>
          <h2 className="mt-2 font-serif text-4xl text-black sm:text-5xl">
            Event Details
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gray-light" />
        </div>

        {/* Detail cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-gray-light bg-white p-6 transition-all duration-300 hover:border-black/10 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-lighter text-gray transition-colors group-hover:bg-black group-hover:text-white">
                {item.icon}
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray">
                {item.label}
              </p>
              <p className="mt-1 text-base font-medium text-black">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Google Maps */}
        <div id="lokasi" className="mt-16 scroll-mt-24">
          <div className="overflow-hidden rounded-2xl border border-gray-light shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=-7.554426,110.7698951&z=17&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ayres Apparel Solo Location"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/m4yUtfnY2pK8vkPV6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-sm text-gray hover:text-black transition-colors"
          >
            Ruko Menco City — Open in Google Maps ↗
          </a>
        </div>
      </div>
    </section>
  );
}

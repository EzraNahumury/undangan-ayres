"use client";

import { useState, useRef, useEffect } from "react";

type FormData = {
  nama: string;
  email: string;
  noHp: string;
  asal: string;
  kehadiran: "hadir" | "tidak" | "";
};

export default function RSVPForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [form, setForm] = useState<FormData>({
    nama: "",
    email: "",
    noHp: "",
    asal: "",
    kehadiran: "",
  });

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal mengirim data");

      setSubmitted(true);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setOpen(false);
    if (submitted) {
      setSubmitted(false);
      setForm({ nama: "", email: "", noHp: "", asal: "", kehadiran: "" });
    }
  }

  return (
    <section id="rsvp" className="scroll-mt-12 bg-gray-lighter px-6 py-24 text-center sm:py-32">
      <div className="mx-auto max-w-xl">
        <p className="font-serif text-sm italic text-gray">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mt-2 font-serif text-4xl text-black sm:text-5xl">
          Apakah Anda Hadir?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray">
          Kami sangat menantikan kehadiran Anda di acara grand opening kami.
          Mohon konfirmasi kehadiran Anda.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-10 rounded-full bg-black px-14 py-5 text-base font-medium text-white transition-transform hover:scale-103"
        >
          Konfirmasi Sekarang
        </button>
      </div>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className="m-0 w-full max-w-lg rounded-t-3xl bg-white p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:m-auto sm:rounded-2xl"
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-serif text-2xl text-black">
              {submitted ? "Terima Kasih!" : "Form RSVP"}
            </h3>
            <button
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray transition-colors hover:bg-gray-lighter hover:text-black"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="animate-scale-in py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-black">
                Data Anda telah terkirim
              </p>
              <p className="mt-2 text-sm text-gray">
                Sampai jumpa di acara grand opening!
              </p>
              <button
                onClick={handleClose}
                className="mt-6 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-transform hover:scale-103"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nama */}
              <div className="text-left">
                <label
                  htmlFor="nama"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray"
                >
                  Nama Lengkap
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  required
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full rounded-xl border border-gray-light bg-white px-4 py-3 text-sm text-black placeholder:text-gray/50 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              {/* Email */}
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-gray-light bg-white px-4 py-3 text-sm text-black placeholder:text-gray/50 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              {/* No HP */}
              <div className="text-left">
                <label
                  htmlFor="noHp"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray"
                >
                  No. HP / WhatsApp
                </label>
                <input
                  id="noHp"
                  name="noHp"
                  type="tel"
                  required
                  value={form.noHp}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full rounded-xl border border-gray-light bg-white px-4 py-3 text-sm text-black placeholder:text-gray/50 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              {/* Asal */}
              <div className="text-left">
                <label
                  htmlFor="asal"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray"
                >
                  Asal
                </label>
                <input
                  id="asal"
                  name="asal"
                  type="text"
                  required
                  value={form.asal}
                  onChange={handleChange}
                  placeholder="Komunitas / Organisasi / Perusahaan"
                  className="w-full rounded-xl border border-gray-light bg-white px-4 py-3 text-sm text-black placeholder:text-gray/50 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              {/* Kehadiran */}
              <div className="text-left">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray">
                  Kehadiran
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      form.kehadiran === "hadir"
                        ? "border-black bg-black text-white"
                        : "border-gray-light bg-white text-black hover:border-black/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="kehadiran"
                      value="hadir"
                      checked={form.kehadiran === "hadir"}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Hadir
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      form.kehadiran === "tidak"
                        ? "border-black bg-black text-white"
                        : "border-gray-light bg-white text-black hover:border-black/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="kehadiran"
                      value="tidak"
                      checked={form.kehadiran === "tidak"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Tidak Hadir
                  </label>
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  "Kirim RSVP"
                )}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </section>
  );
}

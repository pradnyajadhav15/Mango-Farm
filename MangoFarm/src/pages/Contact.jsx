import { useState } from "react";
import { useLang } from "../LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    try {
      // Replace YOUR_FORM_ID with the ID from your Formspree account (see steps below)
      const res = await fetch("https://formspree.io/f/xaqklypd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      alert("Network error. Please try again or email us directly.");
    }
  };

  return (
    <div className="bg-creamlight">
      <div className="bg-cream py-12 text-center">
        <h1 className="font-display text-4xl font-bold text-forest">{t.contact.title}</h1>
        <p className="mt-2 text-gray-600">We'd love to hear from you</p>
      </div>

      <section className="container-x grid gap-10 py-16 md:grid-cols-2">
        {/* Info */}
        <div>
          <h2 className="font-display text-2xl font-bold text-forest">Get in touch</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <p>📍 Mango Farm, Kini Village, Akkalkot Taluka, Solapur District, Maharashtra (413216), India.</p>
            <p>📞 8766977048</p>
            <p>✉️ mangofarm@gmail.com</p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl shadow-sm">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Kini+Akkalkot+Solapur+Maharashtra&output=embed"
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {sent ? (
            <div className="py-20 text-center">
              <div className="text-5xl">✅</div>
              <p className="mt-4 font-medium text-forest">Thank you! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="first_name" required placeholder={t.contact.name} className="rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango" />
                <input name="last_name" required placeholder={t.contact.last} className="rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="email" required type="email" placeholder={t.contact.email} className="rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango" />
                <input name="phone" placeholder={t.contact.phone} className="rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango" />
              </div>
              <textarea name="message" rows={4} placeholder={t.contact.message} className="w-full rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango" />
              <button type="submit" className="w-full rounded-lg bg-forest py-3 font-medium text-cream transition hover:bg-mango">
                {t.contact.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

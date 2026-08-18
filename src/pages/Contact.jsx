import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../LanguageContext";
import Reveal from "../components/Reveal";
import { PageHeader, MaskReveal, SPRING, EASE, DUR } from "../components/motion";

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const data = new FormData(e.target);

    try {
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
    } finally {
      setBusy(false);
    }
  };

  const field =
    "rounded-xl border border-sage/50 bg-creamlight/50 px-4 py-3 outline-none transition focus:border-mango focus:bg-white focus:ring-4 focus:ring-mango/15";

  return (
    <div className="bg-creamlight">
      <PageHeader title={t.contact.title} subtitle="We'd love to hear from you" />

      <section className="container-x grid gap-10 py-16 md:grid-cols-2">
        <Reveal>
          <MaskReveal
            as="h2"
            text="Get in touch"
            className="font-display text-2xl font-bold text-forest"
          />
          <motion.span
            className="mt-2 block h-1 w-12 origin-left rounded-full bg-mango"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: DUR.md, delay: 0.3, ease: EASE.out }}
          />

          <div className="mt-6 space-y-3 text-gray-700">
            <p className="flex gap-3">
              <span className="text-mango" aria-hidden="true">&#9679;</span>
              Mango Farm, Kini Village, Akkalkot Taluka, Solapur District, Maharashtra (413216), India.
            </p>
            <a href="tel:+918766977048" className="flex items-center gap-3 transition hover:text-mango">
              <span className="text-mango" aria-hidden="true">&#9742;</span> 8766977048
            </a>
            <a href="mailto:mangofarm@gmail.com" className="flex items-center gap-3 transition hover:text-mango">
              <span className="text-mango" aria-hidden="true">&#9993;</span> mangofarm@gmail.com
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-blob shadow-warm">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Kini+Akkalkot+Solapur+Maharashtra&output=embed"
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-blob bg-white p-8 shadow-warm">
            {sent ? (
              <motion.div
                className="py-20 text-center"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: DUR.md, ease: EASE.out }}
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mango/15 text-3xl text-mango">
                  &#10003;
                </div>
                <p className="mt-4 font-medium text-forest">Thank you! We'll get back to you soon.</p>
              </motion.div>
            ) : (
              /* One card, one arrival - the fields do not assemble
                 themselves in front of the reader. */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="first_name" required placeholder={t.contact.name} className={field} />
                  <input name="last_name" required placeholder={t.contact.last} className={field} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="email" required type="email" placeholder={t.contact.email} className={field} />
                  <input name="phone" placeholder={t.contact.phone} className={field} />
                </div>
                <textarea name="message" rows={4} placeholder={t.contact.message} className={"w-full " + field} />
                <motion.button
                  type="submit"
                  disabled={busy}
                  className="btn-press w-full rounded-xl bg-forest py-3 font-medium text-cream shadow-warm hover:bg-mango disabled:opacity-60"
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", ...SPRING.press }}
                >
                  {busy ? "Sending..." : t.contact.submit}
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
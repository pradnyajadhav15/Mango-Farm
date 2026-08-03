import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

const promises = [
  {
    title: "100% Organic",
    text: "Grown with Gaumutra of Gir cows, native manure and vermicompost — completely free from chemical fertilizers and pesticides.",
  },
  {
    title: "Naturally Ripened",
    text: "No carbide or chemical ripening. Our Kesar mangoes are harvested at full maturity and ripen naturally for pure, authentic taste.",
  },
];

function SectionRule() {
  return (
    <div className="mx-auto mt-4 flex w-32 items-center gap-2">
      <span className="dot-rule flex-1 rounded-full opacity-70" />
      <span className="h-2 w-2 rotate-45 rounded-[2px] bg-mango" />
      <span className="dot-rule flex-1 rounded-full opacity-70" />
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-creamlight">
      <div className="bg-orchard py-14 text-center">
        <motion.h1
          className="font-display text-4xl font-bold text-forest md:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="mt-2 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          The story of Mango Farm
        </motion.p>
        <SectionRule />
      </div>

      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-blob border-2 border-sage/40" />
            <img
              src="/images/about-farm.jpg"
              alt="Farm"
              className="relative h-80 w-full rounded-blob object-cover shadow-warm"
            />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 className="font-display text-3xl font-bold leading-tight text-forest">
            Hi, Welcome to <span className="text-kesar">Mango Farm</span>
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            Kesar mangoes of Mango Farm are a combination of nature and agriculture,
            a collaboration of natural factors, noble ideas and the excellent creation of hard work.
            The farm is scientifically developed with 100+ Kesar mango trees in Kini Village,
            Akkalkot Taluka, Solapur District, Maharashtra, using 100% organic farming methods.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-forest">Meet Our Founder</h2>
            <SectionRule />
          </Reveal>
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
            <Reveal>
              <img
                src="/images/founder1.jpg"
                alt="Mr. Suresh Jadhav"
                className="h-80 w-full rounded-blob object-cover shadow-warm"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="font-display text-2xl font-bold text-forest">Mr. Suresh Jadhav</h3>
              <p className="mt-1 inline-block rounded-full bg-mango/15 px-3 py-1 text-sm font-medium text-mango">
                Founder
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                Mr. Suresh Jadhav is the creator and visionary behind Mango Farm. With hard work,
                persistence and dedication to organic farming, he has come to be known for his
                high-quality, delicious Kesar mangoes. He grows his mango trees using 100% organic
                methods in Kini Village, Akkalkot, Solapur, and has inspired many farmers in the region.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-bold text-forest">Our Promise</h2>
          <SectionRule />
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-blob bg-white p-7 shadow-warm card-lift">
                <div className="mb-3 h-1.5 w-10 rounded-full bg-mango" />
                <h3 className="font-display text-lg font-semibold text-forest">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
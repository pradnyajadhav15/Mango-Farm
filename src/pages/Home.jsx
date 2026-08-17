import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { activities } from "../data/activities";
import { useLang } from "../LanguageContext";
import DeliveryChecker from "../components/DeliveryChecker";
import BoxCalculator from "../components/BoxCalculator";
import Reveal from "../components/Reveal";
import FloatingMangoes, { TiltCard } from "../components/FloatingMangoes";
import {
  SplitText,
  SectionHeading,
  Marquee,
  Magnetic,
  Parallax,
  HarvestThread,
  SpotlightCard,
  StackedSteps,
  StaggerGroup,
  StaggerItem,
  useMotionSafe,
  EASE,
  EASE_SOFT,
} from "../components/motion";

const whyPoints = [
  "Mango Farm is a scientifically developed orchard of 100+ Kesar mango trees in Kini Village, Akkalkot Taluka, Solapur District, Maharashtra.",
  "Developed with the joint efforts and care of traditional horticulture experts and agricultural scientists.",
  "Each tree is raised the organic way using Gaumutra of Gir cows from our own Gaushala, native manure, vermicompost and drip irrigation.",
  "Grown with 100% organic methods, our Kesar mangoes carry a rich natural sweetness, full aroma, taste and vitamins.",
  "Fruit is harvested only after full maturity, no carbide or chemical ripening. Mangoes ripen naturally in 5 to 6 days at home.",
];

const products = [
  { name: "Organic Kesar Mango Cubes", img: "/images/mango-cubes.jpg", desc: "Frozen at peak ripeness, 100% organic and preservative-free. Perfect for smoothies and desserts." },
  { name: "Organic Kesar Mango Pulp", img: "/images/mango-pulp.jpg", desc: "Made from the finest fresh Kesar mangoes. Pure, flavorful and healthy." },
  { name: "Raw Mango", img: "/images/raw-mango.jpg", desc: "Fresh green raw mangoes, straight from our farm. Perfect for pickles, chutney and tangy dishes." },
];

const testimonials = [
  { name: "Priya Sharma", place: "Pune", text: "The best Kesar mangoes I have ever tasted! So sweet and fresh. You can really tell they are 100% organic." },
  { name: "Rahul Patil", place: "Mumbai", text: "Delivered fresh to my door. No chemical smell, ripened naturally at home in a few days. Highly recommend!" },
  { name: "Sunita Deshmukh", place: "Solapur", text: "Ordered the mango pulp and it is amazing. Pure taste, no preservatives. My kids love it. Will order again." },
];

const faqs = [
  { q: "How do you deliver?", a: "We pack your order fresh and deliver it straight to your door. Free delivery on all orders!" },
  { q: "How long do mangoes take to ripen?", a: "Our mangoes are harvested at full maturity and ripen naturally at home in about 5 to 6 days. No carbide or chemicals used." },
  { q: "Are the mangoes really chemical-free?", a: "Yes. We grow 100% organically using Gaumutra of Gir cows, native manure and vermicompost. No chemical fertilizers, pesticides or ripening agents." },
  { q: "What is the minimum order?", a: "Please message us on WhatsApp for current minimum order quantity and prices. We are happy to help!" },
];

const steps = [
  { n: "1", title: "Message Us", text: "Tap any Buy Now button to chat with us on WhatsApp." },
  { n: "2", title: "Confirm Order", text: "Tell us your product, quantity and address. We confirm the price." },
  { n: "3", title: "Get Fresh Delivery", text: "We pack fresh and deliver straight to your door, free of cost." },
];

const badges = ["100% Organic", "No Chemicals", "Farm Fresh", "Free Delivery"];

const WHATSAPP_NUMBER = "918766977048";
const waLink = (message) => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

function BuyButton(props) {
  return (
    <a
      href={waLink(props.message)}
      target="_blank"
      rel="noreferrer"
      className={props.className}
    >
      {props.label || "Buy Now"}
    </a>
  );
}

function OrderForm() {
  const [form, setForm] = React.useState({ name: "", product: "Organic Kesar Mango Cubes", qty: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendOrder = () => {
    const msg =
      "New Order from Mango Farm website\n\n" +
      "Name: " + form.name + "\n" +
      "Product: " + form.product + "\n" +
      "Quantity: " + form.qty + "\n" +
      "Address: " + form.address;
    window.open(waLink(msg), "_blank");
  };

  const field =
    "w-full rounded-xl border border-sage/50 bg-creamlight/60 px-4 py-3 outline-none transition duration-300 focus:border-mango focus:bg-white focus:ring-4 focus:ring-mango/15";

  return (
    <section className="bg-sage/30 py-16">
      <div className="container-x">
        <SectionHeading>Place Your Order</SectionHeading>

        <Reveal delay={0.1} preset="scale">
          <div className="mx-auto mt-10 max-w-xl space-y-4 rounded-blob bg-white p-8 shadow-warm">
            <StaggerGroup className="space-y-4" stagger={0.06} amount={0.25}>
              <StaggerItem>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={field}
                />
              </StaggerItem>
              <StaggerItem>
                <select name="product" value={form.product} onChange={handleChange} className={field}>
                  <option>Organic Kesar Mango Cubes</option>
                  <option>Organic Kesar Mango Pulp</option>
                  <option>Raw Mango</option>
                  <option>Fresh Kesar Mango (Box)</option>
                </select>
              </StaggerItem>
              <StaggerItem>
                <input
                  name="qty"
                  value={form.qty}
                  onChange={handleChange}
                  placeholder="Quantity (e.g. 5 kg or 2 boxes)"
                  className={field}
                />
              </StaggerItem>
              <StaggerItem>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Delivery Address"
                  className={field}
                />
              </StaggerItem>
              <StaggerItem>
                <motion.button
                  onClick={sendOrder}
                  className="w-full rounded-xl bg-forest py-3 font-medium text-cream shadow-warm transition-colors duration-300 hover:bg-mango"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  Send Order on WhatsApp
                </motion.button>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
   HERO
   One scroll progress drives everything in the frame: the photograph
   sinks and grows, the drifting fruit rise past it, and the words lift
   away fastest. Three speeds is what sells the depth.
   ------------------------------------------------------------------ */
function Hero({ t }) {
  const ref = React.useRef(null);
  const animate = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 34, mass: 0.5 });

  const imageY = useTransform(eased, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(eased, [0, 1], [1, 1.12]);
  const shapesY = useTransform(eased, [0, 1], ["0%", "-24%"]);
  const copyY = useTransform(eased, [0, 1], ["0%", "38%"]);
  const copyFade = useTransform(eased, [0, 0.62], [1, 0]);

  const scrollStyle = animate ? { y: imageY, scale: imageScale } : undefined;

  return (
    <section
      ref={ref}
      className="relative flex h-[88vh] items-center justify-center overflow-hidden pb-10 text-center"
    >
      {/* outer layer settles on load, inner layer answers to the scroll */}
      <motion.div
        className="absolute inset-0"
        initial={animate ? { scale: 1.16 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 1.7, ease: EASE_SOFT }}
      >
        <motion.img
          src="/images/hero.jpg"
          alt="Mango farm"
          className="h-full w-full object-cover"
          style={scrollStyle}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/25 to-ink/60"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      />

      <motion.div className="absolute inset-0" style={animate ? { y: shapesY } : undefined}>
        <FloatingMangoes />
      </motion.div>

      <motion.div
        className="relative px-5 pt-24 md:pt-20"
        style={animate ? { y: copyY, opacity: copyFade } : undefined}
      >
        <SplitText
          as="h1"
          text={t.hero.title}
          delay={0.28}
          stagger={0.07}
          duration={0.9}
          className="font-display text-3xl font-bold uppercase leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
        />

        <SplitText
          text={t.hero.subtitle}
          delay={0.62}
          stagger={0.035}
          duration={0.7}
          className="mt-4 block font-display text-2xl italic text-white/90 drop-shadow md:text-4xl"
        />

        <motion.div
          initial={animate ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
        >
          <Magnetic className="mt-6" strength={12}>
            <BuyButton
              message="Hi, I want to buy your organic Kesar mangoes."
              className="inline-block rounded-full bg-mango px-9 py-3.5 font-medium text-white shadow-lift transition-colors duration-300 hover:bg-forest"
            />
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* A falling drop of light at the base of the frame: the page keeps
          going, and the next section is where the value is explained. */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        style={animate ? { opacity: copyFade } : undefined}
      >
        <span className="flex h-9 w-[22px] justify-center rounded-full border border-white/50 pt-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-mangolight animate-drop" />
        </span>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  const animate = useMotionSafe();

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <Hero t={t} />

      {/* ---------- FREE DELIVERY STRIP ----------
          The one promise worth repeating, so it repeats: a ticker that
          holds still the moment a pointer or the keyboard reaches it. */}
      <div className="relative overflow-hidden bg-mango py-3 font-medium tracking-wide text-white">
        <Marquee speed={30} repeat={3} fade>
          <span className="flex shrink-0 items-center gap-10 whitespace-nowrap">
            Free Delivery on All Orders &mdash; Farm Fresh, Straight to Your Door!
            <span aria-hidden="true" className="h-2 w-2 rotate-45 rounded-[2px] bg-white/70" />
          </span>
        </Marquee>
        {animate && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-white/25 blur-md animate-sheen"
          />
        )}
      </div>

      {/* ---------- DELIVERY CHECKER ---------- */}
      <section className="bg-creamlight py-10">
        <div className="container-x">
          <Reveal preset="scale">
            <DeliveryChecker />
          </Reveal>
        </div>
      </section>

      {/* ---------- WELCOME ---------- */}
      <section className="bg-creamlight py-16">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <Reveal preset="mask" duration={0.8}>
            <Parallax distance={9}>
              <div className="relative">
                <motion.div
                  className="absolute -left-3 -top-3 h-full w-full rounded-blob border-2 border-sage/40"
                  initial={animate ? { opacity: 0, x: 14, y: 14 } : false}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                />
                <img
                  src="/images/welcome.jpg"
                  alt="Welcome"
                  className="relative rounded-blob shadow-warm"
                />
              </div>
            </Parallax>
          </Reveal>

          <div>
            <h2 className="font-display text-3xl font-bold leading-tight text-forest">
              <SplitText text={t.welcome.hi} trigger="view" className="block" />
              <SplitText
                text={t.welcome.farm}
                trigger="view"
                delay={0.18}
                className="block text-kesar"
              />
            </h2>
            <Reveal delay={0.28}>
              <p className="mt-5 leading-relaxed text-gray-700">
                Mango Farm is established on the principles of organic and sustainable farming.
                Since its beginning, the farm has been dedicated to producing the finest Kesar mangoes using
                natural, eco-friendly methods in Kini Village, Akkalkot, Solapur.
              </p>
              <Link
                to="/about"
                className="group mt-6 inline-flex items-center gap-2 font-medium text-mango transition-all duration-300 hover:gap-3"
              >
                Read more
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FARM ACTIVITIES ---------- */}
      <section className="bg-orchard py-16">
        <div className="container-x">
          <SectionHeading>{t.sections.activities}</SectionHeading>

          <StaggerGroup
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.07}
          >
            {activities.map((a) => (
              <StaggerItem key={a.slug} preset="scale" className="h-full">
                <Link
                  to={"/farm-activities/" + a.slug}
                  className="group block h-full overflow-hidden rounded-blob bg-white text-center shadow-warm card-lift"
                >
                  <div className="h-32 overflow-hidden bg-sagelight">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="img-zoom h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-forest transition-colors duration-300 group-hover:text-mango">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{a.tagline}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- WHY CHOOSE ----------
          The signature: one branch drawn down the column as it is read,
          with a fruit ripening beside every reason it reaches. */}
      <section className="bg-creamlight py-16">
        <div className="container-x">
          <SectionHeading>{t.sections.whyTitle}</SectionHeading>

          <HarvestThread className="mx-auto mt-10 max-w-3xl">
            {whyPoints.map((p, i) => (
              <motion.div
                key={i}
                className="flex gap-4 border-b border-sage/40 pb-4"
                initial={animate ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mango/20 text-sm font-bold text-mango sm:hidden">
                  &#10003;
                </div>
                <p className="text-gray-700">{p}</p>
              </motion.div>
            ))}
          </HarvestThread>
        </div>
      </section>

      {/* ---------- PRODUCTS ---------- */}
      <section className="bg-sage/30 py-16">
        <div className="container-x">
          <SectionHeading headingClassName="text-2xl">{t.sections.products}</SectionHeading>

          <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {products.map((p) => (
              <StaggerItem key={p.name} preset="scale" className="h-full">
                <SpotlightCard className="h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-blob bg-white shadow-warm transition-shadow duration-300 hover:shadow-warmlg">
                    <div className="h-52 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="img-zoom h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-semibold text-forest">{p.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{p.desc}</p>
                      <p className="mt-3 inline-flex w-fit rounded-full bg-mango/15 px-3 py-1 text-xs font-semibold text-mango">
                        Free Delivery
                      </p>
                      <BuyButton
                        message={"Hi, I want to buy: " + p.name}
                        className="mt-4 inline-block rounded-full bg-forest px-5 py-2.5 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-mango"
                      />
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- SEASON NOTE ---------- */}
      <section className="relative overflow-hidden bg-mango/15 py-12">
        <div className="container-x relative text-center">
          <Reveal preset="scale">
            <span className="relative inline-block overflow-hidden rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-mango shadow-warm">
              Seasonal Fruit
              {animate && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-mango/25 blur-[6px] animate-sheen"
                />
              )}
            </span>
            <p className="mt-4 font-display text-2xl font-semibold text-forest">
              Fresh Kesar Mangoes Available <span className="text-kesar">April to June</span>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Book early each season &mdash; our organic harvest is limited and sells out fast.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- WANT TO ORDER ---------- */}
      <section className="bg-creamlight py-16">
        <div className="container-x">
          <Reveal preset="scale">
            <div className="mx-auto max-w-2xl rounded-blob bg-white p-10 text-center shadow-warm">
              <SplitText
                as="h2"
                text="Want to Order?"
                trigger="view"
                className="font-display text-3xl font-bold text-forest"
              />
              <p className="mt-4 leading-relaxed text-gray-700">
                Our prices change with the season to give you the freshest fruit at the best rate.
                Message us on WhatsApp for today's price and place your order. Free delivery on all orders!
              </p>
              <Magnetic className="mt-6" strength={12}>
                <BuyButton
                  label="Contact for Pricing"
                  message="Hi, please share your current prices."
                  className="inline-block rounded-full bg-mango px-8 py-3 font-medium text-white shadow-lift transition-colors duration-300 hover:bg-forest"
                />
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BADGES ---------- */}
      <section className="bg-forest py-6 text-cream">
        <Marquee speed={24} reverse fade>
          {badges.map((b) => (
            <span key={b} className="flex shrink-0 items-center gap-3 whitespace-nowrap font-medium tracking-wide">
              <span aria-hidden="true" className="text-sage">&#10003;</span>
              {b}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------- HOW TO ORDER ----------
          A real three-step sequence, so it is dealt as a deck: each step
          pins while it is being read and settles back as the next arrives. */}
      <section className="bg-creamlight py-16">
        <div className="container-x">
          <SectionHeading>How to Order</SectionHeading>

          <div className="mt-10">
            <StackedSteps
              steps={steps}
              renderStep={(s) => (
                <div className="mx-auto max-w-2xl rounded-blob bg-white p-8 text-center shadow-warmlg ring-1 ring-sage/25">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mango font-display text-2xl font-bold text-white shadow-lift">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.text}</p>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* ---------- DELIVERY CHECKER (2nd) ---------- */}
      <section className="bg-creamlight py-10">
        <div className="container-x">
          <Reveal preset="scale">
            <DeliveryChecker />
          </Reveal>
        </div>
      </section>

      {/* ---------- BOX CALCULATOR ---------- */}
      <section className="bg-cream py-10">
        <div className="container-x">
          <Reveal preset="scale">
            <BoxCalculator />
          </Reveal>
        </div>
      </section>

      <OrderForm />

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="bg-cream py-16">
        <div className="container-x">
          <SectionHeading>What Our Customers Say</SectionHeading>

          <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {testimonials.map((r) => (
              <StaggerItem key={r.name} preset="scale" className="h-full">
                <TiltCard className="h-full">
                  <div className="h-full rounded-blob bg-white p-6 shadow-warm card-lift">
                    <StaggerGroup className="flex gap-0.5 text-mango" stagger={0.07} amount={0.6}>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <StaggerItem key={i} preset="scale" duration={0.35}>
                          &#9733;
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                    <p className="mt-3 leading-relaxed text-gray-700">"{r.text}"</p>
                    <p className="mt-4 font-display font-semibold text-forest">{r.name}</p>
                    <p className="text-sm text-gray-500">{r.place}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-creamlight py-16">
        <div className="container-x">
          <SectionHeading>Frequently Asked Questions</SectionHeading>

          <StaggerGroup className="mx-auto mt-10 max-w-3xl space-y-4" stagger={0.07}>
            {faqs.map((f, i) => (
              <StaggerItem key={i}>
                <details className="group rounded-soft bg-white p-5 shadow-warm transition-shadow duration-300 hover:shadow-warmlg">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-forest marker:content-['']">
                    {f.q}
                    <span className="ml-4 shrink-0 text-mango transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-700 group-open:faq-in">{f.a}</p>
                </details>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
}

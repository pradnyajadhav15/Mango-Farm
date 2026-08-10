import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { activities } from "../data/activities";
import { useLang } from "../LanguageContext";
import DeliveryChecker from "../components/DeliveryChecker";
import BoxCalculator from "../components/BoxCalculator";
import Reveal from "../components/Reveal";
import FloatingMangoes, { TiltCard } from "../components/FloatingMangoes";

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

/* Small decorative divider - a dotted rule capped with a leaf tick */
function SectionRule() {
  return (
    <div className="mx-auto mt-4 flex w-32 items-center gap-2">
      <span className="dot-rule flex-1 rounded-full opacity-70" />
      <span className="h-2 w-2 rotate-45 rounded-[2px] bg-mango" />
      <span className="dot-rule flex-1 rounded-full opacity-70" />
    </div>
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
    "w-full rounded-xl border border-sage/50 bg-creamlight/60 px-4 py-3 outline-none transition focus:border-mango focus:bg-white focus:ring-4 focus:ring-mango/15";

  return (
    <section className="bg-sage/30 py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-forest">Place Your Order</h2>
          <SectionRule />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-xl space-y-4 rounded-blob bg-white p-8 shadow-warm">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={field}
            />
            <select name="product" value={form.product} onChange={handleChange} className={field}>
              <option>Organic Kesar Mango Cubes</option>
              <option>Organic Kesar Mango Pulp</option>
              <option>Raw Mango</option>
              <option>Fresh Kesar Mango (Box)</option>
            </select>
            <input
              name="qty"
              value={form.qty}
              onChange={handleChange}
              placeholder="Quantity (e.g. 5 kg or 2 boxes)"
              className={field}
            />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              placeholder="Delivery Address"
              className={field}
            />
            <button
              onClick={sendOrder}
              className="w-full rounded-xl bg-forest py-3 font-medium text-cream shadow-warm transition hover:bg-mango hover:shadow-lift"
            >
              Send Order on WhatsApp
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative flex h-[88vh] items-center justify-center overflow-hidden pb-10 text-center">
        <motion.img
          src="/images/hero.jpg"
          alt="Mango farm"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/25 to-ink/60" />

        <FloatingMangoes />

        <div className="relative px-5 pt-24 md:pt-20">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-mangolight"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            
          </motion.p>

          <motion.h1
            className="font-display text-3xl font-bold uppercase leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            className="mt-4 font-display text-2xl italic text-white/90 drop-shadow md:text-4xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
          >
            <BuyButton
              message="Hi, I want to buy your organic Kesar mangoes."
              className="mt-6 inline-block rounded-full bg-mango px-9 py-3.5 font-medium text-white shadow-lift transition duration-300 hover:-translate-y-0.5 hover:bg-forest"
            />
          </motion.div>
        </div>
      </section>

      {/* ---------- FREE DELIVERY STRIP ---------- */}
      <div className="bg-mango py-3 text-center font-medium tracking-wide text-white">
        Free Delivery on All Orders &mdash; Farm Fresh, Straight to Your Door!
      </div>

      {/* ---------- DELIVERY CHECKER ---------- */}
      <section className="bg-creamlight py-10">
        <div className="container-x">
          <Reveal>
            <DeliveryChecker />
          </Reveal>
        </div>
      </section>

      {/* ---------- WELCOME ---------- */}
      <section className="bg-creamlight py-16">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-blob border-2 border-sage/40" />
              <img
                src="/images/welcome.jpg"
                alt="Welcome"
                className="relative rounded-blob shadow-warm"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-display text-3xl font-bold leading-tight text-forest">
              {t.welcome.hi}
              <br />
              <span className="text-kesar">{t.welcome.farm}</span>
            </h2>
            <p className="mt-5 leading-relaxed text-gray-700">
              Mango Farm is established on the principles of organic and sustainable farming.
              Since its beginning, the farm has been dedicated to producing the finest Kesar mangoes using
              natural, eco-friendly methods in Kini Village, Akkalkot, Solapur.
            </p>
            <Link
              to="/about"
              className="group mt-6 inline-flex items-center gap-2 font-medium text-mango transition hover:gap-3"
            >
              Read more
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- FARM ACTIVITIES ---------- */}
      <section className="bg-orchard py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-forest">{t.sections.activities}</h2>
            <SectionRule />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 4) * 0.08}>
                <Link
                  to={"/farm-activities/" + a.slug}
                  className="group block h-full overflow-hidden rounded-blob bg-white text-center shadow-warm card-lift"
                >
                  <div className="h-32 overflow-hidden bg-sagelight">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-forest transition group-hover:text-mango">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{a.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE ---------- */}
      <section className="bg-creamlight py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-forest">{t.sections.whyTitle}</h2>
            <SectionRule />
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl space-y-5">
            {whyPoints.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="flex gap-4 border-b border-sage/40 pb-4">
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mango/20 text-sm font-bold text-mango">
                    &#10003;
                  </div>
                  <p className="text-gray-700">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRODUCTS ---------- */}
      <section className="bg-sage/30 py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-bold text-forest">{t.sections.products}</h2>
            <SectionRule />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-blob bg-white shadow-warm card-lift">
                    <div className="h-52 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
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
                        className="mt-4 inline-block rounded-full bg-forest px-5 py-2.5 text-center text-sm font-medium text-white transition duration-300 hover:bg-mango hover:shadow-lift"
                      />
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SEASON NOTE ---------- */}
      <section className="relative overflow-hidden bg-mango/15 py-12">
        <div className="container-x relative text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-mango shadow-warm">
              Seasonal Fruit
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
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-blob bg-white p-10 text-center shadow-warm">
              <h2 className="font-display text-3xl font-bold text-forest">Want to Order?</h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                Our prices change with the season to give you the freshest fruit at the best rate.
                Message us on WhatsApp for today's price and place your order. Free delivery on all orders!
              </p>
              <BuyButton
                label="Contact for Pricing"
                message="Hi, please share your current prices."
                className="mt-6 inline-block rounded-full bg-mango px-8 py-3 font-medium text-white shadow-lift transition duration-300 hover:-translate-y-0.5 hover:bg-forest"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BADGES ---------- */}
      <section className="bg-forest py-6">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-cream">
          {badges.map((b, i) => (
            <Reveal key={b} delay={i * 0.08} y={12}>
              <span className="font-medium tracking-wide">&#10003; {b}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- HOW TO ORDER ---------- */}
      <section className="bg-creamlight py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-forest">How to Order</h2>
            <SectionRule />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="h-full rounded-blob bg-white p-8 text-center shadow-warm card-lift">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mango font-display text-2xl font-bold text-white shadow-lift">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DELIVERY CHECKER (2nd) ---------- */}
      <section className="bg-creamlight py-10">
        <div className="container-x">
          <Reveal>
            <DeliveryChecker />
          </Reveal>
        </div>
      </section>

      {/* ---------- BOX CALCULATOR ---------- */}
      <section className="bg-cream py-10">
        <div className="container-x">
          <Reveal>
            <BoxCalculator />
          </Reveal>
        </div>
      </section>

      <OrderForm />

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="bg-cream py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-forest">What Our Customers Say</h2>
            <SectionRule />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.1}>
                <div className="h-full rounded-blob bg-white p-6 shadow-warm card-lift">
                  <div className="text-mango">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="mt-3 leading-relaxed text-gray-700">"{r.text}"</p>
                  <p className="mt-4 font-display font-semibold text-forest">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.place}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-creamlight py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-forest">Frequently Asked Questions</h2>
            <SectionRule />
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <details className="group rounded-soft bg-white p-5 shadow-warm transition hover:shadow-warmlg">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-forest marker:content-['']">
                    {f.q}
                    <span className="ml-4 shrink-0 text-mango transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-700">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}





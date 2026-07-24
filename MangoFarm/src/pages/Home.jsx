import React from "react";
import { Link } from "react-router-dom";
import { activities } from "../data/activities";
import { useLang } from "../LanguageContext";

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
  return React.createElement(
    "a",
    { href: waLink(props.message), target: "_blank", rel: "noreferrer", className: props.className },
    props.label || "Buy Now"
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

  return React.createElement(
    "section",
    { className: "bg-sage/30 py-16" },
    React.createElement(
      "div",
      { className: "container-x" },
      React.createElement("h2", { className: "text-center font-display text-3xl font-bold text-forest" }, "Place Your Order"),
      React.createElement("div", { className: "mx-auto mt-3 h-1 w-20 rounded bg-mango" }),
      React.createElement(
        "div",
        { className: "mx-auto mt-10 max-w-xl rounded-2xl bg-white p-8 shadow-sm space-y-4" },
        React.createElement("input", {
          name: "name", value: form.name, onChange: handleChange, placeholder: "Your Name",
          className: "w-full rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango",
        }),
        React.createElement(
          "select",
          {
            name: "product", value: form.product, onChange: handleChange,
            className: "w-full rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango",
          },
          React.createElement("option", null, "Organic Kesar Mango Cubes"),
          React.createElement("option", null, "Organic Kesar Mango Pulp"),
          React.createElement("option", null, "Raw Mango"),
          React.createElement("option", null, "Fresh Kesar Mango (Box)")
        ),
        React.createElement("input", {
          name: "qty", value: form.qty, onChange: handleChange, placeholder: "Quantity (e.g. 5 kg or 2 boxes)",
          className: "w-full rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango",
        }),
        React.createElement("textarea", {
          name: "address", value: form.address, onChange: handleChange, rows: 3, placeholder: "Delivery Address",
          className: "w-full rounded-lg border border-sage/50 px-4 py-3 outline-none focus:border-mango",
        }),
        React.createElement(
          "button",
          {
            onClick: sendOrder,
            className: "w-full rounded-lg bg-forest py-3 font-medium text-cream transition hover:bg-mango",
          },
          "Send Order on WhatsApp"
        )
      )
    )
  );
}

export default function Home() {
  const { t } = useLang();

  return (
    <div>
      <section className="relative flex h-[78vh] items-center justify-center text-center">
        <img src="/images/hero.jpg" alt="Mango farm" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-5 fade-up">
          <h1 className="font-display text-4xl font-bold uppercase text-white drop-shadow-lg md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-3 font-display text-2xl text-white drop-shadow md:text-4xl">{t.hero.subtitle}</p>
          <BuyButton
            message="Hi, I want to buy your organic Kesar mangoes."
            className="mt-8 inline-block rounded-full bg-mango px-8 py-3 font-medium text-white shadow-lg transition hover:bg-forest"
          />
        </div>
      </section>

      <div className="bg-mango py-3 text-center text-white font-medium tracking-wide">
        Free Delivery on All Orders — Farm Fresh, Straight to Your Door!
      </div>

      <section className="bg-creamlight py-16">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <img src="/images/welcome.jpg" alt="Welcome" className="rounded-2xl shadow-md" />
          <div>
            <h2 className="font-display text-3xl font-bold text-forest">{t.welcome.hi}<br />{t.welcome.farm}</h2>
            <p className="mt-5 text-gray-700 leading-relaxed">
              Mango Farm is established on the principles of organic and sustainable farming.
              Since its beginning, the farm has been dedicated to producing the finest Kesar mangoes using
              natural, eco-friendly methods in Kini Village, Akkalkot, Solapur.
            </p>
            <Link to="/about" className="mt-6 inline-block font-medium text-mango hover:underline">Read more</Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container-x">
          <h2 className="text-center font-display text-3xl font-bold text-forest">{t.sections.activities}</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-mango" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((a) => (
              <Link key={a.slug} to={"/farm-activities/" + a.slug}
                className="group rounded-2xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="text-4xl">{a.icon}</div>
                <h3 className="mt-3 font-semibold text-forest group-hover:text-mango">{a.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{a.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-creamlight py-16">
        <div className="container-x">
          <h2 className="text-center font-display text-3xl font-bold text-forest">{t.sections.whyTitle}</h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-5">
            {whyPoints.map((p, i) => (
              <div key={i} className="flex gap-3 border-b border-sage/40 pb-4">
                <div className="text-mango">+</div>
                <p className="text-gray-700">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sage/30 py-16">
        <div className="container-x">
          <h2 className="text-center font-display text-2xl font-bold text-forest">{t.sections.products}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                <img src={p.img} alt={p.name} className="h-52 w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-forest">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  <p className="mt-2 text-xs font-medium text-mango">Free Delivery</p>
                  <BuyButton
                    message={"Hi, I want to buy: " + p.name}
                    className="mt-4 inline-block rounded-full bg-forest px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-mango"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mango/15 py-8">
        <div className="container-x text-center">
          <p className="text-lg font-medium text-forest">
            Fresh Kesar mangoes available <strong>April to June</strong>. Mango pulp and cubes available all year round!
          </p>
        </div>
      </section>

      <section className="bg-creamlight py-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="font-display text-3xl font-bold text-forest">Want to Order?</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Our prices change with the season to give you the freshest fruit at the best rate.
              Message us on WhatsApp for today's price and place your order. Free delivery on all orders!
            </p>
            <BuyButton
              label="Contact for Pricing"
              message="Hi, please share your current prices."
              className="mt-6 inline-block rounded-full bg-mango px-8 py-3 font-medium text-white shadow-lg transition hover:bg-forest"
            />
          </div>
        </div>
      </section>

      <section className="bg-forest py-6">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-cream">
          {badges.map((b) => (
            <span key={b} className="font-medium tracking-wide">✓ {b}</span>
          ))}
        </div>
      </section>

      <section className="bg-creamlight py-16">
        <div className="container-x">
          <h2 className="text-center font-display text-3xl font-bold text-forest">How to Order</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-mango" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mango text-2xl font-bold text-white">{s.n}</div>
                <h3 className="mt-4 font-semibold text-forest">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrderForm />

      <section className="bg-cream py-16">
        <div className="container-x">
          <h2 className="text-center font-display text-3xl font-bold text-forest">What Our Customers Say</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-mango" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((r) => (
              <div key={r.name} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="text-mango">★★★★★</div>
                <p className="mt-3 text-gray-700 leading-relaxed">"{r.text}"</p>
                <p className="mt-4 font-semibold text-forest">{r.name}</p>
                <p className="text-sm text-gray-500">{r.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-creamlight py-16">
        <div className="container-x">
          <h2 className="text-center font-display text-3xl font-bold text-forest">Frequently Asked Questions</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-mango" />
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="rounded-xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-forest">{f.q}</summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
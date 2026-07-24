import { useState } from "react";

const PRICE_PER_DOZEN = 300;
const WHATSAPP_NUMBER = "918766977048";
const waLink = (msg) => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);

export default function BoxCalculator() {
  const [dozens, setDozens] = useState(1);
  const total = dozens * PRICE_PER_DOZEN;
  const orderMsg = "Hi, I want to order " + dozens + " dozen Kesar mangoes (approx Rs " + total + ").";

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm text-center">
      <h3 className="font-display text-lg font-bold text-forest">Price Calculator</h3>
      <p className="mt-1 text-sm text-gray-600">Rs {PRICE_PER_DOZEN} per dozen</p>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button onClick={() => setDozens((d) => Math.max(1, d - 1))} className="h-9 w-9 rounded-full bg-mango/20 text-lg font-bold text-mango">-</button>
        <span className="text-xl font-semibold text-forest">{dozens} dozen</span>
        <button onClick={() => setDozens((d) => d + 1)} className="h-9 w-9 rounded-full bg-mango/20 text-lg font-bold text-mango">+</button>
      </div>

      <p className="mt-4 text-2xl font-bold text-forest">Rs {total}</p>

      <a href={waLink(orderMsg)} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-full bg-mango px-6 py-2 text-sm font-medium text-white hover:bg-forest">Order on WhatsApp</a>
    </div>
  );
}

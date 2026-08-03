import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRICE_PER_DOZEN = 300;
const WHATSAPP_NUMBER = "918766977048";
const waLink = (msg) => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);

export default function BoxCalculator() {
  const [dozens, setDozens] = useState(1);
  const total = dozens * PRICE_PER_DOZEN;
  const orderMsg = "Hi, I want to order " + dozens + " dozen Kesar mangoes (approx Rs " + total + ").";

  const stepBtn =
    "grid h-11 w-11 place-items-center rounded-full bg-mango/15 text-xl font-bold text-mango transition hover:bg-mango hover:text-white active:scale-90 disabled:opacity-40";

  return (
    <div className="mx-auto max-w-md rounded-blob bg-white p-7 text-center shadow-warm">
      <h3 className="font-display text-xl font-bold text-forest">Price Calculator</h3>
      <p className="mt-1 inline-block rounded-full bg-sage/25 px-3 py-1 text-sm text-forest">
        Rs {PRICE_PER_DOZEN} per dozen
      </p>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          onClick={() => setDozens((d) => Math.max(1, d - 1))}
          disabled={dozens <= 1}
          aria-label="Decrease quantity"
          className={stepBtn}
        >
          &minus;
        </button>

        <span className="min-w-[7rem] font-display text-xl font-semibold text-forest">
          {dozens} dozen
        </span>

        <button
          onClick={() => setDozens((d) => d + 1)}
          aria-label="Increase quantity"
          className={stepBtn}
        >
          +
        </button>
      </div>

      <div className="mt-6 border-t border-sage/30 pt-5">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Total</p>
        <div className="relative h-11 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={total}
              className="absolute inset-x-0 font-display text-3xl font-bold text-kesar"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              Rs {total}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <a
        href={waLink(orderMsg)}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block rounded-full bg-mango px-7 py-2.5 text-sm font-medium text-white shadow-warm transition hover:bg-forest"
      >
        Order on WhatsApp
      </a>
    </div>
  );
}

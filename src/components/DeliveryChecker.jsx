import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Edit these lists to match your real delivery coverage
const DELIVERABLE_PINCODES = ["413001", "413002", "413003", "413006", "413007"];
const DELIVERABLE_CITIES = ["solapur", "akkalkot", "kini village", "pune", "mumbai"];

export default function DeliveryChecker() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null); // null | true | false

  const checkDelivery = (e) => {
    e.preventDefault();
    const value = query.trim().toLowerCase();

    if (!value) {
      setResult(null);
      return;
    }

    const isPincode = /^\d{4,6}$/.test(value);

    if (isPincode) {
      setResult(DELIVERABLE_PINCODES.includes(value));
    } else {
      setResult(DELIVERABLE_CITIES.some((city) => city.includes(value) || value.includes(city)));
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-blob bg-white p-7 shadow-warm">
      <h3 className="font-display text-xl font-bold text-forest">Check Delivery Availability</h3>
      <p className="mt-1 text-sm text-gray-600">
        Enter your city or pincode to see if we deliver to you.
      </p>

      <form onSubmit={checkDelivery} className="mt-5 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setResult(null); }}
          placeholder="e.g. Solapur or 413001"
          className="flex-1 rounded-xl border border-sage/50 bg-creamlight/50 px-4 py-2.5 text-sm outline-none transition focus:border-mango focus:bg-white focus:ring-4 focus:ring-mango/15"
        />
        <button
          type="submit"
          className="rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-warm transition hover:bg-forestdark hover:shadow-lift"
        >
          Check
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result !== null && (
          <motion.div
            key={result ? "yes" : "no"}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={
                "mt-4 flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium " +
                (result
                  ? "bg-sage/25 text-forestdark"
                  : "bg-blush/10 text-blush")
              }
            >
              <span
                className={
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs text-white " +
                  (result ? "bg-forest" : "bg-blush")
                }
                aria-hidden="true"
              >
                {result ? "\u2713" : "!"}
              </span>
              <span>
                {result
                  ? "Great news! We deliver to your area."
                  : "Sorry, we currently don't deliver there. Message us on WhatsApp to check for special arrangements."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
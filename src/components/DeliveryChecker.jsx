import { useState } from "react";

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
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
      <h3 className="font-display text-lg font-bold text-forest">Check Delivery Availability</h3>
      <p className="mt-1 text-sm text-gray-600">Enter your city or pincode to see if we deliver to you.</p>

      <form onSubmit={checkDelivery} className="mt-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Solapur or 413001"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-mango focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-mango px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Check
        </button>
      </form>

      {result === true && (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
          🎉 Great news! We deliver to your area.
        </p>
      )}
      {result === false && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          Sorry, we currently don't deliver there. Message us on WhatsApp to check for special arrangements.
        </p>
      )}
    </div>
  );
}

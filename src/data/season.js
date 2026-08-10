// Season logic for the Kesar mango year.
// Phases are month/day based, so this keeps working every year with no edits.

export const WHATSAPP_NUMBER = '918766977048';

// Boundaries as [month, day]. Adjust to match the real harvest window.
export const PHASES = [
  { key: 'booking', from: [1, 1],  to: [3, 31] },  // pre-booking open
  { key: 'live',    from: [4, 1],  to: [6, 30] },  // fruit available
  { key: 'off',     from: [7, 1],  to: [12, 31] }, // season over
];

export const COPY = {
  booking: {
    en: {
      banner: 'Pre-booking is open for this Kesar season',
      sub: 'Reserve your boxes now - harvest begins in April',
      cta: 'Pre-book now',
      modalTitle: 'Pre-book your Kesar mangoes',
      modalNote: 'No payment now. We confirm your box and message you before harvest.',
    },
  },
  live: {
    en: {
      banner: 'Fresh Kesar mangoes are available now',
      sub: 'Naturally ripened, picked to order - free delivery',
      cta: 'Order on WhatsApp',
      modalTitle: 'Order fresh Kesar mangoes',
      modalNote: 'We reply on WhatsApp to confirm your order and delivery date.',
    },
  },
  off: {
    en: {
      banner: 'This season has ended - thank you',
      sub: 'Join the list and we will message you first next season',
      cta: 'Notify me next season',
      modalTitle: 'Join next season list',
      modalNote: 'We will message you when pre-booking opens in January.',
    },
  },
};

function toNum(m, d) { return m * 100 + d; }

export function getPhase(now = new Date()) {
  const v = toNum(now.getMonth() + 1, now.getDate());
  const found = PHASES.find(
    (p) => v >= toNum(p.from[0], p.from[1]) && v <= toNum(p.to[0], p.to[1])
  );
  return found ? found.key : 'off';
}

export function seasonYear(now = new Date()) {
  // During off-season we are selling the NEXT calendar year's crop.
  return getPhase(now) === 'off' ? now.getFullYear() + 1 : now.getFullYear();
}

export function getCopy(phase, lang = 'en') {
  const block = COPY[phase] || COPY.off;
  return block[lang] || block.en;
}

export function openPreBooking() {
  window.dispatchEvent(new Event('open-prebooking'));
}

export function buildWhatsAppUrl({ phase, name, phone, qty, place, notes, year }) {
  const heading =
    phase === 'booking' ? 'PRE-BOOKING' : phase === 'live' ? 'ORDER' : 'NEXT SEASON LIST';
  const lines = [
    '*' + heading + ' - Mango Farm ' + year + '*',
    'Name: ' + name,
    'Phone: ' + phone,
  ];
  if (qty) lines.push('Boxes (5kg): ' + qty);
  if (place) lines.push('Delivery to: ' + place);
  if (notes) lines.push('Notes: ' + notes);
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
}
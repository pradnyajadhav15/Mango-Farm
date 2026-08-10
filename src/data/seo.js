// Single source of truth for SEO. Imported by React components AND by build scripts.
import { META_I18N } from './seoI18n.js';

export const SITE_URL = 'https://mango-farm-omega.vercel.app';
export const SITE_NAME = 'Mango Farm';
export const DEFAULT_IMAGE = '/share-image.jpg';
export const WHATSAPP_NUMBER = '918766977048';
export const PHONE = '+918766977048';

export const LANGS = ['en', 'hi', 'mr'];
export const DEFAULT_LANG = 'en';
export const HREFLANG = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };
export const OG_LOCALE = { en: 'en_IN', hi: 'hi_IN', mr: 'mr_IN' };

export const ACTIVITY_BASE = '/farm-activities';

export const ACTIVITY_SLUGS = [
  'pruning',
  'mulching',
  'irrigation',
  'pest-management',
  'organic-fertilizers',
  'green-manure',
  'mango-tree-grafting',
  'grafted-sapling-plantation',
];

export const PAGES = {
  '/': {
    title: '100% Organic Kesar Mangoes from Solapur',
    description:
      'Naturally ripened, chemical-free Kesar mangoes grown in Kini Village, Akkalkot, Solapur. Order on WhatsApp - free delivery across India.',
  },
  '/about': {
    title: 'About Our Farm & Founders',
    description:
      'Meet the family behind Mango Farm in Kini Village, Akkalkot. Learn how we grow Kesar mangoes without chemicals and ripen them naturally.',
  },
  '/gallery': {
    title: 'Photo Gallery',
    description:
      'Photos from our Kesar mango orchard in Akkalkot, Solapur - flowering, harvesting, natural ripening and packing.',
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Call, WhatsApp or visit Mango Farm in Kini Village, Akkalkot Taluka, Solapur District, Maharashtra.',
  },
};

export const ACTIVITY_META = {
  'pruning': {
    title: 'Mango Tree Pruning',
    description: 'How we prune Kesar mango trees for better sunlight, airflow and fruit quality at our organic farm in Akkalkot, Solapur.',
  },
  'mulching': {
    title: 'Mulching',
    description: 'Organic mulching at our Akkalkot mango orchard - conserving soil moisture, controlling weeds and feeding the soil naturally.',
  },
  'irrigation': {
    title: 'Irrigation',
    description: 'Water-efficient irrigation for Kesar mango trees in the dry Solapur climate, timed to each stage of the growing season.',
  },
  'pest-management': {
    title: 'Natural Pest Management',
    description: 'Chemical-free pest control at our Kesar mango farm using natural sprays and preventive care - no synthetic pesticides.',
  },
  'organic-fertilizers': {
    title: 'Organic Fertilizers',
    description: 'The organic manures and compost we use to feed our Kesar mango trees in Kini Village, Akkalkot - never chemical fertilizers.',
  },
  'green-manure': {
    title: 'Green Manure',
    description: 'Growing and turning in green manure crops to build soil fertility naturally at our organic mango farm in Solapur.',
  },
  'mango-tree-grafting': {
    title: 'Mango Tree Grafting',
    description: 'How we graft Kesar mango trees to keep the variety true and bring healthy young trees into the orchard.',
  },
  'grafted-sapling-plantation': {
    title: 'Grafted Sapling Plantation',
    description: 'Planting grafted Kesar mango saplings at our Akkalkot farm - spacing, soil preparation and early care.',
  },
};

/* ---------- language-aware path helpers ---------- */

// '/hi/about' -> 'hi'   |   '/about' -> 'en'
export function langFromPath(pathname) {
  const seg = pathname.split('/')[1];
  return LANGS.includes(seg) && seg !== DEFAULT_LANG ? seg : DEFAULT_LANG;
}

// '/hi/about' -> '/about'   |   '/hi' -> '/'
export function stripLang(pathname) {
  const parts = pathname.split('/');
  if (LANGS.includes(parts[1]) && parts[1] !== DEFAULT_LANG) {
    const rest = '/' + parts.slice(2).join('/');
    return rest === '/' ? '/' : rest.replace(/\/$/, '');
  }
  return pathname === '' ? '/' : pathname;
}

// ('/about','hi') -> '/hi/about'   |   ('/','hi') -> '/hi'
export function withLang(basePath, lang) {
  if (lang === DEFAULT_LANG) return basePath;
  return basePath === '/' ? '/' + lang : '/' + lang + basePath;
}

export function titleCase(slug) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// basePath is language-free, e.g. '/about' or '/farm-activities/mulching'
export function metaForPath(basePath, lang = DEFAULT_LANG) {
  const isActivity = basePath.startsWith(ACTIVITY_BASE + '/');
  const slug = isActivity ? basePath.slice(ACTIVITY_BASE.length + 1) : '';
  const key = isActivity ? slug : basePath;

  const translated = (META_I18N[lang] || {})[key];
  if (translated && translated.title) return translated;

  if (!isActivity) return PAGES[basePath] || PAGES['/'];
  if (ACTIVITY_META[slug]) return ACTIVITY_META[slug];

  const name = titleCase(slug);
  return {
    title: name + ' - Farm Activity',
    description:
      'How we do ' + name.toLowerCase() +
      ' at Mango Farm, our organic Kesar mango orchard in Kini Village, Akkalkot, Solapur.',
  };
}

// every language-free route
export function baseRoutes() {
  return [...Object.keys(PAGES), ...ACTIVITY_SLUGS.map((s) => ACTIVITY_BASE + '/' + s)];
}

// every real URL: base routes x languages
export function allRoutes() {
  const out = [];
  for (const lang of LANGS) {
    for (const base of baseRoutes()) out.push({ path: withLang(base, lang), base, lang });
  }
  return out;
}

// hreflang alternates for one base route
export function alternatesFor(basePath) {
  const alts = LANGS.map((l) => ({
    hreflang: HREFLANG[l],
    href: SITE_URL + withLang(basePath, l),
  }));
  alts.push({ hreflang: 'x-default', href: SITE_URL + basePath });
  return alts;
}

/* ---------- JSON-LD ---------- */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL + '/#business',
    name: SITE_NAME,
    description:
      'Organic Kesar mango farm in Kini Village, Akkalkot Taluka, Solapur District, Maharashtra. Naturally ripened, chemical-free mangoes with free delivery.',
    url: SITE_URL,
    telephone: PHONE,
    image: SITE_URL + DEFAULT_IMAGE,
    logo: SITE_URL + '/images/logo.png',
    priceRange: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kini Village',
      addressLocality: 'Akkalkot',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'Country', name: 'India' },
    sameAs: ['https://wa.me/' + WHATSAPP_NUMBER],
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE_URL + it.path,
    })),
  };
}
// Single source of truth for SEO. Imported by React components AND by build scripts.
// Keep this file free of imports so Node can read it directly.

export const SITE_URL = 'https://mango-farm.netlify.app'; // no trailing slash
export const SITE_NAME = 'Mango Farm';
export const DEFAULT_IMAGE = '/share-image.jpg';
export const WHATSAPP_NUMBER = '918766977048';
export const PHONE = '+918766977048';

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

export function titleCase(slug) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function metaForPath(path) {
  if (PAGES[path]) return PAGES[path];
  if (path.startsWith(ACTIVITY_BASE + '/')) {
    const slug = path.slice(ACTIVITY_BASE.length + 1);
    if (ACTIVITY_META[slug]) return ACTIVITY_META[slug];
    const name = titleCase(slug);
    return {
      title: name + ' - Farm Activity',
      description:
        'How we do ' + name.toLowerCase() +
        ' at Mango Farm, our organic Kesar mango orchard in Kini Village, Akkalkot, Solapur.',
    };
  }
  return PAGES['/'];
}

export function allRoutes() {
  return [...Object.keys(PAGES), ...ACTIVITY_SLUGS.map((s) => ACTIVITY_BASE + '/' + s)];
}

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

export function productSchema({ name, description, image, price }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image ? SITE_URL + image : SITE_URL + DEFAULT_IMAGE,
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: 'Fresh Fruit',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: String(price ?? ''),
      availability: 'https://schema.org/InStock',
      url: SITE_URL,
      seller: { '@id': SITE_URL + '/#business' },
    },
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
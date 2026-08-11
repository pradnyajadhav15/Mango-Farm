# Mango Farm — Website

A multi-language, SEO-optimised, installable website for Mango Farm (Kini Village, Akkalkot Taluka, Solapur District, Maharashtra).

**Live:** https://mango-farm-omega.vercel.app

Built with React + Vite + Tailwind CSS. Deployed on Vercel.

---

## Features

**Content**
- Home, About Us, Photo Gallery, Contact pages
- 8 farm activity pages driven by one reusable template
- Photo gallery with full-size lightbox
- Testimonials, FAQ, "How to Order" steps, trust badges
- Contact form + Google Map + floating WhatsApp button

**Multi-language**
- English, हिन्दी, मराठी
- Each language has its own URL: `/` (en), `/hi/...`, `/mr/...`
- `hreflang` tags so Google indexes all three versions separately
- Language switcher navigates rather than just changing state, so links are shareable

**Ordering**
- "Buy Now" buttons open WhatsApp with a pre-filled message
- Season banner: pre-booking / in-season / off-season, switches automatically by date
- Pre-booking modal collects name, phone, quantity, delivery area and sends it to WhatsApp formatted

**SEO**
- Per-route title, description, canonical, Open Graph and Twitter tags
- JSON-LD: LocalBusiness on the homepage, BreadcrumbList on activity pages
- `sitemap.xml` generated at build time (36 URLs: 12 routes × 3 languages)
- Static per-route HTML generated at build time so WhatsApp/Facebook link previews work
- `robots.txt`

**PWA**
- Installable on Android and iOS
- Works offline (app shell precached, photos cached on demand)
- Install prompt + update prompt

---

## Running locally

Install Node.js LTS from https://nodejs.org (one time), then:                                    npm install # one time
npm run dev # http://localhost:5173


## Build                                                                                          npm run build # vite build + sitemap + prerendered meta -> /dist
npm run preview # serve /dist locally to test the production build
npm run icons # regenerate PWA icons from the logo                                                `npm run build` runs three steps:
1. `vite build` — bundles the app and generates the service worker
2. `scripts/generate-sitemap.mjs` — writes `dist/sitemap.xml` with hreflang annotations
3. `scripts/prerender-seo.mjs` — writes `dist/<route>/index.html` for every route with that route's real meta tags

Step 3 is what makes link previews work. Social scrapers don't run JavaScript, so React-set meta tags are invisible to them.

---

## Deployment

Pushing to `main` triggers a Vercel deploy automatically.                                        git add .
git commit -m "describe your change"
git push                                                                                          Configuration lives in `vercel.json`: SPA fallback rewrite, long-cache headers for hashed assets, no-cache for the service worker, and basic security headers.

**Custom domain:** add it in Vercel → Project → Settings → Domains, then update `SITE_URL` in `src/data/seo.js` and redeploy. That one constant drives every canonical URL, sitemap entry and OG tag.

---

## Where to change things

| What | Where |
|---|---|
| Site URL (canonicals, sitemap, OG) | `src/data/seo.js` → `SITE_URL` |
| Page titles & descriptions (English) | `src/data/seo.js` → `PAGES`, `ACTIVITY_META` |
| Page titles & descriptions (हिन्दी / मराठी) | `src/data/seoI18n.js` |
| UI translations | `src/data/translations.js` |
| Farm activities (text, images, slugs) | `src/data/activities.js` |
| Season dates & banner copy | `src/data/season.js` |
| WhatsApp number | `src/data/season.js`, `src/pages/Home.jsx`, `src/components/WhatsAppButton.jsx` |
| Products, testimonials, FAQ | `src/pages/Home.jsx` (arrays at the top) |
| Founders | `src/pages/About.jsx` |
| Gallery photos | `src/pages/Gallery.jsx` |
| Contact details | `src/components/Footer.jsx`, `src/pages/Contact.jsx` |
| Colours & fonts | `tailwind.config.js` |
| PWA name, icons, theme colour | `vite.config.js` → `VitePWA` manifest |

**Important:** if you add or rename an activity, update `ACTIVITY_SLUGS` in `src/data/seo.js` to match `src/data/activities.js`. If they drift apart, the sitemap will advertise URLs that 404.

---

## Adding a language

1. Add a block to `translations` in `src/data/translations.js`
2. Add the code to `LANGS`, `HREFLANG` and `OG_LOCALE` in `src/data/seo.js`
3. Add translated meta to `src/data/seoI18n.js`
4. Add season banner copy to `COPY` in `src/data/season.js`

Routes, hreflang tags, sitemap entries and prerendered HTML are all generated from `LANGS` — no routing changes needed.

Edit these files in a proper editor (VS Code), not a terminal. PowerShell can corrupt Devanagari text.

---

## Images

Put images in `public/`, reference them by path:

| Type | Folder | Used as |
|---|---|---|
| Hero, welcome, products, logo | `public/images/` | `/images/hero.jpg` |
| Farm activities | `public/activities/` | `/activities/pruning.jpg` |
| Gallery | `public/gallery/` | `/gallery/photo1.jpg` |
| PWA icons | `public/icons/` | generated by `npm run icons` |
| Share preview | `public/share-image.jpg` | 1200×630 JPEG |
| Favicon | `public/favicon.png` | |

Use lowercase filenames with no spaces.

The share image must be a real JPEG at 1200×630 (1.91:1). If the extension and actual format don't match, some scrapers skip the preview entirely.

---

## Season logic

`src/data/season.js` defines three phases by month/day, so it keeps working every year without edits:

| Phase | Default window | Banner |
|---|---|---|
| `booking` | Jan 1 – Mar 31 | Pre-booking open |
| `live` | Apr 1 – Jun 30 | Mangoes available now |
| `off` | Jul 1 – Dec 31 | Season ended, join next season's list |

Adjust the dates in `PHASES` to match the real harvest window.

---

## Project structure                                                                              MangoFarm/
├── index.html base meta tags + PWA head
├── vercel.json rewrites, cache & security headers
├── vite.config.js Vite + PWA manifest & workbox config
├── tailwind.config.js colours, fonts, animations
├── scripts/
│ ├── generate-sitemap.mjs
│ ├── prerender-seo.mjs
│ └── generate-icons.mjs
├── public/
│ ├── robots.txt
│ ├── favicon.png
│ ├── share-image.jpg
│ ├── icons/ PWA icons
│ ├── images/ hero, welcome, products, logo
│ ├── activities/ 8 farm activity photos
│ └── gallery/ gallery photos
└── src/
├── main.jsx
├── App.jsx language-prefixed routing
├── index.css
├── LanguageContext.jsx
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── WhatsAppButton.jsx
│ ├── BackToTop.jsx
│ ├── Seo.jsx writes meta tags to document.head
│ ├── RouteSeo.jsx picks the right meta for the current route
│ ├── SeasonBanner.jsx
│ ├── PreBookingModal.jsx
│ └── PWAPrompt.jsx
├── data/
│ ├── activities.js
│ ├── translations.js
│ ├── seo.js SEO single source of truth
│ ├── seoI18n.js translated meta
│ └── season.js
└── pages/
├── Home.jsx
├── About.jsx
├── FarmActivity.jsx
├── Gallery.jsx
└── Contact.jsx                                                                                 ---

## Search Console

Verified via `public/google41b827db3aa92f8a.html`. Don't delete or re-save that file — Google compares its contents exactly, and re-saving in some editors adds a byte-order mark that breaks verification.

Submit `sitemap.xml` under Sitemaps after any change to routes or languages.

---

## About

Mango Farm grows organic Kesar mangoes in Kini Village, Akkalkot Taluka, Solapur District, Maharashtra. Naturally ripened, no chemicals, free delivery.
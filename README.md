# Mango Farm — Website

A modern, multi-language website for Mango Farm (Akkalkot, Solapur) built with **React + Vite + Tailwind CSS**.

## Features
- Pastel design (cream, sage green, mango orange)
- Sticky navbar with custom logo and **Farm Activities dropdown** (8 activities)
- Home, About Us, Photo Gallery, Contact pages
- **Multi-language support** (English, हिन्दी, मराठी) — add more easily
- **WhatsApp ordering** — "Buy Now" buttons + an order form that sends details pre-filled to WhatsApp
- Free delivery banner, seasonal note, "How to Order" steps, trust badges
- Customer testimonials and an FAQ section
- Reusable activity-page template (1 file powers all 8 activity pages)
- Photo gallery with full-size lightbox
- Contact form + Google Map + floating WhatsApp button
- Fully responsive (mobile menu included)

---

## How to run (step by step)

### 1. Install Node.js
Download the LTS version from https://nodejs.org (one-time install).

### 2. Open this folder in a terminal, then:
```bash
npm install      # installs all packages (one time)
npm run dev      # starts the site at http://localhost:5173
```
Open the link it prints in your browser. Edit any file and it updates live.

### 3. Build for production
```bash
npm run build    # creates a /dist folder ready to deploy
```

---

## Deployment (GitHub + Netlify)

The site is deployed on Netlify, connected to GitHub for automatic updates.

**Important:** the project lives inside the `MangoFarm` subfolder of the repo, so Netlify must be told where to look:

| Netlify setting | Value |
|-----------------|-------|
| Base directory | `MangoFarm` |
| Build command | `npm run build` |
| Publish directory | `dist` |

### To update the live site
After changing any file, just run:
```bash
git add .
git commit -m "describe your change"
git push
```
Netlify automatically rebuilds and updates the live site in about a minute.

### Custom domain
In Netlify → Domain management → add your domain → follow the DNS steps.

---

## How to customize

| What | Where |
|------|-------|
| Farm activities (text, images) | `src/data/activities.js` |
| Languages / translations | `src/data/translations.js` |
| Products, testimonials, FAQ, steps | `src/pages/Home.jsx` (arrays at the top) |
| WhatsApp number | `src/pages/Home.jsx`, `src/components/WhatsAppButton.jsx` |
| Colours | `tailwind.config.js` |
| Founders info | `src/pages/About.jsx` |
| Gallery photos | `src/pages/Gallery.jsx` |
| Contact details | `src/components/Footer.jsx`, `src/pages/Contact.jsx` |
| SEO / share preview | `index.html` (meta tags) |

### Using your own photos
Put images in the `public/` folder, then reference them by path:
- Hero / welcome / products → `public/images/` → used as `/images/hero.jpg`
- Farm activities → `public/activities/` → used as `/activities/pruning.jpg`
- Gallery → `public/gallery/` → used as `/gallery/photo1.jpg`
- Logo → `public/logo.png`, footer logo → `public/logofooter.png`
- Share preview image → `public/share-image.jpg` (1200×630)
- Favicon → `public/favicon.png`

Use lowercase filenames with no spaces. Match the file extension in the code.

### WhatsApp ordering
"Buy Now" buttons and the order form open WhatsApp with a pre-filled message.
The number is set in `Home.jsx` as `WHATSAPP_NUMBER` (format: country code + number, no `+` or spaces, e.g. `918766977048`).

### Making the contact form send email
The Contact page form can connect to a free Formspree account. Sign up at
**Formspree.io**, create a form, and paste your form ID into `handleSubmit` in
`src/pages/Contact.jsx`.

### SEO & share preview
Edit the meta tags in `index.html`. The `og:image` and `og:url` must be the full
live URL (e.g. `https://mango-farm.netlify.app/share-image.jpg`) for WhatsApp/
Facebook link previews to work.

---

## Project structure

MangoFarm/
├── index.html              ← SEO meta tags + share preview
├── package.json
├── tailwind.config.js
├── public/
│   ├── _redirects          ← fixes routing on Netlify
│   ├── logo.png
│   ├── logofooter.png
│   ├── favicon.png
│   ├── share-image.jpg
│   ├── images/             ← hero, welcome, products
│   ├── activities/         ← 8 farm activity photos
│   └── gallery/            ← gallery photos
└── src/
├── main.jsx
├── App.jsx              ← routing
├── index.css
├── LanguageContext.jsx  ← language state
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── WhatsAppButton.jsx
│   └── BackToTop.jsx
├── data/
│   ├── activities.js    ← all 8 farm activities
│   └── translations.js  ← all languages (en, hi, mr)
└── pages/
├── Home.jsx         ← hero, products, order form, FAQ, testimonials
├── About.jsx        ← founders, our promise
├── FarmActivity.jsx ← template for all 8 activities
├── Gallery.jsx      ← photo gallery with lightbox
└── Contact.jsx      ← contact form + map


---

## About
Mango Farm grows 100% organic Kesar mangoes in Kini Village, Akkalkot Taluka,
Solapur District, Maharashtra. Naturally ripened, no chemicals, free delivery.
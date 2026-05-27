# 🥭 Vrundavan Mango Farm — Website

A modern, multi-language website for Vrundavan Mango Farm built with **React + Vite + Tailwind CSS**.

## ✨ Features
- Pastel design (cream, sage green, mango orange)
- Sticky navbar with **Farm Activities dropdown** (8 activities)
- Home, About Us, Photo Gallery, Contact pages
- **Multi-language support** (English, हिन्दी, ગુજરાતી) — add more easily
- Reusable activity-page template (1 file powers all 8 activity pages)
- Contact form + Google Map + floating WhatsApp button
- Fully responsive (mobile menu included)

---

## 🚀 How to run (step by step)

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
npm run build    # creates a /dist folder ready to upload
```

---

## 🌐 How to put it online (free)

**Easiest — Netlify (drag & drop):**
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page. Done — you get a live URL.

**Or connect your domain (vrundavanmangofarm.com):**
- In Netlify/Vercel → Domain settings → add your domain → follow DNS steps.

---

## 🛠️ How to customize

| What | Where |
|------|-------|
| Farm activities (text, images) | `src/data/activities.js` |
| Languages / translations | `src/data/translations.js` |
| Colours | `tailwind.config.js` |
| Founders info | `src/pages/About.jsx` |
| Gallery photos | `src/pages/Gallery.jsx` |
| Contact details / WhatsApp number | `src/components/Footer.jsx`, `WhatsAppButton.jsx`, `src/pages/Contact.jsx` |

### Using your own photos
Put images in the `public/` folder (e.g. `public/activities/pruning.jpg`)
then reference them as `/activities/pruning.jpg` in the data files.

### Making the contact form actually send email
The form currently just shows a success message. To receive real emails, sign up free at **Formspree.io** and replace the `handleSubmit` in `src/pages/Contact.jsx`.

---

## 📁 Project structure
```
vrundavan/
├── index.html
├── package.json
├── tailwind.config.js
├── public/
│   └── _redirects
└── src/
    ├── main.jsx
    ├── App.jsx              ← routing
    ├── index.css
    ├── LanguageContext.jsx  ← language state
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── WhatsAppButton.jsx
    ├── data/
    │   ├── activities.js    ← all 8 farm activities
    │   └── translations.js  ← all languages
    └── pages/
        ├── Home.jsx
        ├── About.jsx
        ├── FarmActivity.jsx ← template for all 8 activities
        ├── Gallery.jsx
        └── Contact.jsx
```

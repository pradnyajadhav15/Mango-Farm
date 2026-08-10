import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider, useLang } from "./LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import FarmActivity from "./pages/FarmActivity";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import BackToTop from "./components/BackToTop";

import RouteSeo from './components/RouteSeo';
import PWAPrompt from './components/PWAPrompt';
import SeasonBanner from './components/SeasonBanner';
import PreBookingModal from './components/PreBookingModal';
import { LANGS, DEFAULT_LANG, langFromPath } from './data/seo';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Keeps LanguageContext in sync with the URL prefix (/hi, /mr).
function LangSync() {
  const { pathname } = useLocation();
  const { lang, setLang } = useLang();
  const urlLang = langFromPath(pathname);
  useEffect(() => {
    if (urlLang !== lang) setLang(urlLang);
  }, [urlLang, lang, setLang]);
  return null;
}

const PAGE_ROUTES = [
  { path: "", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/farm-activities/:slug", element: <FarmActivity /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/contact", element: <Contact /> },
];

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <LangSync />
        <SeasonBanner />
        <Navbar />
        <main style={{ paddingTop: "var(--mf-banner-h, 0px)" }}>
          <RouteSeo />
          <Routes>
            {LANGS.flatMap((lang) => {
              const prefix = lang === DEFAULT_LANG ? "" : "/" + lang;
              return PAGE_ROUTES.map((r) => (
                <Route
                  key={lang + r.path}
                  path={(prefix + r.path) || "/"}
                  element={r.element}
                />
              ));
            })}
          </Routes>
          <PWAPrompt />
          <PreBookingModal />
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </BrowserRouter>
    </LanguageProvider>
  );
}
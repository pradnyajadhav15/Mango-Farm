import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { activities } from "../data/activities";
import { useLang } from "../LanguageContext";
import { translations } from "../data/translations";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);        // mobile menu
  const [actOpen, setActOpen] = useState(false);  // activities dropdown
  const [langOpen, setLangOpen] = useState(false);
  const loc = useLocation();

  const linkBase = "font-medium transition-colors hover:text-mango";
  const active = (path) => (loc.pathname === path ? "text-mango" : "text-forest");

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur shadow-sm">
      <nav className="container-x flex items-center justify-between py-3">
           {/* Logo */}
<Link to="/" className="flex items-center">
  <img src="/images/logo.png" alt="MangoFarm.com" className="h-28 w-auto" />
</Link>
        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          <Link to="/" className={`${linkBase} ${active("/")}`}>{t.nav.home}</Link>
          <Link to="/about" className={`${linkBase} ${active("/about")}`}>{t.nav.about}</Link>

          {/* Activities dropdown */}
          <div className="relative" onMouseEnter={() => setActOpen(true)} onMouseLeave={() => setActOpen(false)}>
            <button className={`${linkBase} text-forest flex items-center gap-1`}>
              {t.nav.activities} <span className="text-xs">▾</span>
            </button>
            {actOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5">
                {activities.map((a) => (
                  <Link key={a.slug} to={`/farm-activities/${a.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-forest hover:bg-cream">
                    <span>{a.icon}</span> {a.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/gallery" className={`${linkBase} ${active("/gallery")}`}>{t.nav.gallery}</Link>
          <Link to="/contact" className={`${linkBase} ${active("/contact")}`}>{t.nav.contact}</Link>

          {/* Language switcher */}
          <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button className="flex items-center gap-2 rounded-full bg-forest px-4 py-1.5 text-sm font-medium text-cream">
              🌐 {t.label} ▾
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full w-36 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5">
                {Object.keys(translations).map((code) => (
                  <button key={code} onClick={() => setLang(code)}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-cream ${lang === code ? "text-mango font-medium" : "text-forest"}`}>
                    {translations[code].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-2xl text-forest" onClick={() => setOpen(!open)}>☰</button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white px-5 py-4 shadow-lg">
          <Link to="/" onClick={() => setOpen(false)} className="block py-2 text-forest">{t.nav.home}</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block py-2 text-forest">{t.nav.about}</Link>
          <p className="pt-2 font-medium text-mango">{t.nav.activities}</p>
          {activities.map((a) => (
            <Link key={a.slug} to={`/farm-activities/${a.slug}`} onClick={() => setOpen(false)}
              className="block py-1.5 pl-4 text-sm text-forest">{a.icon} {a.title}</Link>
          ))}
          <Link to="/gallery" onClick={() => setOpen(false)} className="block py-2 text-forest">{t.nav.gallery}</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block py-2 text-forest">{t.nav.contact}</Link>
          <div className="flex gap-2 pt-3">
            {Object.keys(translations).map((code) => (
              <button key={code} onClick={() => { setLang(code); setOpen(false); }}
                className={`rounded-full px-3 py-1 text-sm ${lang === code ? "bg-forest text-cream" : "bg-cream text-forest"}`}>
                {translations[code].label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

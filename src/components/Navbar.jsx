import { useState, useEffect, useRef } from "react";
import { Link, useLocation , useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { activities } from "../data/activities";
import { useLang } from "../LanguageContext";
import { withLang, stripLang } from "../data/seo";
import { translations } from "../data/translations";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const navigate = useNavigate();
  const switchLang = (code) => {
    setLang(code);
    navigate(withLang(stripLang(loc.pathname), code));
  };
  const [open, setOpen] = useState(false);
  const [actOpen, setActOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [barHeight, setBarHeight] = useState(96);
  const barRef = useRef(null);
  const loc = useLocation();

  const isHome = loc.pathname === "/";
  const overHero = false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the spacer exactly as tall as the bar, even as the logo shrinks,
  // and publish the height as --mf-nav-h. The bar is fixed, so anything that
  // has to sit clear of it - the hero's copy, most of all - needs to know how
  // tall it currently is rather than guessing.
  useEffect(() => {
    const measure = () => {
      if (!barRef.current) return;
      const h = barRef.current.offsetHeight;
      setBarHeight(h);
      document.documentElement.style.setProperty("--mf-nav-h", h + "px");
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled]);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  const isActive = (path) => loc.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={
        "group relative py-1 font-medium transition-colors " +
        (overHero
          ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:text-mangolight"
          : isActive(to)
          ? "text-forest"
          : "text-forest hover:text-mango")
      }
    >
      {children}
      <span
        className={
          "absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-mango transition-all duration-300 " +
          (isActive(to) ? "w-full" : "w-0 group-hover:w-full")
        }
      />
    </Link>
  );

  const panel =
    "absolute top-full mt-2 overflow-hidden rounded-soft bg-white py-2 shadow-warmlg ring-1 ring-ink/5";

  return (
    <>
      <header
        ref={barRef}
        style={{ top: "var(--mf-banner-h, 0px)" }}
        className={
          "fixed inset-x-0 z-50 transition-all duration-300 " +
          (overHero ? "bg-gradient-to-b from-ink/70 via-ink/30 to-transparent" : "bg-white shadow-warm")
        }
      >
        <nav className="container-x flex items-center justify-between">
          <Link to="/" className="flex items-center py-2">
            <img
              src="/images/logo.png"
              alt="MangoFarm.com"
              className={
                "w-auto transition-all duration-300 " +
                (scrolled ? "h-12 md:h-14" : "h-16 md:h-20") +
                (overHero ? " drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" : "")
              }
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <NavLink to="/">{t.nav.home}</NavLink>
            <NavLink to="/about">{t.nav.about}</NavLink>

            <div
              className="relative"
              onMouseEnter={() => setActOpen(true)}
              onMouseLeave={() => setActOpen(false)}
            >
              <button
                className={
                  "flex items-center gap-1 py-1 font-medium transition-colors " +
                  (overHero
                    ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:text-mangolight"
                    : "text-forest hover:text-mango")
                }
              >
                {t.nav.activities}
                <span
                  className={
                    "text-xs transition-transform duration-300 " + (actOpen ? "rotate-180" : "")
                  }
                >
                  &#9662;
                </span>
              </button>

              <AnimatePresence>
                {actOpen && (
                  <motion.div
                    className={panel + " left-1/2 w-72 -translate-x-1/2"}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activities.map((a) => (
                      <Link
                        key={a.slug}
                        to={`/farm-activities/${a.slug}`}
                        className="group flex items-center gap-3 px-4 py-2.5 text-sm text-forest transition hover:bg-cream"
                      >
                        {a.icon ? (
                          <span>{a.icon}</span>
                        ) : (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage transition group-hover:bg-mango" />
                        )}
                        <span className="transition group-hover:translate-x-0.5">{a.title}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/gallery">{t.nav.gallery}</NavLink>
            <NavLink to="/contact">{t.nav.contact}</NavLink>

            <div
              className="relative"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                className={
                  "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition duration-300 " +
                  (overHero
                    ? "bg-white/20 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/30"
                    : "bg-forest text-cream shadow-warm hover:bg-forestdark")
                }
              >
                <span aria-hidden="true">&#127760;</span>
                {t.label}
                <span
                  className={
                    "text-xs transition-transform duration-300 " + (langOpen ? "rotate-180" : "")
                  }
                >
                  &#9662;
                </span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className={panel + " right-0 w-36"}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {Object.keys(translations).map((code) => (
                      <button
                        key={code}
                        onClick={() => switchLang(code)}
                        className={
                          "flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-cream " +
                          (lang === code ? "font-medium text-forest" : "text-gray-700")
                        }
                      >
                        {translations[code].label}
                        {lang === code && <span className="text-xs">&#10003;</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className={
              "grid h-10 w-10 place-items-center rounded-full transition lg:hidden " +
              (overHero ? "text-white hover:bg-white/20" : "text-forest hover:bg-mango/15")
            }
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <span
                className={
                  "h-[2px] w-full rounded-full bg-current transition-all duration-300 " +
                  (open ? "translate-y-[7px] rotate-45" : "")
                }
              />
              <span
                className={
                  "h-[2px] w-full rounded-full bg-current transition-all duration-300 " +
                  (open ? "opacity-0" : "")
                }
              />
              <span
                className={
                  "h-[2px] w-full rounded-full bg-current transition-all duration-300 " +
                  (open ? "-translate-y-[7px] -rotate-45" : "")
                }
              />
            </div>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              className="overflow-hidden bg-white shadow-warmlg lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-5 py-4">
                <Link to="/" onClick={() => setOpen(false)} className="block py-2 text-forest">
                  {t.nav.home}
                </Link>
                <Link to="/about" onClick={() => setOpen(false)} className="block py-2 text-forest">
                  {t.nav.about}
                </Link>

                <p className="pt-3 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
                  {t.nav.activities}
                </p>
                <div className="mt-1 border-l-2 border-sage/40 pl-3">
                  {activities.map((a) => (
                    <Link
                      key={a.slug}
                      to={`/farm-activities/${a.slug}`}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-sm text-forest"
                    >
                      {a.icon ? a.icon + " " : ""}
                      {a.title}
                    </Link>
                  ))}
                </div>

                <Link to="/gallery" onClick={() => setOpen(false)} className="mt-2 block py-2 text-forest">
                  {t.nav.gallery}
                </Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="block py-2 text-forest">
                  {t.nav.contact}
                </Link>

                <div className="mt-4 flex gap-2 border-t border-sage/30 pt-4">
                  {Object.keys(translations).map((code) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setOpen(false); }}
                      className={
                        "rounded-full px-3.5 py-1.5 text-sm transition " +
                        (lang === code
                          ? "bg-forest text-cream shadow-warm"
                          : "bg-cream text-forest hover:bg-mango/20")
                      }
                    >
                      {translations[code].label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Reserves space on pages with no hero to sit under */}
      {!isHome && <div style={{ height: `calc(${barHeight}px + var(--mf-banner-h, 0px))` }} />}
    </>
  );
}







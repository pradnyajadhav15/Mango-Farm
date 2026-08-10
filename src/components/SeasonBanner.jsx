import { useEffect, useRef, useState } from 'react';
import { useLang } from '../LanguageContext';
import { getPhase, getCopy, seasonYear, openPreBooking } from '../data/season';

// Publishes its height as --mf-banner-h so the fixed Navbar can sit below it.
export default function SeasonBanner() {
  const { lang } = useLang();
  const [hidden, setHidden] = useState(false);
  const ref = useRef(null);
  const phase = getPhase();
  const year = seasonYear();
  const t = getCopy(phase, lang);
  const key = 'mf-season-banner-' + phase + '-' + year;

  useEffect(() => {
    try { if (localStorage.getItem(key) === 'dismissed') setHidden(true); } catch {}
  }, [key]);

  useEffect(() => {
    const setVar = () => {
      const h = hidden || !ref.current ? 0 : ref.current.offsetHeight;
      document.documentElement.style.setProperty('--mf-banner-h', h + 'px');
    };
    setVar();
    window.addEventListener('resize', setVar);
    return () => {
      window.removeEventListener('resize', setVar);
      document.documentElement.style.setProperty('--mf-banner-h', '0px');
    };
  }, [hidden, phase, lang]);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try { localStorage.setItem(key, 'dismissed'); } catch {}
  };

  const tone =
    phase === 'live'
      ? 'from-amber-500 to-orange-500'
      : phase === 'booking'
      ? 'from-emerald-600 to-teal-600'
      : 'from-stone-600 to-stone-700';

  return (
    <div
      ref={ref}
      className={'fixed inset-x-0 top-0 z-[60] w-full bg-gradient-to-r ' + tone + ' text-white'}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-8 py-2 text-center">
        <p className="text-[13px] font-semibold leading-tight">
          {t.banner}
          <span className="ml-2 hidden font-normal opacity-90 md:inline">{t.sub}</span>
        </p>
        <button
          onClick={openPreBooking}
          className="shrink-0 rounded-full bg-white/95 px-3.5 py-1 text-[11px] font-bold text-stone-800 shadow-sm transition hover:bg-white"
        >
          {t.cta}
        </button>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 text-lg leading-none text-white/70 hover:text-white"
      >
        &times;
      </button>
    </div>
  );
}
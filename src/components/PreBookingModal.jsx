import { useEffect, useState } from 'react';
import { useLang } from '../LanguageContext';
import { getPhase, getCopy, seasonYear, buildWhatsAppUrl } from '../data/season';

const EMPTY = { name: '', phone: '', qty: '1', place: '', notes: '' };

export default function PreBookingModal() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState('');
  const phase = getPhase();
  const year = seasonYear();
  const t = getCopy(phase, lang);

  useEffect(() => {
    const show = () => { setErr(''); setOpen(true); };
    window.addEventListener('open-prebooking', show);
    return () => window.removeEventListener('open-prebooking', show);
  }, []);

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) {
      document.addEventListener('keydown', esc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = () => {
    const phone = form.phone.replace(/\D/g, '');
    if (form.name.trim().length < 2) return setErr('Please enter your name.');
    if (phone.length < 10) return setErr('Please enter a valid 10-digit phone number.');
    window.open(buildWhatsAppUrl({ phase, year, ...form, phone }), '_blank', 'noopener');
    setOpen(false);
    setForm(EMPTY);
  };

  const field = 'w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200';

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={() => setOpen(false)}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-stone-800">{t.modalTitle}</h3>
          <button onClick={() => setOpen(false)} aria-label="Close" className="text-2xl leading-none text-stone-400 hover:text-stone-600">&times;</button>
        </div>
        <p className="mb-4 text-xs text-stone-500">{t.modalNote}</p>

        <div className="space-y-3">
          <input className={field} placeholder="Your name" value={form.name} onChange={set('name')} />
          <input className={field} placeholder="WhatsApp number" inputMode="numeric" value={form.phone} onChange={set('phone')} />
          {phase !== 'off' && (
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-600">Boxes (5 kg each)</label>
              <select className={field} value={form.qty} onChange={set('qty')}>
                {['1', '2', '3', '5', '10', 'More than 10'].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          )}
          <input className={field} placeholder="City / delivery area" value={form.place} onChange={set('place')} />
          <textarea className={field} rows="2" placeholder="Anything else? (optional)" value={form.notes} onChange={set('notes')} />
        </div>

        {err && <p className="mt-3 text-sm font-medium text-red-600">{err}</p>}

        <button
          onClick={submit}
          className="mt-4 w-full rounded-full bg-amber-500 py-3 text-sm font-bold text-white shadow-md transition hover:bg-amber-600"
        >
          {t.cta} &rarr; WhatsApp
        </button>
        <p className="mt-2 text-center text-[11px] text-stone-400">Opens WhatsApp with your details filled in</p>
      </div>
    </div>
  );
}
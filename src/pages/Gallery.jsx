import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  "/gallery/photo1.jpg",
  "/gallery/photo2.jpg",
  "/gallery/photo3.jpg",
  "/gallery/photo4.jpg",
  "/gallery/photo5.jpg",
  "/gallery/photo6.jpg",
  "/gallery/photo7.jpg",
  "/gallery/photo8.jpg",
  "/gallery/photo9.jpg",
  "/gallery/photo10.jpg",
  "/gallery/photo11.jpg",
  "/gallery/photo12.jpg",
];

export default function Gallery() {
  const [index, setIndex] = React.useState(null);
  const isOpen = index !== null;

  const close = React.useCallback(() => setIndex(null), []);
  const next = React.useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    []
  );
  const prev = React.useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    []
  );

  /* Keyboard control + lock background scroll while the lightbox is open */
  React.useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, next, prev]);

  return (
    <div className="bg-creamlight">
      {/* ---------- HEADER ---------- */}
      <div className="bg-orchard py-14 text-center">
        <motion.h1
          className="font-display text-4xl font-bold text-forest md:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Photo Gallery
        </motion.h1>
        <motion.p
          className="mt-2 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Glimpses of life at Mango Farm
        </motion.p>
        <div className="mx-auto mt-4 flex w-32 items-center gap-2">
          <span className="dot-rule flex-1 rounded-full opacity-70" />
          <span className="h-2 w-2 rotate-45 rounded-[2px] bg-mango" />
          <span className="dot-rule flex-1 rounded-full opacity-70" />
        </div>
      </div>

      {/* ---------- MASONRY GRID ---------- */}
      <section className="container-x py-16">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {photos.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-blob shadow-warm focus:outline-none focus-visible:ring-4 focus-visible:ring-mango/60"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <img
                  src={src}
                  alt={"Farm " + (i + 1)}
                  loading="lazy"
                  className="w-full transition duration-700 ease-out group-hover:scale-105"
                />
                {/* Warm wash + zoom cue on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-forest opacity-0 shadow-warm transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  &#43;
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ---------- LIGHTBOX ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/30"
            >
              &times;
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/30 md:left-8"
            >
              &#8249;
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/30 md:right-8"
            >
              &#8250;
            </button>

            <motion.img
              key={photos[index]}
              src={photos[index]}
              alt={"Farm " + (index + 1)}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] max-w-[92vw] rounded-soft shadow-warmlg"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            <p className="absolute bottom-6 text-sm tracking-wide text-white/70">
              {index + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
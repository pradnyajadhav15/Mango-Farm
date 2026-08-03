import React from "react";

export default function BackToTop() {
  const [show, setShow] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrolled > 400);
      setProgress(height > 0 ? scrolled / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const R = 21;
  const C = 2 * Math.PI * R;

  return (
    <button
      onClick={toTop}
      aria-label="Back to top"
      className={
        "fixed bottom-24 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-forest text-cream shadow-lift transition-all duration-300 hover:bg-mango " +
        (show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")
      }
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={R} fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="#E8A04C"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <span className="relative text-lg">&#8593;</span>
    </button>
  );
}

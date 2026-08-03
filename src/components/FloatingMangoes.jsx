/**
 * Ambient mango + leaf shapes that drift slowly behind the hero.
 * Pure inline SVG - no image files, no library, ~2KB.
 * Hidden from screen readers and frozen when the OS asks for reduced motion.
 */

function Mango({ className = "", style = {} }) {
  return (
    <svg viewBox="0 0 64 76" className={className} style={style} aria-hidden="true">
      <path
        d="M32 8c14 0 26 14 26 32 0 20-12 32-26 32S6 60 6 40C6 22 18 8 32 8z"
        fill="currentColor"
      />
      <path
        d="M32 10c-7 6-10 16-9 27 1 12 6 22 12 29-10-3-17-14-18-28C16 26 22 15 32 10z"
        fill="#000"
        opacity="0.08"
      />
      <path
        d="M33 9c1-4 4-7 9-8-1 5-4 8-9 9z"
        fill="#3B6D11"
      />
    </svg>
  );
}

function Leaf({ className = "", style = {} }) {
  return (
    <svg viewBox="0 0 64 40" className={className} style={style} aria-hidden="true">
      <path
        d="M4 30C14 6 40 0 60 4c-2 22-24 34-46 30z"
        fill="currentColor"
      />
      <path
        d="M8 29C22 18 40 10 58 6"
        stroke="#27500A"
        strokeWidth="1.5"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

export default function FloatingMangoes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Mango
        className="absolute left-[6%] top-[14%] w-14 text-mango/70 animate-float md:w-20"
        style={{ animationDelay: "0s" }}
      />
      <Mango
        className="absolute right-[9%] top-[22%] w-10 text-mangolight/70 animate-floatslow md:w-14"
        style={{ animationDelay: "1.4s" }}
      />
      <Mango
        className="absolute bottom-[16%] left-[16%] w-8 text-mango/50 animate-floatslow md:w-12"
        style={{ animationDelay: "2.6s" }}
      />
      <Leaf
        className="absolute right-[18%] bottom-[20%] w-14 text-sage/70 animate-float md:w-20"
        style={{ animationDelay: "0.8s" }}
      />
      <Leaf
        className="absolute left-[38%] top-[8%] w-10 text-sagelight/60 animate-floatslow md:w-14"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

/**
 * Card wrapper that tilts toward the cursor. Desktop pointer only -
 * touch devices get the plain card, which is the right call on mobile.
 */
export function TiltCard({ children, className = "", max = 7 }) {
  const handleMove = (e) => {
    const el = e.currentTarget.querySelector("[data-tilt]");
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform =
      "rotateY(" + px * max * 2 + "deg) rotateX(" + -py * max * 2 + "deg) translateZ(0)";
  };

  const handleLeave = (e) => {
    const el = e.currentTarget.querySelector("[data-tilt]");
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className={"tilt-wrap " + className} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div data-tilt className="tilt h-full">
        {children}
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import { useMotionSafe, EASE, DUR } from "./motion/useMotionSafe";

/**
 * The illustrated hero scene: fruit falling in from the top right, a juice
 * splash rising on the left, leaves scattered along the top edge.
 *
 * Drawn rather than photographed. The gradient background leaves no room for
 * a cut-out photo, and vector art keeps the whole scene under 6KB with no
 * extra network requests on the most important paint of the page.
 *
 * Every element carries three separate transforms, one per layer, so they
 * never contend:
 *   outer - scroll parallax, supplied by the hero
 *   middle - the entrance (this file)
 *   inner - the idle drift (a CSS keyframe)
 */

/* Shared gradients. Rendered once; every shape below references them by id. */
export function ArtDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="mf-skin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF0B0" />
          <stop offset="42%" stopColor="#FFD23F" />
          <stop offset="100%" stopColor="#E8620E" />
        </linearGradient>
        <linearGradient id="mf-flesh" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="55%" stopColor="#FFC93C" />
          <stop offset="100%" stopColor="#F9A825" />
        </linearGradient>
        <linearGradient id="mf-juice" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE070" />
          <stop offset="60%" stopColor="#FDB90B" />
          <stop offset="100%" stopColor="#E56A0B" />
        </linearGradient>
        <linearGradient id="mf-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8FD447" />
          <stop offset="100%" stopColor="#1F6B0D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Mango({ className = "", style }) {
  return (
    <svg viewBox="0 0 120 150" className={className} style={style} aria-hidden="true">
      <path
        d="M78 12c26 10 40 42 36 78-4 34-28 56-56 54C30 142 8 118 8 84 8 46 42 0 78 12z"
        fill="url(#mf-skin)"
      />
      <path
        d="M78 12c-18 14-28 40-26 70 2 26 12 46 26 62-22-6-36-30-38-60C38 52 54 24 78 12z"
        fill="#B45309"
        opacity="0.07"
      />
      <ellipse cx="83" cy="48" rx="11" ry="19" fill="#FFF7DC" opacity="0.34" transform="rotate(24 83 48)" />
      <path d="M70 12c2-6 8-10 18-11-2 8-8 12-18 13z" fill="url(#mf-leaf)" />
    </svg>
  );
}

/* A cut cheek, flesh toward the viewer - the shape in the splash cluster. */
function MangoSlice({ className = "", style }) {
  return (
    <svg viewBox="0 0 120 140" className={className} style={style} aria-hidden="true">
      <path
        d="M60 4c34 0 56 34 56 70 0 38-24 62-56 62S4 112 4 74C4 38 26 4 60 4z"
        fill="url(#mf-skin)"
      />
      <path
        d="M60 16c26 0 44 26 44 56 0 30-19 50-44 50s-44-20-44-50c0-30 18-56 44-56z"
        fill="#FFD766"
      />
      <path
        d="M60 30c19 0 32 20 32 42s-14 38-32 38-32-16-32-38 13-42 32-42z"
        fill="#FFE9A8"
        opacity="0.75"
      />
    </svg>
  );
}

function Leaf({ className = "", style }) {
  return (
    <svg viewBox="0 0 64 40" className={className} style={style} aria-hidden="true">
      <path d="M4 30C14 6 40 0 60 4c-2 22-24 34-56 26z" fill="url(#mf-leaf)" />
      <path d="M8 29C22 18 40 10 58 6" stroke="#1F5C0B" strokeWidth="1.6" fill="none" opacity="0.4" />
    </svg>
  );
}

/* The juice pour on the left: one flowing body plus a few thrown droplets. */
function Splash({ className = "", style }) {
  return (
    <svg viewBox="0 0 220 320" className={className} style={style} aria-hidden="true">
      <path
        d="M120 8c34 26 44 72 30 118-12 40-44 62-52 100-6 30 6 56 6 84-34-18-62-52-70-96C24 160 44 96 82 52 96 36 108 20 120 8z"
        fill="url(#mf-juice)"
      />
      <path
        d="M104 60c-22 30-32 70-24 108 6 30 22 54 32 78-24-20-42-52-46-90-4-40 10-72 38-96z"
        fill="#FFF3C4"
        opacity="0.28"
      />
      <circle cx="168" cy="70" r="9" fill="url(#mf-juice)" />
      <circle cx="186" cy="128" r="6" fill="url(#mf-juice)" />
      <circle cx="160" cy="196" r="11" fill="url(#mf-juice)" />
      <circle cx="182" cy="252" r="5" fill="url(#mf-juice)" />
      <circle cx="44" cy="96" r="7" fill="url(#mf-juice)" />
    </svg>
  );
}

/* Entrance wrapper: one element per decorative piece.
 *
 * The resting angle is a prop rather than a Tailwind `rotate-*` class:
 * framer writes an inline transform, which would silently win over the
 * class and flatten every piece to zero degrees.
 *
 * `float` names the CSS idle animation applied to the inner layer, which
 * takes over once the entrance has landed. */
function Piece({ from, delay, duration = DUR.xl, rotate = 0, className, float, children }) {
  const animate = useMotionSafe();

  return (
    <motion.div
      className={"absolute " + className}
      initial={animate ? { ...from, rotate: from.rotate ?? rotate } : false}
      animate={{ opacity: 1, x: 0, y: 0, rotate, scale: 1 }}
      transition={{ duration, delay, ease: EASE.soft }}
    >
      <div className={float}>{children}</div>
    </motion.div>
  );
}

export default function HeroArt() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden [&_svg]:[filter:drop-shadow(0_14px_22px_rgba(124,48,0,0.28))]"
      aria-hidden="true"
    >
      <ArtDefs />

      {/* leaves along the top edge - they drop first and fastest */}
      <Piece from={{ opacity: 0, y: -34, rotate: -18 }} delay={0.15} duration={DUR.lg}
        className="left-[13%] top-[14%] w-12 md:w-16" float="animate-float">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -30, rotate: 40 }} delay={0.22} duration={DUR.lg} rotate={18}
        className="left-[27%] top-[9%] w-10 md:w-14" float="animate-floatslow">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -36, rotate: -2 }} delay={0.3} duration={DUR.lg} rotate={-24}
        className="left-[44%] top-[12%] w-11 md:w-14" float="animate-float">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -32, rotate: 54 }} delay={0.38} duration={DUR.lg} rotate={32}
        className="right-[30%] top-[10%] hidden w-12 sm:block md:w-16" float="animate-floatslow">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -28, rotate: 6 }} delay={0.46} duration={DUR.lg} rotate={-14}
        className="right-[22%] top-[17%] hidden w-10 sm:block md:w-14" float="animate-float">
        <Leaf />
      </Piece>

      {/* the fruit, falling in from the top right */}
      <Piece from={{ opacity: 0, y: -90, rotate: -12 }} delay={0.3} rotate={14}
        className="right-[3%] top-[9%] w-24 md:w-40" float="animate-float">
        <Mango />
      </Piece>
      <Piece from={{ opacity: 0, y: -110, rotate: 4 }} delay={0.44} rotate={-18}
        className="right-[16%] top-[30%] hidden w-20 sm:block md:w-32" float="animate-floatslow">
        <Mango />
      </Piece>
      <Piece from={{ opacity: 0, y: -80, rotate: 2 }} delay={0.56} rotate={28}
        className="right-[7%] top-[50%] w-16 md:w-28" float="animate-floatslow">
        <Mango />
      </Piece>

      {/* the pour on the left, with two cut cheeks riding it */}
      <Piece from={{ opacity: 0, x: -40, scale: 0.9 }} delay={0.35} duration={1.5}
        className="-left-[4%] top-[16%] hidden w-44 md:block lg:w-60" float="animate-floatslow">
        <Splash />
      </Piece>
      <Piece from={{ opacity: 0, x: -30, y: 24, rotate: -34 }} delay={0.5} rotate={-16}
        className="left-[6%] top-[44%] hidden w-24 md:block lg:w-28" float="animate-float">
        <MangoSlice />
      </Piece>
      <Piece from={{ opacity: 0, x: -24, y: 30, rotate: 40 }} delay={0.62} rotate={22}
        className="left-[15%] top-[64%] hidden w-16 lg:block" float="animate-floatslow">
        <MangoSlice />
      </Piece>
    </div>
  );
}

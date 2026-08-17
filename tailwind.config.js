/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBEBD0",
        creamlight: "#FFF8EE",
        forest: "#3B6D11",
        forestdark: "#27500A",
        sage: "#A8C97F",
        sagelight: "#D6E5C0",
        mango: "#E8A04C",
        mangolight: "#F6D8B8",
        peach: "#F6D8B8",
        ink: "#2B2118",
        blush: "#C1443A",
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        soft: "1.25rem",
        blob: "2rem",
      },
      boxShadow: {
        warm: "0 10px 30px -12px rgba(43, 33, 24, 0.18)",
        warmlg: "0 24px 50px -20px rgba(43, 33, 24, 0.28)",
        lift: "0 18px 40px -16px rgba(232, 160, 76, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-7px) rotate(2deg)" },
        },
        wiggle: {
          "0%, 92%, 100%": { transform: "rotate(0deg)" },
          "94%": { transform: "rotate(-9deg)" },
          "96%": { transform: "rotate(9deg)" },
          "98%": { transform: "rotate(-5deg)" },
        },
        ripen: {
          "0%": { filter: "hue-rotate(-35deg) saturate(0.7)" },
          "100%": { filter: "hue-rotate(0deg) saturate(1)" },
        },
        // The ticker track holds two copies of its row, so travelling
        // exactly half its width lands the loop back where it started.
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        // Suspended fruit: a slow bob with a little sway and roll. Three
        // variants so no two pieces in a cluster move together.
        driftA: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "30%": { transform: "translate3d(-5px, -13px, 0) rotate(-3.2deg)" },
          "62%": { transform: "translate3d(4px, 7px, 0) rotate(2.4deg)" },
        },
        driftB: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "38%": { transform: "translate3d(6px, 10px, 0) rotate(2.8deg)" },
          "70%": { transform: "translate3d(-3px, -9px, 0) rotate(-2deg)" },
        },
        driftC: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "26%": { transform: "translate3d(3px, -8px, 0) rotate(2.2deg)" },
          "58%": { transform: "translate3d(-6px, 9px, 0) rotate(-3deg)" },
        },
        // The scroll cue at the base of the hero.
        drop: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        floatslow: "float 17s ease-in-out infinite",
        wiggle: "wiggle 6s ease-in-out infinite",
        ripen: "ripen 1.6s ease-out both",
        drop: "drop 2.8s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        driftA: "driftA 11s ease-in-out infinite",
        driftB: "driftB 14s ease-in-out infinite",
        driftC: "driftC 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
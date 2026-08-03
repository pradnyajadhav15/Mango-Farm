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
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
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
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatslow: "float 9s ease-in-out infinite",
        wiggle: "wiggle 6s ease-in-out infinite",
        ripen: "ripen 1.6s ease-out both",
      },
    },
  },
  plugins: [],
}
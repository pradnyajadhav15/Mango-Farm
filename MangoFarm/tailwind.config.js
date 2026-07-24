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
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

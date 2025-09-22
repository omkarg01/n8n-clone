// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,html}", "./src/**/*.{js,ts,jsx,tsx,html}"], // adjusted for project structure
  theme: {
    extend: {
      colors: {
        charcoal: "var(--charcoal)",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(59 130 246)",
        success: "rgb(54 211 153)",
        inactive: "rgb(255 0 0)"
      }
    },
  },
  plugins: [],
}
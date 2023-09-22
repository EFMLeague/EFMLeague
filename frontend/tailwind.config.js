/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        tableGreen: "0 0 5px green, inset 0 0 5px green;",
        tableRed: "0 0 5px red, inset 0 0 5px red;",
        tableBlue: "0 0 5px blue, inset 0 0 5px blue;",
      },
    },
  },
  plugins: [],
};

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
        tableYellow: "0 0 5px yellow, inset 0 0 5px yellow;",
        tablePurple: "0 0 5px purple, inset 0 0 5px purple;",
        tableOrange: "0 0 5px orange, inset 0 0 5px orange;",
        tableWhite: "0 0 5px white, inset 0 0 5px white;",
        tableBlack: "0 0 5px black, inset 0 0 5px black;",
      },
    },
  },
  plugins: [],
};

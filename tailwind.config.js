/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#d7eef5", // 240,86,199
        primaryDark: "#84a4f5", // 80,230,217
      },
      backgroundImage: {
        "spin_colors":"linear-gradient(#bcd8f7,#e6eff7)",
        // "spin_colors":"linear-gradient(#f7c4bc,#f7e9e6)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px, #f5f5f5 5px, #f5f5f5 100px);",
        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.4) 2px, #1b1b1b 5px, #1b1b1b 100px);",
        circularLightSm:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px, #f5f5f5 5px, #f5f5f5 20px);",
        circularDarkSm:
          "repeating-radial-gradient(rgba(255,255,255,0.4) 1px, #1b1b1b 7px, #1b1b1b 30px);",
      },
    },
  },
  plugins: [],
}


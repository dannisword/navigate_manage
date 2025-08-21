/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 掃描檔案以生成 CSS
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981", // 主色
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22"
        },
        secondary: {
          500: "#0ea5e9",
        },
        danger: {
          500: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};

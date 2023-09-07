/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      text: "#042020",
      background: "#ffffff",
      primary: "#5cc1c1",
      secondary: "#d8f9f9",
      accent: "#6f657b",
      dark_text: "#ffffff",
      dark_background: "#042020",
      dark_primary: "#5cc1c1",
      dark_secondary: "#083131",
      dark_accent: "#bcb6c3",
    },
    extend: {},
  },
  plugins: [],
};

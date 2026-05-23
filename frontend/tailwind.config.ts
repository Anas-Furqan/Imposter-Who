import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0D0D1A",
          card: "#16162A",
          red: "#FF3B5C",
          redHover: "#FF1A3F",
          cream: "#F5F0FF",
          muted: "#8B8BAD",
          border: "rgba(255,255,255,0.07)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

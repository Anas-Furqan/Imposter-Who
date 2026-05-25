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
        nb: {
          bg: "#FFFBF0",
          surface: "#FFFFFF",
          border: "#000000",
          text: "#0A0A0A",
          muted: "#444444",
          yellow: "#FFE135",
          "yellow-hover": "#FDD100",
          red: "#FF3B5C",
          green: "#00C875",
          blue: "#3B82F6",
          orange: "#FF6B35",
          pink: "#FF61A6",
          purple: "#8B5CF6",
          teal: "#06B6D4",
          lime: "#A3E635",
        },
        mode: {
          classic: "#FFE135",
          question: "#FF6B35",
          emoji: "#FF61A6",
          troll: "#8B5CF6",
          ai: "#06B6D4",
          custom: "#00C875",
        },
      },
      fontFamily: {
        heading: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "nb-sm": "3px 3px 0px #000",
        "nb-md": "4px 4px 0px #000",
        "nb-lg": "6px 6px 0px #000",
        "nb-xl": "8px 8px 0px #000",
        "nb-pressed": "1px 1px 0px #000",
      },
      borderWidth: {
        nb: "2.5px",
      },
      borderRadius: {
        nb: "12px",
        "nb-lg": "16px",
      },
    },
  },
  plugins: [],
};

export default config;

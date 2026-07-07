import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand:   "var(--brand)",
        "brand-lt": "var(--brand-lt)",
        ink:     "var(--ink)",
        paper:   "var(--paper)",
        coral:   "var(--coral)",
        gold:    "var(--gold)",
        mid:     "var(--mid)",
        border:  "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(48px, 7vw, 96px)",
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
      },
      animation: {
        fadeup: "fadeUp 0.7s ease forwards",
        ticker: "ticker 28s linear infinite",
      },
      
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

/*
 * Les tokens (couleurs, rayons, ombres, polices) vivent dans app/globals.css
 * via @theme. Ce fichier ne conserve que la compatibilité des alias existants.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sora)", "var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(48px, 7vw, 96px)",
      },
      animation: {
        fadeup: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        ticker: "ticker 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

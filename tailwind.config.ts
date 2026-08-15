import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        // Los tokens viven en globals.css como canales RGB sueltos ("44 56 66").
        // El wrapper rgb(... / <alpha-value>) es lo que permite bg-sp-navy/40,
        // from-sp-navy-deep/95, divide-sp-steel/10, etc.
        sp: {
          navy: "rgb(var(--sp-navy) / <alpha-value>)",
          "navy-deep": "rgb(var(--sp-navy-deep) / <alpha-value>)",
          "navy-soft": "rgb(var(--sp-navy-soft) / <alpha-value>)",
          steel: "rgb(var(--sp-steel) / <alpha-value>)",
          "steel-ink": "rgb(var(--sp-steel-ink) / <alpha-value>)",
          "steel-mute": "rgb(var(--sp-steel-mute) / <alpha-value>)",
          cream: "rgb(var(--sp-cream) / <alpha-value>)",
          white: "rgb(var(--sp-white) / <alpha-value>)",
          sand: "rgb(var(--sp-sand) / <alpha-value>)",
          ivory: "rgb(var(--sp-ivory) / <alpha-value>)",
          gold: "rgb(var(--sp-gold) / <alpha-value>)",
          sold: "rgb(var(--sp-sold) / <alpha-value>)",
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.22em",
        tightest: "-0.02em",
        tighter: "-0.015em",
        snug: "-0.01em",
      },
      lineHeight: {
        title: "1.02",
        lyric: "1.4",
        body: "1.75",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;

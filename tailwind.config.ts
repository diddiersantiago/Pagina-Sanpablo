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
        sp: {
          navy: "var(--sp-navy)",
          "navy-deep": "var(--sp-navy-deep)",
          "navy-soft": "var(--sp-navy-soft)",
          steel: "var(--sp-steel)",
          "steel-ink": "var(--sp-steel-ink)",
          "steel-mute": "var(--sp-steel-mute)",
          cream: "var(--sp-cream)",
          white: "var(--sp-white)",
          sand: "var(--sp-sand)",
          ivory: "var(--sp-ivory)",
          gold: "var(--sp-gold)",
          sold: "var(--sp-sold)",
        },
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

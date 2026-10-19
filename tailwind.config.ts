import type { Config } from "tailwindcss";

/*
 * ResumeAI Pro design tokens ("Paper & Ink").
 * Legacy keys (navy, brand, gold, soft) are kept so existing class names keep
 * working; their values now point at the new palette.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#15171C",
          900: "#15171C",
          800: "#22252C",
          700: "#343842",
          600: "#4A505C",
          500: "#5E6470",
          400: "#8A909B",
          300: "#C9CCD2",
        },
        paper: {
          DEFAULT: "#F6F3EC",
          50: "#FBFAF6",
          100: "#F6F3EC",
          200: "#EEE9DD",
          300: "#E3DDCD",
        },
        line: "#E2DCCF",
        navy: "#15171C",
        brand: {
          DEFAULT: "#0F6E5E",
          50: "#E8F3F0",
          100: "#CFE6E0",
          600: "#0F6E5E",
          700: "#0B5A4D",
          800: "#08463C",
        },
        gold: {
          DEFAULT: "#C58A1E",
          50: "#FBF3E2",
          700: "#8A5A0F",
        },
        rust: {
          DEFAULT: "#A63D2F",
          50: "#F8ECE9",
          200: "#E9C7C0",
          700: "#862F23",
        },
        soft: "#F6F3EC",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      boxShadow: {
        paper: "0 1px 0 rgba(21,23,28,0.04), 0 1px 2px rgba(21,23,28,0.06)",
        lift: "0 1px 2px rgba(21,23,28,0.05), 0 12px 32px -12px rgba(21,23,28,0.18)",
        sheet: "0 2px 4px rgba(21,23,28,0.04), 0 30px 60px -20px rgba(21,23,28,0.28)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

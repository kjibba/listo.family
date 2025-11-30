import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Listo brand colors from design philosophy
        cream: {
          50: "#FFFAF5",
          100: "#FFF5EB",
          200: "#FFECD6",
        },
        // Soft Charcoal - primary text and strokes
        charcoal: {
          DEFAULT: "#34495E",
          light: "#5D6D7E",
          dark: "#2C3E50",
        },
        // FOOD CORE - Warm Salmon/Coral
        salmon: {
          50: "#FFF5F2",
          100: "#FFEBE5",
          200: "#FFD7CC",
          300: "#FFC3B2",
          400: "#FFAF99",
          500: "#FF8C69",
          600: "#E67A5C",
          700: "#CC684F",
          800: "#B35642",
          900: "#994435",
        },
        // LOGISTICS CORE - Soft Blue
        sky: {
          50: "#EBF5FB",
          100: "#D6EAF8",
          200: "#AED6F1",
          300: "#85C1E9",
          400: "#5DADE2",
          500: "#3498DB",
          600: "#2E86C1",
          700: "#2874A6",
          800: "#21618C",
          900: "#1B4F72",
        },
        // ACTION & SUCCESS - Listo Green
        listo: {
          50: "#EAFAF1",
          100: "#D5F5E3",
          200: "#ABEBC6",
          300: "#82E0AA",
          400: "#58D68D",
          500: "#2ECC71",
          600: "#28B463",
          700: "#239B56",
          800: "#1D8348",
          900: "#186A3B",
        },
        // AI GUIDANCE - Friendly Purple
        magic: {
          50: "#F5EEF8",
          100: "#EBDEF0",
          200: "#D7BDE2",
          300: "#C39BD3",
          400: "#AF7AC5",
          500: "#9B59B6",
          600: "#884EA0",
          700: "#76448A",
          800: "#633974",
          900: "#512E5F",
        },
        // ALERT/PRIORITY - Warm Yellow
        alert: {
          50: "#FEF9E7",
          100: "#FCF3CF",
          200: "#F9E79F",
          300: "#F7DC6F",
          400: "#F4D03F",
          500: "#F1C40F",
          600: "#D4AC0D",
          700: "#B7950B",
          800: "#9A7D0A",
          900: "#7D6608",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cabinet)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'squircle': '1.5rem',
        'squircle-lg': '2rem',
        'squircle-xl': '2.5rem',
        'squircle-2xl': '3rem',
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "puff": "puff 0.3s ease-out",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        puff: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

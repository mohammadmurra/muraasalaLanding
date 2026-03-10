/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Muraasala Brand - Refined Palette
        primary: {
          50: "#f0f9f9",
          100: "#d9f0f0",
          200: "#b3e0df",
          300: "#8dc9c8",
          400: "#6aadaa",
          500: "#4a918e",
          600: "#0B5C58", // Main brand
          700: "#084744",
          800: "#053331",
          900: "#022221",
        },
        gold: {
          300: "#ffd54f",
          400: "#F2B705", // Main accent
          500: "#e0a800",
          600: "#c49000",
        },
        // Premium neutrals
        slate: {
          850: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // Premium typography scale
        "hero": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "800" }],
        "headline": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "title": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.3", fontWeight: "600" }],
        "lead": ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.6", fontWeight: "400" }],
      },
      animation: {
        // Premium animations
        "float": "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "gradient-x": "gradientX 15s ease infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "fade-up": "fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(2deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

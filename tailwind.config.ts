import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Override with Tailwind v2 color palette to match origin/master Windi CSS colors
        green: {
          400: "#6ee7b7", // v2.x: rgb(110 231 183) instead of v3.x: #4ade80
        },
        yellow: {
          400: "#fbbc24", // v2.x: rgb(251 191 36) instead of v3.x: #facc15
        },
        light: {
          50: "#ffffff",
          100: "#f9fafb",
          200: "#f3f4f6",
          300: "#e5e7eb",
          400: "#d1d5db",
          500: "#9ca3af",
          600: "#6b7280",
          700: "#4b5563",
          800: "#374151",
          900: "#1f2937",
        },
      },
      spacing: {
        "25px": "25px",
        "100px": "100px",
        "150px": "150px",
        "250px": "250px",
        "500px": "500px",
      },
      width: {
        "100%": "100%",
        "250px": "250px",
      },
    },
  },
  plugins: [],
} satisfies Config;

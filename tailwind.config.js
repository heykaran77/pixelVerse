/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      fontFamily: {
        offbit: ["OffBit", "sans-serif"],
      },
      colors: {
        // Dark theme colors
        dark: {
          bg: "#0c0c0c",
          section: "#1f1b2e",
          text: "#ffffff",
          muted: "#b0b0b0",
          primary: "#ffff00", // neon yellow
          secondary: "#f5f5f5", // off-white
          gold: "#ffe600",
          border: "#2c2c2c",
        },
        // Light theme colors
        light: {
          bg: "#f5e6d3", // cream color
          section: "#ffe8d6",
          text: "#1c1c1c",
          muted: "#4b4b4b",
          primary: "#cccc00", // slightly darker neon yellow for light mode
          secondary: "#e6e6e6", // slightly darker off-white
          gold: "#fcd900",
          border: "#e0e0e0",
        },
        pixel: {
          // Main backgrounds
          dark: "#0f0e17",
          secondary: "#2e1a47",

          // Text colors
          light: "#eaeaea",
          muted: "#a39cb3",

          // Accent colors
          pink: "#ff3caa",
          cyan: "#00f6ed",
          gold: "#fcd900",

          // Alert colors
          error: "#ff5e5b",
          success: "#7dd87d",

          // Darker shades for hover states
          "pink-dark": "#cc2e88",
          "cyan-dark": "#00c4bd",
          "gold-dark": "#caa900",
        },
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};

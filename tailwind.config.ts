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
        background: "#050505", // Very dark impl
        foreground: "#ededed",
        primary: {
          DEFAULT: "#00f0ff", // Neon Cyan
          hover: "#00c0cc",
        },
        secondary: {
          DEFAULT: "#7000ff", // Neon Purple
          hover: "#5a00cc",
        },
        accent: "#ff0099", // Neon Pink
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

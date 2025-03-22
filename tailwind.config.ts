import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#457b9d",
        secondaryLight: "#f8fcf7",
        secondaryDark: "#f1faee",
        danger: "#e63946",
        textLight: "#edf3f7",
        textDark: "#080e12",
        btnLight: "#f1faee",
        btnDark: "#1d3557",
      },
    },
  },
  plugins: [],
} satisfies Config;

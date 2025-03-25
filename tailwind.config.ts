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
        secondaryLight: "#fafafa",
        secondaryDark: "#ebedef",
        danger: "#e63946",
        textLight: "#edf3f7",
        textDark: "#080e12",
        btnLight: "#baceda",
        btnDark: "#3d5767",
      },
      fontFamily: {
        custom: ["CustomFont", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

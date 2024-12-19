import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgcream: "#F6F4E8",
        cream: "#FFFBE5",
        gray: "#37353280",
        dark: "#373532",
        yellow: "#EFCB3B",
      },
      fontFamily: {
        cooper: ["Cooper", "Poppins"],
        samurai: ["Samurai", "Poppins"],
        wonder: ["Wonder", "Poppins"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

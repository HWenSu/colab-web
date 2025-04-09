/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "blur-text": {
          "0%": { filter: "blur(var(--initial-blur))" },
          "50%": { filter: "blur(0px)" },
          "100%": { filter: "blur(var(--initial-blur))" },
        },
      },
      animation: {
        "blur-text":
          "blur-text var(--animation-duration) ease-in-out infinite var(--animation-delay)",
      },
    },
  },
  plugins: [],
};

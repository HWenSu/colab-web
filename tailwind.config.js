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
          "0%": { filter: "blur(0px)" },
          "50%": { filter: "blur(15px)" },
          "100%": { filter: "blur(0px)" },
        },
      },
      animation: {
        "blur-text": "blur-text 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

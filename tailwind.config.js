/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#024494",
        secondary: "#CCDAEA",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        shadowBlue: "#9AB4D4",
        nightBlue: "#000E1E",
        customBlueWithOpacity: "rgba(204, 218, 234, 0.2)",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
    fontSize: {
      sm: [
        "0.875rem",
        {
          fontWeight: "300",
        },
      ],
      base: [
        "1rem",
        {
          fontWeight: "400",
        },
      ],
      lg: [
        "1.5rem",
        {
          fontWeight: "500",
        },
      ],
      xl: [
        "2rem",
        {
          fontWeight: "500",
        },
      ],
      "2xl": [
        "4rem",
        {
          fontWeight: "600",
        },
      ],
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "neon-green": "#3E6D4F", // Updated color
      },
      animation: {
        neon: "neon 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

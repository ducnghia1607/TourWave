/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "primary-bg-color": "var(--primary-bg-color)",
        "secondary-bg-color": "var(--secondary-bg-color)",
        "primary-section-color": "var(--primary-section-color)",
        "secondary-section-color": "var(--secondary-section-color)",
        "warning-section-color": "var(--warning-section-color)",
      },
    },
  },
  plugins: [require("daisyui")],
};

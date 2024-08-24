/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        "secondary-color": "var(--secondary-color)",
        "primary-color": "var(--primary-color)",
      },
    },
  },
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [],
};

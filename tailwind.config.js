/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color, #3b82f6)',
        secondary: 'var(--secondary-color, #10b981)',
      },
    },
  },
  plugins: [],
}


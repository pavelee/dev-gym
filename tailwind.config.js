/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    options: {
      safelist: ['ant-btn', /ant-btn/],
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    options: {
      safelist: ['ant-btn', /ant-btn/],
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#202020',
        'primary': '#0F0',
        'secondary': '#808080',
        'minor': '#FFFF00',
        'action': '#009999',
        'selected': '#FF0000',
      }
    },
  },
  plugins: [],
}


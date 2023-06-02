/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.vue",
    "./src/layouts/**/*.vue",
    "./src/fragments/**/*.vue",
    "./src/views/**/*.vue",
    "./index.html",
    "./src/core/*.js"
  ],
  theme: {
    extend: {
      boxShadow: {
        button: '0 0 10px rgba(0,0,0,0.15)',
        navbar: '1px 3px 10px 1px #e8e8e896;',
        global: '0px 4px 24px rgba(0, 0, 0, 0.06)',
        card: '0px 0px 15px 1px rgba(0, 147, 173, 0.3)'
      },
      colors: {
        powergreen: {
          primary: "#1fa446",
        },
      },
    },
  },
  plugins: [],
}


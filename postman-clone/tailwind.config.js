/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(2, 101, 210)',
          dark: 'rgb(1, 82, 174)',
          light: 'rgb(50, 130, 230)',
        },
        dark: {
          bg: '#1e1e1e',
          surface: '#262626',
          hover: '#2f2f2f',
          border: '#3e3e42',
          text: '#f1f1f1',
          'text-secondary': '#858585',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        mono: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}

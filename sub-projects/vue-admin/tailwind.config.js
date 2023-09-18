/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,vue}"],
  important: true,
  theme: {
    spacing: Array.from({ length: 501 }).map((_, index) => index).reduce((preV, nxtV) => (preV[nxtV] = `${nxtV}px`,preV), {}),
    fontSize: Array.from({ length: 101 }).map((_, index) => index).reduce((preV, nxtV) => (preV[nxtV] = `${nxtV}px`,preV), {}),
  },
  plugins: [],
}


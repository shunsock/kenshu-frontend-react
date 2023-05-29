/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ["Oswald"],
        body: ["Roboto Mono"]
      },
      colors: {
        "red": "#f92672",
        "green": "#a6e22e",
        "orange": "#fd971f",
        "blue": "#66d9ef",
        "purple": "#fd971f",
        "yellow": "#e6db74",
        "comment": "#75715e",
        "light-gray": "#eee",
        "dark-gray": "#d1d1d1",
        "dark": "#323232",
        "midnight": "#161616"
      },
    },
  }
};

// /** @type {import('tailwindcss').Config} */

module.exports = {
  plugins: [require('@tailwindcss/line-clamp')],
    mode: 'jit',
    purge: ['./src/**/*.{js, jsx,css}'],
    darkMode: false,
    content: [],
    theme: {
      extend: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          primary: {
            800: '#c75002',
            500: '#FF6600',
            400: '#fe944c',
            300: '#feb27e',
            200: '#fed3b3',
          },
          brightRed: "hsl(12.88%.59%)",
          brightRedLight: "hsl(12,88%,69%)",
          brightRedSupLight: "hsl(12,88%,95%)",
          tibebOrange: "#FF6701",
          tibebPink: "#FFC2C3;",
          tibebYellow: "rgba(245, 206, 144, 0.76);",
          tibebBlue: "rgba(144, 224, 240, 0.76);",
          tibebGreen: " #BBF0B3;",
          tibebLightGreen: "#E1EAB2;",
          tibebPurple: "#FDD4F9;",
        },
        fontFamily: {
          Outfit: ['Outfit', 'sans-serif'],
        },
      },
    },
    variants: {
      extend: {},
    },
  }


/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const MyClass = plugin(function ({addUtilities}){
  addUtilities({
    ".my-rotate-y-180":{
      transform : "rotateX(180deg)",
    },
    ".preserve-3d" : {
      transformStyle : "preserve-3d",
    },
    ".perspective-1000":{
      perspective : "1000px",
    },
    ".backface-hidden":{
      backfaceVisibility : "hidden",
    },
    ".font-Poppins" : {
      fontFamily : 'Poppins',
    }
  })
})

module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily : {
        'poppins' : ['Poppins','sans-serif'],
        'dmSerif' : ['DM Serif Display','sans-serif'],
        'Meuso' : ['MuseoModerno','sans-serif'],
      },
    },
  },
  plugins: [MyClass],
}


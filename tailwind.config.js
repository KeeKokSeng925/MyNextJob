/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: [
      {
      mytheme: {
        "primary": "#a2c906",
        "secondary": "#96bf03", 
        "accent": "#2921c4", 
        "neutral": "#2a243d",      
        "base-100": "#f7c869",
      },
    },
      "night", 
    "synthwave", 
    "cyberpunk", 
    "retro",
    "garden",
    
  ],
  },
};




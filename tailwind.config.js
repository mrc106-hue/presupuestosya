/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  '#00C896',
          blue:   '#0066FF',
          dark:   '#080808',
          card:   '#111111',
          text:   '#F5F5F0',
        },
      },
      fontFamily: {
        condensed: ["'Barlow Condensed'", 'sans-serif'],
        sans:      ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeInUp:    { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight:{ '0%': { opacity: '0', transform: 'translateX(40px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulse2:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        ticker:      { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        toastIn:     { '0%': { opacity: '0', transform: 'translateX(100px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        checkmark:   { '0%': { strokeDashoffset: '100' }, '100%': { strokeDashoffset: '0' } },
        particleFloat: {
          '0%':   { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '0.3' },
          '100%': { transform: 'translateY(-100px) scale(1)', opacity: '0' },
        },
      },
      animation: {
        fadeInUp:     'fadeInUp 0.5s ease both',
        slideInRight: 'slideInRight 0.4s ease both',
        float:        'float 3s ease-in-out infinite',
        ticker:       'ticker 30s linear infinite',
        toastIn:      'toastIn 0.4s ease both',
        pulse2:       'pulse2 2s ease infinite',
      },
    },
  },
  plugins: [],
}

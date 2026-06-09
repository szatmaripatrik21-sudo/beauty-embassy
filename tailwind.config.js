/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--ink-3) / <alpha-value>)',
        ivory: 'rgb(var(--ivory) / <alpha-value>)',
        'ivory-dim': 'rgb(var(--ivory-dim) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        champagne: 'rgb(var(--champagne) / <alpha-value>)',
        'champagne-light': 'rgb(var(--champagne-light) / <alpha-value>)',
        'champagne-press': 'rgb(var(--champagne-press) / <alpha-value>)',
        blush: 'rgb(var(--blush) / <alpha-value>)',
        stone: 'rgb(var(--stone) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.9s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 1.1s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 1px)',
        sm: 'calc(var(--radius) - 2px)',
      },
    },
  },
  plugins: [],
}

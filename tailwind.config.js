/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00D4FF',
          cyan: '#00FFF0',
          purple: '#7B2FFF',
          pink: '#FF2DD4',
        },
        dark: {
          950: '#020408',
          900: '#060D18',
          800: '#0A1628',
          700: '#0F1E35',
          600: '#162440',
          500: '#1E2F50',
        },
        light: {
          50:  '#F0F8FF',
          100: '#E0F2FF',
          200: '#C0E4FF',
        }
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        body:    ['var(--font-exo2)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`,
        'neon-glow':    'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.15) 0%, transparent 60%)',
        'card-glow':    'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)',
        'hero-mesh':    `radial-gradient(at 20% 50%, rgba(0,212,255,0.12) 0px, transparent 50%),
                         radial-gradient(at 80% 20%, rgba(123,47,255,0.10) 0px, transparent 50%),
                         radial-gradient(at 60% 80%, rgba(0,255,240,0.08) 0px, transparent 50%)`,
      },
      animation: {
        'pulse-neon':   'pulseNeon 2.5s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'scan-line':    'scanLine 4s linear infinite',
        'glow-border':  'glowBorder 3s ease-in-out infinite',
        'fade-up':      'fadeUp 0.6s ease forwards',
        'slide-in':     'slideIn 0.4s ease forwards',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: 1, textShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF' },
          '50%':      { opacity: 0.8, textShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowBorder: {
          '0%, 100%': { borderColor: 'rgba(0,212,255,0.5)' },
          '50%':      { borderColor: 'rgba(0,212,255,1)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'neon-sm':  '0 0 10px rgba(0,212,255,0.3)',
        'neon-md':  '0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.1)',
        'neon-lg':  '0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)',
        'card':     '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,212,255,0.15)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#C0E4FF',
            h1: { color: '#00D4FF', fontFamily: 'var(--font-orbitron)' },
            h2: { color: '#00D4FF', fontFamily: 'var(--font-orbitron)' },
            h3: { color: '#00FFF0' },
            a:  { color: '#00D4FF', textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline', color: '#00FFF0' } },
            strong: { color: '#FFFFFF' },
            code:   { color: '#00FFF0', backgroundColor: 'rgba(0,255,240,0.1)', padding: '2px 6px', borderRadius: '4px' },
            blockquote: { borderColor: '#00D4FF', color: '#A0C8E0' },
            hr: { borderColor: 'rgba(0,212,255,0.2)' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

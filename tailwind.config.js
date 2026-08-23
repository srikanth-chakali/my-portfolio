/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0D16',
          soft: '#0D1120',
          surface: '#121826',
          border: '#1F2637',
        },
        paper: {
          DEFAULT: '#F7F7FB',
          surface: '#FFFFFF',
          border: '#E4E6EF',
        },
        violet: {
          DEFAULT: '#7C5CFF',
          soft: '#9B82FF',
          dim: '#5B3FD9',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          soft: '#67E5F5',
        },
        text: {
          DEFAULT: '#EAEDF5',
          muted: '#8B93A7',
          dim: '#5A6178',
        },
        textLight: {
          DEFAULT: '#12141C',
          muted: '#5C6070',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #7C5CFF 0%, #22D3EE 100%)',
        'grad-radial-violet': 'radial-gradient(circle at 30% 20%, rgba(124,92,255,0.25), transparent 60%)',
        'grad-radial-cyan': 'radial-gradient(circle at 80% 70%, rgba(34,211,238,0.15), transparent 55%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'beacon-blue': '#005A8B',
        'korean-white': '#FFFFFF',
        'korean-black': '#1D1E23',
        'korean-red': '#B82647',
        'korean-blue': '#0B6DB7',
        'korean-yellow': '#F9D537',
      },
    },
  },
  plugins: [],
} satisfies Config;

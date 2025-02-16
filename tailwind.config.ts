import type { Config } from 'tailwindcss';
import { content as flowbiteContent } from 'flowbite-react/tailwind';
import { plugin as flowbitePlugin } from 'flowbite-react/tailwind';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbiteContent(),
  ],
  theme: {
    extend: {
      fontFamily: {
        Shilla: ['Shilla_CultureB-Bold'],
        Chosun: ['ChosunGs'],
      },
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
  plugins: [flowbitePlugin()],
} satisfies Config;

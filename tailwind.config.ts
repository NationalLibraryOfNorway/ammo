import type {Config} from 'tailwindcss';
import {heroui} from '@heroui/react';

const config: Config = {
  content: [
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui()
  ],
};
export default config;

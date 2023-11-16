import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'green-dark': '#458E5F',
        'green-primary': '#53b175',
        'green-light': '#E5FCED',

        'gray-primary': '#b0b7c3',
      },
      boxShadow: {
        'primary': '0px 15px 60px rgba(22, 22, 22, 0.1);',
      },
    },
  },
  plugins: [],
}
export default config

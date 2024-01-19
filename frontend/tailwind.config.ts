import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/HomepageComponents/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        custom: {
          primary: '#5EB877',
          tertiary: '#B85E5E',
        },
      },
      fontFamily: {
        custom: ['foulfiend', 'sans-serif'], // 'CustomFont' is the font name
      },
      screens: {
        'ssm': "533px"
      }
    },
  },
  plugins: [],
}
export default config

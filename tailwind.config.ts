import type { Config } from "tailwindcss";
import { plugins } from './tailwind-plugins.ts';


const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
		fontFamily: {
			sans: ['var(--font-noto)'],
			mono: ['var(--font-rubik)'],
			dyslexia: ['var(--font-open-dyslexic)'],
			logo: ['var(--font-pacifico)'],
		},
		colors: {
			background: {
				DEFAULT: 'hsl(var(--background))',
				svg: 'hsl(var(--background-svg))',
				raised: 'hsl(var(--background-raised))',
				raiseddarker: 'hsl(var(--background-raised-darker))',
				pure: 'hsl(var(--background-pure))',
			},
			foreground: {
				DEFAULT: 'hsl(var(--foreground))',
				raised: 'hsl(var(--foreground-raised))',
				pure: 'hsl(var(--foreground-pure))',
			},
			faded: {
				light: 'hsl(var(--faded-light))',
				dark: 'hsl(var(--faded-dark))',
			},
			themeshadow: 'var(--theme-shadow)',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
				dark: 'hsl(var(--primary-dark))',
				light: 'var(--primary-light)'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			link: {
				DEFAULT: 'var(--link)',
				hover: 'var(--link-hover)',
				visited: 'var(--link-visited)',
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
  },
  plugins: plugins,
};
export default config;

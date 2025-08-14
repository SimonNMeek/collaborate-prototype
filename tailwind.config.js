/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(213 14% 87%)",
        input: "hsl(213 9% 75%)",
        ring: "hsl(207 100% 36%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(213 13% 14%)",
        primary: {
          DEFAULT: "hsl(180 100% 23%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(180 58% 91%)",
          foreground: "hsl(180 100% 17%)",
        },
        destructive: {
          DEFAULT: "hsl(0 100% 37%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(204 15% 94%)",
          foreground: "hsl(207 6% 39%)",
        },
        accent: {
          DEFAULT: "hsl(179 48% 83%)",
          foreground: "hsl(180 100% 17%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(213 13% 14%)",
        },
        success: {
          100: "hsl(133 37% 93%)",
          700: "hsl(142 100% 17%)",
          DEFAULT: "hsl(143 66% 28%)"
        },
        'copilot-purple': {
          50: '#FFF1FD',
          200: '#FFC8E0',
          700: '#6E003E',
          DEFAULT: '#9F3767'
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
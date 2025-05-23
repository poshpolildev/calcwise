// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#3B82F6',   // A pleasant blue (Tailwind's blue-500)
        'brand-secondary': '#10B981', // A nice green (Tailwind's emerald-500)

        // Generic Dark Theme
        'theme-bg-dark': '#111827',      // Tailwind gray-900 (main background)
        'theme-panel-dark': '#1F2937', // Tailwind gray-800 (panels, cards)
        'theme-input-bg': '#374151',   // Tailwind gray-700 (input backgrounds)
        'theme-text-primary': '#F3F4F6',    // Tailwind gray-100 (main text, headings)
        'theme-text-secondary': '#9CA3AF', // Tailwind gray-400 (secondary/subtle text)
        'theme-border': '#374151',     // Tailwind gray-700 (borders)
        'theme-accent': '#3B82F6',      // Same as brand-primary for accents
      },
      fontFamily: {
        // Uses Tailwind's default sans-serif stack (Roboto will still be used if linked in index.html and not overridden here)
        // If you want to force a specific fallback, you can list them here:
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      // Remove AI Studio specific animations if they were added
      // animation: { ... },
      // keyframes: { ... }
    },
  },
  plugins: [],
}

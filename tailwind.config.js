/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Sora', 'sans-serif'],
                serif: ['Sora', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
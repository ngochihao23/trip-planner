/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    /** @type {import('tailwindcss').Config} */
    theme: {
        extend: {
            keyframes: {
                wave: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(20deg)' },
                    '20%, 40%, 60%, 80%': { transform: 'rotate(-10deg)' },
                },
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                }
            },
            animation: {
                wave: 'wave 2s ease-in-out infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
            }
        }
    },
    plugins: [],
};

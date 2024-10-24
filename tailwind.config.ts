import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}', // Ajout du préfixe src/
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'slide-up': {
                    '0%': {transform: 'translateY(10px)', opacity: '0'},
                    '100%': {transform: 'translateY(0)', opacity: '1'},
                },
                'slide-in': {
                    '0%': {transform: 'translateX(100%)', opacity: '0'},
                    '100%': {transform: 'translateX(0)', opacity: '1'},
                },
            },
            animation: {
                'slide-up': 'slide-up 0.3s ease-out',
                'slide-in': 'slide-in 0.3s ease-out',
            },
        },
    },
    plugins: [],
}

export default config

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./partials/**/*.hbs",
        "./templates/**/*.hbs",
        "./src/**/*.js",
        "./src/**/*.ts",
    ],
    theme: {
        container: {
            center: true,
        },
        colors: {
            'transparent': 'transparent',
            'white': '#ffffff',
            'black': '#000000',
            'red': '#ac4639',
        },

        fontFamily: {
            'lato': ['"Lato", Georgia, Arial, sans-serif']
        },
        extend: {},
    },
    plugins: [],
}
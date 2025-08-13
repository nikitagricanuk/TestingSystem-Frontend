/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            xs: "320px", // Супер-маленькие телефоны (iPhone SE 1, старые Android)
            sm: "360px", // Большинство Android (Samsung A, Xiaomi Redmi)
            md: "375px", // iPhone 6/7/8/X/12 mini
            lg: "414px", // iPhone Pro Max, крупные Android
            xl: "768px", // Планшеты
            "2xl": "1024px", // Десктопы
        },
    },
    plugins: [],
};

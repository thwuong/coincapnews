import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                typo: {
                    1: "rgb(88, 102, 126)",
                    2: "#58667e",
                    3: "#394048",
                    4: "#222531",
                    5: "rgb(33,33,33)",
                    6: "#555555",
                },
                primary: {
                    1: "rgb(56,97,251)",
                    2: "#2350ff",
                    3: "#EFF2F5",
                },
                up: "#16c784",
                down: "#ea3943",
                "gray-bg": "#777777",
                "gray-bg-2": "#777",
                secondary: "#F8FAFD",
            },
            fontSize: {
                12: "12px",
                13: "13px",
                32: "32px",
            },
            fontFamily: {
                inter: '"Inter", sans-serif',
            },
            spacing: {
                main: "1440px",
                "5xl": "1920px",
            },
            screens: {
                "5xl": "1920px",
            },
        },
    },
    plugins: [require("tailwindcss-animated")],
};
export default config;

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
                },
                primary: {
                    1: "rgb(56,97,251)",
                },
                up: "#16c784",
                down: "#ea3943",
                "gray-bg": "#777777",
            },
            fontSize: {
                12: "12px",
            },
        },
    },
    plugins: [],
};
export default config;

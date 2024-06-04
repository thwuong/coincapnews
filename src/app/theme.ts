import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
// Supports weights 100-900
import "@fontsource-variable/inter";
const overrides = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                fontFamily: '"Inter Variable", sans-serif',
            },
        }),
    },
    colors: {
        btn: {
            "50": "#f8fafd",
            "100": "#e7eef7",
            "200": "#c9daee",
            "300": "#99bbe0",
            "400": "#6398cd",
            "500": "#3f7bb8",
            "600": "#2e609b",
            "700": "#264d7e",
            "800": "#234369",
            "900": "#223958",
            "950": "#16253b",
        },

        brand: {
            "50": "#eff3ff",
            "100": "#dae4ff",
            "200": "#bdd0ff",
            "300": "#90b2ff",
            "400": "#5c8afe",
            "500": "#3861fb",
            "600": "#203ef0",
            "700": "#182bdd",
            "800": "#1a24b3",
            "900": "#1b268d",
            "950": "#151956",
        },
    },
});

const AppTheme = extendTheme(overrides);

export default AppTheme;

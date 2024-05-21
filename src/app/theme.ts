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
        btn: "rgba(0,0,0,0.04)",
    },
});

const AppTheme = extendTheme(overrides);

export default AppTheme;

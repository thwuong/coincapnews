import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
const overrides = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                fontFamily: '"Inter", sans-serif',
            },
        }),
    },
    colors: {
        btn: "rgba(0,0,0,0.04)",
    },
});

const AppTheme = extendTheme(overrides);

export default AppTheme;

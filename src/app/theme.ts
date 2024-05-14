import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";

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

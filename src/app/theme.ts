import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";

const overrides = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                fontFamily: '"Inter", sans-serif',
            },
        }),
    },
});

const AppTheme = extendTheme(overrides);

export default AppTheme;

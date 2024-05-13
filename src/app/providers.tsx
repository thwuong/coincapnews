"use client";

import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={AppTheme}>{children}</ChakraProvider>;
}

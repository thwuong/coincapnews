"use client";

import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./theme";
import { makeStore, AppStore } from "../lib/store";
import { Provider } from "react-redux";
import { useRef } from "react";
export function Providers({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }
    return (
        <Provider store={storeRef.current}>
            <ChakraProvider theme={AppTheme}>{children}</ChakraProvider>
        </Provider>
    );
}

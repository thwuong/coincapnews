"use client";

import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./theme";
import { makeStore, AppStore } from "../lib/store";
import { Provider } from "react-redux";
import { useRef } from "react";
import { setCurrentLang } from "@/lib/features/lang/langSlice";
export function Providers({ children, lang }: { children: React.ReactNode; lang: string }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        storeRef.current.dispatch(setCurrentLang(lang));
    }
    return (
        <Provider store={storeRef.current}>
            <ChakraProvider theme={AppTheme}>{children}</ChakraProvider>
        </Provider>
    );
}

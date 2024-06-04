"use client";

import { setCurrentLang } from "@/lib/features/global/globalSlice";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store";
import AppTheme from "./theme";
export function Providers({ children, lang }: { children: React.ReactNode; lang: string }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }
    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.dispatch(setCurrentLang(lang));
        }
    }, [lang]);
    return (
        <Provider store={storeRef.current}>
            <ChakraProvider theme={AppTheme}>{children}</ChakraProvider>
        </Provider>
    );
}

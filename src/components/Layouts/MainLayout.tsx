"use client";
import { Providers } from "@/app/providers";
import { createStandaloneToast } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
interface LayoutProps {
    params: {
        lang: string;
    };
    children: Readonly<React.ReactNode>;
}
function MainLayout({ children, params: { lang } }: LayoutProps) {
    const { ToastContainer } = createStandaloneToast();
    const pathName = usePathname();

    return (
        <Providers>
            {pathName !== `/${lang}/account` && <Header lang={lang} />}
            {children}
            {pathName !== `/${lang}/account` && <Footer />}
            <ToastContainer />
        </Providers>
    );
}

export default MainLayout;

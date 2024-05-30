"use client";
import { Providers } from "@/app/providers";
import { createStandaloneToast } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { SideBar } from "../SideBar";
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
        <Providers lang={lang}>
            {pathName !== `/${lang}/account` && <Header lang={lang} />}
            <section className="flex w-full justify-center bg-secondary lg:min-h-screen">
                <SideBar />
                <div className="w-main max-lg:w-full">{children}</div>
                <SideBar />
            </section>
            {pathName !== `/${lang}/account` && <Footer />}
            <ToastContainer />
        </Providers>
    );
}

export default MainLayout;

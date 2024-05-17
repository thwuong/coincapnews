"use client";
import { Providers } from "@/app/providers";
import { createStandaloneToast } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { ToastContainer } = createStandaloneToast();
    const pathName = usePathname();

    return (
        <Providers>
            {pathName !== "/account" && <Header />}
            {children}
            {pathName !== "/account" && <Footer />}
            <ToastContainer />
        </Providers>
    );
}

export default MainLayout;

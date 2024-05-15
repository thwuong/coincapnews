"use client";
import { Providers } from "@/app/providers";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";

function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname();

    return (
        <Providers>
            {pathName !== "/account" && <Header />}
            {children}
            {pathName !== "/account" && <Footer />}
        </Providers>
    );
}

export default MainLayout;

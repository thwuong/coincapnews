"use client";
import { Providers } from "@/app/providers";
import { createStandaloneToast } from "@chakra-ui/react";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { SideBar } from "../SideBar";
interface LayoutProps {
    children: Readonly<React.ReactNode>;
}

function MainLayout({ children }: LayoutProps) {
    const { ToastContainer } = createStandaloneToast();
    const pathName = usePathname();
    const imagesLeft = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets%2F871afa660560495da3a1d439d70ba5ce%2F38934f904c444628a8b836246ab3ca99",
            alt: "Description for image 1",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets%2F871afa660560495da3a1d439d70ba5ce%2F30cd3cbe3ea1488ca3912523582b946f",
            alt: "Description for image 2",
        },
    ];

    const imagesRight = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets%2F871afa660560495da3a1d439d70ba5ce%2Fcb09b901f5dd4316a7be92c1819fd6a1?width=500&height=500",
            alt: "Description for image 3",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets%2F871afa660560495da3a1d439d70ba5ce%2F1abca74d62034d8987a6d6636961c790?width=500&height=500",
            alt: "Description for image 4",
        },
    ];
    const search = useSearchParams();
    const lang = search.get("lang") || "en";
    return (
        <Providers lang={lang}>
            {pathName !== `/my-account` && <Header lang={lang} />}
            <section
                className={clsx(
                    "flex w-full justify-center bg-secondary",
                    pathName === `/news` && "max-w-[1440px] ml-auto mr-auto bg-transparent md:pl-12 md:pr-12"
                )}
            >
                {pathName !== `/my-account` && <SideBar images={imagesLeft} />}
                <div
                    className={clsx(
                        "w-full xl:min-h-[1220px]",
                        pathName === `/my-account` ? "w-full" : "max-w-[1440px]"
                    )}
                >
                    {children}
                </div>
                {pathName !== `/my-account` && <SideBar images={imagesRight} />}
            </section>
            {pathName !== `/my-account` && <Footer />}
            <ToastContainer />
        </Providers>
    );
}

export default MainLayout;

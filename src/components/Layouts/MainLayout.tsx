"use client";
import { Providers } from "@/app/providers";
import UseGetScrollY from "@/hooks/UseGetScrollY";
import { Button, createStandaloneToast } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
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
    const [scrollY] = UseGetScrollY();
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
            {process.env.NODE_ENV === "production" && <Analytics />}
            {scrollY && scrollY > 400 && (
                <div className="fixed bottom-4 right-4 z-[99999] duration-500">
                    <Button
                        p={"8px"}
                        bg={"brand.500"}
                        _hover={{
                            bg: "brand.600",
                        }}
                        className="group shadow"
                        borderRadius={"100%"}
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <img
                            src="/assets/icons/top.svg"
                            alt="scroll top"
                            width={24}
                            height={24}
                            className="group-hover:-translate-y-0.5 duration-200"
                        />
                    </Button>
                </div>
            )}
        </Providers>
    );
}

export default MainLayout;

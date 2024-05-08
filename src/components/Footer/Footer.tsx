"use client";
import { Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Container from "../Container/Container";
const navData: NavItemType[] = [
    {
        icon: "/assets/images/bnb.webp",
        label: "Crypto",
        href: "/",
        children: [
            {
                icon: "/assets/images/bnb.webp",
                label: "Coin ranking",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "Recently Added",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "NFT",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "BSC",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "DeFi",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "Polkadot Eco",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "Gainers And Losers",
                href: "/",
            },
        ],
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Exchanges",
        href: "/",
        children: [
            {
                icon: "/assets/images/bnb.webp",
                label: "Spot",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "Derivatives",
                href: "/",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "DEX",
                href: "/",
            },
        ],
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Knowledge",
        href: "/",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Converter",
        href: "/",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "News",
        href: "/",
    },
];
const navDataOfCompany: NavItemType[] = [
    {
        icon: "/assets/images/bnb.webp",
        label: "About",
        href: "/about",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Privacy",
        href: "/privacy",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Terms",
        href: "/terms",
    },
];
const navDataOfSupport: NavItemType[] = [
    {
        icon: "/assets/images/bnb.webp",
        label: "FAQ",
        href: "/",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Submit coin",
        href: "/",
    },
];
type NavItemType = {
    label?: string;
    href?: string;
    icon?: string;
    children?: NavItemType[];
};
function NavItem({ navItem }: { navItem: NavItemType }) {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <Box position={"relative"}>
            <div
                className="flex items-center gap-4 pb-2"
                onClick={() => {
                    setShowDropdown(!showDropdown);
                }}
            >
                <span className="text-base leading-[1.5] group font-bold text-white hover:text-typo-1 duration-300">
                    {navItem.label}
                </span>
                {navItem.children &&
                    navItem.children.length > 0 &&
                    (showDropdown ? (
                        <Image src={"/assets/icons/dash.svg"} alt="dash" width={20} height={20} />
                    ) : (
                        <Image src={"/assets/icons/plus.svg"} alt="plus" width={20} height={20} />
                    ))}
            </div>
            {navItem.children && navItem.children.length > 0 && (
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    height={showDropdown ? "auto" : 0}
                    visibility={showDropdown ? "visible" : "hidden"}
                    opacity={showDropdown ? 1 : 0}
                    pl={4}
                    py={showDropdown ? 2 : 0}
                    gap={"16px"}
                    className="border-l border-white duration-300"
                >
                    {navItem.children.map((item: NavItemType, index: number) => (
                        <Link href={item.href || "/"} key={item.label}>
                            <span className="text-base whitespace-nowrap leading-[1.5] font-bold text-white hover:text-typo-1 duration-300">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </Box>
            )}
        </Box>
    );
}

function Footer() {
    return (
        <footer className="w-full flex justify-center items-center bg-[#00043F] py-20">
            <Container className="px-12">
                <div className="grid grid-cols-5 gap-16 max-md:grid-cols-1">
                    <div className="flex flex-col gap-8 col-span-2 max-md:col-span-1">
                        <div className="flex flex-col gap-4">
                            <Image src={"/assets/images/logo-white.png"} alt="logo" width={225} height={40} />
                            <p className="text-white text-base leading-[1.5]">
                                Top cryptocurrency prices and charts, listed by market capitalization
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={"/"}>
                                <div className="p-2 rounded-full bg-gray-100/10 hover:bg-gray-100/30 duration-300">
                                    <Image src={"/assets/icons/fb.svg"} alt="fb" width={20} height={20} />
                                </div>
                            </Link>
                            <Link href={"/"}>
                                <div className="p-2 rounded-full bg-gray-100/10 hover:bg-gray-100/30 duration-300">
                                    <Image src={"/assets/icons/instagram.svg"} alt="insta" width={20} height={20} />
                                </div>
                            </Link>
                            <Link href={"/"}>
                                <div className="p-2 rounded-full bg-gray-100/10 hover:bg-gray-100/30 duration-300">
                                    <Image src={"/assets/icons/telegram.svg"} alt="tele" width={20} height={20} />
                                </div>
                            </Link>
                            <Link href={"/"}>
                                <div className="p-2 rounded-full bg-gray-100/10 hover:bg-gray-100/30 duration-300">
                                    <Image src={"/assets/icons/telegram.svg"} alt="tele" width={20} height={20} />
                                </div>
                            </Link>
                        </div>
                        <div className="flex gap-4">
                            <Link href={"/"}>
                                <Image src={"/assets/icons/ios-app.svg"} alt="fb" width={136} height={45} />
                            </Link>
                            <Link href={"/"}>
                                <Image src={"/assets/icons/google-app.svg"} alt="fb" width={136} height={45} />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="leading-[1.5] uppercase text-base font-semibold text-white">Coincapnews</h3>
                        <nav className="flex flex-col gap-4">
                            {navData.map((item, index) => {
                                return <NavItem key={index} navItem={item} />;
                            })}
                        </nav>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="leading-[1.5] uppercase text-base font-semibold text-white">Company</h3>
                        <nav className="flex flex-col gap-4">
                            {navDataOfCompany.map((item, index) => {
                                return <NavItem key={index} navItem={item} />;
                            })}
                        </nav>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="leading-[1.5] uppercase text-base font-semibold text-white">SUPPORT</h3>
                        <nav className="flex flex-col gap-4">
                            {navDataOfSupport.map((item, index) => {
                                return <NavItem key={index} navItem={item} />;
                            })}
                        </nav>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;

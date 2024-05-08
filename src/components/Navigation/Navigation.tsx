import { Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
type NavItemType = {
    label?: string;
    href?: string;
    icon?: string;
    children?: NavItemType[];
};
function NavItem({ navItem }: { navItem: NavItemType }) {
    return (
        <Box position={"relative"}>
            <Button
                as={Link}
                href={navItem.href}
                className="group "
                bg={"transparent"}
                _hover={{
                    bg: "transparent",
                }}
                height={"fit-content"}
                width={"fit-content"}
                alignItems={"center"}
                p={"0"}
                rightIcon={
                    navItem.children && navItem.children.length > 0 ? (
                        <Image src={"/assets/icons/dropdown.svg"} alt="dropdown" width={20} height={20} />
                    ) : undefined
                }
            >
                <span className="text-sm leading-4 group font-bold group-hover:text-primary-1 duration-300">
                    {navItem.label}
                </span>
                {navItem.children && navItem.children.length > 0 && (
                    <Box
                        position={"absolute"}
                        top={"calc(100% + 8px)"}
                        bg={"white"}
                        flexDirection={"column"}
                        borderRadius={6}
                        padding={4}
                        className="shadow-xl z-[2] hidden group-hover:flex after:border-x-8 after:border-b-8 after:border-x-transparent before:w-full before:h-2 before:top-[-8px] before:absolute before:left-0 before:bg-transparent after:left-1/2 after:-translate-x-1/2 after:border-b-white after:drop-shadow-xl after:absolute after:top-0 after:-translate-y-full"
                    >
                        {navItem.children.map((item: NavItemType, index: number) => (
                            <Button
                                key={item.label}
                                as={Link}
                                href={navItem.href}
                                className="group/child"
                                bg={"transparent"}
                                _hover={{
                                    bg: "gray.100",
                                }}
                                borderRadius={6}
                                alignItems={"center"}
                                justifyContent={"start"}
                                width={200}
                                gap={0.5}
                                p={2}
                                height={"fit-content"}
                                leftIcon={
                                    <Image src={"/assets/images/bnb.webp"} alt="dropdown" width={24} height={24} />
                                }
                            >
                                <span className="text-sm leading-4 font-bold group-hover/child:text-primary-1 duration-300">
                                    {item.label}
                                </span>
                            </Button>
                        ))}
                    </Box>
                )}
            </Button>
        </Box>
    );
}
function Navigation() {
    return (
        <nav className="flex items-center gap-6">
            {navData.map((item, index) => {
                return <NavItem key={index} navItem={item} />;
            })}
        </nav>
    );
}

export default Navigation;

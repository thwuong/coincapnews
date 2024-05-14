"use client";
import { Box, Button } from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const navigationHeaderData: NavItemType[] = [
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
        href: "/spot",
        children: [
            {
                icon: "/assets/images/bnb.webp",
                label: "Spot",
                href: "/spot",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "Derivatives",
                href: "/derivatives",
            },
            {
                icon: "/assets/images/bnb.webp",
                label: "DEX",
                href: "/dex",
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
        href: "/news",
    },
];
type NavItemType = {
    label?: string;
    href?: string;
    icon?: string;
    children?: NavItemType[];
};
function NavItem({ navItem }: { navItem: NavItemType }) {
    const pathName = usePathname();
    let activePathCurrent = false;
    if (navItem.children && navItem.children?.length > 0) {
        activePathCurrent = navItem.children.some((child) => child.href == pathName);
    } else {
        activePathCurrent = navItem.href == pathName;
    }
    return (
        <Box position={"relative"} className="group">
            <Button
                as={Link}
                href={navItem.href}
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
                <span
                    className={clsx(
                        "text-sm leading-4 group font-bold group-hover:text-primary-1 duration-300",
                        activePathCurrent && "text-primary-1"
                    )}
                >
                    {navItem.label}
                </span>
            </Button>
            {navItem.children && navItem.children.length > 0 && (
                <Box
                    position={"absolute"}
                    top={"calc(100% + 8px)"}
                    bg={"white"}
                    flexDirection={"column"}
                    borderRadius={6}
                    padding={4}
                    className="shadow-xl z-[2] hidden group-hover:flex after:border-x-8 after:border-b-8 after:border-x-transparent before:w-full before:h-2 before:top-[-8px] before:absolute before:left-0 before:bg-transparent after:left-4  after:border-b-white after:z-[3] after:absolute after:top-0 after:-translate-y-full"
                >
                    {navItem.children.map((item: NavItemType, index: number) => (
                        <Button
                            key={item.label}
                            as={Link}
                            href={item.href}
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
                            leftIcon={<Image src={"/assets/images/bnb.webp"} alt="dropdown" width={24} height={24} />}
                        >
                            <span className="text-sm leading-4 font-bold group-hover/child:text-primary-1 duration-300">
                                {item.label}
                            </span>
                        </Button>
                    ))}
                </Box>
            )}
        </Box>
    );
}
function Navigation() {
    return (
        <nav className="flex items-center gap-6 max-lg:hidden">
            {navigationHeaderData.map((item, index) => {
                return <NavItem key={index} navItem={item} />;
            })}
        </nav>
    );
}

export default Navigation;

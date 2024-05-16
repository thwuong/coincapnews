import { NavItemType } from "@/app/types";

export const currenciesData = [
    {
        label: "Bitcoin",
        code: "BTC",
        type: "Cryptocurrencies",
    },
    {
        label: "Ethereum",
        code: "ETH",
        type: "Cryptocurrencies",
    },
    {
        label: "Chinese Yuan",
        code: "CNY",
        type: "Fiat Currencies",
    },
    {
        label: "United States Dollar",
        code: "USD",
        type: "Fiat Currencies",
    },
];
export const navigationHeaderData: NavItemType[] = [
    {
        icon: "/assets/images/bnb.webp",
        label: "Crypto",
        href: "/",
        children: [
            {
                icon: "/assets/icons/ranking.svg",
                label: "Coin ranking",
                href: "/",
            },
            {
                icon: "/assets/icons/new.svg",
                label: "Recently Added",
                href: "/",
            },
            {
                icon: "/assets/icons/nft.svg",
                label: "NFT",
                href: "/",
            },
            {
                icon: "/assets/icons/bsc.svg",
                label: "BSC",
                href: "/",
            },
            {
                icon: "/assets/icons/defi.svg",
                label: "DeFi",
                href: "/",
            },
            {
                icon: "/assets/icons/polka.svg",
                label: "Polkadot Eco",
                href: "/",
            },
            {
                icon: "/assets/icons/change.svg",
                label: "Gainers And Losers",
                href: "/",
            },
        ],
    },
    {
        icon: "/assets/icons/bnb.webp",
        label: "Exchanges",
        href: "/spot",
        children: [
            {
                icon: "/assets/icons/spot.svg",
                label: "Spot",
                href: "/spot",
            },
            {
                icon: "/assets/icons/deri.svg",
                label: "Derivatives",
                href: "/derivatives",
            },
            {
                icon: "/assets/icons/dex.svg",
                label: "DEX",
                href: "/dex",
            },
        ],
    },
    {
        icon: "/assets/icons/bnb.webp",
        label: "Knowledge",
        href: "/knowledge",
    },
    {
        icon: "/assets/icons/bnb.webp",
        label: "Converter",
        href: "/converter",
    },
    {
        icon: "/assets/icons/bnb.webp",
        label: "News",
        href: "/news",
    },
];

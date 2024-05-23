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
        icon: "/assets/icons/coin.svg",
        label: "Crypto",
        key: "crypto",
        href: "/",
        children: [
            {
                icon: "/assets/icons/new.svg",
                label: "Recently Added",
                key: "recently_added",
                href: "/recently-added",
            },
            {
                icon: "/assets/icons/nft.svg",
                label: "NFT",
                key: "nft",
                href: "/nft",
            },
            {
                icon: "/assets/icons/bsc.svg",
                label: "BSC",
                key: "bsc",
                href: "/bsc",
            },
            {
                icon: "/assets/icons/defi.svg",
                label: "DeFi",
                key: "defi",
                href: "/defi",
            },
            {
                icon: "/assets/icons/polka.svg",
                label: "Polkadot Eco",
                key: "polkadot_eco",
                href: "/polkadot-eco",
            },
            {
                icon: "/assets/icons/change.svg",
                label: "Gainers And Losers",
                key: "gainers_and_losers",
                href: "/gainers-and-losers",
            },
        ],
    },
    {
        icon: "/assets/icons/exchange.svg",
        label: "Exchanges",
        key: "exchanges",
        href: "/spot",
        children: [
            {
                icon: "/assets/icons/spot.svg",
                label: "Spot",
                key: "spot",
                href: "/spot",
            },
            {
                icon: "/assets/icons/deri.svg",
                label: "Derivatives",
                key: "derivatives",
                href: "/derivatives",
            },
            {
                icon: "/assets/icons/dex.svg",
                label: "DEX",
                key: "dex",
                href: "/dex",
            },
        ],
    },
    {
        icon: "/assets/icons/news.svg",
        label: "Knowledge",
        key: "knowledge",
        href: "/knowledge",
    },
    {
        icon: "/assets/icons/convert.svg",
        label: "Converter",
        key: "converter",
        href: "/converter",
    },
    {
        icon: "/assets/icons/newspaper.svg",
        label: "News",
        key: "news",
        href: "/news",
    },
];
export const navDataOfCompany: NavItemType[] = [
    {
        icon: "/assets/images/bnb.webp",
        label: "About",
        href: "/about",
        key: "about",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Privacy",
        href: "/privacy-and-cookie-policy",
        key: "privacy",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Terms",
        href: "/terms-of-use",
        key: "terms",
    },
];
export const navDataOfSupport: NavItemType[] = [
    {
        icon: "/assets/images/bnb.webp",
        label: "FAQ",
        href: "/faq-frequently-asked-questions",
        key: "faq",
    },
    {
        icon: "/assets/images/bnb.webp",
        label: "Submit coin",
        href: "/submit-coin",
        key: "submit_coin",
    },
];

import MainLayout from "@/components/Layouts/MainLayout";
import { pageList } from "@/fakedata/fakedata";
import { dir } from "i18next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { WEBSITE_HOST_URL } from "./contants";
import "./globals.css";
import { cookieName } from "./i18n/settings";
const meta = {
    title: "Coincapnews | Cryptocurrency Prices, Charts And Market Capitalizations",
    description:
        "Top cryptocurrency prices and charts, listed by market capitalization. Free access to current and historic data for Bitcoin and thousands of altcoins.",
    image: `${WEBSITE_HOST_URL}/assets/images/logo.png`,
};

export const metadata: Metadata = {
    title: {
        template: "%s",
        default: meta.title,
    },
    description: meta.description,
    openGraph: {
        title: meta.title,
        description: meta.description,
        url: WEBSITE_HOST_URL,
        locale: "en-US",
        siteName: meta.title,
        type: "website",
        images: [
            {
                url: meta.image,
            },
        ],
    },
    twitter: {
        title: meta.title,
        description: meta.description,
        images: meta.image,
        card: "summary_large_image",
    },
    alternates: {
        canonical: WEBSITE_HOST_URL,
    },
    icons: {
        icon: [
            { url: "/favicon/favicon.ico" },
            new URL("/favicon/favicon.ico", WEBSITE_HOST_URL),
            { url: "/favicon/favicon.ico", media: "(prefers-color-scheme: dark)" },
        ],
        shortcut: ["/favicon/apple-touch-icon.png"],
        apple: [
            { url: "/favicon/apple-touch-icon.png" },
            { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        other: [
            {
                rel: "apple-touch-icon-precomposed",
                url: "/favicon/apple-touch-icon.png",
            },
        ],
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};
interface LayoutProps {
    children: Readonly<React.ReactNode>;
}
export async function generateStaticParams() {
    return pageList.map((item) => `/${item}`);
}
export default function RootLayout({ children }: LayoutProps) {
    const cookieStore = cookies();
    const lang = cookieStore.get(cookieName)?.value || "en";

    return (
        <html lang={lang} dir={dir(lang)} className="scroll-smooth">
            <body>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
}

import { WEBSITE_HOST_URL } from "./contants";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
const Header = dynamic(() => import("@/components/Header/Header"), {
    ssr: false,
});

const meta = {
    title: "Coincapnews | Cryptocurrency Prices, Charts And Market Capitalizations",
    description:
        "Top cryptocurrency prices and charts, listed by market capitalization. Free access to current and historic data for Bitcoin and thousands of altcoins.",
    image: `${WEBSITE_HOST_URL}/images/logo.png`,
};
export const metadata: Metadata = {
    title: {
        template: "%s - Title",
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
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="scroll-smooth">
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

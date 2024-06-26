import { WEBSITE_HOST_URL } from "@/app/contants";
import { useTranslation } from "@/app/i18n";
import { CommonSection } from "@/components/CommonSection";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { cookieName } from "../i18n/settings";
interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const cookieStore = cookies();
    const lang = cookieStore.get(cookieName)?.value || "en";
    const content = {
        meta: {
            title: "NFT | Coincapnews",
            description: "",
        },
    };
    // optionally access and extend (rather than replace) parent metadata
    const { title, description, openGraph } = await parent;
    return {
        title: content.meta?.title || title,
        description: content.meta?.description || description,
        openGraph: {
            images: [...(openGraph?.images || [])],
            title: content.meta?.title || title || "",
            description: content.meta?.description || description || "",
            url: `${WEBSITE_HOST_URL}/nft?lang=${lang}`,
            locale: "en-US",
            siteName: content.meta?.title,
            type: "website",
        },
        alternates: {
            canonical: `${WEBSITE_HOST_URL}/nft?lang=${lang}`,
        },
        twitter: {
            title: content.meta?.title,
            description: content.meta?.description,
            images: [...(openGraph?.images || [])],
            card: "summary_large_image",
        },
    };
}
async function Page(props: PageProps) {
    const { t } = await useTranslation(props.params.lang);

    return (
        <main className="pb-24">
            <Container className="px-12">
                <Heading className="pt-8 pb-12 max-lg:py-8" title={t("title.nft")} />
                <CommonSection category="NFT" />
            </Container>
        </main>
    );
}

export default Page;

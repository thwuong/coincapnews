import { WEBSITE_HOST_URL } from "@/app/contants";
import { useTranslation } from "@/app/i18n";
import { Container } from "@/components/Container";
import { DifferentExchanges } from "@/components/DifferentExchanges";
import { Heading } from "@/components/Heading";
import { Metadata, ResolvingMetadata } from "next";
interface PageProps {
    params: {
        lang: string;
    };
}
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const lang = params.lang;
    const content = {
        meta: {
            title: "DEX | Coincapnews",
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
            url: `${WEBSITE_HOST_URL}/${lang}/dex`,
            locale: "en-US",
            siteName: content.meta?.title,
            type: "website",
        },
        alternates: {
            canonical: `${WEBSITE_HOST_URL}/${lang}/dex`,
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
                <Heading className="pt-8 pb-12 max-lg:py-8" title={t("title.dex")} />
                <DifferentExchanges url="/api/exchanges" centralized={false} />
            </Container>
        </main>
    );
}

export default Page;

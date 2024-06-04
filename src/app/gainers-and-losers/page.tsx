import { WEBSITE_HOST_URL } from "@/app/contants";
import { Container } from "@/components/Container";
import { GainersAndLosers } from "@/components/GainersAndLosers";
import { Metadata, ResolvingMetadata } from "next";
interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const lang = params.lang;
    const content = {
        meta: {
            title: "Gainers And Losers | Coincapnews",
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
            url: `${WEBSITE_HOST_URL}/${lang}/gainers-and-losers`,
            locale: "en-US",
            siteName: content.meta?.title,
            type: "website",
        },
        alternates: {
            canonical: `${WEBSITE_HOST_URL}/${lang}/gainers-and-losers`,
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
    return (
        <main className="pb-24">
            <Container className="px-12">
                <GainersAndLosers />
            </Container>
        </main>
    );
}

export default Page;

import { builder } from "@builder.io/sdk";
import { Metadata } from "next";
import { RenderBuilderContent } from "../../../components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
    params: {
        page: string[];
        lang: string;
    };
}
export function generateStaticParams() {
    return [
        "",
        "converter",
        "news",
        "derivatives",
        "spot",
        "dex",
        "submit-coin",
        "terms-of-use",
        "nft",
        "bsc",
        "defi",
        "recently-added",
        "polkadot",
        "gainers-and-losers",
    ];
}
export async function generateMetadata(props: PageProps): Promise<Metadata> {
    // fetch data
    const builderModelName = "page";

    const content = await builder
        // Get the page content from Builder with the specified options
        .get(builderModelName, {
            userAttributes: {
                // Use the page path specified in the URL to fetch the content
                urlPath: "/" + (props?.params?.page?.join("/") || ""),
            },
        })
        // Convert the result to a promise
        .toPromise();
    return {
        title: content?.data?.title,
        description: content?.data?.description,
    };
}

export default async function Page(props: PageProps) {
    const builderModelName = "page";

    const content = await builder
        // Get the page content from Builder with the specified options
        .get(builderModelName, {
            userAttributes: {
                // Use the page path specified in the URL to fetch the content
                urlPath: "/" + (props?.params?.page?.join("/") || ""),
            },
        })
        // Convert the result to a promise
        .toPromise();

    return (
        <>
            {/* Render the Builder page */}
            <RenderBuilderContent content={content} model={builderModelName} />
        </>
    );
}

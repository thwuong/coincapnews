import { MetadataRoute } from "next";
// import { getAllArticles } from "@/lib/articles";
import { WEBSITE_HOST_URL } from "./contants";

type changeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let articles = [
        {
            id: "abc",
        },
    ];
    const changeFrequency = "daily" as changeFrequency;

    const posts = articles.map(({ id }: { id: string }) => ({
        url: `${WEBSITE_HOST_URL}/posts/${id}`,
        lastModified: new Date(),
        changeFrequency,
    }));

    const routes = ["", "/about", "/posts"].map((route) => ({
        url: `${WEBSITE_HOST_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency,
    }));

    return [...routes, ...posts];
}

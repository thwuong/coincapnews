import { MetadataRoute } from "next";
import { NEWS_HOST_URL, WEBSITE_HOST_URL } from "./contants";
import { FeedType } from "./types";
type PageBuilder = {
    data: {
        url: string;
    };
};
type changeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
const url = `https://cdn.builder.io/api/v3/content/page?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}`;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const responseNews = await fetch(`${NEWS_HOST_URL}`, {
        headers: {
            Authorization: "Basic ZmxtOlhpelB5RHFQYTk1eUdkVUwoeXUhdzlqVQ==",
        },
    });
    const responsePages = await fetch(url);
    const fetchArticles = await responseNews.json();
    const fetchPages = await responsePages.json();

    const [articles, pages] = await Promise.all([fetchArticles, fetchPages]);
    const changeFrequency = "daily" as changeFrequency;

    const posts = articles.map(({ post_title }: FeedType) => ({
        url: `${WEBSITE_HOST_URL}/news/${post_title}`,
        lastModified: new Date(),
        changeFrequency,
    }));

    const routes = pages.results.map((page: PageBuilder) => ({
        url: `${WEBSITE_HOST_URL}${page.data.url}`,
        lastModified: new Date().toISOString(),
        changeFrequency,
    }));

    return [...posts, ...routes];
}

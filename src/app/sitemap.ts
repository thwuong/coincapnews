import { pageList } from "@/fakedata/fakedata";
import { MetadataRoute } from "next";
import { NEWS_HOST_URL, WEBSITE_HOST_URL } from "./contants";
import { FeedType } from "./types";

type changeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const responseNews = await fetch(`${NEWS_HOST_URL}`, {
        headers: {
            Authorization: "Basic ZmxtOlhpelB5RHFQYTk1eUdkVUwoeXUhdzlqVQ==",
        },
    });
    const fetchArticles = await responseNews.json();

    const [articles] = await Promise.all([fetchArticles]);
    const changeFrequency = "daily" as changeFrequency;

    const posts = articles.map(({ post_title }: FeedType) => ({
        url: `${WEBSITE_HOST_URL}/news/${post_title}`,
        lastModified: new Date(),
        changeFrequency,
    }));

    const routes = pageList.map((page: string) => ({
        url: `${WEBSITE_HOST_URL}/${page}`,
        lastModified: new Date().toISOString(),
        changeFrequency,
    }));

    return [...posts, ...routes];
}

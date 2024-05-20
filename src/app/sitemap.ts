import { MetadataRoute } from "next";
import { NEWS_HOST_URL, WEBSITE_HOST_URL } from "./contants";
import { FeedType } from "./types";

type changeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await fetch(`${NEWS_HOST_URL}`, {
        headers: {
            Authorization: "Basic ZmxtOlhpelB5RHFQYTk1eUdkVUwoeXUhdzlqVQ==",
        },
    });
    const articles = await response.json();
    const changeFrequency = "daily" as changeFrequency;

    const posts = articles.map(({ post_title }: FeedType) => ({
        url: `${WEBSITE_HOST_URL}news/${post_title}`,
        lastModified: new Date(),
        changeFrequency,
    }));

    const routes = ["", "about", "news"].map((route) => ({
        url: `${WEBSITE_HOST_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency,
    }));

    return [...routes, ...posts];
}

import { MetadataRoute } from "next";
import { WEBSITE_HOST_URL } from "./contants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
        },
        sitemap: `${WEBSITE_HOST_URL}sitemap.xml`,
    };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.coingecko.com",
            },
            {
                protocol: "https",
                hostname: "mtc-media.tn-cdn.net",
            },
        ],
    },
};

export default nextConfig;

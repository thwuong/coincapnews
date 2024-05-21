import dynamic from "next/dynamic";

interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}
const Auth = dynamic(() => import("@/components/Auth").then((mod) => mod.Auth));
export default function Page({ params }: PageProps) {
    return <Auth />;
}

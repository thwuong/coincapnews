import dynamic from "next/dynamic";

const Auth = dynamic(() => import("@/components/Auth").then((mod) => mod.Auth));
export default function Page({ params }: { params: { id: string } }) {
    return <Auth />;
}

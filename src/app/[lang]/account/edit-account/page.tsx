import { EditAccount } from "@/components/Auth";

interface PageProps {
    params: {
        lang: string;
    };
}
export default function Page({ params }: PageProps) {
    return <EditAccount />;
}

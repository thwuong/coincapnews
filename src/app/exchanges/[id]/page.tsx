import fetchAPI from "@/api/fetchAPI";
import { DetailExchangeType } from "@/app/types";
import { ExchangesContent } from "@/components/ExchangesContent";
interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}
export const dynamic = "force-dynamic";
export async function generateStaticParams() {
    const data = await fetchAPI("/api/exchanges");
    return data.map((coin: DetailExchangeType) => ({
        symbol: coin.symbol,
        description: coin.description,
        name: coin.name,
    }));
}
export default function Page({ params }: PageProps) {
    return <ExchangesContent params={{ id: params.id }} />;
}

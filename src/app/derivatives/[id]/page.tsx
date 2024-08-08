import fetchAPI from "@/api/fetchAPI";
import { DetailExchangeType } from "@/app/types";
import { DerivativeContent } from "@/components/DerivativeContent";
interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}
export const dynamic = "force-dynamic";
export async function generateStaticParams() {
    const data = await fetchAPI("/exchanges?exclude=tickers,chart");
    return (
        data?.map((coin: DetailExchangeType) => ({
            symbol: coin?.symbol,
            description: coin?.description,
            name: coin?.name,
        })) || []
    );
}
export default function Page({ params }: PageProps) {
    return (
        <DerivativeContent
            params={{ id: params.id, url: `/v1/derivatives/details/${params.id}` }}
        />
    );
}

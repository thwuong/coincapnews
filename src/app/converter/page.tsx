import { WEBSITE_HOST_URL } from "@/app/contants";
import { useTranslation } from "@/app/i18n";
import { Container } from "@/components/Container";
import { ConvertAmount } from "@/components/ConvertAmount";
import { Heading } from "@/components/Heading";
import { Metadata, ResolvingMetadata } from "next";
interface PageProps {
    params: {
        lang: string;
    };
}
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const lang = params.lang;
    const content = {
        meta: {
            title: "Converter | Coincapnews",
            description: "",
        },
    };
    // optionally access and extend (rather than replace) parent metadata
    const { title, description, openGraph } = await parent;
    return {
        title: content.meta?.title || title,
        description: content.meta?.description || description,
        openGraph: {
            images: [...(openGraph?.images || [])],
            title: content.meta?.title || title || "",
            description: content.meta?.description || description || "",
            url: `${WEBSITE_HOST_URL}/${lang}/converter`,
            locale: "en-US",
            siteName: content.meta?.title,
            type: "website",
        },
        alternates: {
            canonical: `${WEBSITE_HOST_URL}/${lang}/converter`,
        },
        twitter: {
            title: content.meta?.title,
            description: content.meta?.description,
            images: [...(openGraph?.images || [])],
            card: "summary_large_image",
        },
    };
}
async function Page(props: PageProps) {
    const { t } = await useTranslation(props.params.lang);

    return (
        <main className="pb-24 ">
            <Container className="px-12">
                <Heading className="pt-8 pb-12 max-lg:py-8 text-center " title={t("title.converter")} />
                <div className="w-[600px] max-lg:w-full py-8">
                    <ConvertAmount />
                </div>
                <section className="w-full flex flex-col gap-4 ">
                    <div>
                        <h3 className="text-xl font-semibold">Latest BTC to USD Rates</h3>
                        <p className="text-base text-gray-bg leading-8">
                            It's a match made in heaven: the world's biggest cryptocurrency and the world's largest fiat
                            currency. BTC/USD is a major trading pair — and right here, you'll find up-to-the-minute
                            information on the latest conversion rates.
                            <br /> Ever since Bitcoin launched in 2009, its value has often been conveyed in U.S.
                            dollars. Comparing prices across exchanges helps guarantee you'll get the best deal, as some
                            platforms offer a better deal than others.
                            <br /> Cryptocurrency adoption in the U.S. continues to rise — and in 2019, the number of
                            people who owned digital assets doubled. With a population of 328.2 million, America is a
                            massive and largely untapped market.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">BTC vs USD Now</h3>
                        <p className="text-base text-gray-bg leading-8">
                            There's a constant buzz about how Bitcoin is performing against the U.S. dollar. Traders
                            anxiously watch the pair's every move — and fluctuations regularly hit the headlines.
                            CoinMarketCap is the place people go to to find accurate BTC/USD rates, and we're here 24/7.
                            <br />
                            Over the years, we've gained a reputation for continually monitoring thousands of markets.
                            News websites and exchanges don't always have the latest conversions, but our easy-to-use
                            tool is automatically updated on a regular basis.
                            <br /> Click here to read more about BTC
                            <br /> Don't forget that we have plenty of other metrics that can show you whether the BTC
                            market is in a healthy state. You can easily assess the market cap of the world's biggest
                            cryptocurrency — and at the top of every page we deliver an insight into Bitcoin's
                            dominance.
                            <br /> This tool is fully customizable, meaning that you can type in any dollar amount and
                            get an immediate conversion into BTC, and vice versa. Using the dropdown menu, you can also
                            explore rates for other crypto and fiat pairings.
                            <br /> Learn about crypto with our beginners' guide
                            <br /> Bitcoin is renowned for its volatility — and in the past, it's gained and lost
                            hundreds of dollars in a matter of minutes. Thanks to our straightforward tool, you'll never
                            be out of the loop.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Do You Need To Convert BTC to USD Today?</h3>
                        <p className="text-base text-gray-bg leading-8">
                            Are you hoping to sell some crypto today — or are you interested in buying some Bitcoin for
                            the first time?
                            <br />
                            <a href="" target="_blank">
                                Cryptocurrencies
                            </a>
                            (rather unfairly) have gained a reputation for being complicated, but the industry has made
                            great progress in demystifying digital assets once and for all. Many exchanges offer clean
                            user interfaces that can be compared to those used by top e-commerce websites and banks.
                            <br /> But if you want a
                            <a href="" target="_blank">
                                comprehensive guide on how to buy Bitcoin
                            </a>
                            , and a full explanation of how conversions work, CoinMarketCap is here to save the day.
                            <br />
                            Click the button above to learn more about how to convert BTC to USD now.
                        </p>
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default Page;

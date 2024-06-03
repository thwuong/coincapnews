"use client";
import { getPayloadContent } from "@/api/getPayloadContent";
import { useAppSelector } from "@/lib/hooks";
import useSWR from "swr";
import { Heading } from "../Heading";
import serialize from "./serialize";
type MarkdownType = {
    url: string;
};

function Markdown({ url }: MarkdownType) {
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
    const { data } = useSWR(url, (url) => getPayloadContent(url, currentLanguage));
    if (!data) return "";
    return (
        <section className="font-inter">
            <Heading className="py-8 max-lg:py-6 text-center" title={data?.title} />
            {serialize(data?.hero?.richText)}
        </section>
    );
}

export default Markdown;

"use client";
import { useAppSelector } from "@/lib/hooks";
import useSWR from "swr";
import { Heading } from "../Heading";
import serialize from "./serialize";
type MarkdownType = {
    url: string;
};
const getContent = async (url: string, currentLanguage: string) => {
    const res = await fetch(`${url}?locale=${currentLanguage}`);
    return await res.json();
};

function Markdown({ url }: MarkdownType) {
    const currentLanguage = useAppSelector((state) => state.langStore.currentLanguage);
    const { data } = useSWR(url, (url) => getContent(url, currentLanguage));
    if (!data) return "";
    return (
        <section className="font-inter">
            <Heading className="py-8 max-lg:py-6 text-center" title={data?.title} />
            {serialize(data?.hero?.richText)}
        </section>
    );
}

export default Markdown;

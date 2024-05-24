"use client";
import { useAppSelector } from "@/lib/hooks";
import React from "react";
import useSWR from "swr";
type MarkdownType = {
    url: string;
};
const getContent = async (url: string, currentLanguage: string) => {
    const res = await fetch(`${url}&lang=${currentLanguage}`);
    return await res.json();
};
function Markdown({ url }: MarkdownType) {
    const currentLanguage = useAppSelector((state) => state.langStore.currentLanguage);
    const { data } = useSWR(url, (url) => getContent(url, currentLanguage));

    return <section></section>;
}

export default Markdown;

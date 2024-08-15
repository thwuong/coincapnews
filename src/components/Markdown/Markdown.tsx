"use client";
import { getPayloadContent } from "@/api/getPayloadContent";
import { useAppSelector } from "@/lib/hooks";
import useSWR from "swr";
import { Heading } from "../Heading";
import serialize from "./serialize";
import { PageType } from "@/app/types";
import { SpinnerLoading } from "../Loading";
type MarkdownType = {
  url: string;
};

function Markdown({ url }: MarkdownType) {
  const currentLanguage = useAppSelector(
    (state) => state.globalStore.currentLanguage
  );
  const { data, isLoading }: { data: PageType; isLoading: boolean } = useSWR(
    url,
    (url) => getPayloadContent(url, currentLanguage)
  );
  if (isLoading) return <SpinnerLoading />;
  if (!data) return "";
  return (
    <section className="font-inter">
      {data?.docs?.length > 0 &&
        data.docs[0].contentBlocks.map((block) => {
          if (block.blockType === "heroSection") {
            return (
              <Heading
                className="py-8 max-lg:py-6 text-center"
                title={block.title}
                key={block.id}
              />
            );
          }
          if (block.blockType === "textImageSection") {
            return serialize(block.text || []);
          }
          return null;
        })}
    </section>
  );
}

export default Markdown;

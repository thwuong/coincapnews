"use client";
import useNewsAPI from "@/api/useNewAPI";
import { useTranslation } from "@/app/i18n/client";
import { FeedType } from "@/app/types";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, Button } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NewsFeedItem(props: FeedType) {
    const { id, post_title, post_thumbnail, post_excerpt, post_date, author, post_permalink } = props;
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
    const pathName = usePathname();

    return (
        <li className="pb-8 border-b ">
            {pathName !== `/${currentLanguage}/news` ? (
                <Link href={`${post_permalink}`} rel="nofollow" className="flex gap-8 max-md:flex-col" target="_blank">
                    <img
                        src={post_thumbnail}
                        alt="feed"
                        width={327}
                        height={200}
                        loading="lazy"
                        className="rounded-lg max-md:w-full"
                    />
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold text-typo-4 hover:text-primary-1">{post_title}</h3>
                            <p className="line-clamp-3 text-sm text-typo-1 leading-8 ">{post_excerpt}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar src={author.avatar} size={"sm"} />
                            <div className="flex items-center gap-1">
                                <h6 className="text-base leading-[26px] font-semibold text-typo-4">{author.name}</h6>
                                <span>&#183;</span>
                                <span className="text-13 leading-[26px] text-typo-2 font-medium">{post_date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <Link
                    href={`${post_permalink}`}
                    rel="nofollow"
                    className="flex flex-col gap-4 max-md:flex-col"
                    target="_blank"
                >
                    <div className="flex items-center gap-4">
                        <Avatar src={author.avatar} size={"sm"} />
                        <div className="flex items-center gap-1">
                            <h6 className="text-base leading-[26px] font-semibold text-typo-4">{author.name}</h6>
                            <span>&#183;</span>
                            <span className="text-13 leading-[26px] text-typo-2 font-medium">{post_date}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold text-typo-4 hover:text-primary-1">{post_title}</h3>
                            <p className="line-clamp-3 text-sm text-typo-1 leading-8 ">{post_excerpt}</p>
                        </div>
                    </div>
                    <img
                        src={post_thumbnail}
                        alt="feed"
                        width={327}
                        height={200}
                        loading="lazy"
                        className="rounded-lg w-full"
                    />
                </Link>
            )}
        </li>
    );
}
function NewsFeed() {
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
    const [limit, setLimit] = useState(Number(process.env.NEXT_PUBLIC_NEWS_PER_PAGE));
    const { data, isLoading }: { data: FeedType[]; error: any; isLoading: boolean } = useNewsAPI(`?limit=${limit}`);
    const { t } = useTranslation(currentLanguage);
    return (
        <div className="flex flex-col gap-6 w-full">
            <h1 className="text-2xl font-bold text-typo-4">{t("newsfeed")}</h1>
            <ul className="flex flex-col gap-8 w-full">
                {!isLoading &&
                    data.map((item: FeedType, index: number) => {
                        return <NewsFeedItem key={item.id} {...item} />;
                    })}
            </ul>
            <Button
                isLoading={isLoading}
                onClick={() => setLimit((limit) => limit + 8)}
                className="mx-auto"
                w={"min-content"}
                bg={"transparent"}
                _hover={{
                    bg: "transparent",
                }}
            >
                <span className="text-lg font-bold text-typo-4 hover:text-primary-1 duration-300">
                    {t("load_more")}
                </span>
            </Button>
        </div>
    );
}

export default NewsFeed;

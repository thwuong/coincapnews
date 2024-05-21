"use client";
import useNewsAPI from "@/api/useNewAPI";
import { FeedType } from "@/app/types";
import { Avatar, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function NewsFeedItem(props: FeedType) {
    const { id, post_title, post_thumbnail, post_excerpt, post_date, author, post_permalink } = props;
    return (
        <li>
            <Link href={`${post_permalink}`} className="flex gap-8 max-md:flex-col" target="_blank">
                <Image
                    src={post_thumbnail}
                    alt="feed"
                    width={327}
                    height={200}
                    loading="lazy"
                    className="rounded-lg max-md:w-full"
                />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-typo-4">{post_title}</h3>
                        <p className="line-clamp-3 text-sm text-typo-1 leading-8 ">{post_excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar src={author.avatar} size={"sm"} />
                        <div className="flex items-center gap-1">
                            <h6 className="text-base leading-[26px] font-semibold text-typo-4">{author.name}</h6>
                            <span>&#183;</span>
                            <span className="text-13 leading-[17px] text-typo-2 font-medium">{post_date}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
function NewsFeed() {
    const [limit, setLimit] = useState(Number(process.env.NEXT_PUBLIC_NEWS_PER_PAGE));
    const { data, error, isLoading }: { data: FeedType[]; error: any; isLoading: boolean } = useNewsAPI(
        `?limit=${limit}`
    );
    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-2xl font-bold text-typo-4">NewsFeed</h2>
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
                <span className="text-lg font-bold text-typo-4 hover:text-primary-1 duration-300">Load more</span>
            </Button>
        </div>
    );
}

export default NewsFeed;

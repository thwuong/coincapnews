import { FeedType } from "@/app/types";
import { Avatar, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NewsFeedItem(props: FeedType | any) {
    const { id } = props;
    return (
        <li>
            <Link href={`/feed/${id}`} className="flex gap-8 max-md:flex-col">
                <Image
                    src={"/assets/images/feed.jpg"}
                    alt="feed"
                    width={327}
                    height={200}
                    loading="lazy"
                    className="rounded-lg max-md:w-full"
                />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-typo-4">
                            WHAT IS ETHEREUM LAYER 2? TOP 5 PROJECTS ON ETHEREUM LAYER 2
                        </h3>
                        <p className="line-clamp-3 text-sm text-typo-1 leading-8 ">
                            WHAT IS ETHEREUM LAYER-2? Ethereum layer-2 are solutions built on the Ethereum platform to
                            solve the problem of transaction throughput and transaction costs. More specifically, these
                            Layer-2 layers add another sub-layer to Ethereum to enhance performance and reduce
                            transaction costs. In other words. Layer-2 was created to increase the scalability of
                            Layer-1. At the same...
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar src="https://bit.ly/broken-link" size={"sm"} />
                        <div className="flex items-center gap-1">
                            <h6 className="text-base leading-[26px] font-semibold text-typo-4">Anna</h6>
                            <span>&#183;</span>
                            <span className="text-13 leading-[17px] text-typo-2 font-medium">12-05-2024</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
function NewsFeed() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-2xl font-bold text-typo-4">NewsFeed</h2>
            <ul className="flex flex-col gap-8 w-full">
                <NewsFeedItem />
                <NewsFeedItem />
                <NewsFeedItem />
                <NewsFeedItem />
            </ul>
            <Button
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

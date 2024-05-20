"use client";

import useFetchAPI from "@/api/baseAPI";
import { DetailCoinType, NewDataType } from "@/app/types";
import { formatCurrency } from "@/app/utils/formatCurrency";
import getNewData from "@/app/utils/getNewData";
import { Container } from "@/components/Container";
import { DetailTabs } from "@/components/DetailTabs";
import { SpinnerLoading } from "@/components/Loading";
import { NewsFeed } from "@/components/NewsFeed";
import { socketDetail } from "@/socket/client";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Page({ params }: { params: { symbol: string } }) {
    const [stream, setStream] = useState<NewDataType | any>();
    const { data: coin, isLoading }: { data: DetailCoinType; isLoading: boolean } = useFetchAPI(
        `/api/coins/details/${params.symbol}`
    );

    useEffect(() => {
        if (!coin) return;

        const socket = socketDetail(coin.symbol);
        function getMessage(this: WebSocket, ev: MessageEvent<any>) {
            const streamData = JSON.parse(ev.data);

            setStream({
                price: parseFloat(streamData.data.c),
                change24: parseFloat(streamData.data.P),
            });
        }
        socket.onmessage = getMessage;
        () => {
            socket.close();
        };
    }, [coin]);
    if (isLoading) return <SpinnerLoading />;
    return (
        <main className="pt-10 pb-20 w-full bg-[#ffffff] flex items-center justify-center">
            <Container className="px-12 flex-col gap-4">
                <div className="grid grid-cols-3 w-full items-center gap-8 max-lg:grid-cols-1">
                    <div className="flex flex-col gap-4 items-center ">
                        <Image src={coin.image.small} alt="bitcoin" width={88} height={88} />
                        <div className="flex items-center gap-2">
                            <h4 className="text-2xl leading-[38px] text-typo-4 font-bold capitalize">{coin.id}</h4>
                            <span className="text-base leading-9 text-typo-1 uppercase">{coin.symbol}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                size={"xs"}
                                bg={"#3861FB"}
                                _hover={{
                                    bg: "#3861FB",
                                }}
                                className="text-[11px] font-semibold"
                                color={"white"}
                            >
                                Rank #{coin.market_cap_rank}
                            </Button>
                            <Button size={"xs"} bg={"gray.100"} className="text-[11px] font-semibold capitalize">
                                coin
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-start ">
                        <p className="text-[13px] font-medium leading-[21px] text-typo-1">
                            {coin.name} Price <span className="uppercase">({coin.symbol})</span>
                        </p>
                        <div className="flex items-center justify-between w-full">
                            <h4 className="font-bold text-[32px] leading-[41px]">
                                {formatCurrency(getNewData(stream?.price, coin.market_data?.current_price["usd"]))}
                            </h4>
                            <Button
                                width={"fit-content"}
                                height={"fit-content"}
                                py={"8px"}
                                bg={"#16C784"}
                                _hover={{
                                    bg: "#16C784",
                                }}
                                leftIcon={
                                    <Image src={"/assets/icons/sort-up-white.svg"} alt="left" width={10} height={10} />
                                }
                            >
                                <span className="text-white font-semibold text-sm">
                                    {getNewData(
                                        stream?.change24,
                                        coin.market_data.market_cap_change_percentage_24h
                                    ).toFixed(2)}
                                    %
                                </span>
                            </Button>
                        </div>
                        <p className="text-base font-medium leading-[26px] text-typo-1">
                            {coin.name} Price <span className="uppercase">({coin.symbol})</span>
                        </p>
                        <div className="flex items-center justify-between text-typo-1 w-full">
                            <p className="text-12 font-medium">24h Low / 24h High</p>
                            <p className="text-sm font-bold">
                                {formatCurrency(coin.market_data.low_24h["usd"])} /{" "}
                                {formatCurrency(coin.market_data.high_24h["usd"])}
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-typo-1 w-full">
                            <p className="text-12 font-medium">24 Hour Trading Vol</p>
                            <p className="text-sm font-bold">{formatCurrency(coin.market_data.total_volume["usd"])}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <p className="text-[14px] leading-[1] font-bold  text-typo-1">Sponsored</p>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button
                                size={"md"}
                                bg={"#3861FB"}
                                _hover={{
                                    bg: "#3861FB",
                                }}
                                className="text-[14px] font-medium leading-[30px]"
                                color={"white"}
                            >
                                Buy
                            </Button>
                            <Button
                                size={"md"}
                                bg={"#3861FB"}
                                _hover={{
                                    bg: "#3861FB",
                                }}
                                className="text-[14px] font-medium leading-[30px]"
                                color={"white"}
                            >
                                Exchange
                            </Button>
                            <Button
                                size={"md"}
                                bg={"#3861FB"}
                                _hover={{
                                    bg: "#3861FB",
                                }}
                                className="text-[14px] font-medium leading-[30px]"
                                color={"white"}
                            >
                                Gaming
                            </Button>
                            <Button
                                size={"md"}
                                bg={"#3861FB"}
                                _hover={{
                                    bg: "#3861FB",
                                }}
                                className="text-[14px] font-medium leading-[30px]"
                                color={"white"}
                            >
                                Earn Crypto
                            </Button>
                        </div>
                        <div className="relative h-[154px] w-full">
                            <Image src={"/assets/images/banner-coin.png"} alt="coin" fill className="absolute" />
                        </div>
                        <div className="relative h-[154px] w-full">
                            <Image src={"/assets/images/banner-coin.png"} alt="coin" fill className="absolute" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 w-full items-start gap-8 max-lg:grid-cols-1">
                    {/* Links detail */}
                    <div className="flex flex-col gap-4">
                        <h5 className="text-sm font-bold text-typo-1/80">Links</h5>
                        <div className="flex gap-2 flex-wrap">
                            {coin.links.blockchain_site.length > 0 && (
                                <Button
                                    as={Link}
                                    href={coin.links.blockchain_site[0]}
                                    target="_blank"
                                    height={"fit-content"}
                                    py={"8px"}
                                    bg={"rgba(0, 0, 0, 0.04)"}
                                    leftIcon={
                                        <Image
                                            src={"/assets/icons/explore.svg"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                >
                                    <span className="text-[11px] font-semibold capitalize text-black/80  hover:text-primary-1">
                                        Explorer
                                    </span>
                                </Button>
                            )}
                            {coin.links.homepage.length > 0 && (
                                <Button
                                    as={Link}
                                    href={coin.links.homepage[0]}
                                    target="_blank"
                                    height={"fit-content"}
                                    py={"8px"}
                                    bg={"rgba(0, 0, 0, 0.04)"}
                                    leftIcon={
                                        <Image
                                            src={"/assets/icons/earth.svg"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                >
                                    <span className="text-[11px] font-semibold capitalize text-black/80 t hover:text-primary-1">
                                        Official Website
                                    </span>
                                </Button>
                            )}
                            {coin.links.repos_url?.github.length > 0 && (
                                <Button
                                    as={Link}
                                    href={coin.links.repos_url.github[0]}
                                    target="_blank"
                                    height={"fit-content"}
                                    py={"8px"}
                                    bg={"rgba(0, 0, 0, 0.04)"}
                                    leftIcon={
                                        <Image
                                            src={"/assets/icons/github.svg"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                >
                                    <span className="text-[11px] font-semibold capitalize text-black/80 t hover:text-primary-1">
                                        Github
                                    </span>
                                </Button>
                            )}
                            {coin.links.subreddit_url && (
                                <Button
                                    as={Link}
                                    href={coin.links.subreddit_url}
                                    target="_blank"
                                    height={"fit-content"}
                                    py={"8px"}
                                    bg={"rgba(0, 0, 0, 0.04)"}
                                    leftIcon={
                                        <Image
                                            src={"/assets/icons/reddit.svg"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                >
                                    <span className="text-[11px] font-semibold capitalize text-black/80 t hover:text-primary-1">
                                        Reddit
                                    </span>
                                </Button>
                            )}
                            {coin.links.twitter_screen_name && (
                                <Button
                                    as={Link}
                                    href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                                    target="_blank"
                                    height={"fit-content"}
                                    py={"8px"}
                                    bg={"rgba(0, 0, 0, 0.04)"}
                                    leftIcon={
                                        <Image
                                            src={"/assets/icons/twitter.svg"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                >
                                    <span className="text-[11px] font-semibold capitalize text-black/80 t hover:text-primary-1">
                                        Twitter
                                    </span>
                                </Button>
                            )}
                            {coin.links.facebook_username && (
                                <Button
                                    as={Link}
                                    href={`https://www.facebook.com/${coin.links.facebook_username}`}
                                    target="_blank"
                                    height={"fit-content"}
                                    py={"8px"}
                                    bg={"rgba(0, 0, 0, 0.04)"}
                                    leftIcon={
                                        <Image
                                            src={"/assets/icons/fb-circle.svg"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                >
                                    <span className="text-[11px] font-semibold capitalize text-black/80 t hover:text-primary-1">
                                        Facebook
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                    {/* Contacts detail */}
                    <div className="flex flex-col gap-4">
                        <h5 className="text-sm font-bold text-typo-1/80">Contracts</h5>
                        <div className="flex items-center justify-between gap-4 max-lg:justify-start">
                            <div className="w-fit relative">
                                <Button
                                    height={"fit-content"}
                                    py={"8px"}
                                    pl={"12px"}
                                    pr={"16px"}
                                    bg={"rgba(0, 0, 0, 0.04)"}
                                    className="text-[11px] font-semibold capitalize text-black/80 hover:text-primary-1"
                                    leftIcon={
                                        <Image
                                            src={"/assets/images/bitcoin.webp"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={24}
                                            height={24}
                                        />
                                    }
                                    rightIcon={
                                        <Image
                                            src={"/assets/icons/copy.svg"}
                                            className="fill-white text-white hover:fill-primary-1"
                                            alt="left"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                >
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-12 font-medium text-typo-1">Ethereum</span>
                                        <p className="text-black text-12 font-bold truncate max-w-[180px] max-xl:max-w-[130px] max-md:max-w-[100px]">
                                            0xdac17f958d2ee523a2206206994597c13d831ec7
                                        </p>
                                    </div>
                                </Button>
                                <div className="absolute rounded-md w-full bg-white top-[calc(100%+8px)] p-2 shadow-xl z-[2]">
                                    <Button
                                        height={"fit-content"}
                                        py={"8px"}
                                        pl={"12px"}
                                        pr={"16px"}
                                        bg={"transparent"}
                                        _hover={{
                                            bg: "rgba(0, 0, 0, 0.04)",
                                        }}
                                        className="text-[11px] font-semibold capitalize text-black/80 hover:text-primary-1"
                                        leftIcon={
                                            <Image
                                                src={"/assets/images/bitcoin.webp"}
                                                className="fill-white text-white hover:fill-primary-1"
                                                alt="left"
                                                width={24}
                                                height={24}
                                            />
                                        }
                                        rightIcon={
                                            <Image
                                                src={"/assets/icons/copy.svg"}
                                                className="fill-white text-white hover:fill-primary-1"
                                                alt="left"
                                                width={16}
                                                height={16}
                                            />
                                        }
                                    >
                                        <div className="flex flex-col items-start gap-1">
                                            <span className="text-12 font-medium text-typo-1">Ethereum</span>
                                            <p className="text-black text-12 font-bold truncate max-w-[180px] max-xl:max-w-[130px] max-md:max-w-[100px]">
                                                0xdac17f958d2ee523a2206206994597c13d831ec7
                                            </p>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                            <Button
                                size={"md"}
                                bg={"transparent"}
                                _hover={{
                                    bg: "transparent",
                                    color: "rgb(56,97,251)",
                                }}
                                p={"0"}
                                className="text-[11px] font-semibold capitalize text-black/80 hover:text-primary-1"
                                rightIcon={
                                    <Image
                                        src={"/assets/icons/dropdown.svg"}
                                        className="fill-white text-white hover:fill-primary-1"
                                        alt="left"
                                        width={16}
                                        height={16}
                                    />
                                }
                            >
                                <span className="text-sm leading-6 font-medium text-typo-1 hover:text-primary-1">
                                    More
                                </span>
                            </Button>
                        </div>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-col gap-4">
                        <h5 className="text-sm font-bold text-typo-1/80">Tags</h5>
                        <div className="flex gap-2 flex-wrap">
                            {new Array(1).fill(4).map((_, index) => {
                                return (
                                    <Button key={index} height={"fit-content"} py={"8px"} bg={"rgba(0, 0, 0, 0.04)"}>
                                        <span className="text-12 font-semibold capitalize text-black/80 hover:text-primary-1">
                                            Smart Contracts
                                        </span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <DetailTabs coinData={coin} newData={stream} />
                {/* Feeds */}
                <NewsFeed />
            </Container>
        </main>
    );
}

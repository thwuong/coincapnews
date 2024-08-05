"use client";

import useFetchAPI from "@/api/baseAPI";
import { useTranslation } from "@/app/i18n/client";
import { DetailCoinType, NewDataType } from "@/app/types";
import { formatCurrency } from "@/app/utils/formatCurrency";
import getNewData from "@/app/utils/getNewData";
import { Container } from "@/components/Container";
import { DetailTabs } from "@/components/DetailTabs";
import { SpinnerLoading } from "@/components/Loading";
import { NewsFeed } from "@/components/NewsFeed";
import { useAppSelector } from "@/lib/hooks";
import { socketDetail } from "@/socket/client";
import { Button, useToast } from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
interface PageProps {
  params: {
    symbol: string;
    lang: string;
  };
}
export default function Page({ params }: PageProps) {
  const { currentCurrency } = useAppSelector((state) => state.globalStore);
  const toast = useToast();
  const [stream, setStream] = useState<NewDataType | any>();
  const [moreContract, setMoreContract] = useState<boolean>(false);
  const {
    data: coin,
    isLoading,
  }: { data: DetailCoinType; isLoading: boolean } = useFetchAPI(
    `/coins/details/${params.symbol}`
  );
  const copy = (contract: string) => {
    navigator.clipboard.writeText(contract);
    toast({
      title: "Copied",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setMoreContract(false);
    },
  });
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

  const platforms = useMemo(() => {
    if (!coin?.platforms) return;

    const objectToArray = Object.keys(coin.platforms).map((key) => [
      key,
      coin.platforms[key],
    ]);
    return objectToArray;
  }, [coin]);
  const search = useSearchParams();
  const lang = search.get("lang") || "en";

  const { t } = useTranslation(lang);
  if (isLoading) return <SpinnerLoading />;
  return (
    <main className="pt-10 pb-20 w-full bg-secondary flex items-center justify-center">
      <Container className="px-12 flex-col gap-4">
        <div className="grid grid-cols-3 w-full items-center gap-8 max-lg:grid-cols-1">
          <div className="flex flex-col gap-4 items-center ">
            <img
              src={
                coin.image?.large
                  ? coin.image?.large
                  : "/assets/icons/placeholder_coin.svg"
              }
              alt="coin"
              width={88}
              height={88}
              loading="lazy"
            />
            <div className="flex items-center gap-2">
              <h4 className="text-2xl leading-[38px] text-typo-4 font-bold capitalize">
                {coin.id}
              </h4>
              <span className="text-base leading-9 text-typo-1 uppercase">
                {coin.symbol}
              </span>
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
                {`${t("rank")} ${coin.market_cap_rank}`}
              </Button>
              {/* <Button size={"xs"} bg={"gray.100"} className="text-[11px] font-semibold capitalize">
                                coin
                            </Button> */}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start ">
            <p className="text-[13px] font-medium leading-[21px] text-typo-1">
              {`${coin.name} ${t("price")}`}{" "}
              <span className="uppercase">({coin.symbol})</span>
            </p>
            <div className="flex items-center justify-between w-full">
              <h4 className="font-bold text-[32px] leading-[41px]">
                {formatCurrency(
                  getNewData(
                    stream?.price,
                    coin.market_data?.current_price["usd"]
                  ),
                  currentCurrency,
                  lang,
                  {
                    maximumFractionDigits: 8,
                  }
                )}
              </h4>
              <Button
                width={"fit-content"}
                height={"fit-content"}
                py={"8px"}
                bg={
                  getNewData(
                    stream?.change24,
                    coin.market_data?.market_cap_change_percentage_24h
                  ) > 0
                    ? "#16C784"
                    : "#ea3943"
                }
                _hover={{
                  bg:
                    getNewData(
                      stream?.change24,
                      coin.market_data?.market_cap_change_percentage_24h
                    ) > 0
                      ? "rgba(22, 199, 132,0.8)"
                      : "rgba(234, 57, 67,0.8)",
                }}
                leftIcon={
                  <Image
                    src={"/assets/icons/sort-up-white.svg"}
                    className={clsx(
                      getNewData(
                        stream?.change24,
                        coin.market_data?.market_cap_change_percentage_24h
                      ) < 0 && "rotate-180"
                    )}
                    alt="left"
                    width={10}
                    height={10}
                  />
                }
              >
                <span className="text-white font-semibold text-sm">
                  {getNewData(
                    stream?.change24,
                    coin.market_data.market_cap_change_percentage_24h || 0
                  )?.toFixed(2)}
                  %
                </span>
              </Button>
            </div>
            <p className="text-base font-medium leading-[26px] text-typo-1">
              {`${coin.name} ${t("price")}`}{" "}
              <span className="uppercase">({coin.symbol})</span>
            </p>
            <div className="flex items-center justify-between text-typo-1 w-full">
              <p className="text-12 font-medium">{t("24h_low_24h_high")}</p>
              <p className="text-sm font-bold">
                {formatCurrency(
                  coin.market_data?.low_24h?.usd || 0,
                  currentCurrency,
                  lang
                )}{" "}
                /{" "}
                {formatCurrency(
                  coin.market_data?.high_24h?.usd || 0,
                  currentCurrency,
                  lang
                )}
              </p>
            </div>
            <div className="flex items-center justify-between text-typo-1 w-full">
              <p className="text-12 font-medium">{t("24h_trading_vol")}</p>
              <p className="text-sm font-bold">
                {formatCurrency(
                  coin.market_data.total_volume["usd"] || 0,
                  currentCurrency,
                  lang
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <p className="text-[14px] leading-[1] font-bold  text-typo-1">
              {t("sponsored")}
            </p>
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
                {t("buy")}
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
                {t("exchange")}
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
                {t("gaming")}
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
                {t("earn_crypto")}
              </Button>
            </div>
            <div className="relative h-[154px] w-full">
              <Image
                src={"/assets/images/banner-coin.png"}
                alt="coin"
                fill
                className="absolute rounded-lg"
              />
            </div>
            <div className="relative h-[154px] w-full">
              <Image
                src={"/assets/images/banner-coin.png"}
                alt="coin"
                fill
                className="absolute rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 w-full items-start gap-8 max-lg:grid-cols-1">
          {/* Links detail */}
          <div className="flex flex-col gap-4">
            <h5 className="text-sm font-bold text-typo-1/80">{t("links")}</h5>
            <div className="flex gap-2 flex-wrap">
              {coin.links?.blockchain_site?.length > 0 && (
                <Button
                  as={Link}
                  rel="nofollow"
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
                    {t("explorer")}
                  </span>
                </Button>
              )}
              {coin.links?.homepage?.length > 0 && (
                <Button
                  as={Link}
                  rel="nofollow"
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
                    {t("official_website")}
                  </span>
                </Button>
              )}
              {coin.links?.repos_url?.github.length > 0 && (
                <Button
                  as={Link}
                  rel="nofollow"
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
              {coin.links?.subreddit_url && (
                <Button
                  as={Link}
                  rel="nofollow"
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
              {coin.links?.twitter_screen_name && (
                <Button
                  as={Link}
                  rel="nofollow"
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
              {coin.links?.facebook_username && (
                <Button
                  as={Link}
                  rel="nofollow"
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
          {platforms && (
            <div className="flex flex-col gap-4">
              <h5 className="text-sm font-bold text-typo-1/80">
                {t("contracts")}
              </h5>
              <div className="flex items-center justify-between gap-4 max-lg:justify-start">
                <div className="w-fit relative">
                  {platforms.slice(0, 1).map((item) => (
                    <Button
                      key={`${item[0]}${item[1]}`}
                      height={"fit-content"}
                      py={"8px"}
                      pl={"12px"}
                      pr={"16px"}
                      bg={"rgba(0, 0, 0, 0.04)"}
                      className="text-[11px] font-semibold capitalize text-black/80 hover:text-primary-1"
                      leftIcon={
                        <Image
                          src={"/assets/icons/placeholder_coin.svg"}
                          className="fill-white text-white hover:fill-primary-1"
                          alt="left"
                          width={24}
                          height={24}
                        />
                      }
                      rightIcon={
                        <Image
                          onClick={() => {
                            copy(item[1]);
                          }}
                          src={"/assets/icons/copy.svg"}
                          className="fill-white text-white hover:fill-primary-1"
                          alt="left"
                          width={16}
                          height={16}
                        />
                      }
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-12 font-medium text-typo-1 capitalize">
                          {item[0]}
                        </span>
                        <p className="text-black text-12 font-bold truncate max-w-[180px] max-xl:max-w-[130px] max-md:max-w-[100px]">
                          {item[1]}
                        </p>
                      </div>
                    </Button>
                  ))}
                  <div
                    ref={ref}
                    className={clsx(
                      moreContract ? "flex" : "hidden",
                      "absolute rounded-md flex-col gap-1 w-full bg-white top-[calc(100%+8px)] p-2 shadow-xl z-[2]"
                    )}
                  >
                    {platforms.slice(1).map((item) => (
                      <Button
                        key={`${item[0]}${item[1]}`}
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
                            src={"/assets/icons/placeholder_coin.svg"}
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
                            onClick={() => {
                              copy(item[1]);
                            }}
                          />
                        }
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-12 font-medium text-typo-1 capitalize">
                            {item[0]}
                          </span>
                          <p className="text-black text-12 font-bold truncate max-w-[180px] max-xl:max-w-[130px] max-md:max-w-[100px]">
                            {item[1]}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                {platforms?.length > 1 && (
                  <Button
                    size={"md"}
                    bg={"transparent"}
                    _hover={{
                      bg: "transparent",
                      color: "rgb(56,97,251)",
                    }}
                    onClick={() => setMoreContract(!moreContract)}
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
                      {t("more")}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-col gap-4">
            <h5 className="text-sm font-bold text-typo-1/80">{t("tags")}</h5>
            <div className="flex gap-2 flex-wrap">
              {new Array(1).fill(4).map((_, index) => {
                return (
                  <Button
                    key={index}
                    height={"fit-content"}
                    py={"8px"}
                    bg={"rgba(0, 0, 0, 0.04)"}
                  >
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

"use client";
import { useTranslation } from "@/app/i18n/client";
import { CoinType, ExchangeType } from "@/app/types";
import UseScroll from "@/hooks/UseScroll";
import { Box, Button, Input, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useId, useState } from "react";
import { Container } from "../Container";
import { MenuMobile } from "../MenuMobile";
import { Navigation } from "../Navigation";
import { Topbar } from "../Topbar";
import useFetchAPI from "@/api/baseAPI";
import fetchAPI from "@/api/fetchAPI";
import { SpinnerLoading } from "../Loading";
type HeaderProps = {
    lang: string;
};
function Header({ lang }: HeaderProps) {
    const [keyword, setKeyword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const timer = React.useRef<any>(null);
    const [coinList, setCoinList] = useState<CoinType[]>();
    const [exchangeList, setExchangeList] = useState<ExchangeType[]>();
    const [scrollingUp] = UseScroll();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation(lang, "home");
    const handleSearch = async (searchTerms: string) => {
        const coins = await fetchAPI(`/api/coins/markets?search=${searchTerms}`);
        const exchanges = await fetchAPI(`/api/exchanges?search=${searchTerms}`);

        const [data1, data2] = await Promise.all([coins, exchanges]);

        setCoinList(data1);
        setExchangeList(data2);
    };
    const resetSearch = () => {
        setCoinList([]);
        setExchangeList([]);
        setKeyword("");
    };
    React.useEffect(() => {
        if (!keyword) return;
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            handleSearch(keyword);
            setLoading(false);
        }, 600);
    }, [keyword]);
    React.useEffect(() => {
        resetSearch();
    }, []);

    return (
        <header className="flex items-center justify-center flex-col">
            <Container className="px-12">
                <Topbar lang={lang} />
            </Container>
            <div
                className={clsx(
                    "border-gray-bg-2/30 border-t shadow z-20 w-full h-[100px] max-lg:h-20 flex items-center justify-center duration-300",
                    scrollingUp && "fixed top-0 left-0 bg-white/70 "
                )}
            >
                <Container className="px-12 ">
                    <section className="flex items-center justify-between w-full">
                        <div className="gap-6 flex items-center">
                            <Link href={"/"}>
                                <Image src={"/assets/images/logo.png"} alt="logo" width={200} height={35.5} />
                            </Link>
                            <Navigation />
                        </div>
                        <div className="flex items-center gap-6 max-lg:hidden">
                            <InputGroup position={"relative"} w={"min-content"}>
                                <InputLeftElement pointerEvents="none" height={"36px"}>
                                    <Image src={"/assets/icons/search.svg"} alt="dropdown" width={20} height={20} />
                                </InputLeftElement>

                                <Input
                                    onChange={(e) => {
                                        setLoading(true);
                                        setKeyword(e.target.value);
                                    }}
                                    borderRadius={"99px"}
                                    height={"min-content"}
                                    bg={"btn"}
                                    width={200}
                                    py={"6px"}
                                    type="text"
                                    placeholder={t("search coin")}
                                    border={"none"}
                                    className="placeholder:text-13"
                                />
                                {!loading && coinList && coinList?.length > 0 && (
                                    <Box
                                        position={"absolute"}
                                        zIndex={30}
                                        className="min-w-[335px] flex flex-col gap-5 h-[400px] overflow-y-auto p-5 shadow rounded-md bg-white top-[calc(100%+8px)]"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-semibold text-12 text-typo-4/80">Coins</h3>
                                            <div className="flex flex-col gap-4">
                                                {coinList.map((coin, index) => {
                                                    const key = coin.id + index;
                                                    return (
                                                        <Link
                                                            href={`/currency/${coin.id}`}
                                                            key={key}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <div className="flex items-center gap-1">
                                                                <Image
                                                                    height={24}
                                                                    width={24}
                                                                    src={coin.image}
                                                                    alt={coin.name}
                                                                />
                                                                <p className="uppercase font-semibold whitespace-nowrap text-sm">
                                                                    {coin.name}
                                                                    <span className="text-12 text-gray-bg ml-1">
                                                                        {coin.symbol}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            {/* <p
                                                                className={clsx(
                                                                    "capitalize whitespace-nowrap text-sm leading-4 change24 font-semibold font-inter",
                                                                    coin.price_change_percentage_24h_in_currency > 0
                                                                        ? "text-up"
                                                                        : "text-down"
                                                                )}
                                                            >
                                                                {coin.price_change_percentage_24h_in_currency?.toFixed(
                                                                    2
                                                                )}
                                                                %
                                                            </p> */}
                                                            <p className="capitalize whitespace-nowrap text-sm leading-4 text-gray-bg font-inter">
                                                                #{coin.market_cap_rank}
                                                            </p>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-semibold text-12 text-typo-4/80">Exchanges</h3>
                                            <div className="flex flex-col gap-4">
                                                {exchangeList &&
                                                    exchangeList?.length > 0 &&
                                                    exchangeList.map((exchange, index) => {
                                                        const key = exchange._source.id + index;
                                                        return (
                                                            <Link
                                                                href={`/exchanges/${exchange._source.id}`}
                                                                key={key}
                                                                className="flex items-center justify-between"
                                                            >
                                                                <div className="flex items-center gap-1">
                                                                    <Image
                                                                        height={24}
                                                                        width={24}
                                                                        src={exchange._source.image}
                                                                        alt={exchange._source.name}
                                                                    />
                                                                    <p className="uppercase font-semibold whitespace-nowrap text-sm">
                                                                        {exchange._source.name}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    </Box>
                                )}
                                {loading && (
                                    <Box
                                        position={"absolute"}
                                        zIndex={30}
                                        className="min-w-[335px] h-[400px] overflow-y-auto p-2 shadow rounded-md bg-white top-[calc(100%+8px)]"
                                    >
                                        <div className="flex items-center justify-center">
                                            <SpinnerLoading />
                                        </div>
                                    </Box>
                                )}
                            </InputGroup>
                            <Box
                                p={2}
                                cursor={"pointer"}
                                borderRadius={"50%"}
                                bg={"#0000000a"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <Image src={"/assets/icons/noti.svg"} alt="noti" width={24} height={24} />
                            </Box>
                            <Button
                                as={Link}
                                href={"/account"}
                                bgColor={"#3861fb"}
                                _hover={{
                                    bgColor: "none",
                                }}
                                px={"20px"}
                                color={"#fff"}
                                fontSize={"12px"}
                                fontWeight={"600"}
                                letterSpacing={"0.4px"}
                                lineHeight={"18px"}
                            >
                                {t("login")}
                            </Button>
                        </div>
                        {/* Show table and mobile */}
                        <div className=" items-center gap-4 hidden max-lg:flex">
                            <Image src={"/assets/icons/noti.svg"} alt="noti" width={24} height={24} />
                            <Image
                                onClick={() => {
                                    onOpen();
                                }}
                                src={"/assets/icons/menu.svg"}
                                alt="menu"
                                width={24}
                                height={24}
                            />
                        </div>
                        <MenuMobile lang={lang} isOpen={isOpen} onClose={onClose} />
                    </section>
                </Container>
            </div>
        </header>
    );
}

export default Header;

"use client";
import fetchAPI from "@/api/fetchAPI";
import { useTranslation } from "@/app/i18n/client";
import { checkFormatImage } from "@/app/utils/checkFormatImage";
import UseScroll from "@/hooks/UseScroll";
import { Box, Button, Input, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Container } from "../Container";
import { SpinnerLoading } from "../Loading";
import { MenuMobile } from "../MenuMobile";
import { Navigation } from "../Navigation";
import { Topbar } from "../Topbar";
type HeaderProps = {
    lang: string;
};
type ResultItemsType = {
    id: string;
    name: string;
    api_symbol: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    large: string;
    market_type: string;
};
type SearchResultType = {
    coins: ResultItemsType[];
    exchanges: ResultItemsType[];
};
function Header({ lang }: HeaderProps) {
    const [keyword, setKeyword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const timer = React.useRef<any>(null);
    const [searchList, setSearchList] = useState<SearchResultType | undefined>();
    const [scrollingUp] = UseScroll();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation(lang, "home");
    const router = useRouter();
    const ref = useDetectClickOutside({
        onTriggered: () => {
            setShow(false);
        },
    });
    const handleSearch = async (searchTerms: string) => {
        const result = await fetchAPI(`/api/search?query=${searchTerms}`);

        setSearchList(result);
        setLoading(false);
    };
    const resetSearch = () => {
        setSearchList(undefined);
        setKeyword("");
        setShow(false);
    };
    const nextPage = (href: string) => {
        router.push(href);
        resetSearch();
    };
    React.useEffect(() => {
        if (!keyword) return;
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            handleSearch(keyword);
        }, 600);
    }, [keyword]);

    return (
        <header className="flex items-center justify-center flex-col">
            <Container className="px-12">
                <Topbar />
            </Container>
            <div
                className={clsx(
                    "border-gray-bg-2/30 border-t shadow z-20 w-full h-[100px] max-lg:h-20 flex items-center justify-center duration-300",
                    scrollingUp && "fixed top-0 left-0 bg-white/90 max-h-20"
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
                            <InputGroup position={"relative"} w={"min-content"} ref={ref}>
                                <InputLeftElement pointerEvents="none" height={"36px"}>
                                    <Image src={"/assets/icons/search.svg"} alt="dropdown" width={20} height={20} />
                                </InputLeftElement>

                                <Input
                                    onChange={(e) => {
                                        setShow(true);
                                        setLoading(true);
                                        setKeyword(e.target.value);
                                    }}
                                    borderRadius={"99px"}
                                    height={"min-content"}
                                    bg={"btn"}
                                    width={200}
                                    py={"6px"}
                                    type="text"
                                    value={keyword}
                                    placeholder={t("search")}
                                    border={"none"}
                                    className="placeholder:text-13"
                                />
                                {!loading && searchList && show && (
                                    <Box
                                        position={"absolute"}
                                        zIndex={30}
                                        className="min-w-[335px] flex flex-col gap-5 h-[400px] overflow-y-auto p-5 shadow rounded-md bg-white top-[calc(100%+8px)]"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-semibold text-12 text-typo-4/80">Coins</h3>
                                            <div className="flex flex-col gap-4 pl-2">
                                                {searchList.coins.length > 0 ? (
                                                    searchList.coins.slice(0, 5).map((coin, index) => {
                                                        const key = coin.id + index;
                                                        return (
                                                            <div
                                                                onClick={() => nextPage(`/currency/${coin.id}`)}
                                                                key={key}
                                                                className="flex cursor-pointer items-center justify-between"
                                                            >
                                                                <div className="flex items-center gap-1">
                                                                    {checkFormatImage(coin.thumb) && (
                                                                        <img
                                                                            loading="lazy"
                                                                            height={24}
                                                                            width={24}
                                                                            src={coin.thumb}
                                                                            alt={coin.name}
                                                                        />
                                                                    )}

                                                                    <p className="uppercase font-semibold whitespace-nowrap text-sm">
                                                                        {coin.name}
                                                                        <span className="text-12 text-gray-bg ml-1">
                                                                            {coin.symbol}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <p className="capitalize whitespace-nowrap text-sm leading-4 text-gray-bg font-inter">
                                                                    #{coin.market_cap_rank}
                                                                </p>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p className="capitalize whitespace-nowrap  text-12 leading-4 text-gray-bg font-inter">
                                                        Items not found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-semibold text-12 text-typo-4/80">Exchanges</h3>
                                            <div className="flex flex-col gap-4 pl-2">
                                                {searchList.exchanges.length > 0 ? (
                                                    searchList.exchanges.slice(0, 5).map((exchange, index) => {
                                                        const key = exchange.id + index;
                                                        return (
                                                            <div
                                                                onClick={() => nextPage(`/exchanges/${exchange.id}`)}
                                                                key={key}
                                                                className="flex items-center cursor-pointer justify-between"
                                                            >
                                                                <div className="flex items-center gap-1">
                                                                    {checkFormatImage(exchange.thumb) && (
                                                                        <img
                                                                            loading="lazy"
                                                                            height={24}
                                                                            width={24}
                                                                            src={exchange.thumb}
                                                                            alt={exchange.name}
                                                                        />
                                                                    )}
                                                                    <p className="uppercase font-semibold whitespace-nowrap text-sm">
                                                                        {exchange.name}
                                                                        <span className="text-12 text-gray-bg ml-1">
                                                                            {exchange.market_type}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p className="capitalize whitespace-nowrap text-12  leading-4 text-gray-bg font-inter">
                                                        Items not found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Box>
                                )}
                                {loading && show && (
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
                                href={"/my-account"}
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

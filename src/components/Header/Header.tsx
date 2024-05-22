"use client";
import { CoinType } from "@/app/types";
import UseScroll from "@/hooks/UseScroll";
import { Box, Button, Input, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Container } from "../Container";
import { MenuMobile } from "../MenuMobile";
import { Navigation } from "../Navigation";
import { Topbar } from "../Topbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentLang } from "@/lib/features/lang/langSlice";
import { useTranslation } from "@/app/i18n/client";
type HeaderProps = {
    lang: string;
};
function Header({ lang }: HeaderProps) {
    const [keyword, setKeyword] = useState<string>();
    const [searchList, setSearchList] = useState<CoinType[]>();
    const [scrollingUp] = UseScroll();
    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const langStore = useAppSelector((state) => state.langStore);
    const dispatch = useAppDispatch();
    if (!langStore.currentLanguage) {
        dispatch(setCurrentLang(lang));
    }
    const { t } = useTranslation(lang, "home");
    return (
        <header className="flex items-center justify-center flex-col">
            <Container className="px-12">
                <Topbar lang={lang} />
            </Container>
            <div
                className={clsx(
                    "border-gray-bg-2/30 border-t shadow z-10 w-full h-[100px] max-lg:h-20 flex items-center justify-center duration-300",
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
                                <InputLeftElement pointerEvents="none">
                                    <Image src={"/assets/icons/search.svg"} alt="dropdown" width={16} height={16} />
                                </InputLeftElement>

                                <Input
                                    onChange={handlerSearch}
                                    borderRadius={"99px"}
                                    height={"min-content"}
                                    bg={"btn"}
                                    width={200}
                                    py={"6px"}
                                    type="text"
                                    placeholder={t("search coin")}
                                />
                                {searchList && searchList?.length > 0 && (
                                    <Box
                                        position={"absolute"}
                                        zIndex={999999999}
                                        className="w-full h-[300px] shadow rounded-md bg-white top-[calc(100%+8px)]"
                                    ></Box>
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

"use client";
import React, { useState } from "react";
import Topbar from "../Topbar/Topbar";
import Container from "../Container/Container";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../Navigation/Navigation";
import { Box, Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

function Header() {
    const [keyword, setKeyword] = useState<string>();
    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    return (
        <header className="flex items-center justify-center flex-col">
            <Container className="px-12">
                <Topbar />
            </Container>
            <div className="border-gray-bg-2/30 border-t shadow w-full h-[100px] flex items-center justify-center">
                <Container className="px-12 justify-between">
                    <div className="gap-6 flex items-center">
                        <Link href={"/"}>
                            <Image src={"/assets/images/logo.png"} alt="logo" width={200} height={35.5} />
                        </Link>
                        <Navigation />
                    </div>
                    <div className="flex items-center gap-6">
                        <InputGroup position={"relative"} w={"min-content"}>
                            <InputLeftElement pointerEvents="none">
                                <Image src={"/assets/icons/search.svg"} alt="dropdown" width={16} height={16} />
                            </InputLeftElement>

                            <Input
                                onChange={handlerSearch}
                                borderRadius={"99px"}
                                height={"min-content"}
                                width={200}
                                py={"6px"}
                                type="text"
                                placeholder="Search coin"
                            />
                            {false && (
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
                            Login
                        </Button>
                    </div>
                </Container>
            </div>
        </header>
    );
}

export default Header;

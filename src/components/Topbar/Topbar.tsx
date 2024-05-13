"use client";
import React, { useState } from "react";
import LanguageMenu from "../LanguageMenu/LanguageMenu";
import { Button, MenuButton, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import CurrencyModal from "../Modal/CurrencyModal";
export const currenciesData = [
    {
        label: "Bitcoin",
        code: "BTC",
        type: "Cryptocurrencies",
    },
    {
        label: "Ethereum",
        code: "ETH",
        type: "Cryptocurrencies",
    },
    {
        label: "Chinese Yuan",
        code: "CNY",
        type: "Fiat Currencies",
    },
    {
        label: "United States Dollar",
        code: "USD",
        type: "Fiat Currencies",
    },
];
function Topbar() {
    const [currentCurrency, setCurrentCurrency] = useState(currenciesData[0]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <section className="w-full flex items-center justify-between text-12 min-h-[48px] max-lg:overflow-x-auto">
            <div className="flex items-center gap-3 text-12 w-full">
                <div className="flex items-center gap-1">
                    <span className="font-medium text-typo-1 whitespace-nowrap">Cryptos:</span>
                    <span className="text-primary-1 whitespace-nowrap">8,744</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-medium text-typo-1 whitespace-nowrap">Market:</span>
                    <span className="text-primary-1 whitespace-nowrap">1,717.26 B</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-medium text-typo-1 whitespace-nowrap">24h Vol:</span>
                    <span className="text-primary-1 whitespace-nowrap">3.17 %</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-medium text-typo-1 whitespace-nowrap">Dominance:</span>
                    <span className="text-primary-1 whitespace-nowrap">BTC 45.63%</span>
                    <span className="text-primary-1 whitespace-nowrap">ETH 17.7%</span>
                </div>
            </div>
            <div className="flex items-center gap-2 max-lg:hidden">
                <LanguageMenu />
                <Button
                    onClick={() => onOpen()}
                    bg={"transparent"}
                    _hover={{
                        bg: "gray.100",
                    }}
                    borderRadius={6}
                    height={7}
                    alignItems={"center"}
                    rightIcon={<Image src={"/assets/icons/dropdown.svg"} alt="dropdown" width={12} height={12} />}
                >
                    <span className="text-12 font-semibold">{currentCurrency.code}</span>
                </Button>
            </div>
            <CurrencyModal isOpen={isOpen} onClose={onClose} />
        </section>
    );
}

export default Topbar;

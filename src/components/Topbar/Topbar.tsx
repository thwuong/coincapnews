"use client";
import useFetchAPI from "@/api/baseAPI";
import { useTranslation } from "@/app/i18n/client";
import { formatCurrencyHasUnit, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import { useAppSelector } from "@/lib/hooks";
import { Button, Spinner, useDisclosure } from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import LanguageMenu from "../LanguageMenu/LanguageMenu";
import CurrencyModal from "../Modal/CurrencyModal";

type MarketData = {
    data: {
        active_cryptocurrencies: string;
        market_cap_change_percentage_24h_usd: number;
        total_market_cap: any;
        total_volume: any;
        market_cap_percentage: {
            btc: number;
            eth: number;
        };
    };
};
function Topbar() {
    const [currency, setCurrency] = useState<string>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: dataGlobal, isLoading }: { data: MarketData; isLoading: boolean } =
        useFetchAPI(`/api/global?centralized=true`);
    const { currentLanguage, currentCurrency } = useAppSelector((state) => state.globalStore);
    const { t } = useTranslation(currentLanguage);
    useEffect(() => {
        currentCurrency && setCurrency(currentCurrency);
    }, [currentCurrency]);
    return (
        <section className="w-full flex items-center justify-between text-12 min-h-[48px] max-lg:overflow-x-auto">
            {!isLoading ? (
                <div className="flex items-center gap-3 text-12 w-full animate-fade">
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.cryptos`)}:</span>
                        <span className="text-primary-1 whitespace-nowrap">
                            {formatQuoteCurrency(Number(dataGlobal.data.active_cryptocurrencies))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.market`)}:</span>
                        <span className="text-primary-1 whitespace-nowrap">
                            {formatCurrencyHasUnit(Number(dataGlobal.data.total_market_cap["usd"]))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.24h_vol`)}:</span>
                        <span
                            className={clsx(
                                "whitespace-nowrap",
                                Number(dataGlobal.data.market_cap_change_percentage_24h_usd) > 0
                                    ? "text-up"
                                    : "text-down"
                            )}
                        >
                            {Number(dataGlobal.data.market_cap_change_percentage_24h_usd).toFixed(2)}%
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.dominance`)}:</span>
                        <span className="text-primary-1 whitespace-nowrap">
                            BTC {dataGlobal.data.market_cap_percentage.btc.toFixed(2)}%
                        </span>
                        <span className="text-primary-1 whitespace-nowrap">
                            ETH {dataGlobal.data.market_cap_percentage.eth.toFixed(2)}%
                        </span>
                    </div>
                </div>
            ) : (
                <>Loading...</>
            )}

            <div className="flex items-center gap-2 max-lg:hidden">
                {currentLanguage ? <LanguageMenu /> : <div className="loader-lang mr-4"></div>}
                {currency ? (
                    <Button
                        onClick={() => onOpen()}
                        bg={"transparent"}
                        className="animate-fade"
                        _hover={{
                            bg: "gray.100",
                        }}
                        borderRadius={6}
                        height={7}
                        alignItems={"center"}
                        rightIcon={<Image src={"/assets/icons/dropdown.svg"} alt="dropdown" width={12} height={12} />}
                    >
                        <span className="text-12 font-semibold uppercase">{currency}</span>
                    </Button>
                ) : (
                    <Spinner size={"sm"} />
                )}
            </div>
            <CurrencyModal isOpen={isOpen} onClose={onClose} />
        </section>
    );
}

export default Topbar;

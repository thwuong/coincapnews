"use client";
import {
    Box,
    Button,
    NumberInput,
    NumberInputField,
    Stat,
    StatArrow,
    StatHelpText,
    StatNumber,
} from "@chakra-ui/react";
import { useState } from "react";
import dynamic from "next/dynamic";

import clsx from "clsx";
import { NewDataType } from "@/app/types";
import getNewData from "@/app/utils/getNewData";
import { formatCurrency, formatQuoteCurrency } from "@/app/utils/formatCurrency";
const LineChartOverview = dynamic(() => import("../Charts/").then((mod) => mod.LineChartOverview));
type OverviewProps = {
    description: any;
    name: string;
    symbol: string;
    market_data: {
        total_volume: any;
        low_24h: any;
        high_24h: any;
        price_change_percentage_24h_in_currency: any;
        current_price: any;
        price_change_24h_in_currency: any;
        market_cap: any;
        fully_diluted_valuation: any;
        market_cap_change_percentage_24h: number;
        ath: any;
        atl: any;
        atl_change_percentage: any;
        ath_change_percentage: any;
        total_supply: number;
        max_supply: number;
        circulating_supply: number;
    };
    market_cap_rank: number;
};
function Overview({ overviewData, newData }: { overviewData: OverviewProps; newData: NewDataType | any }) {
    const [tabActive, setTabActive] = useState("price");
    const [datetime, setDatetime] = useState("1D");
    const [isMore, setIsMore] = useState(false);
    const [readMore, setReadMore] = useState(false);

    return (
        <section className="grid grid-cols-12 gap-5 w-full max-lg:grid-cols-1">
            {/* Chart */}
            <div className="col-span-8 flex flex-col mt-8 gap-4 max-lg:col-span-1">
                <h3 className="text-[20px] leading-8 font-bold text-[rgb(85,85,85)]">Tether Chart</h3>
                <div className="flex items-center justify-between w-full flex-wrap gap-4">
                    <div className="flex items-center p-1 rounded-lg bg-primary-3 gap-2 w-fit max-md:w-full">
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setTabActive("price")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={tabActive === "price" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">Price</span>
                        </Button>
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setTabActive("trading")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={tabActive === "trading" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">Trading view</span>
                        </Button>
                    </div>
                    <div className="flex items-center p-1 rounded-lg bg-primary-3 gap-2 w-fit max-md:w-full">
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setDatetime("1D")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={datetime === "1D" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">1D</span>
                        </Button>
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setDatetime("7D")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={datetime === "7D" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">7D</span>
                        </Button>
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setDatetime("1M")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={datetime === "1M" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">1M</span>
                        </Button>
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setDatetime("3M")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={datetime === "3M" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">3M</span>
                        </Button>
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setDatetime("6M")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={datetime === "6M" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">6M</span>
                        </Button>
                        <Button
                            className="w-fit max-md:w-full"
                            onClick={() => setDatetime("1Y")}
                            height={"min-content"}
                            _hover={{
                                bg: "white",
                            }}
                            bg={datetime === "1Y" ? "white" : ""}
                        >
                            <span className="text-black font-semibold leading-[30px] text-13">1Y</span>
                        </Button>
                    </div>
                </div>
                <LineChartOverview
                    data={[
                        {
                            x: new Date("2018-02-12").getTime(),
                            y: 0,
                        },
                        {
                            x: new Date("2018-02-12").getTime(),
                            y: 76,
                        },
                    ]}
                />
                {/* About coin */}
                <div className="py-6 flex flex-col gap-5">
                    <h2 className="text-[25px] font-bold text-typo-4">About {overviewData.name}</h2>
                    <div
                        className={clsx(
                            "text-base text-typo-1 leading-[26px] overflow-hidden relative",
                            readMore ? "h-auto" : "h-[300px]"
                        )}
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: overviewData.description["en"],
                            }}
                            id="description"
                        ></div>
                        {!readMore && (
                            <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-b from-white/0 to-white"></div>
                        )}
                    </div>
                    <Button
                        onClick={() => setReadMore(!readMore)}
                        width={"min-content"}
                        height={"fit-content"}
                        py={"8px"}
                    >
                        <span className="font-semibold text-sm text-primary-1 duration-300">
                            {readMore ? "Read Less" : "Read More"}
                        </span>
                    </Button>
                </div>
            </div>
            {/* Info */}
            <div className="col-span-4 flex flex-col mt-12 gap-6 max-lg:col-span-1">
                <div className="rounded-lg border border-[rgb(239,242,245)]">
                    <Box className="py-5 px-4 flex items-center justify-between gap-4" bg={"white"}>
                        <p className="font-semibold text-sm text-black uppercase">{overviewData.symbol}</p>
                        <NumberInput>
                            <NumberInputField
                                px={"0px"}
                                _focusVisible={{
                                    boxShadow: "none",
                                }}
                                border={"none"}
                                outline={"none"}
                                textAlign={"right"}
                                className="font-bold"
                                fontSize={"18px"}
                            />
                        </NumberInput>
                    </Box>
                    <Box className="py-5 px-4 flex items-center justify-between gap-4" bg={"#F8FAFD"}>
                        <p className="font-semibold text-sm text-black uppercase">USD</p>
                        <p className="font-bold text-lg">{"423"}</p>
                    </Box>
                </div>
                {/* Price Status */}
                <div className="rounded-lg bg-secondary p-6 flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-typo-4">
                        <span className="uppercase">{overviewData.symbol}</span> Price Status
                    </h2>
                    <ul className={clsx("flex flex-col gap-6 overflow-hidden", isMore ? "h-auto" : "h-[430px]")}>
                        {/* Bitcoin Price Today */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                                {overviewData.name} Price Today
                            </h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">{overviewData.name}Price</p>
                                <p className="font-semibold text-sm">
                                    {formatCurrency(
                                        getNewData(newData?.price, overviewData.market_data.current_price["usd"])
                                    )}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Trading Volume</p>
                                <p className="font-semibold text-sm">
                                    {formatCurrency(overviewData.market_data.total_volume["usd"])}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap">Price Change 24h</p>
                                <Stat className="text-right">
                                    <StatNumber>
                                        <p className="font-semibold text-sm">
                                            {formatCurrency(
                                                overviewData.market_data.price_change_24h_in_currency["usd"]
                                            )}
                                        </p>
                                    </StatNumber>
                                    <StatHelpText
                                        fontSize={"12px"}
                                        fontWeight={"600"}
                                        className={
                                            getNewData(
                                                newData?.change24,
                                                overviewData.market_data.market_cap_change_percentage_24h
                                            ) > 0
                                                ? "text-up"
                                                : "text-down"
                                        }
                                    >
                                        <StatArrow
                                            type={
                                                getNewData(
                                                    newData?.change24,
                                                    overviewData.market_data.market_cap_change_percentage_24h
                                                ) > 0
                                                    ? "increase"
                                                    : "decrease"
                                            }
                                            w={"8px"}
                                            h={"8px"}
                                        />
                                        {getNewData(
                                            newData?.change24,
                                            overviewData.market_data.market_cap_change_percentage_24h
                                        ).toFixed(2)}
                                        %
                                    </StatHelpText>
                                </Stat>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">24h Low / 24h High</p>
                                <p className="font-semibold text-sm">
                                    {formatCurrency(overviewData.market_data.low_24h["usd"])} {" / "}
                                    {formatCurrency(overviewData.market_data.high_24h["usd"])}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Volume / Market Cap</p>
                                <p className="font-semibold text-sm">
                                    {formatQuoteCurrency(
                                        overviewData.market_data.total_volume["usd"] /
                                            overviewData.market_data.market_cap["usd"]
                                    )}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Market Rank</p>
                                <p className="font-semibold text-sm">#{overviewData.market_cap_rank}</p>
                            </Box>
                        </li>
                        {/* BitcoinMarket Cap */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                                {overviewData.name}Market Cap
                            </h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Market Cap</p>
                                <p className="font-semibold text-sm">
                                    {formatCurrency(overviewData.market_data.market_cap["usd"])}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Fully Diluted Market Cap</p>
                                <p className="font-semibold text-sm">
                                    {formatCurrency(overviewData.market_data.fully_diluted_valuation["usd"])}
                                </p>
                            </Box>
                        </li>
                        {/* Bitcoin Price Yesterday */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                                {overviewData.name} Price Yesterday
                            </h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Yesterday's Low / High</p>
                                <p className="font-semibold text-sm">
                                    {formatCurrency(overviewData.market_data.low_24h["usd"])} {" / "}
                                    {formatCurrency(overviewData.market_data.high_24h["usd"])}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Yesterday's Change</p>
                                <Stat className="text-right">
                                    <StatHelpText
                                        fontSize={"12px"}
                                        fontWeight={"600"}
                                        className={
                                            overviewData.market_data.market_cap_change_percentage_24h > 0
                                                ? "text-up"
                                                : "text-down"
                                        }
                                    >
                                        <StatArrow
                                            type={
                                                overviewData.market_data.market_cap_change_percentage_24h > 0
                                                    ? "increase"
                                                    : "decrease"
                                            }
                                            w={"8px"}
                                            h={"8px"}
                                        />
                                        {overviewData.market_data.market_cap_change_percentage_24h.toFixed(2)}%
                                    </StatHelpText>
                                </Stat>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Yesterday's Volume</p>
                                <p className="font-semibold text-sm">
                                    {formatCurrency(overviewData.market_data.market_cap["usd"])}
                                </p>
                            </Box>
                        </li>
                        {/* BitcoinPrice History */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                                {overviewData.name}Price History
                            </h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">All Time High</p>
                                <Stat className="text-right">
                                    <StatNumber>
                                        <p className="font-semibold text-sm">
                                            {formatCurrency(overviewData.market_data.ath["usd"])}
                                        </p>
                                    </StatNumber>
                                    <StatHelpText
                                        fontSize={"12px"}
                                        fontWeight={"600"}
                                        className={
                                            overviewData.market_data.ath_change_percentage["usd"] > 0
                                                ? "text-up"
                                                : "text-down"
                                        }
                                    >
                                        <StatArrow
                                            type={
                                                overviewData.market_data.ath_change_percentage["usd"] > 0
                                                    ? "increase"
                                                    : "decrease"
                                            }
                                            w={"8px"}
                                            h={"8px"}
                                        />
                                        {formatQuoteCurrency(
                                            overviewData.market_data.ath_change_percentage["usd"].toFixed(2)
                                        )}
                                        %
                                    </StatHelpText>
                                </Stat>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">All Time Low</p>
                                <Stat className="text-right">
                                    <StatNumber>
                                        <p className="font-semibold text-sm">
                                            {formatCurrency(overviewData.market_data.atl["usd"])}
                                        </p>
                                    </StatNumber>
                                    <StatHelpText
                                        fontSize={"12px"}
                                        fontWeight={"600"}
                                        className={
                                            overviewData.market_data.atl_change_percentage["usd"] > 0
                                                ? "text-up"
                                                : "text-down"
                                        }
                                    >
                                        <StatArrow
                                            type={
                                                overviewData.market_data.atl_change_percentage["usd"] > 0
                                                    ? "increase"
                                                    : "decrease"
                                            }
                                            w={"8px"}
                                            h={"8px"}
                                        />
                                        {formatQuoteCurrency(
                                            overviewData.market_data.atl_change_percentage["usd"].toFixed(2)
                                        )}
                                        %
                                    </StatHelpText>
                                </Stat>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">{overviewData.name} ROI</p>
                                <Stat className="text-right">
                                    <StatHelpText
                                        fontSize={"12px"}
                                        fontWeight={"600"}
                                        className={10 > 0 ? "text-up" : "text-down"}
                                    >
                                        <StatArrow type="increase" w={"8px"} h={"8px"} />
                                        9.05%
                                    </StatHelpText>
                                </Stat>
                            </Box>
                        </li>
                        {/* Bitcoin Supply */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">{overviewData.name} Supply</h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Circulating Supply</p>
                                <p className="font-semibold text-sm">
                                    {formatQuoteCurrency(overviewData.market_data.circulating_supply)}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Total Supply</p>
                                <p className="font-semibold text-sm">
                                    {formatQuoteCurrency(overviewData.market_data.total_supply)}
                                </p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Max Supply</p>
                                <p className="font-semibold text-sm">
                                    {formatQuoteCurrency(overviewData.market_data.max_supply)}
                                </p>
                            </Box>
                        </li>
                    </ul>
                    <Button onClick={() => setIsMore(!isMore)} bg={"rgba(0, 0, 0, 0.04)"}>
                        <span className="font-medium text-sm text-typo-4 duration-300">
                            {isMore ? "Show Less" : "Show More"}
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Overview;

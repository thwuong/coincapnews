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
const LineChartOverview = dynamic(() => import("../Charts/").then((mod) => mod.LineChartOverview));

import clsx from "clsx";
import dynamic from "next/dynamic";

function Overview() {
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
                    <h2 className="text-[25px] font-bold text-typo-4">About Bitcoin</h2>
                    <div
                        className={clsx(
                            "text-base text-typo-1 leading-[26px] overflow-hidden relative",
                            readMore ? "h-auto" : "h-[300px]"
                        )}
                    >
                        <p>
                            Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no
                            central bank or authority is involved in the transaction and production of the Bitcoin
                            currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto.
                            The source code is available publicly as an open source project, anybody can look at it and
                            be part of the developmental process.
                        </p>
                        <br />
                        <p>
                            Bitcoin is changing the way we see money as we speak. The idea was to produce a means of
                            exchange, independent of any central authority, that could be transferred electronically in
                            a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency
                            making mobile payment easy, very low transaction fees, protects your identity, and it works
                            anywhere all the time with no central authority and banks.
                        </p>
                        <br />
                        <p>
                            Bitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary
                            currency. Bitcoin uses the SHA-256 hashing algorithm with an average transaction
                            confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated
                            to only mining Bitcoin, and the hash rate has shot up to peta hashes.
                        </p>
                        <br />
                        <p>
                            Being the first successful online cryptography currency, Bitcoin has inspired other
                            alternative currencies such as Litecoin, Peercoin, Primecoin, and so on.
                        </p>
                        <br />
                        <p>
                            The cryptocurrency then took off with the innovation of the turing-complete smart contract
                            by Ethereum which led to the development of other amazing projects such as EOS, Tron, and
                            even crypto-collectibles such as CryptoKitties.
                        </p>
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
                        <p className="font-semibold text-sm text-black uppercase">BTC</p>
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
                    <h2 className="text-2xl font-bold text-typo-4">BTC Price Status</h2>
                    <ul className={clsx("flex flex-col gap-6 overflow-hidden", isMore ? "h-auto" : "h-[430px]")}>
                        {/* Bitcoin Price Today */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">Bitcoin Price Today</h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">BitcoinPrice</p>
                                <p className="font-semibold text-sm">{"$61,180.00"}</p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Trading Volume</p>
                                <p className="font-semibold text-sm">{"$13,323,496,009.00"}</p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Price Change 24h</p>
                                <Stat className="text-right">
                                    <StatNumber>
                                        <p className="font-semibold text-sm">{"$61,180.00"}</p>
                                    </StatNumber>
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
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Volume / Market Cap</p>
                                <p className="font-semibold text-sm">{"$61,180.00"}</p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Market Rank</p>
                                <p className="font-semibold text-sm">#1</p>
                            </Box>
                        </li>
                        {/* BitcoinMarket Cap */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">BitcoinMarket Cap</h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Market Cap</p>
                                <p className="font-semibold text-sm">{"$61,180.00"}</p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Fully Diluted Market Cap</p>
                                <p className="font-semibold text-sm">{"$13,323,496,009.00"}</p>
                            </Box>
                        </li>
                        {/* Bitcoin Price Yesterday */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">Bitcoin Price Yesterday</h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Yesterday's Low / High</p>
                                <p className="font-semibold text-sm">$60,698.00 / $61,759.00</p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Yesterday's Change</p>
                                <Stat className="text-right">
                                    <StatNumber>
                                        <p className="font-semibold text-sm">{"$61,180.00"}</p>
                                    </StatNumber>
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
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Yesterday's Volume</p>
                                <p className="font-semibold text-sm">$1,211,708,334,224.00</p>
                            </Box>
                        </li>
                        {/* BitcoinPrice History */}
                        <li className="flex flex-col">
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">BitcoinPrice History</h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">All Time High</p>
                                <Stat className="text-right">
                                    <StatNumber>
                                        <p className="font-semibold text-sm">{"$61,180.00"}</p>
                                    </StatNumber>
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
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">All Time Low</p>
                                <Stat className="text-right">
                                    <StatNumber>
                                        <p className="font-semibold text-sm">{"$61,180.00"}</p>
                                    </StatNumber>
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
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Bitcoin ROI</p>
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
                            <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">Bitcoin Supply</h6>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Circulating Supply</p>
                                <p className="font-semibold text-sm">19,697,531.00</p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Total Supply</p>
                                <p className="font-semibold text-sm">21,000,000.00</p>
                            </Box>
                            <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm whitespace-nowrap ">Max Supply</p>
                                <p className="font-semibold text-sm">21,000,000.00</p>
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

"use client";

import useFetchAPI from "@/api/baseAPI";
import { DetailExchangeType } from "@/app/types";
import Container from "@/components/Container/Container";
import { ExchangeTableDetail } from "@/components/ExchangeTableDetail";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import TablePagination from "@/components/TablePagination/TablePagination";
import { Button, Input, Select } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// export async function generateStaticParams() {
//     const { data, isLoading, error } = useFetchAPI(`/api/coins`);

//     return data.map((coin) => ({
//       symbol: coin.symbol,
//     }))
//   }

export default function Page({ params }: { params: { id: string } }) {
    const [numberSelected, setNumberSeleted] = useState(10);
    const [offSet, setOffSet] = useState(1);
    const { data: exchange, isLoading }: { data: DetailExchangeType; isLoading: boolean } = useFetchAPI(
        `/api/exchanges/details/${params.id}`
    );
    if (isLoading) return <SpinnerLoading />;
    const handlePageClick = ({ selected }: { selected: number }) => {
        setOffSet(selected + 1);
    };
    return (
        <main className="pt-10 pb-20 w-full bg-secondary flex items-center justify-center">
            <Container className="px-12 flex-col gap-4">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center gap-4">
                        <Image src={exchange.image} alt="bitcoin" width={50} height={50} />
                        <h2 className="text-[28px] leading-9 font-bold text-typo-4/80">{exchange.name}</h2>
                    </div>
                    <ul className="flex flex-col gap-1">
                        <li className="text-base leading-[26px] text-[rgb(119,119,119)]">
                            <p>
                                Website:{" "}
                                <Link href={exchange.url} target="_blank" className="hover:text-primary-1 duration-300">
                                    {exchange.url}
                                </Link>
                            </p>
                        </li>
                        <li className="text-base leading-[26px] text-[rgb(119,119,119)]">
                            <p>
                                Facebook:
                                {/* <Link href={exchange.url} target="_blank" className="hover:text-primary-1 duration-300">
                                    {exchange.url}
                                </Link> */}
                            </p>
                        </li>
                        <li className="text-base leading-[26px] text-[rgb(119,119,119)]">
                            <p>
                                Twitter:{" "}
                                <Link
                                    href={`https://twitter.com/`}
                                    target="_blank"
                                    className="hover:text-primary-1 duration-300"
                                >
                                    https://twitter.com/
                                </Link>
                            </p>
                        </li>
                        <li className="text-base leading-[26px] text-[rgb(119,119,119)]">
                            <p>
                                Trust Score: <span>{exchange.trust_score}</span>
                            </p>
                        </li>
                    </ul>
                    <div className="flex flex-col">
                        <h2 className="text-[28px] leading-9 font-bold text-typo-4/80">Active Markets</h2>
                        <div className="flex w-full justify-between py-5">
                            <Input
                                placeholder="Search"
                                border={"none"}
                                bg={"rgb(0,0,0,0.04)"}
                                w={"200px"}
                                borderRadius={"99px"}
                                fontSize={"14px"}
                                className="font-semibold text-typo-4"
                            />
                            <Select
                                defaultValue={numberSelected}
                                w={"fit-content"}
                                bg={"rgb(0,0,0,0.04)"}
                                border={"none"}
                                borderRadius={"8px"}
                                fontSize={"14px"}
                                className="font-semibold text-typo-4"
                                onChange={(event) => {
                                    setNumberSeleted(Number(event.target.value));
                                }}
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Select>
                        </div>
                        <ExchangeTableDetail
                            data={exchange.tickers.slice((offSet - 1) * numberSelected, numberSelected * offSet)}
                            isLoading={isLoading}
                        />
                        <TablePagination
                            disbledPre
                            disbledNext
                            pageCount={exchange.tickers.length / numberSelected}
                            handlePageClick={handlePageClick}
                        />
                    </div>
                </div>
            </Container>
        </main>
    );
}

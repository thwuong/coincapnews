"use client";
import useFetchAPI from "@/api/baseAPI";
import { DetailExchangeType } from "@/app/types";
import Container from "@/components/Container/Container";
import { ExchangeTableDetail } from "@/components/ExchangeTableDetail";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import TablePagination from "@/components/TablePagination/TablePagination";
import { Input, Select } from "@chakra-ui/react";
import Link from "next/link";
import { useMemo, useState } from "react";
export default function ExchangesContent({ params }: { params: { id: string } }) {
    const [perPage, setPerPage] = useState(10);
    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(1);
    const { data: exchange, isLoading }: { data: DetailExchangeType; isLoading: boolean } = useFetchAPI(
        `/api/exchanges/details/${params.id}`
    );

    const handlePageClick = ({ selected }: { selected: number }) => {
        // setPage(selected + 1);
        setPage(page + 1);
    };
    const exchanges = useMemo(() => {
        if (!exchange?.tickers) return null;
        return exchange.tickers.filter((item) =>
            item.coin_id.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        );
    }, [exchange?.tickers, keyword]);
    if (isLoading) return <SpinnerLoading />;

    return (
        <main className="pt-10 pb-20 w-full bg-secondary flex items-center justify-center">
            <Container className="px-12 flex-col gap-4">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center gap-4">
                        <img loading="lazy" src={exchange.image} alt="bitcoin" width={50} height={50} />
                        <h2 className="text-[28px] leading-9 font-bold text-typo-4/80">{exchange.name}</h2>
                    </div>
                    <ul className="flex flex-col gap-1">
                        <li className="text-base leading-[26px] text-[rgb(119,119,119)]">
                            <p>
                                Website:{" "}
                                <Link
                                    href={exchange.url}
                                    rel="nofollow"
                                    target="_blank"
                                    className="hover:text-primary-1 duration-300"
                                >
                                    {exchange.url}
                                </Link>
                            </p>
                        </li>
                        <li className="text-base leading-[26px] text-[rgb(119,119,119)]">
                            <p>
                                Facebook:
                                {exchange?.facebook_url && (
                                    <Link
                                        href={exchange.facebook_url}
                                        rel="nofollow"
                                        target="_blank"
                                        className="hover:text-primary-1 duration-300"
                                    >
                                        {exchange.facebook_url}
                                    </Link>
                                )}
                            </p>
                        </li>
                        <li className="text-base leading-[26px] text-[rgb(119,119,119)]">
                            <p>
                                Twitter:{" "}
                                <Link
                                    href={`https://twitter.com/`}
                                    rel="nofollow"
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
                    {exchange?.tickers && (
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
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <Select
                                    defaultValue={perPage}
                                    w={"fit-content"}
                                    bg={"rgb(0,0,0,0.04)"}
                                    border={"none"}
                                    borderRadius={"8px"}
                                    fontSize={"14px"}
                                    className="font-semibold text-typo-4"
                                    onChange={(event) => {
                                        setPerPage(Number(event.target.value));
                                        setPage(1);
                                    }}
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </Select>
                            </div>
                            {exchanges && (
                                <ExchangeTableDetail
                                    data={exchanges.slice((page - 1) * perPage, perPage * page)}
                                    isLoading={isLoading}
                                    currentIndex={(page - 1) * perPage}
                                />
                            )}

                            {exchanges && exchanges.length / perPage > 1 && (
                                <div className="w-full py-4 flex justify-center">
                                    <TablePagination
                                        disbledPre
                                        disbledNext
                                        pageCount={exchanges.length / perPage}
                                        handlePageClick={handlePageClick}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
}

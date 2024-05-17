import { formatCurrency, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import getNewData from "@/app/utils/getNewData";
import UseResize from "@/hooks/UseResize";
import UseSocket from "@/hooks/UseSocket";
import { Badge, Box, Td, Tr } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { UnitConversion } from "../TableSection/TableSection";
const LineChartLastDays = dynamic(() => import("../Charts").then((mod) => mod.LineChartLastDays));

function CoinRow({ row }: { row: Row<UnitConversion> }) {
    let convertId = `${row.original._source.symbol}USDT`.toLocaleUpperCase();
    const [width] = UseResize();
    const { stream, socket } = UseSocket();
    console.log(row.original._source.symbol);

    return (
        <Tr>
            <Td
                p={"4px"}
                minW={"104px"}
                height={"100px"}
                position={width <= 768 ? "sticky" : undefined}
                left={0}
                className="bg-secondary"
            >
                <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                    <Image
                        className="cursor-pointer"
                        src={"/assets/icons/start.svg"}
                        alt="sort-down"
                        width={14}
                        height={14}
                    />
                    <Link
                        href={`/currency/${row.original._source.id}`}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Image
                            className="cursor-pointer"
                            src={row.original._source.image}
                            alt={row.original._source.name}
                            width={24}
                            height={24}
                        />
                        <Box flexDirection={"column"}>
                            <p className="capitalize text-sm leading-4 font-semibold text-typo-4 font-inter">
                                {row.original._source.name}
                            </p>
                            <Box display={"flex"} alignItems={"center"} gap={"4px"}>
                                <Badge p={"4px"} className="uppercase leading-[14px] text-12 text-typo-1 font-inter">
                                    {row.original._source.market_cap_rank}
                                </Badge>
                                <span className="uppercase leading-[18px] text-12 text-typo-1 font-inter">
                                    {row.original._source.symbol}
                                </span>
                            </Box>
                        </Box>
                    </Link>
                </Box>
            </Td>
            <Td isNumeric={true} px={"4px"}>
                <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                    {formatCurrency(getNewData(stream[convertId]?.price, row.original._source.current_price))}
                </p>
            </Td>
            <Td isNumeric={true} px={"4px"}>
                <p
                    className={clsx(
                        "capitalize text-sm leading-4 font-semibold font-inter",
                        getNewData(
                            stream[convertId]?.change24,
                            row.original._source.price_change_percentage_24h_in_currency
                        ) > 0
                            ? "text-up"
                            : "text-down"
                    )}
                >
                    {getNewData(
                        stream[convertId]?.change24,
                        row.original._source.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                    %
                </p>
            </Td>
            <Td isNumeric={true} px={"4px"}>
                <p
                    className={clsx(
                        "capitalize text-sm leading-4 font-semibold font-inter",
                        row.original._source.price_change_percentage_7d_in_currency > 0 ? "text-up" : "text-down"
                    )}
                >
                    {row.original._source.price_change_percentage_7d_in_currency.toFixed(2)}%
                </p>
            </Td>
            <Td isNumeric={true} px={"4px"} minW={"138px"}>
                <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                    {formatQuoteCurrency(row.original._source.market_cap)}
                </p>
            </Td>
            <Td isNumeric={true} px={"4px"} minW={"118px"}>
                <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                    {formatQuoteCurrency(row.original._source.total_volume)}
                </p>
            </Td>
            <Td isNumeric={true} px={"4px"} minW={"182px"}>
                <div className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter flex gap-1 justify-end">
                    <p>{formatQuoteCurrency(row.original._source.total_supply)}</p>
                    <p className="uppercase">{row.original._source.symbol}</p>
                </div>
            </Td>
            <Td isNumeric={true} px={"4px"} minW={"180px"}>
                <Box display={"flex"} justifyContent={"end"}>
                    <LineChartLastDays
                        isUp={row.original._source.price_change_percentage_7d_in_currency > 0}
                        data={row.original._source.sparkline_in_7d.price}
                    />
                </Box>
            </Td>
        </Tr>
    );
}

export default CoinRow;

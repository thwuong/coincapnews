"use client";
import useFetchAPI from "@/api/baseAPI";
import { formatCurrency, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { Box, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
    ColumnDef,
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import TablePagination from "../TablePagination/TablePagination";
const LineChartLastDays = dynamic(() => import("../Charts").then((mod) => mod.LineChartLastDays));
type Exchange = {
    _source: {
        id: string;
        name: string;
        chart: {
            data: number[];
        };
        open_interest_btc: number;
        trade_volume_24h_btc: number;
        number_of_perpetual_pairs: number;
        number_of_futures_pairs: number;
        image: string;
        trust_score: number;
        trade_volume_24h_btc_normalized: number;
        symbol: string;
    };
};
export type ExchangeTableProps = {
    data: Exchange[];
    isLoading: boolean;
};
const columnHelper = createColumnHelper<Exchange>();

const columns: ColumnDef<Exchange, any>[] = [
    columnHelper.group({
        header: "#",
        columns: [
            columnHelper.accessor("_source.image", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.symbol", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("_source.name", {
        cell: (info) => info.getValue(),
        header: "Name",
    }),
    columnHelper.accessor("_source.id", {
        cell: (info) => info.getValue(),
        header: "Trust Code",
        meta: {
            center: true,
        },
    }),
    columnHelper.accessor("_source.open_interest_btc", {
        cell: (info) => info.getValue(),
        header: "Trade volume 24h(normalized)",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.trade_volume_24h_btc", {
        cell: (info) => info.getValue(),
        header: "Trade volume 24h",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.number_of_perpetual_pairs", {
        cell: (info) => info.getValue(),
        header: "Volume (7d)",
        meta: {
            center: true,
        },
    }),
];

function DifferentExchangesTable({
    data,
    isLoading,
    currentIndex = 0,
}: {
    data: Exchange[];
    isLoading: boolean;
    currentIndex?: number;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });
    const [width] = UseResize();
    return (
        <TableContainer w={"100%"}>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => {
                                if (header.depth === 2) {
                                    return;
                                }

                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        bg={"#F8FAFD"}
                                        position={index <= 1 && width <= 768 ? "sticky" : "unset"}
                                        zIndex={index <= 1 && width <= 768 ? 2 : 0}
                                        left={index === 1 ? 6 : 0}
                                        px={"8px"}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={(meta?.isNumeric || meta?.center) && "center"}
                                            flexDirection={"row"}
                                        >
                                            <p
                                                className={clsx(
                                                    "capitalize text-12 font-semibold text-typo-4 font-inter"
                                                )}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </p>

                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === "desc" ? (
                                                    <Image
                                                        src={"/assets/icons/sort-down.svg"}
                                                        alt="sort-down"
                                                        width={14}
                                                        height={14}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={"/assets/icons/sort-up.svg"}
                                                        alt="sort-up"
                                                        width={14}
                                                        height={14}
                                                    />
                                                )
                                            ) : null}
                                        </Box>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                {/* replace data */}
                <Tbody>
                    {!isLoading
                        ? table.getRowModel().rows.map((row) => {
                              return (
                                  <Tr key={row.index}>
                                      <Td
                                          px={"8px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                          className="bg-secondary text-[13px] font-medium"
                                      >
                                          {row.index + 1 + currentIndex}
                                      </Td>
                                      <Td
                                          px={"4px"}
                                          minW={"104px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={6}
                                          className="bg-secondary"
                                      >
                                          <Link
                                              href={`/exchanges/${row.original._source.id}`}
                                              className="flex items-center gap-3"
                                          >
                                              <Image
                                                  src={row.original._source.image}
                                                  alt={row.original._source.name}
                                                  width={24}
                                                  height={24}
                                              />
                                              <p className="capitalize text-sm leading-4 font-semibold text-typo-4 ">
                                                  {row.original._source.name}
                                              </p>
                                          </Link>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="uppercase text-center text-sm leading-4 font-medium ">
                                              {row.original._source.trust_score}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatQuoteCurrency(
                                                  row.original._source.trade_volume_24h_btc_normalized
                                              )}
                                              <span className="uppercase"> BTC</span>
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatQuoteCurrency(row.original._source.trade_volume_24h_btc)}
                                              <span className="uppercase"> BTC</span>
                                          </p>
                                      </Td>
                                      <Td px={"4px"} height={"80px"} display={"flex"} justifyContent={"center"}>
                                          {row.original._source.chart && (
                                              <LineChartLastDays data={row.original._source.chart.data} isUp={true} />
                                          )}
                                      </Td>
                                  </Tr>
                              );
                          })
                        : Array(8)
                              .fill(0)
                              .map((_, index) => {
                                  return (
                                      <Tr key={index}>
                                          <Td
                                              p={"4px"}
                                              minW={"104px"}
                                              position={width <= 768 ? "sticky" : undefined}
                                              left={0}
                                              bg={"#fff"}
                                          >
                                              <div className="flex items-center gap-4">
                                                  <SkeletonCircle size="5" />
                                                  <Skeleton height="10px" width={"50%"} />
                                              </div>
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="15px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="15px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="15px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"138px"}>
                                              <Skeleton height="15px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"138px"}>
                                              <Skeleton height="15px" />
                                          </Td>
                                      </Tr>
                                  );
                              })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
type DifferentExchangesProps = {
    perPage?: number;
    title?: string;
    url?: string;
};
function DifferentExchanges({ perPage = 10, title, url }: DifferentExchangesProps) {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFetchAPI(`${url}?per_page=${perPage}&page=${page}&centralized=true`);
    if (error) return `Error ${error}`;
    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };
    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full">
            {title && (
                <h1 className="text-[28px] leading-9 text-center py-8 max-lg:py-6 font-bold text-typo-4/80">{title}</h1>
            )}

            {/* Table */}
            <DifferentExchangesTable data={data} isLoading={isLoading} currentIndex={(page - 1) * perPage} />
            <div className="w-full py-4 flex justify-center">
                <TablePagination disbledPre disbledNext pageCount={100} handlePageClick={handlePageClick} />
            </div>
        </div>
    );
}

export default DifferentExchanges;

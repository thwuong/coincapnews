"use client";
import useFetchAPI from "@/api/baseAPI";
import { useTranslation } from "@/app/i18n/client";
import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import { Box, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
    ColumnDef,
    SortingState,
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TablePagination } from "../TablePagination";
const LineChartLastDays = dynamic(() => import("../Charts").then((mod) => mod.LineChartLastDays));
type Exchange = {
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
            columnHelper.accessor("image", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Exchange",
    }),
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Settlement",
        meta: {
            center: true,
        },
    }),
    columnHelper.accessor("open_interest_btc", {
        cell: (info) => info.getValue(),
        header: "24h Open Interest",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("trade_volume_24h_btc", {
        cell: (info) => info.getValue(),
        header: "24 Volume",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("number_of_perpetual_pairs", {
        cell: (info) => info.getValue(),
        header: "Perpetuals",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("number_of_futures_pairs", {
        cell: (info) => info.getValue(),
        header: "Futures",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("chart.data", {
        cell: (info) => info.getValue(),
        header: "Volume (7Days)",
        meta: {
            isNumeric: true,
        },
    }),
];

function DerivativesExchangesTable({
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
    const currentLanguage = useAppSelector((state) => state.langStore.currentLanguage);
    const { t } = useTranslation(currentLanguage);
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
                                        position={index <= 1 && width <= 768 ? "sticky" : "unset"}
                                        zIndex={index <= 1 && width <= 768 ? 2 : 0}
                                        left={index === 1 ? 6 : 0}
                                        px={"8px"}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                        className="bg-secondary"
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
                                                {t(`table.${header.column.columnDef.header}`)}
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
                                          className="bg-secondary"
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
                                              href={`/exchanges/${row.original.id}`}
                                              className="flex items-center gap-3"
                                          >
                                              <Image
                                                  src={row.original.image}
                                                  alt={row.original.name}
                                                  width={24}
                                                  height={24}
                                              />
                                              <p className="capitalize text-sm leading-4 font-semibold text-typo-4 ">
                                                  {row.original.name}
                                              </p>
                                          </Link>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="text-center text-sm leading-4 font-medium text-typo-4 ">Cash</p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(row.original.open_interest_btc)}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(row.original.trade_volume_24h_btc)}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {row.original.number_of_perpetual_pairs}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {row.original.number_of_futures_pairs}
                                          </p>
                                      </Td>
                                      <Td px={"4px"} height={"80px"} display={"flex"} justifyContent={"center"}>
                                          {row.original.chart && (
                                              <LineChartLastDays data={row.original.chart.data} isUp={true} />
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
                                              height={"80px"}
                                              minW={"104px"}
                                              position={width <= 768 ? "sticky" : undefined}
                                              left={0}
                                              className="bg-secondary"
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
                                          <Td isNumeric={true} px={"4px"} minW={"118px"}>
                                              <Skeleton height="15px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"182px"}>
                                              <Skeleton height="15px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"180px"}>
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
type DerivativesExchangesProps = {
    perPage?: number;
};
function DerivativesExchanges({ perPage = 10 }: DerivativesExchangesProps) {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useFetchAPI(`/api/derivatives?per_page=${perPage}&centralized=true`);
    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };
    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full">
            <h1 className="text-[28px] leading-9 text-center py-8 max-lg:py-6 font-bold text-typo-4/80">
                Derivatives Exchanges
            </h1>
            {/* Table */}
            <DerivativesExchangesTable data={data} isLoading={isLoading} currentIndex={(page - 1) * perPage} />
            <div className="w-full py-4 flex justify-center">
                <TablePagination disbledPre disbledNext pageCount={100} handlePageClick={handlePageClick} />
            </div>
        </div>
    );
}

export default DerivativesExchanges;

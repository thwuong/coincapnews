import useFetchAPI from "@/api/baseAPI";
import { useTranslation } from "@/app/i18n/client";
import { CoinTopType } from "@/app/types";
import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import { Box, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
    SortingState,
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const LineChartLastDays = dynamic(() => import("../Charts").then((mod) => mod.LineChartLastDays));

const columnHelper = createColumnHelper<CoinTopType>();

const columns = [
    columnHelper.group({
        header: "#",
        columns: [
            columnHelper.accessor("id", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("image", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("symbol", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("id", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Name",
    }),
    columnHelper.accessor("usd", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("usd_24h_change", {
        cell: (info) => info.getValue(),
        header: "24H",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("usd_24h_vol", {
        cell: (info) => info.getValue(),
        header: "Volume",
        meta: {
            isNumeric: true,
        },
    }),
];

export type DataTableProps = {
    data: CoinTopType[];
    isLoading: boolean;
    currentIndex?: number;
};
function GainersAndLosersTable({ data, isLoading, currentIndex = 0 }: DataTableProps) {
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
    const router = useRouter();
    const nextPage = (href: string) => {
        router.push(`/currency/${href}`);
    };
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
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
                                        className="bg-secondary cursor-pointer"
                                        position={index <= 1 && width <= 768 ? "sticky" : "unset"}
                                        zIndex={index <= 1 && width <= 768 ? 2 : 0}
                                        left={index === 1 ? 6 : 0}
                                        px={0}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={meta?.isNumeric && "end"}
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
                                                        width={12}
                                                        height={12}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={"/assets/icons/sort-up.svg"}
                                                        alt="sort-up"
                                                        width={12}
                                                        height={12}
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
                                  <Tr key={row.original.name}>
                                      <Td px={"4px"} position={width <= 768 ? "sticky" : undefined} left={0}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {row.index + 1 + currentIndex}
                                          </p>
                                      </Td>
                                      <Td
                                          p={"4px"}
                                          minW={"104px"}
                                          height={"100px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={6}
                                          className="bg-secondary"
                                      >
                                          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                                              <div
                                                  className="flex items-center gap-2 cursor-pointer"
                                                  onClick={() => {
                                                      nextPage(row.original.id);
                                                  }}
                                              >
                                                  <Image
                                                      className="cursor-pointer"
                                                      src={row.original.image}
                                                      alt={row.original.name}
                                                      width={24}
                                                      height={24}
                                                  />
                                                  <p className="capitalize text-sm leading-4 font-semibold text-typo-4 font-inter">
                                                      {row.original.name}
                                                  </p>
                                              </div>
                                          </Box>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {formatCurrency(row.original.usd, "USD", currentLanguage, {
                                                  maximumFractionDigits: 9,
                                              })}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold font-inter",
                                                  row.original.usd_24h_change > 0 ? "text-up" : "text-down"
                                              )}
                                          >
                                              {row.original.usd_24h_change?.toFixed(2)}%
                                          </p>
                                      </Td>

                                      <Td isNumeric={true} px={"4px"} minW={"118px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {formatCurrency(row.original.usd_24h_vol, "USD", currentLanguage)}
                                          </p>
                                      </Td>
                                  </Tr>
                              );
                          })
                        : Array()
                              .fill(0)
                              .map((_, index) => {
                                  return (
                                      <Tr key={index}>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="14px" w={"40px"} />
                                          </Td>
                                          <Td
                                              height={"100px"}
                                              p={"4px"}
                                              minW={"104px"}
                                              position={width <= 768 ? "sticky" : undefined}
                                              left={0}
                                          >
                                              <div className="flex items-center gap-4">
                                                  <SkeletonCircle size="5" />
                                                  <Skeleton height="14px" width={"50%"} />
                                              </div>
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                      </Tr>
                                  );
                              })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

function GainersAndLosers({ totalPage, perPage }: { totalPage: number; perPage: number }) {
    const [page, setPage] = React.useState<number>(1);

    const handlePageClick = (selectedItem: any) => {
        setPage(selectedItem.selected + 1);
    };
    const { data: dataAPI, isLoading } = useFetchAPI(
        `/api/coins/top_gainers_losers?vs_currency=usd&page=${page}&per_page=${perPage}`
    );
    return (
        <section className="w-full flex flex-col items-center">
            <div className="flex gap-10 w-full max-lg:flex-col">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-[28px] leading-9 font-bold text-typo-4/80 py-8 max-lg:px-6">Top Gainers</h2>
                    <GainersAndLosersTable data={dataAPI?.top_gainers} isLoading={isLoading} />
                </div>
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-[28px] leading-9 font-bold text-typo-4/80 py-8 max-lg:px-6">Top Losers</h2>
                    <GainersAndLosersTable data={dataAPI?.top_losers} isLoading={isLoading} />
                </div>
            </div>
        </section>
    );
}

export default GainersAndLosers;

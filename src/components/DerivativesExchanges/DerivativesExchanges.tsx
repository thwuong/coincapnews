"use client";
import useFetchAPI from "@/api/baseAPI";
import { COIN_PER_PAGE } from "@/app/contants";
import { useTranslation } from "@/app/i18n/client";
import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
const LineHighChart = dynamic(() =>
  import("../Charts").then((mod) => mod.LineHighChart)
);
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
  // columnHelper.accessor("chart.data", {
  //   cell: (info) => info.getValue(),
  //   header: "Volume (7Days)",
  //   meta: {
  //     isNumeric: true,
  //   },
  // }),
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
    data: data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const [width] = UseResize();
  const { currentLanguage, currentCurrency } = useAppSelector(
    (store) => store.globalStore
  );
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
                    className="bg-secondary cursor-pointer"
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={
                        (meta?.isNumeric || meta?.center) && "center"
                      }
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
                  <Tr
                    key={row.index}
                    className="bg-secondary duration-300"
                    _hover={{
                      bg: "gray.100",
                    }}
                    //   bg={row.original.id === "fmcpay" ? "gray.100" : "btn.50"}
                  >
                    <Td
                      px={"8px"}
                      position={width <= 768 ? "sticky" : undefined}
                      left={0}
                      className="bg-inherit text-sm"
                    >
                      {row.index + 1 + currentIndex}
                    </Td>
                    <Td
                      px={"4px"}
                      minW={"200px"}
                      maxW={"240px"}
                      position={width <= 768 ? "sticky" : undefined}
                      left={6}
                      className="bg-inherit"
                    >
                      <Link
                        href={`/derivatives/${row.original.id}`}
                        className="flex items-center gap-3"
                      >
                        <img
                          loading="lazy"
                          src={row.original.image}
                          alt={row.original.name}
                          width={24}
                          height={24}
                        />
                        <p className="capitalize text-sm leading-4 font-semibold text-typo-4 ">
                          {row.original.name}
                        </p>
                        {/* {row.original.id === "fmcpay" && (
                                                  <Badge variant="outline" colorScheme="brand" fontSize={"11px"}>
                                                      Sponsored
                                                  </Badge>
                                              )} */}
                      </Link>
                    </Td>
                    {/* <Td px={"4px"}>
                      <p className="text-center text-sm leading-4 font-medium text-typo-4 ">
                        Cash
                      </p>
                    </Td> */}
                    <Td px={"4px"}>
                      <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                        {formatCurrency(
                          row.original.open_interest_btc || 0,
                          //   currentCurrency,
                          "usd",
                          currentLanguage,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </Td>
                    <Td px={"4px"}>
                      <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                        {formatCurrency(
                          Number(row.original.trade_volume_24h_btc) || 0,
                          //   currentCurrency,
                          "usd",
                          currentLanguage,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
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
                    {/* <Td
                      px={"4px"}
                      height={"80px"}
                      minW={"180px"}
                      display={"flex"}
                      justifyContent={"center"}
                      overflow={"hidden"}
                    >
                      {row.original.chart && (
                        <LineHighChart
                          data={row.original.chart.data.map((item) =>
                            Number(item)
                          )}
                          isUp={true}
                        />
                      )}
                    </Td> */}
                  </Tr>
                );
              })
            : Array(13)
                .fill(0)
                .map((_, index) => {
                  return (
                    <Tr key={index}>
                      <Td isNumeric={true} px={"4px"} minW={"51px"}>
                        <Skeleton height="15px" />
                      </Td>
                      <Td
                        p={"4px"}
                        height={"80px"}
                        minW={"285px"}
                        position={width <= 768 ? "sticky" : undefined}
                        left={0}
                        className="bg-secondary"
                      >
                        <div className="flex items-center gap-4">
                          <SkeletonCircle size="5" />
                          <Skeleton
                            height="10px"
                            width={`${Math.floor(Math.random() * 31) + 50}%`}
                          />
                        </div>
                      </Td>

                      {/* <Td isNumeric={true} px={"4px"} minW={"103px"}>
                        <Skeleton height="15px" />
                      </Td> */}

                      <Td isNumeric={true} px={"4px"} minW={"224px"}>
                        <Skeleton height="15px" />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"288px"}>
                        <Skeleton height="15px" />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"90px"}>
                        <Skeleton height="15px" />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"96px"}>
                        <Skeleton height="15px" />
                      </Td>
                      {/* <Td isNumeric={true} px={"4px"} minW={"214px"}>
                        <Skeleton height="15px" />
                      </Td> */}
                    </Tr>
                  );
                })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function DerivativesExchanges() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetchAPI(
    `/v1/derivatives?per_page=${COIN_PER_PAGE}&centralized=true&exclude=tickers&page=${page}`
  );
  const handlePageClick = ({ selected }: { selected: number }) => {
    // setPage(selected + 1);
    setPage(page + 1);
  };
  const handlePrePage = (selectedItem: any) => {
    // setPage(selectedItem.selected + 1);
    setPage(page - 1);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      {/* Table */}
      <DerivativesExchangesTable
        data={data}
        isLoading={isLoading}
        currentIndex={(page - 1) * Number(COIN_PER_PAGE)}
      />
      <div className="w-full py-4 flex justify-center">
        <TablePagination
          currentPage={page}
          handlePrePage={handlePrePage}
          disbledPre
          disbledNext
          pageCount={100}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
}

export default DerivativesExchanges;

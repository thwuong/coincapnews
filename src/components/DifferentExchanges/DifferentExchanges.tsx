"use client";
import useFetchAPI from "@/api/baseAPI";
import { COIN_PER_PAGE } from "@/app/contants";
import { useTranslation } from "@/app/i18n/client";
import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import {
  Badge,
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
  SortingFn,
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
import TablePagination from "../TablePagination/TablePagination";
import UsePriceConversion from "@/hooks/UsePriceConversion";
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
  trust_score: number;
  trade_volume_24h_btc_normalized: number;
  symbol: string;
};
export type ExchangeTableProps = {
  data: Exchange[];
  isLoading: boolean;
};
const skipFirstRowSortingFn: SortingFn<Exchange> = (
  rowA: any,
  rowB: any,
  columnId: string
) => {
  // Skip sorting for the first row
  const check =
    rowA.original.id.includes("fmcpay") || rowB.original.id.includes("fmcpay");
  if ((rowA.index === 0 || rowB.index === 0) && check) {
    return 0;
  }
  // Your custom sorting logic here
  return rowA.original[columnId] > rowB.original[columnId]
    ? 1
    : rowA.original[columnId] < rowB.original[columnId]
    ? -1
    : 0;
};
const columnHelper = createColumnHelper<Exchange>();

const columns: ColumnDef<Exchange, any>[] = [
  columnHelper.group({
    header: "#",
    columns: [
      columnHelper.accessor("image", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("symbol", {
        cell: (info) => info.getValue(),
      }),
    ],
    meta: {
      center: true,
    },
    sortingFn: skipFirstRowSortingFn,
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
    sortingFn: skipFirstRowSortingFn,
  }),
  columnHelper.accessor("trust_score", {
    cell: (info) => info.getValue(),
    header: "Trust Code",
    meta: {
      center: true,
    },
    sortingFn: skipFirstRowSortingFn,
  }),
  columnHelper.accessor("trade_volume_24h_btc_normalized", {
    cell: (info) => info.getValue(),
    header: "Trade Volume 24h(Normalized)",
    meta: {
      isNumeric: true,
    },
    sortingFn: skipFirstRowSortingFn,
  }),
  columnHelper.accessor("trade_volume_24h_btc", {
    cell: (info) => info.getValue(),
    header: "Trade Volume 24h",
    meta: {
      isNumeric: true,
    },
    sortingFn: skipFirstRowSortingFn,
  }),
  // columnHelper.accessor("number_of_perpetual_pairs", {
  //   cell: (info) => info.getValue(),
  //   header: "Volume (7d)",
  //   meta: {
  //     center: true,
  //   },
  //   sortingFn: skipFirstRowSortingFn,
  // }),
];

function DifferentExchangesTable({
  data,
  isLoading,
  currentIndex = 0,
  features,
  currentPage,
}: {
  data: Exchange[];
  isLoading: boolean;
  currentIndex?: number;
  features: any;
  currentPage: number;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const list: Exchange[] = React.useMemo(() => {
    if (!data) return [];
    return currentPage === 1 ? [...(features || []), ...data] : data;
  }, [data, currentPage]);

  const table = useReactTable({
    columns,
    data: list,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    sortingFns: {
      skipFirstRowSortingFn,
    },
    state: {
      sorting,
    },
  });
  const [width] = UseResize();
  const { currentLanguage, currentCurrency } = useAppSelector(
    (store) => store.globalStore
  );
  const { t } = useTranslation(currentLanguage);
  const { priceByCurrentCurrency } = UsePriceConversion();

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
                    left={index === 1 ? 8 : 0}
                    px={"4px"}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
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
                    bg={row.original.id === "fmcpay" ? "gray.100" : "btn.50"}
                  >
                    <Td
                      px={"8px"}
                      position={width <= 768 ? "sticky" : undefined}
                      left={0}
                      textAlign={"center"}
                      zIndex={2}
                      className="bg-inherit text-[13px] font-medium "
                    >
                      {row.index + 1 + currentIndex}
                    </Td>
                    <Td
                      px={"4px"}
                      minW={"200px"}
                      maxW={"240px"}
                      height={"80px"}
                      position={width <= 768 ? "sticky" : undefined}
                      left={8}
                      zIndex={2}
                      className="bg-inherit"
                    >
                      <Link
                        href={`/exchanges/${row.original.id}`}
                        className="flex items-center gap-3"
                      >
                        <img
                          loading="lazy"
                          src={row.original.image}
                          alt={row.original.name}
                          width={24}
                          height={24}
                        />
                        <p className="capitalize whitespace-normal text-sm leading-4 font-semibold text-typo-4 ">
                          {row.original.name}
                        </p>
                        {row.original.id === "fmcpay" && (
                          <Badge
                            variant="outline"
                            colorScheme="brand"
                            fontSize={"11px"}
                          >
                            Sponsored
                          </Badge>
                        )}
                      </Link>
                    </Td>
                    <Td px={"4px"} minW={"97px"}>
                      <p className="uppercase text-center text-sm leading-4 font-medium ">
                        {row.original.trust_score}/10
                      </p>
                    </Td>
                    <Td px={"4px"} minW={"263px"}>
                      <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                        {formatCurrency(
                          Number(
                            row.original.trade_volume_24h_btc_normalized *
                              priceByCurrentCurrency
                          ) || 0,
                          currentCurrency,
                          currentLanguage,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits:
                              priceByCurrentCurrency.toString().length > 4
                                ? 0
                                : 6,
                          }
                        )}
                        {/* <span className="uppercase"> BTC</span> */}
                      </p>
                    </Td>
                    <Td px={"4px"} minW={"233px"}>
                      <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                        {formatCurrency(
                          Number(
                            row.original.trade_volume_24h_btc *
                              priceByCurrentCurrency
                          ) || 0,
                          currentCurrency,
                          currentLanguage,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits:
                              priceByCurrentCurrency.toString().length > 4
                                ? 0
                                : 6,
                          }
                        )}
                        {/* <span className="uppercase"> BTC</span> */}
                      </p>
                    </Td>
                    {/* <Td
                      px={"4px"}
                      display={"flex"}
                      height={"80px"}
                      justifyContent={"center"}
                      overflow={"hidden"}
                      minW={"259px"}
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
                      <Td isNumeric={true} px={"8px"} minW={"41px"}>
                        <Skeleton height="15px" />
                      </Td>
                      <Td
                        height={"80px"}
                        p={"4px"}
                        minW={"247px"}
                        position={width <= 768 ? "sticky" : undefined}
                        left={0}
                      >
                        <div className="flex items-center gap-1">
                          <SkeletonCircle size="5" />
                          <Skeleton height="10px" width={"50%"} />
                        </div>
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"120px"}>
                        <Skeleton height="15px" />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"325px"}>
                        <Skeleton height="15px" />
                      </Td>

                      <Td isNumeric={true} px={"4px"} minW={"288px"}>
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
  url?: string;
  centralized: boolean;
};
function DifferentExchanges({
  url,
  centralized = true,
}: DifferentExchangesProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useFetchAPI(
    `${url}?per_page=${COIN_PER_PAGE}&page=${page}&centralized=${centralized}&exclude=tickers,status_updates`
  );
  const { data: features } = useFetchAPI(
    `/exchanges?exclude=tickers,description&search=fmcpay`
  );

  if (error) return `Error ${error}`;
  const handlePageClick = ({ selected }: { selected: number }) => {
    // setPage(selected + 1);
    setPage(page + 1);
  };
  const handlePrePage = (selectedItem: any) => {
    // setPage(selectedItem.selected + 1);
    setPage(page - 1);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      {/* Table */}
      <DifferentExchangesTable
        data={data}
        features={centralized ? features : []}
        isLoading={isLoading}
        currentIndex={(page - 1) * Number(COIN_PER_PAGE)}
        currentPage={page}
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

export default DifferentExchanges;

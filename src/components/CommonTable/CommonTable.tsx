import { useTranslation } from "@/app/i18n/client";
import { CoinType } from "@/app/types";
import { formatCurrency } from "@/app/utils/formatCurrency";
import getNewData from "@/app/utils/getNewData";
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
const LineHighChart = dynamic(() => import("../Charts").then((mod) => mod.LineHighChart));

const columnHelper = createColumnHelper<CoinType>();

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
            columnHelper.accessor("market_cap_rank", {
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
    columnHelper.accessor("current_price", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("price_change_percentage_1h_in_currency", {
        cell: (info) => info.getValue(),
        header: "1H",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("price_change_percentage_24h_in_currency", {
        cell: (info) => info.getValue(),
        header: "24H",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("price_change_percentage_7d_in_currency", {
        cell: (info) => info.getValue(),
        header: "7D",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("volume_24h", {
        cell: (info) => info.getValue(),
        header: "Volume 24H",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("market_cap", {
        cell: (info) => info.getValue(),
        header: "Market Cap",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("sparkline_in_7d.price", {
        cell: (info) => info.getValue(),
        header: "Last 7 Days",
        meta: {
            isNumeric: true,
        },
    }),
];

export type DataTableProps = {
    data: CoinType[];
    isLoading: boolean;
    currentIndex?: number;
};
function CommonTable({ data, isLoading, currentIndex = 0 }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [scInstance, setScInstance] = React.useState<WebSocket>();
    const [stream, setStream] = React.useState<any>({});

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
        scInstance?.close();
        router.push(`/currency/${href}`);
    };
    // React.useEffect(() => {
    //     const socket = connectSocket();
    //     function onConnect(this: WebSocket) {
    //         setScInstance(this);
    //     }

    //     function onDisconnect() {}
    //     function getMessage(this: WebSocket, ev: MessageEvent<any>) {
    //         const streamData = JSON.parse(ev.data);
    //         setStream((preStream: any) => ({
    //             ...preStream,
    //             [streamData.data.s]: {
    //                 price: parseFloat(streamData.data.c),
    //                 change24: parseFloat(streamData.data.P),
    //             },
    //         }));
    //     }

    //     socket.onopen = onConnect;
    //     socket.onmessage = getMessage;

    //     return () => {
    //         socket.onclose = onConnect;
    //         socket.onclose = onDisconnect;
    //         socket.close();
    //     };
    // }, []);
    const { currentLanguage, currentCurrency } = useAppSelector((state) => state.globalStore);
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
                                        px={"4px"}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={meta?.isNumeric && "center"}
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
                              let convertId = `${row.original.symbol}USDT`.toLocaleUpperCase();

                              return (
                                  <Tr
                                      key={row.original.name}
                                      className="bg-secondary duration-300"
                                      _hover={{
                                          bg: "gray.100",
                                      }}
                                  >
                                      <Td
                                          px={"4px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                          className="bg-inherit"
                                      >
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {row.index + 1 + currentIndex}
                                          </p>
                                      </Td>
                                      <Td
                                          p={"4px"}
                                          minW={"200px"}
                                          maxW={"240px"}
                                          height={"100px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={6}
                                          className="bg-inherit"
                                      >
                                          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                                              <div
                                                  className="flex items-center gap-2 cursor-pointer "
                                                  onClick={() => {
                                                      nextPage(row.original.id);
                                                  }}
                                              >
                                                  <img
                                                      loading="lazy"
                                                      className="cursor-pointer"
                                                      src={row.original.image}
                                                      alt={row.original.name}
                                                      width={24}
                                                      height={24}
                                                  />
                                                  <p className="capitalize  whitespace-normal text-sm leading-4 font-semibold text-typo-4 font-inter">
                                                      {row.original.name}
                                                  </p>
                                              </div>
                                          </Box>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p className="capitalize text-sm leading-4 text-center font-semibold text-typo-1 font-inter">
                                              {formatCurrency(
                                                  getNewData(stream[convertId]?.price, row.original.current_price),
                                                  currentCurrency,
                                                  currentLanguage,
                                                  {
                                                      maximumFractionDigits: 8,
                                                  }
                                              )}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold text-center font-inter",
                                                  getNewData(
                                                      stream[convertId]?.change24,
                                                      row.original.price_change_percentage_1h_in_currency
                                                  ) > 0
                                                      ? "text-up"
                                                      : "text-down"
                                              )}
                                          >
                                              {row.original.price_change_percentage_1h_in_currency?.toFixed(2)}%
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold text-center font-inter",
                                                  row.original.price_change_percentage_24h_in_currency > 0
                                                      ? "text-up"
                                                      : "text-down"
                                              )}
                                          >
                                              {row.original.price_change_percentage_24h_in_currency?.toFixed(2)}%
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold text-center font-inter",
                                                  row.original.price_change_percentage_7d_in_currency > 0
                                                      ? "text-up"
                                                      : "text-down"
                                              )}
                                          >
                                              {row.original.price_change_percentage_7d_in_currency?.toFixed(2)}%
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"} minW={"138px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-center text-typo-1 font-inter">
                                              {formatCurrency(
                                                  row.original.market_cap || 0,
                                                  currentCurrency,
                                                  currentLanguage,
                                                  {
                                                      maximumFractionDigits: 3,
                                                      minimumFractionDigits: 0,
                                                  }
                                              )}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"} minW={"118px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-center text-typo-1 font-inter">
                                              {formatCurrency(
                                                  row.original.total_volume || 0,
                                                  currentCurrency,
                                                  currentLanguage,
                                                  {
                                                      maximumFractionDigits: 3,
                                                      minimumFractionDigits: 0,
                                                  }
                                              )}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"} minW={"180px"} overflow={"hidden"}>
                                          <Box display={"flex"} justifyContent={"center"}>
                                              <LineHighChart
                                                  isUp={row.original.price_change_percentage_7d_in_currency > 0}
                                                  data={row.original.sparkline_in_7d.price}
                                              />
                                          </Box>
                                      </Td>
                                  </Tr>
                              );
                          })
                        : Array(10)
                              .fill(0)
                              .map((_, index) => {
                                  return (
                                      <Tr key={index}>
                                          <Td isNumeric={true} px={"4px"} minW={"34px"}>
                                              <Skeleton height="14px" w={"14px"} />
                                          </Td>
                                          <Td
                                              height={"100px"}
                                              p={"4px"}
                                              minW={"316px"}
                                              position={width <= 768 ? "sticky" : undefined}
                                              left={6}
                                          >
                                              <div className="flex items-center gap-4">
                                                  <SkeletonCircle size="5" />
                                                  <Skeleton
                                                      height="14px"
                                                      width={`${Math.floor(Math.random() * 31) + 50}%`}
                                                  />
                                              </div>
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"127px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"74px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"85px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"85px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"196px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"167px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"256px"}>
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

export default CommonTable;

import { formatCurrency, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import getNewData from "@/app/utils/getNewData";
import UseResize from "@/hooks/UseResize";
import { connectSocket } from "@/socket/client";
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
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CoinType } from "@/app/types";
import { useAppSelector } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";
const LineChartLastDays = dynamic(() => import("../Charts").then((mod) => mod.LineChartLastDays));

const columnHelper = createColumnHelper<CoinType>();

const columns = [
    columnHelper.group({
        header: "#",
        columns: [
            columnHelper.accessor("_source.id", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.image", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.market_cap_rank", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.id", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("_source.name", {
        cell: (info) => info.getValue(),
        header: "Name",
    }),
    columnHelper.accessor("_source.current_price", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.price_change_percentage_1h_in_currency", {
        cell: (info) => info.getValue(),
        header: "1H",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.price_change_percentage_24h_in_currency", {
        cell: (info) => info.getValue(),
        header: "24H",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.price_change_percentage_7d_in_currency", {
        cell: (info) => info.getValue(),
        header: "7D",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.volume_24h", {
        cell: (info) => info.getValue(),
        header: "Volume 24H",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.market_cap", {
        cell: (info) => info.getValue(),
        header: "Market Cap",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.sparkline_in_7d.price", {
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
    const { currentLanguage } = useAppSelector((state) => state.langStore);
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
                                        className="bg-secondary"
                                        position={index === 0 && width <= 768 ? "sticky" : "unset"}
                                        zIndex={index === 0 && width <= 768 ? 2 : 0}
                                        left={0}
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
                              let convertId = `${row.original._source.symbol}USDT`.toLocaleUpperCase();

                              return (
                                  <Tr key={row.original._source.name}>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {row.index + 1 + currentIndex}
                                          </p>
                                      </Td>
                                      <Td
                                          p={"4px"}
                                          minW={"104px"}
                                          height={"100px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                          className="bg-secondary"
                                      >
                                          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                                              <div
                                                  className="flex items-center gap-2 cursor-pointer"
                                                  onClick={() => {
                                                      nextPage(row.original._source.id);
                                                  }}
                                              >
                                                  <Image
                                                      className="cursor-pointer"
                                                      src={row.original._source.image}
                                                      alt={row.original._source.name}
                                                      width={24}
                                                      height={24}
                                                  />
                                                  <p className="capitalize text-sm leading-4 font-semibold text-typo-4 font-inter">
                                                      {row.original._source.name}
                                                  </p>
                                              </div>
                                          </Box>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {formatCurrency(
                                                  getNewData(
                                                      stream[convertId]?.price,
                                                      row.original._source.current_price
                                                  )
                                              )}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold font-inter",
                                                  getNewData(
                                                      stream[convertId]?.change24,
                                                      row.original._source.price_change_percentage_1h_in_currency
                                                  ) > 0
                                                      ? "text-up"
                                                      : "text-down"
                                              )}
                                          >
                                              {getNewData(
                                                  stream[convertId]?.change24,
                                                  row.original._source.price_change_percentage_1h_in_currency
                                              ).toFixed(2)}
                                              %
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold font-inter",
                                                  row.original._source.price_change_percentage_24h_in_currency > 0
                                                      ? "text-up"
                                                      : "text-down"
                                              )}
                                          >
                                              {row.original._source.price_change_percentage_24h_in_currency.toFixed(2)}%
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold font-inter",
                                                  row.original._source.price_change_percentage_7d_in_currency > 0
                                                      ? "text-up"
                                                      : "text-down"
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
                          })
                        : Array(8)
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
                                          <Td isNumeric={true} px={"4px"} minW={"138px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"118px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"182px"}>
                                              <Skeleton height="14px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"180px"}>
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

"use client";
import useFetchAPI from "@/api/baseAPI";
import { NewDataType } from "@/app/types";
import {
  formatCurrency,
  formatQuoteCurrency,
} from "@/app/utils/formatCurrency";
import getNewData from "@/app/utils/getNewData";
import { useAppSelector } from "@/lib/hooks";
import {
  Box,
  Button,
  NumberInput,
  NumberInputField,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
// import TradingViewWidget from "../Charts/TradingViewWidget";
import { useTranslation } from "@/app/i18n/client";
import { SpinnerLoading } from "../Loading";
const LineChartOverview = dynamic(() =>
  import("../Charts/").then((mod) => mod.LineChartOverview)
);
const TradingViewWidget = dynamic(() =>
  import("../Charts/").then((mod) => mod.TradingViewWidget)
);
type OverviewProps = {
  description: any;
  name: string;
  symbol: string;
  id: string;
  market_data: {
    total_volume: any;
    low_24h: any;
    high_24h: any;
    price_change_percentage_24h_in_currency: any;
    price_change_percentage_7d_in_currency: any;
    price_change_percentage_30d_in_currency: any;
    price_change_percentage_60d_in_currency: any;
    price_change_percentage_200d_in_currency: any;
    price_change_percentage_1y_in_currency: any;
    current_price: any;
    price_change_24h_in_currency: any;
    market_cap: any;
    fully_diluted_valuation: any;
    market_cap_change_percentage_24h: number;
    ath: any;
    atl: any;
    atl_change_percentage: any;
    ath_change_percentage: any;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
  };
  market_cap_rank: number;
};
function Overview({
  overviewData,
  newData,
}: {
  overviewData: OverviewProps;
  newData: NewDataType | any;
}) {
  const [tabActive, setTabActive] = useState("price");
  const [datetime, setDatetime] = useState("1");
  const [isMore, setIsMore] = useState(false);
  const [amount, setAmount] = useState<number>();
  const [readMore, setReadMore] = useState(false);
  const descHeight = useRef<any>();

  const { currentLanguage, currentCurrency } = useAppSelector(
    (state) => state.globalStore
  );

  const { data, isLoading } = useFetchAPI(
    `/api/coins/market_chart/${overviewData.id}?vs_currency=usd&days=${datetime}`
  );
  const {
    data: coinDetail,
  }: {
    data: {
      price_change_percentage_24h_in_currency: any;
      price_change_percentage_7d_in_currency: any;
      price_change_percentage_30d_in_currency: any;
      price_change_percentage_60d_in_currency: any;
      price_change_percentage_200d_in_currency: any;
      price_change_percentage_1y_in_currency: any;
    };
  } = useFetchAPI(
    `/api/coins/markets/${overviewData.id}?exclude=sparkline_in_7d`
  );
  const result = React.useMemo(() => {
    if (!amount || !overviewData.market_data) return;

    return Number(newData?.price) * amount;
  }, [amount, newData]);
  const { t } = useTranslation(currentLanguage);
  const getPriceByTime: any = {
    "1": coinDetail?.price_change_percentage_24h_in_currency,
    "7": coinDetail?.price_change_percentage_7d_in_currency,
    "30": coinDetail?.price_change_percentage_30d_in_currency,
    "90": coinDetail?.price_change_percentage_60d_in_currency,
    "180": coinDetail?.price_change_percentage_200d_in_currency,
    "365":
      overviewData?.market_data?.price_change_percentage_1y_in_currency?.usd,
  };
  return (
    <section className="grid grid-cols-12 gap-5 w-full max-lg:grid-cols-1">
      {/* Chart */}
      <div className="col-span-8 flex flex-col mt-8 gap-4 max-lg:col-span-1">
        <h3 className="text-[20px] leading-8 font-bold text-[rgb(85,85,85)] capitalize">
          {overviewData.id} Chart
        </h3>
        <div className="flex items-center justify-between w-full flex-wrap gap-4">
          <div className="flex items-center p-1 rounded-lg bg-primary-3 gap-2 w-fit max-md:w-full">
            <Button
              className="w-fit max-md:w-full"
              onClick={() => setTabActive("price")}
              height={"min-content"}
              _hover={{
                bg: "white",
              }}
              bg={tabActive === "price" ? "white" : ""}
            >
              <span className="text-black font-semibold leading-[30px] text-13">
                {t("price")}
              </span>
            </Button>
            {overviewData.symbol !== "payn" && (
              <Button
                className="w-fit max-md:w-full"
                onClick={() => setTabActive("trading")}
                height={"min-content"}
                _hover={{
                  bg: "white",
                }}
                bg={tabActive === "trading" ? "white" : ""}
              >
                <span className="text-black font-semibold leading-[30px] text-13">
                  {t("trading_view")}
                </span>
              </Button>
            )}
          </div>
          {tabActive === "price" && (
            <div className="flex items-center p-1 rounded-lg bg-primary-3 gap-2 w-fit max-md:w-full">
              <Button
                className="w-fit max-md:w-full"
                onClick={() => setDatetime("1")}
                height={"min-content"}
                _hover={{
                  bg: "white",
                }}
                bg={datetime === "1" ? "white" : ""}
              >
                <span className="text-black font-semibold leading-[30px] text-13">
                  1D
                </span>
              </Button>
              <Button
                className="w-fit max-md:w-full"
                onClick={() => setDatetime("7")}
                height={"min-content"}
                _hover={{
                  bg: "white",
                }}
                bg={datetime === "7" ? "white" : ""}
              >
                <span className="text-black font-semibold leading-[30px] text-13">
                  7D
                </span>
              </Button>
              <Button
                className="w-fit max-md:w-full"
                onClick={() => setDatetime("14")}
                height={"min-content"}
                _hover={{
                  bg: "white",
                }}
                bg={datetime === "14" ? "white" : ""}
              >
                <span className="text-black font-semibold leading-[30px] text-13">
                  14D
                </span>
              </Button>
              <Button
                className="w-fit max-md:w-full"
                onClick={() => setDatetime("30")}
                height={"min-content"}
                _hover={{
                  bg: "white",
                }}
                bg={datetime === "30" ? "white" : ""}
              >
                <span className="text-black font-semibold leading-[30px] text-13">
                  1M
                </span>
              </Button>
              <Button
                className="w-fit max-md:w-full"
                onClick={() => setDatetime("180")}
                height={"min-content"}
                _hover={{
                  bg: "white",
                }}
                bg={datetime === "180" ? "white" : ""}
              >
                <span className="text-black font-semibold leading-[30px] text-13">
                  6M
                </span>
              </Button>
              <Button
                className="w-fit max-md:w-full"
                onClick={() => setDatetime("365")}
                height={"min-content"}
                _hover={{
                  bg: "white",
                }}
                bg={datetime === "365" ? "white" : ""}
              >
                <span className="text-black font-semibold leading-[30px] text-13">
                  1Y
                </span>
              </Button>
            </div>
          )}
        </div>
        {isLoading && <SpinnerLoading />}
        {data && tabActive === "price" && (
          <LineChartOverview
            data={data?.prices}
            isUp={Number(getPriceByTime[datetime]) > 0}
          />
        )}
        {tabActive === "trading" && (
          <section className="h-[610px] overflow-hidden">
            <TradingViewWidget symbol={overviewData.symbol} />
          </section>
        )}
        {/* About coin */}
        {overviewData.description && (
          <div className="py-6 flex flex-col gap-5">
            <h2 className="text-[25px] font-bold text-typo-4">{`${t("about")} ${
              overviewData.name
            }`}</h2>
            <div
              ref={descHeight}
              className={clsx(
                "text-base text-typo-1 leading-[26px] overflow-hidden relative",
                descHeight?.current?.clientHeight >= 300
                  ? "h-[300px]"
                  : "h-auto",
                readMore && "h-auto"
              )}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    overviewData.description[currentLanguage] ||
                    overviewData.description["en"],
                }}
                id="description"
              ></div>
              {descHeight?.current?.clientHeight >= 300 && !readMore && (
                <div className="absolute bottom-0 h-40 w-full bg-gradient-to-b from-white/0 to-[#f8fafd]"></div>
              )}
            </div>

            {descHeight?.current?.clientHeight >= 300 && (
              <Button
                onClick={() => setReadMore(!readMore)}
                width={"min-content"}
                height={"fit-content"}
                py={"8px"}
              >
                <span className="font-semibold text-sm text-primary-1 duration-300">
                  {readMore ? t("read_less") : t("read_more")}
                </span>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="col-span-4 flex flex-col mt-12 gap-6 max-lg:col-span-1">
        <div className="rounded-2xl border border-[rgb(239,242,245)] overflow-hidden">
          <Box
            className="py-5 px-4 flex items-center justify-between gap-4"
            bg={"white"}
          >
            <p className="font-semibold text-sm text-black uppercase">
              {overviewData.symbol}
            </p>
            <NumberInput>
              <NumberInputField
                px={"0px"}
                _focusVisible={{
                  boxShadow: "none",
                }}
                border={"none"}
                outline={"none"}
                textAlign={"right"}
                className="font-bold"
                fontSize={"18px"}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="0"
              />
            </NumberInput>
          </Box>
          <Box
            className="py-5 px-4 flex items-center justify-between gap-4 "
            bg={"#F8FAFD"}
          >
            <p className="font-semibold text-sm text-black uppercase">USD</p>
            <p className="font-bold text-lg min-h-10 truncate">
              {result
                ? formatCurrency(result, currentCurrency, currentLanguage)
                : ""}
            </p>
          </Box>
        </div>
        {/* Price Status */}
        <div className="rounded-lg bg-[#edf2f7] p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-typo-4">
            <span className="uppercase">{overviewData.symbol}</span>{" "}
            {t("price_status")}
          </h2>
          <ul
            className={clsx(
              "flex flex-col gap-6 overflow-hidden",
              isMore ? "h-auto" : "h-[430px]"
            )}
          >
            {/* Bitcoin Price Today */}
            <li className="flex flex-col">
              <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                {`${overviewData.name} ${t("price_today")}`}
              </h6>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{`${overviewData.name} ${t(
                  "price"
                )}`}</p>
                <p className="font-semibold text-sm">
                  {formatCurrency(
                    getNewData(
                      newData?.price,
                      overviewData.market_data?.current_price?.usd
                    ),
                    currentCurrency,
                    currentLanguage,
                    {
                      maximumFractionDigits: 8,
                    }
                  )}
                </p>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("trading_volume")}</p>
                <p className="font-semibold text-sm">
                  {formatCurrency(
                    overviewData.market_data.total_volume?.usd || 0,
                    currentCurrency,
                    currentLanguage
                  )}
                </p>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm ">{t("price_change_24h")}</p>
                <Stat className="text-right">
                  <StatNumber>
                    <p className="font-semibold text-sm">
                      {formatCurrency(
                        overviewData.market_data?.price_change_24h_in_currency
                          ?.usd || 0,
                        currentCurrency,
                        currentLanguage
                      )}
                    </p>
                  </StatNumber>
                  <StatHelpText
                    fontSize={"12px"}
                    fontWeight={"600"}
                    className={
                      getNewData(
                        newData?.change24,
                        overviewData.market_data
                          ?.market_cap_change_percentage_24h || 0
                      ) > 0
                        ? "text-up"
                        : "text-down"
                    }
                  >
                    <StatArrow
                      type={
                        getNewData(
                          newData?.change24,
                          overviewData.market_data
                            ?.market_cap_change_percentage_24h || 0
                        ) > 0
                          ? "increase"
                          : "decrease"
                      }
                      w={"8px"}
                      h={"8px"}
                    />
                    {getNewData(
                      newData?.change24,
                      overviewData.market_data
                        ?.market_cap_change_percentage_24h || 0
                    )?.toFixed(2)}
                    %
                  </StatHelpText>
                </Stat>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("24h_low_24h_high")}</p>
                <p className="font-semibold text-sm">
                  {formatCurrency(
                    overviewData.market_data?.low_24h?.usd || 0,
                    currentCurrency,
                    currentLanguage
                  )}{" "}
                  {" / "}
                  {formatCurrency(
                    overviewData.market_data?.high_24h?.usd || 0,
                    currentCurrency,
                    currentLanguage
                  )}
                </p>
              </Box>
              {/* <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm  ">{t("volume_market_cap")}</p>
                                <p className="font-semibold text-sm">
                                    {formatQuoteCurrency(
                                        overviewData.market_data?.market_cap?.usd || 0
                                    )}
                                </p>
                            </Box> */}
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("market_rank")}</p>
                <p className="font-semibold text-sm">
                  #{overviewData.market_cap_rank}
                </p>
              </Box>
            </li>
            {/* BitcoinMarket Cap */}
            <li className="flex flex-col">
              <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                {`${overviewData.name} ${t("market_cap")}`}
              </h6>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("market_cap")}</p>
                <p className="font-semibold text-sm">
                  {formatCurrency(
                    overviewData.market_data?.market_cap?.usd || 0,
                    currentCurrency,
                    currentLanguage
                  )}
                </p>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm ">
                  {t("fully_diluted_market_cap")}
                </p>
                <p className="font-semibold text-sm">
                  {formatCurrency(
                    overviewData?.market_data?.fully_diluted_valuation?.usd ||
                      0,
                    currentCurrency,
                    currentLanguage
                  )}
                </p>
              </Box>
            </li>
            {/* Bitcoin Price Yesterday */}
            <li className="flex flex-col">
              <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                {`${overviewData.name} ${t("price_yesterday")}`}
              </h6>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">
                  {t("yesterday_low_high")}
                </p>
                <p className="font-semibold text-sm">
                  {formatCurrency(
                    overviewData.market_data?.low_24h?.usd || 0,
                    currentCurrency,
                    currentLanguage
                  )}
                  {"/"}
                  {formatCurrency(
                    overviewData.market_data?.high_24h?.usd || 0,
                    currentCurrency,
                    currentLanguage
                  )}
                </p>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("yesterday_change")}</p>
                <Stat className="text-right">
                  <StatHelpText
                    fontSize={"12px"}
                    fontWeight={"600"}
                    className={
                      overviewData.market_data
                        ?.market_cap_change_percentage_24h > 0
                        ? "text-up"
                        : "text-down"
                    }
                  >
                    <StatArrow
                      type={
                        overviewData.market_data
                          ?.market_cap_change_percentage_24h > 0
                          ? "increase"
                          : "decrease"
                      }
                      w={"8px"}
                      h={"8px"}
                    />
                    {overviewData.market_data.market_cap_change_percentage_24h?.toFixed(
                      2
                    )}
                    %
                  </StatHelpText>
                </Stat>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("yesterday_volume")}</p>
                <p className="font-semibold text-sm">
                  {formatCurrency(
                    overviewData.market_data?.market_cap?.usd || 0,
                    currentCurrency,
                    currentLanguage
                  )}
                </p>
              </Box>
            </li>
            {/* BitcoinPrice History */}
            <li className="flex flex-col">
              <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">
                {`${overviewData.name} ${t("price_history")}`}
              </h6>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("ath")}</p>
                <Stat className="text-right">
                  <StatNumber>
                    <p className="font-semibold text-sm">
                      {formatCurrency(
                        overviewData.market_data.ath?.usd || 0,
                        currentCurrency,
                        currentLanguage
                      )}
                    </p>
                  </StatNumber>
                  <StatHelpText
                    fontSize={"12px"}
                    fontWeight={"600"}
                    className={
                      overviewData.market_data.ath_change_percentage?.usd > 0
                        ? "text-up"
                        : "text-down"
                    }
                  >
                    <StatArrow
                      type={
                        overviewData.market_data.ath_change_percentage?.usd > 0
                          ? "increase"
                          : "decrease"
                      }
                      w={"8px"}
                      h={"8px"}
                    />
                    {formatQuoteCurrency(
                      overviewData.market_data.ath_change_percentage?.usd?.toFixed(
                        2
                      )
                    )}
                    %
                  </StatHelpText>
                </Stat>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("atl")}</p>
                <Stat className="text-right">
                  <StatNumber>
                    <p className="font-semibold text-sm">
                      {formatCurrency(
                        overviewData.market_data.atl?.usd || 0,
                        currentCurrency,
                        currentLanguage
                      )}
                    </p>
                  </StatNumber>
                  <StatHelpText
                    fontSize={"12px"}
                    fontWeight={"600"}
                    className={
                      overviewData.market_data.atl_change_percentage?.usd > 0
                        ? "text-up"
                        : "text-down"
                    }
                  >
                    <StatArrow
                      type={
                        overviewData.market_data.atl_change_percentage?.usd > 0
                          ? "increase"
                          : "decrease"
                      }
                      w={"8px"}
                      h={"8px"}
                    />
                    {formatQuoteCurrency(
                      overviewData.market_data.atl_change_percentage?.usd?.toFixed(
                        2
                      )
                    )}
                    %
                  </StatHelpText>
                </Stat>
              </Box>
              {/* <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                                <p className="text-typo-1 text-sm  ">{overviewData.name} ROI</p>
                                <Stat className="text-right">
                                    <StatHelpText
                                        fontSize={"12px"}
                                        fontWeight={"600"}
                                        className={10 > 0 ? "text-up" : "text-down"}
                                    >
                                        <StatArrow type="increase" w={"8px"} h={"8px"} />
                                        9.05%
                                    </StatHelpText>
                                </Stat>
                            </Box> */}
            </li>
            {/* Bitcoin Supply */}
            <li className="flex flex-col">
              <h6 className="font-bold text-[13.6px] text-typo-4/80 pb-3">{`${
                overviewData.name
              } ${t("supply")}`}</h6>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">
                  {t("circulating_supply")}
                </p>
                <p className="font-semibold text-sm">
                  {formatQuoteCurrency(
                    overviewData.market_data.circulating_supply || 0
                  )}
                </p>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("total_supply")}</p>
                <p className="font-semibold text-sm">
                  {formatQuoteCurrency(
                    overviewData.market_data.total_supply || 0
                  )}
                </p>
              </Box>
              <Box className="py-3 flex items-center justify-between gap-4 border-dashed border-t-[0.8px] border-black/[0.08]">
                <p className="text-typo-1 text-sm  ">{t("max_supply")}</p>
                <p className="font-semibold text-sm">
                  {formatQuoteCurrency(
                    overviewData.market_data.max_supply || 0
                  )}
                </p>
              </Box>
            </li>
          </ul>
          <Button onClick={() => setIsMore(!isMore)} bg={"rgba(0, 0, 0, 0.04)"}>
            <span className="font-medium text-sm text-typo-4 duration-300">
              {isMore ? t("show_less") : t("show_more")}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Overview;

import { useTranslation } from "@/app/i18n/client";
import { DetailCoinType, NewDataType } from "@/app/types";
import { useAppSelector } from "@/lib/hooks";
import {
  Button,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ShareModal } from "../Modal";
import { Overview } from "../Overview";
import { TablePagination } from "../TablePagination";
const ExchangeTable = dynamic(() =>
  import("../ExchangeTable").then((mod) => mod.ExchangeTable)
);
function DetailTabs({
  coinData,
  newData,
}: {
  coinData: DetailCoinType;
  newData: NewDataType;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selected, setSelected] = useState(10);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const handlePageClick = ({ selected }: { selected: number }) => {
    // setPage(selected + 1);
    setPage(page + 1);
  };
  const handlePrePage = (selectedItem: any) => {
    // setPage(selectedItem.selected + 1);
    setPage(page - 1);
  };
  const currentLanguage = useAppSelector(
    (state) => state.globalStore.currentLanguage
  );
  const { t } = useTranslation(currentLanguage);
  const exchanges = useMemo(() => {
    if (!coinData.tickers) return null;
    return coinData.tickers.filter((item) =>
      item.market.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );
  }, [coinData.tickers, keyword]);
  return (
    <section className="py-10 flex flex-col gap-8 w-full">
      <Tabs variant="unstyled">
        <TabList
          gap={"4px"}
          borderBlock={"1px solid rgb(239, 242, 245)"}
          py={"12px"}
          className="overflow-x-auto"
        >
          <Tab
            _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
            className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit hover:bg-[#0000000a]"
            py={"4px"}
          >
            <span className="text-13 ">{t("overview")}</span>
          </Tab>
          <Tab
            _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
            py={"4px"}
            className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit hover:bg-[#0000000a]"
          >
            <span className="text-13 ">Market</span>
          </Tab>
          <Tab
            _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
            py={"4px"}
            className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit hover:bg-[#0000000a]"
          >
            <span className="text-13 ">{t("socials")}</span>
          </Tab>
          <Tab
            _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
            py={"4px"}
            className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit hover:bg-[#0000000a]"
          >
            <span className="text-13 ">{t("ratings")}</span>
          </Tab>
          <Tab
            _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
            py={"4px"}
            className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit hover:bg-[#0000000a]"
          >
            <span className="text-13 ">{t("analysis")}</span>
          </Tab>
          <Button
            className="max-lg:!absolute max-lg:right-0 max-lg:top-0 max-lg:translate-y-1/2"
            ml={"auto"}
            size={"sm"}
            onClick={() => onOpen()}
          >
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/icons/share.svg"}
                alt="share"
                width={16}
                height={16}
              />
              <span className="text-black font-semibold text-13 max-lg:hidden">
                {t("share")}
              </span>
            </div>
          </Button>
        </TabList>
        <TabPanels>
          <TabPanel p={"0px"}>
            <Overview overviewData={coinData} newData={newData} />
          </TabPanel>
          <TabPanel p={"20px 0"}>
            <h4 className="text-[20px] text-typo-4/80 leading-[25px] font-bold">
              Markets / Exchanges
            </h4>
            <div className="flex w-full justify-between py-5">
              <Input
                placeholder="Search"
                border={"none"}
                bg={"rgb(0,0,0,0.04)"}
                w={"200px"}
                borderRadius={"99px"}
                fontSize={"14px"}
                className="font-semibold text-typo-4"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <Select
                defaultValue={selected}
                w={"fit-content"}
                bg={"rgb(0,0,0,0.04)"}
                border={"none"}
                borderRadius={"8px"}
                fontSize={"14px"}
                onChange={(e) => setSelected(Number(e.target.value))}
                className="font-semibold text-typo-4"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Select>
            </div>
            {exchanges && (
              <ExchangeTable
                data={exchanges?.slice((page - 1) * selected, selected * page)}
                isLoading={false}
                currentIndex={(page - 1) * selected}
              />
            )}

            {exchanges && exchanges?.length / selected > 1 && (
              <div className="w-full py-4 flex justify-center">
                <TablePagination
                  handlePrePage={handlePrePage}
                  currentPage={page}
                  disbledPre
                  disbledNext
                  pageCount={exchanges?.length / selected}
                  disabled={page * selected - exchanges.length >= 0}
                  handlePageClick={handlePageClick}
                />
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ShareModal
        image={coinData.image?.large}
        newData={newData}
        oldData={coinData?.market_data.current_price["usd"]}
        symbol={coinData.symbol}
        isOpen={isOpen}
        onClose={onClose}
      />
    </section>
  );
}

export default DetailTabs;

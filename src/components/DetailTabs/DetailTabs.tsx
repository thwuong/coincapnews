import { Button, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ShareModal } from "../Modal";
import Overview from "../Overview/Overview";
const ExchangeTable = dynamic(() => import("../ExchangeTable").then((mod) => mod.ExchangeTable));
function DetailTabs() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <section className="py-10 flex flex-col gap-8 w-full">
            <Tabs variant="unstyled" defaultIndex={1}>
                <TabList
                    gap={"4px"}
                    borderBlock={"1px solid rgb(239, 242, 245)"}
                    py={"12px"}
                    className="overflow-x-auto"
                >
                    <Tab
                        _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
                        className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit"
                        py={"4px"}
                    >
                        <span className="text-13 ">Overview</span>
                    </Tab>
                    <Tab
                        _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
                        py={"4px"}
                        className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit"
                    >
                        <span className="text-13 ">Market</span>
                    </Tab>
                    <Tab
                        _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
                        py={"4px"}
                        className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit"
                    >
                        <span className="text-13 ">Socials</span>
                    </Tab>
                    <Tab
                        _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
                        py={"4px"}
                        className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit"
                    >
                        <span className="text-13 ">Ratings</span>
                    </Tab>
                    <Tab
                        _selected={{ color: "#fff", bg: "rgb(56,97,251)" }}
                        py={"4px"}
                        className=" text-black font-semibold rounded-lg leading-[30px] px-4  h-fit"
                    >
                        <span className="text-13 ">Analysis</span>
                    </Tab>
                    <Button
                        className="max-lg:!absolute max-lg:right-0 max-lg:top-0 max-lg:translate-y-1/2"
                        ml={"auto"}
                        size={"sm"}
                        onClick={() => onOpen()}
                    >
                        <div className="flex items-center gap-2">
                            <Image src={"/assets/icons/share.svg"} alt="share" width={16} height={16} />
                            <span className="text-black font-semibold text-13 max-lg:hidden">Share</span>
                        </div>
                    </Button>
                </TabList>
                <TabPanels>
                    <TabPanel p={"0px"}>
                        <Overview />
                    </TabPanel>
                    <TabPanel p={"20px 0"}>
                        <h4 className="text-[20px] text-typo-4/80 leading-[25px] font-bold">Markets / Exchanges</h4>
                        <div className="flex w-full justify-between py-5">
                            <Input
                                placeholder="Search"
                                border={"none"}
                                bg={"rgb(0,0,0,0.04)"}
                                w={"200px"}
                                borderRadius={"99px"}
                                fontSize={"14px"}
                                className="font-semibold text-typo-4"
                            />
                            <Select
                                defaultValue={"10"}
                                w={"fit-content"}
                                bg={"rgb(0,0,0,0.04)"}
                                border={"none"}
                                borderRadius={"8px"}
                                fontSize={"14px"}
                                className="font-semibold text-typo-4"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Select>
                        </div>
                        <ExchangeTable
                            data={[
                                {
                                    name: "Exchange",
                                    pair: "BTC/USDT",
                                    price: 61522,
                                    volume: 788284681,
                                    update: "Recently",
                                },
                            ]}
                            isLoading={false}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <ShareModal isOpen={isOpen} onClose={onClose} />
        </section>
    );
}

export default DetailTabs;

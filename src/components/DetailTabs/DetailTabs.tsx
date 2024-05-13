import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from "@chakra-ui/react";
import Image from "next/image";
import Overview from "../Overview/Overview";
function DetailTabs() {
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
                    <TabPanel p={"0px"}>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </section>
    );
}

export default DetailTabs;

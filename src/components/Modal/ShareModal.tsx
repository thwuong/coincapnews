"use clien";
import { NewDataType } from "@/app/types";
import { formatCurrency } from "@/app/utils/formatCurrency";
import getNewData from "@/app/utils/getNewData";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
type ShareModalProps = {
    isOpen: boolean;
    onClose: () => void;
    newData: NewDataType | any;
    oldData: number;
    symbol?: string;
};
function ShareModal({ isOpen, onClose, newData, oldData, symbol }: ShareModalProps) {
    const [currentUrl, setCurrentUrl] = useState("");
    useEffect(() => {
        if (typeof window !== undefined) {
            setCurrentUrl(window.location.href);
        }
    }, []);

    return (
        <Modal
            scrollBehavior={"inside"}
            size={"md"}
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent borderRadius={"16px"}>
                <ModalCloseButton />
                <ModalBody>
                    <div className="flex flex-col items-center justify-center gap-6 pt-16 pb-4">
                        <Image src={"/assets/images/bitcoin.webp"} alt="bitcoin" width={80} height={80} />
                        <div className="flex flex-col gap-4 text-center">
                            <h2 className="text-2xl font-bold text-typo-4">Share it with your friends</h2>
                            <p className="text-typo-1">
                                The price of <span className="uppercase  font-bold">{symbol}</span> is{" "}
                                <span className="text-primary-1">
                                    {formatCurrency(getNewData(newData?.price, oldData))}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank">
                                <Image src={"/assets/icons/fb-gray.svg"} alt="fb-gray" width={24} height={24} />
                            </Link>
                            <Link href={`https://twitter.com/intent/post?url=${currentUrl}`} target="_blank">
                                <Image src={"/assets/icons/x.svg"} alt="x" width={24} height={24} />
                            </Link>
                        </div>
                        <div className="w-full flex flex-col gap-px">
                            <p className="text-12 font-medium text-black">Or copy link</p>
                            <div className="py-1 pr-1 pl-2 text-base rounded-lg border border-typo-1/20 flex gap-1 items-center">
                                <p className="flex-1 text-12">{currentUrl}</p>
                                <Button bg={"rgb(56,97,251)"} height={"fit-content"} w={"fit-content"} p={"8px 12px"}>
                                    <div className="flex items-center gap-1.5">
                                        <Image
                                            src={"/assets/icons/copy-white.svg"}
                                            alt="fb-gray"
                                            width={18}
                                            height={18}
                                        />
                                        <span className="text-12 text-white uppercase font-bold">COPY</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default ShareModal;

import React from "react";
import {
    Button,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
type ShareModalProps = {
    isOpen: boolean;
    onClose: () => void;
};
function ShareModal({ isOpen, onClose }: ShareModalProps) {
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
                                The price of <span className="uppercase  font-bold">BTC</span> is{" "}
                                <span className="text-primary-1">60,997.57</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={"/fb"}>
                                <Image src={"/assets/icons/fb-gray.svg"} alt="fb-gray" width={24} height={24} />
                            </Link>
                            <Link href={"/x"}>
                                <Image src={"/assets/icons/x.svg"} alt="x" width={24} height={24} />
                            </Link>
                        </div>
                        <div className="w-full flex flex-col gap-px">
                            <p className="text-12 font-medium text-black">Or copy link</p>
                            <div className="py-1 pr-1 pl-2 text-base rounded-lg border border-typo-1/20 flex gap-1 items-center">
                                <p className="flex-1 text-12">https://coincapnews.com/currency/bitcoin/</p>
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

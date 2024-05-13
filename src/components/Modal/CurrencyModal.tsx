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
import { useState } from "react";
type CurrencyModalProps = {
    isOpen: boolean;
    onClose: () => void;
};
const currenciesData = [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 6, 7, 8];
function CurrencyModal({ isOpen, onClose }: CurrencyModalProps) {
    const [keyword, setKeyword] = useState<string>();
    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    return (
        <Modal
            scrollBehavior={"inside"}
            size={"3xl"}
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Currencies</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Divider mb={4} />
                    <InputGroup my={3}>
                        <InputLeftElement pointerEvents="none" height={12}>
                            <Image src={"/assets/icons/search.svg"} alt="dropdown" width={20} height={20} />
                        </InputLeftElement>
                        {keyword && keyword.length > 0 && (
                            <InputRightElement height={12} className="cursor-pointer">
                                <Image src={"/assets/icons/close.svg"} alt="dropdown" width={20} height={20} />
                            </InputRightElement>
                        )}
                        <Input onChange={handlerSearch} height={12} type="text" placeholder="Search..." />
                    </InputGroup>
                    <div className="grid grid-cols-2 overflow-y-auto max-h-[420px] croll-hideen">
                        {/* Cryptocurrencies */}
                        <div className="grid grid-cols-2 col-span-1 gap-3">
                            <h5 className="col-span-2 px-3 text-typo-1 font-medium text-13 leading-[21px]">
                                Cryptocurrencies
                            </h5>
                            {currenciesData.map((item, index) => (
                                <Button
                                    key={index}
                                    onClick={() => {
                                        onClose();
                                    }}
                                    bg={"transparent"}
                                    _hover={{
                                        bg: "gray.100",
                                    }}
                                    flexDirection={"column"}
                                    borderRadius={6}
                                    alignItems={"start"}
                                    gap={0.5}
                                    py={2}
                                    pl={3}
                                    pr={2}
                                    height={"fit-content"}
                                >
                                    <p className="text-typo-1  font-medium text-sm uppercase">BTC</p>
                                    <p className="text-typo-1  text-12 capitalize">Coin</p>
                                </Button>
                            ))}
                        </div>
                        {/* Fiat Currencies */}
                        <div className="grid grid-cols-2 col-span-1 gap-3">
                            <h5 className="col-span-2 px-3 text-typo-1 font-medium text-13 leading-[21px]">
                                Cryptocurrencies
                            </h5>
                            {currenciesData.map((item, index) => (
                                <Button
                                    key={index}
                                    onClick={() => {
                                        onClose();
                                    }}
                                    bg={"transparent"}
                                    _hover={{
                                        bg: "gray.100",
                                    }}
                                    flexDirection={"column"}
                                    borderRadius={6}
                                    alignItems={"start"}
                                    gap={0.5}
                                    py={2}
                                    pl={3}
                                    pr={2}
                                    height={"fit-content"}
                                >
                                    <p className="text-typo-1  font-medium text-sm uppercase">BTC</p>
                                    <p className="text-typo-1  text-12 capitalize">Coin</p>
                                </Button>
                            ))}
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default CurrencyModal;

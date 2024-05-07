import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
} from "@chakra-ui/react";
type CurrencyModalProps = {
    isOpen: boolean;
    onClose: () => void;
};
function CurrencyModal({ isOpen, onClose }: CurrencyModalProps) {
    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight="bold" mb="1rem">
                        You can scroll the content behind the modal
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default CurrencyModal;

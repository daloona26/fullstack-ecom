import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  cancelText = "Cancel",
  okText = "Update",
  children,
  onClick,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg={"blackAlpha.500"} backdropFilter="blur(3px)" />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={onClick} isLoading={isLoading}>
            {okText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CustomModal;

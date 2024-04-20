import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ButtonGroups } from "./button-groups";

const WithdrawModal = ({ item, isOpen, onClose, index }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [selectedCrypto, setSelectedCrypto]: any = useState(null);
  const [selectedAmount, setSelectedAmount]: any = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle withdrawing USDC
  const handleWithdrawUSDC = async () => {
    // const { uo }: any = await withdrawUSDC(0.01, 0, selectedChain.chain.id);
    // await sendUserOperation();
  };

  // Function to handle withdrawing Ethereum
  const handleWithdrawEth = async () => {
    // const { uo }: any = await withdrawEth(0, selectedChain.chain.id);
    // await sendUserOperation(uo);
  };

  const handleConfirm = async () => {
    if (selectedCrypto === "USDC") {
      await handleWithdrawUSDC();
    }
    if (selectedCrypto === "ETH") {
      await handleWithdrawEth();
    }
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log(selectedAmount, selectedCrypto, index);
    await handleConfirm();
    setLoading(false);
    setTimeout(() => {
      // resetTxnStatus();
    }, 2000);
  };

  const handleSelectButton = async (value: string) => {
    setSelectedCrypto(value);
  };

  return (
    <Modal
      size={"lg"}
      isCentered
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Withdraw {""}
          <Badge colorScheme="purple">{item.name}</Badge>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>To Address</FormLabel>{" "}
            <Input placeholder="To wallet address" value={"awesfd"} disabled />
          </FormControl>

          <FormControl>
            <FormLabel>Crypto</FormLabel>

            <ButtonGroups
              className="bg-black"
              handleSelectButton={handleSelectButton}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                $
              </InputLeftElement>
              <Input
                ref={initialRef}
                placeholder="0.1"
                type="number"
                onChange={(e: any) => {
                  setSelectedAmount(e.target.value);
                }}
              />
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            spinnerPlacement="start"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={"Successfully Completed"}
          >
            Confirm
          </Button>
          <Button
            isLoading={loading}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawModal;

import React, { useEffect, useState } from "react";
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
import { useWallet } from "@/context/WalletContext";

const DonateModal = ({ item, isOpen, onClose, index }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { fundEth } = useWallet();

  const [selectedAmount, setSelectedAmount]: any = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle funding Ethereum
  const handleFundEth = async (selectedAmount: any, projectNumber: any) => {
    console.log("Funding Ethereum");
    await fundEth(projectNumber, selectedAmount);
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log(selectedAmount, index);
    await handleFundEth(selectedAmount, index);
    setLoading(false);
    setTimeout(() => {
      // resetTxnStatus();
    }, 2000);
  };

  useEffect(() => {
    // console.log(loading, txnStatus);
    // if (txnStatus === 'completed') {
    //   onClose();
    // }
  }, []);

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
          Donate to {""}
          <Badge colorScheme="purple">{item.name}</Badge>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>To Address</FormLabel>{" "}
            <Input
              placeholder="To wallet address"
              value={item.owner}
              disabled
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
            loadingText={"Pending"}
          >
            Confirm
          </Button>
          <Button
            isLoading={loading}
            onClick={() => {
              // resetTxnStatus();
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

export default DonateModal;

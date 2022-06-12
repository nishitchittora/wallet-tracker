import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/number-input";
import { useToast } from "@chakra-ui/toast";
import Moralis from "moralis";
import { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function SendETH() {
    const [amount, setAmount] = useState(0);
    const toast = useToast();
    const [receiver, setReceiver] = useState("");

    const { fetch, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        receiver: receiver,
        type: "native",
    });

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">
                Send ETH
            </Text>
            <form
                type="submit"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await Moralis.enableWeb3();
                    fetch({
                        onSuccess: () => {
                            toast({
                                title: "ETH successfully sent.",
                                description: "Fresh ETH is showing",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            });
                        },
                        onError: (error) => {
                            toast({
                                title: "Error",
                                description: error,
                                status: "error",
                                duration: 2000,
                                isClosable: true,
                            });
                        },
                    });
                }}
            >
                <FormControl mt="4">
                    <FormLabel htmlFor="amount">Amount of ETH</FormLabel>
                    <NumberInput step={0.1} onChange={(val) => setAmount(val)}>
                        <NumberInputField id="amount" value={amount} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt="4" htmlFor="receiver">
                        Send To
                    </FormLabel>
                    <Input
                        id="receiver"
                        type="text"
                        placeholder="Receiver Address"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                    />
                </FormControl>
                <Button
                    mt="4"
                    type="submit"
                    colorScheme="purple"
                    disabled={isFetching}
                >
                    Send
                </Button>
            </form>
        </CustomContainer>
    );
}

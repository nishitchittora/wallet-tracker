import { Divider, Text } from "@chakra-ui/layout";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Balance({ user }) {
    const [ethBalance, setEthBalance] = useState(0);
    const Web3API = useMoralisWeb3Api();
    const { fetchERC20Balances, data } = useERC20Balances();
    const fetchNativeBalance = async () => {
        const result = await Web3API.account
            .getNativeBalance({
                chain: process.env.NEXT_PUBLIC_NETWORK,
                address: user.get("ethAddress"),
            })
            .catch((e) => console.log(e));
        if (result.balance) {
            setEthBalance(Moralis.Units.FromWei(result.balance));
        }
        console.log(result);
    };

    useEffect(() => {
        fetchNativeBalance();
        fetchERC20Balances({
            params: {
                chain: process.env.NEXT_PUBLIC_NETWORK,
                address: user.get("Address"),
            },
        });
    }, []);
    console.log(data);
    return (
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold">
                My ERC20 Tokens
            </Text>
            {ethBalance && (
                <Text py="3">
                    {ethBalance} <b>ETH</b>
                </Text>
            )}
            <Divider />
            {data &&
                data.map((token) => {
                    return (
                        <div key={token.symbol}>
                            <Text py="3">
                                {Moralis.Units.FromWei(token.balance)}{" "}
                                <b>{token.symbol}</b>
                            </Text>
                            <Divider />
                        </div>
                    );
                })}
        </CustomContainer>
    );
}

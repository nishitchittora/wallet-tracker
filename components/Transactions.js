import { Container, Divider, Link, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Transactions({ user }) {
    const Web3API = useMoralisWeb3Api();
    const [transactions, setTransactions] = useState([]);
    const BASE_URL = "https://rinkeby.etherscan.io/tx/";
    const fetchTransactions = async () => {
        const data = await Web3API.account.getTransactions({
            chain: process.env.NEXT_PUBLIC_NETWORK,
            address: user.get("ethAddress"),
            limit: 10,
        });
        if (data) {
            setTransactions(data.result);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);
    return (
        <CustomContainer>
            <Text>Last 10 Transactions</Text>
            {transactions.map((transaction) => {
                return (
                    <Container maxW="100vw" key={transaction.hash} py="3">
                        <Link href={BASE_URL + transaction.hash} isExternal>
                            {transaction.hash}
                        </Link>
                        <Divider />
                    </Container>
                );
            })}
        </CustomContainer>
    );
}

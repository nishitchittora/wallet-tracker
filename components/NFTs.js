import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function NFTs({ user }) {
    const { getNFTBalances, data } = useNFTBalances();
    useEffect(() => {
        getNFTBalances({
            params: {
                chain: process.env.NEXT_PUBLIC_NETWORK,
                address: user.get("ethAddress"),
            },
        });
    }, []);
    console.log(data);
    return <CustomContainer></CustomContainer>;
}

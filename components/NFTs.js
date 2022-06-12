import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function NFTs({ user }) {
    const { getNFTBalances, data } = useNFTBalances();
    useEffect(() => {
        getNFTBalances({
            params: {
                chain: "rinkeby",
                address: user.get("ethAddress"),
            },
        });
    });
    console.log(data);
    return <CustomContainer></CustomContainer>;
}

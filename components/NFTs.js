import { Image } from "@chakra-ui/image";
import { Box, Text } from "@chakra-ui/layout";
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
    return (
        <CustomContainer>
            <Text>My NFT's</Text>
            {data &&
                data?.result?.map((nft) => {
                    return (
                        <Box
                            mt="4"
                            px="2"
                            py="2"
                            borderWidth="1px"
                            borderRadius="md"
                            key={nft.token_uri}
                        >
                            {nft.image && <Image src={nft.image} />}
                        </Box>
                    );
                })}
        </CustomContainer>
    );
}

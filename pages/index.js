import { Flex, Button, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { isAuthenticated, authenticate } = useMoralis();
  return (
    <div>
      {!isAuthenticated ? (
        <Head>
          <title>Logged in user</title>
          <Flex
            direction={"column"}
            justifyContent="center"
            alignContent="center"
            width="100vw"
            height="100vh"
          >
            <Text fontSize="5xl" fontWeight="bold">
              Dashboard
            </Text>
            <Button onClick={() => authenticate({})} colorScheme="purple">
              Login with metamask
            </Button>
          </Flex>
        </Head>
      ) : (
        <div> Hello user</div>
      )}
    </div>
  );
}

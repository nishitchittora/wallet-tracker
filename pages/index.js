import {
    Flex,
    Button,
    Text,
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import Balance from "./components/Balance";
import Header from "./components/Header";
import NFTs from "./components/NFTs";
import Profile from "./components/Profile";
import SendETH from "./components/SendETH";
import Transactions from "./components/Transactions";

export default function Home() {
    const { isAuthenticated, authenticate, user, isLoggingOut, logout } =
        useMoralis();
    return (
        <div>
            {!isAuthenticated ? (
                <>
                    <Head>
                        <title>Logged in user</title>
                    </Head>
                    <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        width="100vw"
                        height="100vh"
                        color="white"
                        bgGradient="linear(to-br, teal.400, purple.300)"
                    >
                        <Text fontSize="5xl" fontWeight="bold">
                            Dashboard
                        </Text>
                        <Button
                            onClick={() =>
                                authenticate({
                                    signingMessage:
                                        "Sign required to login in Dashboard",
                                })
                            }
                            colorScheme="purple"
                        >
                            Login with metamask
                        </Button>
                    </Flex>
                </>
            ) : (
                <>
                    <Head>
                        <title>Dashboard</title>
                    </Head>
                    <Flex direction="column" width="100vw" height="100vh">
                        <Header
                            user={user}
                            isLoggingOut={isLoggingOut}
                            logout={logout}
                        />
                        <Box flex="1" bg="purple.100" px="44" py="20">
                            <Tabs
                                size="lg"
                                colorScheme="purple"
                                align="center"
                                variant="enclosed"
                            >
                                <TabList>
                                    <Tab fontWeight="bold">Profile</Tab>
                                    <Tab fontWeight="bold">Balance</Tab>
                                    <Tab fontWeight="bold">Transactions</Tab>
                                    <Tab fontWeight="bold">NFTs</Tab>
                                    <Tab fontWeight="bold">Send ETH</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Profile user={user} />
                                    </TabPanel>
                                    <TabPanel>
                                        <Balance user={user} />
                                    </TabPanel>
                                    <TabPanel>
                                        <Transactions
                                            user={user}
                                        ></Transactions>
                                    </TabPanel>
                                    <TabPanel>
                                        <NFTs user={user}></NFTs>
                                    </TabPanel>
                                    <TabPanel>
                                        <SendETH user={user}></SendETH>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Flex>
                </>
            )}
        </div>
    );
}

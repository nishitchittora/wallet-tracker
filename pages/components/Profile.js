import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Profile({ user }) {
    const { setUserData, isUserUpdating } = useMoralis();
    const [username, setUsername] = useState();

    return (
        <CustomContainer>
            <Text>Username: {user.getUsername()}</Text>
            <Text>Wallet: {user.get("ethAddress")}</Text>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (username.trim() !== "") {
                        setUserData({
                            username: username,
                        });
                    }
                }}
            >
                <FormControl mt="6" mb="6">
                    <FormLabel>Set a username</FormLabel>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Input>
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="purple"
                    disabled={isUserUpdating}
                >
                    Change settings
                </Button>
            </form>
        </CustomContainer>
    );
}

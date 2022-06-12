import { Box } from "@chakra-ui/layout";

export default function CustomContainer({ children }) {
    return (
        <Box
            bg="white"
            width="full"
            height="full"
            px="20"
            rounded="lg"
            py="10"
            textAlign="left"
            shadow="lg"
        >
            {children}
        </Box>
    );
}

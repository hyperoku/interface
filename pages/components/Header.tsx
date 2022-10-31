import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Flex, Heading } from '@chakra-ui/react'

const Header = () => {
    return (
        <header>
            <Flex justifyContent={"space-between"} padding={"3em 4em"}>
                <Heading fontSize={"3.5em"}>Hyperoku</Heading>
                <Box margin={"auto"} marginRight={0} fontSize={"1.5em"}>
                    <ConnectButton />
                </Box>
            </Flex>
        </header>
    )
}

export default Header;
import { Box, Heading, HStack } from "@chakra-ui/react";
import colors from "../Colors";
import { RoundTable } from "./legos";

const Rounds = (props: {difficulties: string[]}) => {

    const games = [
        {
            id: 1,
            player: "0x1234567890",
            start: 1234567890,
            end: 1234567890,
        },
        {
            id: 2,
            player: "0x1234567890",
            start: 1234567890,
            end: 1234567890,
        },
        {
            id: 3,
            player: "0x1234567890",
            start: 1234567890,
            end: 1234567890,
        },
    ];

    return (
        <Box 
            backgroundColor={colors.primary_light} 
            borderRadius="1em" 
            padding="4em" 
            mb="5em"
            shadow={"xl"}
        >
            <Heading mb="1em">Last Active Rounds</Heading>
            <HStack justifyContent="space-between">
                {props.difficulties.map((difficulty) => (
                    <RoundTable difficulty={difficulty} games={games} key={difficulty}/>
                ))}
            </HStack>
        </Box>
    )
}

export default Rounds;
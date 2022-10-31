import { Box, Heading, HStack } from "@chakra-ui/react";
import colors from "../Colors";
import { RoundTable } from "./legos";

const Rounds = (props: {difficulties: string[]}) => {

    const games: Game[] = [
        {
            id: 1,
            round_id: 0,
            request_id: 0,
            player: "0x1234567890",
            start_blocknumber: 1234567890,
            end_blocknumber: 1234567890,
        },
        {
            id: 2,
            round_id: 0,
            request_id: 0,
            player: "0x1234567890",
            start_blocknumber: 1234567890,
            end_blocknumber: 1234567890,
        },
        {
            id: 3,
            round_id: 0,
            request_id: 0,
            player: "0x1234567890",
            start_blocknumber: 1234567890,
            end_blocknumber: 1234567890,
        },
    ];

    return (
        <Box 
            backgroundColor={colors.primary_light} 
            borderRadius="2em" 
            padding="4em" 
            mb="5em"
            shadow={"xl"}
        >
            <Heading mb="1em" fontSize="2.5em">Last Active Rounds</Heading>
            <HStack justifyContent="space-between">
                {props.difficulties.map((difficulty) => (
                    <RoundTable difficulty={difficulty} games={games} key={difficulty}/>
                ))}
            </HStack>
        </Box>
    )
}

export default Rounds;
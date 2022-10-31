import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { Box, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import colors from "../../Colors";

const RequestProgress = (props: { gameCreated: number, gameString: string }) => {
    return (
        <HStack width="100%" justifyContent="space-between" fontWeight={600} fontSize="2em">
            <HStack 
                width="48%" 
                textAlign="center" 
                justifyContent="space-around" 
                backgroundColor={colors.secondary} 
                p="2em 0"
                borderRadius="1em"
            >
                <Text>Waiting for transaction execution</Text>
                {
                    props.gameCreated === -1 &&
                    <Spinner size="xl" thickness="8px" />
                }
                {
                    props.gameCreated !== -1 &&
                    <CheckIcon h="1.5em" w="1.5em" />
                }
            </HStack>
            <HStack 
                width="48%" 
                textAlign="center" 
                justifyContent="space-around" 
                backgroundColor={colors.secondary} 
                p="2em 0"
                borderRadius="1em"
                
            >
                <Text>Waiting Sudoku Generation</Text>
                {
                    props.gameCreated === -1 &&
                    <NotAllowedIcon h="1.5em" w="1.5em" />
                }
                {
                    props.gameCreated !== -1 &&
                    <Spinner size="xl" thickness="8px" />
                }
                {
                    props.gameString !== "" &&
                    <CheckIcon h="1.5em" w="1.5em" />
                }
            </HStack>
        </HStack>
    );
}

export default RequestProgress;
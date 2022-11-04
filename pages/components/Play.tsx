import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useContractEvent, useContractRead } from 'wagmi'
import roundsManagerABI from '../../contracts/roundsManager';
import randomSudokuGeneratorABI from '../../contracts/randomSudokuGenerator';
import colors from '../Colors';
import { PlayButton, RequestProgress } from './legos'
import Sudoku from './Sudoku';

const Play = (props: {difficulties: string[]}) => {

    const [anyClicked, setAnyClicked] = useState(false)
    const [metamaskConfirmed, setMetamaskConfirmed] = useState(false)
    const [gameCreated, setGameCreated] = useState(-1)
    const [gameString, setGameString] = useState("300020000690087001241050738100236975000008410903700862009005327000902050060470189")
    const [getGameEnabled, setGetGameEnabled] = useState(false)
    const [getRequestEnabled, setGetRequestEnabled] = useState(false)
    const [requestId, setRequestId] = useState(-1)

    const { data: gameData, isError: isGameError, isLoading: isGameLoading } = useContractRead({
        address: process.env.NEXT_PUBLIC_ADDRESS_ROUNDS_MANAGER,
        abi: roundsManagerABI,
        functionName: 'getGame',
        enabled: getGameEnabled,
        args: [gameCreated]
    })

    const { data: requestData, isError: isRequestError, isLoading: isRequestLoading } = useContractRead({
        address: process.env.NEXT_PUBLIC_ADDRESS_RANDOM_SUDOKU_GENERATOR,
        abi: randomSudokuGeneratorABI,
        functionName: 'getRequestStatus',
        enabled: getRequestEnabled,
        args: [requestId]
    })

    useContractEvent({
        address: process.env.NEXT_PUBLIC_ADDRESS_RANDOM_SUDOKU_GENERATOR,
        abi: randomSudokuGeneratorABI,
        eventName: 'RequestFulfilled',
        listener(...args) {
            if (Number(args[0]) === Number(requestId)) {
                setGetRequestEnabled(true);
            }
        },
        once: getRequestEnabled
    })

    useEffect(() => {
        if (gameCreated !== -1) {
            setGetGameEnabled(true);
        }
    }, [gameCreated])

    useEffect(() => {
        if (gameData) {
            let game: Game = gameData as Game;
            setRequestId(game.request_id);
        }
    }, [gameData])

    useEffect(() => {
        if (requestData) {
            let request: RequestStatus = requestData as RequestStatus;
            if (request?.fulfilled) {
                setGameString(request.sudoku);
            }
        }
    }, [requestData])

    return (
        <Box 
            backgroundColor={colors.primary_light} 
            borderRadius="2em" 
            padding="4em" 
            mb="3em"
            shadow={"xl"}
        >
            <Box flexDir="column" display={!metamaskConfirmed && !gameString ? "flex" : "none"}>
                <Heading mb="1em" fontSize="2.5em">Chose a difficulty</Heading>
                <HStack justifyContent="space-between">
                    {props.difficulties.map((difficulty) => (
                        <PlayButton 
                            text={difficulty}
                            key={difficulty}
                            anyClicked={anyClicked}
                            setAnyClicked={setAnyClicked}
                            setMetamaskConfirmed={setMetamaskConfirmed}
                            setGameCreated={setGameCreated}
                        />
                    ))}
                </HStack>
            </Box>
            {
                metamaskConfirmed && 
                !gameString &&
                <>
                    <Heading mb="1em" fontSize="2.5em">Generating your game</Heading>
                    <RequestProgress
                        gameCreated={gameCreated}
                        gameString={gameString}
                    />
                </>
            }
            {
                gameString &&
                <Sudoku gameString={gameString}/>
            }
        </Box>
    )
}

export default Play;
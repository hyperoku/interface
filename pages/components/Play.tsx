import { Box, Heading, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useContractEvent, useContractRead } from 'wagmi'
import roundsManagerABI from '../../contracts/roundsManager';
import randomSudokuGeneratorABI from '../../contracts/randomSudokuGenerator';
import colors from '../Colors';
import { PlayButton } from './legos'
import Sudoku from './Sudoku';

const Play = (props: {difficulties: string[]}) => {

    const [anyClicked, setAnyClicked] = useState(false)
    const [gameCreated, setGameCreated] = useState(-1)
    const [gameString, setGameString] = useState('')
    const [getGameEnabled, setGetGameEnabled] = useState(false)
    const [getRequestEnabled, setGetRequestEnabled] = useState(false)
    const [requestId, setRequestId] = useState(-1)

    const { data: gameData, isError: isGameError, isLoading: isGameLoading } = useContractRead({
        address: '0x73257E7Fd45f69c752bB3D28f1f6a134d22ad00c',
        abi: roundsManagerABI,
        functionName: 'getGame',
        enabled: getGameEnabled,
        args: [gameCreated]
    })

    const { data: requestData, isError: isRequestError, isLoading: isRequestLoading } = useContractRead({
        address: '0x7470778015Cc0D6ddc503d998B50AE9DD5c2650B',
        abi: randomSudokuGeneratorABI,
        functionName: 'getRequestStatus',
        enabled: getRequestEnabled,
        args: [requestId]
    })

    useContractEvent({
        address: '0x7470778015Cc0D6ddc503d998B50AE9DD5c2650B',
        abi: randomSudokuGeneratorABI,
        eventName: 'RequestFulfilled',
        listener(...args) {
            if (Number(args[0]) === Number(requestId)) {
                setGetRequestEnabled(true);
            }
        },
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

    useEffect(() => {
        if (gameString) {
            console.log("FATTO:")
            console.log(gameString);
        }
    }, [gameString])

    return (
        <Box 
            backgroundColor={colors.primary_light} 
            borderRadius="1em" 
            padding="4em" 
            mb="3em"
            shadow={"xl"}
        >
            <Heading mb="1em">Chose a difficulty</Heading>
            <HStack 
                fontSize="1.5em"
                justifyContent="space-between"
            >
                {
                    gameCreated === -1 &&
                    props.difficulties.map((difficulty) => (
                        <PlayButton 
                            text={difficulty}
                            key={difficulty}
                            anyClicked={anyClicked}
                            setAnyClicked={setAnyClicked}
                            setGameCreated={setGameCreated}
                        />
                    ))
                }
                {
                    gameCreated !== -1 &&
                    <Sudoku gameString={gameString} />
                }
            </HStack>
        </Box>
    )
}

export default Play;
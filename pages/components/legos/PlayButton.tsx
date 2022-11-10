import { Button } from '@chakra-ui/react'
import colors from '../../Colors';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import roundsMangerABI from '../../../contracts/roundsManager'
import { Dispatch, SetStateAction, useEffect } from 'react';

const PlayButton = (props: { 
    text: string,
    anyClicked: boolean,
    setAnyClicked: Dispatch<SetStateAction<boolean>>
    setMetamaskConfirmed: Dispatch<SetStateAction<boolean>>
    setGameId: Dispatch<SetStateAction<number>>
}) => {

    const { config, error: prepareError } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_ADDRESS_ROUNDS_MANAGER,
        abi: roundsMangerABI,
        functionName: 'createGame',
        args: [
            props.text.toUpperCase(),
            {
                maxFeePerGas: 2.5*10**9,
                maxPriorityFeePerGas: 2.5*10**9,
                gasLimit: 3000000
            },
        ]
    })

    const { 
        data, isLoading: isLoadingWrite, isSuccess: isSuccessWrite, write, error: writeError 
    } = useContractWrite(config)

    const { isLoading: isLoadingTx, isSuccess: isSuccessTx } = useWaitForTransaction({
        hash: data?.hash,
    })

    const clicked = () => {
        props.setAnyClicked(true);
        write?.();
    }

    const setGame = async () => {
        let receipt = await data?.wait?.();
        props.setGameId(Number(receipt?.logs[4].topics[1]))
    }

    useEffect(() => {
        if (writeError) {
            props.setAnyClicked(false);
        }
    }, [writeError])

    useEffect(() => {
        if (isSuccessWrite) {
            props.setMetamaskConfirmed(true);
        }
    }, [isSuccessWrite])

    useEffect(() => {
        if (isSuccessTx) {
            setGame();
        }
    }, [isSuccessTx])

    return (
        <>
            <Button 
                onClick={() => clicked()}
                disabled={!write || props.anyClicked}
                isLoading={isLoadingWrite || isLoadingTx}
                loadingText='Waiting'
                padding="1.5em 1.2em"
                borderRadius="0.33em"
                fontSize="3em"
                color={colors.primary}
                backgroundColor={colors.accent}
                width="31%"
                _hover={{
                    backgroundColor: colors.button_hover,
                }}
                _active={{
                    backgroundColor: colors.primary,
                }}
                transition="background-color 0.3s"
                _dark={{
                    color: colors.dark_bg,
                    backgroundColor: colors.primary,
                    _hover: {
                        backgroundColor: colors.button_hover_dark,
                    },
                    _active: {
                        backgroundColor: colors.dark_bg,
                    },
                }}
            >
                {props.text}
            </Button>
        </>
    )
}

export default PlayButton;
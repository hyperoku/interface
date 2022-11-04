import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, background, Box, Button, Flex, Heading, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import colors from "../Colors";
import { Cell, MenuButton } from "./legos";
import { FaRedo, FaPen, FaStepBackward, FaFlagCheckered } from "react-icons/fa";

const stringToGrid = (gameString: string) => {
    let grid: number[][] = [];
    for (let i = 0; i < 9; i++) {
        let row: number[] = [];
        for (let j = 0; j < 9; j++) {
            row.push(Number(gameString[i * 9 + j]));
        }
        grid.push(row);
    }
    return grid;
}

const Sudoku = (props: { gameString: string }) => {

    const initialGrid: number[][] = stringToGrid(props.gameString);
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const [selectedNumber, setSelectedNumber] = useState(-1);
    const [grid, setGrid] = useState(initialGrid);
    const [noteMode, setNoteMode] = useState(false);
    const [history, setHistory] = useState([initialGrid]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement>(null);

    const iconStyle = { fontSize: "0.7em" };
    const clearIcon = <FaRedo style={iconStyle} />;
    const noteIcon = <FaPen style={iconStyle} />;
    const undoIcon = <FaStepBackward style={iconStyle} />;
    const finishIcon = <FaFlagCheckered style={iconStyle} />;

    interface Action {
        icon: JSX.Element,
        active: boolean,
        holdable: boolean,
        onClick: () => void,
    }

    const clear: Action = {
        icon: clearIcon,
        active: false,
        holdable: false,
        onClick: () => {
            onOpen();

        }
    }

    const note: Action = {
        icon: noteIcon,
        active: noteMode,
        holdable: true,
        onClick: () => {
            setNoteMode(!noteMode);
        }
    }

    const undo: Action = {
        icon: undoIcon,
        active: false,
        holdable: false,
        onClick: () => {
            if (history.length > 1) {
                setHistory(history.slice(0, history.length - 1));
                setGrid(history[history.length - 2]);
            }
        }
    }

    const finish: Action = {
        icon: finishIcon,
        active: false,
        holdable: false,
        onClick: () => {
            console.log(grid)
        }
    }

    const actions: Action[] = [clear, note, undo, finish];

    return (
        <HStack justifyContent="space-evenly" fontFamily="SpaceMonoR" padding="0 8em">
            <Box width="min-content">
                <Heading fontSize="2em" textAlign="center">Menu</Heading>
                <Flex flexWrap="wrap" marginTop="1em" backgroundColor={colors.secondary} padding="1em" borderRadius="1em">
                    {
                        numbers.map((num) => {
                            return (
                                <MenuButton val={num} active={num == selectedNumber} holdable={true} onClick={
                                    () => {
                                        if (num != selectedNumber) setSelectedNumber(num)
                                        else setSelectedNumber(-1)
                                    }
                                } />
                            )
                        })
                    }
                </Flex>
                <Flex flexWrap="wrap" marginTop="1em" backgroundColor={colors.secondary} padding="1em" borderRadius="1em">
                    {
                        actions.map((action) => {
                            return (
                                <MenuButton val={action.icon} active={action.active} holdable={action.holdable} onClick={action.onClick} />
                            )
                        })
                    }
                </Flex>
            </Box>
            <VStack>
                <Heading fontSize="2.5em" textAlign="center" paddingBottom="0.25em">10s</Heading>
                <Box
                    fontSize="2em"
                    padding="0.5em"
                    borderRadius="0.5em"
                    backgroundColor={colors.secondary}
                >
                    {
                        grid.map((row, i) => (
                            <Flex key={i} width="fit-content"
                                borderBottom={i === 2 || i === 5 ? `0.1em solid ${colors.accent}` : "none"}
                            >
                                {
                                    row.map((cell, j) => (
                                        <>
                                            <Cell row={i} col={j} num={cell} editable={initialGrid[i][j] == 0} onClick={() => {
                                                if (initialGrid[i][j] == 0 && selectedNumber != -1) {
                                                    let newGrid = grid.map((row) => row.slice());
                                                    newGrid[i][j] = selectedNumber;
                                                    setGrid(newGrid);
                                                    setHistory([...history, newGrid]);
                                                }
                                            }} />
                                            {
                                                (j == 2 || j == 5) &&
                                                <Flex w="0.1em" margin="0 0.1em"
                                                    backgroundColor={colors.accent}
                                                />
                                            }
                                        </>
                                    ))
                                }
                            </Flex>
                        ))
                    }
                </Box>
            </VStack>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                size="xl"
            >
                <AlertDialogOverlay />

                <AlertDialogContent padding="2em" backgroundColor={colors.secondary}>
                    <AlertDialogHeader fontSize="3em">Reset Game</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody fontSize="2em" fontWeight="600">
                        Are you sure you want to reset?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} fontSize="1.5em" backgroundColor={colors.primary_light}
                            _hover={{ backgroundColor: colors.primary }}
                            _active={{ backgroundColor: colors.button_hover }}
                        >
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} fontSize="1.5em" onClick={
                            () => {
                                setHistory([initialGrid]);
                                setGrid(initialGrid);
                                onClose();
                            }
                        }>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </HStack>
    );
}

export default Sudoku;
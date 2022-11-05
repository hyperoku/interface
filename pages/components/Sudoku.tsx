import { 
    AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, 
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, 
    Heading, HStack, useDisclosure, VStack 
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
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
    const [movesHistory, setMovesHistory] = useState<Move[]>([]);
    const [notedCells, setNotedCells] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement>(null);

    const iconStyle = { fontSize: "0.7em" };
    const clearIcon = <FaRedo style={iconStyle} />;
    const noteIcon = <FaPen style={iconStyle} />;
    const undoIcon = <FaStepBackward style={iconStyle} />;
    const finishIcon = <FaFlagCheckered style={iconStyle} />;

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
            if (movesHistory.length > 0) {
                let lastMove = movesHistory[movesHistory.length - 1];
                let newGrid = grid.map((row) => row.slice());
                newGrid[lastMove.row][lastMove.col] = lastMove.prevValue;
                setNotedCells(notedCells - lastMove.addedNoted);
                if (lastMove.prevNoted) {
                    setNotedStyle(lastMove.row, lastMove.col);
                } else {
                    removeNotedStyle(lastMove.row, lastMove.col);
                }
                setGrid(newGrid);
                setMovesHistory(movesHistory.slice(0, movesHistory.length - 1));
            }
        }
    }

    const finish: Action = {
        icon: finishIcon,
        active: false,
        holdable: false,
        onClick: () => {
            console.log(grid)
            console.log(notedCells)
        }
    }

    const actions: Action[] = [clear, note, undo, finish];

    const getCell = (i: number, j: number) => {
        return document.getElementById("cell_" + `${i * 9 + j}`)
    }

    const setNotedStyle = (i: number, j: number) => {
        getCell(i,j)?.classList.add("notedCell");
    }

    const removeNotedStyle = (i: number, j: number) => {
        getCell(i,j)?.classList.remove("notedCell");
    }

    const editCell = (i: number, j: number) => {
        if (initialGrid[i][j] == 0 && selectedNumber != -1) {
            let isNoted = getCell(i,j)?.classList.contains("notedCell");
            let newGrid = grid.map((row) => row.slice());
            let newValue = 0;
            let prevValue = newGrid[i][j];
            let addedNoted = 0;
            if (!selectedNumber) {
                if (isNoted) {
                    removeNotedStyle(i,j);
                    setNotedCells(notedCells - 1);
                    addedNoted = -1;
                }
            } else {
                if (!noteMode) {
                    if (newGrid[i][j] != selectedNumber || isNoted) {
                        newValue = selectedNumber;
                    }
                    if (isNoted) {
                        removeNotedStyle(i,j);
                        setNotedCells(notedCells - 1);
                        addedNoted = -1;
                    }
                } else {
                    if (!isNoted) {
                        setNotedStyle(i,j);
                        setNotedCells(notedCells + 1);
                        addedNoted = 1;
                        newValue = selectedNumber;
                    } else {
                        let notedNumbers = prevValue.toString();
                        if (notedNumbers.includes(selectedNumber.toString())) {
                            notedNumbers = notedNumbers.replace(selectedNumber.toString(), "");
                        } else {
                            notedNumbers += selectedNumber.toString();
                        }
                        if (notedNumbers.length == 0) {
                            removeNotedStyle(i,j);
                            setNotedCells(notedCells - 1);
                            addedNoted = -1;
                        } else {
                            let sortedNumbers = notedNumbers.split("").sort().join("");
                            newValue = Number(sortedNumbers);
                        }
                    }
                }
            }
            newGrid[i][j] = newValue;
            setMovesHistory([...movesHistory, { 
                row: i, 
                col: j, 
                prevValue: prevValue,
                addedNoted,
                prevNoted: isNoted
            }]);
            setGrid(newGrid);
        }
    }

    const selectMenuNumber = (num: number) => {
        resetSelectedCells();
        if (num != selectedNumber) {
            setSelectedNumber(num);
            setSelectedCells(num);
        } else {
            setSelectedNumber(-1)
        }
    }

    const resetSelectedCells = () => {
        let selectedCells = document.getElementsByClassName("selectedCell");
        while (selectedCells.length > 0) {
            selectedCells[0].classList.remove("selectedCell");
        }
    }

    const setSelectedCells = (selectedNumber: number)  => {
        let cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == selectedNumber.toString() && !cells[i].classList.contains("notedCell")) {
                cells[i].classList.add("selectedCell");
            }
        }
    }

    const resetGame = () => {
        let notedCells = document.getElementsByClassName("notedCell");
        while (notedCells.length > 0) {
            notedCells[0].classList.remove("notedCell");
        }
        setMovesHistory([]);
        setGrid(initialGrid);
        setSelectedNumber(-1);
        setNoteMode(false);
        setNotedCells(0);
        onClose();
    }

    useEffect(() => {
        resetSelectedCells();
        setSelectedCells(selectedNumber);
    }, [grid]);

    return (
        <HStack justifyContent="space-evenly" fontFamily="SpaceMonoR" padding="0 8em" userSelect="none">
            <Box width="min-content">
                <Heading fontSize="2em" textAlign="center">Menu</Heading>
                <Flex flexWrap="wrap" marginTop="1em" backgroundColor={colors.secondary} padding="1em" borderRadius="1em">
                    {
                        numbers.map((num) => {
                            return (
                                <MenuButton key={num} val={num} active={num == selectedNumber} holdable={true} onClick={() => selectMenuNumber(num)} />
                            )
                        })
                    }
                </Flex>
                <Flex flexWrap="wrap" marginTop="1em" backgroundColor={colors.secondary} padding="1em" borderRadius="1em">
                    {
                        actions.map((action, i) => {
                            return (
                                <MenuButton key={i} val={action.icon} active={action.active} holdable={action.holdable} onClick={action.onClick} />
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
                                            <Cell key={i*9+j} row={i} col={j} num={cell} editable={initialGrid[i][j] == 0} onClick={editCell} />
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
                        <Button colorScheme='red' ml={3} fontSize="1.5em" onClick={resetGame}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </HStack>
    );
}

export default Sudoku;
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import colors from "../Colors";

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

const Sudoku = (props: {gameString: string}) => {

    let grid: number[][] = stringToGrid(props.gameString);

    const [selectedNumber, setSelectedNumber] = useState(3);

    return(
        <Box 
            fontSize="2.5em"
            fontFamily="SpaceMonoR"
            padding="0.5em 3em"
        >
            {
                grid.map((row, i) => (
                    <Flex key={i} width="fit-content" margin="auto"
                        borderBottom={i === 2 || i === 5 ? "0.1em solid black" : "none"}
                    >
                        {
                            row.map((cell, j) => (
                                <>
                                    <Flex key={j} w="2em" h="2em" 
                                        justifyContent="center" 
                                        alignItems="center"
                                        backgroundColor={cell ? colors.cellFilled : colors.secondary}
                                        transition="all 0.2s ease-in-out"
                                        _hover={{
                                            backgroundColor: !cell ? colors.cellHover : "none"
                                        }}
                                        borderRadius="0.2em"
                                        margin="0.1em"
                                        marginBottom={i == 2 || i == 5 ? "0.2em" : "0.1em"}
                                        marginTop={i == 3 || i == 6 ? "0.2em" : "0.1em"}
                                        id={"cell_" + i*9 + j}
                                        onClick={() => 
                                            (!cell) ? document.getElementById("cell_" + i*9 + j)!.textContent = selectedNumber.toString() : null
                                        }
                                    >
                                        {cell ? cell : ""}
                                    </Flex>
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
    );
}

export default Sudoku;
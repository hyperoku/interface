import { Flex } from "@chakra-ui/react"
import colors from "../../Colors";

const Cell = (props: { row: number, col: number, num: number, editable: boolean, onClick: () => void}) => {
    return (
        <Flex key={props.col} w="2em" h="2em"
            justifyContent="center"
            alignItems="center"
            backgroundColor={!props.editable ? colors.cellFilled : colors.primary_light}
            transition="all 0.1s ease-in-out"
            _hover={{
                backgroundColor: props.editable ? colors.cellHover : "none",
                cursor: props.editable ? "pointer" : "default",
            }}
            borderRadius="0.25em"
            margin="0.1em"
            marginBottom={props.row == 2 || props.row == 5 ? "0.2em" : "0.1em"}
            marginTop={props.row == 3 || props.row == 6 ? "0.2em" : "0.1em"}
            id={"cell_" + `${props.row * 9 + props.col}`}
            onClick={() => props.onClick()}
        >
            {props.num || ""}
        </Flex>
    )
}

export default Cell;
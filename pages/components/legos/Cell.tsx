import { Flex } from "@chakra-ui/react"
import colors from "../../Colors";

const Cell = (props: { row: number, col: number, num: number, editable: boolean, onClick: (i: number, j: number) => void}) => {
    return (
        <Flex key={props.col} className={`cell ${props.editable ? 'editableCell' : ''}`}
            backgroundColor={!props.editable ? colors.cellFilled : colors.primary_light}
            _hover={{
                backgroundColor: props.editable ? colors.cellHover : "none",
                cursor: props.editable ? "pointer" : "default",
            }}
            marginBottom={props.row == 2 || props.row == 5 ? "0.2em" : "0.1em"}
            marginTop={props.row == 3 || props.row == 6 ? "0.2em" : "0.1em"}
            id={"cell_" + `${props.row * 9 + props.col}`}
            onClick={() => props.onClick(props.row, props.col)}
        >
            {props.num || ""}
        </Flex>
    )
}

export default Cell;
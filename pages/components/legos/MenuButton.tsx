import { Flex } from "@chakra-ui/react"
import colors from "../../Colors";

const MenuButton = (props: {val: number | JSX.Element, active: boolean, holdable: boolean, onClick: () => void}) => {
    return (
        <Flex w="4.5em" h="2.25em" 
            flex="44%" 
            justifyContent="center"
            alignItems="center"
            fontSize="2em"
            borderRadius="0.5em"
            backgroundColor={props.active && props.holdable ? colors.accent : colors.primary_light}
            color={props.active && props.holdable ? colors.secondary : colors.accent}
            transition="all 0.2s ease-in-out"
            _hover={{
                backgroundColor: colors.accent,
                color: colors.secondary,
                cursor: "pointer",
            }}
            onClick={() => props.onClick()}
            margin="0.1em"
        >
            {props.val || "X"}
        </Flex>
    )
}

export default MenuButton;
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useColorModeValue,
} from '@chakra-ui/react'
import colors from '../../Colors';

const RoundTable = ( props: { difficulty: string, games: Game[] } ) => {

    const bg = useColorModeValue(colors.secondary, colors.secondary)
    const color = useColorModeValue(colors.accent, colors.dark_bg)

    return(
        <TableContainer width="31%">
            <Table
                fontSize="1em" 
                backgroundColor={bg}
                borderRadius="1em"
                color={color}
                size="lg"
            >
                <TableCaption 
                    placement='top' 
                    fontSize="2em" 
                    textAlign="left"
                    fontWeight={600}
                    color={color}
                    mt={0}
                >
                    {props.difficulty}
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th isNumeric borderColor={colors.primary_light}>
                            ID
                        </Th>
                        <Th borderColor={colors.primary_light}>
                            Player
                        </Th>
                        <Th isNumeric borderColor={colors.primary_light}>
                            Time
                        </Th>
                    </Tr>
                </Thead>
                <Tbody fontFamily="Space Mono">
                    {props.games.map((game: Game) => (
                        <Tr key={game.id}>
                            <Td isNumeric borderColor={colors.primary_light}>
                                {game.id}
                            </Td>
                            <Td borderColor={colors.primary_light}>
                                {game.player}
                            </Td>
                            <Td isNumeric borderColor={colors.primary_light}>
                                {game.end_blocknumber-game.start_blocknumber}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default RoundTable
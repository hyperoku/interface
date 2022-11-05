interface Game {
    id: number,
    round_id: number,
    request_id: BigNumber,
    player: string,
    start_blocknumber: number,
    end_blocknumber: number,
}

interface RequestStatus {
    paid: number,
    fulfilled: boolean,
    difficulty: number,
    sudoku: string,
    solution: string,
}

interface Action {
    icon: JSX.Element,
    active: boolean,
    holdable: boolean,
    onClick: () => void,
}

interface Move {
    row: number,
    col: number,
    prevValue: number,
    addedNoted: number,
    prevNoted?: boolean,
}
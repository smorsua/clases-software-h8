type Cell = {
    isAlive: boolean;
};

type State = Cell[][];

function nextState(currentState: State) {
    for (let i = 0; i < currentState.length; i++) {
        for (let j = 0; j < currentState[i].length; j++) {
            const cellState = currentState[i][j].isAlive;
        }
    }
}

function isCellGoingToLive(
    currentState: State,
    cell: Cell,
    row: number,
    column: number
): boolean {
    const neightbours = [
        currentState[row - 1][column - 1],
        currentState[row - 1][column],
        currentState[row - 1][column + 1],
        currentState[row][column - 1],
        currentState[row][column + 1],
        currentState[row + 1][column - 1],
        currentState[row + 1][column],
        currentState[row + 1][column + 1],
    ];

    const aliveCount = neightbours.filter(
        (neightbour) => neightbour.isAlive
    ).length;
    if (cell.isAlive) {
        return aliveCount == 2 || aliveCount == 3;
    } else {
        return aliveCount == 3;
    }
}

export {};

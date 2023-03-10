export {};
import { GridHandler } from "./gridhandler";
//import { InitialState } from "./initialState";
import { Cell, State } from "./types";

function createInitialGrid(): State {
    const state: State = [];

    for (let i = 0; i < gridHandler.rows; i++) {
        const row: Cell[] = [];

        for (let j = 0; j < gridHandler.columns; j++) {
            row.push({ isAlive: false });
        }

        state.push(row);
    }

    return state;
}

function handleClick(currentState: State) {
    canvas.onclick = (ev) => {
        const x = ev.clientX - canvas.getBoundingClientRect().left;
        const y = ev.clientY - canvas.getBoundingClientRect().top;

        const cellWidth = gridHandler.cellWidth;
        const cellHeight = gridHandler.cellHeight;

        const row = Math.floor(y / cellWidth);
        const column = Math.floor(x / cellHeight);

        const getCurrentState = currentState[row][column].isAlive;

        if (getCurrentState == false) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(
                column * cellWidth,
                row * cellHeight,
                cellWidth,
                cellHeight
            );

            currentState[row][column].isAlive = true;
        } else if (getCurrentState == true) {
            ctx.clearRect(
                column * cellWidth,
                row * cellHeight,
                cellWidth,
                cellHeight
            );
            currentState[row][column].isAlive = false;
        }
    };
}
function nextState(currentState: State): State {
    const state: Cell[][] = [];

    for (let i = 0; i < currentState.length; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < currentState[i].length; j++) {
            row.push({
                isAlive: isCellGoingToLive(
                    currentState,
                    currentState[i][j],
                    i,
                    j
                ),
            });
        }
        state.push(row);
    }
    return state;
}
function isCellGoingToLive(
    currentState: State,
    cell: Cell,
    row: number,
    column: number
): boolean {
    if (
        row == 0 ||
        row == currentState.length - 1 ||
        column == 0 ||
        column == currentState.length - 1
    ) {
        return false;
    }
    const neighbors = [
        currentState[row - 1][column - 1],
        currentState[row - 1][column],
        currentState[row - 1][column + 1],
        currentState[row][column - 1],
        currentState[row][column + 1],
        currentState[row + 1][column - 1],
        currentState[row + 1][column],
        currentState[row + 1][column + 1],
    ];

    const aliveCount = neighbors.filter((neighbor) => neighbor.isAlive).length;
    if (cell.isAlive) {
        return aliveCount == 2 || aliveCount == 3;
    } else {
        return aliveCount == 3;
    }
}

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const buttonStart = document.getElementById("buttonStart") as HTMLButtonElement;
let intervalID = 0;
buttonStart.addEventListener("click", () => {
    intervalID = setInterval(() => {
        currentState = nextState(currentState);
        gridHandler.drawGrid(currentState);
    }, 100);
});

const buttonStop = document.getElementById("buttonStop") as HTMLButtonElement;
buttonStop.addEventListener("click", () => {
    clearInterval(intervalID);
});

const gridHandler = new GridHandler(canvas, 40, 40);
gridHandler.drawGrid(createInitialGrid());
let currentState = createInitialGrid();
handleClick(currentState);

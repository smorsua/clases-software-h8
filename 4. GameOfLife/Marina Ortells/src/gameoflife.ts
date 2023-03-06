export {};
import { GridHandler } from "./gridhandler";
//import { InitialState } from "./initialState";
import { Cell, State } from "./types";



function createInitialGrid() {
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
    canvas.addEventListener("click", (ev) => {
        const x = ev.clientX - canvas.offsetLeft;
        const y = ev.clientY - canvas.offsetTop;

        const cellWidth = gridHandler.cellWidth;
        const cellHeight = gridHandler.cellHeight;

        const row = Math.floor(y / cellWidth);
        const column = Math.floor(x / cellHeight + 1);

        currentState[row][column];
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
        //isCellGoingToLive(currentState, cell, row, column); //probably change
    });
}

function nextState(cell: Cell) {
    button.addEventListener("click", (ev) => {
        for (let i = 0; i < currentState.length; i++) {
            for (let j = 0; j < currentState[i].length; j++) {
                const cellState = currentState[i][j].isAlive;
                currentState[i][j].isAlive = cell.isAlive; //AQUÍ!!!!!!!!
                console.log(currentState.length);
                isCellGoingToLive(currentState, cellState, i, j);
        }

    }});
}

const isCellGoingToLive = function isCellGoingToLive(
    currentState: State,
    cell: Cell,
    row: number,
    column: number
): boolean {
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
        aliveCount == 2 || aliveCount == 3;
    } else {
        aliveCount == 3;
    }

    if ((aliveCount == 2 || aliveCount == 3) && cell.isAlive == true) {
        return true;
    } else {
        return false;
    }
}

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const button = document.getElementById("buttonStart") as HTMLButtonElement;
const gridHandler = new GridHandler(canvas, 10, 10);

gridHandler.drawGrid();
let currentState = createInitialGrid();
handleClick(currentState);
nextState();

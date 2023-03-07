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
    const state: State = [];
    canvas.addEventListener("click", (ev) => {
        const x = ev.clientX - canvas.offsetLeft;
        const y = ev.clientY - canvas.offsetTop;

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
            const value 
        } else if (getCurrentState == true) {
            ctx.clearRect(
                column * cellWidth,
                row * cellHeight,
                cellWidth,
                cellHeight
            );
            currentState[row][column].isAlive = false;
        }
    });
}

function nextState() {  
    const state: State = [];
   
        for (let i = 0; i < currentState.length; i++) {
            const nextstate: Cell[] = [];
            for (let j = 0; j < currentState[i].length; j++) {  
                nextstate.push({isAlive:isCellGoingToLive(currentState, cellState, i, j)})              
                const cellState = currentState[i][j].isAlive;
            }
    }};
                
                /*
                const cellWidth = gridHandler.cellWidth;
                const cellHeight = gridHandler.cellHeight;

                const cellState = isCellGoingToLive(currentState, currentState[i][j], i, j);
                
                if (cellState == true) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(
                        i * cellWidth,
                        j * cellHeight,
                        cellWidth,
                        cellHeight
                    );
                }
                else {
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(
                        i * cellWidth,
                        j * cellHeight,
                        cellWidth,
                        cellHeight
                    );
                }
 */
function isCellGoingToLive(
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

    console.log(aliveCount)
    if (aliveCount == 2) { return true;}
    else { return false;}
}

function updatedGrid(currentState: State) {
    buttonStart.addEventListener("click", (ev) => {
        nextState[i][j].push({ isAlive: isCellGoingToLive(currentState, cell, )})
})}

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const buttonStart = document.getElementById("buttonStart") as HTMLButtonElement;
const gridHandler = new GridHandler(canvas, 10, 10);


gridHandler.drawGrid();
let currentState = createInitialGrid();
handleClick(currentState);
const processGrid = nextState();
const willLive: boolean = isCellGoingToLive(processGrid, )


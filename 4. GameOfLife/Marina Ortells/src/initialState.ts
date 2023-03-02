export {};
import { GridHandler } from "./gridhandler";

export class InitialState {
    public gridHandler: GridHandler;
    //public row: number;
    //public column: number;

    constructor(gridHandler: GridHandler) {
        this.gridHandler = gridHandler;
        //this.row = row;
        //this.column = column;
    }

    public handleClick() {
        this.gridHandler.canvas.addEventListener("click", (ev) => {
            const x = ev.clientX - this.gridHandler.canvas.offsetLeft;
            const y = ev.clientY - this.gridHandler.canvas.offsetTop;


            const cellWidth = this.gridHandler.grid.cell.width;
            const cellHeight = this.gridHandler.grid.cell.height;


            const row = Math.floor(y / cellWidth); // EXPORT THIS
            const column = Math.floor(x / cellHeight);

            const currentState = this.gridHandler.grid.cell.isAlive;

            if (currentState == false) {
                this.gridHandler.ctx.fillStyle = "yellow";
                this.gridHandler.ctx.fillRect(
                    column * cellWidth,
                    row * cellHeight,
                    cellWidth,
                    cellHeight
                );
                this.gridHandler.grid.cell.isAlive = true;
            } else {
                this.gridHandler.ctx.clearRect(
                    column * cellWidth,
                    row * cellHeight,
                    cellWidth,
                    cellHeight
                );
                this.gridHandler.grid.cell.isAlive = false;
            }

            // MOVE TO GAMEOFLIFE

            const surroundingCells = [
                [row - 1, column - 1],
                [row - 1, column],
                [row - 1, column + 1],
                [row, column - 1],
                [row, column + 1],
                [row + 1, column - 1],
                [row + 1, column],
                [row + 1, column + 1],
            ];

            const surroudingState = surroundingCells.map(([row, column]) => {
                if (
                    row >= 0 &&
                    row < this.gridHandler.grid.rows &&
                    column >= 0 &&
                    column < this.gridHandler.grid.columns
                ) {
                    return this.gridHandler.grid.cell[row][column].isAlive; //se necesita que sea - cell: Cell[][]
                } return false;
            });
        });
    }
}

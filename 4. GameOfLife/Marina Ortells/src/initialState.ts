export {};
import { GridHandler } from "./gridhandler";
import { Grid } from "./types";

export class InitialState {

    private gridHandler: GridHandler;

    constructor(gridHandler: GridHandler) {
        this.gridHandler = gridHandler;
    }

    

    public handleClick() {
        this.gridHandler.canvas.addEventListener("click", (ev) => {
            const x = ev.clientX - this.gridHandler.canvas.offsetLeft;
            const y = ev.clientY - this.gridHandler.canvas.offsetTop;

            const cellWidth = this.gridHandler.grid.cell.width;
            const cellHeight = this.gridHandler.grid.cell.height;

            const row = Math.floor(y / cellWidth);
            const column = Math.floor(x / cellHeight) + 1;

            this.gridHandler.ctx.fillStyle = "yellow";
            this.gridHandler.ctx.fillRect(
                column * cellWidth,
                row * cellHeight,
                cellWidth,
                cellHeight
            );
            this.gridHandler.grid.cell.isAlive = true;
        });
    }

    
}

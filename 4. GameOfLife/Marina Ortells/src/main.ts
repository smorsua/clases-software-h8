export {};
import { Grid } from "./types";

export class GridHandler {
    private canvas: HTMLCanvasElement;
    private grid: Grid;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, grid: Grid) {
        this.canvas = canvas;
        this.grid = grid;
        this.grid.cell.width = this.grid.width / this.grid.columns;
        this.grid.cell.height = this.grid.height / this.grid.rows;
        this.ctx = canvas.getContext("2d")!;
    }

    public drawLightGrid() {
        this.ctx.strokeStyle = "white";
        this.drawGrid();
    }

    public drawGrid() {
        const cellWidth = this.grid.cell.width;
        const cellHeight = this.grid.cell.height;

        for (let i = 0; i < this.grid.rows; i++) {
            for (let j = 0; j < this.grid.columns; j++) {
                this.ctx.strokeRect(
                    j * cellWidth,
                    i * cellHeight,
                    cellWidth,
                    cellHeight
                );
            }
        }
    }

    public handleClick() {
        canvas.addEventListener("click", (ev) => {
            const x = ev.clientX - canvas.offsetLeft;
            const y = ev.clientY - canvas.offsetTop;

            const cellWidth = this.grid.cell.width;
            const cellHeight = this.grid.cell.height;

            const row = Math.floor(y / cellWidth);
            const column = Math.floor(x / cellHeight) + 1;

            if (grid.cell.isAlive == false) {
                this.ctx.fillStyle = "yellow";
                this.ctx.fillRect(
                    column * cellWidth,
                    row * cellHeight,
                    cellWidth,
                    cellHeight
                );
                grid.cell.isAlive = true;
            } else if (grid.cell.isAlive == true) {
                this.ctx.clearRect(
                    column * cellWidth,
                    row * cellHeight,
                    cellWidth,
                    cellHeight
                );
                this.ctx.strokeStyle = "white";
                grid.cell.isAlive = false;
            }
        });
    }
}

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const grid: Grid = {
    rows: 20,
    columns: 20,
    width: 500,
    height: 500,
    cell: { width: 0, height: 0, isAlive: false },
};
const gridHandler = new GridHandler(canvas, grid);
gridHandler.drawLightGrid();
gridHandler.handleClick();

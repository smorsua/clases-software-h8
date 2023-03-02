export {};
import { Grid } from "./types";
import { InitialState } from "./initialState";

export class GridHandler {
    public canvas: HTMLCanvasElement;
    public grid: Grid;
    public ctx: CanvasRenderingContext2D;

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
const initialState = new InitialState(gridHandler);


gridHandler.drawLightGrid();
initialState.handleClick();

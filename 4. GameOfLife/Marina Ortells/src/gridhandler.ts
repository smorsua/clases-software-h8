export {};
import { GridConfig } from "./types";
import { InitialState } from "./initialState";

export class GridHandler {
    public canvas: HTMLCanvasElement;
    public gridConfig: GridConfig;
    private cellWidth: number;
    private cellHeight: number;

    public ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, gridConfig: GridConfig) {
        this.canvas = canvas;
        this.gridConfig = gridConfig;
        //cellWidth y cellheight
        this.ctx = canvas.getContext("2d")!;
    }

    public drawLightGrid() {
        this.ctx.strokeStyle = "white";
        this.drawGrid();
    }

    public drawGrid() {
        const cellWidth = this.grid.width;
        const cellHeight = this.grid.height;

        for (let i = 0; i < this.grid.rows; i++) {
            for (let j = 0; j < this.grid.columns; j++) {
                this.ctx.fillRect(
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
    //cell: { width: 0, height: 0, isAlive: false },
};

const gridHandler = new GridHandler(canvas, grid);
const initialState = new InitialState(gridHandler);


gridHandler.drawLightGrid();
initialState.handleClick();

export {};


export class GridHandler {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rows: number;
    columns: number;
    cellWidth: number;
    cellHeight: number;

    constructor(canvas: HTMLCanvasElement, rows: number, columns: number) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.rows = rows;
        this.columns = columns;
        this.cellWidth = canvas.width / columns;
        this.cellHeight = canvas.height / rows;
    }

    public drawGrid() {
        this.ctx.fillStyle = "white";

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.ctx.fillRect(
                    j * this.cellWidth,
                    i * this.cellHeight,
                    this.cellWidth,
                    this.cellHeight
                );
            }
        }
    }
}

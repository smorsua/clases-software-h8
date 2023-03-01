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
        this.ctx.strokeStyle = '#CCCCCC';
        this.drawGrid();
    }

     public drawGrid() {

        const cellWidth = this.grid.cell.width;
        const cellHeight = this.grid.cell.height;

        for (let i = 0; i < this.grid.rows; i++) {
            for (let j = 0; j < this.grid.columns; j++) {
                this.ctx.strokeRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
                
            }
        }
    }

    public handleClick() {
        canvas.addEventListener("click", (ev) => {
            const clickCellX = ev.clientX - canvas.offsetLeft;
            const clickCellY = ev.clientY - canvas.offsetTop;

            
        })
    }

}


        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        const grid: Grid = { rows: 20, columns: 20, width: 500, height: 500, cell: {width: 0, height: 0, isAlive: false} };
        const gridHandler = new GridHandler(canvas, grid);
        gridHandler.drawLightGrid();


/**
 * function handleClick() {
    myCanvas.addEventListener("click", (ev) => {
        // get the position of the mouse
        const x = ev.clientX - myCanvas.offsetLeft;
        const y = ev.clientY - myCanvas.offsetTop;

        // fill the color
        ctx.fillStyle = "yellow";

        // draw the point
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

handleClick();

/** ctx.fillStyle = "yellow";

ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);



const change = setInterval(drawRandomRect, 500)

function drawRandomRect() {
  
  
}

//fill, stroke

*/



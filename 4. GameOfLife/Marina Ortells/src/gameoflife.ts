export {};
import {GridHandler} from "./gridhandler";
import { InitialState } from "./initialState";
import { Cell, Grid } from "./types";


/**
 * GET THE ROW AND THE COLUMN FROM THE CLASS INITIALSTATE
 * 
 */



export class GameOfLife {
    private grid: Grid;
    private state: Cell[][];

    constructor(initialState: Cell[][], grid: Grid) {
        this.state = initialState;
        this.grid = grid;
    }

    public nextState() {

        /**
         * get the value of the row and the column
         * get the current state - OK
         * get the surrounding cells
         * get the state of surrouding cells
         * set the rules of the game
         * update drawing the grid
         * 
         */




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

        // cambiar a dos fors

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
        
        


        if (this.grid.cell.isAlive == true) {

        }

    }


}


// reglas del juego
        /** *
         * 
         * if (cell isAlive == true) {
         *      - will continue as true if 2 || 3 around are alive
         *      - if not -> will die
         * }
         * 
         * else {
         *      - will revive if 3 around are alive
         * }
         * 
         * 
         */
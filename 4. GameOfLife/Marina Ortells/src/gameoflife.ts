export {};
import {GridHandler} from "./gridhandler";
import { InitialState } from "./initialState";
import { Grid } from "./types";


/**
 * GET THE ROW AND THE COLUMN FROM THE CLASS INITIALSTATE
 * 
 */


export class GameOfLife {
    private grid: Grid;
    private initialState: InitialState;

    constructor(initialState: InitialState, grid: Grid) {
        this.initialState = initialState;
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
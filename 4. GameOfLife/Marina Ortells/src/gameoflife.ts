export {};
import {GridHandler} from "./gridhandler";
import { InitialState } from "./initialState";
import { Grid } from "./types";


export class GameOfLife {
    private grid: Grid;
    private initialState: InitialState; // cambiar

    constructor(initialState: InitialState, grid: Grid) {
        this.initialState = initialState;
        this.grid = grid;
    }



}
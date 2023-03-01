export {}

export type Grid = {
    rows: number;
    columns: number;
    width: number,
    height: number;
    cell: Cell
}

type Cell = {
    isAlive: boolean;
    width: number;
    height: number;
}

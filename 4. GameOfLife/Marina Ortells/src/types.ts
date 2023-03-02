export {}

export type Grid = {
    rows: number;
    columns: number;
    width: number,
    height: number;
    cell: Cell;
}

type Cell = {
    isAlive: boolean;
    width: number;
    height: number;
}


/**
 * PREGUNTAS:
 * 
 * - si pongo Cell[][], como hago para referirme a las propiedades de width, height...
 * - como hago para llamar a la variable row y columns en initialState, en gameoflife??
 * 
 * 
 * preguntas para más tarde:
 * - como hago para dibujar el grid otra vez?
 * 
 * 
 * 
 */
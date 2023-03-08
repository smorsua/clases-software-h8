export class GameOfLife {
    private readonly board: number[][];
    private readonly boardElement: HTMLElement;

    constructor(boardElement: HTMLElement) {
        this.boardElement = boardElement;

        const numRows = Math.floor(boardElement.clientHeight / 20);
        const numCols = Math.floor(boardElement.clientWidth / 20);

        this.board = new Array(numRows)
            .fill(0)
            .map(() => new Array(numCols).fill(0));

        // Inicializar estado del tablero
        // TODO: implementar lógica para estado inicial personalizado
    }

    private countNeighbors(row: number, col: number): number {
        const numRows = this.board.length;
        const numCols = this.board[0].length;
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const r = row + i;
                const c = col + j;
                if (
                    r >= 0 &&
                    r < numRows &&
                    c >= 0 &&
                    c < numCols &&
                    this.board[r][c] === 1
                ) {
                    count++;
                }
            }
        }

        return count;
    }

    private updateBoard(): void {
        const numRows = this.board.length;
        const numCols = this.board[0].length;

        const newBoard = new Array(numRows)
            .fill(0)
            .map(() => new Array(numCols).fill(0));

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const numNeighbors = this.countNeighbors(i, j);

                if (this.board[i][j] === 1) {
                    // La célula está viva
                    if (numNeighbors < 2 || numNeighbors > 3) {
                        // Si tiene menos de 2 vecinos o más de 3 vecinos, muere por soledad o sobrepoblación
                        newBoard[i][j] = 0;
                    } else {
                        // Si tiene 2 o 3 vecinos, sobrevive
                        newBoard[i][j] = 1;
                    }
                } else {
                    // La célula está muerta
                    if (numNeighbors === 3) {
                        // Si tiene exactamente 3 vecinos, nace
                        newBoard[i][j] = 1;
                    } else {
                        newBoard[i][j] = 0;
                    }
                }
            }
        }

        this.board.splice(0, this.board.length, ...newBoard);
    }

    private drawBoard(): void {
        const numRows = this.board.length;
        const numCols = this.board[0].length;

        const table = document.createElement("table");
        for (let i = 0; i < numRows; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < numCols; j++) {
                const cell = document.createElement("td");
                cell.style.backgroundColor =
                    this.board[i][j] === 1 ? "black" : "white";
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        this.boardElement.innerHTML = "";
        this.boardElement.appendChild(table);
    }

    start(): void {
        setInterval(() => {
            this.updateBoard();
        });
    }
}

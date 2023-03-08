"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.GameOfLife = void 0;
var GameOfLife = /** @class */ (function () {
    function GameOfLife(boardElement) {
        this.boardElement = boardElement;
        var numRows = Math.floor(boardElement.clientHeight / 20);
        var numCols = Math.floor(boardElement.clientWidth / 20);
        this.board = new Array(numRows)
            .fill(0)
            .map(function () { return new Array(numCols).fill(0); });
        // Inicializar estado del tablero
        // TODO: implementar lógica para estado inicial personalizado
    }
    GameOfLife.prototype.countNeighbors = function (row, col) {
        var numRows = this.board.length;
        var numCols = this.board[0].length;
        var count = 0;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i === 0 && j === 0)
                    continue;
                var r = row + i;
                var c = col + j;
                if (r >= 0 &&
                    r < numRows &&
                    c >= 0 &&
                    c < numCols &&
                    this.board[r][c] === 1) {
                    count++;
                }
            }
        }
        return count;
    };
    GameOfLife.prototype.updateBoard = function () {
        var _a;
        var numRows = this.board.length;
        var numCols = this.board[0].length;
        var newBoard = new Array(numRows)
            .fill(0)
            .map(function () { return new Array(numCols).fill(0); });
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numCols; j++) {
                var numNeighbors = this.countNeighbors(i, j);
                if (this.board[i][j] === 1) {
                    // La célula está viva
                    if (numNeighbors < 2 || numNeighbors > 3) {
                        // Si tiene menos de 2 vecinos o más de 3 vecinos, muere por soledad o sobrepoblación
                        newBoard[i][j] = 0;
                    }
                    else {
                        // Si tiene 2 o 3 vecinos, sobrevive
                        newBoard[i][j] = 1;
                    }
                }
                else {
                    // La célula está muerta
                    if (numNeighbors === 3) {
                        // Si tiene exactamente 3 vecinos, nace
                        newBoard[i][j] = 1;
                    }
                    else {
                        newBoard[i][j] = 0;
                    }
                }
            }
        }
        (_a = this.board).splice.apply(_a, __spreadArray([0, this.board.length], newBoard, false));
    };
    GameOfLife.prototype.drawBoard = function () {
        var numRows = this.board.length;
        var numCols = this.board[0].length;
        var table = document.createElement("table");
        for (var i = 0; i < numRows; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < numCols; j++) {
                var cell = document.createElement("td");
                cell.style.backgroundColor =
                    this.board[i][j] === 1 ? "black" : "white";
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        this.boardElement.innerHTML = "";
        this.boardElement.appendChild(table);
    };
    GameOfLife.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.updateBoard();
        });
    };
    return GameOfLife;
}());
exports.GameOfLife = GameOfLife;

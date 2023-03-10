export {};

type LetterState = "Correct" | "Incorrect" | "Misplaced" | undefined;

type LetterRating = {
    letter: string;
    state: LetterState;
};

export type WordRating = LetterRating[];

const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = "row";
const LETTER_CLASS = "letter";

let nextLetterIndex = 0;
let currentRowIndex = 0;
var currentGuess: string[] = [];
const solution = "INPUT";
const solutionArr = ["I", "N", "P", "U", "T"];

export class WordleWordComparator {
    private userInputLetterToCount: Map<string, number>;
    private solutionLetterToCount: Map<string, number>;
    private finalRating!: WordRating;

    constructor(solutionArr: string[]) {
        this.userInputLetterToCount = new Map();
        this.solutionLetterToCount = new Map();
        this.setSolutionLetterToCount(solutionArr);
    }

    public getWordRating(currentGuess: string[]): WordRating {
        this.finalRating = currentGuess.map((letter) => ({
            letter: letter,
            state: undefined,
        }));
        this.checkMisplacedandIncorrectLetters(currentGuess);
        this.checkCorrectLetters(currentGuess, solutionArr);
        return this.finalRating;
    }
    // Hay que volver a poner las correctas antes, de modo que ponga primero las verdes y luego no deje poner amarillas si en la sol no se repiten
    private checkCorrectLetters(currentGuess: string[], solutionArr: string[]) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (currentGuess[i] == solutionArr[i]) {
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(currentGuess[i]);
            }
        }
    }

    private checkMisplacedandIncorrectLetters(currentGuess: string[]) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            let currentLetter = currentGuess[i];
            this.finalRating[i].state =
                this.returnMisplacedorIncorrect(currentLetter);
            this.increaseUserLetterCount(currentLetter);
        }
    }

    private returnMisplacedorIncorrect(currentLetter: string) {
        if (
            this.solutionLetterToCount.has(currentLetter) ||
            (this.userInputLetterToCount.get(currentLetter) ??
                0 <= this.solutionLetterToCount.get(currentLetter)!)
        ) {
            return "Misplaced";
        } else {
            return "Incorrect";
        }
    }

    private increaseUserLetterCount(letter: string) {
        if (this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(
                letter,
                this.userInputLetterToCount.get(letter)! + 1
            );
        } else {
            this.userInputLetterToCount.set(letter, 1);
        }
    }

    private setSolutionLetterToCount(solutionArr: string[]) {
        
    }
}

function initBoard() {
    const board = document.getElementById("gameBoard");
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        // Crear row
        const row = document.createElement("div");
        row.classList.add(ROW_CLASS);
        for (let j = 0; j < WORD_LENGTH; j++) {
            // Crear celdas
            const letter = document.createElement("div");
            letter.classList.add(LETTER_CLASS);
            row.appendChild(letter);
        }
        board.appendChild(row);
    }
}

function handleUserInput() {
    document.addEventListener("keydown", (ev) => {
        // Letras - para escribir la palabra
        // Suprimir / Backspace - para borrar
        // Enter - para introducir la respuesta
        const userInput = ev.key;
        if (/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
            addLetter(userInput);
        } else if (userInput == "Backspace" || userInput == "Delete") {
            deleteLetter();
        } else if (userInput == "Enter") {
            enterWord();
        } else {
        }
        console.log(currentGuess);
    });
}

function addLetter(userInput: string) {
    if (nextLetterIndex < WORD_LENGTH) {
        const rows = document.getElementsByClassName(ROW_CLASS);
        const currentRow = rows[currentRowIndex];
        const nextLetterElement = currentRow.children[nextLetterIndex];
        nextLetterElement.textContent = userInput.toUpperCase();
        currentGuess.push(userInput.toUpperCase());
        nextLetterIndex++;
    }
}

function deleteLetter() {
    if (nextLetterIndex > 0) {
        const rows = document.getElementsByClassName(ROW_CLASS);
        const currentRow = rows[currentRowIndex];
        const letterElement = currentRow.children[nextLetterIndex - 1];
        letterElement.textContent = "";
        currentGuess.pop();
        nextLetterIndex--;
    }
}

function enterWord() {
    const;
}

const processWord = new WordleWordComparator(solutionArr);
initBoard();
handleUserInput();

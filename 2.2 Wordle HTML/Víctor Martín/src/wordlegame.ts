const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = "row";
const LETTER_CLASS = "letter";

const CORRECT = "correct";
const MISPLACED = "misplaced";
const INCORRECT = "incorrect";

const wordleWords = [
    "cigar",
    "rebut",
    "sissy",
    "humph",
    "awake",
    "blush",
    "focal",
    "evade",
    "naval",
    "serve",
    "heath",
    "dwarf",
    "model",
    "karma",
    "stink",
    "grade",
    "quiet",
    "bench",
    "abate",
    "feign",
    "major",
    "death",
    "fresh",
    "crust",
    "stool",
    "colon",
    "abase",
    "marry",
    "react",
    "batty",
    "pride",
    "floss",
    "helix",
    "croak",
    "staff",
    "paper",
    "unfed",
    "whelp",
    "trawl",
    "outdo",
    "adobe",
    "crazy",
    "sower",
    "repay",
    "digit",
    "crate",
    "cluck",
    "spike",
    "mimic",
    "pound",
    "maxim",
    "linen",
    "unmet",
    "flesh",
    "booby",
    "forth",
    "first",
    "stand",
    "belly",
    "ivory",
    "seedy",
    "print",
    "yearn",
    "drain",
    "bribe",
    "stout",
    "panel",
];

let nextLetterIndex = 0;
let currentRowIndex = 0;
var currentGuess: string[] = [];

type LetterState = "Correct" | "Incorrect" | "Misplaced" | undefined;

type LetterRating = {
    letter: string;
    state: LetterState;
};

export type WordRating = LetterRating[];

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
        this.clearPreviousInput();
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

    private clearPreviousInput() {
        this.userInputLetterToCount = new Map();
        this.finalRating = [];
    }

    private checkMisplacedandIncorrectLetters(currentGuess: string[]) {
        for (let j = 0; j < WORD_LENGTH; j++) {
            let letter = currentGuess[j];
            this.finalRating[j].state = this.conditionalIncMis(letter);
            this.increaseUserLetterCount(letter);
        }
    }

    private increaseUserLetterCount(letter: string) {
        if (!this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(letter, 1);
        } else {
            this.userInputLetterToCount.set(
                letter,
                this.userInputLetterToCount.get(letter)! + 1
            );
        }
    }

    private setSolutionLetterToCount(solutionArr: string[]) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            let solLetter = solutionArr[i];
            if (!this.solutionLetterToCount.has(solLetter)) {
                this.solutionLetterToCount.set(solLetter, 1);
            } else {
                this.solutionLetterToCount.set(
                    solLetter,
                    this.solutionLetterToCount.get(solLetter)! + 1
                );
            }
        }
    }

    private conditionalIncMis(letter: string) {
        if (
            !this.solutionLetterToCount.has(letter) ||
            (this.userInputLetterToCount.get(letter) ??
                0 >= this.solutionLetterToCount.get(letter)!)
        ) {
            return "Incorrect";
        } else {
            return "Misplaced";
        }
    }
}

// Function declarations

// We start with a Solution selector
function chooseSolution() {
    const solutionIndex = Math.floor(Math.random() * wordleWords.length);
    let solution = wordleWords[solutionIndex];
    return solution.toUpperCase();
}
// We state the solution word
const solution = chooseSolution();
const solutionArr = solution.split("");
const wordleWordComparator = new WordleWordComparator(solutionArr);

// This initializes the Game Board
function initBoard() {
    const board = document.getElementById("gameBoard")!;
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        //Crear row
        const row = document.createElement("div");
        row.classList.add(ROW_CLASS);
        for (let j = 0; j < WORD_LENGTH; j++) {
            const letter = document.createElement("div");
            letter.classList.add(LETTER_CLASS);
            row.appendChild(letter);
        }
        board.appendChild(row);
    }
}

// Now we need to state the actions for each keyboard input
function handleUserInput() {
    document.addEventListener("keydown", (ev) => {
        const userInput = ev.key;
        if (/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
            addLetter(userInput);
        } else if (userInput == "Backspace" || userInput == "Delete") {
            deleteLetter();
        } else if (userInput == "Enter") {
            handleEnter();
        } else {
            console.warn(`${ev.key} is not a valid input`);
        }
    });
} // Basically, three types of keys are accepted, letters, backspace and enter.

// Let's dive into each key type and their functions

// For each letter key, we add the letter
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

// For the backspace we delete the last letter
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

// For the enter, we evaluate the guess and get our Word Review, using the previous class
function handleEnter() {
    const finalRating = wordleWordComparator.getWordRating(currentGuess);
    const answer = currentGuess.join("").toLowerCase();
    if (wordleWords.includes(answer)) {
        updateView(finalRating);
        currentRowIndex++;
        nextLetterIndex = 0;
        currentGuess = [];
    } else {
        console.warn(`Your answer is not included in the solution list`);
    }
} // In here we need to state the currentLetterElement in a loop in order to dye each square

// Let's dive into handleEnter and how we evaluate the guess

// Here we should have our relation to access each state, and then add the color to each element
function updateView(finalRating: WordRating) {
    const rows = document.getElementsByClassName(ROW_CLASS);
    const currentRow = rows[currentRowIndex];
    for (let j = 0; j < WORD_LENGTH; j++) {
        const currentLetterState = finalRating[j].state;
        const currentLetterElement = currentRow.children[j];
        dyeLetter(currentLetterState, currentLetterElement);
    }
}

function dyeLetter(
    currentLetterState: string | undefined,
    currentLetterElement: Element
) {
    if (currentLetterState == "Correct") {
        currentLetterElement.classList.add(CORRECT);
    } else if (currentLetterState == "Misplaced") {
        currentLetterElement.classList.add(MISPLACED);
    } else if (currentLetterState == "Incorrect") {
        currentLetterElement.classList.add(INCORRECT);
    } else {
        console.warn("An unexpected error happened");
    }
}

initBoard();
handleUserInput();

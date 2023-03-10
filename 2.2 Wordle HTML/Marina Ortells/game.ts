import { WordRating } from "./types";
import { WordleWordComparator } from "./WordleComparator";


const GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = "row";
const LETTER_CLASS = "letter";
let currentRowIndex = 0;
let currentLetterIndex = 0;
let nextLetterIndex = 0;
var currentGuess: string[] = [];
const solution = ["I", "N", "P", "U", "T"];

const processWord = new WordleWordComparator();

function initBoard() {
    const board = document.getElementById("gameBoard"); //create an element called gameBoard

    for (let i = 0; i < GUESSES; i++) {
        const row = document.createElement("div"); //every row is a new div
        row.classList.add(ROW_CLASS);
        for (let j = 0; j < WORD_LENGTH; j++) {
            // Create celdas
            const letter = document.createElement("div"); //create a new box for every letter
            letter.classList.add("letter");
            row.appendChild(letter);
        }
        board!.appendChild(row); //append the box to the row and the row to the board
    }

}

function handleuserInput() {
    document.addEventListener("keydown", (ev) => {
        const userInput = ev.key;
        if (/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
            addLetter(userInput);
        } else if (userInput == "Backspace" || userInput == "Delete") {
            deleteLetter();
        } else if (userInput == "Enter") {
            if (nextLetterIndex == 5) {
                enterWord();
                currentRowIndex++;
                
            } else {
                window.alert(`The word must have 5 letters`);
            }
        } else {
            console.warn(`${ev.key} is not a valid input`);
        }
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
    const answer = currentGuess.join("").toLowerCase();
    const finalRating = processWord.initComparator(currentGuess, solution);
    if (solution.includes(answer)) {
        update(finalRating);
        currentRowIndex++;
        nextLetterIndex = 0;
        currentGuess = [];
    } else {
        console.warn(`Your answer is not included in the solution list`);
    }
    const userInputArr = currentGuess;
    /*
    currentGuess = [];
    currentLetterIndex = 0;
    nextLetterIndex = 0;
    currentLetterIndex++;
    if (currentRowIndex == GUESSES) {
        console.log("Game over!");
        return;
    }
    const solutionArr = solution;
    processWord.checkCorrectLetters(userInputArr, solutionArr);
    processWord.checkMisplacedOrIncorrectLetters(userInputArr, solutionArr); */
}

function update(finalRating: WordRating) {
    const rows = document.getElementsByClassName(ROW_CLASS);
    const rowCurrent = rows[currentRowIndex];
    for (let i = 0; i < GUESSES - 1; i++) {
        const currentLetterState = finalRating[i].state;
        const currentLetterPosition = rowCurrent.children[i];
        colorLetter(currentLetterState, currentLetterPosition);
    }
}


function colorLetter(currentLetterState: string | undefined, currentLetterPosition: Element) {
    
    if (currentLetterState == "Correct") {
        currentLetterState.classList.add("green-overlay");
    } else if (currentLetterState == "Incorrect") {
        currentLetterState.classList.add("grey-overlay");
    } else {
        currentLetterState.classList.add("yellow-overlay");
    }
}

initBoard();
handleuserInput();



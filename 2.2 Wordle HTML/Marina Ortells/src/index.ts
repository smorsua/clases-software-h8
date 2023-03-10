export {};
import { WordRating } from "./types";
import { WordleWordComparator } from "./WordleComparator";




let nextLetterIndex = 0;
let currentRowIndex = 0;
var currentGuess: string[] = [];
var currentGuessIndex = 0;
const solution = "INPUT";
const solutionArr = ["I", "N", "P", "U", "T"];


const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = "row";
const LETTER_CLASS = "letter";

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
        board!.appendChild(row);
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
            messageDisplay("The word does not have 5 letters")
        }
    });
}

function messageDisplay(sentence: string) {
    alert(sentence);
    
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
    const state = processWord.initComparator(currentGuess);
    const answer = currentGuess.join("").toLowerCase();
    if (solution.includes(answer)) {
        updateRow(state, answer);
        currentRowIndex++;
        nextLetterIndex = 0;
        currentGuess = [];
    }
    currentGuessIndex++;
}

function updateRow(rating: WordRating, answer: string) {
    const rows = document.getElementsByClassName(ROW_CLASS);
    const currentRow = rows[currentRowIndex];
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letterState = rating[i].state;
        const letterElement = currentRow.children[i];
        if (letterState == "Correct") {
            letterElement.classList.add("green-overlay");
        } else if (letterState == "Incorrect") {
            letterElement.classList.add("grey-overlay");
        } else {
            letterElement.classList.add("yellow-overlay");
        }
    }

    if (answer == solution) {
        messageDisplay("You've won!!")
    }

    
}

 

const processWord = new WordleWordComparator(solutionArr);
initBoard();


while (currentGuessIndex <= NUMBER_OF_GUESSES) {
    handleUserInput();
}

if (currentGuessIndex > NUMBER_OF_GUESSES) {
    messageDisplay("You've lost")
}
const messageDisplay= document.querySelector('.message-container')

const GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = 'row';
const LETTER_CLASS = 'letter';

const solution = "INPUT";

let nextLetterIndex = 0;
let currentLetterIndex = 0;
let currentRowIndex = 0;
let currentGuess = [];


function initBoard() {
    const board = document.getElementById("gameBoard"); //create an element called gameBoard
    
    for (let i = 0; i < GUESSES; i++) { 
        const row = document.createElement('div'); //every row is a new div
        row.classList.add(ROW_CLASS);
        for (let j = 0; j < WORD_LENGTH; j++) {
            // Create celdas
            const letter = document.createElement('div'); //create a new box for every letter
            letter.classList.add('letter');
            row.appendChild(letter);
        }
        board.appendChild(row); //append the box to the row and the row to the board
    }
}

function handleuserInput() {
    document.addEventListener('keydown', (ev) => {
    const userInput = ev.key;
    if (/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
        addLetter(userInput); //if the user presses a letter key, type it
    } else if (userInput == 'Backspace' || userInput == 'Delete') {
        deleteLetter(); //if the user presses the backspace or the delete button, it deletes the previous letter
    } else if (userInput == 'Enter') { 
        if (nextLetterIndex == 5) {
            enterWord();
            tryColors();
        } else { 
            window.alert(`The word must have 5 letters`); 
        }
    } else {
        console.warn(`${ev.key} is not a valid input`);
    }
    })
   
    }


function addLetter(userInput) {
    if (nextLetterIndex < WORD_LENGTH) { 
        const rows = document.getElementsByClassName(ROW_CLASS); 
        const currentRow = rows[currentRowIndex];
        const nextLetterElement= currentRow.children[nextLetterIndex];
        nextLetterElement.textContent = userInput.toUpperCase();
        currentGuess.push(userInput.toUpperCase());
        nextLetterIndex++;
    } 
}

function deleteLetter() {
    if (nextLetterIndex > 0) {
    const rows = document.getElementsByClassName(ROW_CLASS);
    const currentRow = rows[currentRowIndex];
    const letterElement= currentRow.children[nextLetterIndex - 1];
    letterElement.textContent = '';
    currentGuess.pop();
    nextLetterIndex--; 
    }
}

function enterWord() {
    const word = currentGuess.join('');
    const rows = document.getElementsByClassName(ROW_CLASS);
    console.log(currentRowIndex);
    const currentRow = rows[currentRowIndex++];
    nextLetterIndex = 0;
    loopForColors();
}

function loopForColors() {
    const rows = document.getElementsByClassName(ROW_CLASS);
    for (let i = 0; i < solution.length; i++) {
        tryColors(i);
    }
}

function tryColors(currentIndex) {
    const letter = document.getElementsByClassName(LETTER_CLASS);
    const currentLetter = letter[currentIndex];
    const content = currentLetter.textContent;
    if (content == "M") {
        currentLetter.classList.add('green-overlay');
        }
    else {
        currentLetter.classList.add('yellow-overlay')
    }
    /
}

    
initBoard();
handleuserInput();

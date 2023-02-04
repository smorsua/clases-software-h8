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
let isGameOver = false;


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
    if (nextLetterIndex < WORD_LENGTH) { //go letter by letter
        const rows = document.getElementsByClassName(ROW_CLASS); //get the number associated with the row (it starts with 0)
        const currentRow = rows[currentRowIndex]; //for each row
        const nextLetterElement= currentRow.children[nextLetterIndex];
        nextLetterElement.textContent = userInput.toUpperCase();
        currentGuess.push(userInput.toUpperCase()); //adds to the array "currentGuess" the letter that the user inputs
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
    const currentRow = rows[currentRowIndex++];
    nextLetterIndex = 0;
}

function tryColors() {
    const letter = document.getElementsByClassName(LETTER_CLASS);
    const currentLetter = letter[currentLetterIndex];
    let checkIndex = 

    currentLetter[element].classList.add('green-overlay');
    }


/*
const word = enterWord();

function enterWord(word) {
    const word = currentGuess.join('');
    if (word.length === 5 ) {
        currentRowIndex++;
        nextLetterIndex = 0;
        return;
    } else {
        alert("The word should have 5 letters!");
    }
}


function checkWord(word) {
    if (solution == word) {
        Message("Great!!");
        isGameOver = true;
        return;
    } else if (currentRowIndex >= GUESSES) {
        isGameOver = false;
        Message("Game Over!!");
        return;
        }
    else {
        getColor(valueSol, valueIn);
    }
    }


function getColor(valueSol, valueIn) {
    getLetterMapInput(word);
    getLetterMapSol(word);
     
}

function getLetterMapSol(Solution) {

    let SolutionLetterMap = new Map();

    for (let i = 0; i < Solution.length; i++) {
        if (SolutionLetterMap.has(Solution[i])) {
            SolutionLetterMap.set(Solution[i], SolutionLetterMap.get(Solution[i]) + 1);
        }
        else {
            SolutionLetterMap.set(Solution[i], 1);
        }
    }

    for (let [keySol, valSol] of SolutionLetterMap.entries()) {
        console.log(keySol + " " + valSol);
        return valSol;
    }
}
    
const valueSol = getLetterMapSol();


function getLetterMapInput(word) {

    let InputLetterMap = new Map();

    for (let i = 0; i < userInput.length; i++) {
        if (InputLetterMap.has(userInput[i])) {
            InputLetterMap.set(userInput[i], InputLetterMap.get(userInput[i]) + 1);
        }
        else {
            InputLetterMap.set(userInput[i], 1);
        }
    }

    for (let [keyIn, valIn] of InputLetterMap.entries()) {
        console.log(keyIn + " " + valIn);
        return valIn;
    }


}

const valueIn = getLetterMapInput();


function Message(message) {
    const messageC = document.createElement('p');
    messageC.textContent = message;
    messageDisplay.append(messageC);
    setTimeout(() => messageDisplay.removeChild(messageC), 3000);
}


checkWord(word);
getColor(valueSol, valueIn);

*/

initBoard();
handleuserInput();


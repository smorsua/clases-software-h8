const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = 'row'
const LETTER_CLASS = 'letter'

let nextLetterIndex = 0;
let currentRowIndex = 0;
let currentGuess = [];

function initBoard() {
    const board = document.getElementById("gameBoard")
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        // Crear row
        const row = document.createElement("div")
        row.classList.add(ROW_CLASS)
        for (let j = 0; j < WORD_LENGTH; j++) {
            // Crear celdas
            const letter = document.createElement("div")
            letter.classList.add(LETTER_CLASS)
            row.appendChild(letter)
        }
        board.appendChild(row)
    }
}




function handleUserInput() {
    document.addEventListener('keydown', (ev) => {
        // Letras - para escribir la palabra
        // Suprimir / Backspace - para borrar
        // Enter - para introducir la respuesta
        const userInput = ev.key
        if (/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
            addLetter(userInput)
        } else if (userInput == 'Backspace' || userInput == 'Delete') {
            deleteLetter()
        } else if (userInput == 'Enter') { } else {

        }
        console.log(currentGuess)
    })
}

function addLetter(userInput) {
    if (nextLetterIndex < WORD_LENGTH) {
        const rows = document.getElementsByClassName(ROW_CLASS)
        const currentRow = rows[currentRowIndex]
        const nextLetterElement = currentRow.children[nextLetterIndex]
        nextLetterElement.textContent = userInput.toUpperCase()
        currentGuess.push(userInput.toUpperCase())
        nextLetterIndex++
    }
}

function deleteLetter() {
    if (nextLetterIndex > 0) {
        const rows = document.getElementsByClassName(ROW_CLASS)
        const currentRow = rows[currentRowIndex]
        const letterElement = currentRow.children[nextLetterIndex - 1]
        letterElement.textContent = ''
        currentGuess.pop()
        nextLetterIndex--
    }
}




initBoard()
handleUserInput()

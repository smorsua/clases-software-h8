type LetterState = "Correct" | "Incorrect" | "Misplaced" | undefined;

type LetterRating = {
    letter: string;
    state: LetterState;
};

// Se crea un tipo que se llama WordRating. Esto es un array que se compone de dos partes: la letra y su estado.
type WordRating = LetterRating[];

const GUESSES = 5;
const WORD_LENGTH = 5;
const ROW_CLASS = "row";
const LETTER_CLASS = "letter";
let currentRowIndex = 0;
let currentLetterIndex = 0;
let nextLetterIndex = 0;
var currentGuess:string[] = [];

export class WordleWordComparator {

    //Se crean dos mapas para recorrer la palabra de la solución y la del input
    private userInputLetterToCount!: Map<string, number>;
    private solutionLetterToCount!: Map<string, number>;

    //Se crea una variable de tipo WordRating
    private finalRating!: WordRating;

    constructor() {}

    private initComparator(userInputArr: string[], solutionArr: string[]): void {
        //Se crea un mapa para el input. Y se pasa el array de la solución por la función setSolutionletterToCount
        this.userInputLetterToCount = new Map(); 
        this.setSolutionLetterToCount(solutionArr); 
        this.finalRating = userInputArr.map((letter) => ( {
            letter: letter,
            state: undefined,
        }));
    }

    private checkCorrectLetters(userInputArr: string[], solutionArr: string[]): void { 
        //Check for correct letters. Para estas letras, el estado de la palabra en WordRating es de "Correct"
        for (let i = 0; i < userInputArr.length; i++) {
            if (solutionArr[i] == userInputArr[i]){
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(userInputArr[i]);
            }
            }
        }

    private checkMisplacedOrIncorrectLetters(userInputArr: string[], solutionArr: string[]) {
        //Loop that iterates the array of the solution
        for (let i = 0; i < userInputArr.length; i++){
            const checkMorI = this.isMisplacedOrIncorrect(userInputArr[i]);
    }
    }

    private isMisplacedOrIncorrect(userLetter: string){
        if (!this.solutionLetterToCount.has(userLetter)) {
            return "Incorrect";
        }

        else if (this.userInputLetterToCount.get(userLetter)! < (this.solutionLetterToCount.get(userLetter) ?? 0)) {
            return "Misplaced";
        }
        else {
            return "Incorrect";
        }
    }

    private increaseUserLetterCount(letter: string): void {
        //En el mapa del input se pone la letra y el número de veces que se repite la letra
        if (this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(letter, this.userInputLetterToCount.get(letter)! + 1);
        }
        else {
            this.userInputLetterToCount.set(letter, 1);
        }
    }

    private setSolutionLetterToCount(solutionArr: string[]) {
        const solutionLetterToCount = this.getLetterCount(solutionArr);
    }

    private getLetterCount(solutionArr: string[]): void {
       this.solutionLetterToCount = new Map();
       for (let i = 0; i < solutionArr.length; i++) {
            this.increaseSolutionLetterCount(solutionArr[i]);
       }
    }

    private increaseSolutionLetterCount(letter: string): void {
        if (this.solutionLetterToCount.has(letter)) {
            this.solutionLetterToCount.set(letter, this.solutionLetterToCount.get(letter)! + 1);
        }
        else {
            this.solutionLetterToCount.set(letter, 1);
        }
    }
}

function allowInput() {
    while (GUESSES > 0) {
        handleuserInput();
    }
}

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
        board!.appendChild(row); //append the box to the row and the row to the board
    }
}

function handleuserInput() {
    document.addEventListener('keydown', (ev) => {
    const userInput = ev.key;
    if (/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
        addLetter(userInput);
    } else if (userInput == 'Backspace' || userInput == 'Delete') {
        deleteLetter();
    } else if (userInput == 'Enter') { 
        if (nextLetterIndex == 5) {
            enterWord();
        } else { 
            console.warn(`The word must have 5 letters`); 
        }
    } else {
        console.warn(`${ev.key} is not a valid input`);
    }
    })
}

function addLetter(userInput: string) {
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
    const processWord = new WordleWordComparator();
    const rows = document.getElementsByClassName(ROW_CLASS);
    const currentRow = rows[currentRowIndex++];
    nextLetterIndex = 0;
}

function colorLetter() {
    const letter = document.getElementsByClassName(LETTER_CLASS);
    const currentLetter = letter[currentLetterIndex];
    currentLetter.classList.add('green-overlay');
}


initBoard();
allowInput();
colorLetter();
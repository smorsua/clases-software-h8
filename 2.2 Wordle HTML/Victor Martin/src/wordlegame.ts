const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = 'row'
const LETTER_CLASS = 'letter'

const CORRECT = "correct"
const MISPLACED = "misplaced"
const INCORRECT = "incorrect"

let nextLetterIndex = 0;
let currentRowIndex = 0;
var currentGuess:string[] = []

type LetterState = "Correct" | "Incorrect" | "Misplaced" | undefined;

type LetterRating = {
    letter: string;
    state: LetterState;
};

export type WordRating = LetterRating[];

export class WordleWordComparator { 
    private userInputLetterToCount!: Map<string,number>;
    private solutionLetterToCount!: Map<string,number>;
    private finalRating!: WordRating;
    
    constructor() {}

    private solutionArrayBuilding(solution: string) {
        const solutionArr = solution.split('')
        return solutionArr
    };

    private getWordRating(){
        let userInputArr = currentGuess
        const solutionArr = this.solutionArrayBuilding(solution)
        this.initComparator(userInputArr,solutionArr)
        this.checkCorrectLetters(userInputArr, solutionArr)
        this.checkMisplacedandIncorrectLetters(userInputArr)

    }

    private initComparator(userInputArr: string[], solutionArr: string[]) {
        this.userInputLetterToCount = new Map();
        this.setSolutionLetterToCount(solutionArr);
        this.finalRating = userInputArr.map((letter) => ({
            letter: letter,
            state: undefined,
        }));
    };

    private checkCorrectLetters(userInputArr: string[], solutionArr: string[]) {
        for(let i=0; i<WORD_LENGTH; i++) {
            if(userInputArr[i] == solutionArr[i]) {
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(userInputArr[i]);
            }
        }
    };

    private checkMisplacedandIncorrectLetters(userInputArr: string[]) {
        for(let j=0; j<WORD_LENGTH; j++) {
            let letter = userInputArr[j];
            this.conditionalIncMis(j, letter);
            this.finalRating[j].state = this.conditionalIncMis(j, letter)
            this.increaseUserLetterCount(letter);
        }
    };
    
    private increaseUserLetterCount(letter: string,) {
        if(!this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(letter, 1)
        } else {
            this.userInputLetterToCount.set(letter, this.userInputLetterToCount.get(letter)! + 1)
    }   
    };

    private setSolutionLetterToCount(solutionArr: string[]) {
        for(let i=0; i<WORD_LENGTH; i++) {
            let solLetter = solutionArr[i];
            if(!this.solutionLetterToCount.has(solLetter)) {
                this.solutionLetterToCount.set(solLetter, 1)
            } else {
                this.solutionLetterToCount.set(solLetter, this.solutionLetterToCount.get(solLetter)! + 1)
            }
        }
    };

    private conditionalIncMis(index: number, letter: string) {
        if((!this.solutionLetterToCount.has(letter)) || (this.userInputLetterToCount.get(letter) ?? 0 >= this.solutionLetterToCount.get(letter)!)) {
            return "Incorrect"
        } else {
            return "Misplaced"
        }
    };

};

// Function declarations

// We start with a Solution selector
function chooseSolution() { 
    const wordleWords = ["cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", 
        "evade", "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade", 
        "quiet", "bench", "abate", "feign", "major", "death", "fresh", "crust", "stool", 
        "colon", "abase", "marry", "react", "batty", "pride", "floss", "helix", "croak", 
        "staff", "paper", "unfed", "whelp", "trawl", "outdo", "adobe", "crazy", "sower", 
        "repay", "digit", "crate", "cluck", "spike", "mimic", "pound", "maxim", "linen", 
        "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory", "seedy", 
        "print", "yearn", "drain", "bribe", "stout", "panel"]
    const solutionIndex = Math.floor(Math.random() * wordleWords.length)
    let solution = wordleWords[solutionIndex]
    return solution
};
// We state the solution word
const solution = chooseSolution() 

// This initializes the Game Board
function initBoard() {
    const board = document.getElementById("gameBoard")!
    for(let i = 0; i <NUMBER_OF_GUESSES; i++) {
        //Crear row
        const row = document.createElement("div")
        row.classList.add(ROW_CLASS)
        for(let j = 0; j< WORD_LENGTH; j++){
            const letter = document.createElement("div")
            letter.classList.add(LETTER_CLASS)
            row.appendChild(letter)
        }
        board.appendChild(row)
    }
};

// Now we need to state the actions for each keyboard input
function handleUserInput() {
    document.addEventListener('keydown', (ev)=> {
        const userInput = ev.key
        if(/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
            addLetter(userInput)
        } else if (userInput == 'Backspace' || userInput == 'Delete') {
            deleteLetter()
        } else if (userInput =='Enter') {
            handleEnter()
        } else {
            console.warn(`${ev.key} is not a valid input`)
        }
        

    })
}; // Basically, three types of keys are accepted, letters, backspace and enter.

// Let's dive into each key type and their functions

// For each letter key, we add the letter
function addLetter(userInput: string) {
    if(nextLetterIndex < WORD_LENGTH) {
        const rows = document.getElementsByClassName(ROW_CLASS)
        const currentRow = rows[currentRowIndex]
        const nextLetterElement = currentRow.children[nextLetterIndex] 
        nextLetterElement.textContent = userInput.toUpperCase()
        currentGuess.push(userInput.toUpperCase())
        nextLetterIndex++
    }
};

// For the backspace we delete the last letter
function deleteLetter() {
    if(nextLetterIndex > 0){
        const rows = document.getElementsByClassName(ROW_CLASS);
        const currentRow = rows[currentRowIndex];
        const letterElement = currentRow.children[nextLetterIndex - 1] ;
        letterElement.textContent ='';
        currentGuess.pop();
        nextLetterIndex--;
    }
};

// For the enter, we evaluate the guess and get our Word Review, using the previous class
function handleEnter() {
    if(nextLetterIndex==(WORD_LENGTH)) {
        let nextLetterIndex = 0
        const rows = document.getElementsByClassName(ROW_CLASS)
        const currentRow = rows[currentRowIndex]
        const currentLetterElement = currentRow.children[nextLetterIndex]
  
        
        const GuessRating = getWordReview(currentGuess, solution)

        for(let j=0; j<WORD_LENGTH; j++) {
            nextLetterIndex++
            dyeLetters(GuessRating, currentLetterElement)
        }
        currentRowIndex++

    } else {
        console.warn(`The answer must have a ${WORD_LENGTH} character length`)
    }
}; // In here we need to state the currentLetterElement in a loop in order to dye each square

// Let's dive into handleEnter and how we evaluate the guess

// We have to get the word review and the results will be used for dying each square
function getWordReview(currentGuess: string[], solution: string, ) {
// This should return the letter-state relation.
const GuessRating = new WordleWordComparator()
return GuessRating
}; // Maybe we can do a little function to verify if the guess is in our word list

// Here we should have our relation to access each state, and then add the color to each element
function dyeLetters(GuessRating: WordleWordComparator, currentLetterElement: Element) {
const LetterElement = currentLetterElement
let i=0
const state = GuessRating[i]
if (state == "Correct") {
    LetterElement.classList.add(CORRECT)
}
else if (state == "Misplaced") {
    LetterElement.classList.add(MISPLACED) 
}
else if (state == "Incorrect") { 
    LetterElement.classList.add(INCORRECT) 
} 
};
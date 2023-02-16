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
// he borrado currentguess con su tipo, ya que usamos userInput :)


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

}





const GuessRating = WordleWordComparator





// EMPEZAMOS ELIGIENDO UNA SOLUCIÓN DE NUESTRA LISTA
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
}
const solution = chooseSolution()


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
}

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
}

function addLetter(userInput: string) {
    if(nextLetterIndex < WORD_LENGTH) {
        const rows = document.getElementsByClassName(ROW_CLASS)
        const currentRow = rows[currentRowIndex]
        const nextLetterElement = currentRow.children[nextLetterIndex] 
        nextLetterElement.textContent = userInput.toUpperCase()
        currentGuess.push(userInput.toUpperCase())
        nextLetterIndex++
    }
}

function deleteLetter() {
    if(nextLetterIndex > 0){
        const rows = document.getElementsByClassName(ROW_CLASS);
        const currentRow = rows[currentRowIndex];
        const letterElement = currentRow.children[nextLetterIndex - 1] ;
        letterElement.textContent ='';
        currentGuess.pop();
        nextLetterIndex--;
    }
}
function definitive_handleEnter() {
    if(nextLetterIndex==(WORD_LENGTH)){
        const rows = document.getElementsByClassName(ROW_CLASS)
        const currentRow = rows[currentRowIndex]
        const currentLetterElement = currentRow.children[nextLetterIndex]

    }
}
function handleEnter() { //quizás falte poner máx intentos EL ERROR SE ENCUENTRA EN handleEnter() o en sus subfunciones como getWordReview o dyeLetters
    if(nextLetterIndex==(WORD_LENGTH)){
        const rows = document.getElementsByClassName(ROW_CLASS)
        const currentRow = rows[currentRowIndex]
        const currentLetterElement = currentRow.children[nextLetterIndex] // el error puede estar ocasionado por esto 
        //seguramente el bug en la lógica esté ocasionado por el currentLetterElement, 
        getWordReview(currentGuess,solution,currentLetterElement)
        for(let j = 0; j = WORD_LENGTH; j++) {
            dyeLetters(ElementMap, currentLetterElement) //aquí he corregido los parámetros de entrada, quizás el bucle esté mal
        }
        
        nextLetterIndex=0
        currentRowIndex++
        
    } else {
        console.warn(`The answer must have a ${WORD_LENGTH} character length`)
    }
}

function getWordReview(currentGuess: string[], solution: string, wordleWords: string[]) { //creo que el error tiene que ver con que currentLetterElement va cambiando con cada letra, por lo que ponerlo como parámetro no tiene sentido y causa problemas
    const solutionLetterToCount = getLetterMap(solution);
    if (currentGuess.length== WORD_LENGTH) {// aqui iría la condición para saber si la palabra está dentro de las posibles soluciones
        const solArr = solution.split('');
        const GuessLetterToCount = new Map();
        const ElementMap = new Map(); //aquí intento crear un mapa que incluya estado y elemento del gameboard para luego aplicarle progresivamente el dyeLetters()

        
    } else {
        console.warn("Your current guess is not included in the word list")
    }
}




function dyeLetters(GuessRating: WordRating, currentLetterElement) { //he cambiado inputletter por ElementMap, ya que es lo que se usa aquí
    const state = GuessRating.get(currentLetterElement) //esto debería devolver inputLetter
    const LetterElement = currentLetterElement
    if (state == CORRECT) {

        LetterElement.classList.add(CORRECT)
    }
    else if (state == INCORRECT) {

        LetterElement.classList.add(INCORRECT) 
    }
    else { 
        LetterElement.classList.add(MISPLACED) 
    } 
}



initBoard()
handleUserInput()
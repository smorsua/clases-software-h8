const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const ROW_CLASS = 'row'
const LETTER_CLASS = 'letter'

const CORRECT = "correct"
const MISPLACED = "misplaced"
const INCORRECT = "incorrect"

let nextLetterIndex = 0;
let currentRowIndex = 0;
let currentGuess =[];



// aquí debería incluirse el import del json y hacer esta función con respecto al archivo json
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
    const board = document.getElementById("gameBoard")
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

function addLetter(userInput) {
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

function getWordReview(currentGuess,solution,currentLetterElement) { //creo que el error tiene que ver con que currentLetterElement va cambiando con cada letra, por lo que ponerlo como parámetro no tiene sentido y causa problemas
    const solutionLetterToCount = getLetterMap(solution);
    if (currentGuess.length == WORD_LENGTH) {// aqui iría la condición para saber si la palabra está dentro de las posibles soluciones
        const solArr = solution.split('');
        const GuessLetterToCount = newMap();
        const ElementMap = newMap(); //aquí intento crear un mapa que incluya estado y elemento del gameboard para luego aplicarle progresivamente el dyeLetters()

        for(let i = 0; i<WORD_LENGTH; i++) {
            if(!solArr.includes(currentGuess[i])) {
                let letterState = INCORRECT
                buildElementMap()
                 
            } else{
                if(solArr[i]==currentGuess[i]) {
                    buildGuessMap(GuessLetterToCount, currentGuess)
                    let letterState = CORRECT
                    buildElementMap(ElementMap, letterState)
                } else {
                    if(GuessLetterToCount.get(currentGuess[i]) == solutionLetterToCount.get(currentGuess[i])) { //he corregido un fallo (paréntesis donde no tocaba)
                        let letterState = INCORRECT
                        buildElementMap(ElementMap, letterState)
                    } else {
                        let letterState = MISPLACED
                        buildElementMap(ElementMap, letterState)
                    }
                }
            }
        } //he quitado el dyeletters, estaba aquí y en el handleEnter()
    } else {
        console.warn("Your current guess is not included in the word list")
    }
}

function buildElementMap(ElementMap, letterState) {
    inputLetter = letterState
    ElementMap.set(currentLetterElement,inputLetter) //debería ser algo equivalente al coloredletter = currentguess[] pero con los elementos
}

function buildGuessMap(GuessLetterToCount, currentGuess) {
    if(!GuessLetterToCount.has(currentGuess[i])) {
        GuessLetterToCount.set(currentGuess[i], 1)
    } else {
        GuessLetterToCount.set(currentGuess[i], GuessLetterToCount.get(currentGuess[i]) + 1)
    }
}

function dyeLetters(ElementMap, currentLetterElement) { //he cambiado inputletter por ElementMap, ya que es lo que se usa aquí
    const state = ElementMap.get(currentLetterElement) //esto debería devolver inputLetter
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

function getLetterMap(wordArr) {
    const wordMap = new Map()
    for(let i=0; i=wordArr.length; i++) {
        let LetterInMap = wordArr[i]
        if (wordMap.has(LetterInMap)) {
            wordMap.set(LetterInMap, 1)
        } else { //aqui igual da problemas por no ser const
            wordMap.set(LetterInMap, wordMap.get(LetterInMap) + 1)
        }
    }
}


initBoard()
handleUserInput()
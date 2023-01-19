//import chalk from 'chalk';


chooseSolution();
function chooseSolution() {
    var possibilities = ["SPACE", "WORDS", "INPUT", "CACHE", "PRINT", "ASCII", "DEBUG", "CLICK", "MODEM", "ROBOT", "PROXY", "WRITE", "VIRUS"];
    let word = Math.floor(Math.random() * possibilities.length);
    let solution = possibilities[word];
    return solution;
}

getUserInput();

function getUserInput() {
    var readline = require('readline-sync');
    var userInput = readline.question("Input a word: ");
    var length = userInput.length;
    let input = String(userInput).toUpperCase();
    if (length == 5) {
        getWordReview(input);
    }
    else {getUserInput(); }
    }

function getWordReview(input, sol) {
    var sol = chooseSolution();
    const inputArr = input.split('');
    const solArr = sol.split('');

    for (let i = 0; i < solArr.length; i++) {
        getLetterState(inputArr[i], solArr[i]);
    }

    getLetterCountMap(inputArr, solArr) 

}

function getLetterState(inputLetter, solutionLetter) {
    if (inputLetter == solutionLetter) {
        console.log(inputLetter + ": Correct");
    }
    else if (!solutionLetter.includes(iputLetter))
        console.log(inputLetter + ": Incorrect");
    else {
        console.log(inputLetter + ": Misplaced");
    }
}

function getLetterCountMap(inputArr, solArr) {
    let veces = 0;
    for (let i = 0; i < inputArr.length; i++) {
        if (solArr.includes(inputArr[i])) {
            veces = veces + 1;
        }
        else {
            veces = 0;
        }
        console.log(inputArr[i] + " se repite " + veces + " veces");
    }

}

function printUserSolution(inputLetter, solutionLetter, )
/*



//Devuelve el estado de una letra de la palabra del usuario en función de la letra correcta obtenida de la solución y cuantas veces a sido comprobada esa letra (esto último lo sacamos del mapa)
function getLetterStatus(
    userLetter,
    solutionLetter,
    userLetterCount,
    solutionLetterCount
): { letter: string; state: "Correct" | "Misplaced" | "Incorrect" };

//Imprime la solución propuesta por el usuario con los colores adecuados en cada letra
function printUserSolution(
    wordReview: [
        { letter: string; state: "Correct" | "Misplaced" | "Incorrect" }
    ]
);

*/

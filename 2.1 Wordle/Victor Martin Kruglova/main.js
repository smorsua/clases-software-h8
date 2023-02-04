// este código no es el que uso par el wordle

import chalk from "chalk"
import promptCreator from "prompt-sync"
import { count } from "console"

function chooseSolution() {
    const GUESSES = 5
    let guessesRemaining = GUESSES;

    var possibilities = ["SPACE", "WORDS", "INPUT", "CACHE", "PRINT", "ASCII", "DEBUG", "CLICK", "MODEM", "ROBOT", "PROXY", "WRITE", "VIRUS"];
    let word = Math.floor(Math.random() * possibilities.length);

}

function getUserInput() {
    const prompt = promptCreator()
    let userInput = prompt("Escribe tu palabra: ")
}
userInput = getUserInput
function isCorrectLength(userInput: string): boolean;{
    let userInput
}

type LetterState = {
    letter: string;
    state: "Correct"|"Incorrect"|"Misplace"
}

type WordState = LetterState[]

function printWordWithColors(wordState: WordState): void{
    wordState.forEach((letterState)=> {
        printLetterWithColors(letterState);
    });
}

function printLetterWithColors(letterstate: LetterState): void{
    switch (letterstate.state) {
        case "Correct":
            console.log(chalk.bgGreen(letterState.letter));

            break;
        case "Incorrect":
            console.log(chalk.bgRed(letterState.letter));

            break;
        case "Misplace":
            console.log(chalk.bgYellow(letterState.letter));

            break;
    }
}
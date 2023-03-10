import {  WordRating } from "./types";

const WORD_LENGTH = 5;

const solutionArr = ["I", "N", "P", "U", "T"];

export class WordleWordComparator {
    private userInputLetterToCount: Map<string, number>;
    private solutionLetterToCount: Map<string, number>;
    private finalRating!: WordRating;

    constructor(solutionArr: string[]) {
        this.userInputLetterToCount = new Map();
        this.solutionLetterToCount = new Map();
        this.setSolutionLetterToCount(solutionArr);
    }

    public initComparator(currentGuess: string[]): WordRating {
        this.finalRating = currentGuess.map((letter) => ({
            letter: letter,
            state: undefined,
        }));
        this.checkMisplacedandIncorrectLetters(currentGuess);
        this.checkCorrectLetters(currentGuess, solutionArr);
        return this.finalRating;
    }
    // Hay que volver a poner las correctas antes, de modo que ponga primero las verdes y luego no deje poner amarillas si en la sol no se repiten
    private checkCorrectLetters(currentGuess: string[], solutionArr: string[]) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (currentGuess[i] == solutionArr[i]) {
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(currentGuess[i]);
            }
        }
    }

    private checkMisplacedandIncorrectLetters(currentGuess: string[]) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            let currentLetter = currentGuess[i];
            this.finalRating[i].state =
                this.returnMisplacedorIncorrect(currentLetter);
            this.increaseUserLetterCount(currentLetter);
        }
    }

    private returnMisplacedorIncorrect(currentLetter: string) {
        if (
            this.solutionLetterToCount.has(currentLetter) ||
            (this.userInputLetterToCount.get(currentLetter) ??
                0 <= this.solutionLetterToCount.get(currentLetter)!)
        ) {
            return "Misplaced";
        } else {
            return "Incorrect";
        }
    }

    private increaseUserLetterCount(letter: string) {
        if (this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(
                letter,
                this.userInputLetterToCount.get(letter)! + 1
            );
        } else {
            this.userInputLetterToCount.set(letter, 1);
        }
    }

    private setSolutionLetterToCount(solutionArr: string[]) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (this.userInputLetterToCount.has(solutionArr[i])) {
                this.userInputLetterToCount.set(
                    solutionArr[i],
                    this.userInputLetterToCount.get(solutionArr[i])! + 1
                );
            } else {
                this.userInputLetterToCount.set(solutionArr[i], 1);
            }
        }
    }
}

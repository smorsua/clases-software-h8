import { LetterState, WordRating } from "./types";



export class WordleWordComparator {
    private userInputLetterToCount!: Map<string, number>;
    private solutionLetterToCount!: Map<string, number>;

    public finalRating!: WordRating;

    constructor() {}

    public initComparator(userInputArr: string[], solutionArr: string[]): void {
        this.userInputLetterToCount = new Map();
        this.setSolutionLetterToCount(solutionArr);
        this.finalRating = userInputArr.map((letter) => ({
            letter: letter,
            state: undefined,
        }));
    }

    public checkCorrectLetters(userInputArr: string[], solutionArr: string[]) {
        for (let i = 0; i < userInputArr.length; i++) {
            if (solutionArr[i] === userInputArr[i]) {
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(userInputArr[i]);
            }
        }
    }

    public checkMisplacedOrIncorrectLetters(userInputArr: string[], solutionArr: string[]) {
        for (let i = 0; i < userInputArr.length; i++) {
            const checkMorI = this.isMisplacedOrIncorrect(userInputArr[i]);
            if (checkMorI === "Incorrect") {
                this.finalRating[i].state = "Incorrect";
            } else if (checkMorI === "Misplaced") {
                this.finalRating[i].state = "Misplaced";
            } else {
                this.increaseUserLetterCount(userInputArr[i]);
        }
        }
    }

    public isMisplacedOrIncorrect(userLetter: string): LetterState  {
        if (!this.solutionLetterToCount.has(userLetter)) {
            return "Incorrect";
        } else if (
            this.userInputLetterToCount.get(userLetter)! <
            (this.solutionLetterToCount.get(userLetter) ?? 0)
        ) {
            return "Misplaced";
        } else {
            return "Incorrect";
        }
    }

    private increaseUserLetterCount(letter: string): void {
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
        this.solutionLetterToCount = this.getLetterCount(solutionArr);
    }

    private getLetterCount(solutionArr: string[]): Map<string,number> {
        const map = new Map<string,number>();
        for (let i = 0; i < solutionArr.length; i++) {
            this.increaseSolutionLetterCount(solutionArr[i], map);
        }
        return map;
    }

    private increaseSolutionLetterCount(letter: string, map: Map<string, number>): void {
        if (map.has(letter)) {
            map.set(
                letter,
                map.get(letter)! + 1
            );
        } else {
            map.set(letter, 1);
        }
    }
}

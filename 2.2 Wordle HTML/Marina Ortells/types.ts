export type LetterState = "Correct" | "Incorrect" | "Misplaced" | undefined;

export type LetterRating = {
    letter: string;
    state: LetterState;
};

export type WordRating = LetterRating[];

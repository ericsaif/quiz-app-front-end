import { Question } from "./question";

export interface WordExistsQ extends Question {
    wordExistsA: WordExistsA | null;
    wordExistsAId: number | null;
}
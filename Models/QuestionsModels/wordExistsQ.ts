import { Question } from "./question";

export interface WordExistsQ extends Question {
    wordExistsAId: number | null;
}
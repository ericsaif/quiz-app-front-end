import { WordExistsQ } from "../../QuestionsModels/wordExistsQ";

export interface WordExistsA {
    id: number;
    wordExistsQId: number;
    wordExistsQ: WordExistsQ | null;
    exists: boolean;
}
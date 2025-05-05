import { WordExistsA } from "../AdminModels/AnswersEntities/wordExistsA";
import { Question } from "./question";

export class WordExistsQ extends Question {
    wordExistsA: WordExistsA | null = null;
}
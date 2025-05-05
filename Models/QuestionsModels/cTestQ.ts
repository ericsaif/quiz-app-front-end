import { CTestA } from "../AdminModels/AnswersEntities/cTestA";
import { Question } from "./question";

export class CTestQ extends Question {
    cTestA: CTestA | null = null
}
import { CTestA } from "../AdminModels/AnswersEntities/cTestA";
import { Question } from "./question";

export class CTestQ extends Question {
    cTestAId: number=0;
    cTestA: CTestA | null = null
}
import { Question } from "./question";

export interface CTestQ extends Question {
    cTestAId: number;
    cTestA: CTestA | null;
}
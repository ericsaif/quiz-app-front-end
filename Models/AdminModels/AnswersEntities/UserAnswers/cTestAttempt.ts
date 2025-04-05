import { UserAnswer } from "./userAnswer";

export interface CTestAttempt extends UserAnswer {
    cTestAnswers: string[];
}
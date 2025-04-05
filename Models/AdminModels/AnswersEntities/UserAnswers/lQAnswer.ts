import { UserAnswer } from "./userAnswer";
export interface ILQAnswer extends UserAnswer {
    iLQAnswers: number[];
    iLQSummary: string | null;
}
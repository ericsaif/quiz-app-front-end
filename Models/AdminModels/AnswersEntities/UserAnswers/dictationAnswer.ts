import { UserAnswer } from "./userAnswer";
export interface DictationAnswer extends UserAnswer {
    dictAnswer: string | null;
}
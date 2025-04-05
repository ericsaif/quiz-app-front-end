import { UserAnswer } from "./userAnswer";
export interface UserEssay extends UserAnswer {
    essay: string | null;
}
import { UserAnswer } from "./userAnswer";
export interface VideoInterview extends UserAnswer {
    pathTovideoAnswer: string | null;
}
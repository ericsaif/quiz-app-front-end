import { UserAnswer } from "./userAnswer";
export interface LAS extends UserAnswer {
    pathToLASaudio: string | null;
}
import { UserAnswer } from "./userAnswer";
export interface PicDescription extends UserAnswer {
    pictureDescription: string | null;
}
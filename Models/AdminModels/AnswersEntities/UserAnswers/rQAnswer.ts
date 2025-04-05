import { UserAnswer } from "./userAnswer";
export interface IRQAnswer extends UserAnswer {
    userOptionsMiniE1: number[];
    userOptionMiniE2: number;
    userHighlightMiniE3: string | null;
    userHighlightMiniE4: string | null;
    userOptionMiniE5: number;
    userOptionMiniE6: number;
}
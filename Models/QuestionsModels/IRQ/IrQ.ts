import { Question } from "../question";
import { MiniE1 } from "./miniE1";

export interface IRQ extends Question {
    miniE1: MiniE1 | null;
    optionsMiniE2: string[];
    questionMiniE3: string | null;
    questionMiniE4: string | null;
    optionsMiniE5: string[];
    optionsMiniE6: string[];
    iRAId: number;
    timer: string;
}
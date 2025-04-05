import { IRQ } from "../../QuestionsModels/IRQ/IrQ";

export interface RA {
    id: number;
    text: string | null;
    correctOptionsMiniE1: number[];
    correctOptionMiniE2: number;
    correctHighlightMiniE3: string | null;
    correctHighlightMiniE4: string | null;
    correctOptionMiniE5: number;
    correctOptionMiniE6: number;
    iRQ: IRQ | null;
    iRQId: number;
    timer: string;
}
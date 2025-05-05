import { IRQ } from "../../QuestionsModels/IRQ/IrQ";

export interface IRA {
    id: number;
    correctOptionsMiniE1: number[];
    correctOptionMiniE2: number;
    correctHighlightMiniE3: string | null;
    correctHighlightMiniE4: string | null;
    correctOptionMiniE5: number;
    correctOptionMiniE6: number;
    iRQ: IRQ | null;
    iRQId: number;
}
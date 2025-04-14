import { ILQ } from "./IlQ";

export interface GivenDialogoptions {
    id: number;
    iLQ: ILQ | null;
    iLQId: number;
    optionsDialogStart: string[];
    optionsDialogContinuation1: string[];
    optionsDialogContinuation2: string[];
    optionsDialogContinuation3: string[];
    optionsDialogContinuation4: string[];
}
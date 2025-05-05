import { ILQ } from "./IlQ";

export interface CorrectDialogOptions {
    iLQ: ILQ | null;
    iLQId: number;
    correctOptionsDialogOptions: number[];
    Dialog: string;
}
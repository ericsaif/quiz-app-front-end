import { ILQ } from "./IlQ";

export interface CorrectDialogOptions {
    id: number;
    iLQ: ILQ | null;
    iLQId: number;
    correctOptionsDialogOptions: number[];
    Dialog: string;
}
import { CorrectDialogOptions } from "./correctDialogOptions";
import { GivenDialogoptions } from "./givenDialogoptions";
import { Question } from "../question";

export interface ILQ extends Question {
    s3pathsToAudioAnswers: string[];
    givenDialogoptions: GivenDialogoptions | null;
    givenDialogoptionsId: number;
    correctDialogOptions: CorrectDialogOptions | null;
    correctDialogOptionsId: number;
    summaryTimer: string;
}
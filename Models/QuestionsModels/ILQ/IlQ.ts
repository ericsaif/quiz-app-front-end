import { CorrectDialogOptions } from "./correctDialogOptions";
import { GivenDialogoptions } from "./givenDialogoptions";
import { Question } from "../question";

export interface ILQ extends Question {
    s3pathsToAudioAnswers: string[];
    givenDialogoptions: GivenDialogoptions;
    givenDialogoptionsId: number;
    correctDialogOptions: CorrectDialogOptions;
    correctDialogOptionsId: number;
    summaryTimer: string;
}
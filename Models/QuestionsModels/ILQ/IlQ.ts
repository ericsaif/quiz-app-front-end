import { CorrectDialogOptions } from "./correctDialogOptions";
import { GivenDialogoptions } from "./givenDialogoptions";
import { Question } from "../question";

export class ILQ extends Question {
    s3pathsToAudioAnswers: string[]=[];
    givenDialogoptions: GivenDialogoptions | null = null;
    givenDialogoptionsId: number =0;
    correctDialogOptions: CorrectDialogOptions | null = null;
    correctDialogOptionsId: number =0 ;
    summaryTimer: string='';
}
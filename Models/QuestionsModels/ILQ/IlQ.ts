import { CorrectDialogOptions } from "./correctDialogOptions";
import { GivenDialogoptions } from "./givenDialogoptions";
import { Question } from "../question";

export class ILQ extends Question {
    s3pathsToAudioAnswers: string[]=[];
    givenDialogoptions: GivenDialogoptions | null = null;
    correctDialogOptions: CorrectDialogOptions | null = null;
    summaryTimer: string='';
}

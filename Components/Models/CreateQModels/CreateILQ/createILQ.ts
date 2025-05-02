import { CreateQuestion } from "../CreateQuestion";
import { CorrectDialogOptions } from "./correctDialogOptions";
import { GivenDialogoptions } from "./givenDialogoptions";

export interface CreateILQ extends CreateQuestion {
    s3pathsToAudioAnswers: string[];
    GivenDialogoptionsDTO: GivenDialogoptions | null;
    CorrectDialogOptionsDTO: CorrectDialogOptions | null;
}
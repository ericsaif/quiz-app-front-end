import { CreateQuestion } from "../CreateQuestion";
import { CorrectDialogOptions_Create } from "./correctDialogOptions";
import { GivenDialogoptions_Create } from "./givenDialogoptions";

export interface CreateILQ extends CreateQuestion {
    s3pathsToAudioAnswers: string[];
    GivenDialogoptionsDTO: GivenDialogoptions_Create | null;
    CorrectDialogOptionsDTO: CorrectDialogOptions_Create | null;
}
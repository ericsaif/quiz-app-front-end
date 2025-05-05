import { DictationA } from "../AdminModels/AnswersEntities/dictationA";
import { Question } from "./question";

export class DictationQ extends Question {
    s3PathToAudio: string='';
    listenTries: number=0;
    dictationA: DictationA | null = null;
}
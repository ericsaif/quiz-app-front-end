import { Question } from "./question";

export class DictationQ extends Question {
    s3PathToAudio: string='';
    listenTries: number=0;
    dictationAId: number=0;
}
import { Question } from "./question";

export interface DictationQ extends Question {
    s3PathToAudio: string;
    listenTries: number;
    dictationAId: number;
}
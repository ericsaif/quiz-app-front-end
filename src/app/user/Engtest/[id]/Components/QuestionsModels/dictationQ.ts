import { Question } from "./question";

export interface DictationQ extends Question {
    s3PathToAudio: string | null;
    listenTries: number;
    dictationAId: number;
    dictationA: DictationA | null;
}
import { Question } from "./question";

export interface LASQ extends Question {
    s3PathToAudioFile: string | null;
    listenTries: number;
}
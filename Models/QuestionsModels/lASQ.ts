import { Question } from "./question";

export class LASQ extends Question {
    s3PathToAudioFile: string | null='';
    listenTries: number=0;
}
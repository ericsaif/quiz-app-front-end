import { Question } from "./question";

export class LASQ extends Question {
    transcribedAudio: string = ''
    s3PathToAudioFile: string ='';
    listenTries: number=0;
}
import { Question } from "./question";

export interface DescribePicWAudioQ extends Question {
    s3PathToPic: string | null;
}
import { Question } from "./question";

export interface DescribePicQ extends Question {
    s3PathToPic: string | null;
}
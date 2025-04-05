import { TestResult } from "./result";

export interface QPoints {
    id: number;
    result: TestResult | null;
    resultId: string;
    iLQpoints: number;
    iRQpoints: number;
    cTestQpoints: number;
    describePicQpoints: number;
    describePicWAudioQpoints: number;
    dictationQpoints: number;
    essayQpoints: number;
    interviewQpoints: number;
    lASQpoints: number;
    rACQpoints: number;
    rAQpoints: number;
    rSQpoints: number;
    wordExistsQpoints: number;
}
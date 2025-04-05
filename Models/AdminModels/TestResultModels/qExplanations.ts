import { TestResult } from "./result";

export interface QExplanations {
    id: number;
    result: TestResult | null;
    resultId: string;
    describePicWAudioQexplanation: string[];
    cTestQexplanation: string[];
    dictationQexplanation: string[];
    iLQexplanation: string[];
    iRQexplanation: string[];
    lASQexplanation: string[];
    describePicQexplanation: string[];
    rAQexplanation: string[];
    rACQexplanation: string[];
    rSQexplanation: string[];
    essayQexplanation: string[];
    interviewQexplanation: string[];
    wordExistsQexplanation: string[];
}
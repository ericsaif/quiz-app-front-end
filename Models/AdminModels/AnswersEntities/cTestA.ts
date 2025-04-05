import { CTestQ } from "../../QuestionsModels/cTestQ";

export interface CTestA {
    id: number;
    cTestQId: number;
    cTestQ: CTestQ | null;
    rightAnswers: string[];
}
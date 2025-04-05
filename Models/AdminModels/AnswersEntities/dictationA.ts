import { DictationQ } from "../../QuestionsModels/dictationQ";

export interface DictationA {
    id: number;
    dictationQId: number;
    dictationQ: DictationQ | null;
    correctText: string | null;
}
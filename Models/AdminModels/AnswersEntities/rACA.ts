import { RACQ } from "../../QuestionsModels/rACQ";

export interface RACA {
    id: number;
    rACQId: number;
    rACQ: RACQ | null;
}
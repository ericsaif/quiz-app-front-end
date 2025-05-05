import { RACQ } from "../../QuestionsModels/rACQ";

export interface RACA {
    answer:string;
    id: number;
    rACQId: number;
    rACQ: RACQ | null;
}
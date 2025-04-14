import { Question } from "./question";

export interface RACQ extends Question {
    rACAId: number;
    rACA: RACA | null;
}
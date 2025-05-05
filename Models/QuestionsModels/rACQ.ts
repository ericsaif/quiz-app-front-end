import { RACA } from "../AdminModels/AnswersEntities/rACA";
import { Question } from "./question";

export class RACQ extends Question {
    RACA: RACA | null = null
}
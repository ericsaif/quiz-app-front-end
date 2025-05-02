import { CreateQuestion } from "../CreateQuestion";
import { CreateWEA } from "./createWEA";

export interface CreateWordExists extends CreateQuestion {
    createWEA: CreateWEA | null;
}
import { CreateQuestion } from "../CreateQuestion";
import { CreateRACA } from "./createRACA";

export interface CreateRAC extends CreateQuestion {
    createRACADTO: CreateRACA | null;
}
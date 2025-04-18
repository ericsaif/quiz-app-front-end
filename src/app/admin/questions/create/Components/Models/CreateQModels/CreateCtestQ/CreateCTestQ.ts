import { CreateCTestA } from "./CreateCTestA";
import { CreateQuestion } from "../CreateQuestion";

export interface CreateCTestQ extends CreateQuestion{
    CTestA: CreateCTestA
}
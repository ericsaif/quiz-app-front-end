import { CreateQuestion } from "../CreateQuestion";
import { CreateIRA } from "./createIRA";
import { MiniE1 } from "./miniE1";

export interface CreateIRQ extends CreateQuestion {
    miniE1DTO: MiniE1 | null;
    optionsMiniE2: string[];
    questionMiniE3: string | null;
    questionMiniE4: string | null;
    optionsMiniE5: string[];
    optionsMiniE6: string[];
    createIRA: CreateIRA | null;
}
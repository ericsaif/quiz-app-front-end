import { CreateQuestion } from "../CreateQuestion";
import { CreateIRA } from "./createIRA";
import { MiniE1_Create } from "./miniE1";

export interface CreateIRQ extends CreateQuestion {
    MiniE1DTO: MiniE1_Create | null;
    optionsMiniE2: string[];
    questionMiniE3: string | null;
    questionMiniE4: string | null;
    optionsMiniE5: string[];
    optionsMiniE6: string[];
    completeText: string | null;
    textForMiniE2: string | null;
    createIRA: CreateIRA | null;
}
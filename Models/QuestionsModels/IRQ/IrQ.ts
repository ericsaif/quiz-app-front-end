import { Question } from "../question";
import { MiniE1 } from "./miniE1";
import { IRA } from "../../AdminModels/AnswersEntities/IRA"; 

export class IRQ extends Question {
    miniE1: MiniE1 | null = null;
    optionsMiniE2: string[]=[];
    questionMiniE3: string | null='';
    questionMiniE4: string | null='';
    optionsMiniE5: string[]=[];
    optionsMiniE6: string[]=[];
    IRA: IRA | null = null;
    timer: string='';
}
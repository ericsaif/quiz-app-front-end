import { CreateQuestion } from "../CreateQuestion";
import { CreateDictationA } from "./createDictationA";

export interface CreateDictation extends CreateQuestion {
    s3PathToAudio: string | null;
    createDictationA: CreateDictationA | null;
}
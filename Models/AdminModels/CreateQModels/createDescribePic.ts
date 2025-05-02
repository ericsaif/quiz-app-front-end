import { CreateQuestion } from "./CreateQuestion";

export interface CreateDescribePic extends CreateQuestion {
    s3PathToPic: string | null;
    waudio: boolean;
}
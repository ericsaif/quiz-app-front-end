import { ReadUser } from "./ReadUser";

export interface UTable {
    readUser: ReadUser[] | null;
    totalCount: number;
}
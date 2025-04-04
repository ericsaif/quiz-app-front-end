import { ReadUser } from "../UserModels/ReadUser";

export interface ReadEngTest {
    id: string;
    user: ReadUser | null;
    userId: string;
    purchaseId: number;
    // attempt: attempt in engTestDetails
}
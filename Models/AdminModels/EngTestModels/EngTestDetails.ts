import { AttemptDetails } from "../AttemptModels/AttemptDetails";
import { PurchaseModel } from "../PurchaseModels/PurchaseModel";
import { UserDetails } from "../UserModels/UserDetails";

export interface EngTestDetails {
    id: string;
    userId: string | null;
    user: UserDetails | null;
    purchaseId: number;
    purchase: PurchaseModel | null;
    attempt: AttemptDetails | null;
}
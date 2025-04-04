import { EngTestDetails } from "../EngTestModels/EngTestDetails";
import { UserDetails } from "../UserModels/UserDetails";

export interface PurchaseModel {
    id: number;
    userId: string | null;
    user: UserDetails | null;
    engTest: EngTestDetails | null;
    price: number;
    paymentSuccess: boolean;
    purchaseDateTime: string;
    expirationDateTime: string;
    expired: boolean;
}
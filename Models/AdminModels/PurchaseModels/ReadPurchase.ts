export interface ReadPurchase {
    id: number;
    numTests: number;
    purchaseDateTime: string;
    expirationDateTime: string;
    expired: boolean;
}
export interface ReadPurchase{
    id: number;
    userId: string | null;
    price: number;
    purchaseDateTime: Date;
    purchaseFinilized: boolean;
}
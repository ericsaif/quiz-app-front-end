import { ReadPurchase } from "../PurchaseModels/ReadPurchase";


export interface UserDetails{
    id: string;
    email: string;
    userName: string;
    boughtTests : ReadPurchase[]
}
export interface ReadEngTest {
    id: string;
    userId: string | null;
    purchaseId: number;
    purchaseDateTime: string;
    expirationDateTime: string;
    expired: boolean;
    started: boolean;
    finished: boolean;
}
export interface ReadUser {
    id: string;
    userName: string | null;
    email: string | null;
    boughtTests: number;
    finishedTests: number;
}
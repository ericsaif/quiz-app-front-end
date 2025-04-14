export interface ReadAttempt {
    id: string;
    finished: boolean;
    expired: boolean;
    userId: string | null;
    endDateTime: Date ;
}
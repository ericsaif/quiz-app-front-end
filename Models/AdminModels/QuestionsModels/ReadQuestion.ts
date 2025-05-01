export interface ReadQuestion {
    id: number;
    questionBody: string | null;
    qType: string | null;
    timer: string;
    qpoId: number;
}
export interface Question {
    id: number;
    questionBody: string | null;
    qPO: QPO | null;
    qPOId: number;
    timer: string;
}
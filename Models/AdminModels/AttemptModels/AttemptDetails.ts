import { UserAnswer } from "../AnswersEntities/UserAnswers/userAnswer";

export interface AttemptDetails {
    id: string;
    userAnswers: UserAnswer[];
    started: boolean;
    finished: boolean;
    expired: boolean;
    userId: string | null;
    engTestId: string;
    startDateTime: string | null;
    endDateTime: string | null;
}
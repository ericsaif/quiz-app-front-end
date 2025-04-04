import { Question } from "../../QuestionsModels/question";
import { EngTestDetails } from "../EngTestModels/EngTestDetails";
import { UserDetails } from "../UserModels/UserDetails";

export interface AttemptDetails {
    id: string;
    questions: Question[];
    userAnswers: UserAnswer[];
    started: boolean;
    finished: boolean;
    expired: boolean;
    curentQIndex: number;
    userId: string | null;
    user: UserDetails | null;
    engTestId: string;
    engTest: EngTestDetails | null;
    result: TestResult | null;
    startDateTime: string | null;
    endDateTime: string | null;
}
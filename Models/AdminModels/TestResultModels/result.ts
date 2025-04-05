import { AttemptDetails } from "../AttemptModels/AttemptDetails";
import { ReadUser } from "../UserModels/ReadUser";
import { ModulePoints } from "./modulePoints";
import { QExplanations } from "./qExplanations";
import { QPoints } from "./qPoints";

export interface TestResult {
    id: string;
    attemptId: string;
    attempt: AttemptDetails| null;
    userId: string | null;
    user: ReadUser | null;
    qpoints: QPoints;
    qExplanations: QExplanations;
    modulePoints: ModulePoints;
    overAllResult: number;
}
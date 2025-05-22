import { ModulePoints } from "../../AdminModels/TestResultModels/modulePoints";
import { QPoints } from "../../AdminModels/TestResultModels/qPoints";

export interface ResultsDetails {
    id: string;
    userId: string | null;
    qpoints: QPoints | null;
    modulePoints: ModulePoints | null;
    overAllResult: number;
    pathToCertificate: string | null;
}
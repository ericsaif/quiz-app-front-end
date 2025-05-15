import { QPoints } from "../../AdminModels/TestResultModels/qPoints";

export interface ResultsDetails {
    id: string;
    qpoints: QPoints | null;
    overAllResult: number;
    pathToCertificate: string | null;
}
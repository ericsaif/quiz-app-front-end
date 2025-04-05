import { TestResult } from "./result";

export interface ModulePoints {
    id: number;
    result: TestResult | null;
    resultId: string;
    readingModuleP: number;
}
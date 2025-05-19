import { MethodArgs } from "./MethodArgs";

export interface QuizHubHook {
    submitAnswer: (SM: string, args: MethodArgs) => Promise<void>; 
    startConnection: () => Promise<void>; // Function to initiate connection
    TimeOut: boolean
}


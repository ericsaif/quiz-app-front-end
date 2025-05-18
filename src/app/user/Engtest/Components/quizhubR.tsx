"use client";

import useSignalR from "@/app/hooks/useSignalR"
import { useEffect, useCallback } from "react"
import { Question } from "../../../../../Models/QuestionsModels/question";
import { QuizHubHook } from "../../../../../Models/QuizHubModels/QuizHubHook";
import { MethodArgs } from "../../../../../Models/QuizHubModels/MethodArgs";

const useQuizHubR = (
    hubUrl: string, 
    setNexQuestion: React.Dispatch<React.SetStateAction<Question | null>>

) : QuizHubHook => { 
    
    const { connection, isConnected, startConnection } = useSignalR(hubUrl);

    const submitAnswer = useCallback(async (SM: string, args: MethodArgs) => { // SM - server method name
        if (connection && isConnected) {
            try {
                await connection.invoke(SM, ...Object.values(args));
                console.log("User Answer submitted:", ...Object.values(args));
            } catch (err) {
                console.error("Error sending the answer:", err);
            }
        } else {
            console.warn("Cannot send message. Connection not established or message is empty.");
        }
    }, [connection, isConnected]); // Dependencies for the send function

    // --- Register SignalR Event Handlers ---
    useEffect(() => {
        if (!connection || !isConnected) {
            return; // Don't register handlers until connected
        }
        const handleNextQuestion = (NextQ: Question) => {
            setNexQuestion(NextQ)
        };

        const handleStopTimer = () => {
            submitAnswer("test", {"test1": "test"})
        };

        connection.on("StartQuiz", handleNextQuestion);
        connection.on("NextQuestion", handleNextQuestion);

        // ("QTimerStarted", AttemptId, time)
        // connection.on("QTimerStarted", handleNextQuestion);
        connection.on("QuestionTimerStop", handleStopTimer);

        // --- Cleanup function for event handlers ---
        return () => {
            // Important: Remove the handler when the component unmounts or connection changes
            // to prevent memory leaks and duplicate handlers.
            console.log("Removing 'NextQuestion' || 'StartQuiz' || 'StopTimer' handler");
            connection.off("NextQuestion", handleNextQuestion);
            connection.off("StartQuiz", handleNextQuestion);
            connection.off("QuestionTimerStop", handleStopTimer);

        };

    }, [connection, isConnected, setNexQuestion, submitAnswer]); // Re-run when connection or its status changes

    
    return { submitAnswer, startConnection };
}

export default useQuizHubR
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

    // --- Function to Send a Message ---
    const submitAnswer = useCallback(async (SM: string, args: MethodArgs) => { // SM - server method name
        if (connection && isConnected) {
            try {
                // Replace "SendMessage" with the actual Hub method name on your server
                await connection.invoke(SM, args);
                console.log("User Answer submitted:", ...Object.values(args));
            } catch (err) {
                console.error("Error sending the answer:", err);
                // Handle send error (e.g., show a notification)
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
        connection.on("StopTimer", handleStopTimer);

        // --- Cleanup function for event handlers ---
        return () => {
            // Important: Remove the handler when the component unmounts or connection changes
            // to prevent memory leaks and duplicate handlers.
            console.log("Removing 'NextQuestion' || 'StartQuiz' || 'StopTimer' handler");
            connection.off("NextQuestion", handleNextQuestion);
            connection.off("StartQuiz", handleNextQuestion);
            connection.off("StopTimer", handleStopTimer);

        };

    }, [connection, isConnected, setNexQuestion, submitAnswer]); // Re-run when connection or its status changes

    
    return { submitAnswer, startConnection };
}

export default useQuizHubR
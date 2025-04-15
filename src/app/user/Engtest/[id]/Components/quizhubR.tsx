"use client";

import useSignalR from "@/app/hooks/useSignalR"
import { useEffect, useCallback } from "react"
import { Question } from "../../../../../../Models/QuestionsModels/question";

interface QuizHubHook {
    submitAnswer: (SM: string, args: MethodArgs) => Promise<void>; 
    startConnection: () => Promise<void>; // Function to initiate connection
}

interface MethodArgs {
    [key: string]: unknown;
  }

const useQuizHubR = (hubUrl: string, setQuestionCallback: React.Dispatch<React.SetStateAction<Question | null>>) : QuizHubHook => { // Get URL from env
    const { connection, isConnected, startConnection } = useSignalR(hubUrl);

    // --- Register SignalR Event Handlers ---
    useEffect(() => {
        if (!connection || !isConnected) {
            return; // Don't register handlers until connected
        }

        // Example: Listening for a message from the server
        // Replace "ReceiveMessage" with the actual method name your server uses
        const handleNextQuestion = (NextQ: Question) => {
            setQuestionCallback(NextQ)
        };

        const handleStopTimer = () => {
            submitAnswer()
        };

        connection.on("NextQuestion", handleNextQuestion);
        connection.on("StopTimer", handleStopTimer);

        // --- Cleanup function for event handlers ---
        return () => {
            // Important: Remove the handler when the component unmounts or connection changes
            // to prevent memory leaks and duplicate handlers.
            console.log("Removing 'NextQuestion' handler");
            connection.off("NextQuestion", handleNextQuestion);
        };

    }, [connection, isConnected, setQuestionCallback]); // Re-run when connection or its status changes

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

    
    return { submitAnswer, startConnection };
}

export default useQuizHubR
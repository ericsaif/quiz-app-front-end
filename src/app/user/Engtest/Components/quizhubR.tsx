"use client";

import useSignalR from "@/app/hooks/useSignalR"
import { useEffect, useCallback, useState } from "react"
import { Question } from "../../../../../Models/QuestionsModels/question";
import { QuizHubHook } from "../../../../../Models/QuizHubModels/QuizHubHook";
import { MethodArgs } from "../../../../../Models/QuizHubModels/MethodArgs";

const useQuizHubR = (
    hubUrl: string, 
    setNexQuestion: React.Dispatch<React.SetStateAction<Question | null>>

) : QuizHubHook => { 
    
    const { connection, isConnected, startConnection } = useSignalR(hubUrl);
    const [TimeOut, setTimeOut] = useState<boolean>(false)

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
            console.warn("handling next question")
            setTimeOut(false)
            setNexQuestion(NextQ)
        };

        // const handleStarttimer(AttemptId: string, time: string){
        //     startTimer()
        // }

        const handleStopTimer = () => {
            setTimeOut(true)
            console.info("setting time out to true")
        };

        connection.on("NextQuestion", handleNextQuestion);
        // connection.on("QTimerStarted", handleStarttimer);
        connection.on("QuestionTimerStop", handleStopTimer);

        connection.onreconnecting(error => {
            console.log("SignalR reconnecting due to:", error);
        });

        // --- Cleanup function for event handlers ---
        return () => {
            // Important: Remove the handler when the component unmounts or connection changes
            // to prevent memory leaks and duplicate handlers.
            console.log("Removing 'NextQuestion' || 'QuestionTimerStop' || 'StopTimer' handler");
            connection.off("NextQuestion", handleNextQuestion);
            connection.off("QuestionTimerStop", handleStopTimer);
            connection.off("QuestionTimerStop", handleStopTimer);

        };

    }, [connection, isConnected, setNexQuestion]); // Re-run when connection or its status changes

    
    return { submitAnswer, startConnection, TimeOut };
}

export default useQuizHubR
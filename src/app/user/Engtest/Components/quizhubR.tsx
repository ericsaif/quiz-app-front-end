"use client";

import useSignalR from "@/app/hooks/useSignalR"
import { useEffect, useCallback, useState } from "react"
import { Question } from "../../../../../Models/QuestionsModels/question";
import { QuizHubHook } from "../../../../../Models/QuizHubModels/QuizHubHook";
import { MethodArgs } from "../../../../../Models/QuizHubModels/MethodArgs";
import { useRouter } from "next/navigation";

const useQuizHubR = (
    hubUrl: string, 
    setNexQuestion: React.Dispatch<React.SetStateAction<Question | null>>,
    engTestId: string
) : QuizHubHook => { 
    
    const { connection, isConnected, startConnection } = useSignalR(hubUrl);
    const [TimeOut, setTimeOut] = useState<boolean>(false)

    const router = useRouter()

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
            setTimeOut(false)
            setNexQuestion(NextQ)
        };

        const handleStarttimer = (AttemptId: string, time: string) =>{
            console.log(`Starting Timer, AttemptId = ${AttemptId}, time = ${time}`)
            // startTimer()
        }

        const handleStopTimer = () => {
            setTimeOut(true)
            console.info("setting time out to true")
        };

        const handleEndQuiz = (response: string) =>{
            console.log(response)
            console.log("Server requested disconnect");
            connection.stop(); 
            router.push(`/user/Engtest/finish?engTestId=${engTestId}`)
        }

        connection.on("NextQuestion", handleNextQuestion);
        connection.on("QTimerStarted", handleStarttimer);
        connection.on("QuestionTimerStop", handleStopTimer);
        connection.on("EndQuiz", handleEndQuiz);

        connection.onreconnecting(error => {
            console.log("SignalR reconnecting due to:", error);
        });

        // --- Cleanup function for event handlers ---
        return () => {
            console.log("Removing 'NextQuestion' || 'QuestionTimerStop' || 'StopTimer' handler");

            connection.off("NextQuestion", handleNextQuestion);
            connection.off("QuestionTimerStop", handleStopTimer);
            connection.off("EndQuiz", handleStopTimer);
            connection.off("QTimerStarted", handleStarttimer);


        };

    }, [connection, engTestId, isConnected, router, setNexQuestion]); // Re-run when connection or its status changes

    
    return { submitAnswer, startConnection, TimeOut };
}

export default useQuizHubR
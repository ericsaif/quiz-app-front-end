"use client";

import useSignalR from "@/app/hooks/useSignalR"
import { useEffect, useCallback, useState, useRef } from "react"
import { Question } from "../../../../../Models/QuestionsModels/question";
import { QuizHubHook } from "../../../../../Models/QuizHubModels/QuizHubHook";
import { MethodArgs } from "../../../../../Models/QuizHubModels/MethodArgs";
import { useRouter } from "next/navigation";

const useQuizHubR = (
    hubUrl: string, 
    setNexQuestion: React.Dispatch<React.SetStateAction<Question | null>>,
    startTimer: React.Dispatch<React.SetStateAction<string>>,
    setexplanation: React.Dispatch<React.SetStateAction<number | null>>,
    engTestId: string
) : QuizHubHook => { 
    
    const { connection, isConnected, startConnection } = useSignalR(hubUrl);
    const [TimeOut, setTimeOut] = useState<boolean>(false)
    const [isInvoking, setisEnvoking] = useState<boolean>(false)

    const router = useRouter()

    const awaitingQTimeout = useRef<NodeJS.Timeout | null>(null);

    const submitAnswer = useCallback(async (SM: string, args: MethodArgs) => { // SM - server method name
        if (connection && isConnected) {
            try {
                setisEnvoking(true)
                await connection.invoke(SM, ...Object.values(args));
            } catch (err) {
                console.error("Error sending the answer:", err);
            }finally{
                setisEnvoking(false)
            }
        } else {
            console.warn("Cannot send message. Connection not established or message is empty.");
        }
    }, [connection, isConnected]); // Dependencies for the send function

    const GetAwaitingQuestion = useCallback(()=>{
        if (connection && isConnected){
            try{
                console.log("calling GetAwaitingQuestion")
                setisEnvoking(true)
                
                connection.invoke("GetAwaitingQuestion")
                if(awaitingQTimeout.current){
                    clearTimeout(awaitingQTimeout.current)
                }
                awaitingQTimeout.current=null
            }catch(err){
                console.error("error getting awaiting  question: ", err)
            }finally{
                setisEnvoking(false)
            }
        }
    },[connection, isConnected])

    const handleNextQuestion = useCallback((NextQ: Question) => {
            console.log(`setting the next question: `, NextQ)
            setTimeOut(false)
            setexplanation(null)
            setNexQuestion(NextQ)
    },[setNexQuestion, setexplanation]);

    const handleExplanation = useCallback((QPOId: number, time: string) => {
        console.log("setting the explanation")
        setNexQuestion(null)
        setexplanation(QPOId)
        startTimer(time)

        awaitingQTimeout.current = setTimeout(() => {
            GetAwaitingQuestion()
        }, 15000);
    },[GetAwaitingQuestion, setNexQuestion, setexplanation, startTimer]);

    const handleStarttimer = useCallback((AttemptId: string, time: string) =>{
        startTimer(time)
    },[startTimer])

    const handleStopTimer = useCallback(() => {
        setTimeOut(true)
    },[])

    const handleEndQuiz = useCallback(async (response: string) =>{
        if(!connection) return

        let waitMs = 0;
        const maxWaitMs = 3000; // wait max 3 seconds
        console.log(response)
        console.log("Server requested disconnect");
        router.push(`/user/Engtest/finish?engTestId=${engTestId}`)

        while (isInvoking && waitMs < maxWaitMs) {
            await new Promise(r => setTimeout(r, 100)); // small delay
            waitMs += 100;
        }
        connection.stop(); 
    },[connection, engTestId, isInvoking, router])

    // --- Register SignalR Event Handlers ---
    useEffect(() => {
        if (!connection || !isConnected) return;

        connection.on("NextQuestion", handleNextQuestion);
        connection.on("Explanation", handleExplanation);
        connection.on("QTimerStarted", handleStarttimer);

        connection.on("QuestionTimerStop", handleStopTimer);
        connection.on("EndQuiz", handleEndQuiz);

        connection.onreconnecting(error => {
            console.log("SignalR reconnecting due to:", error);
        });

        return () => {
            console.log("Removing 'NextQuestion' || 'QuestionTimerStop' || 'StopTimer' handler");

            connection.off("NextQuestion", handleNextQuestion);
            connection.off("QuestionTimerStop", handleStopTimer);
            connection.off("EndQuiz", handleEndQuiz);
            connection.off("QTimerStarted", handleStarttimer);
            connection.off("Explanation", handleExplanation);
        };

    }, [connection, handleEndQuiz, handleExplanation, handleNextQuestion, handleStarttimer, handleStopTimer, isConnected]); 

    
    return { submitAnswer, startConnection, TimeOut, GetAwaitingQuestion };
}

export default useQuizHubR
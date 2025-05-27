import React, { SetStateAction } from "react";
import { MethodArgs } from "../../../Models/QuizHubModels/MethodArgs";
import { sendAudioInChunks } from "./sendAudioInChunks";

export function stopRecording(props:{
    setIsRecording: React.Dispatch<SetStateAction<boolean>>
    mediaRecorderRef: React.RefObject<MediaRecorder | null>
}){
    const {setIsRecording, mediaRecorderRef} = props
    
    setIsRecording(false);

    if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
    }
};

export async function submitRecording(props: {
    QPOId: number;
    SM: string;
    Topic?: string;
    QId?: number;
    TimeOut: boolean;
    submitAnswer: (SM: string, args: MethodArgs) => Promise<void>;
    audioBlob: Blob | null;
    CHUNK_SIZE: number;
}){    
    try {
        sendAudioInChunks(props)

    } catch (err) {
        console.error("Error submitting recording:", err);
    }
}
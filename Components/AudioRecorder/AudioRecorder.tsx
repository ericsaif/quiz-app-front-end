"use client"

import './audioRecorder.css' 


import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { MethodArgs } from '../../Models/QuizHubModels/MethodArgs';


export default function AudioRecorder(props: {QPOId:number, SM:string, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) {
    const { SM, submitAnswer, QPOId } = props
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordingStatus, setRecordingStatus] = useState('idle');
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        return () => {
        if (streamRef.current && isRecording) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        };
    }, [isRecording]);

    const startRecording = async () => {
        audioChunksRef.current = [];
        setAudioBlob(null);
        setAudioUrl(null);
        setError(null);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            setRecordingStatus('recording');
            setIsRecording(true);

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                  audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioBlob(audioBlob);
                setAudioUrl(audioUrl);
                setRecordingStatus('recorded');

                // Stop all tracks to release the microphone
                if (streamRef.current) {
                  streamRef.current.getTracks().forEach(track => track.stop());
                  streamRef.current = null;
                }
            };

            mediaRecorder.start();
        } catch (err) {
            console.error("Error accessing the microphone:", err);
            setError("Could not access microphone. Please check permissions.");
            setRecordingStatus('idle');
            console.log(error)
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        }
    };
    const submitRecording = async () => {
        if (!audioBlob) {
        setError("No recording to submit");
        return;
        }
        
        setRecordingStatus('submitting');
        
        try {
            const audioStream = audioBlob.stream()
        
            submitAnswer(SM, {'AudioData': audioStream, 'QPOId': QPOId})
            setRecordingStatus('submitted');
            console.log("Recording submitted successfully:", audioUrl);
            
            // Reset state after successful submission
            setAudioBlob(null);
            setAudioUrl(null);
        } catch (err) {
            console.error("Error submitting recording:", err);
            setError("Failed to submit recording. Please try again.");
            setRecordingStatus('recorded'); // Return to recorded state to allow retry
        }
    }


  return (
    <div className="audio-recorder">
      
      <div className="controls">
        {!isRecording && recordingStatus !== 'recorded' && (
          <button 
            onClick={startRecording} 
            disabled={recordingStatus === 'submitting'}
            className="btn"
          >
            <Image src="/reshot-icon-voice-recorder.svg" alt="voice recorder" width={100} height={100} />
          </button>
        )}
        
        {isRecording && (
          <button 
            onClick={stopRecording} 
            className="btn"
          >
            <Image src="/reshot-icon-stop.svg" alt="stop voice recorder"  width={70} height={70} />
            
          </button>
        )}
        
        {recordingStatus === 'recording' && (
          <div className="recording-indicator ">
            <Image src="/reshot-icon-blu-ray.svg" alt="recording" className='btn slow-spin' width={100} height={100} />
          </div>
        )}
        
        {recordingStatus === 'recorded' && (
          <button 
            onClick={submitRecording} 
            className="submit-button"
          >
            Submit
          </button>
        )}
        {/* {audioUrl && (
          <div className="audio-preview">
            <audio controls src={audioUrl} />
          </div>
        )} */}
      </div>
    </div>
  );
}
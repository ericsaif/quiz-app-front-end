"use client"

import './audioRecorder.css' 


import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { MethodArgs } from '../../Models/QuizHubModels/MethodArgs';


export default function AudioRecorder(props: {
  QPOId:number, 
  SM:string, 
  Topic?: string, 
  submitAnswer: (SM: string, args: MethodArgs) => Promise<void>
}) {
    const { SM, submitAnswer, QPOId, Topic = "" } = props
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordingStatus, setRecordingStatus] = useState('idle');
    const [error, setError] = useState<string | null>(null);

    const CHUNK_SIZE = 20 * 1024;

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

    async function sendAudioInChunks() {
      const arrayBuffer = await audioBlob!.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const totalChunks = Math.ceil(uint8Array.length / CHUNK_SIZE);
      
      // First send metadata about the upcoming chunks
      console.info("- BeginAudioUpload - ")

      const beginUploadMargs: MethodArgs ={
        QPOId: QPOId,
        TotalChunks: totalChunks,
        TotalSize: uint8Array.length
      }

      await submitAnswer("BeginAudioUpload", beginUploadMargs);
      
      // Send each chunk
      console.info("- Begin UploadAudioChunk before loop - ")

      for (let i = 0; i < totalChunks; i++) {
        console.info("- Begin UploadAudioChunk inside loop - ", i)

          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, uint8Array.length);
          const chunk = uint8Array.slice(start, end);
          
          // Convert chunk to base64
          const base64Chunk = btoa(
              Array.from(chunk)
                  .map(byte => String.fromCharCode(byte))
                  .join('')
          );
          
        console.info("attempting to invoke UploadAudioChunk")

        const UploadAudioChunkMargs: MethodArgs = {
            ChunkIndex: i,
            ChunkData: base64Chunk,
            QPOId: QPOId
        }

        await submitAnswer("UploadAudioChunk", UploadAudioChunkMargs);
      }

      const CompleteAudioUploadMargs: MethodArgs = { QPOId: QPOId, SM: SM, Topic: Topic }
      
      // Signal upload completion
      await submitAnswer("CompleteAudioUpload", CompleteAudioUploadMargs);
  }

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
            // Send the base64 string instead of the stream
            sendAudioInChunks()

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
import React, { useEffect, useRef, useState } from "react"
import { startRecording } from "../AudioUtils/StartRecording"
import Image from "next/image"
import { stopRecording, submitRecording } from "../AudioUtils/Stop_Submit_Reccording"
import { MethodArgs } from "../../../Models/QuizHubModels/MethodArgs"

export const AudioControls = (props: {
  QPOId:number, 
  SM:string, 
  Topic?: string, 
  QId?: number, 
  TimeOut: boolean
  submitAnswer: (SM: string, args: MethodArgs) => Promise<void>
}) =>{

    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(new Blob());
    const [recordingStatus, setRecordingStatus] = useState('idle');
    const [AudioControls, setAudioControls] = useState<React.ReactNode>()

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
    
    useEffect(()=>{
        const {TimeOut} = props

        const CHUNK_SIZE = 20 * 1024;

        if(TimeOut){
            stopRecording({setIsRecording, mediaRecorderRef})
            submitRecording({...props, audioBlob, CHUNK_SIZE, setRecordingStatus})
            return 
        }


        const AudioControls = (
            <div className="audio-recorder">
      
                <div className="controls">
                    {!isRecording && recordingStatus !== 'recorded' && (
                    <button 
                        onClick={() => startRecording({ ...props, setIsRecording, setRecordingStatus, setAudioBlob, mediaRecorderRef, audioChunksRef, streamRef })} 
                        disabled={recordingStatus === 'submitting'}
                        className="btn"
                    >
                        <Image src="/reshot-icon-voice-recorder.svg" alt="voice recorder" width={100} height={100} />
                    </button>
                    )}
                    
                    {isRecording && (
                    <button 
                        onClick={() =>stopRecording({setIsRecording, mediaRecorderRef})} 
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
                        onClick={()=>submitRecording({...props, setRecordingStatus, audioBlob, CHUNK_SIZE})} 
                        className="submit-button"
                    >
                        Submit
                    </button>
                    )}
                </div>
                </div>
        )
        setAudioControls(AudioControls)
    }, [audioBlob, isRecording, props, recordingStatus])

    return AudioControls
}
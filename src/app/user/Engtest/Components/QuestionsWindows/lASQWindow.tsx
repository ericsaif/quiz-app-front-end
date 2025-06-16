import React, { useMemo } from "react"
import AudioPlayer from "../../../../../../Components/AudioPlayer/AudioPlayer"
import { LASQ, MethodArgs } from "./commonImports"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"


const LASQWindow = (props:{question: LASQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    
    return useMemo(()=>(
        <React.Fragment key={`${question.id}`}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <AudioPlayer
                    keyName={question.s3PathToAudioFile} 
                    maxListenTries={question.listenTries}
                />
            </div>
            <div>
                <AudioRecorder 
                    {...props}
                    QId={question.id}
                    QPOId={question.qpoId} 
                    SM={"SubmitLASAsync"}              
                />
            </div>
        </React.Fragment>
    ),[props, question.id, question.listenTries, question.qpoId, question.s3PathToAudioFile])
}

export default LASQWindow
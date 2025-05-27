import React from "react"
import AudioPlayer from "../../../../../../Components/AudioPlayer/AudioPlayer"
import { LASQ, MethodArgs } from "./commonImports"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"


const lASQWindow = (props:{question: LASQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    
    return(
        <React.Fragment key={`LASQ-window-fragment`}>
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
    )
}

export default lASQWindow
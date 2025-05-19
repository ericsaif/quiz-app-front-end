import React from "react"
import AudioPlayer from "../../../../../../Components/AudioPlayer/AudioPlayer"
import { LASQ, MethodArgs } from "./commonImports"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"


const lASQWindow = (props:{question: LASQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props

    if(TimeOut){
        // handleSubmit()
        console.log("handling Time out = true ")
    }
    
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
                    QPOId={question.qpoId} 
                    SM={"SubmitLASAsync"} 
                    submitAnswer={ submitAnswer }                
                />
            </div>
        </React.Fragment>
    )
}

export default lASQWindow
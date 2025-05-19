import React from "react"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { RSQ, MethodArgs } from "./commonImports"


const rSQWindow = (props:{question: RSQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props
    if(TimeOut){
        // handleSubmit()
        console.log("handling Time out = true ")
    }
    return(
        <React.Fragment>
             <div>
                <p style={{whiteSpace: 'pre-line', fontSize: 'larger'}}>
                    {question.questionBody}
                </p>
            </div>
            <div>
                <AudioRecorder submitAnswer={submitAnswer} SM={"SubmitRSAsync"} QPOId={question.qpoId} />
            </div>
        </React.Fragment>
        
    )
}

export default rSQWindow
import React from "react"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { RSQ, MethodArgs } from "./commonImports"


const rSQWindow = (props:{question: RSQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    
    return(
        <React.Fragment>
             <div>
                <p style={{whiteSpace: 'pre-line', fontSize: 'larger'}}>
                    {question.questionBody}
                </p>
            </div>
            <div>
                <AudioRecorder {...props} SM={"SubmitRSAsync"} QPOId={question.qpoId} QId={question.id}/>
            </div>
        </React.Fragment>
        
    )
}

export default rSQWindow
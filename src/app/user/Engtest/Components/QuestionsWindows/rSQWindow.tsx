import React, { useMemo } from "react"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { RSQ, MethodArgs } from "./commonImports"


const RSQWindow = (props:{question: RSQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    
    return useMemo(()=>(
        <React.Fragment key={`${question.id}`}>
             <div>
                <p style={{whiteSpace: 'pre-line', fontSize: 'larger'}}>
                    {question.questionBody}
                </p>
            </div>
            <div>
                <AudioRecorder {...props} SM={"SubmitRSAsync"} QPOId={question.qpoId} QId={question.id}/>
            </div>
        </React.Fragment>
        
    ),[props, question.id, question.qpoId, question.questionBody])
}

export default RSQWindow
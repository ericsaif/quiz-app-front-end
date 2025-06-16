import { useMemo } from "react"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { InterviewQ, MethodArgs } from "./commonImports"

const InterviewQWindow = (props:{question: InterviewQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    
    return useMemo(()=>
    (
        <div>
            <div>
                <p style={{whiteSpace: 'pre-line', fontSize: 'larger'}}>
                    {question.questionBody}
                </p>
            </div>
            <div>
                <AudioRecorder 
                    {...props}
                    QId={question.id}
                    QPOId={question.qpoId} 
                    SM={"SubmitVideoAAsync"} 
                    Topic={question.questionBody ?? ""}
                />
            </div>
        </div>
        
    ),[props, question.id, question.qpoId, question.questionBody])
}

export default InterviewQWindow
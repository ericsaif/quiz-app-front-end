import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { InterviewQ, MethodArgs } from "./commonImports"

const interviewQWindow = (props:{question: InterviewQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    
    return(
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
        
    )
}

export default interviewQWindow
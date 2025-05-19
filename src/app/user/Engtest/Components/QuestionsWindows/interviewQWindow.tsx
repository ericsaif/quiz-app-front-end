import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { InterviewQ, MethodArgs } from "./commonImports"

const interviewQWindow = (props:{question: InterviewQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props
    if(TimeOut){
        // handleSubmit()
        console.log("handling Time out = true ")
    }
    return(
        <div>
            <div>
                <p style={{whiteSpace: 'pre-line', fontSize: 'larger'}}>
                    {question.questionBody}
                </p>
            </div>
            <div>
                <AudioRecorder 
                    QPOId={question.qpoId} 
                    SM={"SubmitVideoAAsync"} 
                    submitAnswer={submitAnswer} 
                    Topic={question.questionBody ?? ""}
                />
            </div>
        </div>
        
    )
}

export default interviewQWindow
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { InterviewQ, MethodArgs } from "./commonImports"

const interviewQWindow = (props:{question: InterviewQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props
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
                submitAnswer={submitAnswer} />
            </div>
        </div>
        
    )
}

export default interviewQWindow
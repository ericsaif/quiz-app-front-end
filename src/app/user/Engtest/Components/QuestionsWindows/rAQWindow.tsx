import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { RAQ, MethodArgs } from "./commonImports"


const rAQWindow = (props:{question: RAQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    return(

            <div>
                <div>
                    <h3>
                        {question.questionBody}
                    </h3>
                </div>
                <div>
                    <AudioRecorder 
                        {...props}
                        QPOId={question.qpoId}
                        QId={question.id}
                        SM={"SubmitRAAsync"} 
                    />
                </div>
            </div>
        
    )
}

export default rAQWindow
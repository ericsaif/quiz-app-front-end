import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { RAQ, MethodArgs } from "./commonImports"


const rAQWindow = (props:{question: RAQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props
    
    return(

            <div>
                <div>
                    <h3>
                        {question.questionBody}
                    </h3>
                </div>
                <div>
                    <AudioRecorder 
                        QPOId={question.qpoId} 
                        SM={"SubmitRAAsync"} 
                        submitAnswer={ submitAnswer } 
                    />
                </div>
            </div>
        
    )
}

export default rAQWindow
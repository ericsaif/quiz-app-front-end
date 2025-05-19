import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { RAQ, MethodArgs } from "./commonImports"


const rAQWindow = (props:{question: RAQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props
    if(TimeOut){
        // handleSubmit()
        console.log("handling Time out = true ")
    }
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
import { useMemo } from "react"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"
import { RAQ, MethodArgs } from "./commonImports"


const RAQWindow = (props:{question: RAQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question } = props
    return useMemo(()=>(
            <div key={`${question.id}`}>
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
    ),[props, question.id, question.qpoId, question.questionBody])
}

export default RAQWindow
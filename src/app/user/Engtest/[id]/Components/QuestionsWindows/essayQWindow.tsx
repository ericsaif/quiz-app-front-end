import { useState } from "react"
import { EssayQ, MethodArgs } from "./commonImports"

const EssayQWindow = (props:{question: EssayQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const [essay, setEssay] = useState<string>("")
    const Topic = props.question.questionBody
    const QPOId = props.question.qPOId

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const newM : MethodArgs = {
            "Essay": essay,
            "Topic": Topic,
            "QPOId": QPOId
        }
        props.submitAnswer("SubmitEssayAsync", newM)
    }

    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const { value } = event.target
        setEssay(value)
    }
    return(
        <>
            <div>
                <p>
                    {Topic}
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea className="user-essay" name="user-essay" id="" onChange={HandleInputChange}></textarea>
            </form>
        
        </>
        
    )
}

export default EssayQWindow
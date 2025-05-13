import { useState } from "react"
import { EssayQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"

import "./QWindows.css"

const EssayQWindow = (props:{question: EssayQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const [essay, setEssay] = useState<string>("")
    const Topic = props.question.questionBody
    const QPOId = props.question.qpoId

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        console.log(`Essay - ${essay} Topic = ${Topic} QPOId = ${QPOId}`)

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
            <div >
                <p>
                    {Topic}
                </p>
            
                <form className="" onSubmit={handleSubmit}  style={{height: "100%"}}>
                    <textarea className="essay-textarea" name="user-essay" id="user-essay" onChange={HandleInputChange}/> <br/>
                    <Button type="submit" className={`btn btn-primary p-3 py-2`} style={{fontWeight: 'bold'}}>Submit</Button>
                </form>
            </div>
        </>
        
    )
}

export default EssayQWindow
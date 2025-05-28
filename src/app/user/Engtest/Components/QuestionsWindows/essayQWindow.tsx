import { useState } from "react"
import { EssayQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"

import "./QWindows.css"

const EssayQWindow = (props:{question: EssayQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{

    const {question, submitAnswer, TimeOut} = props
    const [essay, setEssay] = useState<string>("")
    const Topic = question.questionBody
    const QPOId = question.qpoId

    const handleSubmit = () =>{
        console.log(`submitting essay - ${essay}`)
        const newM : MethodArgs = {
            Essay: essay,
            Topic: Topic,
            QPOId: QPOId,
            QId: question.id
        }
        submitAnswer("SubmitEssayAsync", newM)
    }
    if(TimeOut){
        handleSubmit()
        console.log("handling Time out = true ")
    }

    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const { value } = event.target
        setEssay(value)
    }
    return(
        <>
            <div >
                <p style={{whiteSpace: 'pre-line', fontSize: 'larger'}}>
                    {Topic}
                </p>
            
                <div className=""   style={{height: "100%"}}>
                    <textarea className="essay-textarea" name="user-essay" id="user-essay" onChange={HandleInputChange}/> <br/>
                    <Button onClick={handleSubmit} type="submit" className={`btn btn-primary p-3 py-2`} style={{fontWeight: 'bold'}}>Submit</Button>
                </div>
            </div>
        </>
        
    )
}

export default EssayQWindow
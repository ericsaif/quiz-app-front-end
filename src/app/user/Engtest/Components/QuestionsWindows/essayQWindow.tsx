import { useCallback, useMemo, useState } from "react"
import { EssayQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"

import "./QWindows.css"

const EssayQWindow = (props:{question: EssayQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{

    const {question, submitAnswer, TimeOut} = props
    const [essay, setEssay] = useState<string>("")
    const Topic = question.questionBody
    const QPOId = question.qpoId

    const handleSubmit = useCallback(() =>{
        
        const newM : MethodArgs = {
            Essay: essay,
            Topic: Topic,
            QId: question.id,
            QPOId: QPOId,
        }
        if(TimeOut){
            submitAnswer("SubmitEssayAsync", newM)
            console.log("handling Time out = true ")
            return
        }

        submitAnswer("SubmitEssayAsync", newM)
        
    },[QPOId, TimeOut, Topic, essay, question.id, submitAnswer])

    const HandleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const { value } = event.target
        setEssay(value)
    },[])
    
    return useMemo(()=>
        (
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
        
    ),[HandleInputChange, Topic, handleSubmit])

     
}

export default EssayQWindow
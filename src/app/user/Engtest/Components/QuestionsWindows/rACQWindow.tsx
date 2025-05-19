import React from "react"
import { RACQ, MethodArgs } from "./commonImports"
import { Button, Input } from "@headlessui/react"

const 
rACQWindow = (props:{question: RACQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props

    const handleSubmit = () =>{
        submitAnswer("SubmitRACAsync", {FilledBlanks:[""], QId: question.id})
    }
    // const HandleInputChange = (index: number, character: string) =>{

    // }

    if(TimeOut){
        handleSubmit()
        console.log("handling Time out = true ")
    }
    return(

        <React.Fragment>
            <div>
                <div>
                    <p>
                        {question.questionBody}
                    </p>
                </div>
                <div>
                    <Input ></Input>
                </div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </React.Fragment>
        
    )
}

export default rACQWindow
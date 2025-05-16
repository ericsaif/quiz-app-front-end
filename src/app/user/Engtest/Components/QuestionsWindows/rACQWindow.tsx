import React from "react"
import { RACQ, MethodArgs } from "./commonImports"
import { Button, Input } from "@headlessui/react"

const 
rACQWindow = (props:{question: RACQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props

    const HandleSubmit = () =>{
        submitAnswer("SubmitRACAsync", {"FilledBlanks":"", "QId": ""})
    }
    // const HandleInputChange = (index: number, character: string) =>{

    // }
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
                <Button onClick={HandleSubmit}>Submit</Button>
            </div>
        </React.Fragment>
        
    )
}

export default rACQWindow
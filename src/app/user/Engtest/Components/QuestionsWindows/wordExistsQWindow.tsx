"use client"

import { WordExistsQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"


const WordExistsQWindow = (props:{question: WordExistsQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props
    const handleSubmit = (exists: boolean) =>{
        submitAnswer("SubmitWordExistsAAsync", {"Answer": exists, "QId": question.id})
    }
    return(
            <div className="container-fluid">
                <h2 style={{fontWeight: 'bold'}}>
                    {question.questionBody}
                </h2>
                <div className=" d-grid gap-2">
                        <Button className={`btn w-50 mx-auto`} style={{backgroundColor: 'greenyellow', color: 'white', fontWeight: 'bold'}} onClick={() =>handleSubmit(true)}>YES</Button>
                        <Button className={`btn w-50 mx-auto`} style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold'}} onClick={() =>handleSubmit(false)}>NO</Button>
                </div>
            </div>
        
    )
}

export default WordExistsQWindow
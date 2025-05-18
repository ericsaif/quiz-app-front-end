"use client"

import { IoIosCheckmark } from "react-icons/io"
import { WordExistsQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"
import { HiMiniXMark } from "react-icons/hi2"


const WordExistsQWindow = (props:{question: WordExistsQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props
    const handleSubmit = (exists: boolean) =>{
        submitAnswer("SubmitWordExistsAAsync", {Answer: exists, QId: question.id})
    }
    return(
            <div className="container-fluid">
                <h2 style={{fontWeight: 'bold'}}>
                    {question.questionBody}
                </h2>
                <div className=" d-grid gap-2">
                    <Button className={`w-exists-button`} onClick={() =>handleSubmit(true)}>
                       <> <IoIosCheckmark className="popup-mark popup-mark-success" size={40} />  </>
                        YES
                    </Button>
                    <Button className={`w-exists-button w-exists-button-no`} onClick={() =>handleSubmit(false)}>
                       <> <HiMiniXMark className="popup-mark popup-mark-fail" size={35} />  </>
                        NO  
                    </Button>
                </div>
            </div>
        
    )
}

export default WordExistsQWindow
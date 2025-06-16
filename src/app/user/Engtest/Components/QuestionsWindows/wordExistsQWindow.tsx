"use client"

import { IoIosCheckmark } from "react-icons/io"
import { WordExistsQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"
import { HiMiniXMark } from "react-icons/hi2"
import React, { useCallback, useMemo } from "react"


const WordExistsQWindow = (props:{question: WordExistsQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props

    const handleSubmit = useCallback((exists: boolean | null) =>{
    if(TimeOut){
        submitAnswer("SubmitWordExistsAAsync", {Answer: exists, QId: question.id})
        console.log("handling Time out = true ")
        return
    }
    submitAnswer("SubmitWordExistsAAsync", {Answer: exists, QId: question.id})

    }, [TimeOut, question.id, submitAnswer])

    return useMemo(()=>
            
         (
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
    , [handleSubmit, question.questionBody])
    
}

export default WordExistsQWindow
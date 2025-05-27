"use client"

import { IoIosCheckmark } from "react-icons/io"
import { WordExistsQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"
import { HiMiniXMark } from "react-icons/hi2"
import React, { useEffect, useState } from "react"


const WordExistsQWindow = (props:{question: WordExistsQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{

    const [WEWindow, setWEWindow] = useState<React.ReactNode>()
    
    useEffect(()=>{
        const { question, submitAnswer, TimeOut } = props

        const handleSubmit = (exists: boolean | null) =>{
            submitAnswer("SubmitWordExistsAAsync", {Answer: exists, QId: question.id})
        }
        if(TimeOut){
            handleSubmit(null)
            console.log("handling Time out = true ")
        }
            
        const WEWindow = (
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

        setWEWindow(WEWindow)
    }, [props])
    
    return WEWindow
}

export default WordExistsQWindow
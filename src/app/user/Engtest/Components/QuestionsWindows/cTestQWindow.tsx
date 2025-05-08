import React, { useState } from "react"
import { CTestQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"


const CTestQWindow = (props:{question: CTestQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const [blankValues, setBlanks] = useState<Record<string, string>>({})
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const newM: MethodArgs= {
            QId: props.question.id,
            blankValues:blankValues,
            "QPOId":props.question.qpoId

        }
        props.submitAnswer("SubmitCtestAttemptAsync", newM)
    }
    const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement>, blankIndex: number, letterIndex: number) =>{
        
        const { value } = event.target
        setBlanks((previousBlanks) =>({
            ...previousBlanks,
            [`blank-${blankIndex}-${letterIndex}`]: value,
        }))
    }

    const displayedText = props.question.questionBody
    const separatorRegex = /^\[BLANK:(\d+)\]$/;
    const parts = displayedText?.split(separatorRegex)

    let blankCounter =0
    return(

        <form onSubmit={handleSubmit}>
            <div>
                {parts?.map((part, index) =>{
                    const match = part.match(separatorRegex)
                    if(match){
                        const blankLength = parseInt(match[1])
                        const inputs = [];
                    for (let i = 0; i < blankLength; i++) {
                        inputs.push(
                        <input
                            key={`blank-${blankCounter}-${i}`}
                            type="text"
                            maxLength={1}
                            className="letter-input"
                            onChange={(e) => handleInputChange(e, blankCounter, i)}
                            value={blankValues[`blank-${blankCounter}-${i}`] || ''}
                        />
                        );
                    }
                    blankCounter++;
                    return <React.Fragment key={`blank-container-${index}`}>{inputs}</React.Fragment>;
                    } else {
                    return <span key={`text-${index}`}>{part}</span>;
                    }
                })}
            </div>
            <Button type="submit"></Button>
            
        </form>
        
    )
}

export default CTestQWindow

// structure of CTestQ.questionBody: "TEXT ... [BLANK:3] ... TEXT"
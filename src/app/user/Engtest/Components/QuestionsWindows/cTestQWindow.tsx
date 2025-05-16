import React, { useState } from "react"
import { CTestQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"


const CTestQWindow = (props:{question: CTestQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props

    const [blankValues, setBlanks] = useState<Record<string, string>>({})

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const newM: MethodArgs= {
            'QId': question.id,
            'blankValues':blankValues
        }
        submitAnswer("SubmitCtestAttemptAsync", newM)
    }
    const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement>, blankIndex: number, letterIndex: number) =>{
        
        const { value } = event.target
        setBlanks((previousBlanks) =>({
            ...previousBlanks,
            [`blank-${blankIndex}-${letterIndex}`]: value,
        }))
    }

    let displayedText = question.questionBody
    // const separatorRegex = /^\[BLANK:(\d+)\]$/;

    const replaceRegex = /(\(\d+\))/g
    const separatorRegex =  /(\[BLANK:\d+\])/g;
    const diditRegex = /(\d+)/g

    displayedText = displayedText?.replaceAll(replaceRegex, "") || displayedText
    const parts = displayedText?.split(separatorRegex)

    let blankCounter =0
    return(

        <form onSubmit={handleSubmit}>
            <div>
                {parts?.map((part, index) =>{
                    const match = part.match(separatorRegex)
                    if(match){
                        const digit = match[0].match(diditRegex) || ''
                        const blankLength = parseInt(digit[0], 10)
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
                        return <span className="" key={`text-${index}`}>{part}</span>;
                    }
                })}
            </div>
            <Button className="submit-btn" type="submit">Submit</Button>
            
        </form>
        
    )
}

export default CTestQWindow

// structure of CTestQ.questionBody: "TEXT ... [BLANK:3] ... TEXT"
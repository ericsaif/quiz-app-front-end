import React, { useEffect, useState } from "react"
import { CTestQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"


const CTestQWindow = (props:{question: CTestQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props

    let displayedText = question.questionBody

    const replaceRegex = /(\(\d+\))/g
    const separatorRegex =  /(\[BLANK:\d+\])/g;
    const diditRegex = /(\d+)/g

    displayedText = displayedText?.replaceAll(replaceRegex, "") || displayedText
    const parts = displayedText?.split(separatorRegex)

    let blankCounter =0
    
    const [blankValues, setBlanks] = useState<string[]>([])

    
    useEffect(() => {
        const parts = question.questionBody?.split(separatorRegex) || [];
        const newBlanks: string[] = [];

        parts.forEach(part => {
            if (separatorRegex.test(part)) {
                const match = part.match(diditRegex);
                const length = match ? parseInt(match[0], 10) : 1;
                newBlanks.push('-'.repeat(length));
            }
        });

        setBlanks(newBlanks);
    }, [diditRegex, question, separatorRegex]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const newM: MethodArgs= {
            QId: question.id,
            blankValues:blankValues
        }
        submitAnswer("SubmitCtestAttemptAsync", newM)
    }
    const replaceAt = (index: number, str: string = '-', replacement: string) => {
        return str.substring(0, index) + replacement + str.substring(index + replacement.length);
    }
    const handleInputChange = (letter: string, wordIndex: number, letterIndex: number) =>{
        
        setBlanks(previousBlanks =>{
            const newValues = [...previousBlanks]
            
            let userAnswer = newValues[wordIndex] ?? '-';

            if(userAnswer == null || userAnswer ==='' )
                userAnswer = '-'
            
            userAnswer = replaceAt(letterIndex, userAnswer, letter)

            newValues[wordIndex] = userAnswer

            return newValues
        })
    }
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
                        handleInputChange('-', blankCounter, i)
                        inputs.push(
                        <input
                            key={`blank-${blankCounter}-${i}`}
                            type="text"
                            maxLength={1}
                            className="letter-input"
                            onChange={(e) => handleInputChange(e.target.value, blankCounter, i)}
                            value={blankValues[blankCounter][i] || ''}
                        />
                        );
                    }
                    blankCounter++;
                    return <React.Fragment key={`blank-container-${index}`}>{inputs}</React.Fragment>;
                    } else {
                        return <span className="questionBody" key={`text-${index}`}>{part}</span>;
                    }
                })}
            </div>
            <Button className="submit-btn mt-2" type="submit">Submit</Button>
            
        </form>
        
    )
}

export default CTestQWindow

// structure of CTestQ.questionBody: "TEXT ... [BLANK:3] ... TEXT"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { RACQ, MethodArgs } from "./commonImports" 
import { Button } from "@headlessui/react"
import getDisplayedParts from "./displayedparts/getDisplayedParts"

const  RACQWindow = (props:{question: RACQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props

    const [blankValues, setBlanks] = useState<string[]>([])
    const [blankLengths, setblankLengths] = useState<number[]>([])

    useEffect(()=>{
        setBlanks([])
        setblankLengths([])
        let displayedText = question.questionBody

        const replaceRegex = /(\(\d+\))/g
        const separatorRegex =  /(\[BLANK:\d+\])/g;
        const diditRegex = /(\d+)/g

        displayedText = displayedText?.replaceAll(replaceRegex, "") || displayedText
        const parts = displayedText?.split(separatorRegex)

        parts?.map((part) =>{
            const match = part.match(separatorRegex)

            if(match){
                const digit = match[0].match(diditRegex) || ''
                const blankLength = parseInt(digit[0], 10)
                setBlanks(prevBlanks =>{
                    return [...(prevBlanks || []), ...new Array(blankLength).fill('')]
                })
                setblankLengths(prevLengths =>{
                    return [...(prevLengths || []), blankLength ]
                })
            }
    })},[question])

    const handleSubmit = useCallback(() =>{
        if(TimeOut){
            submitAnswer("SubmitRACAsync", {FilledBlanks:blankValues.join(''), QId: question.id})
            console.log("handling Time out = true ")
            return
        }
        submitAnswer("SubmitRACAsync", {FilledBlanks:blankValues.join(''), QId: question.id})
        
    },[TimeOut, blankValues, question.id, submitAnswer])

    const handleInputChange = useCallback((letter: string, wordIndex: number, letterIndex: number) =>{    
        setBlanks(previousBlanks =>{
            const newValues = [...previousBlanks]
            const prevBlanksLengths = wordIndex == 0 ? 0 : blankLengths.slice(0, wordIndex).reduce((acc, val)=> acc+val ,0)

            newValues[prevBlanksLengths + letterIndex] = letter;

            return newValues
        })
    }, [blankLengths])

    return useMemo(()=>(
        <React.Fragment key={`${question.questionBody?.slice(0,10)}`}>
            <div>
                {getDisplayedParts({displayedText: question.questionBody ?? "", blankValues, handleInputChange})}
            </div>
            <Button style={{width: 'fit-content', display: 'flex', justifyContent: 'center'}} className="submit-btn mt-2"  type="submit" onClick={handleSubmit}>Submit</Button>
        </React.Fragment>
    )
    , [blankValues, handleInputChange, handleSubmit, question.questionBody])
}

export default RACQWindow
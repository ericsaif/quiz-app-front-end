import React, { useCallback, useEffect, useMemo, useState } from "react"
import { CTestQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"
import getDisplayedParts from "./displayedparts/getDisplayedParts"


const CTestQWindow = (props:{question: CTestQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
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

        const replacedArray = blankValues.map(str => (str.trim() === '' ? '-' : str));

        const newM: MethodArgs= {
            QId: question.id,
            blankValues: replacedArray
        }

        if(TimeOut){
            submitAnswer("SubmitCtestAttemptAsync", newM)
            console.log("handling Time out = true ")
            return
        }

        submitAnswer("SubmitCtestAttemptAsync", newM)

    },[TimeOut, blankValues, question.id, submitAnswer])

    const handleInputChange = useCallback((letter: string, wordIndex: number, letterIndex: number) =>{

        setBlanks(previousBlanks =>{
            const newValues = [...previousBlanks]
            const prevBlanksLengths = wordIndex == 0 ? 0 : blankLengths.slice(0, wordIndex).reduce((acc, val)=> acc+val ,0)
            

            newValues[prevBlanksLengths + letterIndex] = letter;

            return newValues
        })

    },[blankLengths])

    return useMemo(()=>{
               

        return( 
            <React.Fragment key="react-CTestQ-window-fragment">
                    <div>
                        {getDisplayedParts({displayedText: question.questionBody ?? "", blankValues, handleInputChange})}
                    </div>
                    <Button style={{width: 'fit-content', display: 'flex', justifyContent: 'center'}} className="submit-btn mt-2" type="submit" onClick={handleSubmit}>Submit</Button>
            </React.Fragment>
        )
    }, [blankValues, handleInputChange, handleSubmit, question.questionBody])

}

export default CTestQWindow
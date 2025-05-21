import React, { useEffect, useState } from "react"
import { RACQ, MethodArgs } from "./commonImports" 
import { Button } from "@headlessui/react"

const  RACQWindow = (props:{question: RACQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props

    const [blankValues, setBlanks] = useState<string[]>([])
    const [blankLengths, setblankLengths] = useState<number[]>([])
    
        
    const[ form, setform ] = useState<React.ReactNode | null>(null)

    // if creating a component for displaying text with input fields instead of blanks
    // the variables that need to be passed there: replaceRegex, separatorRegex, displayedText, blankValues, setBlanks, SM ... 
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

    useEffect(()=>{
            let prevBlanksLength = 0
            let blankCounter = 0
    
            let displayedText = question.questionBody
    
            const replaceRegex = /(\(\d+\))/g
            const separatorRegex =  /(\[BLANK:\d+\])/g;
            const diditRegex = /(\d+)/g
    
            displayedText = displayedText?.replaceAll(replaceRegex, "") || displayedText
            const parts = displayedText?.split(separatorRegex)
            
            const handleSubmit = () =>{
                submitAnswer("SubmitRACAsync", {FilledBlanks:blankValues.join(''), QId: question.id})
            }
            
            if(TimeOut){
                handleSubmit()
                console.log("handling Time out = true ")
            }
    
            const handleInputChange = (letter: string, wordIndex: number, letterIndex: number) =>{    
                setBlanks(previousBlanks =>{
                    const newValues = [...previousBlanks]
                    const prevBlanksLengths = wordIndex == 0 ? 0 : blankLengths.slice(0, wordIndex).reduce((acc, val)=> acc+val ,0)
                    
                    // console.info("prevBlanksLengths = ", prevBlanksLengths)
    
                    console.log(`blankValues length: ${blankValues.length} blankValues before adding a new letter: ${newValues} `)

                    newValues[prevBlanksLengths + letterIndex] = letter;

                    console.log(`blankValues length: ${blankValues.length} blankValues after adding a new letter - ${newValues}`)

                    return newValues
                })
            }
            const displayedParts = parts?.map((part, index) =>{
                const match = part.match(separatorRegex)
                const currentWordIndex = blankCounter
                let offset = 0
    
                if(match){
                    const digit = match[0].match(diditRegex) || ''
                    const blankLength = parseInt(digit[0], 10)
                    const inputs = [];
    
                    // const offset =  blankCounter == 0 ? -1 : PBL + blankLength
                    offset = currentWordIndex == 0 ? 0 : prevBlanksLength
                    // console.log("offset = ", offset, "blankLength = ", blankLength, "prevBlanksLength = ", prevBlanksLength)
    
                for (let i = 0; i < blankLength; i++) {
                    inputs.push(
                    <input
                        key={`blank-${blankCounter}-${i}`}
                        type="text"
                        maxLength={1}
                        className="letter-input"
                        value={blankValues[offset + i] || ''}
    
                        onChange={(e) => {
                            const value = e.target.value;
                            handleInputChange(value, currentWordIndex, i);
    
                            // Auto-focus next input
                            if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
                                e.target.nextElementSibling.focus();
                            }
                        }}
                        onKeyDown={(e) => {
                            const isBackspace = e.key === 'Backspace';
                            const currentIndex = offset + i;
    
                            // If current is empty and user hits backspace, go back
                            if (isBackspace && !blankValues[currentIndex]) {
                            const prevInput = (e.target as HTMLInputElement).previousElementSibling;
                            if (prevInput instanceof HTMLInputElement) {
                                prevInput.focus();
                            }
                            }
                        }}
                    />
                    );
                }
                prevBlanksLength = prevBlanksLength + blankLength
    
                blankCounter ++;
                return <React.Fragment key={`blank-container-${index}`}>{inputs}</React.Fragment>;
                } else {
                    return <span className="questionBody" key={`text-${index}`}>{part}</span>;
                }
            })
    
            setform(
                <React.Fragment key="react-CTestQ-window-fragment">
                    <div>
                        {displayedParts}
                    </div>
                    <Button style={{width: 'fit-content', display: 'flex', justifyContent: 'center'}} className="submit-btn mt-2"  type="submit" onClick={handleSubmit}>Submit</Button>
                </React.Fragment>
            )
        }, [TimeOut, blankLengths, blankValues, question.id, question.questionBody, submitAnswer])
    
        return form
}

export default RACQWindow
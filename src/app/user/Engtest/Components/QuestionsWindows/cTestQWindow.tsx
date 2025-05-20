import React, { useEffect, useState } from "react"
import { CTestQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"


const CTestQWindow = (props:{question: CTestQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props


    const [blankValues, setBlanks] = useState<string[]>([])
    
    const[ form, setform ] = useState<React.ReactNode | null>(null)
    
    useEffect(()=>{
        setBlanks([])

    },[question])

    useEffect(()=>{
        let prevBlanksLength = 0
        let blankCounter = 0

        const blankLengths: number[] = []
        let displayedText = question.questionBody

        const replaceRegex = /(\(\d+\))/g
        const separatorRegex =  /(\[BLANK:\d+\])/g;
        const diditRegex = /(\d+)/g

        displayedText = displayedText?.replaceAll(replaceRegex, "") || displayedText
        const parts = displayedText?.split(separatorRegex)
        
        const handleSubmit = () =>{
            const newM: MethodArgs= {
                QId: question.id,
                blankValues:blankValues
            }
            submitAnswer("SubmitCtestAttemptAsync", newM)
        }
        
        if(TimeOut){
            handleSubmit()
            console.log("handling Time out = true ")
        }

        const handleInputChange = (letter: string, wordIndex: number, letterIndex: number) =>{
            console.info("word index - ", wordIndex, " letterIndex = ", letterIndex)

            setBlanks(previousBlanks =>{
                const newValues = [...previousBlanks]
                const prevBlanksLengths = wordIndex == 0 ? 0 : blankLengths.slice(0, wordIndex).reduce((acc, val)=> acc+val ,0)
                
                console.info("prevBlanksLengths = ", prevBlanksLengths)


                newValues[prevBlanksLengths + letterIndex] = letter;

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

                blankValues.push(...new Array(blankLength).fill(''));
                blankLengths.push(blankLength)

                // const offset =  blankCounter == 0 ? -1 : PBL + blankLength
                offset = currentWordIndex == 0 ? 0 : prevBlanksLength
                console.log("offset = ", offset, "blankLength = ", blankLength, "prevBlanksLength = ", prevBlanksLength)

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
                    <Button style={{width: 'fit-content', display: 'flex', justifyContent: 'center'}} className="submit-btn mt-2" type="submit" onClick={handleSubmit}>Submit</Button>
            </React.Fragment>
        )
    }, [TimeOut, blankValues, question.id, question.questionBody, submitAnswer])

    return form
}

export default CTestQWindow

// structure of CTestQ.questionBody: "TEXT ... [BLANK:3] ... TEXT"
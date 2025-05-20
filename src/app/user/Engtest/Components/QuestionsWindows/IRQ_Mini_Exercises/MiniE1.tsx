import React, { useEffect, useState } from "react"
import { MiniE1 } from "../../../../../../../Models/QuestionsModels/IRQ/miniE1"
import GenSelect from "./minie1options"
import { Button } from "@headlessui/react"

import "./miniE1.css"

const MiniEex1 = (props: { 
    minie1: MiniE1 | null, 
    questionBody: string, 
    userOptionsMiniE1: number[],
    setuserOptionsMiniE1: React.Dispatch<React.SetStateAction<number[]>>
    setNext: React.Dispatch<React.SetStateAction<number>>
}) =>{
    const { minie1, questionBody, setuserOptionsMiniE1, userOptionsMiniE1, setNext } = props
    const [displayedMinie1, setdisplayedMinie1] = useState<React.ReactNode>()
    
    useEffect(()=>{
        const separatorRegex =  /(\.\.\.)/g;
        let blankCounter = -1

        const parts = questionBody?.split(separatorRegex)

        const displayedParts = parts?.map((part, index) =>{
            const match = part.match(separatorRegex)

            if(match){
                blankCounter++
                return (
                <React.Fragment key={`minie1-container-${blankCounter}`}>
                     <GenSelect 
                        minie1={minie1}
                        blankIndex={blankCounter} 
                        chosenvalue={userOptionsMiniE1[blankCounter]} 
                        setuserOptionsMiniE1={setuserOptionsMiniE1} 
                    />
                </React.Fragment>
                )
            }
            else 
                return <span className="questionBody" key={`text-${index}`}>{part}</span>;
            
        })

        setdisplayedMinie1(
            <React.Fragment>
                {displayedParts}
                <Button onClick={() => setNext(1)} className={`submit-btn mt-2`}>Next</Button>
            </React.Fragment>
        )
        
    }, [questionBody, minie1, userOptionsMiniE1, setuserOptionsMiniE1, setNext])

    return displayedMinie1
}

export default MiniEex1
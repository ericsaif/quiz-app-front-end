import React, { useMemo } from "react"
import GenSelect from "./minie1options"
import { Button } from "@headlessui/react"

import "./miniE1.css"
import { useIRQ } from "../IrQWindow"

const MiniEex1 = () =>{
    const {question, setNext, userOptionsMiniE1, setuserOptionsMiniE1} = useIRQ()
    
    const displayedMinie1 = useMemo(()=>{
        const separatorRegex =  /(\.\.\.)/g;
        let blankCounter = -1

        const parts = question.questionBody?.split(separatorRegex)

        const displayedParts = parts?.map((part, index) =>{
            const match = part.match(separatorRegex)

            if(match){
                blankCounter++
                return (
                <React.Fragment key={`minie1-container-${blankCounter}`}>
                     <GenSelect 
                        minie1={question.miniE1}
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

        return(
            <React.Fragment>
                {displayedParts}
                <Button onClick={() => setNext(1)} className={`submit-btn mt-2`}>Next</Button>
            </React.Fragment>
        )
        
    }, [question.miniE1, question.questionBody, setNext, setuserOptionsMiniE1, userOptionsMiniE1])

    return displayedMinie1
}

export default MiniEex1
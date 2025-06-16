import React, { useEffect, useState } from "react"
import { Button } from "@headlessui/react"

import "./component.css"
import { useIRQ } from "../../IrQWindow"

const MiniEx2 = () =>{
    const { question, userOptionMiniE2, setuserOptionMiniE2, setNext, userOptionsMiniE1 } = useIRQ()

    const [displayedMiniE2, setdisplayedMiniE2] = useState<React.ReactNode>()
    
    useEffect(()=>{
        const separatorRegex =  /(\.\.\.)/g;
        let blankCounter = -1

        const parts = question.questionBody?.split(separatorRegex)

        const displayedParts = parts?.map((part, index) =>{
            const match = part.match(separatorRegex)

            if(match){
                blankCounter++
                return userOptionsMiniE1[blankCounter]
            }
            else 
                return <span className="questionBody" key={`text-${index}`}>{part}</span>;
            
        })

        const options = question.optionsMiniE2.map((option, index)=>(
            <option value={index} key={`${index}-${option}`}>
                {option}
            </option>
        ))

        setdisplayedMiniE2(
            <React.Fragment>
                {displayedParts}
                <br/>
                <select 
                    style={{
                        width: 'fit-content',
                        minWidth: '30rem',
                        padding: '5px'
                    }}
                    name="miniE1-options" 
                    id="miniE1-options" 
                    value={userOptionMiniE2} 
                    onChange={(e) => setuserOptionMiniE2(parseInt(e.target.value,10))}
                >
                    {options}
                </select>
                <div>
                    <p className="questionBody">
                        {question.textForMiniE2 !='' ? question.textForMiniE2 : 'test text' }
                    </p>
                </div>
                <Button onClick={() => setNext(2)} className={`submit-btn mt-2`}>Next</Button>
            </React.Fragment>
        )
        
    }, [userOptionsMiniE1, setuserOptionMiniE2, setNext, userOptionMiniE2, question.questionBody, question.textForMiniE2, question.optionsMiniE2])

    return displayedMiniE2
}

export default MiniEx2
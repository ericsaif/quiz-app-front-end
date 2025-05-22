import React, { useEffect, useState } from "react"
import { Button } from "@headlessui/react"

import "./component.css"

const MiniEx2 = (props: { 
    optionsMiniE2: string[]
    userOptionMiniE2: number
    setuserOptionMiniE2: React.Dispatch<React.SetStateAction<number>>
    setNext: React.Dispatch<React.SetStateAction<number>>
    questionBody: string
    userOptionsMiniE1: number[]
    text2: string
}) =>{
    const { optionsMiniE2, userOptionMiniE2, setuserOptionMiniE2, setNext, questionBody, userOptionsMiniE1, text2 ='test text' } = props
    const [displayedMiniE2, setdisplayedMiniE2] = useState<React.ReactNode>()
    
    useEffect(()=>{
        const separatorRegex =  /(\.\.\.)/g;
        let blankCounter = -1

        const parts = questionBody?.split(separatorRegex)

        const displayedParts = parts?.map((part, index) =>{
            const match = part.match(separatorRegex)

            if(match){
                blankCounter++
                return userOptionsMiniE1[blankCounter]
            }
            else 
                return <span className="questionBody" key={`text-${index}`}>{part}</span>;
            
        })

        const options = optionsMiniE2.map((option, index)=>(
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
                        {text2 !='' && text2 }
                    </p>
                </div>
                <Button onClick={() => setNext(2)} className={`submit-btn mt-2`}>Next</Button>
            </React.Fragment>
        )
        
    }, [questionBody, userOptionsMiniE1, setuserOptionMiniE2, setNext, optionsMiniE2, userOptionMiniE2, text2])

    return displayedMiniE2
}

export default MiniEx2
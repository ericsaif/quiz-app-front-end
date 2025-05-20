import { Button, Input } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";

import "./component.css"

const MiniE_5_6 = (props:{
    options: string[]
    idea: boolean
    passage: string
    userOption: number
    setuserOption: React.Dispatch<React.SetStateAction<number>>
    setNext: React.Dispatch<React.SetStateAction<number>>
    handleSubmit: () => void | null

}) =>{
    const {options, idea, userOption, setuserOption, passage, setNext, handleSubmit} = props
    const [ExWindow, setExWindow] = useState<React.ReactNode>()
    const [passageOpened, setpassageOpened] = useState<boolean>()

    useEffect(()=>{
        const displayedOptions = options.map((option, index)=>(
            <label key={`${index}-${option}`} className={`input-label ${ userOption == index ? 'input-label-checked' : ''}`} style={{display: option == '-' ? 'none' : 'block', minHeight: `${idea ? '6rem' : '4rem'}`}} htmlFor={`${index}-${option}`}>
                <Input onChange={() => setuserOption(index)} checked={userOption == index} type="checkbox" name="minie" id={`${index}-${option}`}></Input>
                {index+1}: {option}
            </label>
        ))

        const Header = idea ? 'Select the idea expressed in the passage' : 'Select the best suiting title for the passage'

        setExWindow(
            <React.Fragment key={`React-${idea ? 'idea' : 'title'}-select-fragment`}>
                <h2>{Header}</h2>
                <div className="inputs-container">
                    {displayedOptions}
                    {
                        idea ? 
                        <Button className={`submit-btn my-2 `} onClick={()=>setNext(prevNext => prevNext + 1)}>Next</Button>
                        :
                        <Button className={`submit-btn my-2 `} onClick={handleSubmit}>Submit</Button>
                        
                    }
                    <Button style={{display: `${passageOpened ? "none" : "block"}`}} className={`passage-btn`} onClick={
                        () => setpassageOpened(!passageOpened)} > 
                        { 
                            <><IoIosArrowUp size={20} /> View Passage</>
                        }
                    </Button>
                </div>
                <div>
                    <div className={`passage ${passageOpened ? 'openedPassage' : 'closedPassage'}`}>
                        <Button style={{display: `${passageOpened ? "block" : "none"}`}} className={`passage-btn`} onClick={
                            () => setpassageOpened(!passageOpened)} > 
                            { 
                                <><IoIosArrowDown size={20} /> Hide Passage</>
                            }
                        </Button>
                        <p>
                            {passage}
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }, [options, idea, passage, passageOpened, userOption, setuserOption, setNext, handleSubmit])

    return ExWindow
}

export default MiniE_5_6
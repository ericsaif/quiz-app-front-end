import { Button, Input } from "@headlessui/react"
import React, { useMemo, useState } from "react"
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";

import "./component.css"
import { useIRQ } from "../../IrQWindow";

const MiniE_5_6 = () =>{
    const {question, setNext, handleSubmit, currentEx, setuserOptionMiniE5, setuserOptionMiniE6, userOptionMiniE5, userOptionMiniE6} = useIRQ()

    const [passageOpened, setpassageOpened] = useState<boolean>()

    return  useMemo(()=>{
        const idea = currentEx == 5 

        const options = idea ? question.optionsMiniE5 : question.optionsMiniE6
        const setuserOption = idea ? setuserOptionMiniE5 : setuserOptionMiniE6
        const userOption = idea ? userOptionMiniE5 : userOptionMiniE6


        const displayedOptions = options.map((option, index)=>(
            <label key={`${index}-${option}`} className={`input-label ${ userOption == index ? 'input-label-checked' : ''}`} style={{display: option == '-' ? 'none' : 'block', minHeight: `${idea ? '6rem' : '4rem'}`}} htmlFor={`${index}-${option}`}>
                <Input onChange={() => setuserOption(index)} checked={userOption == index} type="checkbox" name="minie" id={`${index}-${option}`}></Input>
                {index+1}: {option}
            </label>
        ))

        const Header = idea ? 'Select the idea expressed in the passage' : 'Select the best suiting title for the passage'

        return(
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
                            {question.completeText}
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }, [currentEx, question.optionsMiniE5, question.optionsMiniE6, question.completeText, setuserOptionMiniE5, setuserOptionMiniE6, userOptionMiniE5, userOptionMiniE6, handleSubmit, passageOpened, setNext])

    
}

export default MiniE_5_6
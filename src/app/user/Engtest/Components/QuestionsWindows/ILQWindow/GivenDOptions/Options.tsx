import React, { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import "./options.css"

const Options = (props:{ newOptions: string[], currentILQ: string, HandleOptionsSelect: (value: number) => void }) => {
    const { newOptions, currentILQ, HandleOptionsSelect } = props 

    const [opened, setopened] = useState<boolean>(false)

    return (
        <>
            <div className="select-placeholder" key={`blank-option-${newOptions[0]}-${currentILQ}`} onClick={() => setopened(!opened)}>
                Please select your answer {opened? <IoIosArrowDown size={18}/> : <IoIosArrowUp size={18} />}
            </div>
            
            <div className={`custom-options-block ${opened? "custom-options-block-opened" : "custom-options-block-closed"}`}>
                
                <div className="options-container">
                    {newOptions.map((user_option: string, index) => (
                        user_option === "-" ? null :
                        <div className="custom-options" key={index} title={user_option} onClick={() =>{HandleOptionsSelect(index); setopened(false)}}>
                            {user_option}
                        </div>
                    ))}
                </div>

                <div className="select-placeholder select-placeholder-small-screens" key={`blank-option-${newOptions[0]}`} onClick={() => setopened(!opened)}>
                    Please select your answer {opened? <IoIosArrowDown size={18}/> : <IoIosArrowUp size={18} />}
                </div>
            </div>
        </>
    )
}

export default Options
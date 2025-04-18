import React, { useState } from "react"
import { GivenDialogoptions } from "../../../../../../../../../Models/QuestionsModels/ILQ/givenDialogoptions"

const Options = (props:{ options:GivenDialogoptions, CurrentILQ: number }) =>{
    const [user_options, setUser_options]  = useState<string[]>([])
    const currentQ = props.CurrentILQ
    const GivenOptions = props.options

    switch(currentQ){
        case 0:
            setUser_options(GivenOptions.optionsDialogStart)
            break
        case 1:
            setUser_options(GivenOptions.optionsDialogContinuation1)
            break
        case 2:
            setUser_options(GivenOptions.optionsDialogContinuation2)
            break
        case 3:
            setUser_options(GivenOptions.optionsDialogContinuation3)
            break
        case 4:
            setUser_options(GivenOptions.optionsDialogContinuation4)
            break
    }
    return (
        <>
            {user_options.map((user_option: string, index)=>(
                <option key={index} value={index}>
                    {user_option}
                </option>
            ))}
        </>
    )
}

export default Options
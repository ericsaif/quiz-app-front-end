import React, { useState, useEffect } from "react"
import { GivenDialogoptions } from "../../../../../../../../Models/QuestionsModels/ILQ/givenDialogoptions"

const Options = (props:{ options:GivenDialogoptions | null, CurrentILQ: number }) => {
    const [user_options, setUser_options] = useState<string[]>([])
    const { CurrentILQ, options } = props 

    // Move the switch statement inside a useEffect hook
    // This ensures it only runs when CurrentILQ or options change
    useEffect(() => {
        let newOptions: string[] = []

        switch(CurrentILQ){
            case 0:
                newOptions = options?.optionsDialogStart || []
                break
            case 1:
                newOptions = options?.optionsDialogContinuation1 || []
                break
            case 2:
                newOptions = options?.optionsDialogContinuation2 || []
                break
            case 3:
                newOptions = options?.optionsDialogContinuation3 || []
                break
            case 4:
                newOptions = options?.optionsDialogContinuation4 || []
                break
            default:
                newOptions = []
        }
        
        setUser_options(newOptions)
    }, [CurrentILQ, options]) // Only run when these dependencies change

    return (
        <>
            {user_options.map((user_option: string, index) => (
                <option key={index} value={index}>
                    {user_option}
                </option>
            ))}
        </>
    )
}

export default Options